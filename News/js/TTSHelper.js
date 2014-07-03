/**
 * Text To Speech Utility (TTS)
 * 
 * @requires App.Controllers.sponsor
 */
App.TTSHelper = Em.Object.create({
    // Properties
    _ttsHandle: null,
    
    isSpeaking: function() {
        
    }.property('_ttsHandle'),
    
    speak: function(text, success, failure) {       
        var self = this;
        
        self.stopSpeaking();
        
        // TODO (mattk) : GM Docs say this callback is invoked when the reading is complete.
        // But it is actually called when the output begins (starts reading).
        // {function} Success
        // -Function to be invoked upon completion of reading the provided text string.
        var onSuccess = function() {
            self.set('_ttsHandle', null); 
            if (success) {
                success();
            }    
        };
        
        var onFail = function() {
            self.set('_ttsHandle', null);
            if (failure) {
                failure();
            }
        };
        var _ttsHandle = gm.voice.startTTS(onSuccess, onFail, text);
        
        self.set('_ttsHandle', _ttsHandle);
    },
        
    stopSpeaking: function() {
        var self = this;
        var _ttsHandle = self.get('_ttsHandle');
        
        if (_ttsHandle) {
            // TODO (mattk) stopTTS method does not seem to work.  Did the early call to success invalidate the _ttsHandle?
            gm.voice.stopTTS(_ttsHandle);
            self.set('_ttsHandle', null);
        }
    },
    
    speakForecast: function(forecastPrefix, forecastText, $highlightElement) {
        var self = this,
            adUnit = App.Controllers.sponsor.get('adUnit'),
            text;
        
        if (adUnit && adUnit.sponsorship && adUnit.sponsorship.preroll && adUnit.sponsorship.postroll) {
            text = [forecastPrefix, adUnit.sponsorship.preroll, forecastText, adUnit.sponsorship.postroll].join(' ');
        } else {
            text = forecastPrefix + ' ' + forecastText;
        }

        $('.tts-active').removeClass('tts-active');
        $highlightElement && $highlightElement.addClass('tts-active');

        // The GM SDK hangs for a while when requesting TTS, so this is in a setTimeout-0 to allow the addition
        // of the tts-active class to redraw on the screen before the SDK hangs the app.
        setTimeout(function() {
            self.speak(text, function() {
                $highlightElement && $highlightElement.removeClass('tts-active');
            }, function() {
                $highlightElement && $highlightElement.removeClass('tts-active');
            });
        }, 0);
    }
});