(function(window, document, undefined){
    _.templateSettings = {
      interpolate : /\{\{(.+?)\}\}/g
    };
    
    window.wtp = window.wtp || {};
    
    wtp.key = 'xeUpEtux3Egbt5V';
    wtp.idReg = new RegExp(/id=([A-Za-z0-9]*)/);
    wtp.tpl = _.template('<h1>{{ title }}</h1>\
    <p>Goal: {{ signatures.threshold }}</p>\
    <p>Signatures: {{ signatures.count }}</p>\
    <p>Signatures needed: {{ signatures.needed }}</p>\
    <p><a href="{{ url }}">Sign the petition</a></p>\
    ');
    
    wtp.baseUrl = "https://petitions.whitehouse.gov/api/v1/";
    
    /*
    *
    */
    wtp.buildUrl = function(method, callback){
        console.log("building url");
        console.log(method);
        console.log(callback);
        console.log(wtp.baseUrl + method + '.jsonp?key=' + wtp.key + 'callback=' + callback);
        return wtp.baseUrl + method + '.jsonp?key=' + wtp.key + '&callback=' + callback;
    };
    
    wtp.dispatchError = function(){
        console.log("an error, that's all i got");
    };
    
    window.wtpcallback = function(data){
        var petition;
        if (data.results.length > 0){
            petition = data.results[0];
        } else {
            wtp.dispatchError();
            return;
        }
        
        $('#wrapper').html(wtp.tpl({title: petition.title,
                                    signatures: {
                                        threshold: petition["signature threshold"],
                                        count: petition["signature count"],
                                        needed: petition["signatures needed"]
                                    },
                                    url: petition.url
                                    })
                                    );
        
        
    };
    
    $.getScript(wtp.buildUrl('petitions/' + wtp.idReg.exec(document.location.search)[1], "wtpcallback"));
    
    
}(window, document));