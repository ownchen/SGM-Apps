Date.prototype.format = function(format) {
    var o =
        {
            "M+": this.getMonth() + 1, //month
            "d+": this.getDate(),    //day
            "h+": this.getHours(),   //hour
            "m+": this.getMinutes(), //minute
            "s+": this.getSeconds(), //second
            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
            "S": this.getMilliseconds() //millisecond
        }

    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}


if (!this.JSON2) {
    JSON2 = function() {
        function f(n) {
            return n < 10 ? '0' + n : n;
        }
        var escapeable = /["\\\x00-\x1f\x7f-\x9f]/g,
            gap,
            indent,
            meta = {    // table of character substitutions
                '\b': '\\b',
                '\t': '\\t',
                '\n': '\\n',
                '\f': '\\f',
                '\r': '\\r',
                '"': '\\"',
                '\\': '\\\\'
            },
            rep;


        function quote(string) {
            return escapeable.test(string) ?
                '"' + string.replace(escapeable, function(a) {
                    var c = meta[a];
                    if (typeof c === 'string') {
                        return c;
                    }
                    c = a.charCodeAt();
                    return '\\u00' + Math.floor(c / 16).toString(16) +
                                               (c % 16).toString(16);
                }) + '"' :
                '"' + string + '"';
        }


        function str(key, holder) {
            var i,
                k,
                v,
                length,
                mind = gap,
                partial,
                value = holder[key];
            if (value && typeof value === 'object' &&
                    typeof value.toJSON === 'function') {
                value = value.toJSON(key);
            }
            if (typeof rep === 'function') {
                value = rep.call(holder, key, value);
            }
            switch (typeof value) {

                case 'string':
                    return quote(value);

                case 'number':
                    return isFinite(value) ? String(value) : 'null';

                case 'boolean':
                case 'null':
                    return String(value);
                case 'object':
                    if (!value) {
                        return 'null';
                    }
                    if (value.toUTCString) {
                        var xx = '"\\/Date(' + value.getTime() + ')\\/"';
                        return xx;
                    }
                    gap += indent;
                    partial = [];
                    if (typeof value.length === 'number' &&
                        !(value.propertyIsEnumerable('length'))) {
                        length = value.length;
                        for (i = 0; i < length; i += 1) {
                            partial[i] = str(i, value) || 'null';
                        }
                        v = partial.length === 0 ? '[]' :
                        gap ? '[\n' + gap + partial.join(',\n' + gap) +
                                  '\n' + mind + ']' :
                              '[' + partial.join(',') + ']';
                        gap = mind;
                        return v;
                    }
                    if (typeof rep === 'object') {
                        length = rep.length;
                        for (i = 0; i < length; i += 1) {
                            k = rep[i];
                            if (typeof k === 'string') {
                                v = str(k, value, rep);
                                if (v) {
                                    partial.push(quote(k) + (gap ? ': ' : ':') + v);
                                }
                            }
                        }
                    } else {
                        for (k in value) {
                            v = str(k, value, rep);
                            if (v) {
                                partial.push(quote(k) + (gap ? ': ' : ':') + v);
                            }
                        }
                    }
                    v = partial.length === 0 ? '{}' :
                    gap ? '{\n' + gap + partial.join(',\n' + gap) +
                              '\n' + mind + '}' :
                          '{' + partial.join(',') + '}';
                    gap = mind;
                    return v;
            }
        }
        return {
            stringify: function(value, replacer, space) {
                var i;
                gap = '';
                indent = '';
                if (space) {
                    if (typeof space === 'number') {
                        for (i = 0; i < space; i += 1) {
                            indent += ' ';
                        }
                    } else if (typeof space === 'string') {
                        indent = space;
                    }
                }
                if (!replacer) {
                    rep = function(key, value) {
                        if (!Object.hasOwnProperty.call(this, key)) {
                            return undefined;
                        }
                        return value;
                    };
                } else if (typeof replacer === 'function' ||
                        (typeof replacer === 'object' &&
                         typeof replacer.length === 'number')) {
                    rep = replacer;
                } else {
                    throw new Error('JSON.stringify');
                }
                return str('', { '': value });
            },
            parse: function(text, reviver) {
                var j;
                function walk(holder, key) {
                    var k, v, value = holder[key];
                    if (value && typeof value === 'object') {
                        for (k in value) {
                            if (Object.hasOwnProperty.call(value, k)) {
                                v = walk(value, k);
                                if (v !== undefined) {
                                    value[k] = v;
                                } else {
                                    delete value[k];
                                }
                            }
                        }
                    }
                    return reviver.call(holder, key, value);
                }
                if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
                    replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
                    replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                    var regEx = /(\"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}.*?\")|(\"\\*\/Date\(.*?\)\\*\/")/g;
                    text = text.replace(regEx, this.regExDate);
                    j = eval('(' + text + ')');
                    return typeof reviver === 'function' ?
                        walk({ '': j }, '') : j;
                }
                throw new SyntaxError('JSON.parse');
            },
            dateFormat: function(jsonDate, format) {
                var d = jsonDate;
                return eval("new " + d.substr(1, d.length - 2)).format(format);
            },
            strToDate: function(date, format) {
                var reg = new RegExp(/y|d|h|M|s|m|q|S/gi);
                format = format.replace(reg, "");
                var len = format.length;
                var arr = new Array();
                var cmd = "/";


                for (var i = 0; i < len; i++) {
                    var sign = format.charAt(i);
                    if (sign == " ") {
                        cmd = ":";
                        continue;
                    }
                    if (sign != cmd) {
                        date = date.replace(sign, cmd);
                    }

                }
                var dt = new Date(date);

                return "/Date(" + Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate(), dt.getHours() - 8, dt.getMinutes(), dt.getSeconds()) + "+0800)/";
            },
            regExDate: function(str, p1, p2, offset, s) {
                str = str.substring(1).replace('"', '');
                var date = str;
                if (/\/Date(.*)\//.test(str)) {
                    str = str.match(/Date\((.*?)\)/)[1];
                    date = "new Date(" + parseInt(str) + ")";
                }
                else {
                    var matches = str.split(/[-,:,T,Z]/);
                    matches[1] = (parseInt(matches[1], 0) - 1).toString();
                    date = "new Date(Date.UTC(" + matches.join(",") + "))";
                }
                return date;
            },

            quote: quote
        };
    } ();
}