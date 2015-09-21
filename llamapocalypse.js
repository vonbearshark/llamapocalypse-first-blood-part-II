/*
 * find any news headings and pictures on the page
 * load a llama headline and picture
 */

    function generateHeadline() {
        var headlines = ['All Your Base are Belong to Us!', 'New (Better) World Order Established!',
        'Scientist Llama to Send Robot Back in Time to Kill Leader of Human Resistence, Hopes it Won\'t Lead to Time-Travel Shenanigans',
        'Could Human Tears Actually be Harmful? Why Bother Finding Out When They are So Delicious!',
        'LIVE: These Adorable Humans Tried to Escape. What Happened Next was Absolutely CRAZY!', 'Only 90s Llamas Will Get These Whimsical References!',
        'Top 10 Internment Camps to Send Your Newly Captured Humans! (#3 Made Me Question My Sexuality)', 'Llama Odom Scores Points in Llama Equivalent of Basketball',
        'Which Llama-Friends Character Are YOU?', 'Human Capitals Aflame!', 'Llamas Walk on Moon', 'Llama-Child-Star at It Again!',
        'Esteemed Llama Celebrity Passes Away', 'Human Fear Consumption Linked to Good Health, Claims Popular Llama Medical Journal',
        'Human Menace Stopped!', 'Human Prisoners Forced to Eat Leaders', 'The Dalai Human Agrees: Human Punishment Morally A-OK',
        'Llama Sports Team Beats Other Llama Sports Team 5-0', 'Only 80s Llamas Will Understand These Krazy Human-Skin Sweaters!',
        'Scientists Channel Human Sobs into Electricity', 'Drop Everything and Check Out This Scandalous Picture of the Llama Royal Family!',
        'Top 15 Unknown Llama Uprising Heroes (You Will Never Believe #12!!!!)', 'Human Bill Murray Spared',
        'Llama World-President To Pardon Humans (LOL, JK)', 'Llama Wall Street Booming', 'Peace in Llama Middle East',
        '13 Llama Celebrities You Never Knew Were Once Human Pets', 'Human Petting Zoo Erected for Irony', 'Llamas Give Up; All Hiding Humans May Come Out Now (For Real)',
        'Llama Kardashians Still a Thing, I Guess', 'New Llama Society Rises from the Ashes', 'New Dominant Species Off to a Great Start!',
        'Human Conflict Now Seem Silly', 'Llamas Have Last Laught In Inter-Species War', 'Victory Over Human Day!',
        'Llama-Internet Also Cat-Based', 'Feast Your Eyeballs on These Cat Pictures!'];

        return headlines[Math.floor(Math.random() * headlines.length)];
    }
    function generatePicture() {
        var pictures = ["llamaBase.png", "labcoat.png", "bloodCoat.png",
                "briefcase.png", "businessCoat.png", "eyeGlass.png",
                "eyePatch.png", "ballcap.png", "fancyCoat.png",
                "forkKnifeSeveredHand.png", "GICoat.png", "helmet.png",
                "jersey.png", "mustache.png", "normalCoat1.png",
                "normalCoat2.png", "normalCoat3.png", "pipe.png",
                "sunglasses.png", "topHat.png"];
        return pictures[Math.floor(Math.random() * pictures.length)];
    }
    //alright, generate the headlines!
    //find the title on the page
    //this is tricky, because their's no standard headlines
    //so look through all likely element classes for keywords
    //right now it assumes a pretty semantic DOM
    //for images: find all images, replace with llama pngs
    window.addEventListener('load', function() {
        var headings  =  Array.prototype.slice.call(document.querySelectorAll('div, h1, h2, h3, h4, h5, h6, a')).map(
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
                        var immediateLinkChild  = Array.prototype.slice.call(heading.querySelectorAll('a'))[0];
                        if(immediateLinkChild) {
                            //Shouldn't alter inner text if there's an child image tag
                            var immediateImgChildren  = Array.prototype.slice.call(immediateLinkChild.querySelectorAll('img'));
                            if(!immediateImgChildren.length > 0) {
                                immediateLinkChild.innerText = generateHeadline();
                            }
                        }
                        else if (heading.tagName !== 'DIV') {
                            heading.innerText = generateHeadline();
                        }
                    }
                }
            });
        var images = Array.prototype.slice.call(document.querySelectorAll('img')).map(
            function(image) {
                image.src = chrome.extension.getURL('assets/' + generatePicture());
            });
    }, false);
