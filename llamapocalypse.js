/*
 * find any news headings and pictures on the page
 * load a llama headline and picture
 */

    //extends array to include a sample function
    Array.prototype.sample = function () {
        return this[Math.floor(Math.random() * this.length)]
    }

    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function getRandomNum() {
        return (Math.floor(Math.random() * 15) + 5).toString();
    }

    function getRandomMost(num) {
        num = parseInt(num);
        return (Math.floor(Math.random() * num) + 1).toString();
    }

    function generateHeadline() {
        var headlines = ['This is a sample headline'];

        decision = viralTemplates.sample();
    }
    function generatePicture() {

    }

    //alright, generate the headlines!
    //get a headline with: generate();
    //find the title on the page
    //this is tricky, because their's no standard headlines
    //so look through all likely element classes for keywords
    //right now it assumes a pretty semantic DOM
    (function() {
        var headings  =  Array.prototype.slice.call(document.querySelectorAll('h1, h2, h3, h4, h5, h6, a')).map(
            function(heading) {
                if(heading.className.toLowerCase().indexOf('story') > -1 ||
                    heading.className.toLowerCase().indexOf('headline') > -1 ||
                    heading.className.toLowerCase().indexOf('title') > -1 ||
                    heading.className.toLowerCase().indexOf('lede') > -1) {

                    if(heading.tagName === 'A' && /\S/.test(heading.innerText)) {
                        heading.innerText = generateHeadline();
                    }
                    else if (heading.tagName !== 'A'){
                        //TODO: Assumes first child link is the article heading
                        var links  = Array.prototype.slice.call(heading.querySelectorAll('a'));
                        if(links.length > 0) {
                            links[0].innerText = generateHeadline();
                        }
                        else {
                            heading.innerText = generateHeadline();
                        }
                    }
                }
            });
    })();

