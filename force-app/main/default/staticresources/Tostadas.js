(function(window, $A) {
    function checkString (s) {
        if (s == undefined || s == null) {
            s = '';
        } else if (typeof s != 'string') {
            s = String(s);
        }
        return s;
    }
    function display (toast) {
        var event = $A.get('e.force:showToast');
        event.setParams({
            'title': toast.title,
            'message': toast.message,
            'type': toast.type,
            'mode': toast.mode,
            'duration': toast.duration
        });
        event.fire();
    }
    function toast (mode, duration) {
        if (mode == undefined || mode == null) {
            this.mode = mode;
        } else {
            this.mode = 'pester';
        }
        if (duration == undefined || duration == null) {
            this.duration = duration;
        } else {
            this.duration = 5000;
        }
        this.info = function (title, message) {
            this.title = checkString(title);
            this.message = checkString(message);
            this.type = 'info';
            display(this);
        };
        this.success = function (title, message) {
            this.title = checkString(title);
            this.message = checkString(message);
            this.type = 'success';
            display(this);
        };
        this.warning = function (title, message) {
            this.title = checkString(title);
            this.message = checkString(message);
            this.type = 'warning';
            display(this);
        };
        this.error = function (title, message) {
            this.title = checkString(title);
            this.message = checkString(message);
            this.type = 'error';
            display(this);
        }
        return this;
    }
    window.toast = toast;
}) (window, $A);