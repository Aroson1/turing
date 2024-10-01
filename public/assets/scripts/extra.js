// jQuery Selections
var $html = $('html'),
    $container = $('#container'),
    $prompt = $('#prompt'),
    $toggle = $('#toggle'),
    $about = $('#about'),
    $scene = $('#scene'),
    $chat = $('#chat'),
    $infobox = $('#infoBox'),
    $chatbutton = $('#chatbutton'),
    $imagechat = $('#imageChat'),
    $imagebtn = $('#imagebtn');
var textChat = document.getElementById("chatbutton");
var imageChat = document.getElementById("imagebtn");

// Hide browser menu.
(function () {
    setTimeout(function () { window.scrollTo(0, 0); }, 0);
})();

// Setup FastClick.
FastClick.attach(document.body);

// Add touch functionality.
if (Hammer.HAS_TOUCHEVENTS) {
    $container.hammer({ drag_lock_to_axis: true });
    _.tap($html, 'a,button,[data-tap]');
}

// Add touch or mouse class to html element.
$html.addClass(Hammer.HAS_TOUCHEVENTS ? 'touch' : 'mouse');

// Resize handler.
(resize = function () {
    $scene[0].style.width = window.innerWidth + 'px';
    $scene[0].style.height = window.innerHeight + 'px';
    if (!$prompt.hasClass('hide')) {
        if (window.innerWidth < 600) {
            $toggle.addClass('hide');
        } else {
            $toggle.removeClass('hide');
        }
    }
})();

// Attach window listeners.
window.onresize = _.debounce(resize, 200);
window.onscroll = _.debounce(resize, 200);

//Toggel fuctionality for the main panel
function showDetails() {
    $about.removeClass('hide');
    $toggle.removeClass('i');
}

function hideDetails() {
    $about.addClass('hide');
    $toggle.addClass('i');
}

// Listen for toggle click event.
$toggle.on('click', function (event) {
    $toggle.hasClass('i') ? showDetails() : hideDetails();
});



//Toggle fuctionality for the chat button
function showChat() {
    $chat.removeClass('hidden');
    $infobox.addClass('hidden');
    $imagechat.addClass('hidden');
    $chatbutton.removeClass('i');
    // change the text of the button to "Go back"
    $chatbutton.html("Go <br>back");
    $imagebtn.html("Sketch your <br>adventure");
    $imagebtn.addClass('disabled fade');
    $chatbutton.removeClass('disabled fade');
    textChat.disabled = false;
}

function hideChat() {
    $imagechat.addClass('hidden');
    $chat.addClass('hidden');
    $infobox.removeClass('hidden');
    $chatbutton.addClass('i');
    $chatbutton.html("Start a new <br>adventure");
    $imagebtn.removeClass('disabled fade');
    $chatbutton.removeClass('disabled fade');
    textChat.disabled = true;
}

// Listen for chat click event.
$chatbutton.on('click', function (event) {
    $chatbutton.hasClass('i') ? showChat() : hideChat();
});



//Toggle fuctionality for the image chat button
function showImageChat() {
    $infobox.addClass('hidden');
    $chat.addClass('hidden');
    $imagechat.removeClass('hidden');
    $imagebtn.removeClass('i');
    $imagebtn.html("Go <br>back ");
    $chatbutton.html("Start a new <br>adventure");


    // $chatbutton.prop('disabled', false);
    $imagebtn.removeClass('disabled fade');
    $chatbutton.addClass('disabled fade');
    imageChat.disabled = false;
}

function hideImageChat() {
    $imagechat.addClass('hidden');
    $chat.addClass('hidden');
    $infobox.removeClass('hidden');
    $imagebtn.addClass('i');
    $imagebtn.html("Sketch your <br>adventure");
    $chatbutton.html("Start a new <br>adventure");
    $imagebtn.removeClass('disabled fade');
    $chatbutton.removeClass('disabled fade');
    // $chatbutton.prop('disabled', true);
    imageChat.disabled = true;
}

//listen for imagechat click event
$imagebtn.on('click', function (event) {
    $imagebtn.hasClass('i') ? showImageChat() : hideImageChat();
});



$scene.parallax();


setTimeout(function () {
    if ($scene.data('mode') === 'cursor') {
        $prompt.removeClass('hide');
        if (window.innerWidth < 600) $toggle.addClass('hide');
        $prompt.on('click', function (event) {
            $prompt.addClass('hide');
            if (window.innerWidth < 600) {
                setTimeout(function () {
                    $toggle.removeClass('hide');
                }, 1200);
            }
        });
    }
}, 1000);