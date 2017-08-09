(function Module(angular) {
    'use strict';
    angular.module('ppcTracking', ['ngResource', 'ngRoute'])
        .service('ppc', ['ppcFactory', '$location', '$window', '$timeout', 'ppcConfig', '$rootScope', service])
        .factory('ppcFactory', ['$resource', 'ppcConfig', factory])
        .provider('ppcConfig', provider);

    function service(ppcFactory, $location, $window, $timeout, ppcConfig, $rootScope) {
        var track = {
            impressions: 'impressions',
            clicks: 'clicks',
            kosmosImpressions: 'ig',
            kosmosclicks: 'click'
        }
        var apiSrc = 'https://logs.jobs.com/api/';
        var apiSrcKosmos = 'https://logs2.jobs.com/cloudapi/';
        var ppcTrackingGroupUUID = guid();
        return {
            trackPpc: trackPpc,
            trackPpcKosmos: trackPpcKosmos,
            trackPpcClick: trackPpcClick
        }

        function trackPpcClick(vm, data) {
            if (typeof data === 'object') {
                if (data !== undefined) {
                    if (vm.ppcTrackingEnabled) {
                        //console.log('do old ppc stuff');
                        var _meta = mapMetaData(data);
                        var mappedJob = mapJobData(data);
                        angular.merge(mappedJob, _meta);
                        //console.log(mappedJob);
                        imgCreator(track.clicks, mappedJob);
                    }

                    if (vm.ppcTrackingWithKosmosApiEnabled) {
                        //console.log('do kosmos stuff');
                        var metaJob = getCommonMetaJob(data);
                        var mappedJob = getClickMetaJob(data);
                        angular.merge(mappedJob, metaJob);
                        //console.log(mappedJob);
                        imgCreatorForKosmos(track.kosmosclicks, mappedJob);
                    }

                    /*
                    triggers two new tabs (windows) when data.direct_click is true. Leaving just "not" check and data.direct_click "true" openner is in timeout only.
                    if (data.direct_click) {
                        $window.open(data.url, '_blank');
                    }
                    else {
                        $window.location.href = data.url;
                    }
                    */

                    !data.direct_click && ($window.location.href = data.url);

                    //Safeguard if the API stalls, redirect regardless
                    $timeout(function () {
                        if (data.direct_click) {
                            $window.open(data.url, '_blank');
                        }
                        else {
                            $window.location.href = data.url;
                        }
                    }, 100);
                }
            }
        }

        function trackPpc(data) {
            if (typeof data === 'object') {
                if (data.jobs !== undefined) {
                    var _meta = mapMetaData(data);
                    angular.forEach(data.jobs, function (job) {
                        var mappedJob = mapJobData(job);
                        angular.merge(mappedJob, _meta);

                        imgCreator(track.impressions, mappedJob);
                    });
                }
            } else {
                console.log('something went wrong');
            }
        }

        //Create image API call the src and then destroy from memory
        function imgCreator(type, params, callback) {
            var env = $rootScope.registry.localStore.global.context.EnvironmentType;
            if (env !== 'Production') {
                var dev = 'https://cloudapi.awsdevus.party2001.com/api/';
                var qa = 'https://cloudapi.awsqaus.mwwaws.com/api/';

                //replacing production path based on enviroment
                apiSrc = (env === 'Development') ? dev : qa;
            }

            var pixel = apiSrc + type + "/pixel.gif?" + $.param(params);

            var img = new Image();
            img.src = pixel;
            img.onload = function () {
                if (callback && typeof callback === 'function') {
                    callback();
                }
                img = null;
            };
        }

        ////////////////////// Start - New PPC Tracking using Kosmos ///////////////////////////////
        function getCommonMetaJob(obj) {
           // console.log(obj);
           return {
               s_q: obj.keywords || '-1',
               s_where: obj.location || '-1',
               j_pg: obj.page_index || '-1',
               a_affiliate_id: obj.ChannelAlias || '-1',
               referrer: $location.protocol() + '://' + $location.host(),
               dvfpid: obj.dvfpid || '-1',
               ts: getEpoch()
           };
        }

        function getClickMetaJob(obj) {
            return {
                j_postingid: obj.postingId || '-1',
                j_pvc: obj.providerName || '-1',
                j_placementid: 'jsr',
                uuid: ppcTrackingGroupUUID || '',
                j_p: obj.jobPosition
            };
        }

        //build j_j array
        function getJJMeta(obj) {
            var tempj_j = [];
            
            //j_j meta data from jobs
            angular.forEach(obj.jobs,
                function (job) {
                    if (job.jobId == 0) { job.jobId = -1 };
                    //if (job.searchTech == '') { job.searchTech = '-1' }; TODO: need to detirmine search technology and pass to PPC.Hardcoded to -1 for now
                    tempj_j.push(String(job.jobId) + '_jsr_' + job.jobPosition + '_' + job.postingId + '_' + job.providerName+ '_st:-1');
                    //temp_uuid.push(job.ppcTrackingGuid);
                });
                //console.log(tempj_j);
            var impMeta = {
                j_j: tempj_j.toString(),
                uuid: ppcTrackingGroupUUID.toString()
            }
           // console.log(impMeta);
            var impressionMeta = getCommonMetaJob(obj);
           //console.log(impressionMeta);
            angular.merge(impressionMeta, impMeta);
            //console.log(impressionMeta);
            return impressionMeta;
        }
      
        function trackPpcKosmos(data) {
            if (typeof data === 'object') {
                if (data.jobs !== undefined) {
                    var _meta = getJJMeta(data);
                    //console.log('tracking kosmos', _meta);
                    imgCreatorForKosmos(track.kosmosImpressions, _meta);
                } else {
                    console.log('something went wrong');
                }
            }
        }

        //Create image with API (new Kosmos) call the src and then destroy from memory
        function imgCreatorForKosmos(type, params, callback) {
            var env = $rootScope.registry.localStore.global.context.EnvironmentType;
            if (env !== 'Production') {

                var dev = 'https://cloudapijava.awsdevus.mwwaws.com/cloudapi/';
                var qa = 'https://cloudapijava.awsqaus.mwwaws.com/cloudapi/';

                //replacing production path based on enviroment
                apiSrcKosmos = (env === 'Development') ? dev : qa;
            }
            //console.log(params);
            var pixel = apiSrcKosmos + type + "/pixel.gif?" + $.param(params);

            var img = new Image();
            img.src = pixel;
            img.onload = function () {
                if (callback && typeof callback === 'function') {
                    callback();
                }
                img = null;
            };
        }

        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                  .toString(16)
                  .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
              s4() + '-' + s4() + s4() + s4();
        }

        ////////////////////// End - New PPC Tracking using Kosmos ///////////////////////////////
        function getEpoch() {
            var now = new Date();
            var epoch = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
            return epoch;
        }

        function mapJobData(obj) {
            return {
                uuid: obj.ppcTrackingGuid || '',
                j_jobid: String(obj.jobId) || '',
                j_postingid: obj.postingId || '',
                j_coc: obj.companyXCode || '',
                j_lid: obj.lid || '',
                j_pvc: obj.providerName,
                j_cid: obj.categoryID || '',
                j_occid: obj.occJobCategoryId || '',
                j_lat: obj.latitude || '',
                j_long: obj.longitude || '',
                j_jpt: obj.jobAdPricingTypeId || '',
                j_p: obj.jobPosition,
                j_jawsid: String(obj.jawsId) || '',

                //j_jpm: undefined,
                //ts: getEpoch(),

                a_placement_id: 'jsr',
                referrer: $location.protocol() + '://' + $location.host()
            }
        }

        function mapMetaData(obj) {
            return {
                s_search_query: $.param($location.search()),
                s_q: obj.keywords || '',
                s_where: obj.location || '',
                j_pg: obj.page_index || '',
                a_affiliate_id: obj.ChannelAlias || ''
            }
        }
    }

    //configured in .config() as 'ppcConfigProvider'
    function provider() {
        //default url
        var serverUrl = 'https://logs.jobs.com/api/';
        return {
            setServerUrl: function (url) {
                serverUrl = url;
            },
            $get: [function () {
                return { url: serverUrl };
            }]
        }
    }

    //Not used ------------------------------------------------------------
    function factory($resource, ppcConfig) {
        return $resource(ppcConfig.url, {}, {
            impression: {
                url: ppcConfig.url + 'impressions/pixel.gif',
                method: 'GET'
            },
            click: {
                url: ppcConfig.url + 'clicks/pixel.gif',
                method: 'GET'
            }
        });
    }
})(angular);