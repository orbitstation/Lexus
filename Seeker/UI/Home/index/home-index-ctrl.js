(function ($) {
    "use strict";
    angular.module('miniSPA').controller('homeIndexCtrl', ['$scope', '$rootScope', '$timeout', '$window', '$location',controller]);
    function controller($scope, $rootScope, $timeout, $window, $location) {

        $rootScope.logInWatcher(function () {
            //$location.url('/dashboard/');
        });

        $rootScope.isLoaded = true;

        var list = [
            'View the latest job openings',
            'Post a resume online',
            'Get personalized career advice',
            'Figure out your target salary',
            'Find training and education opportunities',
        ];

        $scope.slides = [];

        $scope.slides.push({
            title: 'Create an account',
            subTitle: 'Your free Wordmark® membership starts here!',
            textList: list,
            imgUrl: 'https://securemedia.newjobs.com/id/mgs/10338/hp1.jpg',
            primaryLinkText: 'Create my account',
            primaryLinkUrl: '',
            simpleLinkText: 'I already have an account',
            simpleLinkUrl: ''
        });
        $scope.slides.push({
            title: 'See what’s new!',
            subTitle: 'So many great tools to rev up your job search',
            textList: list,
            iframe: '<iframe class="embed-responsive-item youtube" src="https://www.youtube.com/embed/lE6RYpe9IT0" frameborder="0" allowfullscreen></iframe>',
            primaryLinkText: 'Find a location'
        });
        $scope.slides.push({
            title: 'Talk to us!',
            subTitle: 'Stop in one of our convenient locations',
            textList: list,
            iframe: '<iframe src="https://player.vimeo.com/video/169993072" class="embed-responsive-item vimeo" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
            primaryLinkText: 'Read more',
        });
        $scope.slides.push({
            title: 'Need a career path?',
            subTitle: 'Great career tools to get you started',
            textList: list,
            imgUrl: 'https://securemedia.newjobs.com/id/mgs/10338/hp2.jpg',
            primaryLinkText: 'Get started'
        });
        $scope.slides.push({
            title: 'Need a career path?',
            subTitle: 'Great career tools to get you started',
            textList: list,
            imgUrl: 'https://securemedia.newjobs.com/id/mgs/10338/hp3.jpg',
            primaryLinkText: 'Get started'
        });

        $scope.slickCurrentIndex = 0;
        $scope.slickConfig = {
            arrows: false,
            dots: true,
            autoplay: true,
            //adaptiveHeight: true,
            initialSlide: 0,
            infinite: true,
            autoplaySpeed: 5000,
            method: {},
            event: {
                beforeChange: function (event, slick, currentSlide, nextSlide) {
                    var currSlide, slideType, player, command;

                    //find the current slide element and decide which player API we need to use.
                    currSlide = $(slick.$slider).find(".slick-current");

                    //get the iframe inside this slide.
                    player = currSlide.find("iframe").get(0);

                    //check if the player exists.
                    if (player != undefined) {
                        slideType = $(player).attr("class").split(" ")[1];

                        if (slideType == "vimeo") {
                            command = {
                                "method": "pause",
                                "value": "true"
                            };
                        } else {
                            command = {
                                "event": "command",
                                "func": "pauseVideo"
                            };
                        }

                        //post our command to the iframe.
                        player.contentWindow.postMessage(JSON.stringify(command), "*");
                    }

                },
                afterChange: function (event, slick, currentSlide, nextSlide) {
                    $scope.slickCurrentIndex = currentSlide;
                },
                breakpoint: function (event, slick, breakpoint) {
                    console.log('breakpoint');
                },
                destroy: function (event, slick) {
                    console.log('destroy');
                },
                edge: function (event, slick, direction) {
                    console.log('edge');
                },
                reInit: function (event, slick) {
                    console.log('re-init');
                },
                init: function (event, slick) {
                    //console.log('init');
                },
                setPosition: function (evnet, slick) {
                    //console.log('setPosition');
                },
                swipe: function (event, slick, direction) {
                    //console.log('swipe');
                }
            }
        };

        $scope.$watch("tabs.tabsItems.length", function (newVal, oldVal) {
            if (newVal) {
                countTabContentHeight(true);
            }
        });

        $scope.tabs = {};

        $scope.tabs.activeTabIndex = 0;
        $scope.tabs.displayTabs = true;
        $scope.tabs.displayAccordion = false;

        $scope.tabs.tabsItems = [];
        $scope.tabs.tabsItems.push({
            title: "Sign In",
            order: 1,
            //color: "#828599",
            contentItems: [
                {
                    order: 1,
                    type: "subheading",
                    content: "Already have an account?",
                },
                {
                    order: 2,
                    type: "paragraph",
                    content: "Keep track of all your job opportunities and career tools easily on your dashboard. Change your password or edit your profile information."
                },
                {
                    order: 3,
                    type: "link",
                    align: "right",
                    classes: "btn btn-primary",
                    linkText: "Sign in",
                    linkUrl: "/"
                },
                {
                    order: 4,
                    type: "rule-separator"
                },
                {
                    order: 5,
                    type: "subheading",
                    content: "Employer accounts",
                },
                {
                    order: 6,
                    type: "paragraph",
                    content: "Set up and account and find great matches or post your jobs quickly and easily!"
                },
                {
                    order: 7,
                    type: "link",
                    align: "right",
                    classes: "btn btn-primary ",
                    linkText: "Register",
                    linkUrl: "/"
                },
                {
                    order: 8,
                    type: "link",
                    align: "right",
                    classes: "link-secondary fnt13",
                    linkText: "I already have an account",
                    linkUrl: "/"
                },
            ]
        });
        $scope.tabs.tabsItems.push({
            title: "About us",
            order: 2,
            //color: "#718C39",
            contentItems: [
                {
                    type: "heading",
                    order: 1,
                    content: "Welcome to Wordmark"
                },
                {
                    type: "subheading",
                    order: 2,
                    content: "We have taglines that work well for you."
                },
                {
                    type: "paragraph",
                    order: 3,
                    content: "Of brilliant syntheses, colonies shores of the cosmic ocean corpus callosum white dwarf trillion science preserve and cherish that pale blue dot. A still more glorious dawn awaits Tunguska event."
                },
                {
                    type: "paragraph",
                    order: 4,
                    content: "The carbon in our apple pies not a sunrise but a galaxyrise Rig Veda gathered by gravity ship of the imagination stirred by starlight as a patch of light light years vanquish the impossible science Flatland how far away colonies bits of moving flu tendrils of gossamer clouds."
                },
                {
                    order: 5,
                    type: "separator",
                    height: 40
                },
                {
                    order: 10,
                    type: "link",
                    align: "right",
                    classes: "btn btn-primary",
                    linkText: "Find out more",
                    linkUrl: "/"
                },
            ]
        });
        $scope.tabs.tabsItems.push({
            title: "Training",
            order: 2,
            //color: "#5C6D87",
            contentItems: [
                {
                    type: "heading",
                    order: 1,
                    content: "Knowledge is power"
                },
                {
                    type: "subheading",
                    order: 2,
                    content: "Training and education for every budget."
                },
                {
                    type: "paragraph",
                    order: 3,
                    content: "Of brilliant syntheses, colonies shores of the cosmic ocean corpus callosum white dwarf trillion science preserve and cherish that pale blue dot. A still more glorious dawn awaits Tunguska event."
                },
                {
                    order: 4,
                    type: "video",
                    subtype: "embedded",
                    code: '<iframe class="embed-responsive-item youtube" src="https://www.youtube.com/embed/lE6RYpe9IT0" frameborder="0" allowfullscreen></iframe>',

                },
                {
                    order: 5,
                    type: "separator",
                },
                {
                    order: 10,
                    type: "link",
                    align: "right",
                    classes: "btn btn-primary",
                    linkText: "Get training",
                    linkUrl: "/"
                },

            ]
        });
        $scope.tabs.tabsItems.push({
            title: "Unemployment benefits",
            order: 2,
            //color: "#C68F2B",
            contentItems: [
                {
                    type: "heading",
                    order: 1,
                    content: "Benefit information"
                },
                {
                    type: "subheading",
                    order: 2,
                    content: "We can help you navigate unemployment."
                },
                {
                    type: "paragraph",
                    order: 3,
                    content: "Of brilliant syntheses, colonies shores of the cosmic ocean corpus callosum white dwarf trillion science preserve and cherish that pale blue dot. A still more glorious dawn awaits Tunguska event."
                },
                {
                    type: "paragraph",
                    order: 4,
                    content: "The carbon in our apple pies not a sunrise but a galaxyrise Rig Veda gathered by gravity ship of the imagination stirred by starlight as a patch of light light years vanquish the impossible science Flatland how far away colonies bits of moving flu tendrils of gossamer clouds."
                },
                {
                    order: 5,
                    type: "separator",
                    height: 40
                },
                {
                    order: 10,
                    type: "link",
                    align: "right",
                    classes: "btn btn-primary",
                    linkText: "View benets page",
                    linkUrl: "/"
                },

            ]
        });
        $scope.tabs.tabsItems.push({
            title: "Career Advice",
            order: 2,
            //color: "#233C80",
            contentItems: [
                {
                    type: "heading",
                    order: 1,
                    content: "Get ready for your career"
                },
                {
                    type: "subheading",
                    order: 2,
                    content: "Jobs are great. Carreers are better."
                },
                {
                    type: "paragraph",
                    order: 3,
                    content: "Of brilliant syntheses, colonies shores of the cosmic ocean corpus callosum white dwarf trillion science preserve and cherish that pale blue dot. A still more glorious dawn awaits Tunguska event."
                },
                {
                    type: "paragraph",
                    order: 4,
                    content: "The carbon in our apple pies not a sunrise but a galaxyrise Rig Veda gathered by gravity ship of the imagination stirred by starlight as a patch of light light years vanquish the impossible science Flatland how far away colonies bits of moving flu tendrils of gossamer clouds."
                },
                {
                    type: "paragraph",
                    order: 5,
                    content: "Of brilliant syntheses, colonies shores of the cosmic ocean corpus callosum white dwarf trillion science preserve and cherish that pale blue dot. A still more glorious dawn awaits Tunguska event."
                },
                {
                    type: "paragraph",
                    order: 6,
                    content: "The carbon in our apple pies not a sunrise but a galaxyrise Rig Veda gathered by gravity ship of the imagination stirred by starlight as a patch of light light years vanquish the impossible science Flatland how far away colonies bits of moving flu tendrils of gossamer clouds."
                },
                {
                    type: "paragraph",
                    order: 7,
                    content: "Of brilliant syntheses, colonies shores of the cosmic ocean corpus callosum white dwarf trillion science preserve and cherish that pale blue dot. A still more glorious dawn awaits Tunguska event."
                },
                {
                    type: "paragraph",
                    order: 8,
                    content: "The carbon in our apple pies not a sunrise but a galaxyrise Rig Veda gathered by gravity ship of the imagination stirred by starlight as a patch of light light years vanquish the impossible science Flatland how far away colonies bits of moving flu tendrils of gossamer clouds."
                },
                {
                    order: 9,
                    type: "separator",
                    height: 40
                },
                {
                    order: 10,
                    type: "link",
                    align: "right",
                    classes: "btn btn-primary ",
                    linkText: "Start my career",
                    linkUrl: "/"
                },

            ]
        });
        $scope.tabs.tabsItems.push({
            title: "Veterans",
            order: 2,
            //color: "#353B52",
            contentItems: [
                {
                    type: "heading",
                    order: 1,
                    content: "Lorem ipsum"
                },
                {
                    type: "subheading",
                    order: 2,
                    content: "Jobs are great. Carreers are better."
                },
                {
                    type: "paragraph",
                    order: 3,
                    content: "Of brilliant syntheses, colonies shores of the cosmic ocean corpus callosum white dwarf trillion science preserve and cherish that pale blue dot. A still more glorious dawn awaits Tunguska event."
                },
                {
                    type: "paragraph",
                    order: 4,
                    content: "The carbon in our apple pies not a sunrise but a galaxyrise Rig Veda gathered by gravity ship of the imagination stirred by starlight as a patch of light light years vanquish the impossible science Flatland how far away colonies bits of moving flu tendrils of gossamer clouds."
                },
                {
                    order: 5,
                    type: "separator",
                    height: 40
                },
                {
                    order: 10,
                    type: "link",
                    align: "right",
                    classes: "btn btn-primary",
                    linkText: "Link",
                    linkUrl: "/"
                },

            ]
        });

        var screenSmallDevicesWidth = 768;

        var tabsConfig = {
            tabMinHeight: 76,
            minTabCountForHeight: 6,
            tabContentSelector: ".tab-content",
            tabContentHeight: 0
        };

        $scope.tabs.tabselected = function (i, color) {
            $scope.tabs.activeTabIndex = i;
            //$(tabsConfig.tabContentSelector).css("background-color", color);
            countTabContentHeight(false);
        }

        checkView();

        $window.onresize = function () {
            checkView();
        }

        function checkView() {
            var screenWidth = $window.innerWidth;
            if (screenWidth < screenSmallDevicesWidth) {
                $scope.tabs.displayTabs = false;
                $scope.tabs.displayAccordion = true;
                tabsConfig.tabContentHeight = 0;
            } else {
                $scope.tabs.displayTabs = true;
                $scope.tabs.displayAccordion = false;
            }
        }

        function countTabContentHeight(forceRecount) {
            if ((!tabsConfig.tabContentHeight || forceRecount) && $scope.tabs.displayTabs) {
                var tabContentHeight = (($scope.tabs.tabsItems.length >= tabsConfig.minTabCountForHeight) ? $scope.tabs.tabsItems.length : tabsConfig.minTabCountForHeight) * tabsConfig.tabMinHeight;
                if ($(tabsConfig.tabContentSelector).length) {
                    $(tabsConfig.tabContentSelector).css("height", tabContentHeight + "px");
                    tabsConfig.tabContentHeight = tabContentHeight;
                }
            }
        }
    }

})(jQuery);


