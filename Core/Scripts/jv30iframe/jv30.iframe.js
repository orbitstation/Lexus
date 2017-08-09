(function(){
    if (parent && typeof parent === 'object') {
        var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
        var eventer = window[eventMethod];
        var content;

        eventer('DOMContentLoaded', function () {
            content = document.getElementById('content');
            //initial load
            postMessageTo(parent);
            //resize changes
			eventer('resize', function () {
				postMessageTo(parent);
			}, false);
            
			changeDom();
		});
		
        function postMessageTo(p) {
            var iframeData = {
                height: content.clientHeight,
                content: {
                    title: document.title
                }
            }
            var payload = encodeURIComponent(JSON.stringify(iframeData));
            p.postMessage('iframe' + payload, '*');
        }

        //responsive fix
        function changeDom(){
            var row = $('.w-job-view');
            var columns = row.find('div[class^="col-md"]');
            columns.each(function (i, col) {
                var $col = $(col);
                if ($col.hasClass('col-md-8')) {
                    $col.addClass('col-sm-8');
                }
                else if ($col.hasClass('col-md-4')) {
                    $col.addClass('col-sm-4');
                    $col.find('.col-sm-6').addClass('col-sm-12').removeClass('col-sm-6');
                }
            });
        }
	}
})();