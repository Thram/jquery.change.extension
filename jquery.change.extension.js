/**
 * Created by thram on 2/07/15.
 */
(function ($) {
    // maintain a reference to the existing function
    var oldprop = $.fn.prop;
    // ...before overwriting the jQuery extension point
    $.fn.prop = function () {
        // original behavior - use function.apply to preserve context
        if (this[0]) {
            var ret;
            if (arguments.length > 1) {
                var oldVal = this[0][arguments[0]];
                ret = oldprop.apply(this, arguments);
                var newVal = ret[0][arguments[0]];
                if (oldVal != newVal) {
                    $(this).trigger('change');
                }
            } else {
                var hasChange = false;
                if (typeof arguments[0] === 'object') {
                    var oldVals = this[0];
                    var newVals = arguments[0];
                    $.each(newVals, function (key, val) {
                        if (oldVals[key] != undefined && oldVals[key] != val) {
                            hasChange = true;
                            return false;
                        }
                    });
                }
                ret = oldprop.apply(this, arguments);
                if (hasChange)
                    $(this).trigger('change');
            }
            // stuff I will be extending
            // that doesn't affect/change
            // the way .css() works

            // preserve return value (probably the jQuery object...)
            return ret;
        }

    };

    var oldattr = $.fn.attr;
    // ...before overwriting the jQuery extension point
    $.fn.attr = function () {
        // original behavior - use function.apply to preserve context
        if (this[0]) {
            var ret;
            if (arguments.length > 1) {
                var oldVal = this[0].getAttribute(arguments[0]);
                ret = oldattr.apply(this, arguments);
                var newVal = ret[0].getAttribute(arguments[0]);
                if (oldVal != newVal) {
                    $(this).trigger('change');
                }
            } else {
                var hasChange = false;
                if (typeof arguments[0] === 'object') {
                    var oldVals = this[0];
                    var newVals = arguments[0];
                    $.each(newVals, function (key, val) {
                        var attribute = oldVals.getAttribute(key);
                        if (attribute != undefined && attribute != val) {
                            hasChange = true;
                            return false;
                        }
                    });
                }
                ret = oldattr.apply(this, arguments);
                if (hasChange)
                    $(this).trigger('change');
            }
            // stuff I will be extending
            // that doesn't affect/change
            // the way .css() works

            // preserve return value (probably the jQuery object...)
            return ret;
        }
    };
    
})(jQuery);
