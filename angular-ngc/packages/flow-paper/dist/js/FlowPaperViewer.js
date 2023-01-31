var eb;
var wi;
var hoverPage;
var hoverPageObject;
var midy;

var intfMemoize = function (passedFunc) {
    var cache = {};
    return function (x, y) {
        if (x in cache) return cache[x];
        return cache[x] = passedFunc(x, y);
    };
};

var intfSanitizePageWords = intfMemoize(function(memoizationKey, fa){
    try {
        var el = fa;
        el.chars = DOMPurify.sanitize(el.chars);
        el.d = DOMPurify.sanitize(el.d);
        el.readableText = DOMPurify.sanitize(el.readableText);
        el.str = DOMPurify.sanitize(el.str);
        el.text = DOMPurify.sanitize(el.text);
        el.unicode = DOMPurify.sanitize(el.unicode);
        return el;
    } catch(e) {
        console.log('e', e)
        return fa;
    }
});
window["Mark"] = function Mark() {
    this.id = "";
    this.selection_text = "";
    this.has_selection = false;
    this.color = "";
    this.selection_info = "";
    this.readonly = false;
    this.type = "";
};
var k = void 0,
  q = !0,
  r = null,
  y = !1;

function z() {
    return function() {};
}

function aa(g) {
    return function() {
        return g;
    };
}
var D, FLOWPAPER = window.FLOWPAPER ? window.FLOWPAPER : window.FLOWPAPER = {},
  ba = 1,
  ca = ba;
FLOWPAPER.tg = function() {
    var g = [];
    return {
        Ql: function(c) {
            g.push(c);
        },
        notify: function(c, d) {
            for (var e = 0, f = g.length; e < f; e++) {
                var m = g[e];
                if (m[c]) {
                    m[c](d);
                }
            }
        }
    };
}();

function da(g) {
    ca >= ba && FLOWPAPER.tg.notify("warn", g);
}

function H(g, c, d, e) {
    try {
        throw Error();
    } catch (f) {
        f.stack && f.stack.split("\n").slice(2);
    }
    FLOWPAPER.tg.notify("error", g);
    d && c && (e ? jQuery("#" + d).trigger(c, e) : jQuery("#" + d).trigger(c));
    throw Error(g);
}
FLOWPAPER.ih = {
    init: function() {
        if ("undefined" == typeof eb || !eb) {
            eb = {};
        }
        var g = navigator.userAgent.toLowerCase(),
          c = location.hash.substr(1),
          d = y,
          e = "";
        0 <= c.indexOf("mobilepreview=") && (d = q, e = c.substr(c.indexOf("mobilepreview=")).split("&")[0].split("=")[1]);
        var f;
        try {
            f = "ontouchstart" in document.documentElement;
        } catch (m) {
            f = y;
        }
        if (!f && (g.match(/iphone/i) || g.match(/ipod/i) || g.match(/ipad/i))) {
            d = q;
        }
        c = eb;
        f = /win/.test(g);
        var n = /mac/.test(g),
          l;
        if (!(l = d)) {
            var s;
            try {
                s = "ontouchstart" in document.documentElement;
            } catch (h) {
                s = y;
            }
            l = s || g.match(/touch/i) || navigator.wk || navigator.msPointerEnabled;
        }
        c.platform = {
            win: f,
            mac: n,
            touchdevice: l,
            ios: d && ("ipad" == e || "iphone" == e) || g.match(/iphone/i) || g.match(/ipod/i) || g.match(/ipad/i),
            android: d && "android" == e || -1 < g.indexOf("android"),
            te: d && ("ipad" == e || "iphone" == e) || navigator.userAgent.match(/(iPad|iPhone);.*CPU.*OS 6_\d/i),
            iphone: d && "iphone" == e || g.match(/iphone/i) || g.match(/ipod/i),
            ipad: d && "ipad" == e || g.match(/ipad/i),
            winphone: g.match(/Windows Phone/i) || g.match(/iemobile/i) || g.match(/WPDesktop/i),
            bl: g.match(/Windows NT/i) && g.match(/ARM/i) && g.match(/touch/i),
            hi: navigator.wk || navigator.msPointerEnabled,
            blackberry: g.match(/BlackBerry/i) || g.match(/BB10/i),
            webos: g.match(/webOS/i),
            jj: -1 < g.indexOf("android") && !(jQuery(window).height() < jQuery(window).width()),
            mobilepreview: d,
            Cb: window.devicePixelRatio ? window.devicePixelRatio : 1
        };
        d = eb;
        e = document.createElement("div");
        e.innerHTML = "000102030405060708090a0b0c0d0e0f";
        d.Pc = e;
        eb.platform.touchonlydevice = eb.platform.touchdevice && (eb.platform.android || eb.platform.ios || eb.platform.blackberry || eb.platform.webos) || eb.platform.winphone || eb.platform.bl;
        eb.platform.tc = eb.platform.touchonlydevice && (eb.platform.iphone || eb.platform.jj || eb.platform.blackberry);
        eb.platform.ios && (d = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/), d != r && 1 < d.length ? (eb.platform.iosversion = parseInt(d[1], 10), eb.platform.te = 6 <= eb.platform.iosversion) : eb.platform.te = q);
        eb.browser = {
            version: (g.match(/.+?(?:rv|it|ra|ie)[\/: ]([\d.]+)(?!.+opera)/) || [])[1],
            gc: (g.match(/.+?(?:version|chrome|firefox|opera|msie|OPR)[\/: ]([\d.]+)(?!.+opera)/) || [])[1],
            safari: (/webkit/.test(g) || /applewebkit/.test(g)) && !/chrome/.test(g),
            opera: /opera/.test(g),
            msie: /msie/.test(g) && !/opera/.test(g) && !/applewebkit/.test(g),
            Vc: ("Netscape" == navigator.appName && /Trident\/.*rv:([0-9]{1,}[.0-9]{0,})/.exec(navigator.userAgent) != r || 0 < g.indexOf("edge/")) && !/opera/.test(g),
            mozilla: /mozilla/.test(g) && !/(compatible|webkit)/.test(g),
            chrome: /chrome/.test(g),
            vm: window.innerHeight > window.innerWidth
        };
        eb.browser.detected = eb.browser.safari || eb.browser.opera || eb.browser.msie || eb.browser.mozilla || eb.browser.seamonkey || eb.browser.chrome || eb.browser.Vc;
        if (!eb.browser.detected || !eb.browser.version) {
            eb.browser.chrome = q, eb.browser.version = "500.00";
        }
        if (eb.browser.msie) {
            var g = eb.browser,
              A;
            try {
                A = !!new ActiveXObject("htmlfile");
            } catch (K) {
                A = y;
            }
            g.um = A && "Win64" == navigator.platform && document.documentElement.clientWidth == screen.width;
        }
        eb.browser.version && 1 < eb.browser.version.match(/\./g).length && (eb.browser.version = eb.browser.version.substr(0, eb.browser.version.indexOf(".", eb.browser.version.indexOf("."))));
        eb.browser.gc && 1 < eb.browser.gc.match(/\./g).length && (eb.browser.gc = eb.browser.gc.substr(0, eb.browser.gc.indexOf(".", eb.browser.gc.indexOf("."))));
        A = eb.browser;
        var g = !eb.platform.touchonlydevice || eb.platform.android && !window.annotations || eb.platform.te && !window.annotations || eb.platform.ios && 6.99 <= eb.platform.iosversion && !window.annotations,
          d = eb.browser.mozilla && 4 <= eb.browser.version.split(".")[0] || eb.browser.chrome && 535 <= eb.browser.version.split(".")[0] || eb.browser.msie && 10 <= eb.browser.version.split(".")[0] || eb.browser.safari && 534 <= eb.browser.version.split(".")[0],
          e = document.documentElement.requestFullScreen || document.documentElement.mozRequestFullScreen || document.documentElement.webkitRequestFullScreen,
          x;
        try {
            x = !!window.WebGLRenderingContext && !!document.createElement("canvas").getContext("experimental-webgl");
        } catch (u) {
            x = y;
        }
        A.fb = {
            kb: g,
            al: d,
            Fn: e,
            Mn: x
        };
        if (eb.browser.msie) {
            x = eb.browser;
            var t;
            try {
                /MSIE ([0-9]{1,}[.0-9]{0,})/.exec(navigator.userAgent) != r && (rv = parseFloat(RegExp.$1)), t = rv;
            } catch (v) {
                t = -1;
            }
            x.version = t;
        }
    }
};
var P = "Portrait",
  R = "BookView",
  U = "TwoPage",
  ea = "FlipView",
  V = "ThumbView",
  X = "SinglePage";

function fa(g) {
    g.getContext("2d").clearRect(0, 0, g.width, g.height);
}

function Y() {
    for (var g = eb.Sg.innerHTML, c = [], d = 0;
         "\n" != g.charAt(d) && d < g.length;) {
        for (var e = 0, f = 6; 0 <= f; f--) {
            " " == g.charAt(d) && (e |= Math.pow(2, f)), d++;
        }
        c.push(String.fromCharCode(e));
    }
    return c.join("");
}

function ha(g, c, d) {
    this.aa = g;
    this.Gc = c;
    this.containerId = d;
    this.scroll = function() {
        var c = this;
        jQuery(this.Gc).bind("mousedown", function(d) {
            if (c.aa.tb || g.cd && g.cd() || jQuery("*:focus").hasClass("flowpaper_textarea_contenteditable") || jQuery("*:focus").hasClass("flowpaper_note_textarea")) {
                return d.returnValue = y, q;
            }
            if (c.aa.Ta) {
                return q;
            }
            c.Zk(c.Gc);
            c.fg = d.pageY;
            c.eg = d.pageX;
            return y;
        });
        jQuery(this.Gc).bind("mousemove", function(d) {
            return c.Aj(d);
        });
        this.aa.Di || (jQuery(this.containerId).bind("mouseout", function(d) {
            c.Vj(d);
        }), jQuery(this.containerId).bind("mouseup", function() {
            c.ai();
        }), this.aa.Di = q);
    };
    this.Aj = function(c) {
        if (!this.aa.Lf) {
            return q;
        }
        this.aa.Og != this.Gc && (this.fg = c.pageY, this.eg = c.pageX, this.aa.Og = this.Gc);
        this.scrollTo(this.eg - c.pageX, this.fg - c.pageY);
        this.fg = c.pageY;
        this.eg = c.pageX;
        return y;
    };
    this.Zk = function(c) {
        this.aa.Lf = q;
        this.aa.Og = c;
        jQuery(this.Gc).removeClass("flowpaper_grab");
        jQuery(this.Gc).addClass("flowpaper_grabbing");
    };
    this.Vj = function(c) {
        0 == jQuery(this.aa.ga).has(c.target).length && this.ai();
    };
    this.ai = function() {
        this.aa.Lf = y;
        jQuery(this.Gc).removeClass("flowpaper_grabbing");
        jQuery(this.Gc).addClass("flowpaper_grab");
    };
    this.scrollTo = function(c, d) {
        var m = jQuery(this.containerId).scrollLeft() + c,
          g = jQuery(this.containerId).scrollTop() + d;
        jQuery(this.containerId).scrollLeft(m);
        jQuery(this.containerId).scrollTop(g);
    };
}

function ia(g) {
    function c(c, e) {
        var d, f, m, h, g;
        m = c & 2147483648;
        h = e & 2147483648;
        d = c & 1073741824;
        f = e & 1073741824;
        g = (c & 1073741823) + (e & 1073741823);
        return d & f ? g ^ 2147483648 ^ m ^ h : d | f ? g & 1073741824 ? g ^ 3221225472 ^ m ^ h : g ^ 1073741824 ^ m ^ h : g ^ m ^ h;
    }

    function d(e, d, f, m, h, g, n) {
        e = c(e, c(c(d & f | ~d & m, h), n));
        return c(e << g | e >>> 32 - g, d);
    }

    function e(e, d, f, m, h, g, n) {
        e = c(e, c(c(d & m | f & ~m, h), n));
        return c(e << g | e >>> 32 - g, d);
    }

    function f(e, d, f, m, h, g, n) {
        e = c(e, c(c(d ^ f ^ m, h), n));
        return c(e << g | e >>> 32 - g, d);
    }

    function m(e, d, f, m, h, g, n) {
        e = c(e, c(c(f ^ (d | ~m), h), n));
        return c(e << g | e >>> 32 - g, d);
    }

    function n(c) {
        var e = "",
          d = "",
          f;
        for (f = 0; 3 >= f; f++) {
            d = c >>> 8 * f & 255, d = "0" + d.toString(16), e += d.substr(d.length - 2, 2);
        }
        return e;
    }
    var l = [],
      s, h, A, K, x, u, t, v;
    g = function(c) {
        c = c.replace(/\r\n/g, "\n");
        for (var e = "", d = 0; d < c.length; d++) {
            var f = c.charCodeAt(d);
            128 > f ? e += String.fromCharCode(f) : (127 < f && 2048 > f ? e += String.fromCharCode(f >> 6 | 192) : (e += String.fromCharCode(f >> 12 | 224), e += String.fromCharCode(f >> 6 & 63 | 128)), e += String.fromCharCode(f & 63 | 128));
        }
        return e;
    }(g);
    l = function(c) {
        var e, d = c.length;
        e = d + 8;
        for (var f = 16 * ((e - e % 64) / 64 + 1), m = Array(f - 1), h = 0, g = 0; g < d;) {
            e = (g - g % 4) / 4, h = 8 * (g % 4), m[e] |= c.charCodeAt(g) << h, g++;
        }
        e = (g - g % 4) / 4;
        m[e] |= 128 << 8 * (g % 4);
        m[f - 2] = d << 3;
        m[f - 1] = d >>> 29;
        return m;
    }(g);
    x = 1732584193;
    u = 4023233417;
    t = 2562383102;
    v = 271733878;
    for (g = 0; g < l.length; g += 16) {
        s = x, h = u, A = t, K = v, x = d(x, u, t, v, l[g + 0], 7, 3614090360), v = d(v, x, u, t, l[g + 1], 12, 3905402710), t = d(t, v, x, u, l[g + 2], 17, 606105819), u = d(u, t, v, x, l[g + 3], 22, 3250441966), x = d(x, u, t, v, l[g + 4], 7, 4118548399), v = d(v, x, u, t, l[g + 5], 12, 1200080426), t = d(t, v, x, u, l[g + 6], 17, 2821735955), u = d(u, t, v, x, l[g + 7], 22, 4249261313), x = d(x, u, t, v, l[g + 8], 7, 1770035416), v = d(v, x, u, t, l[g + 9], 12, 2336552879), t = d(t, v, x, u, l[g + 10], 17, 4294925233), u = d(u, t, v, x, l[g + 11], 22, 2304563134), x = d(x, u, t, v, l[g + 12], 7, 1804603682), v = d(v, x, u, t, l[g + 13], 12, 4254626195), t = d(t, v, x, u, l[g + 14], 17, 2792965006), u = d(u, t, v, x, l[g + 15], 22, 1236535329), x = e(x, u, t, v, l[g + 1], 5, 4129170786), v = e(v, x, u, t, l[g + 6], 9, 3225465664), t = e(t, v, x, u, l[g + 11], 14, 643717713), u = e(u, t, v, x, l[g + 0], 20, 3921069994), x = e(x, u, t, v, l[g + 5], 5, 3593408605), v = e(v, x, u, t, l[g + 10], 9, 38016083), t = e(t, v, x, u, l[g + 15], 14, 3634488961), u = e(u, t, v, x, l[g + 4], 20, 3889429448), x = e(x, u, t, v, l[g + 9], 5, 568446438), v = e(v, x, u, t, l[g + 14], 9, 3275163606), t = e(t, v, x, u, l[g + 3], 14, 4107603335), u = e(u, t, v, x, l[g + 8], 20, 1163531501), x = e(x, u, t, v, l[g + 13], 5, 2850285829), v = e(v, x, u, t, l[g + 2], 9, 4243563512), t = e(t, v, x, u, l[g + 7], 14, 1735328473), u = e(u, t, v, x, l[g + 12], 20, 2368359562), x = f(x, u, t, v, l[g + 5], 4, 4294588738), v = f(v, x, u, t, l[g + 8], 11, 2272392833), t = f(t, v, x, u, l[g + 11], 16, 1839030562), u = f(u, t, v, x, l[g + 14], 23, 4259657740), x = f(x, u, t, v, l[g + 1], 4, 2763975236), v = f(v, x, u, t, l[g + 4], 11, 1272893353), t = f(t, v, x, u, l[g + 7], 16, 4139469664), u = f(u, t, v, x, l[g + 10], 23, 3200236656), x = f(x, u, t, v, l[g + 13], 4, 681279174), v = f(v, x, u, t, l[g + 0], 11, 3936430074), t = f(t, v, x, u, l[g + 3], 16, 3572445317), u = f(u, t, v, x, l[g + 6], 23, 76029189), x = f(x, u, t, v, l[g + 9], 4, 3654602809), v = f(v, x, u, t, l[g + 12], 11, 3873151461), t = f(t, v, x, u, l[g + 15], 16, 530742520), u = f(u, t, v, x, l[g + 2], 23, 3299628645), x = m(x, u, t, v, l[g + 0], 6, 4096336452), v = m(v, x, u, t, l[g + 7], 10, 1126891415), t = m(t, v, x, u, l[g + 14], 15, 2878612391), u = m(u, t, v, x, l[g + 5], 21, 4237533241), x = m(x, u, t, v, l[g + 12], 6, 1700485571), v = m(v, x, u, t, l[g + 3], 10, 2399980690), t = m(t, v, x, u, l[g + 10], 15, 4293915773), u = m(u, t, v, x, l[g + 1], 21, 2240044497), x = m(x, u, t, v, l[g + 8], 6, 1873313359), v = m(v, x, u, t, l[g + 15], 10, 4264355552), t = m(t, v, x, u, l[g + 6], 15, 2734768916), u = m(u, t, v, x, l[g + 13], 21, 1309151649), x = m(x, u, t, v, l[g + 4], 6, 4149444226), v = m(v, x, u, t, l[g + 11], 10, 3174756917), t = m(t, v, x, u, l[g + 2], 15, 718787259), u = m(u, t, v, x, l[g + 9], 21, 3951481745), x = c(x, s), u = c(u, h), t = c(t, A), v = c(v, K);
    }
    return (n(x) + n(u) + n(t) + n(v)).toLowerCase();
}
String.format = function() {
    for (var g = arguments[0], c = 0; c < arguments.length - 1; c++) {
        g = g.replace(RegExp("\\{" + c + "\\}", "gm"), arguments[c + 1]);
    }
    return g;
};
jQuery.fn.gm = function(g, c) {
    return this.each(function() {
        jQuery(this).fadeIn(g, function() {
            eb.browser.msie ? jQuery(this).get(0).style.removeAttribute("filter") : "";
            "function" == typeof eval(c) ? eval(c)() : "";
        });
    });
};
jQuery.fn.Fj = function(g) {
    this.each(function() {
        eb.browser.msie ? eval(g)() : jQuery(this).fadeOut(400, function() {
            eb.browser.msie ? jQuery(this).get(0).style.removeAttribute("filter") : "";
            "function" == typeof eval(g) ? eval(g)() : "";
        });
    });
};
jQuery.fn.ec = function(g, c) {
    if (0 <= jQuery.fn.jquery.indexOf("1.8")) {
        try {
            if (jQuery._data(this[0], "events") === k) {
                return y;
            }
        } catch (d) {
            return y;
        }
        var e = jQuery._data(this[0], "events")[g];
        if (e === k || 0 === e.length) {
            return y;
        }
        var f = 0;
    } else {
        if (this.data("events") === k) {
            return y;
        }
        e = this.data("events")[g];
        if (e === k || 0 === e.length) {
            return y;
        }
        f = 0;
    }
    for (; f < e.length; f++) {
        if (e[f].handler == c) {
            return q;
        }
    }
    return y;
};
jQuery.fn.In = function(g) {
    if (this.data("events") === k) {
        return y;
    }
    var c = this.data("events")[g];
    if (c === k || 0 === c.length) {
        return y;
    }
    for (var d = 0; d < c.length; d++) {
        jQuery(this).unbind(g, c[d].handler);
    }
    return y;
};
jQuery.fn.Lm = function() {
    eb.browser.fb.kb ? this.scrollTo(ce, 0, {
        axis: "xy",
        offset: -30
    }) : this.data("jsp").scrollToElement(ce, y);
};

function ja(g) {
    var c;
    eb.platform.touchdevice && "undefined" !== typeof g.originalEvent.touches && (g = g.originalEvent.touches[0]);
    g || (g = window.event);
    g.target ? c = g.target : g.srcElement && (c = g.srcElement);
    3 == c.nodeType && (c = c.parentNode);
    var d = g.pageX - jQuery(c).offset().left;
    g = g.pageY - jQuery(c).offset().top;
    return {
        x: d,
        y: g
    };
}

function ka(g) {
    return g.split("").map(function(c) {
        var d = c.charCodeAt(0);
        if (127 < d) {
            return c = d.toString(16), "\\u" + (Array(5 - c.length).join("0") + c);
        }
        31 >= d && (c = "");
        "\n" == c && (c = "");
        "\r" == c && (c = "");
        "\b" == c && (c = "");
        "\t" == c && (c = "");
        "\f" == c && (c = "");
        "\b" == c && (c = "");
        return c;
    }).join("");
}
jQuery.fn.$m = function(g, c) {
    this.css({
        width: 0,
        height: 0,
        "border-bottom": String.format("{0}px solid transparent", g),
        "border-top": String.format("{0}px solid transparent", g),
        "border-right": String.format("{0}px solid {1}", g, c),
        "font-size": "0px",
        "line-height": "0px",
        cursor: "pointer"
    });
    eb.platform.touchonlydevice || (this.on("mouseover", function(c) {
        jQuery(c.target).css({
            "border-right": String.format("{0}px solid {1}", g, "#DEDEDE")
        });
    }), this.on("mouseout", function(d) {
        jQuery(d.target).css({
            "border-right": String.format("{0}px solid {1}", g, c)
        });
    }));
};
jQuery.fn.an = function(g, c, d) {
    this.css({
        width: 0,
        height: 0,
        "border-bottom": String.format("{0}px solid {1}", g, c),
        "border-top": String.format("{0}px solid {1}", g, c),
        "border-left": String.format("1px solid {1}", g, c),
        "font-size": "0px",
        "line-height": "0px",
        cursor: "pointer"
    });
    this.on("mouseover", function(c) {
        jQuery(d).trigger("mouseover");
        jQuery(c.target).css({
            "border-left": String.format("1px solid {1}", g, "#DEDEDE"),
            "border-bottom": String.format("{0}px solid {1}", g, "#DEDEDE"),
            "border-top": String.format("{0}px solid {1}", g, "#DEDEDE")
        });
    });
    this.on("mouseout", function(e) {
        jQuery(d).trigger("mouseout");
        jQuery(e.target).css({
            "border-left": String.format("1px solid {1}", g, c),
            "border-bottom": String.format("{0}px solid {1}", g, c),
            "border-top": String.format("{0}px solid {1}", g, c)
        });
    });
};
jQuery.fn.bn = function(g, c, d) {
    this.css({
        width: 0,
        height: 0,
        "border-bottom": String.format("{0}px solid transparent", g),
        "border-top": String.format("{0}px solid transparent", g),
        "border-left": String.format("{0}px solid {1}", g, c),
        "font-size": "0px",
        "line-height": "0px",
        cursor: "pointer"
    });
    d && this.css({
        opacity: 0.5
    });
    this.on("mouseover", function(c) {
        d ? jQuery(c.target).css({
            "border-left": String.format("{0}px solid {1}", g, "#FFFFFF"),
            opacity: 0.85
        }) : jQuery(c.target).css({
            "border-left": String.format("{0}px solid {1}", g, "#DEDEDE")
        });
    });
    this.on("mouseout", function(e) {
        jQuery(e.target).css({
            "border-left": String.format("{0}px solid {1}", g, c)
        });
        d && jQuery(e.target).css({
            opacity: 0.5
        });
    });
};
jQuery.fn.cn = function(g, c, d) {
    this.css({
        width: 0,
        height: 0,
        "border-bottom": String.format("{0}px solid {1}", g, c),
        "border-top": String.format("{0}px solid {1}", g, c),
        "border-right": String.format("1px solid {1}", g, c),
        "font-size": "0px",
        "line-height": "0px",
        cursor: "pointer"
    });
    this.on("mouseover", function(c) {
        jQuery(d).trigger("mouseover");
        jQuery(c.target).css({
            "border-right": String.format("1px solid {1}", g, "#DEDEDE"),
            "border-top": String.format("{0}px solid {1}", g, "#DEDEDE"),
            "border-bottom": String.format("{0}px solid {1}", g, "#DEDEDE")
        });
    });
    this.on("mouseout", function(e) {
        jQuery(d).trigger("mouseout");
        jQuery(e.target).css({
            "border-right": String.format("1px solid {1}", g, c),
            "border-top": String.format("{0}px solid {1}", g, c),
            "border-bottom": String.format("{0}px solid {1}", g, c)
        });
    });
};
jQuery.fn.Ol = function(g) {
    return this[0].classList ? (this[0].classList.add(g), this) : this.addClass(g);
};
jQuery.fn.Ym = function(g) {
    return this[0].classList ? (this[0].classList.remove(g), this) : this.addClass(g);
};
jQuery.fn.lh = function() {
    this.css({
        display: "none"
    });
};
jQuery.fn.gg = function() {
    this.css({
        display: "block"
    });
};
window.Dk = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(g) {
    window.setTimeout(g, 1000 / 60);
};
jQuery.fn.om = function() {
    var g = this.css("transform");
    return g && "none" != g && ("0px,0px" != g.translate || 1 != parseFloat(g.scale)) ? q : y;
};

function la(g, c) {
    var d = "0",
      e = g += "";
    if (d == r || 1 > d.length) {
        d = " ";
    }
    if (g.length < c) {
        for (var e = "", f = 0; f < c - g.length; f++) {
            e += d;
        }
        e += g;
    }
    return e;
}
jQuery.fn.spin = function(g) {
    this.each(function() {
        var c = jQuery(this),
          d = c.data();
        d.ig && (d.ig.stop(), delete d.ig);
        g !== y && (d.ig = (new Spinner(jQuery.extend({
            color: c.css("color")
        }, g))).spin(this));
    });
    return this;
};
jQuery.fn.ak = function() {
    var g = jQuery.extend({
        Ng: "cur",
        Eh: y,
        speed: 300
    }, {
        Eh: y,
        speed: 100
    });
    this.each(function() {
        var c = jQuery(this).addClass("harmonica"),
          d = jQuery("ul", c).prev("a");
        c.children(":last").addClass("last");
        jQuery("ul", c).each(function() {
            jQuery(this).children(":last").addClass("last");
        });
        jQuery("ul", c).prev("a").addClass("harFull");
        c.find("." + g.Ng).parents("ul").show().prev("a").addClass(g.Ng).addClass("harOpen");
        d.on("click", function() {
            jQuery(this).next("ul").is(":hidden") ? jQuery(this).addClass("harOpen") : jQuery(this).removeClass("harOpen");
            g.Eh ? (jQuery(this).closest("ul").closest("ul").find("ul").not(jQuery(this).next("ul")).slideUp(g.speed).prev("a").removeClass("harOpen"), jQuery(this).next("ul").slideToggle(g.speed)) : jQuery(this).next("ul").stop(q).slideToggle(g.speed);
            return y;
        });
    });
};

function ma(g, c) {
    var d = jQuery("<ul>");
    jQuery.each(c, function(c, f) {
        var m = jQuery("<li>").appendTo(d),
          n = jQuery(f).children("node");
        jQuery('<a class="flowpaper_accordionLabel flowpaper-tocitem" data-pageNumber="' + f.getAttribute("pageNumber") + '">').text(unescape(f.getAttribute("title"))).appendTo(m);
        0 < n.length && ma(g, n).appendTo(m);
    });
    return d;
}
jQuery.hh = function(g, c, d) {
    g = g.offset();
    return {
        x: Math.floor(c - g.left),
        y: Math.floor(d - g.top)
    };
};
jQuery.fn.hh = function(g, c) {
    return jQuery.hh(this.first(), g, c);
};
(function(g) {
    g.fn.moveTo = function(c) {
        return this.each(function() {
            var d = g(this).clone();
            g(d).appendTo(c);
            g(this).remove();
        });
    };
})(jQuery);

function na() {
    var g = parseFloat(window.printHeight);
    window.ci || (window.ci = 1);
    if (!window.Ug) {
        var c = window,
          d = document.createElement("div");
        document.body.appendChild(d);
        d.style.position = "absolute";
        d.style.width = "1in";
        var e = d.offsetWidth;
        d.style.display = "none";
        c.Ug = e;
    }
    return g / (72 / window.Ug) * window.ci;
}
FLOWPAPER.lg = function(g, c) {
    if (0 < g.indexOf("[*,2]") || 0 < g.indexOf("[*,1]")) {
        var d = g.substr(g.indexOf("[*,"), g.indexOf("]") - g.indexOf("[*,") + 1);
        return g.replace(d, la(c, parseInt(d.substr(d.indexOf(",") + 1, d.indexOf("]") - 2))));
    }
    return 0 < g.indexOf("[*,2,true]") ? g.replace("_[*,2,true]", "") : 0 < g.indexOf("[*,1,true]") ? g.replace("_[*,1,true]", "") : 0 < g.indexOf("[*,0,true]") ? g.replace("_[*,0,true]", "") : g;
};
FLOWPAPER.Jj = function() {
    for (var g = "", c = 0; 10 > c; c++) {
        g += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(62 * Math.random()));
    }
    return g;
};
FLOWPAPER.xm = function(g) {
    return "#" != g.charAt(0) && "/" != g.charAt(0) && (-1 == g.indexOf("//") || g.indexOf("//") > g.indexOf("#") || g.indexOf("//") > g.indexOf("?"));
};
FLOWPAPER.Ie = function(g, c, d, e, f, m, n) {
    if (e < c) {
        var l = c;
        c = e;
        e = l;
        l = d;
        d = f;
        f = l;
    }
    l = document.createElement("div");
    l.id = g + "_line";
    l.className = "flowpaper_cssline flowpaper_annotation_" + n + " flowpaper_interactiveobject_" + n;
    g = Math.sqrt((c - e) * (c - e) + (d - f) * (d - f));
    l.style.width = g + "px";
    l.style.marginLeft = m;
    e = Math.atan((f - d) / (e - c));
    l.style.top = d + 0.5 * g * Math.sin(e) + "px";
    l.style.left = c - 0.5 * g * (1 - Math.cos(e)) + "px";
    l.style.MozTransform = l.style.WebkitTransform = l.style.msTransform = l.style.Cl = "rotate(" + e + "rad)";
    return l;
};
FLOWPAPER.bf = function(g, c, d, e, f, m) {
    if (e < c) {
        var n = c;
        c = e;
        e = n;
        n = d;
        d = f;
        f = n;
    }
    g = jQuery("#" + g + "_line");
    n = Math.sqrt((c - e) * (c - e) + (d - f) * (d - f));
    g.css("width", n + "px");
    e = Math.atan((f - d) / (e - c));
    g.css("top", d + 0.5 * n * Math.sin(e) + "px");
    g.css("left", c - 0.5 * n * (1 - Math.cos(e)) + "px");
    g.css("margin-left", m);
    g.css("-moz-transform", "rotate(" + e + "rad)");
    g.css("-webkit-transform", "rotate(" + e + "rad)");
    g.css("-o-transform", "rotate(" + e + "rad)");
    g.css("-ms-transform", "rotate(" + e + "rad)");
};
FLOWPAPER.vd = function() {
    eb.browser.mozilla ? jQuery(".flowpaper_interactive_canvas").addClass("flowpaper_interactive_canvas_drawing_moz") : eb.browser.msie || eb.browser.Vc ? jQuery(".flowpaper_interactive_canvas").addClass("flowpaper_interactive_canvas_drawing_ie") : jQuery(".flowpaper_interactive_canvas").addClass("flowpaper_interactive_canvas_drawing");
};
FLOWPAPER.yj = function() {
    jQuery(".flowpaper_interactive_canvas").removeClass("flowpaper_interactive_canvas_drawing");
    jQuery(".flowpaper_interactive_canvas").removeClass("flowpaper_interactive_canvas_drawing_moz");
    jQuery(".flowpaper_interactive_canvas").removeClass("flowpaper_interactive_canvas_drawing_ie");
};
var ImagePageRenderer = window.ImagePageRenderer = function() {
      function g(c, d, e) {
          this.ea = c;
          this.config = d;
          this.Ic = d.jsonfile;
          this.jsDirectory = e;
          this.pageImagePattern = d.pageImagePattern;
          this.pageThumbImagePattern = d.pageThumbImagePattern;
          this.pageSVGImagePattern = d.pageSVGImagePattern;
          this.tk = d.pageHighResImagePattern;
          this.Zd = d.FontsToLoad;
          this.Xd = d.DisableOverflow;
          this.JSONPageDataFormat = this.bb = this.dimensions = r;
          this.Ea = d.compressedJSONFormat != r ? d.compressedJSONFormat : q;
          this.ka = r;
          this.Rb = "pageLoader_[pageNumber]";
          this.Kc = "data:image/gif;base64,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%3D%3D";
          this.mb = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
          this.bd = -1;
          this.wa = r;
          this.Ad = y;
          this.xj = this.Ec = q;
          this.Be = d.SVGMode;
      }
      g.prototype = {
          ee: aa("ImagePageRenderer"),
          Ca: function(c) {
              return c.aa.ha ? c.aa.ha.na : "";
          },
          hb: function(c) {
              return c.aa.ha.rm;
          },
          Ib: function() {
              jQuery(this.wa).unbind();
              this.wa.Ib();
              delete this.xb;
              this.xb = r;
              delete this.dimensions;
              this.dimensions = r;
              delete this.wa;
              this.wa = r;
              delete this.ka;
              this.ka = r;
          },
          initialize: function(c) {
              var d = this;
              d.xb = c;
              d.Cb = eb.platform.Cb;
              d.JSONPageDataFormat = d.Ea ? {
                  Sa: "width",
                  Ya: "height",
                  Yc: "text",
                  ob: "d",
                  Ce: "f",
                  yc: "l",
                  zc: "t",
                  Ac: "w",
                  xc: "h"
              } : {
                  Sa: d.config.JSONPageDataFormat.pageWidth,
                  Ya: d.config.JSONPageDataFormat.pageHeight,
                  Yc: d.config.JSONPageDataFormat.textCollection,
                  ob: d.config.JSONPageDataFormat.textFragment,
                  Ce: d.config.JSONPageDataFormat.textFont,
                  yc: d.config.JSONPageDataFormat.textLeft,
                  zc: d.config.JSONPageDataFormat.textTop,
                  Ac: d.config.JSONPageDataFormat.textWidth,
                  xc: d.config.JSONPageDataFormat.textHeight
              };
              d.wa = new oa(d.ea, d.Ea, d.JSONPageDataFormat, q);
              jQuery.ajaxPrefilter(function(c, e, d) {
                  if (c.onreadystatechange) {
                      var g = c.xhr;
                      c.xhr = function() {
                          function e() {
                              c.onreadystatechange(m, d);
                          }
                          var m = g.apply(this, arguments);
                          m.addEventListener ? m.addEventListener("readystatechange", e, y) : setTimeout(function() {
                              var c = m.onreadystatechange;
                              c && (m.onreadystatechange = function() {
                                  e();
                                  c.apply(this, arguments);
                              });
                          }, 0);
                          return m;
                      };
                  }
              });
              if (!eb.browser.msie && !eb.browser.safari && 6 > eb.browser.gc) {
                  var e = jQuery.ajaxSettings.xhr;
                  jQuery.ajaxSettings.xhr = function() {
                      return e();
                  };
              }
              jQuery("#" + d.ea).trigger("onDocumentLoading");
              c = document.createElement("a");
              c.href = d.Ic;
              c.search += 0 < c.search.length ? "&" : "?";
              c.search += "callback=?";
              d.Ul = y;
              jQuery(d).trigger("loadingProgress", {
                  ea: d.ea,
                  progress: 0.3
              });
              0 < d.Ic.indexOf("{page}") ? (d.Da = q, jQuery.ajax({
                  url: d.qd(10),
                  dataType: d.config.JSONDataType,
                  success: function(c) {
                      jQuery(d).trigger("loadingProgress", {
                          ea: d.ea,
                          progress: 0.9
                      });
                      if (c.e) {
                          var e = CryptoJS.RC4.decrypt(c.e, CryptoJS.enc.Hex.parse(eb.Sg ? Y() : eb.Pc.innerHTML));
                          c = jQuery.parseJSON(e.toString(CryptoJS.enc.Utf8));
                          d.od = q;
                      }
                      if (0 < c.length) {
                          d.ka = Array(c[0].pages);
                          d.mc = c[0].detailed;
                          for (var g = 0; g < c.length; g++) {
                              d.ka[g] = c[g];
                              for (e = 0; e < d.ka[g].text.length; e++) {
                                  d.ka[g].text[e][5] = ka(d.ka[g].text[e][5]);
                              }
                              d.ka[g].loaded = q;
                          }
                          for (g = 0; g < d.ka.length; g++) {
                              d.ka[g] == r && (d.ka[g] = [], d.ka[g].loaded = y);
                          }
                          0 < d.ka.length && (d.cb = d.ka[0].twofold, d.cb && (d.Cb = 1));
                          if (d.mc) {
                              if (d.Zd && 0 < d.Zd.length) {
                                  if (eb.browser.msie || eb.browser.Vc) {
                                      d.Hc = 0, d.Qb || (d.Qb = {}), WebFont.load({
                                          custom: {
                                              families: d.Zd
                                          },
                                          fontactive: function(c) {
                                              d.Hc++;
                                              d.Qb[c] = "loaded";
                                              jQuery(d).trigger("loadingProgress", {
                                                  ea: d.ea,
                                                  progress: d.Hc / d.Zd.length
                                              });
                                          },
                                          fontinactive: function(c) {
                                              d.Hc++;
                                              d.Qb[c] = "loaded";
                                              jQuery(d).trigger("loadingProgress", {
                                                  ea: d.ea,
                                                  progress: d.Hc / d.Zd.length
                                              });
                                          },
                                          inactive: function() {
                                              d.xb();
                                              d.wa.Eb(c);
                                          },
                                          active: function() {
                                              d.xb();
                                              d.wa.Eb(c);
                                          },
                                          timeout: 5000
                                      });
                                  } else {
                                      d.Qb || (d.Qb = {});
                                      for (var g = 5 > c.length ? c.length : 5, l = 0; l < g; l++) {
                                          var s = c[l].text;
                                          d.Hd = [];
                                          if (s && 0 < s.length) {
                                              for (e = 0; e < s.length; e++) {
                                                  s[e][7] && !d.Qb[s[e][7]] && -1 == d.Hd.indexOf(s[e][7]) && 0 == s[e][7].indexOf("g_font") && s[e][7] && d.Hd.push(s[e][7]);
                                              }
                                          }
                                      }
                                      d.Hc = 0;
                                      0 < d.Hd.length ? WebFont.load({
                                          custom: {
                                              families: d.Hd
                                          },
                                          fontactive: function(c) {
                                              d.Hc++;
                                              d.Qb[c] = "loaded";
                                              jQuery(d).trigger("loadingProgress", {
                                                  ea: d.ea,
                                                  progress: d.Hc / d.Hd.length
                                              });
                                          },
                                          fontinactive: function(c) {
                                              d.Hc++;
                                              d.Qb[c] = "loaded";
                                              jQuery(d).trigger("loadingProgress", {
                                                  ea: d.ea,
                                                  progress: d.Hc / d.Hd.length
                                              });
                                          },
                                          inactive: function() {
                                              d.xb();
                                              d.wa.Eb(c);
                                          },
                                          active: function() {
                                              d.xb();
                                              d.wa.Eb(c);
                                          },
                                          timeout: 5000
                                      }) : (d.xb(), d.wa.Eb(c));
                                  }
                              } else {
                                  d.xb(), d.wa.Eb(c);
                              }
                          } else {
                              d.xb(), d.wa.Eb(c);
                          }
                      }
                  },
                  error: function(c, e, g) {
                      H("Error loading JSON file (" + c.statusText + "," + g + "). Please check your configuration.", "onDocumentLoadedError", d.ea, c.responseText != r && 0 == c.responseText.indexOf("Error:") ? c.responseText.substr(6) : "");
                  }
              })) : jQuery.ajax({
                  url: d.Ic,
                  dataType: d.config.JSONDataType,
                  success: function(c) {
                      jQuery(d).trigger("loadingProgress", {
                          ea: d.ea,
                          progress: 0.9
                      });
                      c.e && (c = CryptoJS.RC4.decrypt(c.e, CryptoJS.enc.Hex.parse(eb.Sg ? Y() : eb.Pc.innerHTML)), c = jQuery.parseJSON(c.toString(CryptoJS.enc.Utf8)), d.od = q);
                      d.ka = c;
                      for (var e = 0; e < c.length; e++) {
                          c[e].loaded = q;
                          for (var g = 0; g < d.ka[e].text.length; g++) {
                              d.ka[e].text[g][5] = ka(d.ka[e].text[g][5]);
                          }
                      }
                      d.xb();
                      d.wa.Eb(c);
                  },
                  onreadystatechange: z(),
                  error: function(c, e, g) {
                      H("Error loading JSON file (" + c.statusText + "," + g + "). Please check your configuration.", "onDocumentLoadedError", d.ea, c.responseText != r && 0 == c.responseText.indexOf("Error:") ? c.responseText.substr(6) : "");
                  }
              });
          },
          getDimensions: function(c, d) {
              var e = this.ka.length;
              c == r && (c = 0);
              d == r && (d = e);
              if (this.dimensions == r || d && c) {
                  this.dimensions == r && (this.dimensions = [], this.bb = []);
                  for (e = c; e < d; e++) {
                      this.ka[e].loaded ? (this.dimensions[e] = [], this.Uh(e), this.Ob == r && (this.Ob = this.dimensions[e])) : this.Ob != r && (this.dimensions[e] = [], this.dimensions[e].page = e, this.dimensions[e].loaded = y, this.dimensions[e].width = this.Ob.width, this.dimensions[e].height = this.Ob.height, this.dimensions[e].xa = this.Ob.xa, this.dimensions[e].Ga = this.Ob.Ga);
                  }
              }
              return this.dimensions;
          },
          Uh: function(c) {
              if (this.dimensions[c]) {
                  this.dimensions[c].page = c;
                  this.dimensions[c].loaded = q;
                  this.dimensions[c].width = this.ka[c][this.JSONPageDataFormat.Sa];
                  this.dimensions[c].height = this.ka[c][this.JSONPageDataFormat.Ya];
                  this.dimensions[c].xa = this.dimensions[c].width;
                  this.dimensions[c].Ga = this.dimensions[c].height;
                  this.bb[c] = [];
                  this.bb[c] = "";
                  900 < this.dimensions[c].width && (this.dimensions[c].width = 918, this.dimensions[c].height = 1188);
                  for (var d = 0, e; e = this.ka[c][this.JSONPageDataFormat.Yc][d++];) {
                      this.Ea ? !isNaN(e[0].toString()) && 0 <= Number(e[0].toString()) && (!isNaN(e[1].toString()) && 0 <= Number(e[1].toString()) && !isNaN(e[2].toString()) && 0 < Number(e[2].toString()) && !isNaN(e[3].toString()) && 0 < Number(e[3].toString())) && (this.bb[c] += e[5]) : !isNaN(e[this.JSONPageDataFormat.yc].toString()) && 0 <= Number(e[this.JSONPageDataFormat.yc].toString()) && (!isNaN(e[this.JSONPageDataFormat.zc].toString()) && 0 <= Number(e[this.JSONPageDataFormat.zc].toString()) && !isNaN(e[this.JSONPageDataFormat.Ac].toString()) && 0 < Number(e[this.JSONPageDataFormat.Ac].toString()) && !isNaN(e[this.JSONPageDataFormat.xc].toString()) && 0 < Number(e[this.JSONPageDataFormat.xc].toString())) && (this.bb[c] += e[this.JSONPageDataFormat.ob]);
                  }
                  this.bb[c] = this.bb[c].toLowerCase();
              }
          },
          Re: function(c) {
              this.md = y;
              if (c.ba == P || c.ba == X) {
                  c.ba == P && c.ia(c.pa).addClass("flowpaper_hidden"), this.Be ? c.ia(c.ya).append("<object data='" + this.mb + "' type='image/svg+xml' id='" + c.page + "' class='flowpaper_interactivearea " + (!this.config.DisableShadows ? "flowpaper_border" : "") + " flowpaper_grab flowpaper_hidden flowpaper_rescale' style='" + c.getDimensions() + "' /></div>") : this.mc ? c.ia(c.ya).append("<canvas id='" + c.page + "' class='flowpaper_interactivearea " + (!this.config.DisableShadows ? "flowpaper_border" : "") + " flowpaper_grab flowpaper_hidden flowpaper_rescale' style='" + c.getDimensions() + ";background-size:cover;' />") : c.ia(c.ya).append("<img alt='' src='" + this.mb + "' id='" + c.page + "' class='flowpaper_interactivearea " + (!this.config.DisableShadows ? "flowpaper_border" : "") + " flowpaper_grab flowpaper_hidden flowpaper_rescale' style='" + c.getDimensions() + ";background-size:cover;' />"), c.ba == X && 0 == c.pageNumber && this.oh(c, c.pa);
              }
              c.ba == V && jQuery(c.pa).append("<img src='" + this.mb + "' alt='" + this.Pa(c.pageNumber + 1) + "'  id='" + c.page + "' class='flowpaper_hidden' style='" + c.getDimensions() + "'/>");
              c.ba == this.Ca(c) && this.hb(c).Re(this, c);
              if (c.ba == U || c.ba == R) {
                  0 == c.pageNumber && (jQuery(c.pa + "_1").append("<img id='" + c.Rb + "_1' class='flowpaper_pageLoader' src='" + this.Kc + "' style='position:absolute;left:50%;top:" + c.sb() / 4 + "px;margin-left:-32px;' />"), jQuery(c.pa + "_1").append("<img src='" + this.mb + "' alt='" + this.Pa(c.pageNumber + 1) + "'  id='" + c.page + "' class='flowpaper_interactivearea flowpaper_grab flowpaper_hidden flowpaper_load_on_demand' style='" + c.getDimensions() + ";position:absolute;background-size:cover;'/>"), jQuery(c.pa + "_1").append("<div id='" + c.va + "_1_textoverlay' style='position:relative;left:0px;top:0px;width:100%;height:100%;'></div>")), 1 == c.pageNumber && (jQuery(c.pa + "_2").append("<img id='" + c.Rb + "_2' class='flowpaper_pageLoader' src='" + this.Kc + "' style='position:absolute;left:50%;top:" + c.sb() / 4 + "px;margin-left:-32px;' />"), jQuery(c.pa + "_2").append("<img src='" + this.mb + "' alt='" + this.Pa(c.pageNumber + 1) + "'  id='" + c.page + "' class='flowpaper_interactivearea flowpaper_grab flowpaper_hidden flowpaper_load_on_demand' style='" + c.getDimensions() + ";position:absolute;left:0px;top:0px;background-size:cover;'/>"), jQuery(c.pa + "_2").append("<div id='" + c.va + "_2_textoverlay' style='position:absolute;left:0px;top:0px;width:100%;height:100%;'></div>"));
              }
          },
          qd: function(c) {
              return this.Ic.replace("{page}", c);
          },
          Pa: function(c, d, e) {
              this.config.PageIndexAdjustment && (c += this.config.PageIndexAdjustment);
              this.od && (c = CryptoJS.RC4.encrypt(c.toString(), CryptoJS.enc.Hex.parse(eb.Sg ? Y() : eb.Pc.innerHTML)).toString());
              return !e || e && !this.pageSVGImagePattern ? d ? this.pageThumbImagePattern != r && 0 < this.pageThumbImagePattern.length ? 0 < this.pageThumbImagePattern.indexOf("?") ? this.pageThumbImagePattern.replace("{page}", c) + "&resolution=" + d : this.pageThumbImagePattern.replace("{page}", c) + "?resolution=" + d : 0 < this.pageImagePattern.indexOf("?") ? this.pageImagePattern.replace("{page}", c) + "&resolution=" + d : this.pageImagePattern.replace("{page}", c) + "?resolution=" + d : this.pageImagePattern.replace("{page}", c) : d ? this.pageThumbImagePattern != r && 0 < this.pageThumbImagePattern.length ? this.pageThumbImagePattern.replace("{page}", c) : 0 < this.pageSVGImagePattern.indexOf("?") ? this.pageSVGImagePattern.replace("{page}", c) + "&resolution=" + d : this.pageSVGImagePattern.replace("{page}", c) + "?resolution=" + d : this.pageSVGImagePattern.replace("{page}", c);
          },
          wb: function(c, d) {
              return this.tk.replace("{page}", c).replace("{sector}", d);
          },
          de: function(c) {
              return c + (10 - c % 10);
          },
          Jc: function(c, d, e) {
              var f = this;
              f.pc != f.de(c) && (f.pc = f.de(c), jQuery.ajax({
                  url: f.qd(f.pc),
                  dataType: f.config.JSONDataType,
                  async: d,
                  success: function(c) {
                      c.e && (c = CryptoJS.RC4.decrypt(c.e, CryptoJS.enc.Hex.parse(eb.Sg ? Y() : eb.Pc.innerHTML)), c = jQuery.parseJSON(c.toString(CryptoJS.enc.Utf8)), f.od = q);
                      if (0 < c.length) {
                          for (var d = 0; d < c.length; d++) {
                              var g = parseInt(c[d].number) - 1;
                              f.ka[g] = c[d];
                              f.ka[g].loaded = q;
                              for (var s = 0; s < f.ka[g].text.length; s++) {
                                  f.ka[g].text[s][5] = ka(f.ka[g].text[s][5]);
                              }
                              f.Uh(g);
                          }
                          f.wa.Eb(f.ka);
                          jQuery(f).trigger("onTextDataUpdated", c[0].number);
                          e != r && e();
                      }
                      f.pc = r;
                  },
                  error: function(c) {
                      H("Error loading JSON file (" + c.statusText + "). Please check your configuration.", "onDocumentLoadedError", f.ea);
                      f.pc = r;
                  }
              }));
          },
          Ja: function(c) {
              return c.bd;
          },
          Ra: function(c, d) {
              c.bd = d;
          },
          ic: function(c, d, e) {
              var f = this;
              if (c.ba != f.Ca(c) && -1 < f.Ja(c)) {
                  window.clearTimeout(c.vc), c.vc = setTimeout(function() {
                      f.ic(c, d, e);
                  }, 250);
              } else {
                  if (f.mc && c.ba != f.Ca(c) && (!f.Xd && c.Sj != c.scale || f.Xd && !c.jh)) {
                      if (c.ba == P || c.ba == X) {
                          f.Ra(c, c.pageNumber);
                          var m = jQuery(c.ua).get(0),
                            g = 1.5 < f.Cb ? f.Cb : 1.5;
                          f.Xd && (g = 2);
                          m.width = jQuery(m).width() * g;
                          m.height = jQuery(m).height() * g;
                          c.Sj = c.scale;
                          jQuery(m).data("needs-overlay", 1);
                          c.jh || (c.jh = q);
                          c.Mh(m).then(function(e) {
                              if (f.Xd) {
                                  var d = jQuery(e).css("background-image");
                                  0 < d.length && "none" != d ? (jQuery(e).css("background-image", "url('" + e.toDataURL() + "')," + d), jQuery("#" + f.ea).trigger("onPageLoaded", c.pageNumber + 1), fa(e)) : jQuery(e).css("background-image", "url('" + e.toDataURL() + "')");
                              }
                          }, z());
                      }
                  }
                  if (!(c.Ua && c.ba != f.Ca(c))) {
                      g = c.we;
                      if (c.ba == P || c.ba == X || c.ba == U || c.ba == R || c.ba == f.Ca(c)) {
                          var l = c.$a(),
                            s = c.sb(),
                            m = c.Kb();
                          0 == jQuery("#" + g).length ? (g = "<div id='" + g + "' class='flowpaper_textLayer' style='width:" + l + "px;height:" + s + "px;margin-left:" + m + "px;'></div>", c.ba == P || f.Ca(c) || c.ba == X ? jQuery(c.ya).append(g) : (c.ba == U || c.ba == R) && jQuery(c.ya + "_" + (c.pageNumber % 2 + 1)).append(g)) : jQuery("#" + g).css({
                              width: l,
                              height: s,
                              "margin-left": m
                          });
                          if (90 == c.rotation || 270 == c.rotation || 180 == c.rotation) {
                              jQuery(c.ab).css({
                                  "z-index": 11,
                                  "margin-left": m
                              }), jQuery(c.ab).transition({
                                  rotate: c.rotation,
                                  translate: "-" + m + "px, 0px"
                              }, 0);
                          }
                      }
                      if (c.ba == P || c.ba == V) {
                          if (!c.Ua && (jQuery(c.ua).attr("src") == f.mb || f.Be || f.mc) && !c.Oe) {
                              f.Ra(c, c.pageNumber), c.dimensions.loaded || f.Jc(c.pageNumber + 1, q, function() {
                                  f.dc(c);
                              }), c.ld(), f.Oa = new Image, jQuery(f.Oa).bind("load", function() {
                                  c.Oe = q;
                                  c.Hf = this.height;
                                  c.If = this.width;
                                  f.Oc(c);
                                  c.dimensions.xa > c.dimensions.width && (c.dimensions.width = c.dimensions.xa, c.dimensions.height = c.dimensions.Ga, (c.ba == P || c.ba == X) && c.ub());
                              }).bind("error", function() {
                                  H("Error loading image (" + this.src + ")", "onErrorLoadingPage", f.ea, c.pageNumber);
                              }), jQuery(f.Oa).bind("error", function() {
                                  f.Ra(c, -1);
                              }), jQuery(f.Oa).attr("src", f.Pa(c.pageNumber + 1, c.ba == V ? 200 : r));
                          }!c.Ua && (jQuery(c.ua).attr("src") == f.mb && c.Oe) && f.Oc(c);
                          e != r && e();
                      }
                      c.ba == f.Ca(c) && (!c.dimensions.loaded && (!f.dimensions[c.pageNumber - 1].loaded || f.getNumPages() == c.pageNumber + 1 && 0 == f.getNumPages() % 2) && f.Jc(c.pageNumber + 1, q, function() {
                          f.dc(c);
                      }), f.hb(c).ic(f, c, d, e));
                      c.ba == X && (c.Cd || (c.ld(), c.Cd = q), 0 == c.pageNumber && (f.Ra(c, c.ca.la), f.getDimensions()[f.Ja(c)].loaded || f.Jc(f.Ja(c) + 1, q, function() {
                          f.dc(c);
                      }), f.Oa = new Image, jQuery(f.Oa).bind("load", function() {
                          c.Oe = q;
                          c.Hf = this.height;
                          c.If = this.width;
                          c.Pb();
                          f.Oc(c);
                          c.dimensions.xa > c.dimensions.width && (c.dimensions.width = c.dimensions.xa, c.dimensions.height = c.dimensions.Ga, c.ub());
                          c.Ua || jQuery("#" + f.ea).trigger("onPageLoaded", c.pageNumber + 1);
                          c.Ua = q;
                          f.Ra(c, -1);
                      }), jQuery(f.Oa).bind("error", function() {
                          c.Pb();
                          f.Ra(c, -1);
                      }), jQuery(f.Oa).attr("src", f.Pa(c.ca.la + 1)), jQuery(c.pa + "_1").removeClass("flowpaper_load_on_demand"), e != r && e()));
                      if (c.ba == U || c.ba == R) {
                          c.Cd || (c.ld(), c.Cd = q), 0 == c.pageNumber ? (jQuery(c.ua), c.ba == R ? f.Ra(c, 0 != c.ca.la ? c.ca.la : c.ca.la + 1) : c.ba == U && f.Ra(c, c.ca.la), f.getDimensions()[f.Ja(c) - 1] && !f.getDimensions()[f.Ja(c) - 1].loaded && f.Jc(f.Ja(c) + 1, q, function() {
                              f.dc(c);
                          }), f.Oa = new Image, jQuery(f.Oa).bind("load", function() {
                              c.Oe = q;
                              c.Hf = this.height;
                              c.If = this.width;
                              c.Pb();
                              f.Oc(c);
                              c.dimensions.xa > c.dimensions.width && (c.dimensions.width = c.dimensions.xa, c.dimensions.height = c.dimensions.Ga, c.ub());
                              c.Ua || jQuery("#" + f.ea).trigger("onPageLoaded", c.pageNumber + 1);
                              c.Ua = q;
                              f.Ra(c, -1);
                          }), jQuery(f.Oa).bind("error", function() {
                              c.Pb();
                              f.Ra(c, -1);
                          }), c.ba == R && jQuery(f.Oa).attr("src", f.Pa(0 != c.ca.la ? c.ca.la : c.ca.la + 1)), c.ba == U && jQuery(f.Oa).attr("src", f.Pa(c.ca.la + 1)), jQuery(c.pa + "_1").removeClass("flowpaper_load_on_demand"), e != r && e()) : 1 == c.pageNumber && (m = jQuery(c.ua), c.ca.la + 1 > c.ca.getTotalPages() ? m.attr("src", "") : (0 != c.ca.la || c.ba == U ? (f.Ra(c, c.ca.la + 1), f.Oa = new Image, jQuery(f.Oa).bind("load", function() {
                              c.Pb();
                              f.Oc(c);
                              c.dimensions.xa > c.dimensions.width && (c.dimensions.width = c.dimensions.xa, c.dimensions.height = c.dimensions.Ga);
                              c.Ua || jQuery("#" + f.ea).trigger("onPageLoaded", c.pageNumber + 1);
                              c.Ua = q;
                              f.Ra(c, -1);
                          }), jQuery(f.Oa).bind("error", function() {
                              f.Ra(c, -1);
                              c.Pb();
                          })) : c.Pb(), c.ba == R && jQuery(f.Oa).attr("src", f.Pa(c.ca.la + 1)), c.ba == U && jQuery(f.Oa).attr("src", f.Pa(c.ca.la + 2)), 1 < c.ca.la && jQuery(c.pa + "_2").removeClass("flowpaper_hidden"), jQuery(c.pa + "_2").removeClass("flowpaper_load_on_demand")), e != r && e());
                      }
                  }
              }
          },
          Oc: function(c) {
              if (c.ba == P && (Math.round(100 * (c.If / c.Hf)) != Math.round(100 * (c.dimensions.width / c.dimensions.height)) || this.Be) && !(eb.browser.msie && 9 > eb.browser.version)) {
                  if (this.Be) {
                      jQuery(c.ua).attr("data", this.Pa(c.pageNumber + 1, r, q)), jQuery(c.pa).removeClass("flowpaper_load_on_demand"), jQuery(c.ua).css("width", jQuery(c.ua).css("width"));
                  } else {
                      if (this.Xd && this.mc) {
                          var d = jQuery(c.ua).css("background-image");
                          0 < d.length && "none" != d ? (jQuery(c.ua).css("background-image", d + ",url('" + this.Pa(c.pageNumber + 1) + "')"), jQuery("#" + this.ea).trigger("onPageLoaded", c.pageNumber + 1), fa(jQuery(c.ua).get(0))) : jQuery(c.ua).css("background-image", "url('" + this.Pa(c.pageNumber + 1) + "')");
                      } else {
                          jQuery(c.ua).css("background-image", "url('" + this.Pa(c.pageNumber + 1) + "')"), jQuery(c.ua).attr("src", this.mb);
                      }
                  }
                  jQuery("#" + c.Rb).hide();
                  !c.Ua && !this.mc && jQuery("#" + this.ea).trigger("onPageLoaded", c.pageNumber + 1);
                  c.Ua = q;
              } else {
                  c.ba == this.Ca(c) ? this.hb(c).Oc(this, c) : (c.ba == U || c.ba == R ? (0 == c.pageNumber && (d = c.ba == R ? 0 != c.ca.la ? c.ca.la : c.ca.la + 1 : c.ca.la + 1, c.We != d && (eb.browser.msie || eb.browser.safari && 5 > eb.browser.gc ? jQuery(c.ua).attr("src", this.Pa(d)) : jQuery(c.ua).css("background-image", "url('" + this.Pa(d) + "')"), jQuery(c.pa + "_1").removeClass("flowpaper_hidden"), c.We = d), jQuery(c.ua).removeClass("flowpaper_hidden")), 1 == c.pageNumber && (d = c.ba == R ? c.ca.la + 1 : c.ca.la + 2, c.We != d && (eb.browser.msie || eb.browser.safari && 5 > eb.browser.gc ? jQuery(c.ua).attr("src", this.Pa(d)) : jQuery(c.ua).css("background-image", "url('" + this.Pa(d) + "')"), c.We = d, c.ba == U && jQuery(c.pa + "_2").removeClass("flowpaper_hidden")), jQuery(c.ua).removeClass("flowpaper_hidden"))) : (c.ba == X ? jQuery(c.ua).attr("src", this.Pa(this.Ja(c) + 1)) : this.Be ? (jQuery(c.ua).attr("data", this.Pa(c.pageNumber + 1, r, q)), jQuery(c.pa).removeClass("flowpaper_load_on_demand")) : this.mc ? jQuery(c.ua).css("background-image", "url('" + this.Pa(c.pageNumber + 1) + "')") : jQuery(c.ua).attr("src", this.Pa(c.pageNumber + 1), c.ba == V ? 200 : r), jQuery("#" + c.Rb).hide()), c.Ua || jQuery("#" + this.ea).trigger("onPageLoaded", c.pageNumber + 1), c.Ua = q);
              }
              this.Ra(c, -1);
              this.Ad || (this.Ad = q, c.aa.Wf());
          },
          Ph: function(c) {
              c.ba == U || c.ba == R ? (0 == c.pageNumber && jQuery(c.ta).css("background-image", "url(" + this.mb + ")"), 1 == c.pageNumber && jQuery(c.ta).css("background-image", "url(" + this.mb + ")")) : jQuery(c.ta).css("background-image", "url(" + this.mb + ")");
          },
          unload: function(c) {
              jQuery(c.pa).addClass("flowpaper_load_on_demand");
              var d = r;
              if (c.ba == P || c.ba == V || c.ba == X) {
                  d = jQuery(c.ua);
              }
              if (c.ba == U || c.ba == R) {
                  d = jQuery(c.ua), jQuery(c.ua).addClass("flowpaper_hidden");
              }
              c.ba == this.Ca(c) && this.hb(c).unload(this, c);
              d != r && 0 < d.length && (d.attr("alt", d.attr("src")), d.attr("src", "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"));
              c.Cd = y;
              c.We = -1;
              jQuery(".flowpaper_pageword_" + this.ea + "_page_" + c.pageNumber + ":not(.flowpaper_selected_searchmatch, .flowpaper_annotation_" + this.ea + ")").remove();
              c.Sb && c.Sb();
              jQuery(".flowpaper_annotation_" + this.ea + "_page_" + c.pageNumber).remove();
              c.ng && c.ng();
          },
          getNumPages: function() {
              return this.ka.length;
          },
          dc: function(c, d, e, f) {
              this.wa.dc(c, d, e, f);
          },
          Vb: function(c, d, e) {
              this.wa.Vb(c, d, e);
          },
          $c: function(c, d, e, f) {
              this.wa.$c(c, d, e, f);
          },
          La: function(c, d, e) {
              this.wa.La(c, e);
          },
          oh: function(c, d) {
              if (this.md) {
                  if (1 > c.scale) {
                      c.Yh = d, c.Zh = y;
                  } else {
                      !d && c.Yh && (d = c.Yh);
                      var e = 0.25 * Math.round(c.gh()),
                        f = 0.25 * Math.round(c.fh());
                      jQuery(".flowpaper_flipview_canvas_highres_" + c.pageNumber).remove();
                      d == r && (d = c.pa);
                      var m = eb.platform.te || eb.platform.android ? "flowpaper_flipview_canvas_highres" : c.va + "_canvas_highres";
                      jQuery(d).append(String.format("<div id='" + c.va + "_canvas_highres_l1t1' class='{4}' style='z-index:11;position:relative;float:left;background-repeat:no-repeat;background-size:100% 100%;width:{2}px;height:{3}px;clear:both;'></div>", 0, 0, e, f, m) + String.format("<div id='" + c.va + "_canvas_highres_l2t1' class='{4}' style='z-index:11;position:relative;float:left;background-repeat-no-repeat;background-size:100% 100%;width:{2}px;height:{3}px;'></div>", e + 0 + 0, 0, e, f, m) + String.format("<div id='" + c.va + "_canvas_highres_r1t1' class='{4}' style='z-index:11;position:relative;float:left;background-repeat-no-repeat;background-size:100% 100%;width:{2}px;height:{3}px;'></div>", 2 * e + 0, 0, e, f, m) + String.format("<div id='" + c.va + "_canvas_highres_r2t1' class='{4}' style='z-index:11;position:relative;float:left;background-repeat-no-repeat;background-size:100% 100%;width:{2}px;height:{3}px;'></div>", 3 * e + 0, 0, e, f, m) + String.format("<div id='" + c.va + "_canvas_highres_l1t2' class='{4}' style='z-index:11;position:relative;float:left;background-repeat-no-repeat;background-size:100% 100%;width:{2}px;height:{3}px;clear:both;'></div>", 0, f + 0 + 0, e, f, m) + String.format("<div id='" + c.va + "_canvas_highres_l2t2' class='{4}' style='z-index:11;position:relative;float:left;background-repeat-no-repeat;background-size:100% 100%;width:{2}px;height:{3}px;'></div>", e + 0 + 0, f + 0 + 0, e, f, m) + String.format("<div id='" + c.va + "_canvas_highres_r1t2' class='{4}' style='z-index:11;position:relative;float:left;background-repeat-no-repeat;background-size:100% 100%;width:{2}px;height:{3}px;'></div>", 2 * e + 0, f + 0 + 0, e, f, m) + String.format("<div id='" + c.va + "_canvas_highres_r2t2' class='{4}' style='z-index:11;position:relative;float:left;background-repeat-no-repeat;background-size:100% 100%;width:{2}px;height:{3}px;'></div>", 3 * e + 0, f + 0 + 0, e, f, m) + String.format("<div id='" + c.va + "_canvas_highres_l1b1' class='{4}' style='z-index:11;position:relative;float:left;background-repeat-no-repeat;background-size:100% 100%;width:{2}px;height:{3}px;clear:both;'></div>", 0, 2 * f + 0, e, f, m) + String.format("<div id='" + c.va + "_canvas_highres_l2b1' class='{4}' style='z-index:11;position:relative;float:left;background-repeat-no-repeat;background-size:100% 100%;width:{2}px;height:{3}px;'></div>", e + 0 + 0, 2 * f + 0, e, f, m) + String.format("<div id='" + c.va + "_canvas_highres_r1b1' class='{4}' style='z-index:11;position:relative;float:left;background-repeat-no-repeat;background-size:100% 100%;width:{2}px;height:{3}px;'></div>", 2 * e + 0, 2 * f + 0, e, f, m) + String.format("<div id='" + c.va + "_canvas_highres_r2b1' class='{4}' style='z-index:11;position:relative;float:left;background-repeat-no-repeat;background-size:100% 100%;width:{2}px;height:{3}px;'></div>", 3 * e + 0, 2 * f + 0, e, f, m) + String.format("<div id='" + c.va + "_canvas_highres_l1b2' class='{4}' style='z-index:11;position:relative;float:left;background-repeat-no-repeat;background-size:100% 100%;width:{2}px;height:{3}px;clear:both;'></div>", 0, 3 * f + 0, e, f, m) + String.format("<div id='" + c.va + "_canvas_highres_l2b2' class='{4}' style='z-index:11;position:relative;float:left;background-repeat-no-repeat;background-size:100% 100%;width:{2}px;height:{3}px;'></div>", e + 0 + 0, 3 * f + 0, e, f, m) + String.format("<div id='" + c.va + "_canvas_highres_r1b2' class='{4}' style='z-index:11;position:relative;float:left;background-repeat-no-repeat;background-size:100% 100%;width:{2}px;height:{3}px;'></div>", 2 * e + 0, 3 * f + 0, e, f, m) + String.format("<div id='" + c.va + "_canvas_highres_r2b2' class='{4}' style='z-index:11;position:relative;float:left;background-repeat-no-repeat;background-size:100% 100%;width:{2}px;height:{3}px;'></div>", 3 * e + 0, 3 * f + 0, e, f, m) + "");
                      c.Zh = q;
                  }
              }
          },
          Zf: function(c) {
              if (!(1 > c.scale)) {
                  !c.Zh && this.md && this.oh(c);
                  if (this.md) {
                      var d = document.getElementById(c.va + "_canvas_highres_l1t1"),
                        e = document.getElementById(c.va + "_canvas_highres_l2t1"),
                        f = document.getElementById(c.va + "_canvas_highres_l1t2"),
                        m = document.getElementById(c.va + "_canvas_highres_l2t2"),
                        g = document.getElementById(c.va + "_canvas_highres_r1t1"),
                        l = document.getElementById(c.va + "_canvas_highres_r2t1"),
                        s = document.getElementById(c.va + "_canvas_highres_r1t2"),
                        h = document.getElementById(c.va + "_canvas_highres_r2t2"),
                        A = document.getElementById(c.va + "_canvas_highres_l1b1"),
                        K = document.getElementById(c.va + "_canvas_highres_l2b1"),
                        x = document.getElementById(c.va + "_canvas_highres_l1b2"),
                        u = document.getElementById(c.va + "_canvas_highres_l2b2"),
                        t = document.getElementById(c.va + "_canvas_highres_r1b1"),
                        v = document.getElementById(c.va + "_canvas_highres_r2b1"),
                        F = document.getElementById(c.va + "_canvas_highres_r1b2"),
                        B = document.getElementById(c.va + "_canvas_highres_r2b2");
                      if (1 == c.pageNumber && 1 == c.ca.la || c.pageNumber == c.ca.la - 1 || c.pageNumber == c.ca.la - 2) {
                          var G = c.ba == this.Ca(c) ? c.ca.ma : r,
                            C = c.ba == this.Ca(c) ? c.pageNumber + 1 : c.ca.la + 1;
                          jQuery(d).visible(q, G) && "none" === jQuery(d).css("background-image") && jQuery(d).css("background-image", "url('" + this.wb(C, "l1t1") + "')");
                          jQuery(e).visible(q, G) && "none" === jQuery(e).css("background-image") && jQuery(e).css("background-image", "url('" + this.wb(C, "l2t1") + "')");
                          jQuery(f).visible(q, G) && "none" === jQuery(f).css("background-image") && jQuery(f).css("background-image", "url('" + this.wb(C, "l1t2") + "')");
                          jQuery(m).visible(q, G) && "none" === jQuery(m).css("background-image") && jQuery(m).css("background-image", "url('" + this.wb(C, "l2t2") + "')");
                          jQuery(g).visible(q, G) && "none" === jQuery(g).css("background-image") && jQuery(g).css("background-image", "url('" + this.wb(C, "r1t1") + "')");
                          jQuery(l).visible(q, G) && "none" === jQuery(l).css("background-image") && jQuery(l).css("background-image", "url('" + this.wb(C, "r2t1") + "')");
                          jQuery(s).visible(q, G) && "none" === jQuery(s).css("background-image") && jQuery(s).css("background-image", "url('" + this.wb(C, "r1t2") + "')");
                          jQuery(h).visible(q, G) && "none" === jQuery(h).css("background-image") && jQuery(h).css("background-image", "url('" + this.wb(C, "r2t2") + "')");
                          jQuery(A).visible(q, G) && "none" === jQuery(A).css("background-image") && jQuery(A).css("background-image", "url('" + this.wb(C, "l1b1") + "')");
                          jQuery(K).visible(q, G) && "none" === jQuery(K).css("background-image") && jQuery(K).css("background-image", "url('" + this.wb(C, "l2b1") + "')");
                          jQuery(x).visible(q, G) && "none" === jQuery(x).css("background-image") && jQuery(x).css("background-image", "url('" + this.wb(C, "l1b2") + "')");
                          jQuery(u).visible(q, G) && "none" === jQuery(u).css("background-image") && jQuery(u).css("background-image", "url('" + this.wb(C, "l2b2") + "')");
                          jQuery(t).visible(q, G) && "none" === jQuery(t).css("background-image") && jQuery(t).css("background-image", "url('" + this.wb(C, "r1b1") + "')");
                          jQuery(v).visible(q, G) && "none" === jQuery(v).css("background-image") && jQuery(v).css("background-image", "url('" + this.wb(C, "r2b1") + "')");
                          jQuery(F).visible(q, G) && "none" === jQuery(F).css("background-image") && jQuery(F).css("background-image", "url('" + this.wb(C, "r1b2") + "')");
                          jQuery(B).visible(q, G) && "none" === jQuery(B).css("background-image") && jQuery(B).css("background-image", "url('" + this.wb(C, "r2b2") + "')");
                      }
                  }
                  c.Nh = q;
              }
          },
          uf: function(c) {
              if (this.md) {
                  var d = eb.platform.te || eb.platform.android ? "flowpaper_flipview_canvas_highres" : c.va + "_canvas_highres";
                  c.Nh && 0 < jQuery("." + d).length && (jQuery("." + d).css("background-image", ""), c.Nh = y);
              }
          }
      };
      return g;
  }(),
  CanvasPageRenderer = window.CanvasPageRenderer = function() {
      function g(c, d, e, f) {
          this.ea = c;
          this.file = d;
          this.jsDirectory = e;
          this.initialized = y;
          this.JSONPageDataFormat = this.Ka = this.dimensions = r;
          this.pageThumbImagePattern = f.pageThumbImagePattern;
          this.pageImagePattern = f.pageImagePattern;
          this.config = f;
          this.Je = this.ea + "_dummyPageCanvas_[pageNumber]";
          this.Bf = "#" + this.Je;
          this.Ke = this.ea + "dummyPageCanvas2_[pageNumber]";
          this.Cf = "#" + this.Ke;
          this.lb = [];
          this.context = this.ta = r;
          this.Ha = [];
          this.ef = [];
          this.Kc = "data:image/gif;base64,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%3D%3D";
          this.Ec = this.Ad = y;
          this.mb = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
          this.Te = 1;
          this.bb = [];
          this.Ue = {};
          this.JSONPageDataFormat = r;
          this.xj = q;
          this.Ea = f.compressedJSONFormat != r ? f.compressedJSONFormat : q;
          this.rf = [];
      }
      g.prototype = {
          ee: aa("CanvasPageRenderer"),
          Ca: function(c) {
              return c.aa ? c.aa.ha ? c.aa.ha.na : "" : y;
          },
          hb: function(c) {
              return c.aa.ha.Vl;
          },
          Ib: function() {
              jQuery(this.wa).unbind();
              this.wa.Ib();
              delete this.xb;
              this.xb = r;
              delete this.dimensions;
              this.dimensions = r;
              delete this.wa;
              this.wa = r;
              delete this.Ha;
              this.Ha = r;
              delete this.ef;
              this.ef = r;
          },
          initialize: function(c, d) {
              var e = this;
              e.xb = c;
              e.Cb = eb.platform.Cb;
              1 < e.Cb && eb.platform.touchonlydevice && (e.Cb = 1);
              if (e.config.MixedMode && (eb.browser.Vc || eb.browser.msie) && 0 == e.file.indexOf("http")) {
                  e.config.MixedMode = y;
              }
              e.vk = ("undefined" != e.jsDirectory && e.jsDirectory != r ? e.jsDirectory : "js/") + "pdf.min.js";
              e.JSONPageDataFormat = e.Ea ? {
                  Sa: "width",
                  Ya: "height",
                  Yc: "text",
                  ob: "d",
                  Ce: "f",
                  yc: "l",
                  zc: "t",
                  Ac: "w",
                  xc: "h"
              } : {
                  Sa: e.config.JSONPageDataFormat.pageWidth,
                  Ya: e.config.JSONPageDataFormat.pageHeight,
                  Yc: e.config.JSONPageDataFormat.textCollection,
                  ob: e.config.JSONPageDataFormat.textFragment,
                  Ce: e.config.JSONPageDataFormat.textFont,
                  yc: e.config.JSONPageDataFormat.textLeft,
                  zc: e.config.JSONPageDataFormat.textTop,
                  Ac: e.config.JSONPageDataFormat.textWidth,
                  xc: e.config.JSONPageDataFormat.textHeight
              };
              e.Da = e.file.indexOf && 0 <= e.file.indexOf("[*,") && e.config && e.config.jsonfile != r && !d.$g;
              e.wa = new oa(e.ea, e.Da, e.JSONPageDataFormat, q);
              e.Da && (e.Xk = e.file.substr(e.file.indexOf("[*,"), e.file.indexOf("]") - e.file.indexOf("[*,")), e.Vg = e.Vg = y);
              PDFJS.workerSrc = ("undefined" != e.jsDirectory && e.jsDirectory != r ? e.jsDirectory : "js/") + "pdf.worker.min.js";
              jQuery.getScript(e.vk, function() {
                  if (e.Vg) {
                      var f = new XMLHttpRequest;
                      f.open("HEAD", e.wf(1), y);
                      f.overrideMimeType("application/pdf");
                      f.onreadystatechange = function() {
                          if (200 == f.status) {
                              var c = f.getAllResponseHeaders(),
                                d = {};
                              if (c) {
                                  for (var c = c.split("\r\n"), m = 0; m < c.length; m++) {
                                      var g = c[m],
                                        n = g.indexOf(": ");
                                      0 < n && (d[g.substring(0, n)] = g.substring(n + 2));
                                  }
                              }
                              e.wg = "bytes" === d["Accept-Ranges"];
                              e.tj = "identity" === d["Content-Encoding"] || d["Content-Encoding"] === r || !d["Content-Encoding"];
                              e.wg && (e.tj && !eb.platform.ios && !eb.browser.safari) && (e.file = e.file.substr(0, e.file.indexOf(e.Xk) - 1) + ".pdf", e.Da = y);
                          }
                          f.abort();
                      };
                      try {
                          f.send(r);
                      } catch (m) {}
                  }
                  window["wordPageList_" + e.ea] = e.wa.Ha;
                  jQuery("#" + e.ea).trigger("onDocumentLoading");
                  FLOWPAPER.RANGE_CHUNK_SIZE && (PDFJS.RANGE_CHUNK_SIZE = FLOWPAPER.RANGE_CHUNK_SIZE);
                  PDFJS.disableWorker = e.Da || eb.browser.Vc || eb.browser.msie;
                  PDFJS.disableRange = e.Da;
                  PDFJS.disableAutoFetch = e.Da || y;
                  PDFJS.disableStream = e.Da || y;
                  PDFJS.pushTextGeometries = !e.Da;
                  PDFJS.verbosity = PDFJS.VERBOSITY_LEVELS.errors;
                  PDFJS.enableStats = y;
                  PDFJS.bm = q;
                  PDFJS.dm = q;
                  if (e.Da) {
                      e.Da && (e.config && e.config.jsonfile != r) && (e.Da = q, e.Ic = e.config.jsonfile, e.Om = new Promise(z()), jQuery.ajax({
                          url: e.qd(10),
                          dataType: e.config.JSONDataType,
                          success: function(c) {
                              c.e && (c = CryptoJS.RC4.decrypt(c.e, CryptoJS.enc.Hex.parse(eb.Sg ? Y() : eb.Pc.innerHTML)), c = jQuery.parseJSON(c.toString(CryptoJS.enc.Utf8)), e.od = q);
                              jQuery(e).trigger("loadingProgress", {
                                  ea: e.ea,
                                  progress: 0.1
                              });
                              if (0 < c.length) {
                                  e.ka = Array(c[0].pages);
                                  for (var d = 0; d < c.length; d++) {
                                      e.ka[d] = c[d];
                                      e.ka[d].loaded = q;
                                      for (var f = 0; f < e.ka[d].text.length; f++) {
                                          e.ka[d].text[f][5] = ka(e.ka[d].text[f][5]);
                                      }
                                      e.df(d);
                                  }
                                  0 < e.ka.length && (e.cb = e.ka[0].twofold, e.cb && (e.Cb = 1));
                                  for (d = 0; d < e.ka.length; d++) {
                                      e.ka[d] == r && (e.ka[d] = [], e.ka[d].loaded = y);
                                  }
                                  e.wa && e.wa.Eb && e.wa.Eb(e.ka);
                              }
                              e.ad = 1;
                              e.Ka = Array(c[0].pages);
                              e.lb = Array(c[0].pages);
                              e.Mf(e.ad, function() {
                                  jQuery(e).trigger("loadingProgress", {
                                      ea: e.ea,
                                      progress: 1
                                  });
                                  e.xb();
                              }, r, function(c) {
                                  c = 0.1 + c;
                                  1 < c && (c = 1);
                                  jQuery(e).trigger("loadingProgress", {
                                      ea: e.ea,
                                      progress: c
                                  });
                              });
                          },
                          error: function(f, m, g) {
                              m = f.responseText != r && 0 == f.responseText.indexOf("Error:") ? f.responseText.substr(6) : "";
                              this.url.indexOf("view.php") || this.url.indexOf("view.ashx") ? (console.log("Warning: Could not load JSON file. Switching to single file mode."), d.$g = q, e.Da = y, e.initialize(c, d), e.pageThumbImagePattern = r) : H("Error loading JSON file (" + f.statusText + "," + g + "). Please check your configuration.", "onDocumentLoadedError", e.ea, m);
                          }
                      }));
                  } else {
                      e.Ic = e.config.jsonfile;
                      var g = new jQuery.Deferred;
                      if (e.Ic && 0 < e.Ic.length) {
                          var l = jQuery.ajax({
                              url: e.qd(10),
                              dataType: e.config.JSONDataType,
                              success: function(c) {
                                  c.e && (c = CryptoJS.RC4.decrypt(c.e, CryptoJS.enc.Hex.parse(eb.Sg ? Y() : eb.Pc.innerHTML)), c = jQuery.parseJSON(c.toString(CryptoJS.enc.Utf8)), e.od = q);
                                  if (0 < c.length) {
                                      e.ka = Array(c[0].pages);
                                      for (var d = 0; d < c.length; d++) {
                                          e.ka[d] = c[d];
                                          e.ka[d].loaded = q;
                                          for (var f = 0; f < e.ka[d].text.length; f++) {
                                              e.ka[d].text[f][5] = ka(e.ka[d].text[f][5]);
                                          }
                                          e.df(d);
                                      }
                                      for (d = 0; d < e.ka.length; d++) {
                                          e.ka[d] == r && (e.ka[d] = [], e.ka[d].loaded = y);
                                      }
                                      e.wa && e.wa.Eb && e.wa.Eb(e.ka);
                                      0 < e.ka.length && (e.cb = e.ka[0].twofold, e.cb && (e.Cb = 1));
                                  }
                              }
                          });
                          l.fail(function() {
                              g.resolve();
                          });
                          l.then(function() {
                              g.resolve();
                          });
                      } else {
                          g.resolve();
                      }
                      g.then(function() {
                          var c = {},
                            f = e.file;
                          d && (d.$g && f.match(/(page=\d)/ig)) && (f = f.replace(/(page=\d)/ig, ""));
                          e.file.indexOf && !(e.file instanceof Uint8Array) && !(e.file.indexOf && 0 == e.file.indexOf("blob:")) ? c.url = f : c = f;
                          e.Oh() && (c.password = e.config.signature + "e0737b87e9be157a2f73ae6ba1352a65");
                          var m = 0;
                          c.rangeChunkSize = FLOWPAPER.RANGE_CHUNK_SIZE;
                          c = PDFJS.getDocument(c);
                          c.onPassword = function(c, d) {
                              jQuery("#" + e.ea).trigger("onPasswordNeeded", c, d);
                          };
                          c.onProgress = function(c) {
                              m = c.loaded / c.total;
                              1 < m && (m = 1);
                              jQuery(e).trigger("loadingProgress", {
                                  ea: e.ea,
                                  progress: m
                              });
                          };
                          c.then(function(c) {
                              0.5 > m && jQuery(e).trigger("loadingProgress", {
                                  ea: e.ea,
                                  progress: 0.5
                              });
                              e.pdf = e.Ka = c;
                              e.Ka.getPageLabels().then(function(c) {
                                  jQuery(e).trigger("labelsLoaded", {
                                      qh: c
                                  });
                              });
                              e.initialized = q;
                              e.dimensions = r;
                              e.lb = Array(!e.cb ? e.Ka.numPages : e.ka.length);
                              e.dimensions = [];
                              e.Ka.getDestinations().then(function(c) {
                                  e.destinations = c;
                              });
                              var f = d && d.StartAtPage ? parseInt(d.StartAtPage) : 1;
                              e.Ka.getPage(f).then(function(c) {
                                  c = c.getViewport(1);
                                  var d = e.Ka.numPages;
                                  !e.Da && e.cb && (d = e.ka.length);
                                  for (var i = 1; i <= d; i++) {
                                      e.dimensions[i - 1] = [], e.dimensions[i - 1].page = i - 1, e.dimensions[i - 1].width = c.width, e.dimensions[i - 1].height = c.height, e.dimensions[i - 1].xa = c.width, e.dimensions[i - 1].Ga = c.height;
                                  }
                                  e.xf = q;
                                  jQuery(e).trigger("loadingProgress", {
                                      ea: e.ea,
                                      progress: 1
                                  });
                                  1 == f && 1 < d && window.zine ? e.Ka.getPage(2).then(function(c) {
                                      c = c.getViewport(1);
                                      e.cb = 2 * Math.round(e.dimensions[0].width) >= Math.round(c.width) - 1 && 2 * Math.round(e.dimensions[0].width) <= Math.round(c.width) + 1;
                                      if (e.cb) {
                                          e.ka = Array(d);
                                          for (var f = 0; f < e.ka.length; f++) {
                                              e.ka[f] = {}, e.ka[f].text = [], e.ka[f].ca = d, e.ka[f].cb = q, e.ka[f].width = 0 == f ? e.dimensions[0].width : c.width, e.ka[f].height = 0 == f ? e.dimensions[0].height : c.height, e.df(f);
                                          }
                                      }
                                      e.xb();
                                  }) : e.xb();
                              });
                              e.$h(e.Ka);
                          }, function(c) {
                              H("Cannot load PDF file (" + c + ")", "onDocumentLoadedError", e.ea, "Cannot load PDF file (" + c + ")");
                              jQuery(e).trigger("loadingProgress", {
                                  ea: e.ea,
                                  progress: "Error"
                              });
                          }, z(), function(c) {
                              jQuery(e).trigger("loadingProgress", {
                                  ea: e.ea,
                                  progress: c.loaded / c.total
                              });
                          });
                      });
                  }
              }).fail(z());
              e.JSONPageDataFormat = {
                  Sa: "width",
                  Ya: "height",
                  Yc: "text",
                  ob: "d",
                  Ce: "f",
                  yc: "l",
                  zc: "t",
                  Ac: "w",
                  xc: "h"
              };
          },
          Mf: function(c, d, e) {
              var f = this,
                m = {};
              m.url = f.wf(c);
              f.Oh() && (m.password = f.config.signature + "e0737b87e9be157a2f73ae6ba1352a65");
              m.rangeChunkSize = FLOWPAPER.RANGE_CHUNK_SIZE;
              f.Un = PDFJS.getDocument(m).then(function(m) {
                  f.Ka[c - 1] = m;
                  f.initialized = q;
                  f.dimensions || (f.dimensions = []);
                  f.Ka[c - 1].getDestinations().then(function(c) {
                      f.destinations = c;
                  });
                  f.Ka[c - 1].getPage(1).then(function(m) {
                      f.lb[c - 1] = m;
                      var g = m.getViewport(f.cb ? 1 : 1.5),
                        h = f.dimensions && f.dimensions[c - 1] ? f.dimensions[c - 1] : [],
                        n = Math.floor(g.width),
                        g = Math.floor(g.height),
                        K = h && h.width && !(n > h.width - 1 && n < h.width + 1),
                        x = h && h.height && !(g > h.height - 1 && g < h.height + 1);
                      f.dimensions[c - 1] = [];
                      f.dimensions[c - 1].loaded = q;
                      f.dimensions[c - 1].page = c - 1;
                      f.dimensions[c - 1].width = n;
                      1 < c && f.cb && (c < f.Ka[c - 1].numPages || 0 != f.Ka[c - 1].numPages % 2) ? (f.dimensions[c - 1].width /= 2, f.dimensions[c - 1].xa = n / 2) : f.dimensions[c - 1].xa = n;
                      h.width && (!(f.dimensions[c - 1].width > h.width - 1 && f.dimensions[c - 1].width < h.width + 1) && e && !f.cb) && (e.dimensions.xa = n, e.dimensions.Ga = g, e.ub());
                      if (K || !f.dimensions[c - 1].xa) {
                          f.dimensions[c - 1].xa = n;
                      }
                      if (x || !f.dimensions[c - 1].Ga) {
                          f.dimensions[c - 1].Ga = g;
                      }
                      f.dimensions[c - 1].height = g;
                      if (1 < c && f.cb && (c < f.Ka[c - 1].numPages || 0 != f.Ka[c - 1].numPages % 2)) {
                          f.dimensions[c - 1].xa /= 2;
                      }
                      f.Aa[c - 1] != r && f.Aa.length > c && (f.dimensions[c - 1].bc = f.Aa[c].bc, f.dimensions[c - 1].ac = f.Aa[c].ac, f.dimensions[c - 1].Fb = f.Aa[c].Fb, f.dimensions[c - 1].jc = f.Aa[c].jc);
                      f.Ue[c - 1 + " " + m.ref.gen + " R"] = c - 1;
                      f.xf = q;
                      f.ad = -1;
                      d && d();
                  });
                  f.ad = -1;
              }, function(c) {
                  H("Cannot load PDF file (" + c + ")", "onDocumentLoadedError", f.ea);
                  jQuery(f).trigger("loadingProgress", {
                      ea: f.ea,
                      progress: "Error"
                  });
                  f.ad = -1;
              });
          },
          qd: function(c) {
              return this.Ic.replace("{page}", c);
          },
          Ef: function(c) {
              var d = 1;
              if (1 < c) {
                  for (var e = 0; e < c; e++) {
                      (0 != e % 2 || 0 == e % 2 && 0 == c % 2 && e == c - 1) && d++;
                  }
                  return d;
              }
              return 1;
          },
          Oh: function() {
              return this.config.signature != r && 0 < this.config.signature.length;
          },
          wf: function(c) {
              this.config.PageIndexAdjustment && (c += this.config.PageIndexAdjustment);
              this.cb && 1 < c && (c = this.Ef(c));
              if (0 <= this.file.indexOf("{page}")) {
                  return this.file.replace("{page}", c);
              }
              if (0 <= this.file.indexOf("[*,")) {
                  var d = this.file.substr(this.file.indexOf("[*,"), this.file.indexOf("]") - this.file.indexOf("[*,") + 1);
                  return this.file.replace(d, la(c, parseInt(d.substr(d.indexOf(",") + 1, d.indexOf("]") - 2))));
              }
          },
          de: function(c) {
              return c + (10 - c % 10);
          },
          Jc: function(c, d, e, f, m) {
              var g = this;
              g.pc == g.de(c) ? (window.clearTimeout(m.dk), m.dk = setTimeout(function() {
                  m.dimensions.loaded || g.Jc(c, d, e, f, m);
              }, 100)) : (g.pc = g.de(c), jQuery.ajax({
                  url: g.qd(g.pc),
                  dataType: g.config.JSONDataType,
                  async: d,
                  success: function(c) {
                      c.e && (c = CryptoJS.RC4.decrypt(c.e, CryptoJS.enc.Hex.parse(eb.Sg ? Y() : eb.Pc.innerHTML)), c = jQuery.parseJSON(c.toString(CryptoJS.enc.Utf8)), g.od = q);
                      if (0 < c.length) {
                          for (var d = 0; d < c.length; d++) {
                              var f = parseInt(c[d].number) - 1;
                              g.ka[f] = c[d];
                              g.ka[f].loaded = q;
                              for (var A = 0; A < g.ka[f].text.length; A++) {
                                  g.ka[f].text[A][5] = ka(g.ka[f].text[A][5]);
                              }
                              g.gk(f);
                              g.df(f, m);
                          }
                          g.wa.Eb && g.wa.Eb(g.ka);
                          jQuery(g).trigger("onTextDataUpdated");
                          e != r && e();
                      }
                      g.pc = r;
                  },
                  error: function(c) {
                      H("Error loading JSON file (" + c.statusText + "). Please check your configuration.", "onDocumentLoadedError", g.ea);
                      g.pc = r;
                  }
              }));
          },
          df: function(c) {
              this.Aa || (this.Aa = []);
              this.Aa[c] || (this.Aa[c] = []);
              this.Aa[c].bc = this.ka[c][this.JSONPageDataFormat.Sa];
              this.Aa[c].ac = this.ka[c][this.JSONPageDataFormat.Ya];
              this.Aa[c].Fb = this.Aa[c].bc;
              this.Aa[c].jc = this.Aa[c].ac;
              c = this.Aa[c];
              for (var d = 0; d < this.getNumPages(); d++) {
                  this.Aa[d] == r && (this.Aa[d] = [], this.Aa[d].bc = c.bc, this.Aa[d].ac = c.ac, this.Aa[d].Fb = c.Fb, this.Aa[d].jc = c.jc);
              }
          },
          getDimensions: function() {
              var c = this;
              if (c.dimensions == r || c.xf || c.dimensions != r && 0 == c.dimensions.length) {
                  c.dimensions == r && (c.dimensions = []);
                  var d = c.Ka.numPages;
                  !c.Da && c.cb && (d = c.ka.length);
                  if (c.Da) {
                      for (var e = 0; e < c.getNumPages(); e++) {
                          c.dimensions[e] != r || c.dimensions[e] != r && !c.dimensions[e].loaded ? (c.Ob == r && (c.Ob = c.dimensions[e]), !c.dimensions[e].Fb && c.Aa[e] != r && (c.dimensions[e].Fb = c.Aa[e].Fb, c.dimensions[e].jc = c.Aa[e].jc)) : c.Ob != r && (c.dimensions[e] = [], c.dimensions[e].page = e, c.dimensions[e].loaded = y, c.dimensions[e].width = c.Ob.width, c.dimensions[e].height = c.Ob.height, c.dimensions[e].xa = c.Ob.xa, c.dimensions[e].Ga = c.Ob.Ga, c.Aa[e] != r && (c.dimensions[e].width = c.Aa[e].bc, c.dimensions[e].height = c.Aa[e].ac, c.dimensions[e].xa = c.Aa[e].Fb, c.dimensions[e].Ga = c.Aa[e].jc), c.Aa[e - 1] != r && (c.dimensions[e - 1].bc = c.Aa[e].bc, c.dimensions[e - 1].ac = c.Aa[e].ac, c.dimensions[e - 1].Fb = c.Aa[e].Fb, c.dimensions[e - 1].jc = c.Aa[e].jc), e == c.getNumPages() - 1 && (c.dimensions[e].bc = c.Aa[e].bc, c.dimensions[e].ac = c.Aa[e].ac, c.dimensions[e].Fb = c.Aa[e].Fb, c.dimensions[e].jc = c.Aa[e].jc), c.Ue[e + " 0 R"] = e);
                      }
                  } else {
                      for (e = 1; e <= d; e++) {
                          var f = e;
                          c.cb && (f = c.Ef(e));
                          c.Ka.getPage(f).then(function(e) {
                              var d = e.getViewport(1);
                              if (c.dimensions && c.dimensions[e.pageIndex]) {
                                  c.dimensions[e.pageIndex] = [];
                                  c.dimensions[e.pageIndex].page = e.pageIndex;
                                  c.dimensions[e.pageIndex].width = d.width;
                                  c.dimensions[e.pageIndex].height = d.height;
                                  c.dimensions[e.pageIndex].xa = d.width;
                                  c.dimensions[e.pageIndex].Ga = d.height;
                                  d = e.ref;
                                  c.Ue[d.num + " " + d.gen + " R"] = e.pageIndex;
                              }
                          });
                      }
                  }
                  c.xf = y;
              }
              return c.dimensions;
          },
          gk: function(c) {
              if (this.dimensions[c]) {
                  this.dimensions[c].page = c;
                  this.dimensions[c].loaded = q;
                  this.bb[c] = [];
                  this.bb[c] = "";
                  for (var d = 0, e; e = this.ka[c][this.JSONPageDataFormat.Yc][d++];) {
                      this.Ea ? !isNaN(e[0].toString()) && 0 <= Number(e[0].toString()) && (!isNaN(e[1].toString()) && 0 <= Number(e[1].toString()) && !isNaN(e[2].toString()) && 0 <= Number(e[2].toString()) && !isNaN(e[3].toString()) && 0 <= Number(e[3].toString())) && (this.bb[c] += e[5]) : !isNaN(e[this.JSONPageDataFormat.yc].toString()) && 0 <= Number(e[this.JSONPageDataFormat.yc].toString()) && (!isNaN(e[this.JSONPageDataFormat.zc].toString()) && 0 <= Number(e[this.JSONPageDataFormat.zc].toString()) && !isNaN(e[this.JSONPageDataFormat.Ac].toString()) && 0 < Number(e[this.JSONPageDataFormat.Ac].toString()) && !isNaN(e[this.JSONPageDataFormat.xc].toString()) && 0 < Number(e[this.JSONPageDataFormat.xc].toString())) && (this.bb[c] += e[this.JSONPageDataFormat.ob]);
                  }
                  this.bb[c] = this.bb[c].toLowerCase();
              }
          },
          getNumPages: function() {
              return this.Da ? this.ka.length : this.cb ? this.ka.length : this.Ka ? this.Ka.numPages : this.ka.length;
          },
          getPage: function(c) {
              this.Ka.getPage(c).then(function(c) {
                  return c;
              });
              return r;
          },
          Oc: function(c) {
              var d = this;
              c.ba == U || c.ba == R ? (0 == c.pageNumber && jQuery(c.ta).css("background-image", "url('" + d.Pa(c.ca.la + 1) + "')"), 1 == c.pageNumber && jQuery(c.ta).css("background-image", "url('" + d.Pa(c.ca.la + 2) + "')")) : c.ba == V ? jQuery(c.ta).css("background-image", "url('" + d.Pa(c.pageNumber + 1, 200) + "')") : c.ba == X ? jQuery(c.ta).css("background-image", "url('" + d.Pa(d.Ja(c) + 1) + "')") : jQuery(c.ta).css("background-image", "url('" + d.Pa(c.pageNumber + 1) + "')");
              c.Oa = new Image;
              jQuery(c.Oa).bind("load", function() {
                  var e = Math.round(100 * (c.Oa.width / c.Oa.height)),
                    f = Math.round(100 * (c.dimensions.width / c.dimensions.height));
                  if (c.ba == X) {
                      var e = d.Aa[c.ca.la],
                        m = Math.round(100 * (e.bc / e.ac)),
                        f = Math.round(100 * (c.dimensions.xa / c.dimensions.Ga));
                      m != f && (c.dimensions.xa = e.bc, c.dimensions.Ga = e.ac, c.ub(), c.kg = -1, d.La(c, q, r));
                  } else {
                      e != f && (c.dimensions.xa = c.Oa.width, c.dimensions.Ga = c.Oa.height, c.ub(), c.kg = -1, d.La(c, q, r));
                  }
              });
              jQuery(c.Oa).attr("src", d.Pa(c.pageNumber + 1));
          },
          Ph: function(c) {
              c.ba == U || c.ba == R ? (0 == c.pageNumber && jQuery(c.ta).css("background-image", "url(" + this.mb + ")"), 1 == c.pageNumber && jQuery(c.ta).css("background-image", "url(" + this.mb + ")")) : jQuery(c.ta).css("background-image", "url(" + this.mb + ")");
          },
          Re: function(c) {
              this.Ub = c.Ub = this.Da && this.config.MixedMode;
              if (c.ba == P || c.ba == X) {
                  jQuery(c.pa).append("<canvas id='" + this.rb(1, c) + "' style='position:relative;left:0px;top:0px;width:100%;height:100%;display:none;background-repeat:no-repeat;background-size:" + (!eb.browser.mozilla && !eb.browser.safari || !eb.platform.mac ? "cover" : "100% 100%") + ";background-color:#ffffff;' class='" + (!this.config.DisableShadows ? "flowpaper_border" : "") + " flowpaper_interactivearea flowpaper_grab flowpaper_hidden flowpaper_rescale'></canvas><canvas id='" + this.rb(2, c) + "' style='position:relative;left:0px;top:0px;width:100%;height:100%;display:block;background-repeat:no-repeat;background-size:" + (!eb.browser.mozilla && !eb.browser.safari || !eb.platform.mac ? "cover" : "100% 100%") + ";background-color:#ffffff;' class='" + (!this.config.DisableShadows ? "flowpaper_border" : "") + " flowpaper_interactivearea flowpaper_grab flowpaper_hidden flowpaper_rescale'></canvas>");
              }
              c.ba == this.Ca(c) && this.hb(c).Re(this, c);
              c.ba == V && jQuery(c.pa).append("<canvas id='" + this.rb(1, c) + "' style='" + c.getDimensions() + ";background-repeat:no-repeat;background-size:" + (!eb.browser.mozilla && !eb.browser.safari || !eb.platform.mac ? "cover" : "100% 100%") + ";background-color:#ffffff;' class='flowpaper_interactivearea flowpaper_grab flowpaper_hidden' ></canvas>");
              if (c.ba == U || c.ba == R) {
                  0 == c.pageNumber && (jQuery(c.pa + "_1").append("<img id='" + c.Rb + "_1' src='" + this.Kc + "' style='position:absolute;left:" + (c.$a() - 30) + "px;top:" + c.sb() / 2 + "px;' />"), jQuery(c.pa + "_1").append("<canvas id='" + this.rb(1, c) + "' style='position:absolute;width:100%;height:100%;background-repeat:no-repeat;background-size:" + (!eb.browser.mozilla && !eb.browser.safari || !eb.platform.mac ? "cover" : "100% 100%") + ";background-color:#ffffff;' class='flowpaper_interactivearea flowpaper_grab flowpaper_hidden'/></canvas>"), jQuery(c.pa + "_1").append("<div id='" + c.va + "_1_textoverlay' style='position:relative;left:0px;top:0px;width:100%;height:100%;z-index:10'></div>")), 1 == c.pageNumber && (jQuery(c.pa + "_2").append("<img id='" + c.Rb + "_2' src='" + this.Kc + "' style='position:absolute;left:" + (c.$a() / 2 - 10) + "px;top:" + c.sb() / 2 + "px;' />"), jQuery(c.pa + "_2").append("<canvas id='" + this.rb(2, c) + "' style='position:absolute;width:100%;height:100%;background-repeat:no-repeat;background-size:" + (!eb.browser.mozilla && !eb.browser.safari || !eb.platform.mac ? "cover" : "100% 100%") + ";background-color:#ffffff;' class='flowpaper_interactivearea flowpaper_grab flowpaper_hidden'/></canvas>"), jQuery(c.pa + "_2").append("<div id='" + c.va + "_2_textoverlay' style='position:absolute;left:0px;top:0px;width:100%;height:100%;z-index:10'></div>"));
              }
          },
          rb: function(c, d) {
              var e = d.pageNumber;
              if ((d.ba == U || d.ba == R) && 0 == d.pageNumber % 2) {
                  return this.ea + "_dummyCanvas1";
              }
              if ((d.ba == U || d.ba == R) && 0 != d.pageNumber % 2) {
                  return this.ea + "_dummyCanvas2";
              }
              if (1 == c) {
                  return this.Je.replace("[pageNumber]", e);
              }
              if (2 == c) {
                  return this.Ke.replace("[pageNumber]", e);
              }
          },
          Pj: function(c, d) {
              if ((d.ba == U || d.ba == R) && 0 == d.pageNumber % 2) {
                  return "#" + this.ea + "_dummyCanvas1";
              }
              if ((d.ba == U || d.ba == R) && 0 != d.pageNumber % 2) {
                  return "#" + this.ea + "_dummyCanvas2";
              }
              if (1 == c) {
                  return this.Bf.replace("[pageNumber]", d.pageNumber);
              }
              if (2 == c) {
                  return this.Cf.replace("[pageNumber]", d.pageNumber);
              }
          },
          ic: function(c, d, e) {
              var f = this;
              f.Zg = q;
              if (c.ba != f.Ca(c) || f.hb(c).vn(f, c, d, e)) {
                  if ((c.ba == P || c.ba == U || c.ba == R) && c.context == r && !c.Cd) {
                      c.ld(), c.Cd = q;
                  }
                  1 == f.Ck && (1 < c.scale && c.Ub) && f.Ra(c, -1);
                  if (-1 < f.Ja(c) || f.Da && f.Jd != r) {
                      window.clearTimeout(c.vc), c.vc = setTimeout(function() {
                          setTimeout(function() {
                              f.ic(c, d, e);
                          });
                      }, 50);
                  } else {
                      f.uh = c;
                      f.Ck = c.scale;
                      if (c.ba == U || c.ba == R) {
                          if (0 == c.pageNumber) {
                              c.ba == R ? f.Ra(c, 0 == c.ca.la ? c.ca.la : c.ca.la - 1) : c.ba == U && f.Ra(c, c.ca.la), f.Pg = c, c.Pb();
                          } else {
                              if (1 == c.pageNumber) {
                                  c.ba == R ? f.Ra(c, c.ca.la) : c.ba == U && f.Ra(c, c.ca.la + 1), f.Pg = c, jQuery(c.pa + "_2").removeClass("flowpaper_hidden"), jQuery(c.pa + "_2").removeClass("flowpaper_load_on_demand"), c.Pb();
                              } else {
                                  return;
                              }
                          }
                      } else {
                          c.ba == X ? f.Ra(c, c.ca.la) : (f.Ra(c, c.pageNumber), f.Pg = c);
                      }
                      f.Th(c);
                      if ((c.Ub || f.Da) && !c.dimensions.loaded) {
                          var m = c.pageNumber + 1;
                          c.ba == X && (m = f.Ja(c) + 1);
                          f.Jc(m, q, function() {
                              c.dimensions.loaded = y;
                              f.dc(c);
                          }, q, c);
                      }
                      var m = y,
                        g = c.we;
                      if (c.ba == P || c.ba == X || c.ba == U || c.ba == R || c.ba == f.Ca(c) && f.hb(c).Jn(f, c)) {
                          var m = q,
                            l = c.Kb(),
                            s = c.$a(),
                            h = c.sb();
                          0 == jQuery("#" + g).length ? (s = "<div id='" + g + "' class='flowpaper_textLayer' style='width:" + s + "px;height:" + h + "px;backface-visibility:hidden;margin-left:" + l + "px;'></div>", c.ba == P || f.Ca(c) || c.ba == X ? jQuery(c.ya).append(s) : (c.ba == U || c.ba == R) && jQuery(c.ya + "_" + (c.pageNumber % 2 + 1)).append(s)) : jQuery("#" + g).css({
                              width: s,
                              height: h,
                              "margin-left": l
                          });
                          if (90 == c.rotation || 270 == c.rotation || 180 == c.rotation) {
                              jQuery(c.ab).css({
                                  "z-index": 11,
                                  "margin-left": l
                              }), jQuery(c.ab).transition({
                                  rotate: c.rotation,
                                  translate: "-" + l + "px, 0px"
                              }, 0);
                          }
                      }
                      if (c.Ub && 1.1 >= c.scale && !c.zj) {
                          -1 < f.Ja(c) && window.clearTimeout(c.vc), jQuery(c.pa).removeClass("flowpaper_load_on_demand"), f.Da && c.aa.initialized && !c.pj ? f.rf.push(function() {
                              var e = new XMLHttpRequest;
                              e.open("GET", f.wf(c.pageNumber + 1), q);
                              e.overrideMimeType("text/plain; charset=x-user-defined");
                              e.addEventListener("load", function() {
                                  f.tf();
                              });
                              e.addEventListener("error", function() {
                                  f.tf();
                              });
                              e.send(r);
                              c.pj = q;
                          }) : f.wg && f.lb[f.Ja(c)] == r && (l = f.Ja(c) + 1, f.Ka && f.Ka.getPage && f.Ka.getPage(l).then(function(e) {
                              f.lb[f.Ja(c)] = e;
                          })), c.ba == f.Ca(c) ? f.hb(c).ic(f, c, d, e) : (f.Oc(c), f.Yd(c, e)), c.Ua = q;
                      } else {
                          if (c.Ub && 1.1 < c.scale && !c.zj) {
                              c.ba != f.Ca(c) && f.Oc(c);
                          } else {
                              if (!c.Ub && c.Nf && c.ba == f.Ca(c) && 1 == c.scale && !f.yf) {
                                  if (!c.Dc && 100 != c.ta.width) {
                                      c.Dc = c.ta.toDataURL(), l = jQuery("#" + f.rb(1, c)), l.css("background-image").length < c.Dc.length + 5 && l.css("background-image", "url(" + c.Dc + ")"), l[0].width = 100;
                                  } else {
                                      if (c.Dc && !f.Da && "none" != jQuery("#" + f.rb(1, c)).css("background-image")) {
                                          f.Ra(c, -1);
                                          c.Ua = q;
                                          return;
                                      }
                                  }
                                  f.Kh(c);
                              }
                          }
                          f.lb[f.Ja(c)] == r && !f.Da && (l = f.Ja(c) + 1, f.cb && (l = f.Ef(l)), f.Ka && f.Ka.getPage && f.Ka.getPage(l).then(function(m) {
                              f.lb[f.Ja(c)] = m;
                              window.clearTimeout(c.vc);
                              f.Ra(c, -1);
                              f.ic(c, d, e);
                          }));
                          if (c.ta) {
                              if (100 != c.ta.width && 1 == c.scale && c.ba == f.Ca(c) && !c.Gk) {
                                  jQuery("#" + f.rb(1, c)).gg(), jQuery("#" + f.rb(2, c)).lh(), 1 == c.scale && eb.browser.safari ? (jQuery("#" + f.rb(1, c)).css("-webkit-backface-visibility", "hidden"), jQuery("#" + f.rb(2, c)).css("-webkit-backface-visibility", "hidden"), jQuery("#" + c.va + "_textoverlay").css("-webkit-backface-visibility", "hidden")) : eb.browser.safari && (jQuery("#" + f.rb(1, c)).css("-webkit-backface-visibility", "visible"), jQuery("#" + f.rb(2, c)).css("-webkit-backface-visibility", "visible"), jQuery("#" + c.va + "_textoverlay").css("-webkit-backface-visibility", "visible")), f.Ra(c, -1), c.Ua || jQuery("#" + f.ea).trigger("onPageLoaded", c.pageNumber + 1), c.Ua = q, f.La(c, q, e);
                              } else {
                                  if (l = q, f.lb[f.Ja(c)] == r && f.Da && (c.ba == f.Ca(c) && (l = f.hb(c).un(f, c)), f.Ka[f.Ja(c)] == r && (-1 == f.ad && l && f.Jd == r) && (f.ad = f.Ja(c) + 1, f.Mf(f.ad, function() {
                                      window.clearTimeout(c.vc);
                                      f.Ra(c, -1);
                                      f.ic(c, d, e);
                                  }, c))), !(f.lb[f.Ja(c)] == r && l) && (c.ba == f.Ca(c) ? f.hb(c).ic(f, c, d, e) : (c.ta.width = c.$a(), c.ta.height = c.sb()), f.cb && 0 < c.Hb.indexOf("cropCanvas") && (c.ta.width *= 2), !(f.lb[f.Ja(c)] == r && l))) {
                                      if (f.Zg) {
                                          var height = f.getDimensions()[c.pageNumber] ? f.getDimensions()[c.pageNumber].height : 1;
                                          l = c.ta.height / height;
                                          c.ba != f.Ca(c) && (l *= f.Cb);
                                          f.il = l;
                                          1.5 > l && (l = 1.5);
                                          f.Qm = l;
                                          var A = f.lb[f.Ja(c)].getViewport(l);
                                          f.cb || (c.ta.width = A.width, c.ta.height = A.height);
                                          var K = c.Bk = {
                                              canvasContext: c.context,
                                              viewport: A,
                                              pageNumber: c.pageNumber,
                                              bi: m && !f.Da ? new pa(document.getElementById(g)) : r
                                          };
                                          f.lb[f.Ja(c)].objs.geometryTextList = [];
                                          window.Dk(function() {
                                              c.ta.style.display = "none";
                                              c.ta.redraw = c.ta.offsetHeight;
                                              c.ta.style.display = "";
                                              f.Jd = f.lb[f.Ja(c)].render(K);
                                              f.Jd.onContinue = function(c) {
                                                  c();
                                              };
                                              f.Jd.promise.then(function() {
                                                  f.Jd = r;
                                                  if (f.lb[f.Ja(c)] != r) {
                                                      if (!f.Da && !(c.Ub && 1.1 >= c.scale) && c.ta) {
                                                          var height = f.getDimensions()[c.pageNumber] ? f.getDimensions()[c.pageNumber].height : 1;
                                                          var d = c.ta.height / height,
                                                            m = f.lb[f.Ja(c)].objs.geometryTextList;
                                                          if (m) {
                                                              for (var g = 0; g < m.length; g++) {
                                                                  m[g].Kk != d && (m[g].h = m[g].metrics.height / d, m[g].l = m[g].metrics.left / d, m[g].t = m[g].metrics.top / d, m[g].w = m[g].textMetrics.geometryWidth / d, m[g].d = m[g].unicode, m[g].f = m[g].fontFamily, m[g].Kk = d);
                                                              }
                                                              c.ba == X || c.ba == U || c.ba == R ? f.wa.Vh(m, f.Ja(c), f.getNumPages()) : f.wa.Vh(m, c.pageNumber, f.getNumPages());
                                                          }
                                                          f.Wh(f.lb[f.Ja(c)], c, A, f.Da);
                                                          f.Yd(c, e);
                                                          f.La(c, q, e);
                                                      } else {
                                                          f.Da || f.Wh(f.lb[f.Ja(c)], c, A, f.Da), f.Yd(c, e);
                                                      }
                                                  } else {
                                                      f.Yd(c, e), da(c.pageNumber + "  is missing its pdf page (" + f.Ja(c) + ")");
                                                  }
                                              }, function(c) {
                                                  H(c.toString(), "onDocumentLoadedError", f.ea);
                                                  f.Jd = r;
                                              });
                                          }, 50);
                                      } else {
                                          f.Ra(c, -1);
                                      }
                                      jQuery(c.pa).removeClass("flowpaper_load_on_demand");
                                  }
                              }
                          } else {
                              window.clearTimeout(c.vc);
                          }
                      }
                  }
              }
          },
          Kh: function(c) {
              var d = r,
                e = r;
              0 != c.pageNumber % 2 ? (d = c, e = c.aa.ca.ca[c.pageNumber - 1]) : (e = c, d = c.aa.ca.ca[c.pageNumber + 1]);
              if (c.ba == this.Ca(c) && !c.Ub && c.Nf && d && e && (!d.Of || !e.Of) && !this.yf) {
                  var f = e.Dc,
                    d = d.Dc;
                  f && (d && !c.Of) && e.Nf(f, d);
              }
          },
          Ja: function(c) {
              return this.Da || PDFJS.disableWorker || c == r ? this.bd : c.bd;
          },
          Ra: function(c, d) {
              if ((!this.Da || c && c.Ub && 1 == c.scale) && c) {
                  c.bd = d;
              }
              this.bd = d;
          },
          Th: function(c) {
              c.ba == P || c.ba == X ? jQuery(this.Pj(1, c)).is(":visible") ? (c.Hb = this.rb(2, c), c.Pe = this.rb(1, c)) : (c.Hb = this.rb(1, c), c.Pe = this.rb(2, c)) : c.ba == this.Ca(c) ? this.hb(c).Th(this, c) : (c.Hb = this.rb(1, c), c.Pe = r);
              this.cb && 0 < c.pageNumber && 0 == c.pageNumber % 2 ? (c.ta = document.createElement("canvas"), c.ta.width = c.ta.height = 100, c.ta.id = c.Hb + "_cropCanvas", c.Hb += "_cropCanvas") : c.ta = document.getElementById(c.Hb);
              c.$j != r && (c.$j = document.getElementById(c.Pe));
              c.ta && c.ta.getContext && (c.context = c.ta.getContext("2d"), c.context.Nn = c.context.mozImageSmoothingEnabled = c.context.imageSmoothingEnabled = y);
          },
          uj: function(c, d, e, f) {
              c = f.convertToViewportRectangle(d.rect);
              c = PDFJS.Util.normalizeRect(c);
              d = e.Kb();
              f = document.createElement("a");
              var m = e.ba == this.Ca(e) ? 1 : this.Cb;
              f.style.position = "absolute";
              f.style.left = Math.floor(c[0]) / m + d + "px";
              f.style.top = Math.floor(c[1]) / m + "px";
              f.style.width = Math.ceil(c[2] - c[0]) / m + "px";
              f.style.height = Math.ceil(c[3] - c[1]) / m + "px";
              f.style["z-index"] = 20;
              f.style.cursor = "pointer";
              f.className = "pdfPageLink_" + e.pageNumber + " flowpaper_interactiveobject_" + this.ea;
              return f;
          },
          Wh: function(c, d, e, f) {
              var m = this;
              1 != d.scale && d.ba == m.Ca(d) || (jQuery(".pdfPageLink_" + d.pageNumber).remove(), c.getAnnotations().then(function(e) {
                  for (var g = 0; g < e.length; g++) {
                      var s = e[g];
                      switch (s.subtype) {
                          case "Link":
                              var h = m.uj("a", s, d, c.getViewport(m.il), c.view);
                              h.style.position = "absolute";
                              h.href = s.url || "";
                              eb.platform.touchonlydevice || (jQuery(h).on("mouseover", function() {
                                  jQuery(this).stop(q, q);
                                  jQuery(this).css("background", d.aa.linkColor);
                                  jQuery(this).css({
                                      opacity: d.aa.Se
                                  });
                              }), jQuery(h).on("mouseout", function() {
                                  jQuery(this).css("background", "");
                                  jQuery(this).css({
                                      opacity: 0
                                  });
                              }));
                              !s.url && !f ? (s = "string" === typeof s.dest ? m.destinations[s.dest][0] : s != r && s.dest != r ? s.dest[0] : r, s = s instanceof Object ? m.Ue[s.num + " " + s.gen + " R"] : s + 1, jQuery(h).data("gotoPage", s + 1), jQuery(h).on("click", function() {
                                  d.aa.gotoPage(parseInt(jQuery(this).data("gotoPage")));
                                  return y;
                              }), jQuery(d.ya).append(h)) : h.href != r && ("" != h.href && s.url) && (jQuery(h).on("click", function() {
                                  jQuery(d.ga).trigger("onExternalLinkClicked", this.href);
                              }), jQuery(d.ya).append(h));
                      }
                  }
              }));
          },
          Yd: function(c, d) {
              this.La(c, q, d);
              jQuery("#" + c.Hb).gg();
              this.Xj(c);
              (c.ba == P || c.ba == X) && jQuery(c.hc).remove();
              c.ba == this.Ca(c) && this.hb(c).Yd(this, c, d);
              if (c.Hb && 0 < c.Hb.indexOf("cropCanvas")) {
                  var e = c.ta;
                  c.Hb = c.Hb.substr(0, c.Hb.length - 11);
                  c.ta = jQuery("#" + c.Hb).get(0);
                  c.ta.width = e.width / 2;
                  c.ta.height = e.height;
                  c.ta.getContext("2d").drawImage(e, e.width / 2, 0, c.ta.width, c.ta.height, 0, 0, e.width / 2, e.height);
                  jQuery(c.ta).gg();
              }!c.Ub && (c.Nf && !c.Of && c.ta && !this.yf) && (c.Dc = c.ta.toDataURL(), this.Kh(c));
              if (c.Dc && 1 == c.scale && !this.yf) {
                  var f = jQuery("#" + this.rb(1, c));
                  requestAnim(function() {
                      f.css("background-image").length < c.Dc.length + 5 && f.css("background-image", "url(" + c.Dc + ")");
                      f[0].width = 100;
                  });
              }
              if (c.ba == U || c.ba == R) {
                  0 == c.pageNumber && (jQuery(c.ua).removeClass("flowpaper_hidden"), jQuery(c.pa + "_1").removeClass("flowpaper_hidden")), 1 == c.pageNumber && jQuery(c.ua).removeClass("flowpaper_hidden");
              }
              c.Ua || jQuery("#" + this.ea).trigger("onPageLoaded", c.pageNumber + 1);
              c.Ua = q;
              c.Gk = y;
              c.ym = y;
              this.Ad || (this.Ad = q, c.aa.Wf());
              d != r && d();
              this.tf();
          },
          tf: function() {
              0 < this.rf.length && (-1 == this.Ja() && this.uh.Ua && !this.uh.wm) && this.rf.shift()();
          },
          Xj: function(c) {
              c.ba != U && (c.ba != R && (c.ba != this.Ca(c) || eb.browser.safari)) && jQuery("#" + c.Pe).lh();
              this.Ra(c, -1);
          },
          Pa: function(c, d) {
              this.od && (c = CryptoJS.RC4.encrypt(c.toString(), CryptoJS.enc.Hex.parse(eb.Sg ? Y() : eb.Pc.innerHTML)).toString());
              this.config.PageIndexAdjustment && (c += this.config.PageIndexAdjustment);
              if (d) {
                  if (this.pageThumbImagePattern != r && 0 < this.pageThumbImagePattern.length) {
                      return this.pageThumbImagePattern.replace("{page}", c) + (0 < this.pageThumbImagePattern.indexOf("?") ? "&" : "?") + "resolution=" + d;
                  }
              } else {
                  return this.pageSVGImagePattern ? this.pageSVGImagePattern.replace("{page}", c) : this.pageImagePattern.replace("{page}", c);
              }
          },
          unload: function(c) {
              jQuery(".flowpaper_pageword_" + this.ea + "_page_" + c.pageNumber + ":not(.flowpaper_selected_searchmatch, .flowpaper_annotation_" + this.ea + ")").remove();
              c.ba != this.Ca(c) && this.Ph(c);
              c.Ub && (jQuery(c.ta).css("background-image", "url(" + this.mb + ")"), c.Oa = r);
              c.context != r && (c.ta != r && 100 != c.ta.width) && (this.context = this.ta = c.Bk = r, c.Sb && c.Sb(), jQuery(".flowpaper_annotation_" + this.ea + "_page_" + c.pageNumber).remove());
              this.Da && (this.lb[c.pageNumber] && this.lb[c.pageNumber].cleanup(), this.Ka[c.pageNumber] = r, this.lb[c.pageNumber] = r);
              c.ng && c.ng();
          },
          $h: function(c) {
              var d = this;
              d.Ka && d.Ka.getPage(d.Te).then(function(e) {
                  e.getTextContent().then(function(e) {
                      var m = "";
                      if (e) {
                          for (var g = 0; g < e.items.length; g++) {
                              m += e.items[g].str;
                          }
                      }
                      d.bb[d.Te - 1] = m.toLowerCase();
                      d.Te + 1 < d.getNumPages() + 1 && (d.Te++, d.$h(c));
                  });
              });
          },
          dc: function(c, d, e, f) {
              this.wa.dc(c, d, e, f);
          },
          Vb: function(c, d, e) {
              this.wa.Vb(c, d, e);
          },
          $c: function(c, d, e, f) {
              this.wa.$c(c, d, e, f);
          },
          La: function(c, d, e) {
              var f = this.ka != r && this.ka[c.pageNumber] && this.ka[c.pageNumber].text && 0 < this.ka[c.pageNumber].text.length && this.Da;
              if (c.Ua || d || f) {
                  c.kg != c.scale && (jQuery(".flowpaper_pageword_" + this.ea + "_page_" + c.pageNumber).remove(), c.kg = c.scale), d = this.Nd != r ? this.Nd : e, this.Nd = r, this.wa && this.wa.La && this.wa.La(c, d);
              } else {
                  if (e != r) {
                      if (this.Nd != r) {
                          var m = this.Nd;
                          this.Nd = function() {
                              m();
                              e();
                          };
                      } else {
                          this.Nd = e;
                      }
                  }
              }
          }
      };
      return g;
  }();

function pa(g) {
    this.An = g;
    this.beginLayout = function() {
        this.textDivs = [];
        this.Cn = [];
        this.ef = [];
    };
    this.endLayout = z();
    this.Rl = z();
}
var oa = window.TextOverlay = function() {
    function g(c, d, e, f) {
        this.ea = c;
        this.JSONPageDataFormat = e;
        this.ka = [];
        this.Fa = r;
        this.Ha = [];
        this.Ea = this.ol = d;
        this.Ec = f;
        this.state = {};
        this.mb = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    }
    g.prototype = {
        Ib: function() {
            delete this.ea;
            this.ea = r;
            delete this.ka;
            this.ka = r;
            delete this.JSONPageDataFormat;
            this.JSONPageDataFormat = r;
            delete this.Fa;
            this.Fa = r;
            delete this.Ha;
            this.Ha = r;
            delete this.state;
            this.state = r;
            delete this.mb;
            this.mb = r;
            delete this.Ec;
            this.Ec = r;
        },
        saveState: function() {
            this.state[this.Ea] || (this.state[this.Ea] = [], this.state[this.Ea].ka = this.ka, this.state[this.Ea].Fa = this.Fa, this.state[this.Ea].Ha = this.Ha, window["wordPageList_" + this.ea] = r);
            this.ka = [];
            this.Fa = r;
            this.Ha = [];
            this.Ea = this.ol;
        },
        Ca: function(c) {
            return c.aa.ha ? c.aa.ha.na : "";
        },
        hb: function(c) {
            return c.aa.ha.Bn;
        },
        mj: function(c) {
            return c.aa.document.AutoDetectLinks;
        },
        Eb: function(c) {
            this.ka = c;
            this.Fa == r && (this.Fa = Array(c.length));
            window["wordPageList_" + this.ea] = this.Ha;
        },
        Vh: function(c, d, e) {
            this.Fa == r && (this.Fa = Array(e));
            this.ka[d] = [];
            this.ka[d].text = c;
            window["wordPageList_" + this.ea] = this.Ha;
        },
        dc: function(c, d, e, f) {
            var m = c.pageNumber,
              g = y,
              l = y;

            if (!this.Fa) {
                if (c.Ub && (this.Ea = q), this.state[this.Ea]) {
                    if (this.ka = this.state[this.Ea].ka, this.Fa = this.state[this.Ea].Fa, this.Ha = this.state[this.Ea].Ha, window["wordPageList_" + this.ea] = this.Ha, !this.Fa) {
                        return;
                    }
                } else {
                    return;
                }
            }

            if (!window.annotations && eb.touchdevice && !f) {
                e && e();
            } else {
                if (!window.annotations && (!c.aa.Ta && !f && !c.aa.nh) && (g = q), l = this.rc != r && this.rc[c.pageNumber] != r, c.ba != V) {
                    if (c.ba == R && (0 == c.pageNumber && (m = 0 != c.ca.la ? c.ca.la - 1 : c.ca.la), 1 == c.pageNumber && (m = c.ca.la), 0 == c.ca.getTotalPages() % 2 && m == c.ca.getTotalPages() && (m -= 1), 0 == c.ca.la % 2 && c.ca.la > c.ca.getTotalPages())) {
                        return;
                    }
                    c.ba == X && (m = c.ca.la);
                    if (c.ba == U && (0 == c.pageNumber && (m = c.ca.la), 1 == c.pageNumber && (m = c.ca.la + 1), 1 == c.pageNumber && m >= c.ca.getTotalPages() && 0 != c.ca.getTotalPages() % 2)) {
                        return;
                    }
                    d = c.jb || !d;
                    c.ba == this.Ca(c) && (isvisble = this.hb(c).Bd(this, c));
                    var s = jQuery(".flowpaper_pageword_" + this.ea + "_page_" + m + ":not(.flowpaper_annotation_" + this.ea + "):not(.flowpaper_selected_searchmatch)").length;
                    f = c.dimensions.Fb != r ? c.dimensions.Fb : c.dimensions.xa;
                    f = this.Ec ? c.$a() / f : 1;
                    if (d && 0 == s) {
                        var h = s = "",
                          A = 0;
                        if (this.Fa[m] == r || !this.Ec) {
                            if (this.ka[m] == r) {
                                return;
                            }
                            this.Fa[m] = this.ka[m][this.JSONPageDataFormat.Yc];
                        }
                        if (this.Fa[m] != r) {
                            c.Ub && (this.Ea = q);
                            var K = new WordPage(this.ea, m),
                              x = c.Kb(),
                              u = [],
                              t = c.fe(),
                              v = c.bh(),
                              F = y,
                              B = -1,
                              G = -1,
                              C = 0,
                              N = -1,
                              W = -1,
                              Q = y;
                            this.Ha[m] = K;
                            c.ba == this.Ca(c) && (f = this.hb(c).km(this, c, f));
                            c.Dn = f;

                            for (var w = 0, I; I = this.Fa[m][w++];) {
                                I = intfSanitizePageWords(I.text, I)
                                var J = w - 1,
                                  E = !this.Ea ? I[this.JSONPageDataFormat.ob] : I[5],
                                  L = w,
                                  S = w + 1,
                                  O = w < this.Fa[m].length ? this.Fa[m][w] : r,
                                  T = w + 1 < this.Fa[m].length ? this.Fa[m][w + 1] : r,
                                  F = O ? !this.Ea ? O[this.JSONPageDataFormat.ob] : O[5] : "",
                                  Q = T ? !this.Ea ? T[this.JSONPageDataFormat.ob] : T[5] : "";
                                " " == F && (L = w + 1, S = w + 2, F = (O = L < this.Fa[m].length ? this.Fa[m][L] : r) ? !this.Ea ? O[this.JSONPageDataFormat.ob] : O[5] : "", Q = (T = S < this.Fa[m].length ? this.Fa[m][S] : r) ? !this.Ea ? T[this.JSONPageDataFormat.ob] : T[5] : "");
                                O = T = r;
                                if (E == r) {
                                    da("word not found in node");
                                    e && e();
                                    return;
                                }
                                0 == E.length && (E = " ");
                                var M = r;
                                if (-1 == E.indexOf("actionGoToR") && -1 == E.indexOf("actionGoTo") && -1 == E.indexOf("actionURI") && this.mj(c)) {
                                    if (M = E.match(/\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?\u00ab\u00bb\u201c\u201d\u2018\u2019]))/ig)) {
                                        E = "actionURI(" + M[0] + "):" + M[0], this.Fa[m][J][!this.Ea ? this.JSONPageDataFormat.ob : 5] = E;
                                    }
                                    if (!M && -1 < E.indexOf("@")) {
                                        M = E.trim().match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
                                        if (!M && (M = (E.trim() + F.trim()).match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi))) {
                                            F = "actionURI(mailto:" + M[0] + "):" + M[0], this.Fa[m][L][!this.Ea ? this.JSONPageDataFormat.ob : 5] = F;
                                        }
                                        if (!M && (M = (E.trim() + F.trim() + Q.trim()).match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi))) {
                                            F = "actionURI(mailto:" + M[0] + "):" + M[0], this.Fa[m][L][!this.Ea ? this.JSONPageDataFormat.ob : 5] = F, Q = "actionURI(mailto:" + M[0] + "):" + M[0], this.Fa[m][S][!this.Ea ? this.JSONPageDataFormat.ob : 5] = Q;
                                        }
                                        M && (E = "actionURI(mailto:" + M[0] + "):" + M[0], this.Fa[m][J][!this.Ea ? this.JSONPageDataFormat.ob : 5] = E);
                                    }
                                }
                                if (0 <= E.indexOf("actionGoToR")) {
                                    T = E.substring(E.indexOf("actionGoToR") + 12, E.indexOf(",", E.indexOf("actionGoToR") + 13)), E = E.substring(E.indexOf(",") + 1);
                                } else {
                                    if (0 <= E.indexOf("actionGoTo")) {
                                        T = E.substring(E.indexOf("actionGoTo") + 11, E.indexOf(",", E.indexOf("actionGoTo") + 12)), E = E.substring(E.indexOf(",") + 1);
                                    } else {
                                        if (0 <= E.indexOf("actionURI") || M) {
                                            if (0 <= E.indexOf("actionURI(") && 0 < E.indexOf("):") ? (O = E.substring(E.indexOf("actionURI(") + 10, E.lastIndexOf("):")), E = E.substring(E.indexOf("):") + 2)) : (O = E.substring(E.indexOf("actionURI") + 10), E = E.substring(E.indexOf("actionURI") + 10)), -1 == O.indexOf("http") && -1 == O.indexOf("mailto") && 0 != O.indexOf("/")) {
                                                O = "http://" + O;
                                            } else {
                                                if (!M) {
                                                    J = w;
                                                    L = !this.Ea ? I[this.JSONPageDataFormat.ob] : I[5];
                                                    for (S = 1; 2 >= S; S++) {
                                                        for (J = w; J < this.Fa[m].length && 0 <= this.Fa[m][J].toString().indexOf("actionURI") && -1 == this.Fa[m][J].toString().indexOf("actionURI(");) {
                                                            F = this.Fa[m][J], Q = !this.Ea ? F[this.JSONPageDataFormat.ob] : F[5], 1 == S ? 0 <= Q.indexOf("actionURI") && (11 < Q.length && -1 == Q.indexOf("http://") && -1 == Q.indexOf("https://") && -1 == Q.indexOf("mailto")) && (L += Q.substring(Q.indexOf("actionURI") + 10)) : !this.Ea ? F[this.JSONPageDataFormat.ob] : F[5] = L, J++;
                                                        }
                                                        2 == S && -1 == L.indexOf("actionURI(") && (E = L, O = E.substring(E.indexOf("actionURI") + 10), E = E.substring(E.indexOf("actionURI") + 10));
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                if (T || O || !g || l) {
                                    L = (!this.Ea ? I[this.JSONPageDataFormat.zc] : I[0]) * f + 0;
                                    S = (!this.Ea ? I[this.JSONPageDataFormat.yc] : I[1]) * f + 0;
                                    J = (!this.Ea ? I[this.JSONPageDataFormat.Ac] : I[2]) * f;
                                    I = (!this.Ea ? I[this.JSONPageDataFormat.xc] : I[3]) * f;
                                    K.Tk(A, E);
                                    F = -1 != B && B != L;
                                    Q = w == this.Fa[m].length;
                                    S + J > t && (J = t - S);
                                    L + I > v && (I = v - L);
                                    u[A] = {};
                                    u[A].left = S;
                                    u[A].right = S + J;
                                    u[A].top = L;
                                    u[A].bottom = L + I;
                                    u[A].el = "#" + this.ea + "page_" + m + "_word_" + A;
                                    u[A].i = A;
                                    u[A].Gh = T;
                                    u[A].gi = O;
                                    s += "<span id='" + this.ea + "page_" + m + "_word_" + A + "' class='flowpaper_pageword flowpaper_pageword_" + this.ea + "_page_" + m + " flowpaper_pageword_" + this.ea + "' style='left:" + S + "px;top:" + L + "px;width:" + J + "px;height:" + I + "px;margin-left:0px;" + (u[A].Gh || u[A].gi ? "cursor:hand;" : "") + ";" + (eb.browser.msie ? "background-image:url(" + this.mb + ");color:transparent;" : "") + "'>" + (c.aa.nh ? E : "") + "</span>";
                                    if (T != r || O != r) {
                                        M = document.createElement("a");
                                        M.style.position = "absolute";
                                        M.style.left = Math.floor(S) + x + "px";
                                        M.style.top = Math.floor(L) + "px";
                                        M.style.width = Math.ceil(J) + "px";
                                        M.style.height = Math.ceil(I) + "px";
                                        M.style["margin-left"] = x;
                                        M.style.cursor = "pointer";
                                        M.setAttribute("data-href", O != r ? O : "");
                                        M.setAttribute("rel", "nofollow noopener");
                                        jQuery(M).css("z-index", "99");
                                        M.className = "pdfPageLink_" + c.pageNumber + " flowpaper_interactiveobject_" + this.ea + " flowpaper_pageword_" + this.ea + "_page_" + m + " gotoPage_" + T + " flowpaper_pageword_" + this.ea;
                                        eb.platform.touchonlydevice && (M.style.background = c.aa.linkColor, M.style.opacity = c.aa.Se);
                                        T != r && (jQuery(M).data("gotoPage", T), jQuery(M).on("click touchstart", function() {
                                            c.aa.gotoPage(parseInt(jQuery(this).data("gotoPage")));
                                            return y;
                                        }));
                                        if (O != r) {
                                            jQuery(M).on("click touchstart", function(e) {
                                                jQuery(c.ga).trigger("onExternalLinkClicked", this.getAttribute("data-href"));
                                                e.stopImmediatePropagation();
                                                e.preventDefault();
                                                return y;
                                            });
                                        }
                                        eb.platform.touchonlydevice || (jQuery(M).on("mouseover", function() {
                                            jQuery(this).stop(q, q);
                                            jQuery(this).css("background", c.aa.linkColor);
                                            jQuery(this).css({
                                                opacity: c.aa.Se
                                            });
                                        }), jQuery(M).on("mouseout", function() {
                                            jQuery(this).css("background", "");
                                            jQuery(this).css({
                                                opacity: 0
                                            });
                                        }));
                                        c.ba == U || c.ba == R ? (0 == c.pageNumber && jQuery(c.pa + "_1_textoverlay").append(M), 1 == c.pageNumber && jQuery(c.pa + "_2_textoverlay").append(M)) : jQuery(c.ya).append(M);
                                    }
                                    eb.platform.touchdevice && c.ba == P && (F || Q ? (Q && (C += J, h = h + "<div style='float:left;width:" + J + "px'>" + (" " == E ? "&nbsp;" : E) + "</div>"), h = "<div id='" + this.ea + "page_" + m + "_word_" + A + "_wordspan' class='flowpaper_pageword flowpaper_pageword_" + this.ea + "_page_" + m + " flowpaper_pageword_" + this.ea + "' style='color:transparent;left:" + N + "px;top:" + B + "px;width:" + C + "px;height:" + G + "px;margin-left:" + W + "px;font-size:" + G + "px" + (u[A].Gh || u[A].gi ? "cursor:hand;" : "") + "'>" + h + "</div>", jQuery(c.Uf).append(h), B = L, G = I, C = J, N = S, W = x, h = "<div style='background-colorfloat:left;width:" + J + "px'>" + (" " == E ? "&nbsp;" : E) + "</div>") : (-1 == N && (N = S), -1 == W && (W = x), -1 == B && (B = L), -1 == G && (G = I), h = h + "<div style='float:left;width:" + J + "px'>" + (" " == E ? "&nbsp;" : E) + "</div>", C += J, G = I));
                                }
                                A++;
                            }
                            K.Qk(u);
                            c.ba == P && (0 == jQuery(c.ab).length && (m = c.we, J = c.$a(), I = c.sb(), x = c.Kb(), jQuery(c.ya).append("<div id='" + m + "' class='flowpaper_textLayer' style='width:" + J + "px;height:" + I + "px;margin-left:" + x + "px;'></div>")), jQuery(c.ab).append(s));
                            c.ba == X && (0 == jQuery(c.ab).length && (m = c.we, J = c.$a(), I = c.sb(), x = c.Kb(), jQuery(c.ya).append("<div id='" + m + "' class='flowpaper_textLayer' style='width:" + J + "px;height:" + I + "px;margin-left:" + x + "px;'></div>")), jQuery(c.ab).append(s));
                            c.ba == this.Ca(c) && (0 == jQuery(c.ab).length && (m = c.Lc + "_textLayer", J = c.$a(), I = c.sb(), x = c.Kb(), jQuery(c.ya).append("<div id='" + m + "' class='flowpaper_textLayer' style='width:" + J + "px;height:" + I + "px;margin-left:" + x + "px;'></div>")), this.hb(c).Sl(this, c, s));
                            if (c.ba == U || c.ba == R) {
                                0 == c.pageNumber && jQuery(c.pa + "_1_textoverlay").append(s), 1 == c.pageNumber && jQuery(c.pa + "_2_textoverlay").append(s);
                            }
                            d && jQuery(c).trigger("onAddedTextOverlay", c.pageNumber);
                            if (l) {
                                for (l = 0; l < this.rc[c.pageNumber].length; l++) {
                                    this.Yi(c, this.rc[c.pageNumber][l].$k, this.rc[c.pageNumber][l].dl);
                                }
                            }
                        }
                    }
                    e != r && e();
                }
            }
        },
        Vb: function(c, d, e) {
            var f = this;
            window.annotations || jQuery(c).unbind("onAddedTextOverlay");
            var g = c.ba == U || c.ba == R ? c.ca.la + c.pageNumber : c.pageNumber;
            c.ba == R && (0 < c.ca.la && 1 == c.pageNumber) && (g -= 2);
            c.ba == X && (g = c.ca.la);
            if ((c.jb || !e) && c.aa.Va - 1 == g) {
                if (jQuery(".flowpaper_selected").removeClass("flowpaper_selected"), jQuery(".flowpaper_selected_searchmatch").removeClass("flowpaper_selected_searchmatch"), jQuery(".flowpaper_selected_default").removeClass("flowpaper_selected_default"), jQuery(".flowpaper_tmpselection").remove(), !f.Ha[g] || f.Ha[g] != r && 0 == f.Ha[g].words.length) {
                    jQuery(c).bind("onAddedTextOverlay", function() {
                        f.Vb(c, d, e);
                    }), f.dc(c, e, r, q);
                } else {
                    for (var n = f.Ha[g].words, l = "", s = 0, h = 0, A = -1, K = -1, x = d.split(" "), u = 0; u < n.length; u++) {
                        var t = (n[u] + "").toLowerCase();
                        if (jQuery.trim(t) == d || jQuery.trim(l + t) == d) {
                            t = jQuery.trim(t);
                        }
                        if (0 == d.indexOf(l + t) && (l + t).length <= d.length && " " != l + t) {
                            if (l += t, -1 == A && (A = s, K = s + 1), d.length == t.length && (A = s), l.length == d.length) {
                                if (h++, c.aa.Xc == h) {
                                    if (c.ba == P || c.ba == X) {
                                        eb.browser.fb.kb ? jQuery("#pagesContainer_" + f.ea).scrollTo(jQuery(f.Ha[g].Ba[A].el), 0, {
                                            axis: "xy",
                                            offset: -30
                                        }) : jQuery("#pagesContainer_" + f.ea).data("jsp").scrollToElement(jQuery(f.Ha[g].Ba[A].el), y);
                                    }
                                    for (var v = A; v < s + 1; v++) {
                                        c.ba == f.Ca(c) ? (t = jQuery(f.Ha[g].Ba[v].el).clone(), f.hb(c).kj(f, c, t, d)) : (jQuery(f.Ha[g].Ba[v].el).addClass("flowpaper_selected"), jQuery(f.Ha[g].Ba[v].el).addClass("flowpaper_selected_default"), jQuery(f.Ha[g].Ba[v].el).addClass("flowpaper_selected_searchmatch"));
                                    }
                                } else {
                                    l = "", A = -1;
                                }
                            }
                        } else {
                            if (0 <= (l + t).indexOf(x[0])) {
                                -1 == A && (A = s, K = s + 1);
                                l += t;
                                if (1 < x.length) {
                                    for (t = 0; t < x.length - 1; t++) {
                                        0 < x[t].length && n.length > s + 1 + t && 0 <= (l + n[s + 1 + t]).toLowerCase().indexOf(x[t]) ? (l += n[s + 1 + t].toLowerCase(), K = s + 1 + t + 1) : (l = "", K = A = -1);
                                    }
                                } - 1 == l.indexOf(d) ? (l = "", K = A = -1) : h++;
                                if (c.aa.Xc == h && 0 < l.length) {
                                    for (var v = jQuery(f.Ha[g].Ba[A].el), F = parseFloat(v.css("left").substring(0, v.css("left").length - 2)) - (c.ba == f.Ca(c) ? c.Kb() : 0), t = v.clone(), B = 0, G = 0, C = 0; A < K; A++) {
                                        B += parseFloat(jQuery(f.Ha[g].Ba[A].el).css("width").substring(0, v.css("width").length - 2));
                                    }
                                    G = 1 - (l.length - d.length) / l.length;
                                    C = l.indexOf(d) / l.length;
                                    t.addClass("flowpaper_tmpselection");
                                    t.attr("id", t.attr("id") + "tmp");
                                    t.addClass("flowpaper_selected");
                                    t.addClass("flowpaper_selected_searchmatch");
                                    t.addClass("flowpaper_selected_default");
                                    t.css("width", B * G + "px");
                                    t.css("left", F + B * C + "px");
                                    if (c.ba == P || c.ba == X) {
                                        jQuery(c.ab).append(t), eb.browser.fb.kb ? jQuery("#pagesContainer_" + f.ea).scrollTo(t, 0, {
                                            axis: "xy",
                                            offset: -30
                                        }) : jQuery("#pagesContainer_" + f.ea).data("jsp").scrollToElement(t, y);
                                    }
                                    c.ba == f.Ca(c) && f.hb(c).kj(f, c, t, d);
                                    c.ba == R && (0 == g ? jQuery("#dummyPage_0_" + f.ea + "_1_textoverlay").append(t) : jQuery("#dummyPage_" + (g - 1) % 2 + "_" + f.ea + "_" + ((g - 1) % 2 + 1) + "_textoverlay").append(t));
                                    c.ba == U && jQuery("#dummyPage_" + g % 2 + "_" + f.ea + "_" + (g % 2 + 1) + "_textoverlay").append(t);
                                } else {
                                    l = "";
                                }
                                K = A = -1;
                            } else {
                                0 < l.length && (l = "", A = -1);
                            }
                        }
                        s++;
                    }
                }
            }
        },
        $c: function(c, d, e) {
            this.rc == r && (this.rc = Array(this.Fa.length));
            this.rc[c.pageNumber] == r && (this.rc[c.pageNumber] = []);
            var f = {};
            f.$k = d;
            f.dl = e;
            this.rc[c.pageNumber][this.rc[c.pageNumber].length] = f;
        },
        Yi: function(c, d, e) {
            jQuery(c).unbind("onAddedTextOverlay");
            var f = c.ba == U || c.ba == R ? c.ca.la + c.pageNumber : c.pageNumber;
            c.ba == R && (0 < c.ca.la && 1 == c.pageNumber) && (f -= 2);
            c.ba == X && (f = c.ca.la);
            for (var g = this.Ha[f].words, n = -1, l = -1, s = 0, h = 0; h < g.length; h++) {
                var A = g[h] + "";
                s >= d && -1 == n && (n = h);
                if (s + A.length >= d + e && -1 == l && (l = h, -1 != n)) {
                    break;
                }
                s += A.length;
            }
            for (e = n; e < l + 1; e++) {
                c.ba == this.Ca(c) ? (d = jQuery(this.Ha[f].Ba[e].el).clone(), this.hb(c).Pl(this, c, d)) : (jQuery(this.Ha[f].Ba[e].el).addClass("flowpaper_selected"), jQuery(this.Ha[f].Ba[e].el).addClass("flowpaper_selected_yellow"), jQuery(this.Ha[f].Ba[e].el).addClass("flowpaper_selected_searchmatch"));
            }
        },
        La: function(c, d) {
            this.dc(c, d == r, d);
        }
    };
    return g;
}();
window.WordPage = function(g, c) {
    this.ea = g;
    this.pageNumber = c;
    this.words = [];
    this.Ba = r;
    this.rl = "";
    this.nm = function() {
        return this.words;
    };
    this.lm = function() {
        return this.pageNumber;
    };
    this.Tk = function(c, e) {
        this.words[c] = e;
    };
    this.tn = function(c) {
        this.rl = c;
    };
    this.Qk = function(c) {
        this.Ba = c;
    };
    this.mm = function() {
        return this.Ba;
    };
    this.match = function(c, e) {
        var f, g = r;
        f = "#page_" + this.pageNumber + "_" + this.ea;
        0 == jQuery(f).length && (f = "#dummyPage_" + this.pageNumber + "_" + this.ea);
        f = jQuery(f).offset();
        window.$FlowPaper(this.ea).ba == X && (f = "#dummyPage_0_" + this.ea, f = jQuery(f).offset());
        if (window.$FlowPaper(this.ea).ba == U || window.$FlowPaper(this.ea).ba == R) {
            f = 0 == this.pageNumber || window.$FlowPaper(this.ea).ba == U ? jQuery("#dummyPage_" + this.pageNumber % 2 + "_" + this.ea + "_" + (this.pageNumber % 2 + 1) + "_textoverlay").offset() : jQuery("#dummyPage_" + (this.pageNumber - 1) % 2 + "_" + this.ea + "_" + ((this.pageNumber - 1) % 2 + 1) + "_textoverlay").offset();
        }
        c.top -= f.top;
        c.left -= f.left;
        for (f = 0; f < this.Ba.length; f++) {
            if (this.Zj(c, this.Ba[f], e) && (g == r || g != r && g.top < this.Ba[f].top || g != r && g.top <= this.Ba[f].top && g != r && g.left < this.Ba[f].left)) {
                g = this.Ba[f], g.pageNumber = this.pageNumber;
            }
        }
        return g;
    };
    this.yh = function(c) {
        for (var e = 0; e < this.Ba.length; e++) {
            if (this.Ba[e] && this.Ba[e].el == "#" + c) {
                return this.Ba[e];
            }
        }
        return r;
    };
    this.Zj = function(c, e, f) {
        return !e ? y : f ? c.left + 3 >= e.left && c.left - 3 <= e.right && c.top + 3 >= e.top && c.top - 3 <= e.bottom : c.left + 3 >= e.left && c.top + 3 >= e.top;
    };
    this.rd = function(c, e) {
        var f = window.a,
          g = window.b,
          n = new qa,
          l, s, h = 0,
          A = -1;
        if (r == f) {
            return n;
        }
        if (f && g) {
            var K = [],
              x;
            f.top > g.top ? (l = g, s = f) : (l = f, s = g);
            for (l = l.i; l <= s.i; l++) {
                if (this.Ba[l]) {
                    var u = jQuery(this.Ba[l].el);
                    0 != u.length && (x = parseInt(u.attr("id").substring(u.attr("id").indexOf("word_") + 5)), A = parseInt(u.attr("id").substring(u.attr("id").indexOf("page_") + 5, u.attr("id").indexOf("word_") - 1)) + 1, 0 <= x && K.push(this.words[x]), h++, c && (u.addClass("flowpaper_selected"), u.addClass(e), "flowpaper_selected_strikeout" == e && !u.data("adjusted") && (x = u.height(), u.css("margin-top", x / 2 - x / 3 / 1.5), u.height(x / 2.3), u.data("adjusted", q))));
                }
            }
            eb.platform.touchonlydevice || jQuery(".flowpaper_selector").val(K.join("")).select();
        } else {
            eb.platform.touchdevice || jQuery("#selector").val("");
        }
        n.Yj = h;
        n.sl = f.left;
        n.Tn = f.right;
        n.tl = f.top;
        n.Sn = f.bottom;
        n.Pn = f.left;
        n.Qn = f.right;
        n.Rn = f.top;
        n.On = f.bottom;
        n.Gj = K != r && 0 < K.length ? K[0] : r;
        n.Cm = K != r && 0 < K.length ? K[K.length - 1] : n.Gj;
        n.Le = f != r ? f.i : -1;
        n.vh = g != r ? g.i : n.Le;
        n.text = K != r ? K.join("") : "";
        n.page = A;
        n.ji = this;
        return n;
    };
};

function qa() {}

function ra(g, c) {
    var d = window["wordPageList_" + g];
    if (d) {
        return d.length >= c ? d[c] : r;
    }
}
var ta = function() {
      function g(c, d, e, f) {
          this.aa = d;
          this.ga = c;
          this.ca = {};
          this.selectors = {};
          this.container = "pagesContainer_" + e;
          this.ma = "#" + this.container;
          this.la = f == r ? 0 : f - 1;
          this.Md = f;
          this.Ve = this.Ld = r;
          this.oc = this.nc = -1;
          this.Jm = this.Im = 0;
          this.initialized = y;
          this.ea = this.aa.ea;
          this.document = this.aa.document;
      }
      g.prototype = {
          ia: function(c) {
              if (0 < c.indexOf("undefined")) {
                  return jQuery(r);
              }
              this.selectors || (this.selectors = {});
              this.selectors[c] || (this.selectors[c] = jQuery(c));
              return this.selectors[c];
          },
          Ch: function() {
              this.Yg != r && (window.clearTimeout(this.Yg), this.Yg = r);
              this.aa.ha && this.aa.ba == this.aa.ha.na && this.aa.ha.zb.Ch(this);
          },
          Bc: function() {
              return this.aa.ha && this.aa.ba == this.aa.ha.na && this.aa.ha.zb.Bc(this) || this.aa.ba == X;
          },
          Ek: function() {
              return !(this.aa.ha && this.aa.ha.zb.Bc(this));
          },
          ub: function(c, d, e) {
              var f = this.aa.scale;
              this.aa.scale = c;
              if (this.aa.ba == U || this.aa.ba == R) {
                  var g = 100 * c + "%";
                  eb.platform.touchdevice || this.ia(this.ma).css({
                      width: g,
                      "margin-left": this.yd()
                  });
              }
              this.ca[0] && (this.ca[0].scale = c);
              for (g = 0; g < this.document.numPages; g++) {
                  this.vb(g) && (this.ca[g].scale = c, this.ca[g].ub());
              }
              this.aa.ha && this.aa.ba == this.aa.ha.na && this.aa.ha.zb.ub(this, f, c, d, e);
          },
          Ib: function() {
              for (var c = 0; c < this.document.numPages; c++) {
                  this.ca[c].Ib(), delete this.ca[c];
              }
              this.selectors = this.ca = this.ga = this.aa = r;
          },
          resize: function(c, d, e) {
              if (this.aa.ba == P || this.aa.ba == X) {
                  d += eb.browser.fb.kb ? 0 : 14, c -= eb.browser.msie ? 0 : 2;
              }
              this.aa.ba == V && (d -= 10);
              this.ia(this.ma).css({
                  width: c,
                  height: d
              });
              this.aa.ba == U && (this.aa.mg = this.ga.height() - (!eb.platform.touchdevice ? 27 : 0), this.aa.Ee = c / 2 - 2, this.ia(this.ma).height(this.aa.mg), this.ia("#" + this.container + "_2").css("left", this.ia("#" + this.container).width() / 2), eb.platform.touchdevice || (this.ia(this.ma + "_1").width(this.aa.Ee), this.ia(this.ma + "_2").width(this.aa.Ee)));
              if (this.aa.ha && this.aa.ba == this.aa.ha.na) {
                  this.aa.ha.zb.resize(this, c, d, e);
              } else {
                  this.ye();
                  for (c = 0; c < this.document.numPages; c++) {
                      this.vb(c) && this.ca[c].ub();
                  }
              }
              this.og = r;
              this.jScrollPane != r && (this.jScrollPane.data("jsp").reinitialise(this.fc), this.jScrollPane.data("jsp").scrollTo(this.nc, this.oc, y));
          },
          Ne: function(c) {
              var d = this;
              if (!d.za) {
                  var e = y;
                  "function" === typeof d.ke && d.Sb();
                  jQuery(".flowpaper_pageword").each(function() {
                      jQuery(this).hasClass("flowpaper_selected_default") && (e = q);
                  });
                  d.touchwipe != r && (d.touchwipe.config.preventDefaultEvents = y);
                  d.Bc() || (jQuery(".flowpaper_pageword_" + d.ea).remove(), setTimeout(function() {
                      (d.aa.ba == U || d.aa.ba == R) && d.Nc();
                      d.La();
                      e && d.getPage(d.aa.Va - 1).Vb(d.aa.Mc, y);
                  }, 500));
                  d.aa.ha && d.aa.ba == d.aa.ha.na ? d.aa.ha.zb.Ne(d, c) : d.ub(1);
                  d.jScrollPane != r ? (d.jScrollPane.data("jsp").reinitialise(d.fc), d.jScrollPane.data("jsp").scrollTo(d.nc, d.oc, y)) : (d.aa.ba == U || d.aa.ba == R) && d.ia(d.ma).parent().scrollTo({
                      left: d.nc + "px",
                      top: d.oc + "px"
                  }, 0, {
                      axis: "xy"
                  });
              }
          },
          zd: function(c) {
              var d = this;
              if (!d.za) {
                  var e = y;
                  d.touchwipe != r && (d.touchwipe.config.preventDefaultEvents = q);
                  "function" === typeof d.ke && d.Sb();
                  jQuery(".flowpaper_pageword").each(function() {
                      jQuery(this).hasClass("flowpaper_selected_default") && (e = q);
                  });
                  d.Bc() || jQuery(".flowpaper_pageword_" + d.ea).remove();
                  d.aa.ha && d.aa.ba == d.aa.ha.na ? d.aa.ha.zb.zd(d, c) : d.ub(window.FitHeightScale);
                  setTimeout(function() {
                      d.La();
                      e && d.getPage(d.aa.Va - 1).Vb(d.aa.Mc, y);
                  }, 500);
                  d.La();
                  d.jScrollPane != r ? (d.jScrollPane.data("jsp").scrollTo(0, 0, y), d.jScrollPane.data("jsp").reinitialise(d.fc)) : d.ia(d.ma).parent().scrollTo({
                      left: 0,
                      top: 0
                  }, 0, {
                      axis: "xy"
                  });
              }
          },
          Ah: function() {
              var c = this;
              c.Sd();
              if (c.aa.ha && c.aa.ba == c.aa.ha.na) {
                  c.aa.ha.zb.Ah(c);
              } else {
                  if (c.aa.ba == X || c.aa.ba == U || c.aa.ba == R) {
                      c.touchwipe = c.ia(c.ma).touchwipe({
                          wipeLeft: function() {
                              if (!c.aa.tb && !window.Mb && c.za == r && ((c.aa.ba == U || c.aa.ba == R) && 1 != c.aa.scale && c.next(), c.aa.ba == X)) {
                                  var d = jQuery(c.ma).width() - 5,
                                    e = 1 < c.aa.getTotalPages() ? c.aa.ra - 1 : 0;
                                  0 > e && (e = 0);
                                  var f = c.getPage(e).dimensions.xa / c.getPage(e).dimensions.Ga,
                                    d = Math.round(100 * (d / (c.getPage(e).Na * f) - 0.03));
                                  100 * c.aa.scale < 1.2 * d && c.next();
                              }
                          },
                          wipeRight: function() {
                              if (!c.aa.tb && !window.Mb && c.za == r && ((c.aa.ba == U || c.aa.ba == R) && 1 != c.aa.scale && c.previous(), c.aa.ba == X)) {
                                  var d = jQuery(c.ma).width() - 15,
                                    e = 1 < c.aa.getTotalPages() ? c.aa.ra - 1 : 0;
                                  0 > e && (e = 0);
                                  var f = c.getPage(e).dimensions.xa / c.getPage(e).dimensions.Ga,
                                    d = Math.round(100 * (d / (c.getPage(e).Na * f) - 0.03));
                                  100 * c.aa.scale < 1.2 * d && c.previous();
                              }
                          },
                          preventDefaultEvents: c.aa.ba == U || c.aa.ba == R || c.aa.ba == X,
                          min_move_x: eb.platform.tc ? 150 : 200,
                          min_move_y: 500
                      });
                  }
              }
              if (eb.platform.mobilepreview) {
                  c.ia(c.ma).on("mousedown", function(d) {
                      c.nc = d.pageX;
                      c.oc = d.pageY;
                  });
              }
              c.ia(c.ma).on("touchstart", function(d) {
                  c.nc = d.originalEvent.touches[0].pageX;
                  c.oc = d.originalEvent.touches[0].pageY;
              });
              c.ia(c.ma).on(!eb.platform.mobilepreview ? "touchend" : "mouseup", function() {
                  c.aa.ca.jScrollPane != r && c.aa.ca.jScrollPane.data("jsp").enable && c.aa.ca.jScrollPane.data("jsp").enable();
                  if (c.uc != r && c.aa.ba == X) {
                      for (var d = 0; d < c.document.numPages; d++) {
                          c.vb(d) && c.ia(c.ca[d].ua).transition({
                              y: 0,
                              scale: 1
                          }, 0, "ease", function() {
                              c.za > c.aa.scale && c.za - c.aa.scale < c.aa.document.ZoomInterval && (c.za += c.aa.document.ZoomInterval);
                              0 < c.cc - c.Qc && c.za < c.aa.scale && (c.za = c.aa.scale + c.aa.document.ZoomInterval);
                              c.aa.gb(c.za, {
                                  Wd: q
                              });
                              c.za = r;
                          });
                      }
                      c.ca[0] && c.ca[0].Sd();
                      c.ia(c.ma).addClass("flowpaper_pages_border");
                      c.Um = c.uc < c.za;
                      c.uc = r;
                      c.Hh = r;
                      c.za = r;
                      c.Am = r;
                      c.Bm = r;
                  }
              });
              c.aa.ha && c.aa.ba == c.aa.ha.na || eb.platform.touchdevice && c.ia(c.ma).doubletap(function(d) {
                  if (c.aa.ba == U || c.aa.ba == R) {
                      (c.aa.ba == U || c.aa.ba == R) && 1 != c.aa.scale ? c.Ne() : (c.aa.ba == U || c.aa.ba == R) && 1 == c.aa.scale && c.zd(), d.preventDefault();
                  }
              }, r, 300);
              c.ia(c.ma).on("scroll gesturechange", function() {
                  c.aa.ba == X ? c.aa.renderer.md && !c.za && c.aa.renderer.Zf(c.ca[0]) : c.aa.ha && c.aa.ba == c.aa.ha.na || (eb.platform.ios && c.ag(-1 * c.ia(c.ma).scrollTop()), eb.platform.ios ? (setTimeout(function() {
                      c.Fe();
                      c.Fd();
                  }, 1000), setTimeout(function() {
                      c.Fe();
                      c.Fd();
                  }, 2000), setTimeout(function() {
                      c.Fe();
                      c.Fd();
                  }, 3000)) : c.Fe(), c.Fd(), c.La(), c.Ld != r && (window.clearTimeout(c.Ld), c.Ld = r), c.Ld = setTimeout(function() {
                      c.kh();
                      window.clearTimeout(c.Ld);
                      c.Ld = r;
                  }, 100), c.Rm = q);
              });
              this.kh();
          },
          ag: function(c) {
              for (var d = 0; d < this.document.numPages; d++) {
                  this.vb(d) && this.ca[d].ag(c);
              }
          },
          Sd: function() {
              this.aa.ha && this.aa.ha.zb.Sd(this);
          },
          getTotalPages: function() {
              return this.document.numPages;
          },
          Mg: function(c) {
              var d = this;
              c.empty();
              jQuery(d.aa.renderer).on("onTextDataUpdated", function() {
                  d.La(d);
              });
              d.aa.Ve == r && (!d.aa.document.DisableOverflow && !d.aa.hm) && (d.aa.Ve = d.ga.height(), eb.platform.touchonlydevice ? d.aa.nf || d.ga.height(d.aa.Ve - 10) : d.ga.height(d.aa.Ve - 27));
              var e = d.aa.ha && d.aa.ha.backgroundColor ? "background-color:" + d.aa.ha.backgroundColor + ";" : "";
              d.aa.ha && d.aa.ha.backgroundImage && (e = "background-color:transparent;");
              if (d.aa.ba == P || d.aa.ba == X) {
                  eb.platform.touchonlydevice && d.aa.ba == X && (eb.browser.fb.kb = y);
                  var f = jQuery(d.aa.da).height() + (window.zine && "Portrait" == d.aa.Bb ? 20 : 0),
                    g = !eb.platform.touchonlydevice ? 26 : 31;
                  window.zine && "Portrait" != d.aa.Bb && (g = !eb.platform.touchonlydevice ? 36 : 41);
                  var f = d.ga.height() + (eb.browser.fb.kb ? window.annotations ? 0 : g - f : -5),
                    g = d.ga.width() - 2,
                    n = 1 < d.Md ? "visibility:hidden;" : "",
                    l = eb.browser.msie && 9 > eb.browser.version ? "position:relative;" : "";
                  d.aa.document.DisableOverflow ? c.append("<div id='" + d.container + "' class='flowpaper_pages' style='overflow:hidden;padding:0;margin:0;'></div>") : c.append("<div id='" + d.container + "' class='flowpaper_pages " + (!window.annotations ? "flowpaper_pages_border" : "") + "' style='" + (eb.platform.hi ? "touch-action: none;" : "") + "-moz-user-select:none;-webkit-user-select:none;" + l + ";" + n + "height:" + f + "px;width:" + g + "px;overflow-y: auto;overflow-x: auto;;-webkit-overflow-scrolling: touch;-webkit-backface-visibility: hidden;-webkit-perspective: 1000;" + e + ";'></div>");
                  d.aa.document.DisableOverflow || (eb.browser.fb.kb ? eb.platform.touchonlydevice ? (jQuery(c).css("overflow-y", "auto"), jQuery(c).css("overflow-x", "auto"), jQuery(c).css("-webkit-overflow-scrolling", "touch")) : (jQuery(c).css("overflow-y", "visible"), jQuery(c).css("overflow-x", "visible"), jQuery(c).css("-webkit-overflow-scrolling", "visible")) : jQuery(c).css("-webkit-overflow-scrolling", "hidden"));
                  if (eb.platform.touchdevice && (eb.platform.ipad || eb.platform.iphone || eb.platform.android || eb.platform.hi)) {
                      jQuery(d.ma).on("touchmove", function(c) {
                          if (!eb.platform.ios && 2 == c.originalEvent.touches.length && (d.aa.ca.jScrollPane && d.aa.ca.jScrollPane.data("jsp").disable(), d.cd != q)) {
                              c.preventDefault && c.preventDefault();
                              c.returnValue = y;
                              c = Math.sqrt((c.originalEvent.touches[0].pageX - c.originalEvent.touches[1].pageX) * (c.originalEvent.touches[0].pageX - c.originalEvent.touches[1].pageX) + (c.originalEvent.touches[0].pageY - c.originalEvent.touches[1].pageY) * (c.originalEvent.touches[0].pageY - c.originalEvent.touches[1].pageY));
                              c *= 2;
                              d.za == r && (d.ia(d.ma).removeClass("flowpaper_pages_border"), d.uc = 1, d.Hh = c);
                              d.za == r && (d.uc = 1, d.Qc = 1 + (jQuery(d.ca[0].ua).width() - d.ga.width()) / d.ga.width());
                              var e = c = (d.uc + (c - d.Hh) / jQuery(d.ma).width() - d.uc) / d.uc;
                              d.Bc() || (1 < e && (e = 1), -0.3 > e && (e = -0.3), 0 < c && (c *= 0.7));
                              d.cc = d.Qc + d.Qc * c;
                              d.cc < d.aa.document.MinZoomSize && (d.cc = d.aa.document.MinZoomSize);
                              d.cc > d.aa.document.MaxZoomSize && (d.cc = d.aa.document.MaxZoomSize);
                              d.Tb = 1 + (d.cc - d.Qc);
                              d.za = d.ca[0].eh(jQuery(d.ca[0].ua).width() * d.Tb);
                              d.za < d.aa.document.MinZoomSize && (d.za = d.aa.document.MinZoomSize);
                              d.za > d.aa.document.MaxZoomSize && (d.za = d.aa.document.MaxZoomSize);
                              jQuery(d.ca[0].ua).width() > jQuery(d.ca[0].ua).height() ? d.za < d.aa.Me() && (d.Tb = d.ve, d.za = d.aa.Me()) : d.za < d.aa.dd() && (d.Tb = d.ve, d.za = d.aa.dd());
                              d.ve = d.Tb;
                              if (d.Bc() && 0 < d.Tb) {
                                  jQuery(".flowpaper_annotation_" + d.ea).hide();
                                  for (c = 0; c < d.document.numPages; c++) {
                                      d.vb(c) && jQuery(d.ca[c].ua).transition({
                                          transformOrigin: "50% 50%",
                                          scale: d.Tb
                                      }, 0, "ease", z());
                                  }
                              }
                          }
                      }), jQuery(d.ma).on("touchstart", z()), jQuery(d.ma).on("gesturechange", function(c) {
                          if (d.cl != q && d.cd != q) {
                              d.aa.renderer.md && jQuery(".flowpaper_flipview_canvas_highres").hide();
                              d.za == r && (d.uc = 1, d.Qc = 1 + (jQuery(d.ca[0].ua).width() - d.ga.width()) / d.ga.width());
                              var e, f = e = (c.originalEvent.scale - d.uc) / d.uc;
                              d.Bc() || (1 < f && (f = 1), -0.3 > f && (f = -0.3), 0 < e && (e *= 0.7));
                              d.cc = d.Qc + d.Qc * e;
                              d.cc < d.aa.document.MinZoomSize && (d.cc = d.aa.document.MinZoomSize);
                              d.cc > d.aa.document.MaxZoomSize && (d.cc = d.aa.document.MaxZoomSize);
                              d.Tb = 1 + (d.cc - d.Qc);
                              d.za = d.ca[0].eh(jQuery(d.ca[0].ua).width() * d.Tb);
                              jQuery(d.ca[0].ua).width() > jQuery(d.ca[0].ua).height() ? d.za < d.aa.Me() && (d.Tb = d.ve, d.za = d.aa.Me()) : d.za < d.aa.dd() && (d.Tb = d.ve, d.za = d.aa.dd());
                              d.za < d.aa.document.MinZoomSize && (d.za = d.aa.document.MinZoomSize);
                              d.za > d.aa.document.MaxZoomSize && (d.za = d.aa.document.MaxZoomSize);
                              c.preventDefault && c.preventDefault();
                              d.ve = d.Tb;
                              if (d.Bc() && 0 < d.Tb) {
                                  jQuery(".flowpaper_annotation_" + d.ea).hide();
                                  for (c = 0; c < d.document.numPages; c++) {
                                      d.vb(c) && jQuery(d.ca[c].ua).transition({
                                          transformOrigin: "50% 50%",
                                          scale: d.Tb
                                      }, 0, "ease", z());
                                  }
                              }
                              if (!d.Bc() && (0.7 <= f || -0.3 >= f)) {
                                  d.cl = q, d.za > d.aa.scale && d.za - d.aa.scale < d.aa.document.ZoomInterval && (d.za += d.aa.document.ZoomInterval), d.aa.gb(d.za), d.za = r;
                              }
                          }
                      }), jQuery(d.ma).on("gestureend", z());
                  }
                  d.aa.renderer.mc && jQuery(d.aa.renderer).bind("onTextDataUpdated", function(c, e) {
                      for (var f = e + 12, g = e - 2; g < f; g++) {
                          var m = d.getPage(g);
                          if (m) {
                              var l = jQuery(m.ua).get(0);
                              if (l) {
                                  var n = m.$a(),
                                    v = m.sb(),
                                    F = 1.5 < d.aa.renderer.Cb ? d.aa.renderer.Cb : 1.5;
                                  l.width != n * F && (jQuery(l).data("needs-overlay", 1), d.aa.document.DisableOverflow && (F = 2), l.width = n * F, l.height = v * F, m.Mh(l).then(function(c) {
                                      if (d.aa.document.DisableOverflow) {
                                          var e = jQuery(c).css("background-image");
                                          0 < e.length && "none" != e ? (jQuery(c).css("background-image", "url('" + c.toDataURL() + "')," + e), e = jQuery(c).attr("id").substr(5, jQuery(c).attr("id").lastIndexOf("_") - 5), jQuery("#" + d.ea).trigger("onPageLoaded", parseInt(e) + 1), fa(c)) : jQuery(c).css("background-image", "url('" + c.toDataURL() + "')");
                                      }
                                  }));
                              }
                          }
                      }
                  });
              }
              if (d.aa.ba == U || d.aa.ba == R) {
                  f = d.ga.height() - (eb.browser.msie ? 37 : 0), g = d.ga.width() - (eb.browser.msie ? 0 : 20), e = 0, 1 == d.aa.ra && d.aa.ba == R && (e = g / 3, g -= e), eb.platform.touchdevice ? eb.browser.fb.kb ? (c.append("<div id='" + d.container + "' style='-moz-user-select:none;-webkit-user-select:none;margin-left:" + e + "px;position:relative;width:100%;' class='flowpaper_twopage_container'><div id='" + d.container + "_1' class='flowpaper_pages' style='position:absolute;top:0px;height:99%;margin-top:20px;'></div><div id='" + d.container + "_2' class='flowpaper_pages' style='position:absolute;top:0px;height:99%;margin-top:20px;'></div></div>"), jQuery(c).css("overflow-y", "scroll"), jQuery(c).css("overflow-x", "scroll"), jQuery(c).css("-webkit-overflow-scrolling", "touch")) : (c.append("<div id='" + d.container + "_jpane' style='-moz-user-select:none;-webkit-user-select:none;height:" + f + "px;width:100%;" + (window.eb.browser.msie || eb.platform.android ? "overflow-y: scroll;overflow-x: scroll;" : "overflow-y: auto;overflow-x: auto;") + ";-webkit-overflow-scrolling: touch;'><div id='" + d.container + "' style='margin-left:" + e + "px;position:relative;height:100%;width:100%' class='flowpaper_twopage_container'><div id='" + d.container + "_1' class='flowpaper_pages' style='position:absolute;top:0px;height:99%;margin-top:20px;'></div><div id='" + d.container + "_2' class='flowpaper_pages' style='position:absolute;top:0px;height:99%;margin-top:20px;'></div></div></div>"), jQuery(c).css("overflow-y", "visible"), jQuery(c).css("overflow-x", "visible"), jQuery(c).css("-webkit-overflow-scrolling", "visible")) : (c.append("<div id='" + d.container + "' style='-moz-user-select:none;-webkit-user-select:none;margin-left:" + e + "px;position:relative;' class='flowpaper_twopage_container'><div id='" + d.container + "_1' class='flowpaper_pages' style='position:absolute;top:0px;height:99%;margin-top:" + (!eb.browser.msie ? 20 : 10) + "px;'></div><div id='" + d.container + "_2' class='flowpaper_pages " + (d.aa.ba == R && 2 > d.Md ? "flowpaper_hidden" : "") + "' style='position:absolute;top:0px;height:99%;margin-top:" + (!eb.browser.msie ? 20 : 10) + "px;'></div></div>"), jQuery(c).css("overflow-y", "auto"), jQuery(c).css("overflow-x", "auto"), jQuery(c).css("-webkit-overflow-scrolling", "touch")), d.aa.mg == r && (d.aa.mg = d.ga.height() - (!eb.platform.touchdevice ? 27 : 0), d.aa.Ee = d.ia(d.ma).width() / 2 - 2), d.ia(d.ma).css({
                      height: "90%"
                  }), d.ia("#" + this.container + "_2").css("left", d.ia("#" + d.container).width() / 2), eb.platform.touchdevice || (d.ia(d.ma + "_1").width(d.aa.Ee), d.ia(d.ma + "_2").width(d.aa.Ee));
              }
              d.aa.ba == V && (jQuery(c).css("overflow-y", "visible"), jQuery(c).css("overflow-x", "visible"), jQuery(c).css("-webkit-overflow-scrolling", "visible"), l = eb.browser.msie && 9 > eb.browser.version ? "position:relative;" : "", c.append("<div id='" + this.container + "' class='flowpaper_pages' style='" + l + ";" + (eb.platform.touchdevice ? "padding-left:10px;" : "") + (eb.browser.msie ? "overflow-y: scroll;overflow-x: hidden;" : "overflow-y: auto;overflow-x: hidden;-webkit-overflow-scrolling: touch;") + "'></div>"), jQuery(".flowpaper_pages").height(d.ga.height() - 0));
              d.aa.ha && d.aa.ha.zb.Mg(d, c);
              d.ga.trigger("onPagesContainerCreated");
              jQuery(d).bind("onScaleChanged", d.Ch);
          },
          $d: function(c) {
              return this.getPage(c).$d();
          },
          be: function(c) {
              return this.getPage(c).be();
          },
          lc: function(c) {
              return this.getPage(c).scale;
          },
          ed: function(c) {
              return this.getPage(c).$a();
          },
          ce: function(c) {
              return this.getPage(c).sb();
          },
          create: function(c) {
              var d = this;
              d.Mg(c);
              if (!eb.browser.fb.kb && d.aa.ba != V && (d.fc = {}, d.aa.ba == U || d.aa.ba == R)) {
                  d.jScrollPane = d.ia(d.ma + "_jpane").jScrollPane(d.fc);
              }
              for (c = 0; c < this.document.numPages; c++) {
                  d.vb(c) && this.dj(c);
              }
              d.Ah();
              if (!eb.browser.fb.kb) {
                  if (d.aa.ba == P || d.aa.ba == X) {
                      d.jScrollPane = d.ia(this.ma).jScrollPane(d.fc);
                  }
                  window.zine && !(d.aa.ha && d.aa.ha.na == d.aa.ba) && jQuery(d.ia(this.ma)).bind("jsp-initialised", function() {
                      jQuery(this).find(".jspHorizontalBar, .jspVerticalBar").hide();
                  }).jScrollPane().hover(function() {
                      jQuery(this).find(".jspHorizontalBar, .jspVerticalBar").stop().fadeTo("fast", 0.9);
                  }, function() {
                      jQuery(this).find(".jspHorizontalBar, .jspVerticalBar").stop().fadeTo("fast", 0);
                  });
              }!eb.browser.fb.kb && d.aa.ba == V && (d.jScrollPane = d.ia(d.ma).jScrollPane(d.fc));
              1 < d.Md && d.aa.ba == P && setTimeout(function() {
                  d.scrollTo(d.Md, q);
                  d.Md = -1;
                  jQuery(d.ma).css("visibility", "visible");
              }, 500);
              d.Md && d.aa.ba == X && jQuery(d.ma).css("visibility", "visible");
          },
          getPage: function(c) {
              if (this.aa.ba == U || this.aa.ba == R) {
                  if (0 != c % 2) {
                      return this.ca[1];
                  }
                  if (0 == c % 2) {
                      return this.ca[0];
                  }
              } else {
                  return this.aa.ba == X ? this.ca[0] : this.ca[c];
              }
          },
          vb: function(c) {
              if (this.document.DisplayRange) {
                  var d = this.document.DisplayRange.split("-");
                  if (c + 1 >= parseInt(d[0]) && c <= parseInt(d[1]) - 1) {
                      return q;
                  }
              } else {
                  return (this.aa.ba == U || this.aa.ba == R) && (0 == c || 1 == c) || this.aa.ba != U && this.aa.ba != R;
              }
          },
          dj: function(c) {
              this.ca[c] = new sa(this.ea, c, this, this.ga, this.aa, this.Rj(c));
              this.ca[c].create(this.ia(this.ma));
              jQuery(this.aa.ga).trigger("onPageCreated", c);
          },
          Rj: function(c) {
              for (var d = 0; d < this.document.dimensions.length; d++) {
                  if (this.document.dimensions[d].page == c) {
                      return this.document.dimensions[d];
                  }
              }
              return {
                  width: -1,
                  height: -1
              };
          },
          scrollTo: function(c, d) {
              if (this.la + 1 != c || d) {
                  !eb.browser.fb.kb && this.jScrollPane ? this.jScrollPane.data("jsp").scrollToElement(this.ca[c - 1].ia(this.ca[c - 1].ya), q, y) : jQuery(this.ma).scrollTo && jQuery(this.ma).scrollTo(this.ca[c - 1].ia(this.ca[c - 1].ya), 0);
              }
              this.La();
          },
          Fk: function() {
              for (var c = 0; c < this.getTotalPages(); c++) {
                  this.vb(c) && this.ca[c] && this.ca[c].vc && window.clearTimeout(this.ca[c].vc);
              }
          },
          kh: function() {
              this.ye();
          },
          ye: function() {
              var c = this;
              c.Kd != r && (window.clearTimeout(c.Kd), c.Kd = r);
              c.Kd = setTimeout(function() {
                  c.Nc();
              }, 200);
          },
          jg: function() {
              if (this.jScrollPane != r) {
                  try {
                      this.jScrollPane.data("jsp").reinitialise(this.fc);
                  } catch (c) {}
              }
          },
          Nc: function(c) {
              var d = this;
              if (d.aa) {
                  if (d.aa.ha && d.aa.ba == d.aa.ha.na) {
                      d.aa.ha.zb.Nc(d, c);
                  } else {
                      d.Kd != r && (window.clearTimeout(d.Kd), d.Kd = r);
                      c = d.ia(this.ma).scrollTop();
                      for (var e = 0; e < this.document.numPages; e++) {
                          if (this.ca[e] && d.vb(e)) {
                              var f = !d.ca[e].jb;
                              this.ca[e].Bd(c, d.ia(this.ma).height(), q) ? (f && d.ga.trigger("onVisibilityChanged", e + 1), this.ca[e].jb = q, this.ca[e].load(function() {
                                  if (d.aa.ba == U || d.aa.ba == R) {
                                      !d.ia(d.ma).is(":animated") && 1 != d.aa.scale && (d.ia(d.ma).css("margin-left", d.yd()), d.ia("#" + this.container + "_2").css("left", d.ia("#" + d.container).width() / 2)), !d.initialized && d.jScrollPane != r && (d.jScrollPane.data("jsp").reinitialise(d.fc), d.initialized = q);
                                  }
                              }), this.ca[e].bk(), this.ca[e].La()) : d.aa.ba != U && d.aa.ba != R && this.ca[e].unload();
                          }
                      }
                  }
              }
          },
          Fd: function() {
              this.aa.ba != this.aa.na() ? this.aa.sd(this.la + 1) : this.aa.sd(this.la);
          },
          La: function(c) {
              c = c ? c : this;
              for (var d = 0; d < c.document.numPages; d++) {
                  c.vb(d) && c.ca[d] && c.ca[d].jb && c.ca[d].La();
              }
          },
          Fe: function() {
              for (var c = this.la, d = this.ia(this.ma).scrollTop(), e = 0; e < this.document.numPages; e++) {
                  if (this.vb(e) && this.aa.ba != X) {
                      var f = !this.ca[e].jb;
                      if (this.ca[e].Bd(d, this.ia(this.ma).height(), y)) {
                          c = e;
                          f && this.ga.trigger("onVisibilityChanged", e + 1);
                          break;
                      }
                  }
              }
              this.la != c && this.ga.trigger("onCurrentPageChanged", c + 1);
              this.la = c;
          },
          setCurrentCursor: function(c) {
              for (var d = 0; d < this.document.numPages; d++) {
                  this.vb(d) && ("TextSelectorCursor" == c ? jQuery(this.ca[d].pa).addClass("flowpaper_nograb") : jQuery(this.ca[d].pa).removeClass("flowpaper_nograb"));
              }
          },
          gotoPage: function(c) {
              this.aa.gotoPage(c);
          },
          ge: function(c, d) {
              c = parseInt(c);
              var e = this;
              e.aa.renderer.uf && e.aa.renderer.uf(e.ca[0]);
              jQuery(".flowpaper_pageword").remove();
              jQuery(".flowpaper_interactiveobject_" + e.ea).remove();
              e.ca[0].unload();
              e.ca[0].visible = q;
              var f = e.ia(e.ma).scrollTop();
              e.aa.sd(c);
              e.ga.trigger("onCurrentPageChanged", c);
              e.ca[0].Bd(f, e.ia(this.ma).height(), q) && (e.ga.trigger("onVisibilityChanged", c + 1), e.ca[0].load(function() {
                  d != r && d();
                  e.ye();
                  e.jScrollPane != r && e.jScrollPane.data("jsp").reinitialise(e.fc);
              }));
          },
          je: function(c, d) {
              c = parseInt(c);
              var e = this;
              0 == c % 2 && 0 < c && e.aa.ba == R && c != e.getTotalPages() && (c += 1);
              c == e.getTotalPages() && (e.aa.ba == U && 0 == e.getTotalPages() % 2) && (c = e.getTotalPages() - 1);
              0 == c % 2 && e.aa.ba == U && (c -= 1);
              c > e.getTotalPages() && (c = e.getTotalPages());
              jQuery(".flowpaper_pageword").remove();
              jQuery(".flowpaper_interactiveobject_" + e.ea).remove();
              if (c <= e.getTotalPages() && 0 < c) {
                  e.aa.sd(c);
                  e.la != c && e.ga.trigger("onCurrentPageChanged", c);
                  e.ca[0].unload();
                  e.ca[0].load(function() {
                      if (e.aa.ba == U || e.aa.ba == R) {
                          e.ia(e.ma).animate({
                              "margin-left": e.yd()
                          }, {
                              duration: 250
                          }), e.ia("#" + this.container + "_2").css("left", e.ia("#" + e.container).width() / 2), e.ub(e.aa.scale);
                      }
                  });
                  1 < e.aa.ra ? (e.ia(e.ca[1].pa + "_2").removeClass("flowpaper_hidden"), e.ia(e.ma + "_2").removeClass("flowpaper_hidden")) : e.aa.ba == R && 1 == e.aa.ra && (e.ia(e.ca[1].pa + "_2").addClass("flowpaper_hidden"), e.ia(e.ma + "_2").addClass("flowpaper_hidden"));
                  0 != e.getTotalPages() % 2 && (e.aa.ba == U && c >= e.getTotalPages()) && e.ia(e.ca[1].pa + "_2").addClass("flowpaper_hidden");
                  0 == e.getTotalPages() % 2 && (e.aa.ba == R && c >= e.getTotalPages()) && e.ia(e.ca[1].pa + "_2").addClass("flowpaper_hidden");
                  var f = e.ia(this.ma).scrollTop();
                  e.ca[1].unload();
                  e.ca[1].visible = q;
                  !e.ia(e.ca[1].pa + "_2").hasClass("flowpaper_hidden") && e.ca[1].Bd(f, e.ia(this.ma).height(), q) && (e.ga.trigger("onVisibilityChanged", c + 1), e.ca[1].load(function() {
                      d != r && d();
                      e.ia(e.ma).animate({
                          "margin-left": e.yd()
                      }, {
                          duration: 250
                      });
                      e.ia("#" + this.container + "_2").css("left", e.ia("#" + e.container).width() / 2);
                      e.ye();
                      e.jScrollPane != r && e.jScrollPane.data("jsp").reinitialise(e.fc);
                  }));
              }
          },
          rotate: function(c) {
              this.ca[c].rotate();
          },
          yd: function(c) {
              this.ga.width();
              var d = 0;
              1 == this.aa.ra && !c && this.aa.ba == R ? d = this.Hn = (this.ga.width() / 2 - this.ia(this.ma + "_1").width() / 2) * (this.aa.scale + 0.7) : (c = jQuery(this.ma + "_2").width(), 0 == c && (c = this.ia(this.ma + "_1").width()), d = this.Gn = (this.ga.width() - (this.ia(this.ma + "_1").width() + c)) / 2);
              10 > d && (d = 0);
              return d;
          },
          previous: function() {
              var c = this;
              if (c.aa.ba == P) {
                  var d = c.ia(c.ma).scrollTop() - c.ca[0].height - 14;
                  0 > d && (d = 1);
                  eb.browser.fb.kb ? c.ia(c.ma).scrollTo(d, {
                      axis: "y",
                      duration: 500
                  }) : c.jScrollPane.data("jsp").scrollToElement(this.ca[c.aa.ra - 2].ia(this.ca[c.aa.ra - 2].ya), q, q);
              }
              c.aa.ba == X && 0 < c.aa.ra - 1 && (!eb.platform.touchdevice || 1 == this.aa.scale ? c.ge(c.aa.ra - 1) : (c.aa.tb = q, c.ia(c.ma).removeClass("flowpaper_pages_border"), c.ia(c.ma).transition({
                  x: 1000
              }, 350, function() {
                  c.ca[0].unload();
                  c.ia(c.ma).transition({
                      x: -800
                  }, 0);
                  c.jScrollPane ? c.jScrollPane.data("jsp").scrollTo(0, 0, y) : c.ia(c.ma).scrollTo(0, {
                      axis: "y",
                      duration: 0
                  });
                  c.ge(c.aa.ra - 1, z());
                  c.ia(c.ma).transition({
                      x: 0
                  }, 350, function() {
                      c.aa.tb = y;
                      window.annotations || c.ia(c.ma).addClass("flowpaper_pages_border");
                  });
              })));
              c.aa.ha && c.aa.ba == c.aa.ha.na && c.aa.ha.zb.previous(c);
              if ((c.aa.ba == U || c.aa.ba == R) && !(1 > c.aa.ra - 2)) {
                  !eb.platform.touchdevice || 1 == this.aa.scale ? c.je(c.aa.ra - 2) : (c.la = c.aa.ra - 2, c.aa.tb = q, c.ia(c.ma).animate({
                      "margin-left": 1000
                  }, {
                      duration: 350,
                      complete: function() {
                          jQuery(".flowpaper_interactiveobject_" + c.ea).remove();
                          1 == c.aa.ra - 2 && c.aa.ba == R && c.ca[1].ia(c.ca[1].pa + "_2").addClass("flowpaper_hidden");
                          setTimeout(function() {
                              c.ia(c.ma).css("margin-left", -800);
                              c.ca[0].unload();
                              c.ca[1].unload();
                              c.ia(c.ma).animate({
                                  "margin-left": c.yd()
                              }, {
                                  duration: 350,
                                  complete: function() {
                                      setTimeout(function() {
                                          c.aa.tb = y;
                                          c.je(c.aa.ra - 2);
                                      }, 500);
                                  }
                              });
                          }, 500);
                      }
                  }));
              }
          },
          next: function() {
              var c = this;
              if (c.aa.ba == P) {
                  0 == c.aa.ra && (c.aa.ra = 1);
                  var d = c.aa.ra - 1,
                    d = 100 < this.ca[c.aa.ra - 1].ia(this.ca[c.aa.ra - 1].ya).offset().top - c.ga.offset().top ? c.aa.ra - 1 : c.aa.ra;
                  eb.browser.fb.kb ? this.ca[d] && c.ia(c.ma).scrollTo(this.ca[d].ia(this.ca[d].ya), {
                      axis: "y",
                      duration: 500
                  }) : c.jScrollPane.data("jsp").scrollToElement(this.ca[c.aa.ra].ia(this.ca[c.aa.ra].ya), q, q);
              }
              c.aa.ba == X && c.aa.ra < c.getTotalPages() && (!eb.platform.touchdevice || 1 == c.aa.scale ? c.ge(c.aa.ra + 1) : (c.aa.tb = q, c.ia(c.ma).removeClass("flowpaper_pages_border"), c.ia(c.ma).transition({
                  x: -1000
              }, 350, "ease", function() {
                  c.ca[0].unload();
                  c.ia(c.ma).transition({
                      x: 1200
                  }, 0);
                  c.jScrollPane ? c.jScrollPane.data("jsp").scrollTo(0, 0, y) : c.ia(c.ma).scrollTo(0, {
                      axis: "y",
                      duration: 0
                  });
                  c.ge(c.aa.ra + 1, z());
                  c.ia(c.ma).transition({
                      x: 0
                  }, 350, "ease", function() {
                      window.annotations || c.ia(c.ma).addClass("flowpaper_pages_border");
                      c.aa.tb = y;
                  });
              })));
              c.aa.ha && c.aa.ba == c.aa.ha.na && c.aa.ha.zb.next(c);
              if (c.aa.ba == U || c.aa.ba == R) {
                  if (c.aa.ba == U && c.aa.ra + 2 > c.getTotalPages()) {
                      return y;
                  }!eb.platform.touchdevice || 1 == this.aa.scale ? c.je(c.aa.ra + 2) : (c.la = c.aa.ra + 2, c.aa.tb = q, c.ia(c.ma).animate({
                      "margin-left": -1000
                  }, {
                      duration: 350,
                      complete: function() {
                          jQuery(".flowpaper_interactiveobject_" + c.ea).remove();
                          c.aa.ra + 2 <= c.getTotalPages() && 0 < c.aa.ra + 2 && c.ca[1].ia(c.ca[1].pa + "_2").removeClass("flowpaper_hidden");
                          setTimeout(function() {
                              c.ia(c.ma).css("margin-left", 800);
                              c.ca[0].unload();
                              c.ca[1].unload();
                              c.ca[0].jb = q;
                              c.ca[1].jb = q;
                              c.ga.trigger("onVisibilityChanged", c.la);
                              c.ia(c.ma).animate({
                                  "margin-left": c.yd(q)
                              }, {
                                  duration: 350,
                                  complete: function() {
                                      setTimeout(function() {
                                          c.aa.tb = y;
                                          c.je(c.aa.ra + 2);
                                      }, 500);
                                  }
                              });
                          }, 500);
                      }
                  }));
              }
          }
      };
      return g;
  }(),
  sa = function() {
      function g(c, d, e, f, g, n) {
          this.ga = f;
          this.aa = g;
          this.ca = e;
          this.Na = 1000;
          this.Ua = this.jb = y;
          this.ea = c;
          this.pageNumber = d;
          this.dimensions = n;
          this.selectors = {};
          this.Kc = "data:image/gif;base64,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%3D";
          this.vf = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAVVSURBVHjaxFdbSFxHGJ7djfdb1HgNpsV7iwQrYhWN5EmReHlqUEGqUcGHohBCMSqhqEgU8aWiqH0QBDGkAe2bF1ARMduKldqqsURFrVqtBo1uvOzu9P+n/znMWVfNWwc+zp455/zf/LdvZnXs8qGTrrbAwe2ASddrDdvOIfSEGwADQW9DagVYCGa6t9os4kpS5bdCgGSOCpqamj5PSUm5d+fOnS98fHyiHB0dg3U6HT8/P//r6Ojoj729PePy8vJIRkbGnLQQdh25johcADcBQYDQ4uLitNevX3eB4Q2r1coVbG1t8ZWVFS7PnZ6ewtTK856eniiypbskmuoDB4ArwBfwCSCmvr7+GzBiJIO8s7OTP3jwgLu6umqQnJzMW1pauMlkEuTg9eDo6Gg62bRLrHiIhLfQO0B8VVXVk83NzUU0Mjg4yKOioi6Q2eLu3bt8enpaEJ+cnBiHh4fTJY81QwmpLxEmpKWlPVpYWJjFj7u7u7mHh8e1hC4uLgLu7u68oaFBEIPng11dXdH2iJ0ohxjSeEDmy5cvf1I8vIpQIbKHtrY2Qfz27dvnxKGXSd2oaGIAaVB9Nbu7u3tQODw8PFxDkpiYyO/fv3+BICQkhJeWlnJfX191zsvLi6+vr4vigsKKt/XWm8KaDMiFghjAFba2tmoI4+Li1Cqtra1VjUdHR/ONjQ0x39HRoc47OzvzsrIyMT8zM1NJrSdI9XSDReSJC4iNjY3ABy9evNAk/vj4mEFxiN81NTXs6dOnLDQ0lI2MjLDg4GAx//79e8Y5F8AxMDDAgJRBxL609TQEiwfwFeBbWPXewcGB3fzl5OSobYHA95Tfr1694m5ubsJDGbOzs1jJS2Dbg0RHeOpAiUZvXSEvntvb2xovlZUPDQ2x3NxcdnZ2Ju6hyMS1v7+fFRUV/SdnBoMGkFfm4OBwmwjV8Cpy50RgIG0XCJUBYiHCKI/5+XlmsVjsSh3Ogw2drNt6W2Hf2dk5DgwMtGsAciO8hWiIe8wXDhASVllZafcbzDdEZlNWJr3tS4uLi+9A0MXLspcYSiQMCAhQQ/rw4UO1uKqrq1lJSYnGFoY3MjKSQfu9kef10naEW5NlfHx8Bx9kZWVpDODHMmFhYSED8WD5+fkqMWiw5pvU1FTm6enJlpaWfrXd7rBH7wG+BnwXExPzI1TwEe4icrMjsO8qKio4GBKVqgC2PF5XV8cjIiI08xMTExx3J2ivdFK9G3ZbBvB9Y2Pj79gGzc3NGlJsAdnoVYBQi1YyGo1dxKG2jIHE3pGu2DYukFcrSJ4P5Mx9dXWVzc3NqfnV6/XXnUZYQkIC6+vrY7BL/fzs2bNW2DywkE4ohdxAhPIpwenw8BALCj++CSt2MZvNbHJy8qNIsbh6e3vZ/v7+m/b29h9AGo0oaIBT6TShFXzAI1Q6DHNSUtIwkG1hmGC1PC8vj/v5+dkNZ2ZmJocThggpFM7s48ePn5DNIOJQZVBHgoCh9QL4AQLpRSzVW0FBQbfLy8s/Kygo+BTayA12DaxGBiIuVgyFx6CARJXCiWF/bGxsEmqhH3L5GzzeBRwAPqDmUJeopwblqOJFpwd/wi3ahdzh5BCUnZ0dAluff1hYmLe/vz+uHokO19bW/p6amvoTWukXqNhZmMa2+4cITURoUVpGUQmDzW7jI8GbKs+VomJQFI7yhEZRF98B9iUc0rMzmZBJfWOh1ZjooYWq7ZhW6y6RKt+YJdIjIjmgBRxJIbXYOx9x8tYsqYaFVmgiQwqhoySdVnpHITYR0QeaO7/s7PvRh23K+w0bUjMZP5Ngvu6w/b/8rfhXgAEAmJkyLSnsNQEAAAAASUVORK5CYII=";
          this.va = "dummyPage_" + this.pageNumber + "_" + this.ea;
          this.page = "page_" + this.pageNumber + "_" + this.ea;
          this.Lc = "pageContainer_" + this.pageNumber + "_" + this.ea;
          this.we = this.Lc + "_textLayer";
          this.Je = "dummyPageCanvas_" + this.pageNumber + "_" + this.ea;
          this.Ke = "dummyPageCanvas2_" + this.pageNumber + "_" + this.ea;
          this.Ge = this.page + "_canvasOverlay";
          this.Rb = "pageLoader_" + this.pageNumber + "_" + this.ea;
          this.Fh = this.Lc + "_textoverlay";
          this.ba = this.aa.ba;
          this.na = this.aa.ha ? this.aa.ha.na : "";
          this.renderer = this.aa.renderer;
          c = this.aa.scale;
          this.scale = c;
          this.pa = "#" + this.va;
          this.ua = "#" + this.page;
          this.ya = "#" + this.Lc;
          this.ab = "#" + this.we;
          this.Bf = "#" + this.Je;
          this.Cf = "#" + this.Ke;
          this.qj = "#" + this.Ge;
          this.hc = "#" + this.Rb;
          this.Uf = "#" + this.Fh;
          this.yn = {
              bottom: 3,
              top: 2,
              right: 0,
              left: 1,
              jm: 4,
              back: 5
          };
          this.Fm = [];
          this.duration = 1.3;
          this.Nm = 16777215;
          this.offset = this.im = 0;
      }
      g.prototype = {
          ia: function(c) {
              if (0 < c.indexOf("undefined")) {
                  return jQuery(r);
              }
              this.selectors || (this.selectors = {});
              this.selectors[c] || (this.selectors[c] = jQuery(c));
              return this.selectors[c];
          },
          show: function() {
              this.aa.ba != U && this.aa.ba != R && this.ia(this.ua).removeClass("flowpaper_hidden");
          },
          Sd: function() {
              this.ca.jScrollPane && (!eb.browser.fb.kb && this.ca.jScrollPane ? this.aa.ba == X ? 0 > this.ia(this.ca.ma).width() - this.ia(this.ya).width() ? (this.ca.jScrollPane.data("jsp").scrollToPercentX(0.5, y), this.ca.jScrollPane.data("jsp").scrollToPercentY(0.5, y)) : (this.ca.jScrollPane.data("jsp").scrollToPercentX(0, y), this.ca.jScrollPane.data("jsp").scrollToPercentY(0, y)) : this.ca.jScrollPane.data("jsp").scrollToPercentX(0, y) : this.ia(this.ya).parent().scrollTo && this.ia(this.ya).parent().scrollTo({
                  left: "50%"
              }, 0, {
                  axis: "x"
              }));
          },
          create: function(c) {
              var d = this;
              if (d.aa.ba == P && (c.append("<div class='flowpaper_page " + (d.aa.document.DisableOverflow ? "flowpaper_ppage" : "") + " " + (d.aa.document.DisableOverflow && d.pageNumber < d.aa.renderer.getNumPages() - 1 ? "ppage_break" : "ppage_none") + "' id='" + d.Lc + "' style='position:relative;" + (d.aa.document.DisableOverflow ? "margin:0;padding:0;overflow:hidden;" : "") + "'><div id='" + d.va + "' class='' style='z-index:11;" + d.getDimensions() + ";'></div></div>"), 0 < jQuery(d.aa.pg).length)) {
                  var e = this.Na * this.scale;
                  jQuery(d.aa.pg).append("<div id='" + d.Fh + "' class='flowpaper_page' style='position:relative;height:" + e + "px;width:100%;overflow:hidden;'></div>");
              }
              d.aa.ba == X && 0 == d.pageNumber && c.append("<div class='flowpaper_page' id='" + d.Lc + "' class='flowpaper_rescale' style='position:relative;'><div id='" + d.va + "' class='' style='position:absolute;z-index:11;" + d.getDimensions() + "'></div></div>");
              if (d.aa.ba == U || d.aa.ba == R) {
                  0 == d.pageNumber && jQuery(c.children().get(0)).append("<div class='flowpaper_page' id='" + d.Lc + "_1' style='z-index:2;float:right;position:relative;'><div id='" + d.va + "_1' class='flowpaper_hidden flowpaper_border' style='" + d.getDimensions() + ";float:right;'></div></div>"), 1 == d.pageNumber && jQuery(c.children().get(1)).append("<div class='flowpaper_page' id='" + d.Lc + "_2' style='position:relative;z-index:1;float:left;'><div id='" + d.va + "_2' class='flowpaper_hidden flowpaper_border' style='" + d.getDimensions() + ";float:left'></div></div>");
              }
              d.aa.ba == V && (c.append("<div class='flowpaper_page' id='" + d.Lc + "' style='position:relative;" + (eb.browser.msie ? "clear:none;float:left;" : "display:inline-block;") + "'><div id=\"" + d.va + '" class="flowpaper_page flowpaper_thumb flowpaper_border flowpaper_load_on_demand" style="margin-left:10px;' + d.getDimensions() + '"></div></div>'), jQuery(d.ya).on("mousedown touchstart", function() {
                  d.aa.gotoPage(d.pageNumber + 1);
              }));
              d.aa.ba == d.na ? d.aa.ha.Cc.create(d, c) : (d.aa.renderer.Re(d), d.show(), d.height = d.ia(d.ya).height(), d.Uk());
          },
          qb: function() {
              if (this.aa.ba == P || this.aa.ba == X) {
                  return this.Ge;
              }
              if (this.aa.ba == U || this.aa.ba == R) {
                  if (0 == this.pageNumber) {
                      return this.Ge + "_1";
                  }
                  if (1 == this.pageNumber) {
                      return this.Ge + "_2";
                  }
              }
          },
          Kj: function() {
              if (this.aa.ba == P || this.aa.ba == X) {
                  return this.pa;
              }
              if (this.aa.ba == U || this.aa.ba == R) {
                  if (0 == this.pageNumber) {
                      return this.ya + "_1";
                  }
                  if (1 == this.pageNumber) {
                      return this.ya + "_2";
                  }
              }
          },
          $d: function() {
              if (this.aa.ba == P || this.aa.ba == X) {
                  return this.pa;
              }
              if (this.aa.ba == U || this.aa.ba == R) {
                  if (0 == this.pageNumber) {
                      return this.ya + "_1";
                  }
                  if (1 == this.pageNumber) {
                      return this.ya + "_2";
                  }
              }
          },
          be: function() {
              if (this.aa.ba == P || this.aa.ba == X) {
                  return this.ab;
              }
              if (this.aa.ba == U || this.aa.ba == R) {
                  if (0 == this.pageNumber) {
                      return this.ab + "_1";
                  }
                  if (1 == this.pageNumber) {
                      return this.ab + "_2";
                  }
              }
          },
          ag: function(c) {
              this.ia(this.Uf).css({
                  top: c
              });
          },
          Pb: function() {
              (this.aa.ba == P || this.aa.ba == X || this.aa.ba == this.na) && jQuery("#" + this.Rb).remove();
              if (this.aa.ba == U || this.aa.ba == R) {
                  0 == this.pageNumber && this.ia(this.hc + "_1").hide(), 1 == this.pageNumber && this.ia(this.hc + "_2").hide();
              }
          },
          ld: function() {
              if (!this.aa.document.DisableOverflow) {
                  if (this.aa.ba == P || this.aa.ba == X || this.aa.ba == this.na) {
                      this.Na = 1000;
                      if (0 < this.ia(this.hc).length) {
                          return;
                      }
                      var c = 0 < jQuery(this.ya).length ? jQuery(this.ya) : this.Vf;
                      c && c.find && 0 != c.length ? 0 == c.find("#" + this.Rb).length && c.append("<img id='" + this.Rb + "' src='" + this.Kc + "' class='flowpaper_pageLoader'  style='position:absolute;left:50%;top:50%;height:8px;margin-left:" + (this.Kb() - 10) + "px;' />") : da("can't show loader, missing container for page " + this.pageNumber);
                  }
                  if (this.aa.ba == U || this.aa.ba == R) {
                      if (0 == this.pageNumber) {
                          if (0 < this.ia(this.hc + "_1").length) {
                              this.ia(this.hc + "_1").show();
                              return;
                          }
                          this.ia(this.pa + "_1").append("<img id='" + this.Rb + "_1' src='" + this.Kc + "' style='position:absolute;left:" + (this.$a() - 30) + "px;top:" + this.sb() / 2 + "px;' />");
                          this.ia(this.hc + "_1").show();
                      }
                      1 == this.pageNumber && (0 < this.ia(this.hc + "_2").length || this.ia(this.pa + "_2").append("<img id='" + this.Rb + "_2' src='" + this.Kc + "' style='position:absolute;left:" + (this.$a() / 2 - 10) + "px;top:" + this.sb() / 2 + "px;' />"), this.ia(this.hc + "_2").show());
                  }
              }
          },
          ub: function() {
              var c, d;
              d = this.$a();
              c = this.sb();
              var e = this.Kb();
              this.aa.document.DisableOverflow && (c = Math.floor(c), d = Math.floor(d));
              if (this.aa.ba == P || this.aa.ba == X) {
                  this.ia(this.ya).css({
                      height: c,
                      width: d,
                      "margin-left": e,
                      "margin-top": 0
                  }), this.ia(this.pa).css({
                      height: c,
                      width: d,
                      "margin-left": e
                  }), this.ia(this.ua).css({
                      height: c,
                      width: d,
                      "margin-left": e
                  }), this.ia(this.Bf).css({
                      height: c,
                      width: d
                  }), this.ia(this.Cf).css({
                      height: c,
                      width: d
                  }), this.ia(this.Uf).css({
                      height: c,
                      width: d
                  }), this.ia(this.hc).css({
                      "margin-left": e
                  }), jQuery(this.ab).css({
                      height: c,
                      width: d,
                      "margin-left": e
                  }), this.aa.renderer.md && (jQuery(".flowpaper_flipview_canvas_highres").css({
                      width: 0.25 * d,
                      height: 0.25 * c
                  }).show(), 1 > this.scale ? this.aa.renderer.uf(this) : this.aa.renderer.Zf(this)), this.Qe(this.scale, e);
              }
              if (this.aa.ba == U || this.aa.ba == R) {
                  this.ia(this.pa + "_1").css({
                      height: c,
                      width: d
                  }), this.ia(this.pa + "_2").css({
                      height: c,
                      width: d
                  }), this.ia(this.pa + "_1_textoverlay").css({
                      height: c,
                      width: d
                  }), this.ia(this.pa + "_2_textoverlay").css({
                      height: c,
                      width: d
                  }), this.ia(this.ua).css({
                      height: c,
                      width: d
                  }), eb.browser.fb.kb || (0 == this.ca.la ? this.ca.ia(this.ca.ma).css({
                      height: c,
                      width: d
                  }) : this.ca.ia(this.ca.ma).css({
                      height: c,
                      width: 2 * d
                  }), this.aa.ba == U && this.ca.ia(this.ca.ma).css({
                      width: "100%"
                  })), eb.platform.touchdevice && 1 <= this.scale && this.ca.ia(this.ca.ma).css({
                      width: 2 * d
                  }), eb.platform.touchdevice && (this.aa.ba == U && this.ca.ia(this.ca.ma + "_2").css("left", this.ca.ia(this.ca.ma + "_1").width() + e + 2), this.aa.ba == R && this.ca.ia(this.ca.ma + "_2").css("left", this.ca.ia(this.ca.ma + "_1").width() + e + 2));
              }
              if (this.aa.ba == this.na) {
                  var f = this.Wg() * this.Na,
                    g = this.$a() / f;
                  this.dimensions.Fb != r && (this.Ec && this.aa.renderer.Da) && (g = this.ca.Ml / 2 / f);
                  this.aa.ba == this.na ? 1 == this.scale && this.Qe(g, e) : this.Qe(g, e);
              }
              this.height = c;
              this.width = d;
          },
          Bc: function() {
              return this.aa.ba == X;
          },
          resize: z(),
          Wg: function() {
              return this.dimensions.xa / this.dimensions.Ga;
          },
          fe: function() {
              return this.aa.ba == this.na ? this.aa.ha.Cc.fe(this) : this.Na * this.scale * (this.dimensions.xa / this.dimensions.Ga);
          },
          bh: function() {
              return this.aa.ba == this.na ? this.aa.ha.Cc.bh(this) : this.Na * this.scale;
          },
          getDimensions: function() {
              var c = this.xd(),
                d = this.aa.fe();
              if (this.aa.document.DisableOverflow) {
                  var e = this.Na * this.scale;
                  return "height:" + e + "px;width:" + e * c + "px";
              }
              if (this.aa.ba == P || this.aa.ba == X) {
                  return e = this.Na * this.scale, "height:" + e + "px;width:" + e * c + "px;margin-left:" + (d - e * c) / 2 + "px;";
              }
              if (this.aa.ba == this.na) {
                  return this.aa.ha.Cc.getDimensions(this, c);
              }
              if (this.aa.ba == U || this.aa.ba == R) {
                  return e = this.ga.width() / 2 * this.scale, (0 == this.pageNumber ? "margin-left:0px;" : "") + "height:" + e + "px;width:" + e * c + "px";
              }
              if (this.aa.ba == V) {
                  return e = this.Na * ((this.ga.height() - 100) / this.Na) / 2.7, "height:" + e + "px;width:" + e * c + "px";
              }
          },
          xd: function() {
              return this.dimensions.xa / this.dimensions.Ga;
          },
          $a: function() {
              return this.aa.ba == this.na ? this.aa.ha.Cc.$a(this) : this.Na * this.xd() * this.scale;
          },
          gh: function() {
              return this.aa.ba == this.na ? this.aa.ha.Cc.gh(this) : this.Na * this.xd() * this.scale;
          },
          eh: function(c) {
              return c / (this.Na * this.xd());
          },
          sb: function() {
              return this.aa.ba == this.na ? this.aa.ha.Cc.sb(this) : this.Na * this.scale;
          },
          fh: function() {
              return this.aa.ba == this.na ? this.aa.ha.Cc.fh(this) : this.Na * this.scale;
          },
          Kb: function() {
              var c = this.aa.fe(),
                d = 0;
              if (this.aa.document.DisableOverflow) {
                  return 0;
              }
              if (this.aa.ba == P || this.aa.ba == X) {
                  return d = (c - this.$a()) / 2 / 2 - 4, 0 < d ? d : 0;
              }
              if (this.aa.ba == U || this.aa.ba == R) {
                  return 0;
              }
              if (this.aa.ba == this.na) {
                  return this.aa.ha.Cc.Kb(this);
              }
          },
          Bd: function(c, d, e) {
              var f = y;
              if (this.aa.ba == P || this.aa.ba == V) {
                  if (this.offset = this.ia(this.ya).offset()) {
                      this.ca.og || (this.ca.og = this.aa.ja.offset().top);
                      var f = this.offset.top - this.ca.og + c,
                        g = this.offset.top + this.height;
                      d = c + d;
                      f = e || eb.platform.touchdevice && !eb.browser.fb.kb ? this.jb = c - this.height <= f && d >= f || f - this.height <= c && g >= d : c <= f && d >= f || f <= c && g >= d;
                  } else {
                      f = y;
                  }
              }
              this.aa.ba == X && (f = this.jb = 0 == this.pageNumber);
              this.aa.ba == this.na && (f = this.jb = this.aa.ha.Cc.Bd(this));
              if (this.aa.ba == R) {
                  if (0 == this.ca.getTotalPages() % 2 && this.ca.la >= this.ca.getTotalPages() && 1 == this.pageNumber) {
                      return y;
                  }
                  f = this.jb = 0 == this.pageNumber || 0 != this.ca.la && 1 == this.pageNumber;
              }
              if (this.aa.ba == U) {
                  if (0 != this.ca.getTotalPages() % 2 && this.ca.la >= this.ca.getTotalPages() && 1 == this.pageNumber) {
                      return y;
                  }
                  f = this.jb = 0 == this.pageNumber || 1 == this.pageNumber;
              }
              return f;
          },
          bk: function() {
              this.Ua || this.load();
          },
          load: function(c) {
              this.La(c);
              if (!this.Ua) {
                  if (this.aa.ba == U && (c = this.aa.renderer.getDimensions(this.pageNumber - 1, this.pageNumber - 1)[this.ca.la + this.pageNumber], c.width != this.dimensions.width || c.height != this.dimensions.height)) {
                      this.dimensions = c, this.ub();
                  }
                  if (this.aa.ba == R && (c = this.aa.renderer.getDimensions(this.pageNumber - 1, this.pageNumber - 1)[this.ca.la - (0 < this.ca.la ? 1 : 0) + this.pageNumber], c.width != this.dimensions.width || c.height != this.dimensions.height)) {
                      this.dimensions = c, this.ub();
                  }
                  if (this.aa.ba == X) {
                      c = this.aa.renderer.getDimensions(this.pageNumber - 1, this.pageNumber - 1)[this.ca.la];
                      if (c.width != this.dimensions.width || c.height != this.dimensions.height) {
                          this.dimensions = c, this.ub(), jQuery(".flowpaper_pageword_" + this.ea).remove(), this.La();
                      }
                      this.dimensions.loaded = y;
                  }
                  if (this.aa.ba == P && (c = this.aa.renderer.getDimensions(this.pageNumber - 1, this.pageNumber - 1)[this.pageNumber], c.width != this.dimensions.width || c.height != this.dimensions.height)) {
                      this.dimensions = c, this.ub(), jQuery(".flowpaper_pageword_" + this.ea).remove(), this.La();
                  }
                  this.aa.renderer.ic(this, y);
                  "function" === typeof this.ke && this.loadOverlay();
              }
          },
          unload: function() {
              if (this.Ua || !(this.aa.ba != U && this.aa.ba != R && this.aa.ba != this.na)) {
                  if (delete this.selectors, this.selectors = {}, jQuery(this.Oa).unbind(), delete this.Oa, this.Oa = r, this.Ua = y, this.aa.renderer.unload(this), jQuery(this.hc).remove(), this.sg && (delete this.sg, this.sg = r), this.aa.ba == this.na && this.aa.ha.Cc.unload(this), this.aa.ba != U && this.aa.ba != R && this.ia("#" + this.qb()).remove(), "function" === typeof this.ke) {
                      var c = document.getElementById(this.qb());
                      c && (c.width = this.$a());
                  }
              }
          },
          La: function(c) {
              this.aa.ba != V && ((this.jb || c != r) && !this.ca.Qd) && this.aa.renderer.La(this, y, c);
          },
          Vb: function(c, d) {
              this.aa.renderer.Vb(this, c, d);
          },
          $c: function(c, d, e) {
              this.aa.renderer.$c(this, c, d, e);
          },
          Uk: function() {
              if (this.aa.ba == P || this.aa.ba == X) {
                  !(eb.browser.msie && 9 > eb.browser.version) && !eb.platform.ios && (new ha(this.aa, "CanvasPageRenderer" == this.renderer.ee() ? this.pa : this.ua, this.ia(this.ya).parent())).scroll();
              }
          },
          Qe: function(c, d) {
              var e = this;
              if (e.aa.qa[e.pageNumber]) {
                  for (var f = 0; f < e.aa.qa[e.pageNumber].length; f++) {
                      if ("link" == e.aa.qa[e.pageNumber][f].type) {
                          var g = e.aa.qa[e.pageNumber][f].Dm * c,
                            n = e.aa.qa[e.pageNumber][f].Em * c,
                            l = e.aa.qa[e.pageNumber][f].width * c,
                            s = e.aa.qa[e.pageNumber][f].height * c;
                          if (0 == jQuery("#flowpaper_mark_link_" + e.pageNumber + "_" + f).length) {
                              var h = jQuery(String.format("<div id='flowpaper_mark_link_{4}_{5}' class='flowpaper_mark_link flowpaper_mark' style='left:{0}px;top:{1}px;width:{2}px;height:{3}px;box-shadow: 0px 0px 0px 0px;'></div>", g, n, l, s, e.pageNumber, f)),
                                s = e.ya;
                              0 == jQuery(s).length && (s = e.Vf);
                              h = jQuery(s).append(h).find("#flowpaper_mark_link_" + e.pageNumber + "_" + f);
                              h.data("link", e.aa.qa[e.pageNumber][f].href);
                              h.bind("mouseup touchend", function(c) {
                                  if (e.ca.ii || e.ca.Qd) {
                                      return y;
                                  }
                                  if (0 == jQuery(this).data("link").indexOf("actionGoTo:")) {
                                      e.aa.gotoPage(jQuery(this).data("link").substr(11));
                                  } else {
                                      if (0 == jQuery(this).data("link").indexOf("javascript")) {
                                          var d = unescape(jQuery(this).data("link"));
                                          eval(d.substring(11));
                                      } else {
                                          jQuery(e.ga).trigger("onExternalLinkClicked", jQuery(this).data("link"));
                                      }
                                  }
                                  c.preventDefault();
                                  c.stopImmediatePropagation();
                                  return y;
                              });
                              eb.platform.touchonlydevice || (jQuery(h).on("mouseover", function() {
                                  jQuery(this).stop(q, q);
                                  jQuery(this).css("background", e.aa.linkColor);
                                  jQuery(this).css({
                                      opacity: e.aa.Se
                                  });
                              }), jQuery(h).on("mouseout", function() {
                                  jQuery(this).css("background", "");
                                  jQuery(this).css({
                                      opacity: 0
                                  });
                              }));
                          } else {
                              h = jQuery("#flowpaper_mark_link_" + e.pageNumber + "_" + f), h.css({
                                  left: g + "px",
                                  top: n + "px",
                                  width: l + "px",
                                  height: s + "px",
                                  "margin-left": d + "px"
                              });
                          }
                      }
                      if ("video" == e.aa.qa[e.pageNumber][f].type) {
                          if (n = e.aa.qa[e.pageNumber][f].Kn * c, l = e.aa.qa[e.pageNumber][f].Ln * c, h = e.aa.qa[e.pageNumber][f].width * c, g = e.aa.qa[e.pageNumber][f].height * c, s = e.aa.qa[e.pageNumber][f].src, 0 == jQuery("#flowpaper_mark_video_" + e.pageNumber + "_" + f).length) {
                              var A = jQuery(String.format("<div id='flowpaper_mark_video_{4}_{5}' class='flowpaper_mark_video flowpaper_mark' style='left:{0}px;top:{1}px;width:{2}px;height:{3}px;margin-left:{7}px'><img src='{6}' style='width:{2}px;height:{3}px;' class='flowpaper_mark'/></div>", n, l, h, g, e.pageNumber, f, s, d)),
                                s = e.ya;
                              0 == jQuery(s).length && (s = e.Vf);
                              h = jQuery(s).append(A).find("#flowpaper_mark_video_" + e.pageNumber + "_" + f);
                              h.data("video", e.aa.qa[e.pageNumber][f].url);
                              h.data("maximizevideo", e.aa.qa[e.pageNumber][f].Hm);
                              h.bind("mouseup touchend", function(c) {
                                  if (e.ca.ii || e.ca.Qd) {
                                      return y;
                                  }
                                  var d = jQuery(this).data("video"),
                                    f = "true" == jQuery(this).data("maximizevideo");
                                  if (d && 0 <= d.toLowerCase().indexOf("youtube")) {
                                      for (var g = d.substr(d.indexOf("?") + 1).split("&"), m = "", h = 0; h < g.length; h++) {
                                          0 == g[h].indexOf("v=") && (m = g[h].substr(2));
                                      }
                                      if (f) {
                                          e.aa.qc = jQuery(String.format('<div class="flowpaper_mark_video_maximized flowpaper_mark" style="position:absolute;z-index:99999;left:2.5%;top:2.5%;width:95%;height:95%"></div>'));
                                          e.aa.ja.append(e.aa.qc);
                                          jQuery(e.aa.qc).html(String.format("<iframe width='{0}' height='{1}' src='{3}://www.youtube.com/embed/{2}?rel=0&autoplay=1&enablejsapi=1' frameborder='0' allowfullscreen ></iframe>", 0.95 * e.aa.ja.width(), 0.95 * e.aa.ja.height(), m, -1 < location.href.indexOf("https:") ? "https" : "http"));
                                          var l = jQuery(String.format('<img class="flowpaper_mark_video_maximized_closebutton" src="{0}" style="position:absolute;left:97%;top:1%;z-index:999999;cursor:pointer;">', e.vf));
                                          e.aa.ja.append(l);
                                          jQuery(l).bind("mousedown touchstart", function() {
                                              jQuery(".flowpaper_mark_video_maximized").remove();
                                              jQuery(".flowpaper_mark_video_maximized_closebutton").remove();
                                          });
                                      } else {
                                          jQuery(this).html(String.format("<iframe width='{0}' height='{1}' src='{3}://www.youtube.com/embed/{2}?rel=0&autoplay=1&enablejsapi=1' frameborder='0' allowfullscreen ></iframe>", jQuery(this).width(), jQuery(this).height(), m, -1 < location.href.indexOf("https:") ? "https" : "http"));
                                      }
                                  }
                                  d && 0 <= d.toLowerCase().indexOf("vimeo") && (m = d.substr(d.lastIndexOf("/") + 1), f ? (jQuery(this).html(""), e.aa.qc = jQuery(String.format('<div class="flowpaper_mark_video_maximized flowpaper_mark" style="position:absolute;z-index:99999;left:2.5%;top:2.5%;width:95%;height:95%"></div>')), e.aa.ja.append(e.aa.qc), jQuery(e.aa.qc).html(String.format("<iframe src='//player.vimeo.com/video/{2}?autoplay=1' width='{0}' height='{1}' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>", 0.95 * e.aa.ja.width(), 0.95 * e.aa.ja.height(), m)), l = jQuery(String.format('<img class="flowpaper_mark_video_maximized_closebutton" src="{0}" style="position:absolute;left:97%;top:1%;z-index:999999;cursor:pointer;">', e.vf)), e.aa.ja.append(l), jQuery(l).bind("mousedown touchstart", function() {
                                      jQuery(".flowpaper_mark_video_maximized").remove();
                                      jQuery(".flowpaper_mark_video_maximized_closebutton").remove();
                                  })) : jQuery(this).html(String.format("<iframe src='//player.vimeo.com/video/{2}?autoplay=1' width='{0}' height='{1}' frameborder='0' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>", jQuery(this).width(), jQuery(this).height(), m)));
                                  if (d && -1 < d.indexOf("{")) {
                                      try {
                                          var n = JSON.parse(d),
                                            s = "vimeoframe_" + FLOWPAPER.Jj();
                                          f ? (jQuery(this).html(""), e.aa.qc = jQuery(String.format('<div class="flowpaper_mark_video_maximized flowpaper_mark" style="position:absolute;z-index:99999;left:2.5%;top:2.5%;width:95%;height:95%"></div>')), e.aa.ja.append(e.aa.qc), jQuery(e.aa.qc).html(jQuery(String.format('<video id="{2}" style="width:{3}px;height:{4}px;" class="videoframe flowpaper_mark video-js vjs-default-skin" controls autoplay preload="auto" width="{3}" height="{4}" data-setup=\'{"example_option":true}\'><source src="{0}" type="video/mp4" /><source src="{1}" type="video/webm" /></video>', n.mp4, n.webm, s, 0.95 * e.aa.ja.width(), 0.95 * e.aa.ja.height()))), l = jQuery(String.format('<img class="flowpaper_mark_video_maximized_closebutton" src="{0}" style="position:absolute;left:97%;top:1%;z-index:999999;cursor:pointer;">', e.vf)), e.aa.ja.append(l), jQuery(l).bind("mousedown touchstart", function() {
                                              jQuery(".flowpaper_mark_video_maximized").remove();
                                              jQuery(".flowpaper_mark_video_maximized_closebutton").remove();
                                          })) : jQuery(this).html(jQuery(String.format('<video id="{2}" style="width:{3}px;height:{4}px;" class="videoframe flowpaper_mark video-js vjs-default-skin" controls autoplay preload="auto" width="{3}" height="{4}" data-setup=\'{"example_option":true}\'><source src="{0}" type="video/mp4" /><source src="{1}" type="video/webm" /></video>', n.mp4, n.webm, s, jQuery(this).width(), jQuery(this).height())));
                                      } catch (x) {}
                                  }
                                  c.preventDefault();
                                  c.stopImmediatePropagation();
                                  return y;
                              });
                          } else {
                              A = jQuery("#flowpaper_mark_video_" + e.pageNumber + "_" + f), A.css({
                                  left: n + "px",
                                  top: l + "px",
                                  width: h + "px",
                                  height: g + "px",
                                  "margin-left": d + "px"
                              }).find(".flowpaper_mark").css({
                                  width: h + "px",
                                  height: g + "px"
                              }), n = A.find("iframe"), 0 < n.length && (n.attr("width", h), n.attr("height", g));
                          }
                      }
                      if ("image" == e.aa.qa[e.pageNumber][f].type) {
                          var s = e.aa.qa[e.pageNumber][f].sm * c,
                            A = e.aa.qa[e.pageNumber][f].tm * c,
                            K = e.aa.qa[e.pageNumber][f].width * c,
                            x = e.aa.qa[e.pageNumber][f].height * c,
                            h = e.aa.qa[e.pageNumber][f].src,
                            g = e.aa.qa[e.pageNumber][f].href,
                            n = e.aa.qa[e.pageNumber][f].qm;
                          0 == jQuery("#flowpaper_mark_image_" + e.pageNumber + "_" + f).length ? (l = jQuery(String.format("<div id='flowpaper_mark_image_{4}_{5}' class='flowpaper_mark_image flowpaper_mark' style='left:{0}px;top:{1}px;width:{2}px;height:{3}px;'><img src='{6}' style='width:{2}px;height:{3}px;' class='flowpaper_mark'/></div>", s, A, K, x, e.pageNumber, f, h)), s = e.ya, 0 == jQuery(s).length && (s = e.Vf), s = jQuery(s).append(l).find("#flowpaper_mark_image_" + e.pageNumber + "_" + f), s.data("image", e.aa.qa[e.pageNumber][f].url), g != r && 0 < g.length ? (s.data("link", g), s.bind("mouseup touchend", function(c) {
                              if (e.ca.ii || e.ca.Qd) {
                                  return y;
                              }
                              0 == jQuery(this).data("link").indexOf("actionGoTo:") ? e.aa.gotoPage(jQuery(this).data("link").substr(11)) : jQuery(e.ga).trigger("onExternalLinkClicked", jQuery(this).data("link"));
                              c.preventDefault();
                              c.stopImmediatePropagation();
                              return y;
                          })) : e.aa.Kf || l.css({
                              "pointer-events": "none"
                          }), n != r && 0 < n.length && (s.data("hoversrc", n), s.data("imagesrc", h), s.bind("mouseover", function() {
                              jQuery(this).find(".flowpaper_mark").attr("src", jQuery(this).data("hoversrc"));
                          }), s.bind("mouseout", function() {
                              jQuery(this).find(".flowpaper_mark").attr("src", jQuery(this).data("imagesrc"));
                          }))) : (l = jQuery("#flowpaper_mark_image_" + e.pageNumber + "_" + f), l.css({
                              left: s + "px",
                              top: A + "px",
                              width: K + "px",
                              height: x + "px",
                              "margin-left": d + "px"
                          }).find(".flowpaper_mark").css({
                              width: K + "px",
                              height: x + "px"
                          }));
                      }
                  }
              }
          },
          Ib: function() {
              jQuery(this.ya).find("*").unbind();
              jQuery(this).unbind();
              jQuery(this.Oa).unbind();
              delete this.Oa;
              this.Oa = r;
              jQuery(this.ya).find("*").remove();
              this.selectors = this.ca = this.aa = this.ga = r;
          },
          rotate: function() {
              if (!this.rotation || 360 == this.rotation) {
                  this.rotation = 0;
              }
              this.rotation += 90;
              360 == this.rotation && (this.rotation = 0);
              var c = this.Kb();
              if (this.aa.ba == P || this.aa.ba == X) {
                  this.ub(), 90 == this.rotation ? (this.ia(this.pa).transition({
                      rotate: this.rotation
                  }, 0), jQuery(this.ua).transition({
                      rotate: this.rotation,
                      translate: "-" + c + "px, 0px"
                  }, 0), jQuery(this.ab).css({
                      "z-index": 11,
                      "margin-left": c
                  }), jQuery(this.ab).transition({
                      rotate: this.rotation,
                      translate: "-" + c + "px, 0px"
                  }, 0)) : 270 == this.rotation ? (jQuery(this.ua).transition({
                      rotate: this.rotation,
                      translate: "-" + c + "px, 0px"
                  }, 0), jQuery(this.ab).css({
                      "z-index": 11,
                      "margin-left": c
                  }), this.ia(this.pa).transition({
                      rotate: this.rotation
                  }, 0), jQuery(this.ab).transition({
                      rotate: this.rotation,
                      translate: "-" + c + "px, 0px"
                  }, 0)) : 180 == this.rotation ? (jQuery(this.ua).transition({
                      rotate: this.rotation,
                      translate: "-" + c + "px, 0px"
                  }, 0), jQuery(this.ab).css({
                      "z-index": 11,
                      "margin-left": c
                  }), this.ia(this.pa).transition({
                      rotate: this.rotation
                  }, 0), jQuery(this.ab).transition({
                      rotate: this.rotation,
                      translate: "-" + c + "px, 0px"
                  }, 0)) : (jQuery(this.ua).css("transform", ""), jQuery(this.ab).css({
                      "z-index": "",
                      "margin-left": 0
                  }), this.ia(this.pa).css("transform", ""), jQuery(this.ab).css("transform", ""));
              }
          },
          Mh: function(c, d, e, f, g) {
              var n = this,
                l = new jQuery.Deferred;
              if (!n.aa.renderer.mc) {
                  return l.resolve(), l;
              }
              n.ld();
              n.ck(d).then(function() {
                  var s = n.aa.renderer,
                    h = n.pageNumber + (d ? d : 0);
                  if (s.ka[h] && s.ka[h].loaded && jQuery(c).data("needs-overlay")) {
                      jQuery(c).data("needs-overlay", jQuery(c).data("needs-overlay") - 1);
                      n.ek = q;
                      var A = s.ka[h].text,
                        K = c.getContext("2d"),
                        s = (e ? e : c.width) / (s.ka[0] ? s.ka[0].width : s.ka[h].width),
                        h = q;
                      f || (f = 0, h = y);
                      g || (g = 0, h = y);
                      K.setTransform(1, 0, 0, 1, f, g);
                      K.save();
                      K.scale(s, s);
                      for (var x = 0; x < A.length; x++) {
                          var u = A[x],
                            t = u[1],
                            v = u[0] + u[10] * u[3],
                            F = u[9],
                            B = u[2],
                            G = u[6],
                            C = u[11],
                            N = u[12];
                          K.font = Math.abs(u[3]) + "px " + u[7] + ", " + u[8];
                          K.fillStyle = G;
                          0 != C && (K.save(), K.translate(t, v), K.rotate(C));
                          if (N) {
                              for (u = 0; u < N.length; u++) {
                                  G = N[u], 0 == C ? (!h || !(0 > f + (t + G[0] * F + B) * s || f + (t + G[0] * F) * s > c.width)) && K.fillText(G[1], t + G[0] * F, v) : K.fillText(G[1], G[0] * F, 0);
                              }
                          }
                          0 != C && K.restore();
                      }
                      K.restore();
                      l.resolve(c);
                  } else {
                      s.ka[h].loaded ? l.resolve(c) : (n.ek = y, c.width = 100, l.reject());
                  }
                  n.Pb();
              });
              return l;
          },
          ck: function(c) {
              var d = new jQuery.Deferred,
                e = this.aa.renderer;
              c = e.ka[this.pageNumber + (c ? c : 0)].text;
              e.Qb || (e.Qb = {});
              var f = [];
              if (!eb.browser.msie && !eb.browser.Vc && c && 0 < c.length) {
                  for (var g = 0; g < c.length; g++) {
                      c[g][7] && !e.Qb[c[g][7]] && -1 == f.indexOf(c[g][7]) && 0 == c[g][7].indexOf("g_font") && c[g][7] && f.push(c[g][7]);
                  }
              }
              0 < f.length ? WebFont.load({
                  custom: {
                      families: f
                  },
                  inactive: function() {
                      d.resolve();
                  },
                  fontactive: function(c) {
                      e.Qb[c] = "loaded";
                  },
                  fontinactive: function(c) {
                      e.Qb[c] = "inactive";
                  },
                  active: function() {
                      d.resolve();
                  },
                  timeout: 25000
              }) : d.resolve();
              return d;
          }
      };
      return g;
  }();

function ua(g, c) {
    this.aa = this.zf = g;
    this.ga = this.aa.ga;
    this.resources = this.aa.resources;
    this.ea = this.aa.ea;
    this.document = c;
    this.pd = r;
    this.Za = "toolbar_" + this.aa.ea;
    this.da = "#" + this.Za;
    this.Cg = this.Za + "_bttnPrintdialogPrint";
    this.qf = this.Za + "_bttnPrintdialogCancel";
    this.zg = this.Za + "_bttnPrintDialog_RangeAll";
    this.Ag = this.Za + "_bttnPrintDialog_RangeCurrent";
    this.Bg = this.Za + "_bttnPrintDialog_RangeSpecific";
    this.of = this.Za + "_bttnPrintDialogRangeText";
    this.rh = this.Za + "_labelPrintProgress";
    this.Df = r;
    this.create = function() {
        var c = this;
        c.Wk = "background-image:url(data:image/png;base64,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) ;";
        if (!eb.platform.touchonlydevice && !c.Df) {
            var e = c.resources.oa.qi,
              f = String.format("<div class='flowpaper_floatright flowpaper_bttnPercent' sbttnPrintIdtyle='text-align:center;padding-top:5px;background-repeat:no-repeat;width:20px;height:20px;font-size:9px;font-family:Arial;background-image:url({0})'><div id='lblPercent'></div></div>", c.resources.oa.Mi);
            eb.browser.msie && addCSSRule(".flowpaper_tbtextinput", "height", "18px");
            jQuery(c.da).html("" + (c.aa.config.document.ViewModeToolsVisible ? String.format("<img src='{1}' class='flowpaper_bttnSinglePage flowpaper_tbbutton flowpaper_viewmode flowpaper_singlepage {0}' />", c.aa.Bb == P ? "flowpaper_tbbutton_pressed" : "", c.resources.oa.Li) + String.format("<img src='{1}' class='flowpaper_bttnTwoPage flowpaper_tbbutton flowpaper_viewmode flowpaper_twopage {0}' />", c.aa.Bb == U ? "flowpaper_tbbutton_pressed" : "", c.resources.oa.Ri) + String.format("<img src='{0}' class='flowpaper_tbbutton flowpaper_thumbview flowpaper_viewmode flowpaper_bttnThumbView' />", c.resources.oa.Ni) + String.format("<img src='{0}' class='flowpaper_tbbutton flowpaper_fitmode flowpaper_fitwidth flowpaper_bttnFitWidth' />", c.resources.oa.Hi) + String.format("<img src='{0}' class='flowpaper_tbbutton flowpaper_fitmode flowpaper_fitheight flowpaper_bttnFitHeight'/>", c.resources.oa.Gi) + String.format("<img src='{0}' class='flowpaper_tbbutton flowpaper_bttnRotate'/>", c.resources.oa.Ji) + String.format("<img src='{0}' class='flowpaper_tbseparator' />", e) : "") + (c.aa.config.document.ZoomToolsVisible ? String.format("<div class='flowpaper_slider flowpaper_zoomSlider' style='{0}'><div class='flowpaper_handle' style='{0}'></div></div>", eb.browser.msie && 9 > eb.browser.version ? c.Wk : "") + String.format("<input type='text' class='flowpaper_tbtextinput flowpaper_txtZoomFactor' style='width:40px;' />") + String.format("<img class='flowpaper_tbbutton flowpaper_bttnFullScreen' src='{0}' />", c.resources.oa.Ai) + String.format("<img src='{0}' class='flowpaper_tbseparator' style='margin-left:5px' />", e) : "") + (c.aa.config.document.NavToolsVisible ? String.format("<img src='{0}' class='flowpaper_tbbutton flowpaper_previous flowpaper_bttnPrevPage'/>", c.resources.oa.ki) + String.format("<input type='text' class='flowpaper_tbtextinput flowpaper_currPageNum flowpaper_txtPageNumber' value='1' style='width:50px;text-align:right;' />") + String.format("<div class='flowpaper_tblabel flowpaper_numberOfPages flowpaper_lblTotalPages'> / </div>") + String.format("<img src='{0}' class='flowpaper_tbbutton flowpaper_next flowpaper_bttnPrevNext'/>", c.resources.oa.mi) + String.format("<img src='{0}' class='flowpaper_tbseparator' />", e) : "") + "" + (c.aa.config.document.SearchToolsVisible ? String.format("<input type='text' class='flowpaper_tbtextinput flowpaper_txtSearch' style='width:70px;margin-left:4px' />") + String.format("<img src='{0}' class='flowpaper_find flowpaper_tbbutton flowpaper_bttnFind' />", c.resources.oa.wi) + String.format("<img src='{0}' class='flowpaper_tbseparator' />", e) : "") + f);
            jQuery(c.da).addClass("flowpaper_toolbarstd");
        } else {
            c.Df || (e = c.resources.oa.si, jQuery(c.da).html("" + (c.aa.config.document.ViewModeToolsVisible ? (!eb.platform.tc ? String.format("<img src='{0}' class='flowpaper_tbbutton_large flowpaper_viewmode flowpaper_singlepage {1} flowpaper_bttnSinglePage' style='margin-left:15px;'>", c.resources.oa.Ki, c.aa.Bb == P ? "flowpaper_tbbutton_pressed" : "") : "") + (!eb.platform.tc ? String.format("<img src='{0}' style='margin-left:-1px;' class='flowpaper_tbbutton_large flowpaper_viewmode  flowpaper_twopage {1} flowpaper_bttnTwoPage'>", c.resources.oa.Si, c.aa.Bb == U ? "flowpaper_tbbutton_pressed" : "") : "") + (!eb.platform.tc ? String.format("<img src='{0}' style='margin-left:-1px;' class='flowpaper_tbbutton_large flowpaper_viewmode flowpaper_thumbview flowpaper_bttnThumbView'>", c.resources.oa.Qi) : "") + (!eb.platform.tc ? String.format("<img src='{0}' style='margin-left:-1px;' class='flowpaper_tbbutton_large flowpaper_fitmode flowpaper_fitwidth flowpaper_bttnFitWidth'>", c.resources.oa.zi) : "") + (!eb.platform.tc ? String.format("<img src='{0}' style='margin-left:-1px;' class='flowpaper_tbbutton_large flowpaper_fitmode fitheight flowpaper_bttnFitHeight'>", c.resources.oa.Ii) : "") + "" : "") + (c.aa.config.document.ZoomToolsVisible ? String.format("<img class='flowpaper_tbbutton_large flowpaper_bttnZoomIn' src='{0}' style='margin-left:5px;' />", c.resources.oa.Ti) + String.format("<img class='flowpaper_tbbutton_large flowpaper_bttnZoomOut' src='{0}' style='margin-left:-1px;' />", c.resources.oa.Ui) + (!eb.platform.tc ? String.format("<img class='flowpaper_tbbutton_large flowpaper_bttnFullScreen' src='{0}' style='margin-left:-1px;' />", c.resources.oa.Bi) : "") + "" : "") + (c.aa.config.document.NavToolsVisible ? String.format("<img src='{0}' class='flowpaper_tbbutton_large flowpaper_previous flowpaper_bttnPrevPage' style='margin-left:15px;'/>", c.resources.oa.li) + String.format("<input type='text' class='flowpaper_tbtextinput_large flowpaper_currPageNum flowpaper_txtPageNumber' value='1' style='width:70px;text-align:right;' />") + String.format("<div class='flowpaper_tblabel_large flowpaper_numberOfPages flowpaper_lblTotalPages'> / </div>") + String.format("<img src='{0}'  class='flowpaper_tbbutton_large flowpaper_next flowpaper_bttnPrevNext'/>", c.resources.oa.ni) + "" : "") + (c.aa.config.document.SearchToolsVisible ? String.format("<input type='text' class='flowpaper_tbtextinput_large flowpaper_txtSearch' style='margin-left:15px;width:130px;' />") + String.format("<img src='{0}' class='flowpaper_find flowpaper_tbbutton_large flowpaper_bttnFind' style=''/>", c.resources.oa.yi) + "" : "")), jQuery(c.da).addClass("flowpaper_toolbarios"));
        }
        jQuery(c.ga).bind("onDocumentLoaded", function() {
            jQuery(c.da).find(".flowpaper_bttnPercent").hide();
        });
    };
    this.wh = function(c) {
        c = this.yb = c.split("\n");
        jQuery(this.da).find(".flowpaper_bttnPrint").attr("title", this.Ia(c, "Print"));
        jQuery(this.da).find(".flowpaper_bttnSinglePage").attr("title", this.Ia(c, "SinglePage"));
        jQuery(this.da).find(".flowpaper_bttnTwoPage, .flowpaper_bttnBookView").attr("title", this.Ia(c, U));
        jQuery(this.da).find(".flowpaper_bttnThumbView").attr("title", this.Ia(c, V));
        jQuery(this.da).find(".flowpaper_bttnFitWidth").attr("title", this.Ia(c, "FitWidth"));
        jQuery(this.da).find(".flowpaper_bttnFitHeight").attr("title", this.Ia(c, "FitHeight"));
        jQuery(this.da).find(".flowpaper_bttnFitHeight").attr("title", this.Ia(c, "FitPage"));
        jQuery(this.da).find(".flowpaper_zoomSlider").attr("title", this.Ia(c, "Scale"));
        jQuery(this.da).find(".flowpaper_txtZoomFactor").attr("title", this.Ia(c, "Scale"));
        jQuery(this.da).find(".flowpaper_bttnFullScreen, .flowpaper_bttnFullscreen").attr("title", this.Ia(c, "Fullscreen"));
        jQuery(this.da).find(".flowpaper_bttnPrevPage").attr("title", this.Ia(c, "PreviousPage"));
        jQuery(this.da).find(".flowpaper_txtPageNumber").attr("title", this.Ia(c, "CurrentPage"));
        jQuery(this.da).find(".flowpaper_bttnPrevNext").attr("title", this.Ia(c, "NextPage"));
        jQuery(this.da).find(".flowpaper_txtSearch, .flowpaper_bttnTextSearch").attr("title", this.Ia(c, "Search"));
        jQuery(this.da).find(".flowpaper_bttnFind").attr("title", this.Ia(c, "Search"));
        var e = this.aa.Pd && 0 < this.aa.Pd.length ? this.aa.Pd : this.aa.ja;
        e.find(".flowpaper_bttnHighlight").find(".flowpaper_tbtextbutton").html(this.Ia(c, "Highlight", "Highlight"));
        e.find(".flowpaper_bttnComment").find(".flowpaper_tbtextbutton").html(this.Ia(c, "Comment", "Comment"));
        e.find(".flowpaper_bttnStrikeout").find(".flowpaper_tbtextbutton").html(this.Ia(c, "Strikeout", "Strikeout"));
        e.find(".flowpaper_bttnDraw").find(".flowpaper_tbtextbutton").html(this.Ia(c, "Draw", "Draw"));
        e.find(".flowpaper_bttnDelete").find(".flowpaper_tbtextbutton").html(this.Ia(c, "Delete", "Delete"));
        e.find(".flowpaper_bttnShowHide").find(".flowpaper_tbtextbutton").html(this.Ia(c, "ShowAnnotations", "Show Annotations"));
    };
    this.Ia = function(c, e, f) {
        for (var g = 0; g < c.length; g++) {
            var n = c[g].split("=");
            if (n[0] == e) {
                return n[1];
            }
        }
        return f ? f : r;
    };
    this.bindEvents = function() {
        var c = this;
        jQuery(c.da).find(".flowpaper_tbbutton_large, .flowpaper_tbbutton").each(function() {
            jQuery(this).data("minscreenwidth") && parseInt(jQuery(this).data("minscreenwidth")) > window.innerWidth && jQuery(this).hide();
        });
        if (0 == c.aa.ja.find(".flowpaper_printdialog").length) {
            var e = c.Ia(c.yb, "Enterpagenumbers", "Enter page numbers and/or page ranges separated by commas. For example 1,3,5-12"),
              e = e.replace("1,3,5-12", "2-5");
            c.aa.Kf ? c.aa.ja.prepend("<div id='modal-print' class='modal-content flowpaper_printdialog' style='overflow:hidden;;'><div style='background-color:#fff;color:#000;padding:10px 10px 10px 10px;height:205px;padding-bottom:20px;'>It's not possible to print from within the Desktop Publisher. <br/><br/>You can try this feature by clicking on 'Publish' and then 'View in Browser'.<br/><br/><a class='flowpaper_printdialog_button' id='" + c.qf + "'>OK</a></div></div>") : c.aa.ja.prepend("<div id='modal-print' class='modal-content flowpaper_printdialog' style='overflow:hidden;'><font style='color:#000000;font-size:11px'><b>" + c.Ia(c.yb, "Selectprintrange", "Select print range") + "</b></font><div style='width:98%;padding-top:5px;padding-left:5px;background-color:#ffffff;'><table border='0' style='margin-bottom:10px;'><tr><td><input type='radio' name='PrintRange' checked='checked' id='" + c.zg + "'/></td><td>" + c.Ia(c.yb, "All", "All") + "</td></tr><tr><td><input type='radio' name='PrintRange' id='" + c.Ag + "'/></td><td>" + c.Ia(c.yb, "CurrentPage", "Current Page") + "</td></tr><tr><td><input type='radio' name='PrintRange' id='" + c.Bg + "'/></td><td>" + c.Ia(c.yb, "Pages", "Pages") + "</td><td><input type='text' style='width:120px' id='" + c.of + "' /><td></tr><tr><td colspan='3'>" + e + "</td></tr></table><a id='" + c.Cg + "' class='flowpaper_printdialog_button'>" + c.Ia(c.yb, "Print", "Print") + "</a>&nbsp;&nbsp;<a class='flowpaper_printdialog_button' id='" + c.qf + "'>" + c.Ia(c.yb, "Cancel", "Cancel") + "</a><span id='" + c.rh + "' style='padding-left:5px;'></span><div style='height:5px;display:block;margin-top:5px;'>&nbsp;</div></div></div>");
        }
        jQuery("input:radio[name=PrintRange]:nth(0)").attr("checked", q);
        c.aa.config.Toolbar ? (jQuery(c.da).find(".flowpaper_txtZoomFactor").bind("click", function() {
            if (!jQuery(this).hasClass("flowpaper_tbbutton_disabled")) {
                return y;
            }
        }), jQuery(c.da).find(".flowpaper_currPageNum").bind("click", function() {
            jQuery(c.da).find(".flowpaper_currPageNum").focus();
        }), jQuery(c.da).find(".flowpaper_txtSearch").bind("click", function() {
            jQuery(c.da).find(".flowpaper_txtSearch").focus();
            return y;
        }), jQuery(c.da).find(".flowpaper_bttnFind").bind("click", function() {
            c.searchText(jQuery(c.da).find(".flowpaper_txtSearch").val());
            jQuery(c.da).find(".flowpaper_bttnFind").focus();
            return y;
        })) : (jQuery(c.da).find(".flowpaper_bttnFitWidth").bind("click", function() {
            jQuery(this).hasClass("flowpaper_tbbutton_disabled") || (c.aa.fitwidth(), jQuery("#toolbar").trigger("onFitModeChanged", "Fit Width"));
        }), jQuery(c.da).find(".flowpaper_bttnFitHeight").bind("click", function() {
            jQuery(this).hasClass("flowpaper_tbbutton_disabled") || (c.aa.fitheight(), jQuery("#toolbar").trigger("onFitModeChanged", "Fit Height"));
        }), jQuery(c.da).find(".flowpaper_bttnTwoPage").bind("click", function() {
            jQuery(this).hasClass("flowpaper_tbbutton_disabled") || (c.aa.Bb == R ? c.aa.switchMode(R) : c.aa.switchMode(U));
        }), jQuery(c.da).find(".flowpaper_bttnSinglePage").bind("click", function() {
            (!c.aa.config.document.TouchInitViewMode || !c.aa.config.document.TouchInitViewMode == X) && eb.platform.touchonlydevice ? c.aa.switchMode(X, c.aa.getCurrPage()) : c.aa.switchMode(P, c.aa.getCurrPage() - 1);
        }), jQuery(c.da).find(".flowpaper_bttnThumbView").bind("click", function() {
            c.aa.switchMode("Tile");
        }), jQuery(c.da).find(".flowpaper_bttnPrint").bind("click", function() {
            eb.platform.touchonlydevice ? c.aa.printPaper("current") : (jQuery("#modal-print").css("background-color", "#dedede"), c.aa.Ih = jQuery("#modal-print").smodal({
                minHeight: 255,
                appendTo: c.aa.ja
            }), jQuery("#modal-print").parent().css("background-color", "#dedede"));
        }), jQuery(c.da).find(".flowpaper_bttnDownload").bind("click", function() {
            window.zine ? (window.open(FLOWPAPER.lg(c.document.PDFFile, c.aa.getCurrPage()), "windowname3", r), 0 < c.document.PDFFile.indexOf("[*,") && (-1 == c.document.PDFFile.indexOf("[*,2,true]") && 1 < c.aa.getTotalPages() && 1 < c.aa.getCurrPage()) && window.open(FLOWPAPER.lg(c.document.PDFFile, c.aa.getCurrPage() - 1), "windowname4", r)) : window.open(FLOWPAPER.lg(c.document.PDFFile, c.aa.getCurrPage()), "windowname4", r);
            return y;
        }), jQuery(c.da).find(".flowpaper_bttnOutline").bind("click", function() {
            c.aa.Ej();
        }), jQuery(c.da).find(".flowpaper_bttnPrevPage").bind("click", function() {
            c.aa.previous();
            return y;
        }), jQuery(c.da).find(".flowpaper_bttnPrevNext").bind("click", function() {
            c.aa.next();
            return y;
        }), jQuery(c.da).find(".flowpaper_bttnZoomIn").bind("click", function() {
            c.aa.ba == U || c.aa.ba == R ? c.aa.ca.Ne() : (c.aa.ba == P || c.aa.ba == X) && c.aa.ZoomIn();
        }), jQuery(c.da).find(".flowpaper_bttnZoomOut").bind("click", function() {
            c.aa.ba == U || c.aa.ba == R ? c.aa.ca.zd() : (c.aa.ba == P || c.aa.ba == X) && c.aa.ZoomOut();
        }), jQuery(c.da).find(".flowpaper_txtZoomFactor").bind("click", function() {
            if (!jQuery(this).hasClass("flowpaper_tbbutton_disabled")) {
                return jQuery(c.da).find(".flowpaper_txtZoomFactor").focus(), y;
            }
        }), jQuery(c.da).find(".flowpaper_currPageNum").bind("click", function() {
            jQuery(c.da).find(".flowpaper_currPageNum").focus();
        }), jQuery(c.da).find(".flowpaper_txtSearch").bind("click", function() {
            jQuery(c.da).find(".flowpaper_txtSearch").focus();
            return y;
        }), jQuery(c.da).find(".flowpaper_bttnFullScreen, .flowpaper_bttnFullscreen").bind("click", function() {
            c.aa.openFullScreen();
        }), jQuery(c.da).find(".flowpaper_bttnFind").bind("click", function() {
            c.searchText(jQuery(c.da).find(".flowpaper_txtSearch").val());
            jQuery(c.da).find(".flowpaper_bttnFind").focus();
            return y;
        }), jQuery(c.da).find(".flowpaper_bttnTextSelect").bind("click", function() {
            c.aa.Ma = "flowpaper_selected_default";
            jQuery(c.da).find(".flowpaper_bttnTextSelect").addClass("flowpaper_tbbutton_pressed");
            jQuery(c.da).find(".flowpaper_bttnHand").removeClass("flowpaper_tbbutton_pressed");
            c.aa.setCurrentCursor("TextSelectorCursor");
        }), jQuery(c.da).find(".flowpaper_bttnHand").bind("click", function() {
            jQuery(c.da).find(".flowpaper_bttnHand").addClass("flowpaper_tbbutton_pressed");
            jQuery(c.da).find(".flowpaper_bttnTextSelect").removeClass("flowpaper_tbbutton_pressed");
            c.aa.setCurrentCursor("ArrowCursor");
        }), jQuery(c.da).find(".flowpaper_bttnRotate").bind("click", function() {
            c.aa.rotate();
        }));
        jQuery("#" + c.of).bind("keydown", function() {
            jQuery(this).focus();
        });
        jQuery(c.da).find(".flowpaper_currPageNum, .flowpaper_txtPageNumber").bind("keydown", function(e) {
            if (!jQuery(this).hasClass("flowpaper_tbbutton_disabled")) {
                if ("13" != e.keyCode) {
                    return;
                }
                c.gotoPage(this);
            }
            return y;
        });
        jQuery(c.da).find(".flowpaper_txtSearch").bind("keydown", function(e) {
            if ("13" == e.keyCode) {
                return c.searchText(jQuery(c.da).find(".flowpaper_txtSearch").val()), y;
            }
        });
        jQuery(c.da).bind("onZoomFactorChanged", function(e, g) {
            var n = Math.round(100 * (g.wd / c.aa.document.MaxZoomSize) * c.aa.document.MaxZoomSize) + "%";
            jQuery(c.da).find(".flowpaper_txtZoomFactor").val(n);
            c.wd != g.wd && (c.wd = g.wd, jQuery(c.aa).trigger("onScaleChanged", g.wd));
        });
        jQuery(c.ga).bind("onDocumentLoaded", function(e, g) {
            2 > g ? jQuery(c.da).find(".flowpaper_bttnTwoPage").addClass("flowpaper_tbbutton_disabled") : jQuery(c.da).find(".flowpaper_bttnTwoPage").removeClass("flowpaper_tbbutton_disabled");
        });
        jQuery(c.da).bind("onCursorChanged", function(e, g) {
            "TextSelectorCursor" == g && (jQuery(c.da).find(".flowpaper_bttnTextSelect").addClass("flowpaper_tbbutton_pressed"), jQuery(c.da).find(".flowpaper_bttnHand").removeClass("flowpaper_tbbutton_pressed"));
            "ArrowCursor" == g && (jQuery(c.da).find(".flowpaper_bttnHand").addClass("flowpaper_tbbutton_pressed"), jQuery(c.da).find(".flowpaper_bttnTextSelect").removeClass("flowpaper_tbbutton_pressed"));
        });
        jQuery(c.da).bind("onFitModeChanged", function(e, g) {
            jQuery(".flowpaper_fitmode").each(function() {
                jQuery(this).removeClass("flowpaper_tbbutton_pressed");
            });
            "FitHeight" == g && jQuery(c.da).find(".flowpaper_bttnFitHeight").addClass("flowpaper_tbbutton_pressed");
            "FitWidth" == g && jQuery(c.da).find(".flowpaper_bttnFitWidth").addClass("flowpaper_tbbutton_pressed");
        });
        jQuery(c.da).bind("onProgressChanged", function(e, g) {
            jQuery("#lblPercent").html(100 * g);
            1 == g && jQuery(c.da).find(".flowpaper_bttnPercent").hide();
        });
        jQuery(c.da).bind("onViewModeChanged", function(e, g) {
            jQuery(c.ga).trigger("onViewModeChanged", g);
            jQuery(".flowpaper_viewmode").each(function() {
                jQuery(this).removeClass("flowpaper_tbbutton_pressed");
            });
            if ("Portrait" == c.aa.ba || "SinglePage" == c.aa.ba) {
                jQuery(c.da).find(".flowpaper_bttnSinglePage").addClass("flowpaper_tbbutton_pressed"), jQuery(c.da).find(".flowpaper_bttnFitWidth").removeClass("flowpaper_tbbutton_disabled"), jQuery(c.da).find(".flowpaper_bttnFitHeight").removeClass("flowpaper_tbbutton_disabled"), jQuery(c.da).find(".flowpaper_bttnPrevPage").removeClass("flowpaper_tbbutton_disabled"), jQuery(c.da).find(".flowpaper_bttnPrevNext").removeClass("flowpaper_tbbutton_disabled"), jQuery(c.da).find(".flowpaper_bttnTextSelect").removeClass("flowpaper_tbbutton_disabled"), jQuery(c.da).find(".flowpaper_zoomSlider").removeClass("flowpaper_tbbutton_disabled"), jQuery(c.da).find(".flowpaper_txtZoomFactor").removeClass("flowpaper_tbbutton_disabled"), c.aa.toolbar && c.aa.toolbar.$b && c.aa.toolbar.$b.enable();
            }
            if ("TwoPage" == c.aa.ba || "BookView" == c.aa.ba || c.aa.ba == ea) {
                jQuery(c.da).find(".flowpaper_bttnBookView").addClass("flowpaper_tbbutton_pressed"), jQuery(c.da).find(".flowpaper_bttnTwoPage").addClass("flowpaper_tbbutton_pressed"), jQuery(c.da).find(".flowpaper_bttnFitWidth").addClass("flowpaper_tbbutton_disabled"), jQuery(c.da).find(".flowpaper_bttnFitHeight").addClass("flowpaper_tbbutton_disabled"), jQuery(c.da).find(".flowpaper_bttnPrevPage").removeClass("flowpaper_tbbutton_disabled"), jQuery(c.da).find(".flowpaper_bttnPrevNext").removeClass("flowpaper_tbbutton_disabled"), jQuery(c.da).find(".flowpaper_bttnTextSelect").removeClass("flowpaper_tbbutton_disabled"), eb.platform.touchdevice && (jQuery(c.da).find(".flowpaper_zoomSlider").addClass("flowpaper_tbbutton_disabled"), jQuery(c.da).find(".flowpaper_txtZoomFactor").addClass("flowpaper_tbbutton_disabled"), c.aa.toolbar.$b && c.aa.toolbar.$b.disable()), !eb.platform.touchdevice && !eb.browser.msie && (jQuery(c.da).find(".flowpaper_zoomSlider").removeClass("flowpaper_tbbutton_disabled"), jQuery(c.da).find(".flowpaper_txtZoomFactor").removeClass("flowpaper_tbbutton_disabled"), c.aa.toolbar.$b && c.aa.toolbar.$b.enable());
            }
            "ThumbView" == c.aa.ba && (jQuery(c.da).find(".flowpaper_bttnThumbView").addClass("flowpaper_tbbutton_pressed"), jQuery(c.da).find(".flowpaper_bttnFitWidth").addClass("flowpaper_tbbutton_disabled"), jQuery(c.da).find(".flowpaper_bttnFitHeight").addClass("flowpaper_tbbutton_disabled"), jQuery(c.da).find(".flowpaper_bttnPrevPage").addClass("flowpaper_tbbutton_disabled"), jQuery(c.da).find(".flowpaper_bttnPrevNext").addClass("flowpaper_tbbutton_disabled"), jQuery(c.da).find(".flowpaper_bttnTextSelect").addClass("flowpaper_tbbutton_disabled"), jQuery(c.da).find(".flowpaper_zoomSlider").addClass("flowpaper_tbbutton_disabled"), jQuery(c.da).find(".flowpaper_txtZoomFactor").addClass("flowpaper_tbbutton_disabled"), c.aa.toolbar && c.aa.toolbar.$b && c.aa.toolbar.$b.disable());
        });
        jQuery(c.da).bind("onFullscreenChanged", function(e, g) {
            g ? jQuery(c.da).find(".flowpaper_bttnFullscreen").addClass("flowpaper_tbbutton_disabled") : jQuery(c.da).find(".flowpaper_bttnFullscreen").removeClass("flowpaper_tbbutton_disabled");
        });
        jQuery(c.da).bind("onScaleChanged", function(e, g) {
            jQuery(c.ga).trigger("onScaleChanged", g);
            c.$b && c.$b.setValue(g, q);
        });
        jQuery("#" + c.qf).bind("click", function(e) {
            jQuery.smodal.close();
            e.stopImmediatePropagation();
            c.aa.Ih = r;
            return y;
        });
        jQuery("#" + c.Cg).bind("click", function() {
            var e = "";
            jQuery("#" + c.zg).is(":checked") && (c.aa.printPaper("all"), e = "1-" + c.aa.renderer.getNumPages());
            jQuery("#" + c.Ag).is(":checked") && (c.aa.printPaper("current"), e = jQuery(c.da).find(".flowpaper_txtPageNumber").val());
            jQuery("#" + c.Bg).is(":checked") && (e = jQuery("#" + c.of).val(), c.aa.printPaper(e));
            jQuery(this).html("Please wait");
            window.onPrintRenderingProgress = function(e) {
                jQuery("#" + c.rh).html("Processing page:" + e);
            };
            window.onPrintRenderingCompleted = function() {
                jQuery.smodal.close();
                c.aa.Ih = r;
                c.ga.trigger("onDocumentPrinted", e);
            };
            return y;
        });
        c.ml();
    };
    this.fj = function(c, e) {
        var f = this;
        if (0 != jQuery(f.da).find(".flowpaper_zoomSlider").length && f.$b == r) {
            f = this;
            this.Ed = c;
            this.Dd = e;
            if (window.zine) {
                var g = {
                    vi: 0,
                    Ei: f.aa.ga.width() / 2,
                    Fi: f.aa.ga.height() / 2
                };
                f.$b = new Slider(jQuery(f.da).find(".flowpaper_zoomSlider").get(0), {
                    callback: function(c) {
                        c * f.aa.document.MaxZoomSize >= f.aa.document.MinZoomSize && c <= f.aa.document.MaxZoomSize ? f.aa.gb(f.aa.document.MaxZoomSize * c, g) : c * f.aa.document.MaxZoomSize < f.aa.document.MinZoomSize ? f.aa.gb(f.aa.document.MinZoomSize, g) : c > f.aa.document.MaxZoomSize && f.aa.gb(f.aa.document.MaxZoomSize, g);
                    },
                    animation_callback: function(c) {
                        c * f.aa.document.MaxZoomSize >= f.aa.document.MinZoomSize && c <= f.aa.document.MaxZoomSize ? f.aa.gb(f.aa.document.MaxZoomSize * c, g) : c * f.aa.document.MaxZoomSize < f.aa.document.MinZoomSize ? f.aa.gb(f.aa.document.MinZoomSize, g) : c > f.aa.document.MaxZoomSize && f.aa.gb(f.aa.document.MaxZoomSize, g);
                    },
                    snapping: y
                });
            } else {
                jQuery(f.da).find(".flowpaper_zoomSlider > *").bind("mousedown", function() {
                    jQuery(f.da).find(".flowpaper_bttnFitWidth").removeClass("flowpaper_tbbutton_pressed");
                    jQuery(f.da).find(".flowpaper_bttnFitHeight").removeClass("flowpaper_tbbutton_pressed");
                }), f.$b = new Slider(jQuery(f.da).find(".flowpaper_zoomSlider").get(0), {
                    callback: function(c) {
                        jQuery(f.da).find(".flowpaper_bttnFitWidth, .flowpaper_bttnFitHeight").hasClass("flowpaper_tbbutton_pressed") && "up" === f.aa.Pf || (c * f.aa.document.MaxZoomSize >= f.Ed && c <= f.Dd ? f.aa.gb(f.aa.document.MaxZoomSize * c) : c * f.aa.document.MaxZoomSize < f.Ed ? f.aa.gb(f.Ed) : c > f.Dd && f.aa.gb(f.Dd));
                    },
                    animation_callback: function(c) {
                        jQuery(f.da).find(".flowpaper_bttnFitWidth, .flowpaper_bttnFitHeight").hasClass("flowpaper_tbbutton_pressed") && "up" === f.aa.Pf || (c * f.aa.document.MaxZoomSize >= f.Ed && c <= f.Dd ? f.aa.gb(f.aa.document.MaxZoomSize * c) : c * f.aa.document.MaxZoomSize < f.Ed ? f.aa.gb(f.Ed) : c > f.Dd && f.aa.gb(f.Dd));
                    },
                    snapping: y
                });
            }
            jQuery(f.da).find(".flowpaper_txtZoomFactor").bind("keypress", function(c) {
                if (!jQuery(this).hasClass("flowpaper_tbbutton_disabled") && 13 == c.keyCode) {
                    try {
                        var e = {
                              vi: 0,
                              Ei: f.aa.ga.width() / 2,
                              Fi: f.aa.ga.height() / 2
                          },
                          d = jQuery(f.da).find(".flowpaper_txtZoomFactor").val().replace("%", "") / 100;
                        f.aa.Zoom(d, e);
                    } catch (g) {}
                    return y;
                }
            });
        }
    };
    this.nl = function(c) {
        jQuery(c).val() > this.document.numPages && jQuery(c).val(this.document.numPages);
        (1 > jQuery(c).val() || isNaN(jQuery(c).val())) && jQuery(c).val(1);
    };
    this.jl = function(c) {
        this.aa.ba == U ? "1" == c ? jQuery(this.da).find(".flowpaper_txtPageNumber").val("1-2") : parseInt(c) <= this.document.numPages && 0 == this.document.numPages % 2 || parseInt(c) < this.document.numPages && 0 != this.document.numPages % 2 ? jQuery(this.da).find(".flowpaper_txtPageNumber").val(c + "-" + (c + 1)) : jQuery(this.da).find(".flowpaper_txtPageNumber").val(this.document.numPages) : this.aa.ba == R || this.aa.ba == ea ? "1" == c && !eb.platform.iphone ? jQuery(this.da).find(".flowpaper_txtPageNumber").val(this.ze(1, "1")) : parseInt(c) + 1 <= this.document.numPages && (!this.aa.ha || !this.aa.ha.nd) ? (0 != parseInt(c) % 2 && 1 < parseInt(c) && (c -= 1), jQuery(this.da).find(".flowpaper_txtPageNumber").val(this.ze(c, 1 < parseInt(c) ? c + "-" + (c + 1) : c))) : jQuery(this.da).find(".flowpaper_txtPageNumber").val(this.ze(c, c)) : "0" != c && jQuery(this.da).find(".flowpaper_txtPageNumber").val(this.ze(c, c));
    };
    this.Hk = function(c) {
        if (this.aa.labels) {
            for (var e = this.aa.labels.children(), f = 0; f < e.length; f++) {
                if (e[f].getAttribute("title") == c) {
                    return parseInt(e[f].getAttribute("pageNumber"));
                }
            }
        }
        return r;
    };
    this.ze = function(c, e, f) {
        0 == c && (c = 1);
        if (this.aa.labels) {
            var g = this.aa.labels.children();
            if (g.length > parseInt(c) - 1) {
                if (e = g[parseInt(c - 1)].getAttribute("title"), isNaN(e)) {
                    e = unescape(g[parseInt(c) - 1].getAttribute("title"));
                } else {
                    if (this.aa.ba == ea && 1 < parseInt(e) && parseInt(e) + 1 <= this.document.numPages && (!this.aa.ha || !this.aa.ha.nd) && !f) {
                        0 != parseInt(e) % 2 && (e = parseInt(e) - 1), e = e + "-" + (parseInt(e) + 1);
                    }
                }
            }
        }
        return e;
    };
    this.ml = function() {
        jQuery(this.da).find(".flowpaper_lblTotalPages").html(" / " + this.document.numPages);
    };
    this.gotoPage = function(c) {
        var e = this.Hk(jQuery(c).val());
        e ? this.aa.gotoPage(e) : 0 <= jQuery(c).val().indexOf("-") && this.aa.ba == U ? (c = jQuery(c).val().split("-"), !isNaN(c[0]) && !isNaN(c[1]) && (0 == parseInt(c[0]) % 2 ? this.aa.gotoPage(parseInt(c[0]) - 1) : this.aa.gotoPage(parseInt(c[0])))) : isNaN(jQuery(c).val()) || (this.nl(c), this.aa.gotoPage(jQuery(c).val()));
    };
    this.searchText = function(c) {
        this.aa.searchText(c);
    };
}
window.addCSSRule = function(g, c, d) {
    for (var e = r, f = 0; f < document.styleSheets.length; f++) {
        try {
            var m = document.styleSheets[f],
              n = m.cssRules || m.rules,
              l = g.toLowerCase();
            if (n != r) {
                e == r && (e = document.styleSheets[f]);
                for (var s = 0, h = n.length; s < h; s++) {
                    if (n[s].selectorText && n[s].selectorText.toLowerCase() == l) {
                        if (d != r) {
                            n[s].style[c] = d;
                            return;
                        }
                        m.deleteRule ? m.deleteRule(s) : m.removeRule ? m.removeRule(s) : n[s].style.cssText = "";
                    }
                }
            }
        } catch (A) {}
    }
    m = e || {};
    m.insertRule ? (n = m.cssRules || m.rules, m.insertRule(g + "{ " + c + ":" + d + "; }", n.length)) : m.addRule && m.addRule(g, c + ":" + d + ";", 0);
};
window.FlowPaper_Resources = function(g) {
    this.aa = g;
    this.oa = {};
    this.oa.wl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAQAAABuvaSwAAAAAXNSR0IArs4c6QAAAAJiS0dEAP+Hj8y/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2gEEFCsCTiK85wAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAADUSURBVCjPY2AYBViBPkEVjMgctbkfvzIw/mbd2ZCs8CzqG6Mzk0LfpHuM/7HqFP3Ptldzhd7WFhH5JMavLB3y/xn+e0XisEbsP0cOhKWQxPyKgYGBgfEJWwNCnglZMRMDV5TsHN9lDAxMDEzszC7mi/9L+39AyLOgeuAXq6oFJxsDAyPDf+5/M27+dOldPQGHM6T+8+YwMDAwHGFQSWJ/hSmP5gwWRgYGBgYbBmashqGINihY7Nj7kIGBgaGO3ebrnr14gnwpAwMDA8M8OH/+aDrFCwBelDJZ0XbhRgAAAABJRU5ErkJggg%3D%3D";
    this.oa.Mi = "data:image/gif;base64,R0lGODlhFAAUANUrAPPy86mpqevr65eXl/7+/oiIiHR0dNza3OTj5NPT0/n5+cTCxMvKy2tpa7y8vLKxsvX29V5dXsjHyN3e3efm5+/v79/e37i3uO3v7dXW1Z+en8XGxejo6LS2tHx7fMDBwM3Ozb++v42OjdjX2JOSk2xubPj3+Pz8/NDQ0Pv7+4OCg////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFBQArACwAAAAAFAAUAEAGtMCVcLj6kAwQk4I4DHg8FaZUOEEgqJqBxkFhohaLjYDoMRge05VJwE4JRYVDmghJJMZClKFRKkUaEBAAgwBLQ08Dc0MVVisiKiqKRAcHEysdJCQgkgwMlkwhGgGjDw8dDigQcxoNrQ0EAIKqUiNmJSJMKRAYGHhCGmaSKwIUURtPwisQCBMABZDJKxPTAQUF0RkZVyIiAcIHIAlDJAOJaRxhDFIa7KQdpw4OC4oARQ8XEhZTQQAh+QQFBQArACwAAAAAFAAUAEAGrcCVcLhaDFYekoM4fBQKAKZUKKBUhIiAJrAQMA8MBuhK9Hg605UCwB4OBpM0czKJCkceg96wajRKARBSKioackMQAhgrAyIkh0QIkisOAxoJkBkHCFIbD58dDg4LGyMmhwYlqn4NHmkHZgaPRBsCEG1DASqukAAYggwFKpBCCgJeJAUixEIUVQ8ks8QIExyMGg/TBwdDGltyFQniUgEBnw8hC6MbYcQMIR8onFJBACH5BAUFACsALAAAAAAUABQAQAagwJVwuNpoPKvBh0gkkZjQIQbDfDwkFSYikTkAiCKVyhFddSgQyFCjQZSJCoSbqPLYVwZDadXoH8Aib0wAXxokGoJEAosrHwEBI4kHEwJQDA6YCwsbDCATggF4eSV7DQNlKisep0wFDQZzQ2GJKxAAJisoIoG0K4QmAySstJUYHRrDiQIUWYgXtBwTsY+Sk1BWHZicDJ0JCYJqKBsSGRxRQQAh+QQFBQArACwAAAAAFAAUAEAGsMCVcLgCPUiiAIM43DweEKZU2GiQhAIGCISIEisCDEBB1Jgl05XDwBYIQw53ekgAYCpDy2CPLBRUKh6CI0QBAQ5zQyQGJSsXHR2JRFUGKyMLGwiSAAAmUhMJB6ITCAgUFSlzF0giIn+BAVMIZgOxRCgagpVNGraJbBorB4aSQhklJR8XT8VCJQ0GIA6IzSoGImoLKMUQ3UMMG0tpJnYAUiAJCRkHpaYCYYmeCKQC5lJBACH5BAUFACsALAAAAAAUABQAQAanwJVwuMp0BpoVijgEORzM6NBgSK4qmcxBCgEAIMyAGCRdhTzoinDDUJeHh0YDKqRoAhrNYEASFQoqKkwdDwtvQwMeBisbC3SHQgYlHisTICAckAslJFEcBwihAgIYGGBvIXoaJH1+D1IcYhoXTAkrgJRDDK+QK2hCFg4dvZGLH0/EK5IeGY3JJQ2dDAwjvQNyTQkZhxCnTAcHE6KjGF4AvQIUAhUmUkEAIfkEBQUAKwAsAAAAABQAFABABqLAlXAodGhWDyIxs1iYlNAo4DBBcBRRRgNEdHRWiehqUVCphiAQQAwtfYacwEqu0QwGJJFe6XBI2ENHHisgGwyASgZDGRkViA0NA1ACCBQCAhgAmk9sGwEanxokeV9RDw9yShlyBQVEKB2lgGZyCCshiEIHHh4bEhsLuUIeBmcgh8IrBpIJCRPJJUMH02wVkA1QVZUCK5kAEOCAKSsVAhUQYkEAIfkECQUAKwAsAAAAABQAFABABrPAlXC4skguj8+BOERkMgqmVChSBYQQAQYDSTE1pZIBRWQwFpPpiqEhaZoIiJo48XgkQ8HCwX90AoAaghZEICAjc0MBIiQrEwdLiUMFKiIrAggUcokeBldMEBgAEBAkDacDHHMJDh0dDw+BH1MVC7YMTBMXGgNvQxNmkisDJA+XCQnCjiIFDBMZkcIqBSQcE2nKHipvCAgCwhp2eQLfaiAG6FKiAOwQGqcNYoknKybuIg5TQQAh+QQJBQArACwAAAAAFAAUAEAGvsCVcGhajUaSA2LIBCAoCqaUGSBdhgBI6nPArjqqBunDPGQynKlwEtAEhgJBVM1EqAobbEIiYYRWfQ+CDyNMFgcWdEwXGgMrFRxpilQiGisQAABFkx4qjlIfBgYRDRElESorFIoUDAsLFw4PF7RqAiMgCV0rKUMLAQEPuysIIxmTQm0PjwgTyEONDAJPz8kkAQBx1SsBBQ4rAhUAzwEqIkPiAAR0CQV3UikEBwURBQMDKh4NJSTIZAUP3giYEgQAIfkECQUAKwAsAAAAABQAFABABrfAlXAIWFEmFsuqMmwKKqmmtHnRhIaiSEmjLK4Qq4JngGpyEAjMdPh5XIgnwnpKGmyIiFFGvxqNLh8hDgJOFIRzQwwBARYQAF6IQxcDASsAISIOkRYFBQ9rHgYRDaQeIisSiBR6IBISC68Hc0cTYCsmQxMODx8ZeAiQaxwPxLcCh5FCiygQFUzJQg4aAY7BkR0kmgQQtpEOIgNDBQ0RDHMjAwUaUhMqJaMD0yIiBiokkYSaD5oJU0EAIfkEBQUAKwAsAAAAABQAFABABrPAlXC4AggQFkqFOCQZSBCmVOgIgYQJj8GjmTAdmrCFCCibpisKiMGIrkolFJooCAQOQwVGcKQgEAcHGQkJS0MQiHNDKAsLKwYNDYpEHR0XKxolBh+TGgEbUgEeKqQiIiQDF4ZTRn4IExOCCFMKRhirQhUTCSBXQyZlkysMCyMrFQBukxUODgiQksIrDh0hJJHSKw8PEm9Pwgt2QwZbcweeGlIe6yoFp6ckqIoCKwGnAXJSQQAh+QQJBQArACwAAAAAFAAUAEAGrcCVcLgyVQSUCoBIbDQqzKhww8gIRyuVKoBghlaBAIWIgEAU0pUgk0iYhAZDIk2sdBwWIgCAwQgEKxQIExMHS0NOBXRDByAMKx4lJYtECw4fQh4eC5QPD49RKiIiJCQDGhoOixB8f4KDHGmsABBMAAgHB1ZDAwaqlAkgEysfTpRDDBtCksdCCwsbvQbNKw4OKCvTGscSHQ9DmosWAWChKgUFIgPrqGGLUCvrHWlBACH5BAUFACsALAAAAAAUABQAQAa/wJVwmFpBTJDjcOkoqQTL6HKUQAw1okLAKoSsUI7AYrL0NBoBqRBAsZCFHk9CHQUsJNzVwRN5JFcAABwCFBQAZU50SxQHIysaHiKKUSMgGSsXKgUbkysODhJSARoBJBoDpB0rFYoOHCaBFRUCtGohKhEGaSsEQxUIhYdCIiURnSsTExQrEmbHQiMZAholBc96lh0eKtcZGxYrKioaxwkLDEMkBQXoahQhFx9RCST1BQ+fHQ8aDyGdcw9AcGIVJQgAOw%3D%3D";
    this.oa.El = "data:image/gif;base64,R0lGODlhDwAPAOMGAPHx8f39/f7+/ujo6N3d3fr5+f///52dnf///////////////////////////////yH5BAEKAAgALAAAAAAPAA8AAARCEMlJ6zw4Y3uE+Z93VMdgnuZIHUTrtiqizbMcGp4HGuNR/MDgrwegaYqyVA5UGvRguB2L0MvodJrVzhCIrYyWsCUCADs%3D";
    this.oa.qi = "data:image/gif;base64,R0lGODlhAwAVAIABAJmZmf///yH5BAEKAAEALAAAAAADABUAAAINRBynaaje0pORrWnhKQA7";
    this.oa.Li = "data:image/gif;base64,R0lGODlhDwAPAOf/AAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///yH5BAEKAPgALAAAAAAPAA8AAAitAHEJFJgLmMFgwoQNI6aQ3b+HECM+FKbMocR//vrpy3cv1zGHqUKKFHmvXi1iFjH248dvnz579OTFEgZy5MiYroCBg5iRpUuY8lL9AnfP5khz5UzpIgpzXjx48N61Q4d0VC2il7Jq1Yr0Uyx295o+jToV6SZY7OptXTsu3KVW7OTJg+eO3bp16tCJC/eNkiN2ec2RGwcO3Ddv2bBZ+1Oo0SNGiiJLRmTJkaJDAQEAOw%3D%3D";
    this.oa.Ri = "data:image/gif;base64,R0lGODlhDwAPAOf/AAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///yH5BAEKAP4ALAAAAAAPAA8AAAjCAHEJFAgMGK5gwhIOIyZsGLt/ECEOixhRmLKHFJX968dPX757uY49TEXy37F/JFPdq1eLGMaN/4j982iPnrxYwkaWFIaSpE1XwMBF7PcP2Mx8NeWl+gXuXsp7v5ySNFfOlK6mNePd03Wv3Tp0VEfVanqp7L1a98peovopFrt7We/F6vqV6iZY7OqprQdLb9lx4S61YidPHjzCreSBFRfuGyVH7NSBHQfO0Tdv3LJhs/anUKNHjBSJLqQIESNLjhQdCggAOw%3D%3D";
    this.oa.Ni = "data:image/gif;base64,R0lGODlhDwAPAMZLAGZmZmxsbHl5eX5+foSEhIWFhYaGhoiIiImJiYqKiouLi4yMjI2NjY6OjpCQkJKSkpOTk5SUlJaWlqKioqenp6qqqqurq62trbCwsLGxsbW1tbi4uLm5ubq6ur29vcDAwMHBwcLCwsPDw8TExMfHx8rKyszMzNDQ0NbW1tnZ2dvb29zc3N7e3t/f3+Dg4OHh4ePj4+Tk5OXl5ebm5ujo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAH8ALAAAAAAPAA8AAAepgBuCghwfHyAhiSEjISI4S5CRkpAhJzgCAAJLmAJJnEMflgAmAEujAEinQR4lOAEAAUqvAUazPhwkj5FHRURDQb1BGiOXmUqcQJw+GR04p0OnPac1ExiusD+zObMyEhc4Q0JAPz08Ozk3NjQyERXFAj+cOZwyDxbOpDynN6cvDhTXAuiYRWNWiwUNcKibEQOGixYsVqhIgWIAAQUMEhzYuNEAAggRDhQIBAA7";
    this.oa.Hi = "data:image/gif;base64,R0lGODlhDwAPAOf/AAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///yH5BAEKAOAALAAAAAAPAA8AAAjRAHEJFJgLWDBhCIUNI6bwn8OHEB8KUxbxn79+/Pbpy3cv17GI/vhlzIfvXr1axCBe1MjRHj15sYT9gyemmEiS9+Z9cfbOFTB4Zr4Uc0cP3zx05IIKS/ULzJcvYMCssmct6lMwpnTRm7Pznr158eC1MyOm2aha8vK1GVaPXth26cBQO/cpFjyv9MC+a7dOHTpz5TbBgtdWHrx37NalO1duXLhLreDJM+yOnV9z5MSF+0bJkeW/5MZ988ZtWzZs1v4UavSIkaLXihAxqmTJkaJDAQEAOw%3D%3D";
    this.oa.Gi = "data:image/gif;base64,R0lGODlhDwAPAOf/AAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///yH5BAEKANUALAAAAAAPAA8AAAjXAHEJxJULGLBgwhIKG0Zs4b+HEMHIg/hQGDSK/+h8MQPPXz9++4BdhOjmi0kx/EDm66WMIjJpYIwR26cv371cxyj68wfm3b58+O7Vq0UMokd+YObZtEdPXixd+37es1dvXjx47tqxSycKVr168uC9cwcmXbpz5caFs9RKXlh37NaB4WaOnLhw3yipihcP7jl0YK7dBeetm6RV7tytUwfGzJcyX75546YN0il2W89FC2PyF7dt2rAxcqROXd1xxsDc0rYtGzZrfggtaoSodm1DiSZRYoSoUEAAOw%3D%3D";
    this.oa.Ai = "data:image/gif;base64,R0lGODlhEQAOAMIGAGZmZm9vb4eHh4yMjLKyssrKyv///////yH5BAEKAAcALAAAAAARAA4AAAMweLrcDDDK+MK4GMM33Npf5x2gAoheSaKOeo4kwMHuZMvfPXlE7xOwgmBIFBRgSEUCADs%3D";
    this.oa.ki = "data:image/gif;base64,R0lGODlhDwAPAMZsAAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra////////////////////////////////////////////////////////////////////////////////yH5BAEHAH8ALAAAAAAPAA8AAAcrgH+Cg4SFhoNrh4ZriYqIjI6CjJCOk5SHlpeYlpF/nJ2TnZKNoqSip6iKgQA7";
    this.oa.mi = "data:image/gif;base64,R0lGODlhDwAPAMZsAAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra////////////////////////////////////////////////////////////////////////////////yH5BAEHAH8ALAAAAAAPAA8AAAcqgH+Cg4SFhWuGiX9riIqEjI2Oi5CSk5SOkJeJmZGbmoqfoJ2YlaWmp4SBADs%3D";
    this.oa.Kl = "data:image/gif;base64,R0lGODlhEAAPAIABAGtrawAAACH5BAEKAAEALAAAAAAQAA8AAAIkjI+pi+DhgJGMnrfsxEnDqHgRN3WjJp5Wel6mVzbsR8HMjScFADs%3D";
    this.oa.Al = "data:image/gif;base64,R0lGODlhEAAPAIQYADk5OUJCQk1NTVVVVV9fX2ZmZuHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O7u7u/v7/Dw8PLy8vT09PX19QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEKAB8ALAAAAAAQAA8AAAVa4CeOZGmORXGSaTFJ6VpUVBFBxRKXc33nhYOKZam4YI6CYoiiSW4PnRCVKlJeEQdjKSpcak7oIjH9zC5WLGSLYM7CkEeDbGCaC5RnfF7mXfUMdix6cgmCKyYhADs%3D";
    this.oa.wi = "data:image/gif;base64,R0lGODlhDwAPAMZBAOzs7GBgYEpKSj8/Qz09QUhISEtLSxkZGff39y8vLxYVG2dnaKKiooiIiG1tbczMzJCPk05OTt3c4dzc3B0dHY+PjzQ1NU1MT5mZmTY1Oy0tLfj4+NjX1u/v7z09PdLS0uvq6pmZltXV1k1MTiEhIe7u8OPj5O3t7c3Nzfb29ezr7pWVmdfX1/v7++nn6dXV1YyMjcbGxklJSdLR09LR0uPj44+PklNTVPLy8vn499TU1pKSkn5+fujo6CIhJtrZ2wAAAP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEKAH8ALAAAAAAPAA8AAAdngH+Cg4SFhC40LIaFPxYJBxWLgjoEMEEoMjuLPRk2QUEAMR4MhjMKKkEtOA88EYYiPhKfNR0BDosrAyZBCBgUL5IQGg0BJEACJ5IhNwsTBccbkoMpF0AGINKCJSNAHNmCAB853+TSgQA7";
    this.oa.Ji = "data:image/gif;base64,R0lGODlhEQAQAOcAAAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///yH5BAEHAP8ALAAAAAARABAAAAjcAP8JHDhQmcGDBgkC+6FH4LJs4Lp1A5dt2UBgSqIMRPZtHTp0674hG6hH48Bi2s6NG3dOWzGBQ5gMGfJEoLGUK1saG8jFSZCBwbCRCxeOHLZgBNsQ/GWNHDhw5Kz9IkjVV9Nv36L2cuRoESJEgv786dMHT5063cJJy9Uo2rZp06A9e2bQ2S+0atmCk1euHDly4rhxG9esTrhz1Ww14rbuqTdv3KxZ65asjjRqyGgtbgzuceTJyezQGq15b9+/gQc7s0OwkTRucOXSVWaX9UCuir4G8uOHDx+zdQgGBAA7";
    this.oa.Fl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAdCAYAAAAgqdWEAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wDCAAZMw/s7MUAAAPsSURBVEjHvVffTyJXFP4Ogq4D4ccMlAimqxiXl5I0G6P/wJZmq131tfvcTbr/QbP/zbbvW7fafehu9RXTNiHUiE9gJQQVVkdWhDhzTx/44cAMA+xqTzK5cOfm3O9+5zvn3CEYLJvNcrVaRa1WgxACd2UulwterxeKokCSJAQCAQIAai9IpVI8Pj4OWZYxNTWFu7ZcLodisYhoNIpgMAhZlskJANvb2+zz+RCbm+MWQDYC7WPcGsnmP/WMnfezsRhkWUY2mwVz8xVls1lWVRXxeBxutwc9QPqBGwbsMMZnZ+/p4OAAsdkYnKqqIhqNYlKSWLCw3WxzcxO/vHqFYYGsra9jZWXFkpm2+fx+DoVCVHlfgaPRaCAYDjMTYdDzUUcfwu/M3ByrqgqnruuA6HtS6hp5VCQw+iYb/9A0DU4AoLaCzPoYRdDWp2EeBLfj19mkUvRmCFtkycjUMAQbfPdjpUNEE8wNOCsWOuLj0XkhHkxoNzOGXSyY+cQsZthmk4kZiKGAQ7vWRsKhXWsDfHdbSzNsCtPFxQXevPmN/slksLi4RN8+eYKJexMjgZm4NwEmpl9fv8buboq+SCTw+PE38Hq9/cPEbIb/808vkU6nAQBHhSMwCySTSSwsLGBsbGxg7HRdhyzLYBY4Khzh5OQEf7x7h0q5jB+eP+/PDJhMmkmn051JoQt8qF7C6XTC7wu0wdv2JiIH168apGkaC110fKXTaeN+VtnEdtmEvb09vHjxo7WQ+s91it11j9a4Oy+7w0Q22UREEEJHo6F/UkckopvuzDbZxMRWFbc5wYzbMKMfi4QxCrhvO7gTMwBji6JHNEAPt4yGLPdyDirzxljflmbYrujZdG0wM2ZmZvHVo0cAEcYcDojmelsGHUTQhQCY8fvbt8jnc1ad3Kprm7NJURSqVCoAgIAcwJcPH370HfjPv/+iNhhFUXrKjLnOmE753dOn2NjYwL+Hh02KwdhNpbC1tQW3JBHMNz/DkRiXtRotLy9jcWmJqLX28/v3sbq62lvXOp8vTpfLhdPjYwRDn3V5fvAgjmffP8OHy0tIkgQWjFKphEq5jMqQOimVSmDBWFtbRzL5NTxuN3x+P1h0q+Ywn4PX6wVlMhmu1+sIhUII+BXTFcxUeCw+E/rFys5He81p+RiFQgHz8/NwJBIJqtfrOD8/x9l5BUzMzaLEYGI2ju2nvYbBzXJKDG49aM1x72h4h9bvk9MSisUiIpEIotHoTeB3dnbY4/FgcnIS09PTDAaBDIcyXtmo6zpGXXPG/20fN2OHxPxhHqqqIhwOIx6Pk6no7O/vc7VaxdXV1f/yrR0MBhGJRDoY/gMkxwIzT9ZCwQAAAABJRU5ErkJggg%3D%3D";
    this.oa.si = "data:image/gif;base64,R0lGODlhBgAqAKEBAJmZmf///////////yH+GkNyZWF0ZWQgd2l0aCBHSU1QIG9uIGEgTWFjACH5BAEKAAIALAAAAAAGACoAAAIkBBJmuOjPTlIR2hlbu05TzHWSMkohSFYn+m2h561svMKlbEcFADs%3D";
    this.oa.Ki = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAdCAYAAAAgqdWEAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wDCAAYCdD7BDYAAAMVSURBVEjHvVfdSuNQEP6mJEJjaG2aUtsorC3SKxHfwYfwB8HFfYPFB/ERll3cl7AoiBfe2gXjjbogZV1XbShoLWlmL5rEY9qkUVMHhsn5yZw53/yccwgCmabJ7XYbDw8PcBwH4yJZlpHJZJDP56EoCnK5HAEAeROOj495YmICmqahVCph3HRxcYFmswnDMKDrOjRNIwkA9vf3OZvNolKtsmsgi4aGELuSItoUkP74XKUCTdNgmiaY+0NkmiZbloVarYbJSRUBQ8KMi2NsHOL7+zs6OztDZa4CybIsGIaBtKKww87Qxb5sbQUXHjCEiPwdLi8vY2V1NRIZj7JTU1woFOj27happ6cn6MUiMxHCONYWmSHLMr5ub2Nvbw8/d3cpSqfIn6pVtiwLUq/XA5xQyF/lCkVRoCoKNE1DvV4HAKysrlOELr/Ptm2kAICY2WUI0v+OS91uF5IkYXFxEQBQr9fx4/s3CPqC7K8FABIAMDnBDBkWxCPJtm1Ml6axtr7GqqrSyckJDg8PYds2Nj9vcggqfiyl+i3ymAISDIrtql6vh1+NX2AQLS0tYWNjA7Ozszg6OvJ0iiyuST4yYEQgE99NjuNgZ2fHzy5ZlmHbtqeGQ2LH7+8bE1n531ZOmBndblewdPQ/bsywuHJSBe2lccQjM7ZvDDtjP4virOHGDEVlU2LQxIqZ59gao5sQ000UmU3JEMXNJiG4Ig+1ZLw0gAoHApg5xE2JIcQ81E084KbA0UzvLjLDoRlZxKTX1dj3BHDMokcf4KaQ03/QTQKCY8smJsSuM4lcrt5QZ0h8vqRkWcbN9TXY4VBOxJgI/Zfn58hkMqBGo8GdTgeFQgG5qfyAM4OFB0OeCWHvlSgd3pybf9e4urrC/Pw8UgsLC9TpdNBqtXDfuoV7/3SBZRalx94cBvfLNzHYZbh9HJTCGNzvvzd/0Gw2US6XYRjGc305ODhgVVWRTqcxMzPDYBBI2BQLgNCL6xi96BPbno5n6YN4+fsSlmWhWCyiVqvRQICenp5yu93G4+Pjh7y1dV1HuVz2bfgP5BfYXgA24coAAAAASUVORK5CYII%3D";
    this.oa.Si = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAdCAYAAAAgqdWEAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wDCAAUJ6CYRvUAAAPBSURBVEjHxZfNThtXFMd/Z/wh4VAbPKYIG1mNkeUVUkpC+gY067as0k0CPEfUXdRnaHbNl8kD2Nl4JFasmqgLjJIIwsJqQsGMLAEGz5wu7DFjYzupXZorXZ25H+fec8/5/8+9I/hKuVzWWq3G8fExrutyVSUUChGNRjFNk0gkwuTkpACIN2Fzc1PD4TDxeJyZmRmuuuzs7FCpVEilUiQSCeLxuAQBSqWSxmIxMnNz2jJQ/Yb2KdqSMqAtXbI9fj2TIR6PUy6XUW0OSblcVtu2yeVyXLs2Tpch/Yz7HGM/p2i1eijb29tkrmcI2rZNKpViLBJRV5s4cV1XDcMQgPX1dYqFQjOmIt4pOgz57dEjVldWLu3km8/3d+6wvLysgLiui2EYAMQmJnRqakoODg8w6vU6ielpVRFUBEcVCQRQEfL5vBQLBbLZLOFwuL3wpeNJbyepKuFwmGw2S7FQIJ/Pi4oggQCOKt6e38zNqW3bGI7jgIt41cAQXOTF8zwvi0VM0+Te/VUikUh/Zw8gXiQS4d79VUzT5GWxyIvneXDBwOjYt9FoYACIqrYqoqrPnj6hWCwAsLBwk1AgoPV6ve+G0sdjAPV6nVAgwMLCTQCKxQLPnj7B26slAQg23dw+mj7+/bFsbGyQyWS48e0NXVpaIhAI0Gg0+qNQ3L6AbjQaTMRj+uNPP/BVdJxXf7wSyyrhOA3u/ny3g4VGsyVeFcuySKfTrKytsbh4m/rZubx5+w7HcQZwXPoyy3Ec3rx9J/Wzc1m8/Z2srK2RTqexLKu9p6cf7MgQLcru7e3xy4MHnJ+fSy/29M04veDkuvz68GGbXaFQ6OJg2pmfgr0A6DjOQE/8GwB3s+vs7KyvXgsz7aMNlch8+sPoSacxOtqlOKx+t14LMzJamtchb4amXidmlBHDxJBhokeYREe7AIeEjKfX5RlR+TRJrwTA/qeFB2DVkcKkQxrTVJRuAI/2NhkewHI5z4z6QvqP9ILerT1KmGTIMEmvMPm8PBSbRkszF2ySUqmkC7du8aXLn69fEwyFQux/+EBi6usvZsj73R2i0ShGLBajWq1yVD1EVNqVHhJfW7r6e7UHreH1/b3/kWq1immaGPPz83J6esrR0RHVowNa789mshZVv/SqN0fRZhoVRVuVVp92S98Yre+P+39RqVRIJpOkUqkLnluWpePj44yNjTE7O6sogvj+m9QHbOl4jklHn7/trXEh24zdfb+LbdtMT0+Ty+XkEpW3tra0VqtxcnLyv/xrJxIJkslk24Z/AJjcAKCwx1DkAAAAAElFTkSuQmCC";
    this.oa.Qi = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAdCAYAAAAgqdWEAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wDCAAWLXJ7zWkAAAL7SURBVEjHzVdRTxpBEP7G3JGABOTuCJHzoUIMT77VtOkP8keYCpEafoR/5nxqJPbNB88XtYkhtRblQgKY6E0fuDsW2Fs51KaTbJa9b3Z3dma+2YUgiOu63O/3MRgM4Ps+3kt0XUcul4NpmshkMigUCgQAFCq0221OpVIwDAPr6+t4b7m6ukKn04Ft27AsC4ZhkAYAjuNwPp9HpVrlwEAWDY0RDnpSjGmmj/DNSgWGYcB1XTCPIXJdlz3PQ61Ww+pqFjOGxBm3iLGLCD883NPFxQUqmxVonufBtm2kMxn22U+y2as8E0p+bY2LxSJ177vQHh8fYZVKzJLdDup1AoBut0sAYJomAKDRbIoYAowEDAAowCiYR41mU7YNPlSrfHpyQtrz8zPgJ3S5St9PNC8aPz09QQMAYhZdGIUoPPXu7i4A4OjoCKF+6C0JpponC3VkkAYATP5sHihzRtBPirHEK5EjxsZM9p3yTCqVmjpZOGbQspjsgNOeASORZ8AqjrGKf7J1I8+Q4zj8+dMXjrFYVWfwBtSO1jlpfw/CRCwN07fmgZTa+/WGiE1RO8Ck1N6vN/BimJiTXYoq/WUxIWdImjNxFAUTlsSUOaNN8mo+TOo8XAp7mU0Uw6Y4ihLH0/4FbAHPEMsYoCherCiIjATY1F7kOA5/3NnhmDC9+xMiXOfH6WmUwCSLYat1KKX23t5XarUOMUPtEIMKi8uXCbWXOM5bY0IC/1e3drK7iUmV3EpsoTojXSL+9mVSYMp5cTmj6zpWdF3H3e0t2Oe5FnvCV2Cydn15iVwuBzo7O+PRaIRisYjCmjkXTFnhoQVf5ao1Qp27P7e4ubnB1tYWVra3t2k0GqHX6+Gh1wUT87g4MZiYxT5soQ6DxyWXGBw0BN94thcwBL9/3/1Cp9NBuVyGbduT+nJ8fMzZbBbpdBobGxsMBoGEQwnPweA7ID4Tw2/iOFxj0kdOvP55Dc/zUCqVUKvVaK7onJ+fc7/fx3A4/Cf/tS3LQrlcjmz4C6V4EUpXdwN6AAAAAElFTkSuQmCC";
    this.oa.zi = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAdCAYAAAAgqdWEAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wDCAAWE7Ma0MIAAAM+SURBVEjHxVdNT9tAEH0TESQCSsBxGhFzKOGQE5eKHxbshL8Q2/yocOWIesCcgEtUSsGxIvEhgaeHeDfrzTpJW1FGenrrnTe7Y3u86yUoFkURTyYTPD09IU1TfJSVy2VUq1XU63VUKhXs7OwQAJAQnJ+f8/r6OizLwu7uLj7arq+vMRqN4DgObNuGZVm0BgDD4ZBrtRraBwecJchqogXGGdOCa9JY+vfbbViWhSiKwDx1URRFnCQJOp0ONje3oCVSlNwqya5iHMePdHV1hfZ+G2tJksBxHGxUKpxy+ieT/dOTEVbb3uZGo0EPjw8ovb6+wm42mYnwWfh6cMBJkqD0/v4OpCADYGAB8rpd0vop60dBLJnGEXh7e0MJAIiZM0BhFPTBc7vI4uYAAJ7bNfoMYDWuBABMqQBrrLfhesezopn6chA+1zs2+hWo4/MsGZAAaZxre66nVTCRDtXvuR6ZNIbxSSYDlmCNAWaAgZ7rmr4nFv4shnVJz3Xzfs7Nl4ubJpMuAqHnuebPPPPn9Abree6SOaDWDAuQxuj13eKFRtFl7cK1qdd3SdPPxU2T4dSIfs9buPCZYhZZv+cVzqXUDAmw4JN+f4XFXOpnj3eJnfT76ny5uBJytcUkOAhPl+cy04v20v0qCE/V+XJx2aInwSqHwenCO1X0or1QHwanqn4urqQU4lzxMjEFYbjkLeVR/ERCLiheGZcVsDRSWPTDDwI2F7DUibbxNflBgNmOI/VQ5lIXPbmFQmG1Tb4fmh7NPPRE/NCs0+eaFfBqGGgJmTSqDfxw5bGVAl591/YHgVLA5l0bAPxB8Le7tgRrbMTAn9aQpmOm6U0O/MA0FheMK+NoOBzyt6MjfLZ9v7jAWrlcxv3dHezGl09L5PbmGtVqFaVarYY4jjGOH0FMEjAwlGvS+k3Xi8YQfb/ufyKOY9TrdZQODw/p5eUF4/EY8fgBWSWLxZ5Vlj8gmYahLaNZHBSfZMWHrP3z/gdGoxFarRYcx5n9mZ2dnfHW1hY2Njawt7fHYBBIOWawcsQg5SsW/aJPvRZjzFgeVW5ub5AkCZrNJjqdDs2dYS4vL3kymeD5+fm/nLVt20ar1ZI5/AZC6tu9dBzKcQAAAABJRU5ErkJggg%3D%3D";
    this.oa.Ii = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAdCAYAAAAgqdWEAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wDCAAVHAiInpAAAAMSSURBVEjHzVfbTuJQFF2bUBOJcimMoPgwI4n8XmmJ8wXQwlz8JE184gvsEzjJjEaYDENINBrtnof2HA71lJtx4iGLda6rq7uHfShBKb7v83Q6xd3dHYIgwFsVwzCQzWZRLBaRyWRQKBQIAEhM6PV6vLW1BdM0sb+/j7cug8EA19fXqFarKJVKME2T0gBwdnbGuVwOR7UaRwZZNZpQOGJa0KYYy/FPR0cwTRO+74M5HEr5vs+ZTAaVSgUEIgJxxIjqKkNpk5jXsCyo7ehDGlbHkc8XuF6vYzgc4tfPX0y9Xo+r1So+7O1x7M5Jc3fxqMBuNGT/99NTXjUyqs6g36fHx0ekHh4eUCqXmYmwLlQjwtgmOh9rNZ5MJkg9Pz8DAUgDaFiAHMvS7inHspCwlnQ6Ak9PT0gBADFzBCiMhD44trVwZzu2BXX+AkhdAKEZpkCAYxyvw3YaK/10bach1iZB1eeZGZAAxXiu7tjOWrnEsR2K1uug6pM0A5bgGAPMAANN294ouTVtW9VWdDHfL80Ei0BoOja9Jts2HXvJNcJ56XDPsC63yPLl6zddnlnLIIOT5sv+0AwHeA8lHdqmeGZ987NJp5OOQrjwMS0L75I2JYzrH9Nsy7yHyBDrBOTCzycny6KwNDKdbjcpKjIUYdKbFVJY9MPrdPg1G9PrdDA7cRgKxLXUpCePUCis1snzupsZ8bpQ9OKYXWt2HKwGd01DrtddWVuaWefU9tzOahFxO5ue2hIcYy1cb/Eecr2OTosTdJkJ6qnNpAE0LD7U9jytkbbnIWEt6XQEDMNAyjAMjG5vwQGvjVbbnTPSarsb6Vz1+8hms0jlcjmMx2P8Hf8J//NHgIahtAVarTBC7ZY3N2+Zhuj7PRpiPB6jWCyGCeni4oJ3d3eRz+eRL5hh4hPfDJI8S1XqnJf5NOm9IlYfjW5xc3ODSqWC4+NjklLn5+e8s7OD7e1tHB4ezkwIyZdmhCjN9alt9UZIHoEEAFc/rjCZTFAul1Gv1+lFCr+8vOTpdIr7+/v/8q5dKpVwcHAgPfwDmoUpP5Jd2SsAAAAASUVORK5CYII%3D";
    this.oa.Ti = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAdCAYAAAAgqdWEAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wEAwEtNTlGiyEAAAOcSURBVEjHxZfNbttGEMd/Q0ty5MhULFF1LPkQy0B1MuDXiN+hybXIpS1a9yGaB2lO6SPYQHPxJTmazsXOoURiVaYIAZZUWJweRFKstKTktmkXWCx3ZjmcnfnPB4XUcF1XB4MBt7e3hGHI5xrFYhHbtqnX62xsbLC1tSUAEh84OzvTUqlErVZjZ2eHzz0uLy/xPI9Wq4XjONRqNSkAnJycaLVapb2/r5GCmlY0Y2i0Ss5e5taEv9duU6vVcF0X1SlLXNfVIAjodDo8fFhhTpEs5ZJ9GIaoKqqKiGBZFiKyqoHU92/k4uKC9l6bQhAEtFotyhsbGmq48LGllhFERBBEp0SV6Ka5lolH9dEjbTQa0rvpYY3HY5ztbVUR/q/5ZH9fgyCgMJlMIMy0gphuk2E1WfJu7jt3d3cUAGK7GvCxFDNv3vzK619eA3B4eMizr54nhyaTCWtra8tcncgtAKiE8xGihigxYsb76EkqT8WyFCBkgpUN5oUonCozU85kBclQSABsu5oQHMeJZQnAWqGYeROTqwpzdzdYRrNSiQKUSqVEWKm0Dqpp/tJoWrAM4UqKGzE4CAbJ82g0glD+dlaOMKN5bsrV0n3vJgTP+21e1rJoWnSTqtk06Wj48fh4WWgDcPzD90b6Ty9frmYZVIyY0RCw5N+pjDOT5WNGyXCTzHhP9vawbZv3FxfU63VK6+uMRyN832c4HCaSm80m6w8e8Md4TK/X48tOh7hMrOQmyYimNbES3ouvX5huw6tXP8vbd28BaDQafPvNdxgTpq4YTSpqyrggSFQ8Za4SJ2ce7zyGd1NipVJJA3jRU1Flz8phEYCzy4Gq5pYDUsJFhJmoxWhK8bLLASpZyUQkzqhq9nP3upsKbQ8TNMIwnPY5UxBmRmUhr/isMsrlcvK8ublprhuWtdI3/nHVXviw3utqpqqdV5vyO72nR0fy9Ogo2euKPXBenrl3cxXjwOT/yNBxBK7UXBWLRQrFYpHup084jS/uhRVB0DDfJbqiyz5cXWLbNla1WsX3ffr+DaKSTAwrqb3M0U37PBkx7ffuNb7vU6/XsQ4ODmQ0GtHv9/H7vWlvL5r0+ek1nvEZRafpWxSNJhFN59cUj+j5uvsRz/NoNpu0Wq1Zfjk9PdVKpUK5XGZ3d1fRqScS8KXawb9kHU3qmC7sYxmzNcHJ1YcrgiBge3ubTqcjC6A6Pz/XwWDAcDj8T/61Hceh2WwmOvwJjz3t/SbNLJ0AAAAASUVORK5CYII%3D";
    this.oa.Ui = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAdCAYAAAAgqdWEAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wEAwEuF8cLmQYAAALYSURBVEjHzVfNbtpAEP7G2CQQZCe2KYqdQwCpPuW9qtzTh2geCq55gpheSC6oSUqMhRSgCjs9+AcHvMbkp+lIq/Xs2rOz334zsyZkxPd9nk6neHp6ghACHyWapkHXdViWhXq9jqOjIwIASl64urriarUK0zRxfHyMj5bhcIjRaATXdWHbNkzTJBUAer0eG4aBTrfLsYOcdVQiHPdUoNNan863Ox2Ypgnf98EcTZHv+xyGITzPw8FBA2uOyJxLdSEEmBnMDCKCoiggorIAcRA80mAwQKfdgRqGIVzXRa1eZ8FiY7GtyBCIiEAgjgaZ4p0WIpOIcXjIzWaTxo9jKIvFAnarxUyEz2qn3S6HYQh1uVwCQooC5e1Gghpt+bbwm+fnZ6gAkOCaw4+tnHmjvLCjAgCTWI8QzokSWTTl7ZZLOLIRhZEzK+fyUJAZpxILYQenImQyS+Ugw7JUEitMBfrWaNpABgIlN7kLb3eXmDNcdExlj+I10bR5TMz50CyXS1QqFQDA94uLN23/x+VlOWTAlMsZFgCU94jgF/AXc4YhOSZazZ2229B1HT8HA1iWhereHhbzOYIgwGw2Sy07joO9/X38WSwwHo/x1fOQlIlSx0SSaKqQks6dfzuX5ZhyVZtLRhMT5xlAVP1YRk7e+aTiyi6zExP4XcrB1mhaLVNQDsBEWxLLm5KJECK650QklNpR8Rq8dxRSlFJr/I9Vu6g2fcwduCjPfPrlStM0qJqm4eHuDnbzCz5Lbm+G0HUdimEYCIIAk+ARxJQ25PTI6LQ2nqcX2UjGfj/cIwgCWJYF5ezsjObzOSaTCYLJOLrbE6f3/GyftOQdBkfpmxgcN8RjvN5n5hA/3z/8wmg0guM4cF13lV/6/T43Gg3UajWcnJwwGATKkC9zHYzHE/rRi7GsnthY9SlPbm5vEIYhWq0WPM+jDVJdX1/zdDrFbDb7J//atm3DcZzUh7/MEqJMe2pkgAAAAABJRU5ErkJggg%3D%3D";
    this.oa.Bi = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAdCAYAAAAgqdWEAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wDCAAUOVqXe5YAAAPASURBVEjHvVfLbttGFD1HpIxIMWRboqxY9EYKBMELbws4yKZ110m2ydIfEHQXoB9QIIsa7Q80u/Qn2trwKkaXTiE5BSoHMAQ/ZD0gwNRC4u2CIsXHkJILpwMIw+Ednrlz77kPEb7RbDZlOBzi9vYWtm3jS410Oo1cLodCoYBsNou1tTUCAN0Nx8fHsrS0hHw+j42NDXzp0Wq10G63YZomDMNAPp+nDgAHBweysrKC6uPHMlVQ/IrGDJnOTFgzNHvySrWKfD6PZrMJEUfEZrMpg8EA9XodDx8uI6RInHKLKLvIkF6vy9PTU1QrVeiDwQCmaSKTzYotHk/k70+f+Mu7d7zpdECSIgLSO//OiogICoaBvb091Go17/3K6qoUi0XedG/Ao6Mj+WpnR8Iff//mDa3RCJVKxQPzKRM4BIBSFv6u1Woh8+ABfnj7Nuxq/PnhA/XJZALY0Zt2u11sbW3h9evv7o20P/+0j0ajAcwC1Tt3PB5DBwC611Pwg47oXjlD77ggjg4AQjtsNgFA27YhtGVONEXOipPZtk0RcTEjUegoA0JpGRICxoEnWUYtI8EZZmSvHrpjwDIQACJxqWS6ECasg3lGpowQdb5ylEnK/DbnXJh3MJiLqX495Ywo3eT4VxZ1RdyaM946YR7CDBFY7DgXx8r+UxRxesEYTN1zs4ozQdl91CaSDGOGoynBTbhfNykwg25iTDQRRDxl7m4ZgiQjmCHLUFQAEHrk5qKJLbFYMhIUAZwpgdXlQNc0txAuUg7muknXNCeaksoBRJ0R+/0+Wv+0MJnYnEwmd0wms6FpGlKpFHq9vqOIqFsRPa7IfP3NLv74/Tfs7/84t09xbxvXRvhbjd3db2P9G1u1Xzx7jlKxKFdXV9R0PXANzTU3puUirIQIXEuKr0Uora9jZ+fJvKodjSZqKT55+jSOI6Jw2cI9sACJeYZxJd9/QCqVwng8xq/v3/Py4gKZTMZPRpKEZVkoPXqEl69eUdd1JYaKe+l0Gno6ncb15SWM4roiqwV1FNupuH99/AjLsmL50el0AHH2KzFC4/NZC7lcDjw5OZHRaIRisYi11UIkdkWRVLhg5kvCcPdcdy5xfn6OWq2G1Pb2NkejEfr9Pnr9GwhFnKQkEDrNhzu7P3ePQBwG0Elk7nfwybzZJ8P0+er6Au12G+VyGaZpzsLg8PBQlpeXkclksLm5KXAsHGiMfFfyFxAG3vnXLsZs9ox49vkMg8EApVIJ9XqdkaTTaDRkOBzCsqz/5b+2YRgol8ueDv8CmAsGVvaUUeAAAAAASUVORK5CYII%3D";
    this.oa.li = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAdCAYAAAAgqdWEAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wDCAARF/s2ghwAAAMOSURBVEjHvVfRTuJAFD2XUBOQgJQSIvVhhRie/LbVAv7BSmE/Sl999sH6om5iyLouSkOimGjvPrSdDmVaCsadyc3pTKenZ+7cuZ0SpOI4Ds9mM7y8vMDzPHxV0TQN5XIZtVoNxWIR1WqVAIDCARcXF7y1tQVd17G7u4uvLre3txiPxzBNE4ZhQNd1ygPA2dkZVyoVtNptDgSyLDShcICU0qYYivv7rRZ0XYfjOGD2b5HjOOy6LjqdDra3S4gJSRKXRWyWws/PT3R9fY3Wfgs513VhmiYKxSJ7foWEacaxceyxx0dH3xHj4ITx8NhDZWeH6/U6Jk8T5N7e3mA0GsxE+KxZx8cEYO3nvrXb7Lou8h8fH4CX6HKKIRLa6FpHUZ+nfJZS+PH+/o48AFAYQcvxkSlmrO7x4hsE3eqYkXnyvlu9+A5hxS5R7qau1V2aMZOXRc3SLvTFROJUXqAEQdSzrASVtM5OW/SM9CqFZ1iZSnpda1UGSs0zqnyVlwJulXBx3etb6TPf8EsSxAynLdNC6fe6q6PS58uym5aXiTnbVE76/WxbhL3NPQOmtN3kCznprZHkaaOYyfktUSmGog5HP7NrUXORijfsB4Ccn6SEcQwXbDTMJiiBixN4fYWhGCZRISFUfcPRKFMAZzTBG4mJCkkY9ssIZoY9HHJ6ADMkDhlJ5pHeFS2T9AmFhEjoA5jItkfpAZzNIl7hmQ1tkCBoEy4pgIUPISES+hba9mCoCGDOaoJHCmBhHMM043DcwB6qVokVyEk80jIpYz0t78TH4dS2N8kzgkfTNOQ0TcPjwwPY40/bj9OBL2bN5+5ublAul0GXl5c8n89Rr9dR3aktHcFYcaChjP8raRzhmMe/D7i/v8fBwQFyh4eHNJ/PMZ1O8TydIIjkcPFYxtDCMYxYGg2eg3RPoHQPwfWfx98Yj8doNpswTTM6kZ2fn3OpVEKhUMDe3h6DQSBpUtJxMOgXx7qFPrkdckQonHj36w6u66LRaKDT6dDSF/Tq6opnsxleX1//y7+2YRhoNptCwz/m1JcKyxmy4QAAAABJRU5ErkJggg%3D%3D";
    this.oa.ni = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAdCAYAAAAgqdWEAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wDCAATL+ECWAAAAAMHSURBVEjHvVdRT+JAEP6GFBOQgJRyROrDCTE8+dvEAvcPTgr+KH312QfrE5oYcp6n0pAoJtq5B7btsm2BHnpDvsxud/djdmc6syVI4jgOT6dTvLy8wPM8fJVks1kUi0VUKhXk83mUy2UCAPInXFxc8NbWFnRdx+7uLr5aRqMRxuMxTNOEYRjQdZ00ADg7O+NSqYRGs8nCQJYNTRAWmpb0SdHB+H6jAV3X4TgOmOdD5DgOu66LVquF7e0CFEOSjFvH2HWEn5+f6Pr6Go39BjKu68I0TeTyefbmP0g6Ee32kTqPY/qqjvCWdna4Wq3i8ekRmbe3Nxi1GjMR0gAArONjSrsuDt+bTXZdF5mPjw/AA8UAMRpBX0in3YY0hxbmRHWUR+D9/R0ZACBmFoCkkfAM5Eecb5DVhjK+LgJeAHNjmDwfrGi1HUAVq3Osrl8FmZ9DY0A+SNFqO0CcdKyOvH4VZH4KjAEHYEUDzFhsc5gxYqRrWUlcvMi78J/hyShBpYCUtugvkW7HWsEZgzBm2AcpOhGrpNuzKIYzjpeYOHQTs5ca60iv20nFJ2KGfLCik7Gm/Oj1ZO443uCoNYgYkorYZ9UdAMBgeOrzJ3EGz7V50otU4k8xaDg49XdKMVU9Uv01EcBxVVpeSEm7ST6RIfNqf8r/JdwUpnf6jCuEPRiAmWnFhiI8mghgSth16pOx7eHSpLiMR5Odtqn07eFGXJpftTd1k90fzEtFyptexE1SmP3T29S3B+CUd+Dktyk56lfGzIltJ+WRdQKY5M8XLZvN4uH+Hkb1W2of/zzpg73NI+72ZoRisQi6vLzk2WyGarWK8k4l4kz1jBETPEnfK8s4/DkPf+5xd3eHg4MDZA4PD2k2m2EymeB58ghx/xTOm19efB1cQMQcBs/T90I1F31VS2MQ7d8PvzAej1Gv12GaZphfzs/PuVAoIJfLYW9vj8EgkLQp+XpHkAsILTyT+z5HqINDvLm9geu6qNVqaLVaFAmqq6srnk6neH19/S/f2oZhoF6vBzb8BbU1MGBi7Vj6AAAAAElFTkSuQmCC";
    this.oa.yi = "data:image/png;base64,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";
    this.Tl = "data:image/png;base64,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";
    this.oj = "data:image/png;base64,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";
    this.oa.xl = "";
    this.oa.yl = "";
    this.oa.zl = "";
    this.oa.Dl = "";
    this.oa.Bl = "";
    this.oa.Hl = "";
    this.oa.Il = "";
    this.oa.Jl = "";
    this.oa.Gl = "";
    this.oa.Ll = "";
    this.xk = function() {
        var c = this.aa,
          d = q,
          d = d = "",
          d = ["d0ma1n"],
          d = d[0] + "",
          d = c.resources.ei(d);
        d || (d = ["d0ma1n"], d = d[0] + "#FlexPaper-1-4-5-Annotations-1.0.10", d = c.resources.ei(d));
        d || alert("License key not accepted. Please check your configuration settings.");
        this.Uj = y;
        jQuery(".flowpaper_tbloader").hide();
        d && jQuery(this).trigger("onPostinitialized");
    };
    this.ei = function(c) {
        var d = this.aa,
          e = d.config.key != r && 0 < d.config.key.length && 0 <= d.config.key.indexOf("@"),
          f = parseInt(Math.pow(6, 2)) + va(q) + "AdaptiveUId0ma1n";
        c = ia(parseInt(Math.pow(9, 3)) + (e ? d.config.key.split("$")[0] : va(q)) + c);
        var g = ia(f),
          f = "$" + c.substring(11, 30).toLowerCase();
        c = "$" + g.substring(11, 30).toLowerCase();
        g = va(y);
        var validated = (0 == g.indexOf("http://localhost/") || 0 == g.indexOf("http://localhost:") || 0 == g.indexOf("http://localhost:") || 0 == g.indexOf("http://192.168.") || 0 == g.indexOf("http://127.0.0.1") || 0 == g.indexOf("https://localhost/") || 0 == g.indexOf("https://localhost:") || 0 == g.indexOf("https://localhost:") || 0 == g.indexOf("https://192.168.") || 0 == g.indexOf("https://127.0.0.1") || 0 == g.indexOf("http://10.1.1.") || 0 == g.indexOf("http://git.devaldi.com") || 0 == g.indexOf("file://") ? q : 0 == g.indexOf("http://") ? y : 0 == g.indexOf("/") ? q : y) || d.config.key == f || d.config.key == c || e && f == "$" + d.config.key.split("$")[1];
        this.Uj = y;
        return validated;
    };
    this.initialize = function() {
        var c = this.aa;
        c.ja.prepend(String.format("<div id='modal-I' class='modal-content'><p><a href='https://flowpaper.com/?ref=FlowPaper' target='_new'><img src='{0}' style='display:block;width:100px;heigh:auto;padding-bottom:10px;' border='0' /></a></p>FlowPaper  web PDF viewer 3.0.1. Developed by Devaldi Ltd.<br/><a href='https://flowpaper.com/' target='_new'>Click here for more information about this PDF viewer</a></div>", c.resources.oj));
        c.about = function() {
            jQuery("#modal-I").smodal();
        };
        c.config.document.BrandingLogo && 3 < c.config.document.BrandingLogo.length && jQuery(c.ga).bind("onPagesContainerCreated", function() {
            c.ja.append(String.format("<div class='flowpaper_custom_logo'><a href='{1}'><img src='{0}' border='0' width='80'></a></div>", c.config.document.BrandingLogo, c.config.document.BrandingUrl ? c.config.document.BrandingUrl : "#"));
        });
    };
};

function va(g) {
    var c = window.location.href.toString();
    0 == c.length && (c = document.URL.toString());
    if (g) {
        var d;
        d = c.indexOf("///");
        0 <= d ? d += 3 : (d = c.indexOf("//"), d = 0 <= d ? d + 2 : 0);
        c = c.substr(d);
        d = c.indexOf(":");
        var e = c.indexOf("/");
        0 < d && 0 < e && d < e || (0 < e ? d = e : (e = c.indexOf("?"), d = 0 < e ? e : c.length));
        c = c.substr(0, d);
    }
    if (g && (g = c.split("."))) {
        if (d = g.length, !(2 >= d)) {
            if (!(e = -1 != "co,com,net,org,web,gov,edu,".indexOf(g[d - 2] + ","))) {
                b: {
                    for (var e = ".ac.uk .ab.ca .bc.ca .mb.ca .nb.ca .nf.ca .nl.ca .ns.ca .nt.ca .nu.ca .on.ca .pe.ca .qc.ca .sk.ca .yk.ca".split(" "), f = 0; f < e.length;) {
                        if (-1 !== c.indexOf(e[f], c.length - e[f].length)) {
                            e = q;
                            break b;
                        }
                        f++;
                    }
                    e = y;
                }
            }
            c = e ? g[d - 3] + "." + g[d - 2] + "." + g[d - 1] : g[d - 2] + "." + g[d - 1];
        }
    }
    return c;
}
window.FlowPaperViewerAnnotations_Plugin = function(g, c, d) {
    this.aa = g;
    this.ga = g.ga;
    this.ea = this.aa.ea;
    this.ib = this.aa.ib;
    this.document = c;
    this.Za = d;
    this.da = "#" + d;
    this.mf = q;
    this.Lg = d + "_flowpaper_colorselector_yellow";
    this.Kg = d + "_flowpaper_colorselector_orange";
    this.Jg = d + "_flowpaper_colorselector_green";
    this.Ig = d + "_flowpaper_colorselector_blue";
    this.zh = d + "_flowpaper_notecolorselector_yellow";
    this.mk = d + "_flowpaper_notecolorselector_orange";
    this.lk = d + "_flowpaper_notecolorselector_green";
    this.kk = d + "_flowpaper_notecolorselector_blue";
    this.Mm = d + "_flowpaper_notetypeselector";
    this.Rf = d + "_flowpaper_notetypeselector_point";
    this.nk = d + "_flowpaper_notetypeselector_area";
    this.ok = d + "_flowpaper_notetypeselector_text";
    this.Eg = d + "_flowpaper_colorselector2_black";
    this.Hg = d + "_flowpaper_colorselector2_red";
    this.Fg = d + "_flowpaper_colorselector2_blue";
    this.Gg = d + "_flowpaper_colorselector2_green";
    this.Yl = d + "_flowpaper_colorselector2_rect";
    this.Xl = d + "_flowpaper_colorselector2_filledrect";
    this.qa = [];
    this.wc = r;
    this.fd = "data:image/gif;base64,R0lGODlhBwAHAKEBAAAAAP///////////yH5BAEKAAEALAAAAAAHAAcAAAIMjA9nwMj9wmuLIlUAADs%3D";
    this.me = "data:image/gif;base64,R0lGODlhBwAHAIAAAP///////yH+GkNyZWF0ZWQgd2l0aCBHSU1QIG9uIGEgTWFjACH5BAEKAAEALAAAAAAHAAcAAAIMjA9nwMj9wmuLIlUAADs%3D";
    this.sj = "data:image/png;base64,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%3D%3D";
    this.Ye = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFTUs/////kXQHwAAAAAJ0Uk5T/wDltzBKAAAAJklEQVR42mJgZGRghAAGRgYGKJsBDKCiSApQmFA1MCFGIpgAAQYAEQQAVDdDqNQAAAAASUVORK5CYII%3D";
    this.jk = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAARCAYAAADpPU2iAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gMJFCA74egkjwAAAF9JREFUKM9jfLtg3v/fDx8wEAsY7zlb//9++ijRGpgYSASjGoaqBg5dI0ZiFfMFxzAyMjAwMDxOjGH4tHbJf0KKZecvQQg8ToxhuMrH8B8bfpwYg90UbJpwKsamCZtiALZxM2A+y5QtAAAAAElFTkSuQmCC";
    FlowPaperViewer_HTML.prototype.kd = function(c) {
        this.ca.kd(c);
    };
    FlowPaperViewer_HTML.prototype.Jb = function(c, d, g) {
        var n = this;
        n.ca.Jb(c, d, g);
        jQuery(n.ca).on("onDrawingStopped", function(c, e, d) {
            jQuery(n).trigger("onDrawingStopped", [e, d]);
        });
    };
    FlowPaperViewer_HTML.prototype.Xb = function(c) {
        this.ca.Xb(c);
    };
    FlowPaperViewer_HTML.prototype.Uc = function(c) {
        return this.ca.Uc(c);
    };
    FlowPaperViewer_HTML.prototype.Vd = function() {
        this.ca.Vd();
    };
    FlowPaperViewer_HTML.prototype.ud = function() {
        this.ca.ud();
    };
    FlowPaperViewer_HTML.prototype.Sb = function() {
        this.ca.Sb();
    };
    FlowPaperViewer_HTML.prototype.cd = function() {
        return this.ca.cd;
    };
    FlowPaperViewer_HTML.prototype.Oj = function() {
        if (this.sa) {
            return this.sa.text;
        }
    };
    this.aa.getCurrentlySelectedText = FlowPaperViewer_HTML.prototype.Oj;
    this.aa.config.document.AnnotationToolsVisible && 0 == this.aa.ja.find("#" + this.aa.Za + "_annotations_container").length && (this.aa.document.DisableOverflow || this.aa.ja.append(String.format("<div id='" + this.aa.Za + "_annotations_container' style='height:50px;'><div id='" + this.aa.Za + "_annotations_popup' class='flowpaper_toolbarstd_bottom' style='top:{0}px;z-index:200;position:relative;visibility:hidden;border-width:0px;width:100px;z-index:200;overflow-y:hidden;margin-left:1px;overflow-x:hidden;margin-top:" + (!eb.platform.touchonlydevice ? "-14" : eb.platform.tc ? "-2" : "-13") + "px'></div><div id='" + this.aa.Za + "_annotations' class='flowpaper_toolbarstd_bottom' style='margin-top:{0}px;z-index:200;overflow-y:hidden;overflow-x:hidden;'></div></div>", eb.platform.touchonlydevice && !eb.browser.fb.kb ? -9 : 0)), this.aa.Pd = jQuery(this.aa.ja).find("#" + this.aa.Za + "_annotations_container"));
    this.create = function() {
        var c = this;
        c.aa.document.DisableOverflow || 0 < c.aa.config.BottomToolbar.length && jQuery.ajax({
            url: c.aa.config.BottomToolbar,
            async: y,
            success: function(d) {
                jQuery(c.da).append(d);
                600 > window.innerWidth && jQuery(c.da).find(".flowpaper_tblabelbutton").each(function() {
                    jQuery(this).data("autocompactwidth") && (jQuery(this).html(""), jQuery(this).css("width", "10px"));
                });
                jQuery(c.da).find(".flowpaper_toolbarstd_bottom").removeClass("flowpaper_toolbarstd_bottom");
            }
        });
        window[c.ib].markList = c.qa;
        window[c.ib].clearMarks = c.rj;
        window[c.ib].getMarkList = c.Qj;
        window[c.ib].removeMark = c.Ak;
        window[c.ib].scrollToMark = c.Mk;
        window[c.ib].addMarks = c.bj;
        window[c.ib].addMark = c.$i;
        window[c.ib].createMark = c.wj;
        window[c.ib].enableHighlighter = c.Dj;
        window[c.ib].enableDrawMode = c.Bj;
        window[c.ib].addNote = c.cj;
        window[c.ib].enableStrikeout = c.Xg;
        window[c.ib].enableStrikeout = c.Xg;
        window[c.ib].triggerDelete = c.hl;
        window[c.ib].setAnnotationsVisible = c.Sh;
        window[c.ib].removeSelectedMark = c.Lh;
        window[c.ib].refreshMarks = c.yk;
        jQuery(window).bind("keydown", function(d) {
            c.Qa && (!c.Qa.note && 46 == d.which && !(d.target && "INPUT" == d.target.tagName)) && c.Lh();
        });
    };
    this.Ib = function() {
        jQuery(this.aa).unbind("onDrawingStopped");
        jQuery(this.aa.ga).unbind("onVisibilityChanged");
        this.aa.ga.unbind("touchstart");
        this.aa.ga.unbind("touchmove");
        this.aa.ga.unbind("touchend");
        jQuery(this.aa).unbind("onSelectedMarkChanged");
        this.da = this.Za = this.document = this.ib = this.ea = this.ga = this.aa = r;
    };
    this.rj = function(c) {
        return this.plugin.Dg(c);
    };
    this.Qj = function() {
        return this.plugin.dh();
    };
    this.Lh = function() {
        var c = this.plugin ? this.plugin : this;
        if (c.Qa && !c.Qa.readonly && confirm(c.aa.toolbar.Ia(c.aa.toolbar.yb, "ConfirmDeleteAnnotation", "Are you sure you want to delete this " + c.Qa.type + "?"))) {
            c.Yf(c.Qa);
            jQuery(c.aa).trigger("onSelectedMarkChanged", r);
            c.ga.trigger("onSelectedMarkChanged", r);
            var d = jQuery.extend({}, c.Qa);
            d.note && "string" != typeof d.note && (d.note = "<notes>" + d.note.find("note").parent().html() + "</notes>");
            c.Qa = r;
        }
    };
    this.Ak = function(c) {
        this.plugin.Yf(c);
    };
    this.Mk = function(c) {
        this.plugin.Lk(c);
    };
    this.bj = function(c) {
        this.plugin.aj(c);
    };
    this.$i = function(c) {
        return this.plugin.Zi(c);
    };
    this.Lk = function(c) {
        var d = this,
          g = -1;
        if (c.id != k) {
            if ("highlight" == c.type || "strikeout" == c.type) {
                g = c.selection_info.split(";"), g = parseInt(g[0]);
            }
            "note" == c.type && (g = parseInt(c.pageIndex));
            "drawing" == c.type && (g = parseInt(c.pageIndex)); - 1 != g && d.aa.gotoPage(g, function() {
                var g = jQuery("#" + c.id);
                "Portrait" == d.aa.ba && (eb.browser.fb.kb ? jQuery("#pagesContainer_" + d.ea).scrollTo(g, 0, {
                    axis: "xy",
                    offset: -30
                }) : jQuery("#pagesContainer_" + d.ea).data("jsp").scrollToElement(g, y));
            });
        } else {
            c.selection_info != r && 0 < c.selection_info.indexOf(";") && (g = c.selection_info.split(";"), g = parseInt(g[0]), d.aa.gotoPage(g));
        }
    };
    this.Zi = function(c) {
        c.id == r && (c.id = Z());
        this.qa[this.qa.length] = c;
        this.Db(this.aa.getCurrPage() - 1);
        return c;
    };
    this.aj = function(c) {
        for (var d = 0; d < c.length; d++) {
            c[d].id == r && (c[d].id = Z()), this.qa[this.qa.length] = c[d];
        }
        this.Db(this.aa.getCurrPage() - 1);
    };
    this.vj = function() {
        if (this.aa.sa) {
            for (var c = 0, d = 0; d < this.aa.sa.Le; d++) {
                c += this.aa.sa.ji.words[d].length;
            }
            c++;
            d = new Mark;
            d.id = Z();
            d.type = "highlight";
            d.selection_text = this.aa.sa.text;
            d.color = this.ah(q);
            d.selection_info = this.aa.sa.page + ";" + c + ";" + (c + this.aa.sa.text.length);
            d.readonly = y;
            d.pageWidth = 1000 * (this.aa.getDimensions()[parseInt(this.aa.sa.page) - 1].width / this.aa.getDimensions()[parseInt(this.aa.sa.page) - 1].height);
            d.pageHeight = 1000;
            d.author = this.aa.config.CurrentUser;
            this.qa[this.qa.length] = d;
            this.Db(this.aa.sa.page - 1);
            this.ga.trigger("onMarkCreated", d);
        }
    };
    this.wj = function() {
        this.plugin.vj();
    };
    this.Yf = function(c, d) {
        jQuery("#" + c.id).remove();
        jQuery("#" + c.id + "_line").remove();
        jQuery("." + c.id).remove();
        for (var g = 0; g < this.qa.length; g++) {
            if (this.qa[g] === c || c.id && c.id == this.qa[g].id) {
                c = this.qa[g];
            }
        }
        for (var g = this.qa, n = c, l = 0; l < g.length;) {
            g[l] === n || n.id && n.id == g[l].id ? g.splice(l, 1) : ++l;
        }
        if ("drawing" == c.type) {
            g = c.pageIndex - 1;
            "TwoPage" == this.aa.ba && (g = 0 == c.pageIndex % 2 ? 1 : 0);
            "BookView" == this.aa.ba && (g = 1 < c.pageIndex && 0 == c.pageIndex % 2 ? 1 : 0);
            if (n = this.aa.Uc(g)) {
                n.width = this.aa.ed(g), n.height = this.aa.ce(g);
            }
            n = y;
            for (l = 0; l < this.qa.length; l++) {
                "drawing" == this.qa[l].type && this.qa[l].pageIndex == c.pageIndex && (n = q);
            }
            n || this.aa.Sb();
            jQuery(".flowpaper_drawing_" + g).remove();
        }
        g = c.pageIndex - 1;
        if (n = this.aa.Uc(g)) {
            n.width -= 1;
        }
        d || (c.note ? this.ga.trigger("onMarkDeleted", this.hd(c)) : this.ga.trigger("onMarkDeleted", c));
        this.Db(g);
    };
    this.Dg = function(c) {
        for (var i = 0; i < this.qa.length; i++) {
            this.Yf(this.qa[i], c), i--;
        }
    };
    this.dh = function() {
        for (var c = 0; c < this.qa.length; c++) {
            this.qa[c].note && "string" != typeof this.qa[c].note && (this.qa[c].note = "<notes>" + this.qa[c].note.find("note").parent().html() + "</notes>");
        }
        return this.qa;
    };
    this.Dj = function(c) {
        this.Ae = y;
        this.plugin.Gb();
        addCSSRule(".flowpaper_pageword", "cursor", "text");
        c || (c = "yellow");
        this.Ma = "flowpaper_selected_" + c;
        this.plugin.Od = this.Ta;
        this.Ta = q;
        this.Zc = "highlight";
    };
    this.Xg = function() {
        this.Ae = q;
        this.plugin.Gb();
        addCSSRule(".flowpaper_pageword", "cursor", "text");
        this.plugin.Od = this.Ta;
        this.Ta = q;
        this.Zc = "strikeout";
        this.Ma = "flowpaper_selected_strikeout";
    };
    this.Bj = function(c) {
        c || (c = "black");
        0 <= c.indexOf("black") && (this.pb = "#000000");
        0 <= c.indexOf("red") && (this.pb = "#fa1100");
        0 <= c.indexOf("blue") && (this.pb = "#274af3");
        0 <= c.indexOf("green") && (this.pb = "#35dc0f");
        this.kd(this.pb);
        this.Jb(this.pb);
        FLOWPAPER.vd();
        jQuery(this.da).find(".flowpaper_bttnDraw").addClass("flowpaper_tbtextbutton_pressed");
    };
    this.Sh = function() {
        var c = this.aa ? this.aa : this;
        if (jQuery(c.plugin.da).find(".flowpaper_bttnShowHide").hasClass("flowpaper_tbtextbutton_pressed")) {
            return jQuery(c.plugin.da).find(".flowpaper_bttnShowHide").removeClass("flowpaper_tbtextbutton_pressed"), c.plugin.mf = y, jQuery(".flowpaper_annotation_" + c.ea).hide(), jQuery(".flowpaper_interactiveobject_" + c.ea).hide(), q;
        }
        jQuery(c.plugin.da).find(".flowpaper_bttnShowHide").addClass("flowpaper_tbtextbutton_pressed");
        c.plugin.mf = q;
        jQuery(".flowpaper_annotation_" + c.ea).show();
        jQuery(".flowpaper_interactiveobject_" + c.ea).show();
        return y;
    };
    this.hl = function() {
        jQuery(".flowpaper_bttnDelete").trigger("click");
    };
    this.cj = function() {
        jQuery(".flowpaper_bttnComment").trigger("click");
    };
    this.bindEvents = function() {
        var c = this;
        jQuery(c.aa.ga).on("onVisibilityChanged", function() {
            jQuery(c.da).find(".flowpaper_bttnDraw").hasClass("flowpaper_tbtextbutton_pressed") ? (c.aa.Jb(c.aa.pb), FLOWPAPER.vd()) : c.aa.Xb(q);
        });
        c.aa.ga.on("onPageCreated", function(d, g) {
            if ("BookView" == c.aa.ba || "TwoPage" == c.aa.ba) {
                if (jQuery(c.aa.ca.ca[0]).ec("onAddedTextOverlay", c.Wc) != q) {
                    jQuery(c.aa.ca.ca[0]).on("onAddedTextOverlay", c.Wc);
                }
                if (jQuery(c.aa.ca.ca[1]).ec("onAddedTextOverlay", c.Wc) != q) {
                    jQuery(c.aa.ca.ca[1]).on("onAddedTextOverlay", c.Wc);
                }
                if (jQuery(c.aa.ca.ca[0]).ec("onTextOverlayInactive", c.Gd) != q) {
                    jQuery(c.aa.ca.ca[1]).on("onTextOverlayInactive", c.Gd);
                }
                if (jQuery(c.aa.ca.ca[0]).ec("onTextOverlayInactive", c.Gd) != q) {
                    jQuery(c.aa.ca.ca[1]).on("onTextOverlayInactive", c.Gd);
                }
            } else {
                if (c.aa.ba == X) {
                    if (jQuery(c.aa.ca.ca[0]).ec("onAddedTextOverlay", c.Wc) != q) {
                        jQuery(c.aa.ca.ca[0]).on("onAddedTextOverlay", c.Wc);
                    }
                } else {
                    if (jQuery(c.aa.ca.ca[g]).ec("onAddedTextOverlay", c.Wc) != q) {
                        jQuery(c.aa.ca.ca[g]).on("onAddedTextOverlay", c.Wc);
                    }
                    if (jQuery(c.aa.ca.ca[g]).ec("onTextOverlayInactive", c.Gd) != q) {
                        jQuery(c.aa.ca.ca[g]).on("onTextOverlayInactive", c.Gd);
                    }
                }
            }
        });
        c.aa.ga.on("touchstart", function(d) {
            if (!(1 < d.originalEvent.touches.length)) {
                return c.aa.Qg(d);
            }
        });
        c.aa.ga.on("touchmove", function(d) {
            if (!(1 < d.originalEvent.touches.length)) {
                return c.aa.Rg(d);
            }
        });
        c.aa.ga.on("touchend", function(d) {
            if (!(1 < d.originalEvent.touches.length)) {
                return c.aa.Tg(d);
            }
        });
        jQuery(c.aa).on("onSelectedMarkChanged", function(d, g) {
            g == r || g && g.readonly ? jQuery(c.da).find(".flowpaper_bttnDelete").addClass("flowpaper_tbbutton_disabled") : jQuery(c.da).find(".flowpaper_bttnDelete").removeClass("flowpaper_tbbutton_disabled");
        });
        jQuery(c.da).find(".flowpaper_bttnHighlight").bind("click", function(d) {
            addCSSRule(".flowpaper_pageword", "cursor", "text");
            c.Ae = y;
            if (jQuery(c.da).find(".flowpaper_bttnHighlight").hasClass("flowpaper_tbtextbutton_pressed")) {
                c.aa.Ta = y, c.aa.ca.jScrollPane != r && c.aa.ca.jScrollPane.data("jsp").enable(), jQuery(c.da + "_popup").css("visibility", "hidden"), c.Gb();
            } else {
                c.Od = c.aa.Ta;
                c.aa.Ta = q;
                c.aa.Zc = "highlight";
                c.aa.ca.jScrollPane != r && c.aa.ca.jScrollPane.data("jsp").disable();
                jQuery(c.da + "_popup").css({
                    left: jQuery(this).offset().left,
                    width: "100px"
                });
                jQuery(c.da + "_popup").html(String.format("<div id='{0}' class='flowpaper_colorselector' style='background-color:#fff774;margin-top:3px;margin-left:3px;'/>", c.Lg) + String.format("<div id='{0}' class='flowpaper_colorselector' style='background-color:#facd56;margin-top:3px;margin-left:7px;'/>", c.Kg) + String.format("<div id='{0}' class='flowpaper_colorselector' style='background-color:#c2f785;margin-top:3px;margin-left:7px;'/>", c.Jg) + String.format("<div id='{0}' class='flowpaper_colorselector' style='background-color:#9cdcff;margin-top:3px;margin-left:7px;'/>", c.Ig));
                if (!eb.platform.touchdevice || eb.platform.touchdevice && (!c.aa.sa || c.aa.sa && !c.aa.sa.Yj)) {
                    "flowpaper_selected_orange" == c.aa.Ma ? jQuery("#" + c.Kg).css("background-image", "url(" + c.fd + ")") : "flowpaper_selected_green" == c.aa.Ma ? jQuery("#" + c.Jg).css("background-image", "url(" + c.fd + ")") : "flowpaper_selected_blue" == c.aa.Ma ? jQuery("#" + c.Ig).css("background-image", "url(" + c.fd + ")") : (jQuery("#" + c.Lg).css("background-image", "url(" + c.fd + ")"), c.aa.Ma = "flowpaper_selected_yellow");
                }
                jQuery(".flowpaper_colorselector").on("mousedown", function(d) {
                    jQuery(".flowpaper_colorselector").css("background-image", "");
                    (!eb.platform.touchdevice || eb.platform.touchdevice && !c.aa.sa) && jQuery(this).css("background-image", "url(" + c.fd + ")");
                    0 <= jQuery(this).attr("id").indexOf("yellow") && (c.aa.Ma = "flowpaper_selected_yellow");
                    0 <= jQuery(this).attr("id").indexOf("orange") && (c.aa.Ma = "flowpaper_selected_orange");
                    0 <= jQuery(this).attr("id").indexOf("green") && (c.aa.Ma = "flowpaper_selected_green");
                    0 <= jQuery(this).attr("id").indexOf("blue") && (c.aa.Ma = "flowpaper_selected_blue");
                    eb.platform.touchdevice && (c.aa.sa != r && c.aa.sa.text != r && 0 < c.aa.sa.text.length) && (c.Ud(), d.preventDefault(), d.stopPropagation());
                });
                c.Gb();
                jQuery(c.da + "_popup").css("visibility", "visible");
                jQuery(c.da).find(".flowpaper_bttnHighlight").addClass("flowpaper_tbtextbutton_pressed");
                d && d.preventDefault && d.preventDefault();
                d && d.stopPropagation && d.stopPropagation();
            }
        });
        jQuery(c.da).find(".flowpaper_bttnComment").bind("click", function() {
            jQuery(c.da).find(".flowpaper_bttnComment").hasClass("flowpaper_tbtextbutton_pressed") ? (c.aa.Ta = y, c.Gb()) : (c.Gb(), jQuery(c.da).find(".flowpaper_bttnComment").addClass("flowpaper_tbtextbutton_pressed"), jQuery(c.da + "_popup").css({
                left: jQuery(this).offset().left + "px",
                width: "172px"
            }), jQuery(c.da + "_popup").html(String.format("<div id='{0}' class='flowpaper_notetypeselector' style='cursor:pointer;float:left;margin-top:3px;margin-left:3px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gIXFRo40SzIZwAAAVRJREFUOMulkz+qwkAQxn8+gkq0Dla2aRMQPIGXsEjlMaz9cw0vkM7CI8TCC9jYhICISDBkJdl9VQbfM4q+t80OO/PNfDP7DfzzNADCMDRJkgBwvV4BuFwulGUJgG3bAphOp437BBZAkiRMJhPiOGa/33M+nzkejwB0u10JPhwODwysyojjmPV6LQ6l1I+71WrVtmBVtPv9PuPxGACtNUVRSFCe5/R6PZbL5XMGAFEUiV0UBcYYAFzXfTpEq6oAMBgMpHKe59xuN2EEkGVZfYLKsd1uBdBut9Fa0+l0AGg2m8xms9ct+L4vldM0RSnFcDj8jTH3MrDu/3m326G1pixLbNsWHWw2GxzHwfM80U6VSBhkWcZoNJIZnE4n0jQFwHEclFIEQcBqtXpsQSnFYrEAkKrGGObzOQCe5xEEQV0b5h25m1fvXx/ujqldpj8yeBf/Otk3ANmn8k9Eh6YAAAAASUVORK5CYII%3D)'>&nbsp;Point</div>", c.Rf) + String.format("<div id='{0}' class='flowpaper_notetypeselector' style='cursor:pointer;float:left;margin-top:3px;margin-left:7px;background-image:url(data:image/gif;base64,R0lGODlhEAAQAJECAP///8zMzAD/AAAAACH5BAEAAAIALAAAAAAQABAAAAI5lI9pEyMOWzsB1GtzOEz7aWCixo3VYDnhl6LbYgLDDFBsM6tPnM+r2fMxhhJZTqGA6JAJH7O5fCIKADs%3D)'>&nbsp;Area</div>", c.nk) + String.format("<div id='{0}' class='flowpaper_notetypeselector' style='cursor:pointer;float:left;margin-top:3px;margin-left:7px;background-image:url(data:image/gif;base64,R0lGODlhEAAQAMIAAP///8zMzAD/AAAAAP///////////////yH5BAEKAAIALAAAAAAQABAAAANDKLrcOmEISWNcAeSte1iQJ17KNgzaGX6PBaDoSwqZCqmABrpwfmOvVOSUY004yBQwidzdLKqhxNGYUh3WKyN7VU1OCQA7)'>&nbsp;Text</div>", c.ok)), jQuery(c.da + "_popup").css("visibility", "visible"), jQuery(c.da + "_popup").find(".flowpaper_notetypeselector").on("mousedown", function(d) {
                jQuery(this).parent().find(".flowpaper_notetypeselector_selected").removeClass("flowpaper_notetypeselector_selected");
                jQuery(this).addClass("flowpaper_notetypeselector_selected");
                0 <= jQuery(this).attr("id").indexOf("point") && (c.He(), eb.browser.msie ? jQuery(".flowpaper_interactivearea").addClass("flowpaper_note_marker_ie") : jQuery(".flowpaper_interactivearea").addClass("flowpaper_note_marker"));
                0 <= jQuery(this).attr("id").indexOf("area") && (c.He(), d.preventDefault && d.preventDefault(), d.stopPropagation && d.stopPropagation(), c.aa.Jb("#fa1100", r, "DashRectangle"), FLOWPAPER.vd());
                0 <= jQuery(this).attr("id").indexOf("text") ? (jQuery(c.da + "_popup").animate({
                    width: "263px"
                }, 100), 0 == jQuery(c.da + "_popup").find(".flowpaper_notetype_colorselector").length && (jQuery(c.da + "_popup").append(jQuery(String.format("<div id='{0}' class='flowpaper_notetype_colorselector' style='background-color:#fff774;margin-top:5px;margin-left:8px;'/>", c.zh) + String.format("<div id='{0}' class='flowpaper_notetype_colorselector' style='background-color:#facd56;margin-top:5px;margin-left:7px;'/>", c.mk) + String.format("<div id='{0}' class='flowpaper_notetype_colorselector' style='background-color:#c2f785;margin-top:5px;margin-left:7px;'/>", c.lk) + String.format("<div id='{0}' class='flowpaper_notetype_colorselector' style='background-color:#9cdcff;margin-top:5px;margin-left:7px;'/>", c.kk))), jQuery(c.da + "_popup").find("#" + c.zh).css("background-image", "url(" + c.fd + ")"), c.aa.Ma = "flowpaper_selected_yellow"), jQuery(c.da + "_popup").find(".flowpaper_notetype_colorselector").on("mousedown", function() {
                    jQuery(c.da + "_popup").find(".flowpaper_notetype_colorselector").css("background-image", "");
                    (!eb.platform.touchdevice || eb.platform.touchdevice && !c.aa.sa) && jQuery(this).css("background-image", "url(" + c.fd + ")");
                    0 <= jQuery(this).attr("id").indexOf("yellow") && (c.aa.Ma = "flowpaper_selected_yellow");
                    0 <= jQuery(this).attr("id").indexOf("orange") && (c.aa.Ma = "flowpaper_selected_orange");
                    0 <= jQuery(this).attr("id").indexOf("green") && (c.aa.Ma = "flowpaper_selected_green");
                    0 <= jQuery(this).attr("id").indexOf("blue") && (c.aa.Ma = "flowpaper_selected_blue");
                }), c.Od = c.aa.Ta, c.aa.Ta = q, c.aa.Zc = "highlight", c.aa.ca.jScrollPane != r && c.aa.ca.jScrollPane.data("jsp").disable(), eb.platform.touchdevice && (c.aa.sa != r && c.aa.sa.text != r && 0 < c.aa.sa.text.length) && (c.Ud(), d.preventDefault(), d.stopPropagation()), c.He(), addCSSRule(".flowpaper_pageword", "cursor", "text"), c.Ae = y, c.aa.ud(), c.aa.Xb(), d.preventDefault && d.preventDefault(), d.stopPropagation && d.stopPropagation()) : (jQuery(c.da + "_popup").find(".flowpaper_notetype_colorselector").remove(), jQuery(c.da + "_popup").animate({
                    width: "172px"
                }, 100));
            }), c.aa.Ta = y, c.aa.Jb(), c.aa.Vd(), jQuery(".flowpaper_interactivearea").removeClass("flowpaper_grab"), !eb.browser.msie && !eb.browser.Vc ? jQuery(".flowpaper_interactivearea").addClass("flowpaper_interactive_note") : jQuery(".flowpaper_interactivearea").addClass("flowpaper_interactive_note_ie"), jQuery(".flowpaper_interactivearea").on("mousedown touchstart", function(d) {
                if (jQuery(c.da).find(".flowpaper_bttnComment").hasClass("flowpaper_tbtextbutton_pressed") && (0 == jQuery(c.da + "_popup").find(".flowpaper_notetypeselector_selected").length || jQuery(c.da + "_popup").find(".flowpaper_notetypeselector_selected").attr("id") == c.Rf)) {
                    var g = parseInt(d.target.id.substring(d.target.id.indexOf("_") + 1));
                    if (isNaN(g) && eb.browser.msie && 9 >= eb.browser.version) {
                        var n = jQuery(d.target).parent().parent().get(0),
                          g = parseInt(n.id.substring(n.id.indexOf("_") + 1));
                    }
                    n = parseFloat(c.aa.lc(g));
                    d = ja(d);
                    var l = 0 < jQuery(c.da + "_popup").find(".flowpaper_notetypeselector_selected").length && jQuery(c.da + "_popup").find(".flowpaper_notetypeselector_selected").attr("id") == c.Rf,
                      s = new Mark;
                    s.id = Z();
                    s.note = "";
                    "Portrait" == c.aa.ba && (s.pageIndex = g + 1);
                    "TwoPage" == c.aa.ba && (s.pageIndex = c.aa.ca.la + g + 1);
                    "BookView" == c.aa.ba && (s.pageIndex = c.aa.ca.la + g);
                    "SinglePage" == c.aa.ba && (s.pageIndex = c.aa.ca.la + 1);
                    var h = c.aa.ca.getPage(g).dimensions.xa,
                      A = c.aa.ca.getPage(g).dimensions.Ga;
                    s.positionX = d.x / n;
                    s.positionY = d.y / n;
                    s.width = 170 / n;
                    s.height = 150 / n;
                    s.collapsed = y;
                    s.readonly = y;
                    s.type = "note";
                    s.pageWidth = 1000 * (h / A);
                    s.pageHeight = 1000;
                    s.author = c.aa.config.CurrentUser;
                    l && (s.points = (d.x - 6) / n + "," + (d.y - 15) / n, s.positionX = (d.x + 50) / n, s.positionY = (d.y + 50) / n);
                    c.qa[c.qa.length] = s;
                    c.ga.trigger("onMarkCreated", s);
                    setTimeout(function() {
                        c.aa.Jb(c.aa.pb);
                        c.aa.Xb();
                        c.Db(g);
                    }, 300);
                    c.Gb();
                }
            }));
        });
        jQuery(c.da).find(".flowpaper_bttnStrikeout").bind("click", function() {
            addCSSRule(".flowpaper_pageword", "cursor", "text");
            jQuery(c.da).find(".flowpaper_bttnStrikeout").hasClass("flowpaper_tbtextbutton_pressed") ? (c.aa.Ta = y, c.aa.ca.jScrollPane != r && c.aa.ca.jScrollPane.data("jsp").enable(), jQuery(c.da + "_popup").css("visibility", "hidden"), c.aa.Ta = q, c.aa.Ma = "flowpaper_selected_default", c.aa.Zc = "highlight", c.Gb()) : (c.Ae = q, eb.platform.touchonlydevice ? c.aa.sa != r && (c.aa.sa.text != r && 0 < c.aa.sa.text.length) && (c.Od = c.aa.Ta, c.aa.Ta = q, c.aa.Zc = "strikeout", c.aa.Ma = "flowpaper_selected_strikeout", c.Ud(), event.preventDefault(), event.stopPropagation(), jQuery(c.da).find(".flowpaper_bttnStrikeout").addClass("flowpaper_tbtextbutton_pressed")) : (c.Od = c.aa.Ta, c.aa.Ta = q, c.aa.Zc = "strikeout", c.aa.sa && c.aa.sa.text != r && 0 < c.aa.sa.text.length ? (c.Ud(), c.aa.sa = r, c.aa.ca.jScrollPane != r && c.aa.ca.jScrollPane.data("jsp").enable(), jQuery(c.da + "_popup").css("visibility", "hidden"), c.aa.config.document.StickyTools ? (c.aa.Ma = "flowpaper_selected_strikeout", jQuery(c.da).find(".flowpaper_bttnStrikeout").addClass("flowpaper_tbtextbutton_pressed")) : c.Gb()) : (c.aa.Ma = "flowpaper_selected_strikeout", c.aa.ca.jScrollPane != r && c.aa.ca.jScrollPane.data("jsp").disable(), c.Gb(), jQuery(c.da).find(".flowpaper_bttnStrikeout").addClass("flowpaper_tbtextbutton_pressed"))));
        });
        jQuery(c.da).find(".flowpaper_bttnShowHide").bind("click", function() {
            c.Sh();
        });
        jQuery(c.aa).on("onDrawingStopped", function(d, g, n) {
            d = jQuery(c.da).find(".flowpaper_bttnComment").hasClass("flowpaper_tbtextbutton_pressed");
            if (0 < n.actions.length) {
                var l = "",
                  s = n.actions.length - 1,
                  h = parseFloat(g.scale);
                if (d) {
                    l += n.actions[s].events[0].x / h + "," + n.actions[s].events[0].y / h + ":" + n.actions[s].events[n.actions[s].events.length - 1].x / h + "," + n.actions[s].events[n.actions[s].events.length - 1].y / h;
                } else {
                    for (p = 0; p < n.actions[s].events.length; p++) {
                        l += n.actions[s].events[p].x / h + "," + n.actions[s].events[p].y / h + ":";
                    }
                }
                var A = new Mark;
                A.id = Z();
                A.color = n.actions[s].color;
                "Portrait" == g.ba && (A.pageIndex = g.pageNumber + 1);
                "TwoPage" == g.ba && (A.pageIndex = c.aa.ca.la + g.pageNumber + 1);
                "SinglePage" == c.aa.ba && (A.pageIndex = c.aa.ca.la + 1);
                "BookView" == g.ba && (A.pageIndex = 0 == c.aa.ca.la ? 1 : c.aa.ca.la + (0 == g.pageNumber % 2 ? 0 : g.pageNumber));
                if (d) {
                    var K = n.actions[s].events[n.actions[s].events.length - 1].x;
                    n = n.actions[s].events[0].y;
                    A.note = "";
                    A.positionX = (K + 50) / h;
                    A.positionY = n / h;
                    A.width = 170 / h;
                    A.height = 150 / h;
                    A.collapsed = y;
                    A.readonly = y;
                }
                n = c.aa.ca.getPage(A.pageIndex - 1).dimensions.xa;
                h = c.aa.ca.getPage(A.pageIndex - 1).dimensions.Ga;
                A.readonly = y;
                A.points = l;
                A.type = "drawing";
                A.pageWidth = 1000 * (n / h);
                A.pageHeight = 1000;
                A.displayFormat = "html";
                A.author = c.aa.config.CurrentUser;
                c.qa[c.qa.length] = A;
                c.ga.trigger("onMarkCreated", A);
                !c.aa.config.document.StickyTools || d ? (setTimeout(function() {
                    c.aa.Xb();
                    c.Db(g.pageNumber);
                }, 300), jQuery(c.da + "_popup").css("visibility", "hidden"), c.Gb()) : setTimeout(function() {
                    c.Db(g.pageNumber);
                    c.aa.Jb();
                    c.aa.kd(c.aa.pb);
                    FLOWPAPER.vd();
                }, 300);
            }
        });
        jQuery(c.da).find(".flowpaper_bttnDraw").bind("click", function() {
            jQuery(c.da).find(".flowpaper_bttnDraw").hasClass("flowpaper_tbtextbutton_pressed") ? (jQuery(c.da + "_popup").css("visibility", "hidden"), c.aa.Xb(), c.Gb()) : (jQuery(c.da + "_popup").css({
                left: jQuery(this).offset().left,
                width: "100px"
            }), jQuery(c.da + "_popup").html(String.format("<div id='{0}' class='flowpaper_colorselector_2' style='background-color:#000000;float:left;margin-top:3px;margin-left:3px;'/>", c.Eg) + String.format("<div id='{0}' class='flowpaper_colorselector_2' style='background-color:#fa1100;float:left;margin-top:3px;margin-left:7px;'/>", c.Hg) + String.format("<div id='{0}' class='flowpaper_colorselector_2' style='background-color:#274af3;float:left;margin-top:3px;margin-left:7px;'/>", c.Fg) + String.format("<div id='{0}' class='flowpaper_colorselector_2' style='background-color:#35dc0f;float:left;margin-top:3px;margin-left:7px;'/>", c.Gg)), "#fa1100" == c.aa.pb ? jQuery("#" + c.Hg).css("background-image", "url(" + c.me + ")") : "#274af3" == c.aa.pb ? jQuery("#" + c.Fg).css("background-image", "url(" + c.me + ")") : "#35dc0f" == c.aa.pb ? jQuery("#" + c.Gg).css("background-image", "url(" + c.me + ")") : (jQuery("#" + c.Eg).css("background-image", "url(" + c.me + ")"), c.aa.pb = "#000000"), jQuery(".flowpaper_colorselector_tool").on("click", z()), jQuery(".flowpaper_colorselector_2").on("click", function(d) {
                jQuery(".flowpaper_colorselector_2").css("background-image", "");
                jQuery(this).css("background-image", "url(" + c.me + ")");
                0 <= jQuery(this).attr("id").indexOf("black") && (c.aa.pb = "#000000");
                0 <= jQuery(this).attr("id").indexOf("red") && (c.aa.pb = "#fa1100");
                0 <= jQuery(this).attr("id").indexOf("blue") && (c.aa.pb = "#274af3");
                0 <= jQuery(this).attr("id").indexOf("green") && (c.aa.pb = "#35dc0f");
                c.aa.kd(c.aa.pb);
                d.preventDefault();
                d.stopPropagation();
            }), c.Gb(), c.aa.Jb(c.aa.pb), FLOWPAPER.vd(), jQuery(c.da + "_popup").css("visibility", "visible"), jQuery(c.da).find(".flowpaper_bttnDraw").addClass("flowpaper_tbtextbutton_pressed"));
        });
        jQuery("#" + c.ea).bind("onSelectionCreated", function() {
            "flowpaper_selected_default" != c.aa.Ma && (c.Ud(), c.aa.sa = r);
        });
    };
    this.Ud = function() {
        if (this.aa.sa.text != r && 0 < this.aa.sa.text.length) {
            for (var c = 0, d = !this.Ae, g = this.aa.sa.Le <= this.aa.sa.vh ? this.aa.sa.Le : this.aa.sa.vh, n = 0; n < g; n++) {
                c += this.aa.sa.ji.words[n].length;
            }
            c++;
            g = new Mark;
            g.id = Z();
            g.type = d ? "highlight" : "strikeout";
            g.selection_text = this.aa.sa.text;
            g.color = this.ah(d);
            g.selection_info = this.aa.sa.page + ";" + c + ";" + (c + this.aa.sa.text.length);
            g.readonly = y;
            g.pageWidth = 1000 * (this.aa.getDimensions()[parseInt(this.aa.sa.page) - 1].width / this.aa.getDimensions()[parseInt(this.aa.sa.page) - 1].height);
            g.pageHeight = 1000;
            g.author = this.aa.config.CurrentUser;
            if (c = jQuery(this.da).find(".flowpaper_bttnComment").hasClass("flowpaper_tbtextbutton_pressed")) {
                var d = parseFloat(this.aa.lc(parseInt(this.aa.sa.page) - 1)),
                  n = this.aa.sa.sl,
                  l = this.aa.sa.tl;
                g.note = "";
                g.positionX = (n + 50) / d;
                g.positionY = (l + 50) / d;
                g.width = 170 / d;
                g.height = 150 / d;
                g.collapsed = y;
                g.readonly = y;
            }
            this.qa[this.qa.length] = g;
            this.Db(this.aa.sa.page - 1);
            this.ga.trigger("onMarkCreated", g);
            !this.aa.config.document.StickyTools || eb.platform.touchdevice || c ? (this.aa.Ta = this.Od, this.aa.Zc = "highlight", this.aa.Ma = "flowpaper_selected_default", this.aa.Fc(q), jQuery(this.da + "_popup").css("visibility", "hidden"), this.Gb(), this.aa.ca.jScrollPane != r && this.aa.ca.jScrollPane.data("jsp").enable()) : this.aa.Fc(q);
        }
    };
    this.Af = function() {
        if (jQuery(this.aa.da).ec("onZoomFactorChanged", this.Dh) != q) {
            jQuery(this.aa.da).on("onZoomFactorChanged", this.Dh);
        }
    };
    this.Dh = z();
    this.Gd = z();
    this.Wc = function(c, d, g) {
        if ((c = g ? g : this.aa) && c.plugin) {
            c = this.aa.plugin, c.Db(d), jQuery(c.da).find(".flowpaper_bttnDraw").hasClass("flowpaper_tbtextbutton_pressed") && (c.aa.Jb(c.aa.pb), FLOWPAPER.vd());
        }
    };
    this.kl = function(c, d, g, n) {
        this.wc == r && (this.wc = Array(this.aa.getTotalPages()));
        c.Sa = d;
        c.Ya = g;
        this.wc[n] = {};
        this.wc[n].width = d;
        this.wc[n].height = g;
        this.Db(n);
    };
    this.en = z();
    this.yk = function() {
        var c = this;
        c instanceof FlowPaperViewer_HTML && (c = c.plugin);
        for (var i = 0; i < c.qa.length; i++) {
            var d = c.qa[i];
            jQuery("#" + d.id).remove();
            jQuery("#" + d.id + "_line").remove();
            jQuery("." + d.id).remove();
            jQuery(".flowpaper_annotation_documentViewer").remove();
            if ("drawing" == d.type) {
                var g = d.pageIndex - 1;
                "TwoPage" == c.aa.ba && (g = 0 == d.pageIndex % 2 ? 1 : 0);
                "BookView" == c.aa.ba && (g = 1 < d.pageIndex && 0 == d.pageIndex % 2 ? 1 : 0);
                jQuery(".flowpaper_drawing_" + g).remove();
            }
        }
        for (d = 0; d < c.aa.document.numPages; d++) {
            c.aa.ca.ca[d].jb && c.Db(d);
        }
    };
    this.Wm = z();
    this.Db = function(c) {
        var d = this;
        d instanceof FlowPaperViewer_HTML && (d = d.plugin);
        if (d.mf && d.aa && d.qa !== k) {
            if (d.aa.initialized) {
                for (var g = 0; 3 > g; g++) {
                    for (var n = 0; n < d.qa.length; n++) {
                        if (!d.aa.ca.getPage(c)) {
                            return;
                        }
                        var l = d.aa.ca.getPage(c).Wg(),
                          s = d.aa.ca.getPage(c).Na,
                          l = s * l,
                          h = d.qa[n];
                        h.id = h.id;
                        h.type = h.type;
                        h.note != k && (h.note = h.note);
                        h.positionX != k && (h.Lb = h.positionX);
                        h.positionY != k && (h.Ab = h.positionY);
                        h.width != k && (h.width = h.width);
                        h.height != k && (h.height = h.height);
                        h.pageHeight != k && (h.Ya = h.pageHeight);
                        h.pageWidth != k && (h.Sa = h.pageWidth);
                        h.selection_info != k && (h.selection_info = h.selection_info);
                        h.pageIndex != k && (h.pageIndex = h.pageIndex);
                        h.collapsed != k && (h.collapsed = h.collapsed);
                        h.readonly != k && (h.readonly = h.readonly);
                        h.displayFormat != k && (h.Sc = h.displayFormat);
                        h.points != k && (h.xe = h.points);
                        h.color != k && (h.color = h.color);
                        h.author != k && (h.yg = h.author);
                        h.selection_x != k && (h.kn = h.selection_x);
                        h.selection_y != k && (h.ln = h.selection_y);
                        h.selection_width != k && (h.jn = h.selection_width);
                        h.selection_height != k && (h.hn = h.selection_height);
                        d.aa.config.UserCollaboration && (h.note && h.note && "string" == typeof h.note && 0 < h.note.length && -1 == h.note.indexOf('<?xml version="1.0" encoding="utf-8"?>')) && (h.note = '<?xml version="1.0" encoding="utf-8"?>' + h.note);
                        if (!h.Sa || !h.Ya && 0 == g) {
                            if ("undefined" === h.Sc || !h.Sc) {
                                h.Sc = "html";
                            }
                            h.Sc && "flash" == h.Sc && ("drawing" == h.type || "note" == h.type) ? d.aa.config.docSizeQueryService ? d.wc == r || d.wc != r && d.wc[c] == r ? jQuery.ajax({
                                url: d.aa.config.docSizeQueryService,
                                dataType: "jsonp",
                                success: function(g) {
                                    d.kl(h, g.width, g.height, c);
                                },
                                timeout: 10000,
                                error: function() {
                                    H("Error accessing docSizeQueryService. Some annotations may not have been loaded properly.");
                                }
                            }) : (h.Sa = d.wc[c].width, h.Ya = d.wc[c].height, h.Sc = "flash") : H("Cannot query document for size.") : (h.Sa = h.pageWidth = l, h.Ya = h.pageHeight = s, h.Sc = "html");
                        }
                        try {
                            var A = d.aa.ca.getPage(h.pageIndex - 1).dimensions.xa,
                              K = d.aa.ca.getPage(h.pageIndex - 1).dimensions.Ga;
                            Math.round(h.Sa) != Math.round(1000 * (A / K)) && (h.Sa = 1000 * (A / K), h.Ya = K);
                        } catch (x) {}
                        var u = h.id == r ? Z() : h.id;
                        h.id = u;
                        if (("highlight" == h.type || "strikeout" == h.type) && 0 == g) {
                            var t = h.selection_info.split(";");
                            h.pageIndex = parseInt(t[0]);
                            var v = parseInt(t[1]),
                              F = parseInt(t[2]),
                              B = ra(d.ea, parseInt(t[0]) - 1);
                            if (B != r && 0 == jQuery(".flowpaper_annotation_selection_" + h.id).length) {
                                for (var G = 0, C = 0, N = t = 0; N < B.words.length; N++) {
                                    G == v - 1 && (C = N);
                                    if (G + B.words[N].length == F - 1) {
                                        t = N;
                                        break;
                                    }
                                    if (G + B.words[N].length >= F - 1) {
                                        t = N;
                                        break;
                                    }
                                    G += B.words[N].length;
                                }
                                var W = "",
                                  Q = h.id == r ? Z() : h.id;
                                h.points = "";
                                for (wi = C; wi <= t; wi++) {
                                    if (0 == jQuery("#" + Q + "_" + wi).length && B.Ba && B.Ba[wi]) {
                                        var W = d.Mj(h.color),
                                          w = jQuery(B.Ba[wi].el).clone();
                                        jQuery(w).attr("id", Q + "_" + wi);
                                        jQuery(w).data("adjusted", jQuery(B.Ba[wi].el).data("adjusted"));
                                        jQuery(w).addClass("flowpaper_selected");
                                        jQuery(w).addClass("flowpaper_annotation_selection_" + h.id);
                                        jQuery(w).addClass("flowpaper_annotation_" + d.ea);
                                        jQuery(w).addClass("flowpaper_interactiveobject_" + d.ea);
                                        jQuery(w).addClass("flowpaper_annotation_" + c + "_" + d.ea);
                                        jQuery(w).addClass(Q);
                                        jQuery(w).addClass(W);
                                        jQuery(w).data("isMark", q);
                                        jQuery(w).data("classid", Q);
                                        jQuery(w).data("mark", h);
                                        jQuery(w).data("selectionClass", W);
                                        jQuery(w).data("handler", this);
                                        jQuery(w).css("z-index", "12");
                                        var I = parseFloat(B.Ba[wi].left) / parseFloat(d.aa.lc(c)),
                                          J = parseFloat(B.Ba[wi].top) / parseFloat(d.aa.lc(c)),
                                          E = B.Ba[wi].right / parseFloat(d.aa.lc(c)),
                                          C = B.Ba[wi].bottom / parseFloat(d.aa.lc(c));
                                        h.points += I + "," + J + ":" + E + "," + C + ";";
                                        d.aa.document.DisableOverflow && ("strikeout" != h.type ? "flowpaper_selected_orange" == W ? jQuery(w).css({
                                            "border-top": "solid " + jQuery(w).height() + "px #facd56",
                                            "background-color": "transparent"
                                        }) : "flowpaper_selected_green" == W ? jQuery(w).css({
                                            "border-top": "solid " + jQuery(w).height() + "px #c2f785",
                                            "background-color": "transparent"
                                        }) : "flowpaper_selected_blue" == W ? jQuery(w).css({
                                            "border-top": "solid " + jQuery(w).height() + "px #9cdcff",
                                            "background-color": "transparent"
                                        }) : jQuery(w).css({
                                            "border-top": "solid " + jQuery(w).height() + "px #fff774",
                                            "background-color": "transparent"
                                        }) : jQuery(w).css({
                                            "border-top": "solid " + jQuery(w).height() / 3 + "px #fb5450",
                                            "background-color": "transparent"
                                        }));
                                        jQuery(w).on("mouseover", function() {
                                            jQuery("." + Q).removeClass(W).addClass("flowpaper_selected_hover");
                                        });
                                        "flowpaper_selected_strikeout" == W && !jQuery(w).data("adjusted") && (jQuery(w).css("margin-top", jQuery(B.Ba[wi].el).height() / 2 - jQuery(B.Ba[wi].el).height() / 2.3 / (!d.aa.document.DisableOverflow ? 1.5 : 3)), jQuery(w).height(jQuery(B.Ba[wi].el).height() / 2.3), jQuery(w).data("adjusted", q));
                                        jQuery(B.Ba[wi].el).parent().append(w);
                                    }
                                }
                                if (0 < jQuery("." + Q).length && !jQuery("." + Q).ec("mousedown", d.Bh)) {
                                    jQuery("." + Q).on("mousedown touchstart", d.Bh);
                                }
                                jQuery("." + Q).on("mouseout", function() {
                                    jQuery("." + Q).removeClass("flowpaper_selected_hover").addClass(W);
                                });
                                jQuery(d.ga).trigger("onMarkRedrawn", h);
                            }
                        }
                        if ("drawing" == h.type && (h.Sa && h.Ya && 2 == g) && ("Portrait" == d.aa.ba && (h.pageIndex == c + 1 || h.pageIndex == c) || "SinglePage" == d.aa.ba && h.pageIndex == d.aa.ca.la + 1 || "TwoPage" == d.aa.ba && (d.aa.ca.la == h.pageIndex - 1 || d.aa.ca.la == h.pageIndex - 2) || "BookView" == d.aa.ba && (d.aa.ca.la == h.pageIndex || d.aa.ca.la == h.pageIndex - 1))) {
                            B = h.pageIndex - 1;
                            "TwoPage" == d.aa.ba && (B = 0 == h.pageIndex % 2 ? 1 : 0);
                            "BookView" == d.aa.ba && (B = 1 < h.pageIndex && 0 != h.pageIndex % 2 ? 1 : 0);
                            "SinglePage" == d.aa.ba && (B = 0);
                            var L = r;
                            d.aa.ca.getPage(B) && (L = d.aa.Uc(B));
                            if (L != r) {
                                t = L.getContext("2d");
                                C = h.xe.split(":");
                                v = C[0].split(",");
                                w = parseFloat(d.aa.lc(B));
                                J = I = -1;
                                E = jQuery(O).css("margin-left");
                                parseInt(L.width) != parseInt(d.aa.ed(B)) && (L.width = d.aa.ed(B), L.height = d.aa.ce(B), jQuery(".flowpaper_drawing_" + B).remove());
                                ("TwoPage" == d.aa.ba || "BookView" == d.aa.ba) && jQuery(".flowpaper_drawing_" + B).remove();
                                I = parseFloat(v[0]);
                                J = parseFloat(v[1]);
                                I = I / h.Sa * l;
                                J = J / h.Ya * s;
                                t.lineJoin = "round";
                                t.lineCap = "round";
                                t.beginPath();
                                t.moveTo(I * w, J * w);
                                E = h.id;
                                h.note != r && (h.Lb != r && 0 <= h.Lb && h.Ab != r && 0 <= h.Ab) && (E += "_drawing");
                                if (0 == jQuery("#" + E).length) {
                                    var S = N = G = F = -1,
                                      O = d.aa.$d(B);
                                    for (var p = 0; p < C.length; p++) {
                                        v = C[p].split(",");
                                        I = parseFloat(v[0]);
                                        J = parseFloat(v[1]);
                                        I = I / h.Sa * l;
                                        J = J / h.Ya * s;
                                        if (-1 == F || F > I) {
                                            F = I;
                                        }
                                        G < I && (G = I);
                                        if (-1 == N || N > J) {
                                            N = J;
                                        }
                                        S < J && (S = J);
                                    }
                                    F -= 15;
                                    N -= 15;
                                    G += 15;
                                    S += 15;
                                    jQuery(O).append(String.format("<div id='{4}' class='flowpaper_annotation_{5} flowpaper_interactiveobject_{5} flowpaper_drawinghitarea flowpaper_annotation_{5}_page_{7}' style='position:absolute;left:{0}px;top:{1}px;width:{2}px;height:{3}px;z-index:100;margin-left:{6};'>&nbsp;</div>", F * w, N * w, (G - F) * w, (S - N) * w, E, d.ea, 0, c));
                                    jQuery("#" + E).data("mark", h);
                                    jQuery("#" + E).addClass("flowpaper_drawing_" + B);
                                    jQuery("#" + E).on("mousedown touchstart", function() {
                                        jQuery(this).corner("cc:#ff0000 notch 5px");
                                        jQuery(this).addClass("flowpaper_selected");
                                        d.Qa = jQuery(this).data("mark");
                                        jQuery(d.aa).trigger("onSelectedMarkChanged", d.Qa);
                                        d.ga.trigger("onSelectedMarkChanged", d.Qa);
                                        d.ga.trigger("onMarkClicked", d.Qa);
                                    });
                                    if (h.note != r && h.Lb != r && h.Ab != r && 0 <= h.Lb && h.Ab != r && 0 <= h.Ab && h.width != r && h.height != r && 0 < h.width && 0 < h.height) {
                                        F = C[0].split(","), v = C[C.length - 1].split(","), B = parseFloat(F[0]), C = parseFloat(F[1]), F = parseFloat(v[0]), v = parseFloat(v[1]), B = B / h.Sa * l, C = C / h.Ya * s, F = F / h.Sa * l, v = v / h.Ya * s, t.strokeStyle = "#DD0000", CanvasRenderingContext2D.prototype.dashedLine ? (t.lineWidth = 2, t.dashedLine(B * w, C * w, F * w, C * w, 3), t.dashedLine(F * w, C * w, F * w, v * w, 3), t.dashedLine(F * w, v * w, B * w, v * w, 3), t.dashedLine(B * w, v * w, B * w, C * w, 3)) : (t.lineWidth = 1, t.lineTo(B * w, C * w), t.lineTo(F * w, C * w), t.lineTo(F * w, v * w), t.lineTo(B * w, v * w), t.lineTo(B * w, C * w));
                                    } else {
                                        t.lineWidth = 1;
                                        for (p = 0; p < C.length; p++) {
                                            v = C[p].split(","), I = parseFloat(v[0]), J = parseFloat(v[1]), I = I / h.Sa * l, J = J / h.Ya * s, 0 < v.length && t.lineTo(I * w, J * w);
                                        }
                                    }
                                }
                                h.note != r && h.Lb != r && h.Ab != r && 0 <= h.Lb && h.Ab != r && 0 <= h.Ab && h.width != r && h.height != r && 0 < h.width && 0 < h.height ? (t.lineWidth = 2, t.strokeStyle = "#fa1100") : (t.lineWidth = 1, t.strokeStyle = h.color);
                                t.stroke();
                                jQuery(d.ga).trigger("onMarkRedrawn", h);
                            }
                        }
                        if (("note" == h.type || "highlight" == h.type && h.note != r && h.Lb != r && h.Ab != r && 0 < h.Lb && 0 < h.Ab || "drawing" == h.type && h.note != r && h.Lb != r && h.Ab != r && 0 < h.Lb && 0 < h.Ab && h.width != r && h.height != r && 0 < h.width && 0 < h.height) && h.Sa && h.Ya && 1 == g) {
                            if ("Portrait" == d.aa.ba && h.pageIndex == c + 1 || "SinglePage" == d.aa.ba && h.pageIndex == d.aa.ca.la + 1 || "TwoPage" == d.aa.ba && (d.aa.ca.la == h.pageIndex - 1 || d.aa.ca.la == h.pageIndex - 2) || "BookView" == d.aa.ba && (d.aa.ca.la == h.pageIndex || d.aa.ca.la == h.pageIndex - 1)) {
                                B = h.pageIndex - 1;
                                h.note || (h.note = "");
                                "TwoPage" == d.aa.ba && (B = 0 == h.pageIndex % 2 ? 1 : 0);
                                "BookView" == d.aa.ba && (B = 1 < h.pageIndex && 0 != h.pageIndex % 2 ? 1 : 0);
                                "SinglePage" == d.aa.ba && (B = 0);
                                L = d.aa.Uc(B);
                                L != r && L.width != parseInt(d.aa.ed(B)) && (L.width = d.aa.ed(B), L.height = d.aa.ce(B), jQuery(".flowpaper_drawing_" + B).remove());
                                O = d.aa.be(B);
                                w = parseFloat(d.aa.lc(B));
                                I = h.Lb;
                                J = h.Ab;
                                t = h.width;
                                C = eb.platform.touchonlydevice ? 25 : 15;
                                E = 0;
                                v = d.aa.ga.width() * w / 55;
                                F = eb.platform.touchonlydevice ? 15 : 10;
                                B = d.aa.ca.getPage(B);
                                0 == jQuery(O).length && (G = B.$a(), N = B.sb(), S = B.Kb(), G = "<div id='" + O.substr(1) + "' class='flowpaper_textLayer' style='width:" + G + "px;height:" + N + "px;margin-left:" + S + "px;'></div>", B.ba == P || B.ba == X ? jQuery(B.ya).append(G) : (B.ba == U || B.ba == R) && jQuery(B.ya + "_" + (B.pageNumber % 2 + 1)).append(G));
                                I = I / h.Sa * l;
                                J = J / h.Ya * s;
                                t = t / h.Sa * l;
                                "flash" == h.Sc && (h.Lb = I, h.Ab = J, h.Sa = l, h.Ya = s);
                                11 < v && (v = 11);
                                G = h.note;
                                if (d.aa.config.UserCollaboration) {
                                    if ("string" == typeof G && 0 <= G.indexOf("<notes") || "object" == typeof h.note) {
                                        var T = "";
                                        "string" == typeof G && 0 <= G.indexOf("<notes") && (h.note = h.note = jQuery(h.note));
                                        T += "<div class='flowpaper_textarea_data'>";
                                        h.note.find("note").each(function(c) {
                                            T += String.format("{2}<b>{1}:</b><br/>{0}", jQuery(this).text(), jQuery(this).attr("author"), 0 < c ? "<br/><br/>" : "");
                                        });
                                        T += "</div>";
                                        G = String.format("<div id='{2}' style='height:{3}px;font-size:{4}px;width:100%;overflow:auto;' class='flowpaper_note_textarea'>{0}<div><div class='flowpaper_textarea_contenteditable' style='margin-top:5px;width:99%;height:40px;color:#00;text-decoration:underline;text-align:right;font-size:{5}px;padding-bottom:10px;' contenteditable='true'>" + (!h.readonly ? "<img src='{1}' />Reply<br/><br/>" : "") + "</div></div></div>", T, d.Ye, u + "_textarea", h.height * w - C * w - F * w, v, v - 1);
                                    } else {
                                        G = 0 < h.note.length ? String.format("<div id='{2}' style='height:{3}px;font-size:{4}px;width:100%;overflow:auto;' class='flowpaper_note_textarea'><div class='flowpaper_textarea_data'><b>Unnamed user:</b><br/>{0}</div><div><div class='flowpaper_textarea_contenteditable' style='margin-top:5px;width:99%;height:40px;color:#00;text-decoration:underline;text-align:right;font-size:{5}px;padding-bottom:10px;' contenteditable='true'>" + (!h.readonly ? "<img src='{1}' />Reply<br/><br/>" : "") + "</div></div></div>", h.note, d.Ye, u + "_textarea", h.height * w - C * w - F * w, v, v - 1) : String.format("<div id='{2}' style='height:{3}px;font-size:{4}px;width:99%;overflow:auto;' class='flowpaper_note_textarea'><div class='flowpaper_textarea_data'></div><div><div class='flowpaper_textarea_contenteditable_userinfo'><b>{6}:</b><br/></div><div class='flowpaper_textarea_contenteditable' style='margin-top:5px;width:100%;height:40px;color:#00;text-decoration:none;text-align:left;font-size:{5}px;padding-bottom:10px;' contenteditable='true'></div></div></div>", h.note, d.Ye, u + "_textarea", h.height * w - C * w - F * w, v, v - 1, d.aa.config.CurrentUser);
                                    }
                                } else {
                                    G = String.format("<textarea id='{0}' style='height:{1}px;font-size:{2}px;width:100%;' {3} class='flowpaper_note_textarea'>{4}</textarea>", u + "_textarea", h.height * w - C * w - F * w, v, h.readonly ? "readonly" : "", h.note);
                                }
                                jQuery("#" + u).data("pscale", w);
                                0 == jQuery("#" + u).length ? (jQuery(O).append(String.format("<div id='{0}' class='flowpaper_note flowpaper_annotation_{12} flowpaper_interactiveobject_{12} flowpaper_annotation_{12}_page_{13}' style='left:{1}px;top:{2}px;width:{3}px;height:{4}px;z-index:105;margin-left:{14};padding:2px 2px 5px 2px;'><div id='{0}_block' class='flowpaper_note_container' style='display:block;width:100%;height:{5}px;white-space:nowrap;overflow:hidden;'>{16}</div><div style='margin-right:5px;'>{10}</div><div id='{0}_block2' style='display:block;width:100%;height:{6}px;'></div></div>", u, I * w, J * w, t * w, h.height * w, C * w, F * w, h.height * w - C * w - F * w, h.id + "_textarea", h.width * w, G, v, d.ea, c, E, d.sj, h.yg != r && !d.aa.config.UserCollaboration ? h.yg : "")), jQuery("#" + u).data("mark", h), jQuery("#" + u).corner("2px tl tr"), jQuery("#" + u).data("pscale", w), B.rotation && 0 != B.rotation && jQuery("#" + u).transition({
                                    rotate: -B.rotation
                                }, 0), h.readonly || (jQuery("#" + u).draggable({
                                    containment: d.aa.ga,
                                    start: function() {
                                        d.aa.tb = q;
                                        window.Mb = y;
                                        L && (L.width -= 1);
                                        d.Db(c);
                                        d.Qa = jQuery(this).data("mark");
                                        jQuery(this).addClass("flowpaper_note_selected");
                                        jQuery(d.aa).trigger("onSelectedMarkChanged", d.hd(d.Qa));
                                        d.ga.trigger("onSelectedMarkChanged", d.Qa);
                                        d.aa.ca.jScrollPane != r && d.aa.ca.jScrollPane.data("jsp").disable();
                                        jQuery("#" + jQuery(this).attr("id") + "_block").hide();
                                        jQuery("#" + jQuery(this).attr("id") + "_textarea").hide();
                                        jQuery("#" + jQuery(this).attr("id") + "_block2").hide();
                                        jQuery("#" + jQuery(this).attr("id")).data("interacting", q);
                                        jQuery("#" + jQuery(this).attr("id")).addClass("flowpaper_note_semitrans");
                                    },
                                    drag: z(),
                                    stop: function(g, h) {
                                        L && (L.width -= 1);
                                        d.aa.tb = y;
                                        d.aa.ca.jScrollPane != r && d.aa.ca.jScrollPane.data("jsp").enable();
                                        var m = jQuery(this).data("mark");
                                        m.positionY = h.position.top / jQuery(this).data("pscale");
                                        m.positionX = h.position.left / jQuery(this).data("pscale");
                                        jQuery("#" + jQuery(this).attr("id")).removeClass("flowpaper_note_semitrans");
                                        jQuery("#" + jQuery(this).attr("id")).data("interacting", y);
                                        jQuery("#" + jQuery(this).attr("id") + "_textarea").show();
                                        jQuery("#" + jQuery(this).attr("id") + "_block").show();
                                        jQuery("#" + jQuery(this).attr("id") + "_textarea").show();
                                        d.Db(c);
                                        d.ga.trigger("onMarkChanged", d.hd(m));
                                    }
                                }), jQuery("#" + u).resizable({
                                    resize: function() {
                                        d.aa.tb = q;
                                        window.Mb = y;
                                        d.Qa = jQuery(this).data("mark");
                                        jQuery(this).addClass("flowpaper_note_selected");
                                        jQuery(d.aa).trigger("onSelectedMarkChanged", d.hd(d.Qa));
                                        d.ga.trigger("onSelectedMarkChanged", d.Qa);
                                        d.aa.ca.jScrollPane != r && d.aa.ca.jScrollPane.data("jsp").disable();
                                        jQuery("#" + jQuery(this).attr("id") + "_block").hide();
                                        jQuery("#" + jQuery(this).attr("id") + "_textarea").hide();
                                        jQuery("#" + jQuery(this).attr("id") + "_block2").hide();
                                        jQuery("#" + jQuery(this).attr("id")).data("interacting", q);
                                        jQuery("#" + jQuery(this).attr("id")).addClass("flowpaper_note_semitrans");
                                    },
                                    stop: function(g, m) {
                                        d.aa.tb = y;
                                        d.aa.ca.jScrollPane != r && d.aa.ca.jScrollPane.data("jsp").enable();
                                        jQuery(this).data("mark").width = m.size.width / jQuery(this).data("pscale");
                                        jQuery(this).data("mark").height = m.size.height / jQuery(this).data("pscale");
                                        jQuery("#" + jQuery(this).attr("id")).removeClass("flowpaper_note_semitrans");
                                        jQuery("#" + jQuery(this).attr("id")).data("interacting", y);
                                        d.Db(c);
                                        d.ga.trigger("onMarkChanged", d.hd(h));
                                    }
                                }), jQuery("#" + h.id + "_textarea").on("mousedown touchstart", function() {
                                    d.aa.tb = q;
                                    jQuery("#" + jQuery(this).attr("id")).focus();
                                    jQuery("#" + jQuery(this).parent().parent().attr("id")).draggable("disable");
                                }), jQuery("#" + h.id + "_textarea").on("remove", function() {
                                    jQuery(this).closest(".flowpaper_note").data("changed") && jQuery(this).closest("textarea").trigger("change");
                                }), jQuery("#" + h.id + "_textarea").on("touchstart mousedown keydown paste input", function() {
                                    jQuery(this).closest(".flowpaper_note").data("changed", q);
                                })), jQuery("#" + h.id + "_textarea").bind("blur", function() {
                                    d.aa.tb = y;
                                }), 0 == h.note.length && (d.aa.config.UserCollaboration ? (t = jQuery("#" + h.id + "_textarea").find(".flowpaper_textarea_contenteditable"), t.css({
                                    "background-color": "#ffffff"
                                })) : t = jQuery("#" + h.id + "_textarea"), t.focus(), t.parent().scrollTo(t)), d.aa.config.UserCollaboration && (jQuery("#" + h.id + "_textarea").find(".flowpaper_textarea_contenteditable").bind("touchstart mousedown keydown paste input", function() {
                                    var c = jQuery(this),
                                      e = jQuery(this).closest(".flowpaper_note").data("mark");
                                    eb.platform.touchonlydevice && c.focus();
                                    if (0 <= c.html().indexOf("<img")) {
                                        return c.parent().prepend("<div class='flowpaper_textarea_contenteditable_userinfo'><br/><b>" + d.aa.config.CurrentUser + ":</b></div>"), c.css({
                                            "text-align": "left"
                                        }), c.css({
                                            "text-decoration": "none"
                                        }), c.html(""), c.css({
                                            "background-color": "#ffffff"
                                        }), c.focus(), c.closest("flowpaper_note_textarea").scrollTo("max"), "string" == typeof e.note && -1 == e.note.indexOf("<notes") && (c = String.format('<notes mark_id="{0}"><note author="{2}">{1}</note></notes>', h.id, e.note, "Unnamed user"), e.note = jQuery(c)), (c = e && e.note.find("note").last()) && 0 < c.text().length && e.note.find("note").last().parent().append(String.format("<note author='{0}'></note>", d.aa.config.CurrentUser)), y;
                                    }
                                }), jQuery("#" + h.id + "_textarea").bind("blur keyup paste input", function() {
                                    var c = jQuery(this);
                                    c.data("before") !== c.html() && -1 == c.html().indexOf("<img") && (c.data("before", c.html()), c.trigger("change"));
                                    return c;
                                }), jQuery("#" + h.id + "_textarea").bind("focusout", function() {
                                    var c = jQuery(this).find(".flowpaper_textarea_contenteditable");
                                    if (0 < c.html().length && "<br>" != c.html() && !c.is(":focus") && -1 == c.html().indexOf("<img")) {
                                        var e = c.parent().parent().find(".flowpaper_textarea_data"),
                                          g = jQuery(jQuery(this).closest(".flowpaper_note").data("mark").note).find("note").length;
                                        e.append(String.format("{0}<b>" + d.aa.config.CurrentUser + ":</b><br/>" + c.html(), 1 < g ? "<br/><br/>" : ""));
                                    }
                                    c.is(":focus") || ("object" == typeof jQuery(this).closest(".flowpaper_note").data("mark").note && (c.parent().find(".flowpaper_textarea_contenteditable_userinfo").remove(), c.css({
                                        "text-align": "right"
                                    }), c.css({
                                        "text-decoration": "underline"
                                    }), c.css({
                                        "background-color": ""
                                    }), c.html(String.format("<img src='{0}' />Reply<br/><br/>", d.Ye))), c.parent().parent().scrollTop(c.parent().parent()[0].scrollHeight));
                                })), jQuery("#" + h.id + "_textarea").on("change", function() {
                                    var c = jQuery(this).closest(".flowpaper_note").data("mark"),
                                      e = jQuery(this).find(".flowpaper_textarea_contenteditable");
                                    if (d.aa.config.UserCollaboration) {
                                        if (-1 == e.html().indexOf("<img")) {
                                            if ("string" == typeof c.note && -1 == c.note.indexOf("<notes")) {
                                                var g = String.format('<notes mark_id="{0}"><note author="{2}">{1}</note></notes>', h.id, e.html(), d.aa.config.CurrentUser);
                                                c.note = jQuery(g);
                                            }
                                            c.note.find("note").last().text(e.html());
                                        }
                                    } else {
                                        c.note = jQuery(this).val();
                                    }
                                    window.clearTimeout(d.hk);
                                    d.hk = setTimeout(function() {
                                        d.ga.trigger("onMarkChanged", d.hd(c));
                                    }, 300);
                                }), jQuery("#" + u).on("mouseover", function() {
                                    jQuery(this).addClass("flowpaper_note_selected");
                                }), jQuery("#" + u).on("mouseout", function() {
                                    (jQuery(this).data("interacting") == r || jQuery(this).data("interacting") != r && jQuery(this).data("interacting") != q) && jQuery(this).data("mark") != d.Qa && jQuery(this).removeClass("flowpaper_note_selected");
                                }), jQuery("#" + u).on("mousedown touchstart", function(c) {
                                    c.stopPropagation && c.stopPropagation();
                                    window.Mb = y;
                                    d.Qa = jQuery(this).data("mark");
                                    c = jQuery.extend({}, d.Qa);
                                    "string" != typeof c.note && (c.note = "<notes>" + c.note.find("note").parent().html() + "</notes>");
                                    jQuery(this).addClass("flowpaper_note_selected");
                                    jQuery(d.aa).trigger("onSelectedMarkChanged", d.hd(d.Qa));
                                    d.ga.trigger("onSelectedMarkChanged", d.Qa);
                                    d.ga.trigger("onMarkClicked", c);
                                    eb.platform.touchdevice || jQuery("#" + jQuery(this).attr("id") + "_textarea").focus();
                                    d.Qa.readonly || jQuery(this).draggable("enable");
                                }), jQuery(d.ga).trigger("onMarkRedrawn", h)) : (jQuery("#" + u).css({
                                    left: I * w,
                                    top: J * w,
                                    width: h.width * w,
                                    height: h.height * w,
                                    "margin-left": E
                                }), jQuery("#" + u + "_block").css({
                                    height: C * w
                                }), jQuery("#" + u + "_block2").css({
                                    height: F * w
                                }), jQuery("#" + u + "_textarea").css({
                                    height: h.height * w - C * w - F * w,
                                    "font-size": v
                                }), B.rotation && 0 != B.rotation ? jQuery("#" + u).transition({
                                    rotate: -B.rotation
                                }, 0) : jQuery("#" + u).transition({
                                    rotate: 0
                                }, 0), jQuery("#" + u + "_block").show(), jQuery("#" + u + "_textarea").show(), jQuery("#" + u + "_block2").show());
                                "note" == h.type && (h.xe != r && 0 < h.xe.length && L) && (v = h.xe.split(","), B = parseFloat(v[0]), C = parseFloat(v[1]), B = B / h.Sa * l, C = C / h.Ya * s, d.Id ? (t = L.getContext("2d"), t.drawImage(d.Id, B * w, C * w)) : (d.Id = new Image, u = {}, u.ul = B, u.Jh = w, u.vl = C, jQuery(d.Id).data("position", u), jQuery(d.Id).bind("load", function() {
                                    var c = L.getContext("2d"),
                                      e = jQuery(this).data("position");
                                    c.drawImage(d.Id, e.ul * e.Jh, e.vl * e.Jh);
                                }), d.Id.src = d.jk), B < I + h.width ? 0 < jQuery("#" + h.id + "_line").length ? FLOWPAPER.bf(h.id, I * w, J * w, B * w + 5, C * w, E) : jQuery(O).append(FLOWPAPER.Ie(h.id, I * w, J * w, B * w + 5, C * w, E, d.ea)) : 0 < jQuery("#" + h.id + "_line").length ? FLOWPAPER.bf(h.id, I * w + h.width * w, J * w, B * w + 5, C * w, E) : jQuery(O).append(FLOWPAPER.Ie(h.id, I * w, J * w, B * w + 5, C * w, E, d.ea)));
                                "drawing" == h.type && (h.note != r && h.Lb != r && h.Ab != r && !d.aa.tb) && (C = h.xe.split(":"), F = C[0].split(","), v = C[C.length - 1].split(","), B = parseFloat(F[0]), C = parseFloat(F[1]), F = parseFloat(v[0]), v = parseFloat(v[1]), B = B / h.Sa * l, C = C / h.Ya * s, F = F / h.Sa * l, v = v / h.Ya * s, 0 < jQuery("#" + h.id + "_line").length ? FLOWPAPER.bf(h.id, I * w, J * w, (I > F ? F : B) * w, (J > C ? v : C) * w, E) : jQuery(O).append(FLOWPAPER.Ie(h.id, I * w, J * w, F * w, C * w, E, d.ea)));
                                if ("highlight" == h.type && h.note != r && h.Lb != r && h.Ab != r && !d.aa.tb) {
                                    var t = h.selection_info.split(";"),
                                      B = ra(d.ea, parseInt(t[0]) - 1),
                                      v = parseInt(t[1]),
                                      F = parseInt(t[2]);
                                    if (B != r) {
                                        for (N = t = C = G = 0; N < B.words.length; N++) {
                                            G == v - 1 && (C = N);
                                            if (G + B.words[N].length == F - 1) {
                                                t = N;
                                                break;
                                            }
                                            if (G + B.words[N].length >= F - 1) {
                                                t = N;
                                                break;
                                            }
                                            G += B.words[N].length;
                                        }
                                        s = jQuery("#" + h.id + "_" + C);
                                        l = 0;
                                        0 < jQuery("#" + h.id + "_" + t).length && (l = jQuery("#" + h.id + "_" + t).position().left > jQuery("#" + h.id + "_" + C).position().left ? jQuery("#" + h.id + "_" + t).position().left - jQuery("#" + h.id + "_" + C).position().left : jQuery("#" + h.id + "_" + C).position().left - jQuery("#" + h.id + "_" + t).position().left, midy = jQuery("#" + h.id + "_" + t).position().top - jQuery("#" + h.id + "_" + C).position().top);
                                        0 < s.length && (0 < s.position().top && 0 < s.position().left) && (0 < jQuery("#" + h.id + "_line").length ? FLOWPAPER.bf(h.id, I * w, J * w, s.position().left + l, s.position().top + midy + s.height(), E) : jQuery(O).append(FLOWPAPER.Ie(h.id, I * w, J * w, s.position().left + l, s.position().top + midy + s.height(), E, d.ea)));
                                    }
                                }
                            }
                        }
                    }
                }
                if (!jQuery(".flowpaper_page").ec("mousedown", d.Ze)) {
                    jQuery(".flowpaper_page, .flowpaper_interactivearea").on("mousedown", function(c) {
                        d.Ze(d, c);
                    });
                }
                if (!jQuery(".flowpaper_page").ec("touchstart", d.Ze)) {
                    jQuery(".flowpaper_page, .flowpaper_interactivearea").on("touchstart", function(c) {
                        d.Ze(d, c);
                    });
                }
            } else {
                window.clearTimeout(d.zk), d.zk = setTimeout(function() {
                    d.Db(c);
                }, 300);
            }
        }
    };
    this.hd = function(c) {
        var d = jQuery.extend({}, c);
        d.note = c.note;
        d.note && "string" != typeof d.note ? d.note = "<notes>" + d.note.find("note").parent().html() + "</notes>" : d.note && "string" == typeof d.note && (d.note = c.note);
        return d;
    };
    this.Xm = function() {
        jQuery(".flowpaper_selected_selected").removeClass("flowpaper_selected_selected");
        jQuery(".flowpaper_note_selected").removeClass("flowpaper_note_selected");
    };
    this.Ze = function(c, d) {
        var g = jQuery(d.target).data("mark") != r ? jQuery(d.target).data("mark") : jQuery(d.target).parent().data("mark") != r ? jQuery(d.target).parent().data("mark") : jQuery(d.target).parent().parent().data("mark");
        jQuery(".flowpaper_selected_selected").each(function() {
            g != r && g != jQuery(this).data("mark") ? (jQuery(this).removeClass("flowpaper_selected_selected"), jQuery(this).addClass(jQuery(this).data("selectionClass"))) : g == r && (jQuery(this).removeClass("flowpaper_selected_selected"), jQuery(this).addClass(jQuery(this).data("selectionClass")), c.Qa = r, jQuery(c.zf).trigger("onSelectedMarkChanged", r));
        });
        jQuery(".flowpaper_note_selected").each(function() {
            g != r && g != jQuery(this).data("mark") ? jQuery(this).removeClass("flowpaper_note_selected") : g == r && (jQuery(this).removeClass("flowpaper_note_selected"), c.Qa = r, jQuery(c.zf).trigger("onSelectedMarkChanged", r));
        });
        jQuery(".flowpaper_selected").each(function() {
            g != r && g != jQuery(this).data("mark") ? (jQuery(this).removeClass("flowpaper_selected"), jQuery(this).uncorner()) : g == r && (jQuery(this).removeClass("flowpaper_selected"), jQuery(this).uncorner(), c.Qa = r, jQuery(c.zf).trigger("onSelectedMarkChanged", r));
        });
    };
    this.Bh = function(c) {
        var d = jQuery(c.target).data("handler"),
          g = jQuery(c.target).data("classid"),
          n = jQuery(c.target).data("selectionClass");
        d.Qa = jQuery(c.target).data("mark");
        jQuery("." + g).removeClass(n).addClass("flowpaper_selected_selected");
        jQuery(d.aa).trigger("onSelectedMarkChanged", d.Qa);
        d.ga.trigger("onSelectedMarkChanged", d.Qa);
        d.ga.trigger("onMarkClicked", d.Qa);
    };
    this.Gb = function() {
        jQuery(this.da).find(".flowpaper_bttnHighlight").removeClass("flowpaper_tbtextbutton_pressed");
        jQuery(this.da).find(".flowpaper_bttnComment").removeClass("flowpaper_tbtextbutton_pressed");
        jQuery(this.da).find(".flowpaper_bttnStrikeout").removeClass("flowpaper_tbtextbutton_pressed");
        jQuery(this.da).find(".flowpaper_bttnDraw").removeClass("flowpaper_tbtextbutton_pressed");
        jQuery(this.da + "_popup").css("visibility", "hidden");
        this.He();
        jQuery(".flowpaper_interactivearea").addClass("flowpaper_grab");
        this.aa.ud();
        this.aa.Xb();
    };
    this.He = function() {
        jQuery(".flowpaper_interactivearea").removeClass("flowpaper_interactive_note");
        jQuery(".flowpaper_interactivearea").removeClass("flowpaper_interactive_note_ie");
        jQuery(".flowpaper_interactivearea").removeClass("flowpaper_note_marker");
        jQuery(".flowpaper_interactivearea").removeClass("flowpaper_note_marker_ie");
    };
    this.ah = function(c) {
        return c ? "flowpaper_selected_orange" == this.aa.Ma ? "#facd56" : "flowpaper_selected_green" == this.aa.Ma ? "#c2f785" : "flowpaper_selected_blue" == this.aa.Ma ? "#9cdcff" : "#fff774" : "#fb5450";
    };
    this.Mj = function(c) {
        return "#facd56" == c ? "flowpaper_selected_orange" : "#c2f785" == c ? "flowpaper_selected_green" : "#9cdcff" == c ? "flowpaper_selected_blue" : "#fb5450" == c ? "flowpaper_selected_strikeout" : "flowpaper_selected_yellow";
    };
};

function Z() {
    function g() {
        return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
    }
    return g() + g() + "-" + g() + "-" + g() + "-" + g() + "-" + g() + g() + g();
}
CanvasRenderingContext2D.prototype.dashedLine = function(g, c, d, e, f) {
    f == k && (f = 2);
    this.beginPath();
    this.moveTo(g, c);
    var m = d - g,
      n = e - c;
    f = Math.floor(Math.sqrt(m * m + n * n) / f);
    for (var m = m / f, n = n / f, l = 0; l++ < f;) {
        g += m, c += n, this[0 == l % 2 ? "moveTo" : "lineTo"](g, c);
    }
    this[0 == l % 2 ? "moveTo" : "lineTo"](d, e);
    this.stroke();
    this.closePath();
};
D = ta.prototype;
D.Jb = function(g, c, d) {
    if (this.aa.ba == U || this.aa.ba == R) {
        this.ca[0].Jb(g, r, d), this.ca[1].Jb(g, r, d);
    } else {
        for (var e = 0; e < this.getTotalPages(); e++) {
            this.vb(e) && this.ca[e].jb && this.ca[e].Jb(g, c == e, d);
        }
    }
    this.cd = q;
};
D.kd = function(g) {
    for (var c = 0; c < this.getTotalPages(); c++) {
        this.vb(c) && this.ca[c].kd(g);
    }
};
D.Xb = function(g) {
    if (this.aa.ba == U || this.aa.ba == R) {
        this.ca[0].Xb(), this.ca[1] && this.ca[1].Xb();
    } else {
        for (var c = 0; c < this.getTotalPages(); c++) {
            (!g || g && (this.ca[c] && !this.ca[c].jb) && this.vb(c)) && this.ca[c].Xb();
        }
    }
    this.cd = y;
};
D.Uc = function(g) {
    return !this.getPage(g) ? r : this.getPage(g).Uc();
};
D.Vd = function() {
    for (var g = 0; g < this.getTotalPages(); g++) {
        this.vb(g) && this.ca[g].Vd();
    }
};
D.ud = function() {
    for (var g = 0; g < this.getTotalPages(); g++) {
        this.vb(g) && this.ca[g].ud();
    }
};
D.Sb = function() {
    if (this.aa.ba == U || this.aa.ba == R) {
        this.ca[0].Sb(), this.ca[1].Sb();
    } else {
        for (var g = 0; g < this.getTotalPages(); g++) {
            this.vb(g) && this.ca[g].Sb();
        }
    }
};
D.ke = aa(q);

function wa(g, c) {
    if (g.jb) {
        var d = g.Kj();
        if (0 != jQuery(d).length) {
            var e = "";
            if (eb.browser.msie || eb.browser.Vc) {
                e = "-ms-touch-action:none; touch-action:none;";
            }
            g.aa.ba == U || g.aa.ba == R ? jQuery(d).append("<canvas id='" + g.qb() + "' class='flowpaper_interactive_canvas flowpaper_interactivearea flowpaper_interactiveobject_" + g.pageNumber + "_" + g.ea + "' flowpaper_interactiveobject_" + g.ea + " flowpaper_annotation_" + g.ea + "' style='z-index:11;position:absolute;left:0px;top:0px;display:block;" + e + "' width='" + g.$a() + "' height='" + g.sb() + "'></canvas>") : (g.aa.renderer.Ec && jQuery(d).empty(), jQuery(d).append("<canvas id='" + g.qb() + "' class='flowpaper_interactive_canvas flowpaper_interactivearea flowpaper_interactiveobject_" + g.ea + " flowpaper_annotation_" + g.ea + "' style='z-index:11;position:absolute;left:0px;top:0px;display:block;" + e + "' width='" + g.$a() + "' height='" + g.sb() + "'></canvas>"));
            !(eb.browser.msie && 9 > eb.browser.version) && !eb.platform.ios && (new ha(g.aa, "#" + g.qb(), g.ia(g.ya).parent())).scroll();
            eb.browser.msie && (9 > eb.browser.version && !jQuery("#" + g.qb()).data("excanvasinitialized")) && (g.Ff = G_vmlCanvasManager.initElement(jQuery("#" + g.qb()).get(0)), jQuery(g.Ff).css({
                background: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"
            }), jQuery("#" + g.qb()).data("excanvasinitialized", q));
            jQuery(d).removeClass("flowpaper_hidden");
            g.aa.ba != U && g.aa.ba != R && jQuery(d).css("position", "absolute");
            jQuery("#" + g.qb()).on("onDrawingStopped", function(c, d) {
                jQuery(g.aa).trigger("onDrawingStopped", [g, d]);
            });
            g.Xa = jQuery("#" + g.qb()).sketch();
            jQuery(g.Xa).data("sketch").color = c;
        }
    }
}
D = sa.prototype;
D.Jb = function(g, c, d) {
    0 < jQuery("#" + this.qb()).length ? (jQuery(this.Xa).data("sketch").enabled = q, jQuery(this.Xa).data("sketch").actions = [], jQuery("#" + this.qb()).css("z-index", 11), this.Ff && jQuery(this.Ff).css({
        background: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"
    }), jQuery(".flowpaper_pageword_" + this.ea + "_page_" + this.pageNumber).css("z-index", 9), jQuery(".pdfPageLink_" + this.pageNumber).css("z-index", 9), jQuery(".flowpaper_drawinghitarea").css("z-index", 9), d ? jQuery(this.Xa).data("sketch").drawingTool = d : jQuery(this.Xa).data("sketch").drawingTool = r) : (wa(this, g), jQuery(".flowpaper_pageword_" + this.ea + "_page_" + this.pageNumber).css("z-index", 9), jQuery(".pdfPageLink_" + this.pageNumber).css("z-index", 9), jQuery(".flowpaper_drawinghitarea").css("z-index", 9), jQuery(this.Xa).data("sketch").enabled = q);
    this.Xa && jQuery(this.Xa).data("sketch") && (jQuery(this.Xa).data("sketch").color = g);
};
D.kd = function(g) {
    this.Xa != r && jQuery(this.Xa).data("sketch") && (jQuery(this.Xa).data("sketch").color = g);
};
D.Uc = function() {
    0 == jQuery("#" + this.qb()).length && (wa(this), this.Xa && jQuery(this.Xa).data("sketch") && (jQuery(this.Xa).data("sketch").enabled = y));
    return document.getElementById(this.qb());
};
D.Xb = function() {
    this.Xa != r && (jQuery(this.Xa).data("sketch") && jQuery(this.Xa).data("sketch").enabled) && (jQuery(this.Xa).data("sketch").enabled = y, 0 < jQuery("#" + this.qb()).length && "9" != jQuery("#" + this.qb()).css("z-index") && (jQuery(".flowpaper_pageword_" + this.ea + "_page_" + this.pageNumber).css("z-index", 11), jQuery(".flowpaper_drawinghitarea").css("z-index", 11)), jQuery(".pdfPageLink_" + this.pageNumber).css("z-index", 20), jQuery("#" + this.qb()).css("z-index", "9"), FLOWPAPER.yj(), jQuery(".flowpaper_interactive_canvas").removeClass("flowpaper_interactive_note"));
};
D.Vd = function() {
    this.Xa != r && jQuery(this.Xa).data("sketch") && (jQuery(this.Xa).data("sketch").enabled = y);
};
D.ud = function() {
    this.Xa != r && jQuery(this.Xa).data("sketch") && (jQuery(this.Xa).data("sketch").enabled = q);
};
D.Sb = function() {
    "ImagePageRenderer" == this.aa.renderer.ee() && (this.aa.ba == P && (jQuery(this.qj).unbind("onDrawingStopped"), jQuery(this.pa).empty()), (this.aa.ba == U || this.aa.ba == R) && jQuery("#" + this.qb()).remove());
};
D.ke = aa(q);
D.loadOverlay = function() {
    if (this.aa.ba == U) {
        var g = document.getElementById(this.qb());
        g && (g.width = this.$a());
    }
};
var xa = "undefined" == typeof window;
xa && (window = []);
var FlowPaperViewer_HTML = window.FlowPaperViewer_HTML = function() {
    function g(c) {
        window.annotations = q;
        this.config = c;
        this.ib = this.config.instanceid;
        this.document = this.config.document;
        this.ea = this.config.rootid;
        this.ga = {};
        this.kc = this.ja = r;
        this.selectors = {};
        this.ba = P;
        this.Bb = c.document.InitViewMode != r && "undefined" != c.document.InitViewMode && "" != c.document.InitViewMode ? c.document.InitViewMode : window.zine ? ea : P;
        this.initialized = y;
        this.Ma = "flowpaper_selected_default";
        this.Wa = {};
        this.qa = [];
        this.Vi = "data:image/gif;base64,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%3D";
        this.vg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAAXNSR0IArs4c6QAAAAZiS0dEAFEAUQBRjSJ44QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wCCgEMO6ApCe8AAAFISURBVCjPfZJBi49hFMV/521MUYxEsSGWDDWkFKbkA/gAajaytPIFLKx8BVkodjP5AINGU0xZKAslC3Ys2NjP+VnM++rfPzmb23065z6de27aDsMwVD0C3AfOAYeB38BP9fEwDO/aMgwDAAFQDwKbwC9gZxScUM8Al5M8SPJ0Eu5JYV0FeAZcBFaAxSSPkjwHnrQ9Pf1E22XVsX5s+1m9o54cB9J2q+361KM+VN+ot9uqrjIH9VJbpz7qOvAeuAIcSnJzThA1SXaTBGAAvgCrwEvg0yxRXUhikrOjZ1RQz7uHFfUu/4C60fb16G9hetxq+1a9Pkdears2Dt1Rj87mdAx4BfwAttWvSQ4AV9W1aYlJtoFbmQJTjwP3gAvAIlDgG7CsXvu7uWQzs+cxmj0F7Fd3k3wfuRvqDWAfM+HxP6hL6oe2tn3xB7408HFbpc41AAAAAElFTkSuQmCC";
        this.kf = "data:image/png;base64,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%3D";
        this.Wi = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAMAAADzN3VRAAAARVBMVEX///////////////////////////////////////////////////////////////////////////////////////////+QFj7cAAAAFnRSTlMAHDE8PkJmcXR4eY+Vs8fL09Xc5vT5J4/h6AAAAFtJREFUeNqt0kkOgDAMQ9EPZSgztMX3PyoHiMKi6ttHkZ1QI+UDpmwkXl0QZbwUnTDLKEg3LLIIQw/dYATa2vYI425sSA+ssvw8/szPnrb83vyu/Tz+Tf0/qPABFzEW/E1C02AAAAAASUVORK5CYII=";
        this.Nl = "";
        this.pl = this.ea + "_textoverlay";
        this.pg = "#" + this.pl;
        this.ra = 1;
        this.dn = r;
        this.renderer = this.config.renderer;
        this.Za = "toolbar_" + this.ea;
        this.da = "#" + this.Za;
        this.Ta = y;
        this.Zc = "highlight";
        this.scale = this.config.document.Scale;
        this.resources = new FlowPaper_Resources(this);
        this.nf = y;
        this.Rd = 0;
        this.linkColor = "#72e6ff";
        this.Se = 0.4;
    }
    g.prototype = {
        ia: function(c) {
            if (0 < c.indexOf("undefined")) {
                return jQuery(r);
            }
            this.selectors || (this.selectors = {});
            this.selectors[c] || (this.selectors[c] = jQuery(c));
            return this.selectors[c];
        },
        na: function() {
            return this.ha ? this.ha.na : "";
        },
        loadFromUrl: function(c) {
            var d = this;
            d.$e();
            var e;
            window.annotations && d.plugin && d.plugin.Dg();
            if (d.ca) {
                for (var f = 0; f < d.document.numPages; f++) {
                    d.ca.ca[f] && delete d.ca.ca[f];
                }
            }
            eb.browser.fb.al && c.PDFFile ? e = new CanvasPageRenderer(this.ea, c.PDFFile, d.config.jsDirectory, {
                jsonfile: c.jsonfile,
                pageImagePattern: c.pageImagePattern,
                JSONDataType: d.renderer.config.JSONDataType,
                signature: d.renderer.config.signature
            }) : c.JSONFile && c.IMGFiles && (e = new ImagePageRenderer(this.ea, {
                jsonfile: c.JSONFile,
                pageImagePattern: c.IMGFiles,
                JSONDataType: d.renderer.config.JSONDataType,
                signature: d.renderer.config.signature
            }, d.config.jsDirectory));
            if (d.renderer = e) {
                d.ue = "", d.hg(), d.renderer = e, e.initialize(function() {
                    d.document.numPages = e.getNumPages();
                    d.document.dimensions = e.getDimensions();
                    d.document.StartAtPage = c.StartAtPage;
                    d.loadDoc(e, e.getNumPages());
                });
            }
        },
        loadDoc: function(c, d) {
            this.initialized = y;
            this.document.numPages = d;
            this.renderer = c;
            this.show();
        },
        getDimensions: function(c) {
            return this.renderer.getDimensions(c);
        },
        Rg: function(c) {
            if (jQuery(c.target).hasClass("flowpaper_note_container") && eb.platform.touchdevice) {
                return window.Mb = y, q;
            }
            var d = !eb.platform.touchdevice || "undefined" === typeof c.originalEvent.touches ? c.pageX : c.originalEvent.touches[0].pageX,
              e = !eb.platform.touchdevice || "undefined" === typeof c.originalEvent.touches ? c.pageY : c.originalEvent.touches[0].pageY;
            if (this.Ta || eb.platform.touchdevice) {
                c.target && (c.target.id && 0 <= c.target.id.indexOf("page") && 0 <= c.target.id.indexOf("word")) && (hoverPage = parseInt(c.target.id.substring(c.target.id.indexOf("_") + 1)), hoverPageObject = ra(this.ea, hoverPage));
                if ((hoverPageObject || window.Mb) && window.Mb) {
                    eb.platform.touchdevice && (c.preventDefault && c.preventDefault(), c.stopPropagation && c.stopPropagation(), this.ca.jScrollPane && this.ca.jScrollPane.data("jsp").disable());
                } else {
                    return q;
                }
                this.ba == this.na() && 1 < this.scale ? window.b = hoverPageObject.yh(c.target.id) : window.b = hoverPageObject.match({
                    left: d,
                    top: e
                }, y);
                window.b != r && (window.a != r && window.a.pageNumber != window.b.pageNumber) && (window.a = hoverPageObject.match({
                    left: d - 1,
                    top: e - 1
                }, y));
                this.Fc(q);
                this.sa = hoverPageObject.rd(q, this.Ma);
            } else {
                if (c.target && (c.target.id && 0 <= c.target.id.indexOf("page")) && (hoverPage = parseInt(c.target.id.substring(c.target.id.indexOf("_") + 1)), hoverPageObject = ra(this.ea, hoverPage)), hoverPageObject && hoverPageObject.match({
                    left: d,
                    top: e
                }, q), !hoverPageObject && !window.Mb) {
                    return q;
                }
            }
        },
        Fc: function(c) {
            eb.platform.touchdevice || (this.sa = r);
            this.Ta && (jQuery(".flowpaper_pageword_" + this.ea).removeClass("flowpaper_selected"), jQuery(".flowpaper_pageword_" + this.ea).removeClass("flowpaper_selected_default"));
            c && jQuery(".flowpaper_pageword_" + this.ea).each(function() {
                jQuery(this).hasClass("flowpaper_selected_yellow") && !jQuery(this).data("isMark") && jQuery(this).removeClass("flowpaper_selected_yellow");
                jQuery(this).hasClass("flowpaper_selected_orange") && !jQuery(this).data("isMark") && jQuery(this).removeClass("flowpaper_selected_orange");
                jQuery(this).hasClass("flowpaper_selected_green") && !jQuery(this).data("isMark") && jQuery(this).removeClass("flowpaper_selected_green");
                jQuery(this).hasClass("flowpaper_selected_blue") && !jQuery(this).data("isMark") && jQuery(this).removeClass("flowpaper_selected_blue");
                jQuery(this).hasClass("flowpaper_selected_strikeout") && !jQuery(this).data("isMark") && jQuery(this).removeClass("flowpaper_selected_strikeout");
            });
        },
        Tg: function(c) {
            this.Pf = "up";
            this.tb = this.Lf = y;
            this.xh = r;
            if (!this.ca || !this.ca.Qd) {
                if (jQuery(c.target).hasClass("flowpaper_searchabstract_result") || jQuery(c.target).parent().hasClass("flowpaper_searchabstract_result") || jQuery(c.target).hasClass("flowpaper_note_container")) {
                    return q;
                }
                if (this.Ta || eb.platform.touchdevice) {
                    if (hoverPageObject) {
                        if (eb.platform.touchdevice) {
                            var d = r;
                            "undefined" != typeof c.originalEvent.touches && (d = c.originalEvent.touches[0] || c.originalEvent.changedTouches[0]);
                            d != r && (this.nc == d.pageX && this.oc == d.pageY) && (this.Fc(), this.sa = hoverPageObject.rd(window.Mb, this.Ma));
                            d != r && (this.nc = d.pageX, this.oc = d.pageY);
                            this.ca.jScrollPane && this.ca.jScrollPane.data("jsp").enable();
                        } else {
                            window.b = hoverPageObject.match({
                                left: c.pageX,
                                top: c.pageY
                            }, y);
                        }
                        this.sa != r && this.ga.trigger("onSelectionCreated", this.sa.text);
                        window.Mb = y;
                        window.a = r;
                        window.b = r;
                    }
                } else {
                    hoverPageObject && (window.b = hoverPageObject.match({
                        left: c.pageX,
                        top: c.pageY
                    }, y), window.Mb = y, this.Fc(), this.sa = hoverPageObject.rd(y, this.Ma));
                }
            }
        },
        Qg: function(c) {
            var d = this;
            d.Pf = "down";
            if (jQuery(c.target).hasClass("flowpaper_note_textarea") || "INPUT" == jQuery(c.target).get(0).tagName) {
                window.b = r, window.a = r;
            } else {
                if (!d.ca.Qd) {
                    var e = !eb.platform.touchdevice || "undefined" === typeof c.originalEvent.touches ? c.pageX : c.originalEvent.touches[0].pageX,
                      f = !eb.platform.touchdevice || "undefined" === typeof c.originalEvent.touches ? c.pageY : c.originalEvent.touches[0].pageY;
                    d.nc = e;
                    d.oc = f;
                    eb.platform.touchdevice && (eb.platform.touchonlydevice && window.annotations && (d.Ta = q, d.Fc(q)), window.clearTimeout(d.fk), d.xh = (new Date).getTime(), document.activeElement && jQuery(document.activeElement).hasClass("flowpaper_note_textarea") && document.activeElement.blur(), d.fk = setTimeout(function() {
                        if (d.xh != r && c.originalEvent.touches && 0 < c.originalEvent.touches.length) {
                            var e = !eb.platform.touchdevice || "undefined" === typeof c.originalEvent.touches ? c.pageX : c.originalEvent.touches[0].pageX,
                              f = !eb.platform.touchdevice || "undefined" === typeof c.originalEvent.touches ? c.pageY : c.originalEvent.touches[0].pageY;
                            d.nc + 20 > e && d.nc - 20 < e && (d.oc + 20 > f && d.oc - 20 < f) && (hoverPage = parseInt(c.target.id.substring(c.target.id.indexOf("_") + 1)), hoverPageObject = ra(d.ea, hoverPage), hoverPageObject != r && (d.ca.jScrollPane != r && d.ca.jScrollPane.data("jsp").disable(), window.Mb = q, d.Fc(q), window.b = hoverPageObject.match({
                                left: e,
                                top: f
                            }, y), window.a = hoverPageObject.match({
                                left: e - 1,
                                top: f - 1
                            }, y), d.sa = hoverPageObject.rd(q, d.Ma)));
                        }
                    }, 800));
                    if (d.Ta || eb.platform.touchdevice) {
                        if (!hoverPageObject) {
                            if (eb.platform.touchdevice) {
                                if (c.target && (c.target.id && 0 <= c.target.id.indexOf("page") && 0 <= c.target.id.indexOf("word")) && (hoverPage = parseInt(c.target.id.substring(c.target.id.indexOf("_") + 1)), hoverPageObject = ra(d.ea, hoverPage)), !hoverPageObject) {
                                    window.a = r;
                                    return;
                                }
                            } else {
                                window.a = r;
                                return;
                            }
                        }
                        d.ba == d.na() && 1 < d.scale ? window.a = hoverPageObject.yh(c.target.id) : window.a = hoverPageObject.match({
                            left: e,
                            top: f
                        }, q);
                        if (window.a) {
                            return window.Mb = q, d.Fc(), d.sa = hoverPageObject.rd(y, d.Ma), y;
                        }!jQuery(c.target).hasClass("flowpaper_tblabelbutton") && (!jQuery(c.target).hasClass("flowpaper_tbtextbutton") && !jQuery(c.target).hasClass("flowpaper_colorselector") && !jQuery(c.target).hasClass("flowpaper_tbbutton")) && !eb.platform.touchdevice && (d.Fc(), d.sa = hoverPageObject.rd(y, d.Ma));
                        window.Mb = y;
                        return q;
                    }
                    window.a = hoverPageObject ? hoverPageObject.match({
                        left: e,
                        top: f
                    }, q) : r;
                }
            }
        },
        fe: function() {
            this.width || (this.width = this.ja.width());
            return this.width;
        },
        bindEvents: function() {
            var c = this;
            hoverPage = 0;
            hoverPageObject = r;
            c.ga.bind("contextmenu", aa(y));
            c.ja.bind("mousemove", function(d) {
                return c.Rg(d);
            });
            c.ja.bind("mousedown", function(d) {
                return c.Qg(d);
            });
            c.ja.bind("mouseup", function(d) {
                return c.Tg(d);
            });
            var d = jQuery._data(jQuery(window)[0], "events");
            eb.platform.android ? jQuery(window).bind("orientationchange", function(d) {
                c.qg(d);
            }) : jQuery(window).bind("resize", function(d) {
                c.qg(d);
            });
            jQuery(window).bind("orientationchange", function(d) {
                c.qk(d);
            });
            d && d.resize && (c.Qh = d.resize[d.resize.length - 1]);
            if (!c.document.DisableOverflow) {
                try {
                    jQuery.get(c.config.localeDirectory + c.document.localeChain + "/FlowPaper.txt", function(d) {
                        c.toolbar.wh(d);
                        c.hg();
                    }).error(function() {
                        c.hg();
                        H("Failed loading supplied locale (" + c.document.localeChain + ")");
                    }), c.toolbar.wh("");
                } catch (e) {}
            }
            c.ue || (c.ue = "");
        },
        qk: function(c) {
            var d = this;
            d.sf = q;
            if (window.zine && d.ba == d.na()) {
                var e = window.orientation;
                if ("Flip-SinglePage" != d.document.InitViewMode) {
                    switch (e) {
                        case -90:
                        case 90:
                            d.ha.nd = "Flip-SinglePage" != d.config.document.TouchInitViewMode ? y : q;
                            break;
                        default:
                            d.ha.nd = q;
                    }
                }
                d.ha.fm = d.ha.Wl();
                setTimeout(function() {
                    d.ba = "";
                    d.switchMode(d.na(), d.getCurrPage() - 1);
                    d.sf = y;
                    window.scrollTo(0, 0);
                }, 500);
                jQuery(".flowpaper_glyphcanvas").css("z-index", -1);
            }
            if (d.ba == P || d.ba == X) {
                d.config.document.FitPageOnLoad && d.fitheight(), d.config.document.FitWidthOnLoad && d.fitwidth(), d.ja.height("auto"), setTimeout(function() {
                    requestAnim(function() {
                        d.qg(c);
                        d.ja.height("auto");
                        d.sf = y;
                    });
                }, 1000);
            }
        },
        qg: function(c) {
            if (!this.document.DisableOverflow && !this.sf && !jQuery(c.target).hasClass("flowpaper_note")) {
                c = this.ja.width();
                var d = this.ja.height(),
                  e = y,
                  f = -1;
                this.dg ? f = this.dg : 0 < this.ja[0].style.width.indexOf("%") && (this.dg = f = parseFloat(this.ja[0].style.width.substr(0, this.ja[0].style.width.length - 1) / 100));
                0 < f && (c = 0 == this.ja.parent().width() ? jQuery(document).width() * f : this.ja.parent().width() * f, e = q);
                f = -1;
                this.cg ? f = this.cg : 0 < this.ja[0].style.height.indexOf("%") && (this.cg = f = parseFloat(this.ja[0].style.height.substr(0, this.ja[0].style.height.length - 1) / 100));
                0 < f && (d = 0 == this.ja.parent().height() ? jQuery(window).height() * f : this.ja.parent().height() * f, e = q);
                f = document.Ij || document.mozFullScreen || document.webkitIsFullScreen || window.Ci || window.gf;
                e && !f && this.resize(c, d);
            }
        },
        hg: function() {
            var c = this;
            if (!c.document.DisableOverflow) {
                if (c.gd || (c.gd = c.toolbar != r && c.toolbar.yb != r ? c.toolbar.Ia(c.toolbar.yb, "LoadingPublication") : "Loading Publication"), c.gd == r && (c.gd = "Loading Publication"), c.di = window.zine && (c.renderer.config.pageThumbImagePattern && 0 < c.renderer.config.pageThumbImagePattern.length || c.config.document.LoaderImage), c.di) {
                    var d = new Image;
                    jQuery(d).bind("load", function() {
                        if (!c.initialized && (!c.Wa || c.Wa && !c.Wa.jquery)) {
                            var d = this.width / 1.5,
                              f = this.height / 1.5;
                            this.width = d;
                            this.height = f;
                            110 < d && (f = this.width / this.height, d = 110, f = d / f);
                            c.Wa = jQuery(String.format("<div class='flowpaper_loader' style='position:{1};margin: 0px auto;z-index:100;top:{9};left:{2};color:#ffffff;'><div style='position:relative;'><div class='flowpaper_titleloader_image' style='position:absolute;left:0px;'></div><div class='flowpaper_titleloader_progress' style='position:absolute;left:{7}px;width:{8}px;height:{6}px;background-color:#000000;opacity:0.3;'></div></div></div>", c.ea, "static" == c.ja.css("position") ? "relative" : "absolute", c.ha.nd && !c.Hj ? "35%" : "47%", c.ha.Pm, c.renderer.Pa(1, 200), d, f, 0, d, c.ha.nd && !c.Hj ? "30%" : "40%"));
                            c.ja.append(c.Wa);
                            jQuery(this).css({
                                width: d + "px",
                                height: f + "px"
                            });
                            c.Wa.find(".flowpaper_titleloader_image").append(this);
                        }
                    });
                    d.src = c.config.document.LoaderImage ? c.config.document.LoaderImage : c.renderer.Pa(1, 200);
                } else {
                    window.zine && !(eb.browser.msie && 10 > eb.browser.version) ? (c.Wa = jQuery(String.format("<div id='flowpaper_initloader_{0}' class='flowpaper_loader flowpaper_initloader' style='position:{1};margin: 0px auto;z-index:100;top:40%;left:{2}'></div>", c.ea, "static" == c.ja.css("position") ? "relative" : "absolute", eb.platform.iphone ? "40%" : "50%")), c.ja.append(c.Wa), c.Wb = new CanvasLoader("flowpaper_initloader_" + c.ea), c.Wb.setColor("#555555"), c.Wb.rn("square"), c.Wb.nn(70), c.Wb.mn(151), c.Wb.qn(0.8), c.Wb.sn(2), c.Wb.pn(42), c.Wb.show()) : (c.Wa = jQuery(String.format("<div class='flowpaper_loader flowpaper_initloader' style='position:{2};z-index:100;'><div class='flowpaper_initloader_panel' style='{1};background-color:#ffffff;'><img src='{0}' style='vertical-align:middle;margin-top:7px;margin-left:5px;'><div style='float:right;margin-right:25px;margin-top:19px;' class='flowpaper_notifylabel'>" + c.gd + "<br/><div style='margin-left:30px;' class='flowpaper_notifystatus'>" + c.ue + "</div></div></div></div>", c.Vi, "margin: 0px auto;", "static" == c.ja.css("position") ? "relative" : "absolute")), c.ja.append(c.Wa));
                }
            }
        },
        initialize: function() {
            var c = this;
            FLOWPAPER.ih.init();
            c.Ok();
            c.Nk();
            c.Kf = location.hash && 0 <= location.hash.substr(1).indexOf("inpublisher") ? q : y;
            c.ga = jQuery("#" + c.ea);
            c.toolbar = new ua(this, this.document);
            c.nh = c.document.ImprovedAccessibility;
            eb.platform.iphone && (!c.config.document.InitViewMode && !window.zine) && (c.Bb = P);
            "BookView" == c.config.document.InitViewMode && 0 == c.document.StartAtPage % 2 && (c.document.StartAtPage += 1);
            c.config.document.TouchInitViewMode && (c.config.document.TouchInitViewMode != c.Bb && eb.platform.touchonlydevice) && (c.Bb = c.config.document.TouchInitViewMode);
            !c.config.document.TouchInitViewMode && (eb.platform.touchonlydevice && !window.zine) && (c.Bb = X);
            if (window.zine && !c.document.DisableOverflow) {
                c.ha = c.toolbar.Df = new FlowPaperViewer_Zine(c.toolbar, this, c.ga);
                if (("Portrait" == c.Bb || "Portrait" == c.config.document.TouchInitViewMode) && eb.platform.touchonlydevice) {
                    c.config.document.TouchInitViewMode = c.config.document.InitViewMode = c.ba = "Flip-SinglePage";
                }
                c.ha.initialize();
                c.ba != c.na() && (c.ba = c.Bb);
            } else {
                c.ba = c.Bb;
            }
            "CADView" == c.ba && (c.ba = "SinglePage");
            if (window.zine && (eb.browser.msie && 9 > eb.browser.version || eb.browser.safari && 5 > eb.browser.gc) && !eb.platform.touchonlydevice) {
                c.document.MinZoomSize = c.MinZoomSize = 0.3, c.ba = "BookView";
            }
            "0px" == c.ga.css("width") && c.ga.css("width", "1024px");
            "0px" == c.ga.css("height") && c.ga.css("height", "600px");
            c.nf = c.ba == c.na() && (eb.platform.iphone || eb.platform.tc);
            c.ja === r && !c.ha && (0 < c.ga[0].style.width.indexOf("%") && (c.dg = parseFloat(c.ga[0].style.width.substr(0, c.ga[0].style.width.length - 1) / 100)), 0 < c.ga[0].style.height.indexOf("%") && (c.cg = parseFloat(c.ga[0].style.height.substr(0, c.ga[0].style.height.length - 1) / 100)), c.document.DisableOverflow ? (c.config.document.FitPageOnLoad = y, c.config.document.FitWidthOnLoad = q, c.ja = jQuery("<div style='left:0px;top:0px;position:absolute;width:" + (window.printWidth ? window.printWidth : "210mm") + ";height:" + (window.printHeight ? window.printHeight : "297mm") + ";' class='flowpaper_viewer_container'/>")) : (c.ja = jQuery("<div style='" + c.ga.attr("style") + ";' class='flowpaper_viewer_wrap flowpaper_viewer_container'/>"), ("" == c.ja.css("position") || "static" == c.ja.css("position")) && c.ja.css({
                position: "relative"
            })), c.ja = c.ga.wrap(c.ja).parent(), c.document.DisableOverflow ? c.ga.css({
                left: "0px",
                top: "0px",
                position: "relative",
                width: "100%",
                height: "100%",
                "max-width": window.printWidth ? window.printWidth : "210mm",
                "max-height": window.printHeight ? window.printHeight : "297mm"
            }).addClass("flowpaper_viewer") : c.ga.css({
                left: "0px",
                top: "0px",
                position: "relative",
                width: "100%",
                height: "100%"
            }).addClass("flowpaper_viewer").addClass("flowpaper_viewer_gradient"), window.annotations && c.config.document.AnnotationToolsVisible && !c.document.DisableOverflow ? (c.Rd = eb.platform.touchdevice ? 15 : 22, c.ga.height(c.ga.height() - c.Rd)) : c.Rd = 0);
            c.ql = c.ja.html();
            eb.browser.msie && jQuery(".flowpaper_initloader_panel").css("left", c.ga.width() - 500);
            c.document.DisableOverflow || (c.config.Toolbar == r && 0 == jQuery("#" + c.Za).length ? (c.Toolbar = c.ja.prepend("<div id='" + c.Za + "' class='flowpaper_toolbarstd' style='z-index:200;overflow-y:hidden;overflow-x:hidden;'></div>").parent(), c.toolbar.create(c.Za)) : c.config.Toolbar != r && !(c.Toolbar instanceof jQuery) && (c.config.Toolbar = unescape(c.config.Toolbar), c.Toolbar = jQuery(c.config.Toolbar), c.Toolbar.attr("id", c.Za), c.ja.prepend(c.Toolbar)));
            c.gj();
            c.document.DisableOverflow || c.resources.initialize();
            hoverPage = 0;
            hoverPageObject = r;
            c.ha != r ? c.ha.Zl(c.Za) : window.annotations && (c.plugin = new FlowPaperViewerAnnotations_Plugin(this, this.document, c.Za + "_annotations"), c.plugin.create(c.Za + "_annotations"), c.plugin.bindEvents(c.aa));
            jQuery(c.renderer).bind("loadingProgress", function(d, e) {
                c.Rk(d, e);
            });
            jQuery(c.renderer).bind("labelsLoaded", function(d, e) {
                c.Pk(d, e);
            });
            jQuery(c.renderer).bind("loadingProgressStatusChanged", function(d, e) {
                c.Sk(d, e);
            });
            jQuery(c.renderer).bind("UIBlockingRenderingOperation", function(d, e) {
                c.ld(d, e);
            });
            jQuery(c.renderer).bind("UIBlockingRenderingOperationCompleted", function() {
                c.Pb();
            });
            $FlowPaper(c.ea).dispose = c.Ib;
            $FlowPaper(c.ea).highlight = c.highlight;
            $FlowPaper(c.ea).getCurrentRenderingMode = c.getCurrentRenderingMode;
        },
        gj: function() {
            !this.hj && !this.document.DisableOverflow && (eb.platform.touchonlydevice && !this.nf ? eb.platform.touchonlydevice ? (window.zine ? this.ga.height(this.ga.height() - (!this.config.BottomToolbar ? 35 : 65)) : window.annotations ? this.ga.height(this.ga.height() - (!this.config.BottomToolbar ? 47 : 65)) : this.ga.height(this.ga.height() - (!this.config.BottomToolbar ? 25 : 65)), this.config.BottomToolbar && this.ja.height(this.ja.height() - (eb.platform.tc ? 7 : 18))) : this.ga.height(this.ga.height() - 25) : window.zine || (this.config.BottomToolbar ? this.ga.height(this.ga.height() - jQuery(this.da).height() + 11) : this.ga.height(this.ga.height() - 13)), this.hj = q);
        },
        Pk: function(c, d) {
            if (window.zine && this.ha && this.ha.jf) {
                var e = this.ha.jf.createElement("labels");
                this.ha.jf.childNodes[0].appendChild(e);
                try {
                    for (var f = 0; f < d.qh.length; f++) {
                        var g = d.qh[f],
                          n = e,
                          l = f + 1,
                          s = this.ha.jf.createElement("node");
                        s.setAttribute("pageNumber", l);
                        s.setAttribute("title", escape(g));
                        n.appendChild(s);
                    }
                } catch (h) {}
                this.labels = jQuery(e);
            }
        },
        Rk: function(c, d) {
            this.ue = Math.round(100 * d.progress) + "%";
            this.Wa && (this.Wa.find && 0 < this.Wa.find(".flowpaper_notifystatus").length) && this.Wa.find(".flowpaper_notifystatus").html(this.ue);
            if (this.di && this.Wa && this.Wa.find) {
                var e = this.Wa.find(".flowpaper_titleloader_progress");
                if (e) {
                    var f = this.Wa.find(".flowpaper_titleloader_image");
                    if (0 < f.length) {
                        var g = f.css("width"),
                          g = parseFloat(g.replace("px", ""));
                        requestAnim(function() {
                            e.animate({
                                left: g * d.progress + "px",
                                width: g * (1 - d.progress) + "px"
                            }, 100);
                        });
                    }
                }
            }
        },
        Sk: function(c, d) {
            this.gd = d.label;
            this.Wa.find(".flowpaper_notifylabel").html(d.label);
        },
        ld: function(c, d) {
            var e = this;
            !e.document.DisableOverflow && e.kc === r && (e.kc = jQuery("<div style='position:absolute;left:50%;top:50%;'></div>"), e.ja.append(e.kc), e.kc.spin({
                color: "#777"
            }), e.Gf != r && (window.clearTimeout(e.Gf), e.Gf = r), d.Sm || (e.Gf = setTimeout(function() {
                e.kc && (e.kc.remove(), e.kc = r);
            }, 1000)));
        },
        Pb: function() {
            this.kc && (this.kc.remove(), this.kc = r);
        },
        show: function() {
            var c = this;
            jQuery(c.resources).bind("onPostinitialized", function() {
                setTimeout(function() {
                    c.$e();
                    !c.document.DisableOverflow && c.ha == r ? c.toolbar.bindEvents(c.ga) : c.ha != r && c.ha.ug && c.toolbar.bindEvents(c.ga);
                    c.ha && c.ha.ug && (c.ha != r && !c.document.DisableOverflow) && c.ha.bindEvents(c.ga);
                    c.ha && !c.ha.ug ? c.am = function() {
                        c.toolbar.bindEvents(c.ga);
                        c.ha.bindEvents(c.ga);
                        c.lf(c.document.StartAtPage);
                        jQuery(c.ga).trigger("onDocumentLoaded", c.renderer.getNumPages());
                    } : (c.lf(c.document.StartAtPage), jQuery(c.ga).trigger("onDocumentLoaded", c.renderer.getNumPages()));
                }, 50);
                jQuery(c.resources).unbind("onPostinitialized");
            });
            c.resources.xk();
        },
        Ib: function() {
            this.em = q;
            this.ga.unbind();
            this.ga.find("*").unbind();
            this.ja.find("*").unbind();
            this.ja.find("*").remove();
            this.ga.empty();
            this.ja.empty();
            jQuery(this).unbind();
            0 == jQuery(".flowpaper_viewer_container").length && window.PDFJS && delete window.PDFJS;
            this.plugin && (jQuery(this.plugin).unbind(), this.plugin.Ib(), delete this.plugin, this.plugin = r);
            jQuery(this.renderer).unbind();
            this.renderer.Ib();
            delete this.renderer;
            delete this.config;
            jQuery(this.ca).unbind();
            this.ca.Ib();
            delete this.ca;
            delete window["wordPageList_" + this.ea];
            window["wordPageList_" + this.ea] = r;
            this.ja.unbind("mousemove");
            this.ja.unbind("mousedown");
            this.ja.unbind("mouseup");
            jQuery(window).unbind("resize", this.Qh);
            delete this.Qh;
            jQuery(this.renderer).unbind("loadingProgress");
            jQuery(this.renderer).unbind("labelsLoaded");
            jQuery(this.renderer).unbind("loadingProgressStatusChanged");
            jQuery(this.renderer).unbind("UIBlockingRenderingOperation");
            jQuery(this.renderer).unbind("UIBlockingRenderingOperationCompleted");
            this.ha ? this.ha.Ib() : this.ga.parent().remove();
            var c = this.ja.parent(),
              d = this.ja.attr("style");
            this.ja.remove();
            delete this.ja;
            delete this.ga;
            this.renderer && (delete this.renderer.wa, delete this.renderer.ka, delete this.renderer.Ha, delete this.renderer.ef, delete this.renderer.bb);
            delete this.renderer;
            var e = jQuery(this.ql);
            e.attr("style", d);
            e.attr("class", "flowpaper_viewer");
            c.append(e);
            this.plugin && delete this.plugin;
        },
        Wf: function() {
            var c = this;
            eb.platform.touchonlydevice ? (c.initialized = q, (!c.ha && c.config.document.FitWidthOnLoad && c.ba != U && c.ba != R || c.ba == P || c.ba == X) && c.fitwidth(), (c.config.document.FitPageOnLoad || c.ba == U || c.ba == R || c.ha) && c.fitheight(), c.ca.Fe(), c.ca.Fd()) : (c.initialized = q, c.$l || c.toolbar.fj(c.config.document.MinZoomSize, c.config.document.MaxZoomSize), c.document.DisableOverflow ? c.fitwidth() : c.config.document.FitPageOnLoad || c.ba == U || c.ba == R ? c.fitheight() : c.config.document.FitWidthOnLoad && c.ba != U && c.ba != R ? c.fitwidth() : c.Zoom(c.config.document.Scale));
            (!c.document.StartAtPage || 1 == c.document.StartAtPage) && c.ba != c.na() && c.ga.trigger("onCurrentPageChanged", c.ca.la + 1);
            c.document.StartAtPage && 1 != c.document.StartAtPage && c.ca.scrollTo(c.document.StartAtPage);
            c.ha && c.ha.Wf();
            c.Wa && c.Wa.fadeOut ? c.Wa.fadeOut(300, function() {
                c.Wa && (c.Wa.remove(), c.ja.find(".flowpaper_loader").remove(), c.Wb && (c.Wb.zm(), delete c.Wb), delete c.Wa, c.Wb = r, jQuery(c.ca.ma).fadeIn(300, z()), c.PreviewMode && c.ha.zb.xg(c.ca, c.ga));
            }) : (c.ja.find(".flowpaper_loader").remove(), jQuery(c.ca.ma).fadeIn(300, z()), c.PreviewMode && c.ha.zb.xg(c.ca, c.ga));
            c.ga.trigger("onInitializationComplete");
        },
        $e: function() {
            this.renderer.Zg = y;
            if (this.ca) {
                for (var c = 0; c < this.document.numPages; c++) {
                    this.ca.ca[c] && window.clearTimeout(this.ca.ca[c].vc);
                }
            }
            this.ra = 1;
            this.ga.find("*").unbind();
            this.ga.find("*").remove();
            this.ga.empty();
            this.renderer.Ad = y;
            jQuery(this.pg).remove();
            this.ha && this.ha.$e();
        },
        lf: function(c) {
            this.ca = new ta(this.ga, this, this.ea, c);
            this.ca.create(this.ga);
        },
        previous: function() {
            var c = this;
            !c.Xf && c.ba != c.na() ? (c.Xf = setTimeout(function() {
                window.clearTimeout(c.Xf);
                c.Xf = r;
            }, 700), c.ca.previous()) : c.ba == c.na() && c.ca.previous();
        },
        Ej: function() {
            var c = this;
            c.nb && c.le();
            if (!c.Nb && c.outline && !(c.outline && 0 == c.outline.length)) {
                c.xa = c.ga.width();
                c.Ga = c.ga.height();
                var d = c.gd = c.toolbar != r && c.toolbar.yb != r ? c.toolbar.Ia(c.toolbar.yb, "TOC", "Table of Contents") : "Table of Contents",
                  e = c.ba == c.na() ? jQuery(c.da).css("background-color") : "#c8c8c8",
                  f = c.ba == c.na() ? "40px" : jQuery(c.da).height() + 2;
                c.na();
                var g = c.ba == c.na() ? 30 : 40,
                  n = c.ba == c.na() ? 0 : 41,
                  l = c.ha && !c.ha.En ? jQuery(c.da).offset().top + jQuery(c.da).outerHeight() : 0,
                  s = c.ga.height() - (c.Pd != r ? c.Pd.height() + 20 : 0) - l;
                c.De = c.ja.find(c.da).css("margin-left");
                "rgba(0, 0, 0, 0)" == e.toString() && (e = "#555");
                c.ja.append(jQuery(String.format("<div class='flowpaper_toc' style='position:absolute;left:0px;top:{8}px;height:{5}px;width:{2};min-width:{3};opacity: 0;z-index:50;'><div style='margin: 20px 20px 20px 20px;padding: 10px 10px 10px 10px;background-color:{6};height:{7}px'><div style='height:25px;width:100%'><div class='flowpaper_tblabel' style='margin-left:10px; width: 100%;height:25px;'><img src='{1}' style='vertical-align: middle;width:14px;height:auto;'><span style='margin-left:10px;vertical-align: middle'>{0}</span><img src='{4}' style='float:right;margin-right:5px;cursor:pointer;' class='flowpaper_toc_close' /></div><hr size='1' color='#ffffff' /></div></div>", d, c.Wi, "20%", "250px", c.kf, s, e, s - 20, l)));
                c.Nb = c.ja.find(".flowpaper_toc");
                jQuery(c.Nb.children()[0]).css({
                    "border-radius": "3px",
                    "-moz-border-radius": "3px"
                });
                jQuery(c.Nb.children()[0]).append("<div class='flowpaper_toc_content' style='display:block;position:relative;height:" + (jQuery(c.Nb.children()[0]).height() - g) + "px;margin-bottom:50px;width:100%;overflow-y: auto;overflow-x: hidden;'><ul class='flowpaper_accordionSkinClear'>" + ma(c, c.outline.children()).html() + "</ul></div>");
                d = jQuery(".flowpaper_accordionSkinClear").children();
                0 < d.children().length && (d = jQuery(d.get(0)).children(), 0 < d.children().length && jQuery(d.find("li").get(0)).addClass("cur"));
                c.resize(c.ga.width() - c.Nb.width(), c.ga.height() + n, y, z());
                jQuery(".flowpaper_accordionSkinClear").ak();
                jQuery(".flowpaper-tocitem").bind("mousedown", function() {
                    c.gotoPage(jQuery(this).data("pagenumber"));
                });
                c.ga.animate({
                    left: c.Nb.width() + "px"
                }, 0);
                n = 0.5 * c.Nb.width();
                jQuery(c.da).width() + n > c.ja.width() && (n = 0);
                jQuery(c.da).animate({
                    "margin-left": parseFloat(c.De) + n + "px"
                }, 200, function() {
                    if (window.onresize) {
                        window.onresize();
                    }
                });
                0 == n && c.Nb.css({
                    top: f,
                    height: c.ga.height() - 40 + "px"
                });
                c.ba == c.na() && c.ha.wn();
                c.Nb.fadeTo("fast", 1);
                c.ja.find(".flowpaper_toc_close").bind("mousedown", function() {
                    c.mh();
                });
            }
        },
        mh: function() {
            var c = this;
            c.Nb.hide();
            c.ja.find(".flowpaper_tocitem, .flowpaper_tocitem_separator").remove();
            c.resize(c.xa, c.Ga + 33, y);
            c.ga.css({
                left: "0px"
            });
            jQuery(c.da).animate({
                "margin-left": parseFloat(c.De) + "px"
            }, 200);
            c.ba == c.na() && c.ha.le();
            c.Nb.fadeTo("fast", 0, function() {
                c.Nb.remove();
                c.Nb = r;
            });
        },
        setCurrentCursor: function(c) {
            "ArrowCursor" == c && (this.Ta = y, addCSSRule(".flowpaper_pageword", "cursor", "default"), window.annotations || jQuery(".flowpaper_pageword_" + this.ea).remove());
            "TextSelectorCursor" == c && (this.Ta = q, this.Ma = "flowpaper_selected_default", addCSSRule(".flowpaper_pageword", "cursor", "text"), window.annotations || (this.ca.getPage(this.ca.la - 1), this.ca.getPage(this.ca.la - 2), this.ca.La()));
            this.ha && this.ha.setCurrentCursor(c);
            this.ca.setCurrentCursor(c);
            jQuery(this.da).trigger("onCursorChanged", c);
        },
        highlight: function(c) {
            var d = this;
            jQuery.ajax({
                type: "GET",
                url: c,
                dataType: "xml",
                error: z(),
                success: function(c) {
                    jQuery(c).find("Body").attr("color");
                    c = jQuery(c).find("Highlight");
                    var f = 0,
                      g = -1,
                      n = -1;
                    jQuery(c).find("loc").each(function() {
                        f = parseInt(jQuery(this).attr("pg"));
                        g = parseInt(jQuery(this).attr("pos"));
                        n = parseInt(jQuery(this).attr("len"));
                        d.ca.getPage(f).$c(g, n, y);
                    });
                    d.ca.La();
                }
            });
        },
        printPaper: function() {
            this.document.PrintFn && this.document.PrintFn();
        },
        switchMode: function(c, d) {
            var e = this;
            if (e.ba != c && !(("TwoPage" == c || "BookView" == c) && 2 > e.getTotalPages())) {
                d > e.getTotalPages() && (d = e.getTotalPages()), e.nb && e.le(), jQuery(e.ca.ma).Fj(function() {
                    e.ha && e.ha.switchMode(c, d);
                    "Tile" == c && (e.ba = V);
                    c == P && (e.ba = e.Bb == X ? X : P);
                    c == X && (e.ba = X);
                    c == U && (e.ba = U);
                    c == R && (e.ba = R);
                    e.$e();
                    e.ca.Fk();
                    e.renderer.bd = -1;
                    e.renderer.wa && e.renderer.wa.saveState();
                    c != U && c != R && (d != r ? e.ca.la = d - 1 : d = 1);
                    e.lf(d);
                    jQuery(e.da).trigger("onViewModeChanged", c);
                    setTimeout(function() {
                        !eb.platform.touchdevice || eb.platform.touchdevice && (c == X || c == P) ? e.fitheight() : c != U && (c != R && c != e.na()) && e.fitwidth();
                        c != U && c != R && e.sd(d);
                    }, 100);
                });
            }
        },
        fitwidth: function() {
            if (!(this.ba == U || this.ba == R || this.ba == V)) {
                var c = jQuery(this.ca.ma).width() - (this.document.DisableOverflow ? 0 : 15);
                this.nb && (c -= 100);
                var d = 1 < this.getTotalPages() ? this.ra - 1 : 0;
                0 > d && (d = 0);
                this.document.DisplayRange && (d = parseInt(this.document.DisplayRange.split("-")[0]) - 1);
                var e = this.ca.getPage(d).dimensions.xa / this.ca.getPage(d).dimensions.Ga;
                if (eb.platform.touchonlydevice) {
                    f = c / (this.ca.getPage(d).Na * e) - (this.document.DisableOverflow ? 0 : 0.03), window.FitWidthScale = f, this.gb(f), this.ca.jg();
                } else {
                    var f = c / (this.ca.getPage(d).Na * this.document.MaxZoomSize * e) - (this.document.DisableOverflow ? 0 : 0.012);
                    if (90 == this.ca.getPage(d).rotation || 270 == this.ca.getPage(d).rotation) {
                        f = this.dd();
                    }
                    window.FitWidthScale = f;
                    jQuery(this.da).trigger("onScaleChanged", f / this.document.MaxZoomSize);
                    if (this.document.DisableOverflow) {
                        for (var g = na() - 0, n = this.ca.getPage(d).Na * this.document.MaxZoomSize * f, l = this.ca.getPage(d).Na * this.ca.getPage(d).xd() * this.document.MaxZoomSize * f, s = 0; n > g;) {
                            f = c / (this.ca.getPage(d).Na * this.document.MaxZoomSize * e) + s, n = this.ca.getPage(d).Na * this.document.MaxZoomSize * f, l = this.ca.getPage(d).Na * this.ca.getPage(d).xd() * this.document.MaxZoomSize * f, s -= 0.0001;
                        }
                        this.ja.css("width", Math.floor(l) + "px");
                        this.ja.css("height", Math.floor(n) + "px");
                    }
                    f * this.document.MaxZoomSize >= this.document.MinZoomSize && f <= this.document.MaxZoomSize && (this.ba == P ? this.gb(this.document.MaxZoomSize * f, {
                        Wd: q
                    }) : this.gb(this.document.MaxZoomSize * f));
                }
            }
        },
        getCurrentRenderingMode: function() {
            return this.renderer instanceof CanvasPageRenderer ? "html5" : "html";
        },
        gb: function(c, d) {
            var e = this;
            if (e.initialized && e.ca) {
                e.ba == e.na() && 1 == c && (d = d || {}, d.Wd = q);
                if (!d || d && !d.Wd) {
                    var f = 100 / (100 * e.document.ZoomInterval);
                    c = Math.round(c * f) / f;
                }
                e.ba == e.na() && 1 > c && (c = 1);
                jQuery(e.da).trigger("onScaleChanged", c / e.document.MaxZoomSize);
                var f = jQuery(e.ca.ma).prop("scrollHeight"),
                  g = jQuery(e.ca.ma).scrollTop(),
                  f = 0 < g ? g / f : 0;
                e.pd != r && (window.clearTimeout(e.pd), e.pd = r);
                e.ca.Ek() && e.scale != c && (jQuery(".flowpaper_annotation_" + e.ea).remove(), jQuery(".flowpaper_pageword_" + e.ea).remove());
                e.pd = setTimeout(function() {
                    e.Nc();
                    e.ca && e.ca.La();
                }, 500);
                if (0 < c) {
                    c < e.config.document.MinZoomSize && (c = this.config.document.MinZoomSize);
                    c > e.config.document.MaxZoomSize && (c = this.config.document.MaxZoomSize);
                    e.ca.ub(c, d);
                    e.scale = c;
                    (!d || d && !d.ti) && e.ca.ca[0] && e.ca.ca[0].Sd();
                    jQuery(e.da).trigger("onZoomFactorChanged", {
                        wd: c,
                        aa: e
                    });
                    if ("undefined" != window.FitWidthScale && Math.round(100 * window.FitWidthScale) == Math.round(100 * (c / e.document.MaxZoomSize))) {
                        if (jQuery(e.da).trigger("onFitModeChanged", "FitWidth"), window.onFitModeChanged) {
                            window.onFitModeChanged("Fit Width");
                        }
                    } else {
                        if ("undefined" != window.FitHeightScale && Math.round(100 * window.FitHeightScale) == Math.round(100 * (c / e.document.MaxZoomSize))) {
                            if (jQuery(e.da).trigger("onFitModeChanged", "FitHeight"), window.onFitModeChanged) {
                                window.onFitModeChanged("Fit Height");
                            }
                        } else {
                            if (jQuery(e.da).trigger("onFitModeChanged", "FitNone"), window.onFitModeChanged) {
                                window.onFitModeChanged("Fit None");
                            }
                        }
                    }
                    e.ba != e.na() && (e.ca.Fd(), e.ca.ye(), e.ca.jg(), g = jQuery(e.ca.ma).prop("scrollHeight"), eb.browser.fb.kb && (!d || d && !d.ti ? jQuery(e.ca.ma).scrollTo({
                        left: "50%",
                        top: g * f + "px"
                    }, 0, {
                        axis: "xy"
                    }) : jQuery(e.ca.ma).scrollTo({
                        top: g * f + "px"
                    }, 0, {
                        axis: "y"
                    })));
                }
            }
        },
        Nc: function() {
            if (this.renderer) {
                this.pd != r && (window.clearTimeout(this.pd), this.pd = r);
                "CanvasPageRenderer" == this.renderer.ee() && (jQuery(".flowpaper_pageword_" + this.ea + ":not(.flowpaper_selected_searchmatch)").remove(), window.annotations && this.ca.La());
                this.ca.Xe && (0 <= this.ca.Xe && this.ca.ca[this.ca.Xe].jb) && this.renderer.ic(this.ca.ca[this.ca.Xe], q);
                for (var c = 0; c < this.document.numPages; c++) {
                    this.ca.vb(c) && (c != this.ca.Xe && this.ca.ca[c]) && (this.ca.ca[c].jb ? this.renderer.ic(this.ca.ca[c], q) : this.ca.ca[c].Ua = y);
                }
            }
        },
        Zoom: function(c, d) {
            !eb.platform.touchonlydevice || !(this.ba == U || this.ba == R) ? (c > this.document.MaxZoomSize && (c = this.document.MaxZoomSize), c /= this.document.MaxZoomSize, jQuery(this.da).trigger("onScaleChanged", c), c * this.document.MaxZoomSize >= this.document.MinZoomSize && c <= this.document.MaxZoomSize && this.gb(this.document.MaxZoomSize * c, d)) : 1 < c ? this.ba == U || this.ba == R ? this.ca.Ne() : (this.ba == P || this.ba == X) && this.fitwidth() : this.ba == U || this.ba == R ? this.ca.zd() : (this.ba == P || this.ba == X) && this.fitheight();
        },
        ZoomIn: function() {
            this.Zoom(this.scale + 3 * this.document.ZoomInterval);
        },
        ZoomOut: function() {
            if (this.ba == P || this.ba == X) {
                this.ca.jScrollPane != r ? (this.ca.jScrollPane.data("jsp").scrollTo(0, 0, y), this.ca.jScrollPane.data("jsp").reinitialise(this.fc)) : this.ca.ia(this.ca.ma).parent().scrollTo({
                    left: 0,
                    top: 0
                }, 0, {
                    axis: "xy"
                });
            }
            this.Zoom(this.scale - 3 * this.document.ZoomInterval);
        },
        Xh: function() {
            var c = this;
            if (!eb.platform.mobilepreview && (c.Nb && c.mh(), !c.nb)) {
                c.ja.find(".flowpaper_searchabstract_result, .flowpaper_searchabstract_result_separator").remove();
                var d = c.gd = c.toolbar != r && c.toolbar.yb != r ? c.toolbar.Ia(c.toolbar.yb, "Search") : "Search",
                  e = c.ba == c.na() ? c.ja.height() - 40 - 0 : parseFloat(jQuery(c.ca.ma).css("height")) - 10,
                  f = c.ba == c.na() ? jQuery(c.da).css("background-color") : "#c8c8c8",
                  g = c.ba == c.na() ? "40px" : jQuery(c.da).height() + 2,
                  n = c.ba == c.na() ? "color:#ededed" : "color:#555555;",
                  l = (c.na(), 40),
                  s = c.ba == c.na() ? 0 : 41;
                "rgba(0, 0, 0, 0)" == f.toString() && (f = "#555");
                c.De = c.ja.find(c.da).css("margin-left");
                c.ba == c.na() ? (c.ja.append(jQuery(String.format("<div class='flowpaper_searchabstracts' style='position:absolute;left:0px;top:{8}px;height:{5}px;width:{2};min-width:{3};opacity: 0;z-index:50;{9}'><div style='margin: 20px 20px 20px 20px;padding: 10px 10px 10px 10px;background-color:{6};height:{7}px'><div style='height:25px;width:100%'><div><span class='pull-left font-weight-bold'>Search Results</span><span class='intf-btn intf-btn-tertiary intf-btn-inverted intf-btn-sm pull-right flowpaper_searchabstracts_close'><i class='fa fa-remove'></i></span></div><hr size='1' color='#ffffff' /></div></div>", d, c.vg, "20%", "250px", c.kf, e, f, e - 20, 0, !c.ha.backgroundImage ? "background-color:" + c.ha.backgroundColor : ""))), c.nb = c.ja.find(".flowpaper_searchabstracts"), jQuery(c.nb.children()[0]).css({
                    "border-radius": "3px",
                    "-moz-border-radius": "3px"
                }), jQuery(c.nb.children()[0]).append("<div class='flowpaper_searchabstracts_content' style='display:block;position:relative;height:" + (jQuery(c.nb.children()[0]).height() - l) + "px;margin-bottom:50px;width:100%;overflow-y: auto;overflow-x: hidden;'></div>"), c.resize(c.ga.width(), c.ga.height() + s, y, z()), c.ga.animate({
                    left: c.nb.width() + "px"
                }, 0)) : (c.ja.append(jQuery(String.format("<div class='flowpaper_searchabstracts' style='position:absolute;left:0px;top:0px;height:{5}px;width:{2};min-width:{3};opacity: 0;z-index:13;overflow:hidden;'><div style='margin: 0px 0px 0px 0px;padding: 10px 7px 10px 10px;background-color:{6};height:{7}px'><div style='height:25px;width:100%' <div><span class='pull-left font-weight-bold'>Search Results</span><span class='intf-btn intf-btn-tertiary intf-btn-inverted intf-btn-sm pull-right flowpaper_searchabstracts_close'><i class='fa fa-remove'></i></span></div><div class='flowpaper_bottom_fade'></div></div></div>", d, c.vg, "20%", "250px", c.kf, parseFloat(jQuery(c.ca.ma).css("height")) + 10, f, c.ja.height() - 58))), c.nb = c.ja.find(".flowpaper_searchabstracts"), jQuery(c.nb.children()[0]).append("<div class='flowpaper_searchabstracts_content' style='display:block;position:relative;height:" + e + "px;margin-bottom:50px;width:100%;overflow-y: auto;overflow-x: hidden;'></div>"), c.ba != U && c.ba != c.na() && c.resize(c.ga.width(), c.ja.height() + 1, y, z()), c.ga.animate({
                    left: c.nb.width() / 2 + "px"
                }, 0), c.document.FitWidthOnLoad ? c.fitwidth() : c.fitheight());
                d = 0.5 * c.nb.width();
                jQuery(c.da).width() + d > c.ja.width() && (d = 0);
                jQuery(c.da).animate({
                    "margin-left": parseFloat(c.De) + d + "px"
                }, 200, function() {
                    if (window.onresize) {
                        window.onresize();
                    }
                });
                0 == d && c.nb.css({
                    top: g,
                    height: parseFloat(jQuery(c.ca.ma).css("height")) + 10 + "px"
                });
                c.ba == c.na() && c.ha.Xh();
                c.nb.fadeTo("fast", 1);
                var h = c.ja.find(".flowpaper_searchabstracts_content");
                jQuery(c).bind("onSearchAbstractAdded", function(d, e) {
                    var f = e.Rc.fragment;
                    100 < f.length && (f = f.substr(0, 100) + "...");
                    f = f.replace(RegExp(c.Mc, "g"), "<font style='color:#ffffff'>[" + c.Mc + "]</font>");
                    f = "<b>p." + c.toolbar.ze(e.Rc.pageIndex + 1, e.Rc.pageIndex + 1, q) + "</b> : " + f;
                    h.append(jQuery(String.format("<div id='flowpaper_searchabstract_item_{1}' style='{2}' class='flowpaper_searchabstract_result'>{0}</div><hr size=1 color='#777777' style='margin-top:8px;' class='flowpaper_searchabstract_result_separator' />", f, e.Rc.id, n)));
                    jQuery("#flowpaper_searchabstract_item_" + e.Rc.id).bind("mousedown", function(d) {
                        c.Va = e.Rc.pageIndex + 1;
                        c.Xc = e.Rc.Ik;
                        c.Zb = -1;
                        c.searchText(c.Mc, y);
                        d.preventDefault && d.preventDefault();
                        d.returnValue = y;
                    });
                    jQuery("#flowpaper_searchabstract_item_" + e.Rc.id).bind("mouseup", function(c) {
                        c.preventDefault && c.preventDefault();
                        c.returnValue = y;
                    });
                });
                c.ja.find(".flowpaper_searchabstracts_close").bind("mousedown", function() {
                    c.le();
                });
            }
        },
        le: function() {
            this.nb && (this.ga.css({
                left: "0px"
            }), this.nb.remove(), this.nb = r, this.ja.find(".flowpaper_searchabstract_result, .flowpaper_searchabstract_result_separator").remove(), this.ba == this.na() ? this.resize(this.ja.width(), this.ga.height(), y) : this.ba == U ? (this.ga.css({
                left: "0px",
                width: "100%"
            }), this.fitheight()) : this.resize(this.ja.width(), this.ja.height() + 1, y), jQuery(this.da).animate({
                "margin-left": parseFloat(this.De) + "px"
            }, 200), this.ba == this.na() && this.ha.le());
            jQuery(this).unbind("onSearchAbstractAdded");
        },
        ph: function(c, d) {
            jQuery(".flowpaper_searchabstract_blockspan").remove();
            var e = this.renderer.getNumPages();
            d || (d = 0);
            for (var f = d; f < e; f++) {
                this.ej(f, c);
            }
            this.ba != this.na() && this.ja.find(".flowpaper_searchabstracts_content").append(jQuery("<div class='flowpaper_searchabstract_blockspan' style='display:block;clear:both;height:200px'></div>"));
        },
        ej: function(c, d) {
            var e = this,
              f = e.renderer.bb;
            if (f[c] != r) {
                f[c].toLowerCase().indexOf("actionuri") && (f[c] = f[c].replace("actionURI", ""), f[c] = f[c].replace("):", ")"));
                f[c].toLowerCase().indexOf("actiongotor") && (f[c] = f[c].replace("actionGoToR", ""));
                f[c].toLowerCase().indexOf("actiongoto") && (f[c] = f[c].replace("actionGoTo", ""));
                for (var g = f[c].toLowerCase().indexOf(d), n = 0; 0 < g;) {
                    var l = 0 < g - 50 ? g - 50 : 0,
                      s = g + 75 < f[c].length ? g + 75 : f[c].length,
                      h = e.Yb.length;
                    e.Yb.jd[h] = [];
                    e.Yb.jd[h].pageIndex = c;
                    e.Yb.jd[h].Ik = n;
                    e.Yb.jd[h].id = e.ea + "_" + c + "_" + n;
                    e.Yb.jd[h].fragment = f[c].substr(l, s - l);
                    g = f[c].toLowerCase().indexOf(d, g + 1);
                    jQuery(e).trigger("onSearchAbstractAdded", {
                        Rc: e.Yb.jd[h]
                    });
                    n++;
                }
            } else {
                e.Rh == r && (e.Rh = setTimeout(function() {
                    e.renderer.pc == r && e.renderer.Jc(c + 1, y, function() {
                        e.Rh = r;
                        e.ph(d, c);
                    });
                }, 100));
            }
        },
        searchText: function(c, d) {
            var e = this;
            if (!(c == r || c != r && 0 == c.length)) {
                if (d === k && (e.ba == P || e.ba == X || e.ba == U || e.ba == e.na()) && e.document.EnableSearchAbstracts && !eb.platform.mobilepreview) {
                    d = q;
                }
                d && (e.ba == e.na() && 1 < e.scale) && (e.renderer.Zf && e.renderer.gn(), e.Zoom(1));
                jQuery(e.da).find(".flowpaper_txtSearch").val() != c && jQuery(e.da).find(".flowpaper_txtSearch").val(c);
                if (e.ba == V) {
                    e.switchMode(P), setTimeout(function() {
                        e.searchText(c);
                    }, 1000);
                } else {
                    var f = e.renderer.bb,
                      g = e.renderer.getNumPages();
                    e.af || (e.af = 0);
                    if (0 == e.renderer.wa.Ha.length && 10 > e.af) {
                        window.clearTimeout(e.Jk), e.Jk = setTimeout(function() {
                            e.searchText(c, d);
                        }, 500), e.af++;
                    } else {
                        e.af = 0;
                        e.Xc || (e.Xc = 0);
                        e.Va || (e.Va = -1);
                        c != r && 0 < c.length && (c = c.toLowerCase());
                        e.Mc != c && (e.Zb = -1, e.Mc = c, e.Xc = 0, e.Va = -1, e.Yb = [], e.Yb.jd = []); - 1 == e.Va ? e.Va = parseInt(e.ra) : e.Zb += c.length;
                        0 == e.Yb.jd.length && (e.Yb.searchText != c && d) && (e.Yb.searchText != c && e.ja.find(".flowpaper_searchabstract_result, .flowpaper_searchabstract_result_separator").remove(), e.Yb.searchText = c, e.Xh(), e.ph(c));
                        for (; e.Va - 1 < g;) {
                            var n = f[e.Va - 1];
                            e.renderer.Da && n == r && (jQuery(e.renderer).trigger("UIBlockingRenderingOperation", e.ea), e.Yk = e.Va, e.renderer.Jc(e.Va, y, function() {
                                n = f[e.Va - 1];
                                e.Yk = r;
                            }));
                            e.Zb = n.indexOf(c, -1 == e.Zb ? 0 : e.Zb);
                            if (0 <= e.Zb) {
                                e.ra != e.Va && (e.ba == e.na() && e.ra != e.Va + 1 || e.ba == R && e.ra != e.Va + 1 || e.ba == U && e.ra != e.Va - 1 || e.ba == X && e.ra != e.Va) && (e.ba == U || e.ba == R || e.ba == X || e.ba == e.na()) ? e.gotoPage(e.Va, function() {
                                    e.Zb -= c.length;
                                    e.searchText(c);
                                }) : (e.Xc++, e.renderer.Ec ? this.ca.getPage(e.Va - 1).load(function() {
                                    e.ca.getPage(e.Va - 1).Vb(e.Mc, y);
                                }) : (e.ba == P && this.ca.getPage(e.Va - 1).load(function() {
                                    e.ca.getPage(e.Va - 1).Vb(e.Mc, y);
                                }), (e.ba == U || e.ba == X || e.ba == e.na()) && this.ca.getPage(e.Va - 1).Vb(e.Mc, y)));
                                break;
                            }
                            e.Va++;
                            e.Zb = -1;
                            e.Xc = 0;
                        } - 1 == e.Zb && (e.Zb = -1, e.Xc = 0, e.Va = -1, e.Pb(), e.gotoPage(1));
                    }
                }
            }
        },
        $d: function(c) {
            return this.ca.$d(c);
        },
        be: function(c) {
            return this.ca.be(c);
        },
        lc: function(c) {
            return this.ca.lc(c);
        },
        ed: function(c) {
            return this.ca.ed(c);
        },
        ce: function(c) {
            return this.ca.ce(c);
        },
        fitheight: function() {
            if (this.ba != this.na()) {
                try {
                    if (eb.platform.touchdevice) {
                        if (c = this.dd()) {
                            window.FitHeightScale = c, this.gb(c, {
                                Wd: q
                            }), this.ca.jg();
                        }
                    } else {
                        var c = this.dd();
                        window.FitHeightScale = c;
                        jQuery(this.da).trigger("onScaleChanged", c / this.document.MaxZoomSize);
                        c * this.document.MaxZoomSize >= this.document.MinZoomSize && c <= this.document.MaxZoomSize && (this.ba == P ? this.gb(this.document.MaxZoomSize * c, {
                            Wd: q
                        }) : this.gb(this.document.MaxZoomSize * c));
                    }
                } catch (d) {}
            }
        },
        Me: function() {
            var c = jQuery(this.ca.ma).width() - 15,
              d = 1 < this.getTotalPages() ? this.ra - 1 : 0;
            0 > d && (d = 0);
            this.document.DisplayRange && (d = parseInt(this.document.DisplayRange.split("-")[0]) - 1);
            var e = this.ca.getPage(d).dimensions.xa / this.ca.getPage(d).dimensions.Ga;
            return eb.platform.touchdevice ? c / (this.ca.getPage(d).Na * e) - (this.ba == X ? 0.1 : 0.03) : c / (this.ca.getPage(d).Na * this.document.MaxZoomSize * e) - 0.012;
        },
        dd: function() {
            this.ra - 1 && (this.ra = 1);
            if (this.ba == P || this.ba == X || this.ba == U || this.ba == R) {
                var c = this.ca.getPage(this.ra - 1).dimensions.width / this.ca.getPage(this.ra - 1).dimensions.height;
                if (eb.platform.touchdevice) {
                    if (d = jQuery(this.ga).height() - (this.ba == U || this.ba == R ? 40 : 0), this.ba == X && (d -= 25), d /= this.ca.getPage(this.ra - 1).Na, e = this.ca.getPage(this.ra - 1), e = e.Na * (e.dimensions.xa / e.dimensions.Ga) * d, (this.ba == U || this.ba == R) && 2 * e > this.ga.width()) {
                        d = this.ga.width() - 0, d /= 4 * this.ca.getPage(this.ra - 1).Na;
                    }
                } else {
                    var d = jQuery(this.ca.ma).height() - (this.ba == U || this.ba == R ? 25 : 0);
                    this.document.DisableOverflow && (d = na());
                    var d = d / (this.ca.getPage(this.ra - 1).Na * this.document.MaxZoomSize),
                      e = this.ca.getPage(this.ra - 1),
                      e = e.Na * (e.dimensions.xa / e.dimensions.Ga) * this.document.MaxZoomSize * d;
                    if ((this.ba == U || this.ba == R) && 2 * e > this.ga.width() && !this.document.DisableOverflow) {
                        d = (jQuery(this.ga).width() - (this.ba == U || this.ba == R ? 40 : 0)) / 1.48, d = d / 1.6 / (this.ca.getPage(this.ra - 1).Na * this.document.MaxZoomSize * c);
                    }
                }
                return window.FitHeightScale = d;
            }
            if (this.ba == this.na()) {
                return d = 1, window.FitHeightScale = d;
            }
        },
        next: function() {
            var c = this;
            !c.Qf && c.ba != c.na() ? (c.Qf = setTimeout(function() {
                window.clearTimeout(c.Qf);
                c.Qf = r;
            }, 700), c.ca.next()) : c.ba == c.na() && c.ca.next();
        },
        gotoPage: function(c, d) {
            var e = this;
            e.ca && (e.ba == V ? eb.platform.ios ? e.ha ? e.ha.zn(c) : e.switchMode(P, c) : e.switchMode(P, c) : (e.ba == P && e.ca.scrollTo(c), e.ba == X && setTimeout(function() {
                e.ca.ge(c, d);
            }, 300), (e.ba == U || e.ba == R) && setTimeout(function() {
                e.ca.je(c, d);
            }, 300), e.ha && e.ha.gotoPage(c, d)));
        },
        rotate: function() {
            this.ca.rotate(this.getCurrPage() - 1);
            window.annotations && (jQuery(".flowpaper_pageword_" + this.ea).remove(), this.Nc(), this.ca.La());
        },
        getCurrPage: function() {
            return this.ca != r ? this.ba != this.na() ? this.ca.la + 1 : this.ca.la : 1;
        },
        Ok: function() {
            this.version = "3.0.1";
        },
        Nk: function() {
            this.build = "10-April-2017";
        },
        getTotalPages: function() {
            return this.ca.getTotalPages();
        },
        sd: function(c) {
            var d = this;
            d.ba != d.na() && (this.ra = c, this.ca.la = this.ra - 1);
            c > d.getTotalPages() && (c -= 1, this.ca.la = c);
            if ((this.ba == U || this.ba == R) && this.ca.la == this.ca.getTotalPages() - 1 && 0 != this.ca.la % 2) {
                this.ca.la += 1;
            }
            d.ha && (0 == c && (c++, this.ra = c), d.ha.sd(c));
            d.qc && (jQuery(".flowpaper_mark_video_maximized").remove(), jQuery(".flowpaper_mark_video_maximized_closebutton").remove(), d.qc = r);
            0 < jQuery(".flowpaper_mark_video").find("iframe,video").length && jQuery(".flowpaper_mark_video").find("iframe,video").each(function() {
                try {
                    var c = jQuery(this).closest(".flowpaper_page").attr("id"),
                      f = parseInt(c.substr(14, c.lastIndexOf("_") - 14));
                    if (0 == f && 0 != d.ca.la - 1 || !d.ha.nd && 0 < f && f != d.ca.la - 1 && f != d.ca.la - 2 || d.ha.nd && f != d.ca.la - 1) {
                        jQuery(this).parent().remove();
                        var g = d.ca.ca[f];
                        g.Qe(g.ik ? g.ik : g.scale, g.Kb());
                    }
                } catch (n) {}
            });
            this.toolbar.jl(c);
            d.plugin != r && (this.ba == U ? d.plugin.Af() : this.ba == R && 1 != c && d.plugin.Af(), d.plugin.Af());
        },
        openFullScreen: function() {
            var c = this;
            if (c.Kf) {
                c.ja.prepend("<div id='modal-maximize' class='modal-content flowpaper_printdialog' style='overflow:hidden;;'><div style='background-color:#fff;color:#000;padding:10px 10px 10px 10px;height:155px;padding-bottom:20px;'>It's not possible to maximize the viewer from within the Desktop Publisher. <br/><br/>You can try this feature by clicking on 'Publish' and then 'View in Browser'.<br/><br/><a class='flowpaper_printdialog_button' id='bttnMaximizeDisabledOK'>OK</a></div></div>"), c.Gm = jQuery("#modal-maximize").smodal({
                    minHeight: 155,
                    appendTo: c.ja
                }), jQuery("#bttnMaximizeDisabledOK").bind("click", function(c) {
                    jQuery.smodal.close();
                    c.stopImmediatePropagation();
                    jQuery("#modal-maximize").remove();
                    return y;
                });
            } else {
                var d = document.Ij || document.mozFullScreen || document.webkitIsFullScreen || window.Ci || window.gf || document.fullscreenElement || document.msFullscreenElement,
                  e = c.ja.get(0);
                if (d) {
                    return document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.msExitFullscreen && document.msExitFullscreen(), window.gf && window.close(), y;
                }
                "0" != c.ja.css("top") && (c.sk = c.ja.css("top"));
                "0" != c.ja.css("left") && (c.rk = c.ja.css("left"));
                c.ba == c.na() && 1 < c.scale && (c.ca.zd(), c.fisheye.show(), c.fisheye.animate({
                    opacity: 1
                }, 100));
                c.xa = c.ja.width();
                c.Ga = c.ja.height();
                c.PreviewMode && c.ca.Vm && (c.PreviewMode = y, c.hf = q, c.ha.zb.Zm(c.ca, c.ga), c.ha.xn());
                c.ja.css({
                    visibility: "hidden"
                });
                jQuery(document).bind("webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange", function() {
                    setTimeout(function() {
                        if (window.navigator.standalone || document.fullScreenElement && document.fullScreenElement != r || document.mozFullScreen || document.webkitIsFullScreen) {
                            eb.browser.safari ? window.zine ? c.resize(screen.width, screen.height) : c.config.BottomToolbar ? c.resize(screen.width, screen.height - jQuery(c.da).height() - 70) : c.resize(screen.width, screen.height - jQuery(c.da).height()) : window.zine ? c.resize(jQuery(document).width(), jQuery(document).height()) : c.resize(window.innerWidth, window.innerHeight);
                        }
                        window.annotations && (jQuery(".flowpaper_pageword_" + c.ea).remove(), c.Nc(), c.ca.La());
                        c.ja.css({
                            visibility: "visible"
                        });
                    }, 500);
                    jQuery(document).bind("webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange", function() {
                        jQuery(document).unbind("webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange");
                        c.Jf = y;
                        c.ja.css({
                            top: c.sk,
                            left: c.rk
                        });
                        c.hf && (c.PreviewMode = q, c.ha.pm(), c.ha.Wj(), setTimeout(function() {
                            c.PreviewMode && c.ha.Wj();
                        }, 1000));
                        c.ba == c.na() && 1 < c.scale ? c.ca.zd(function() {
                            c.fisheye.show();
                            c.fisheye.animate({
                                opacity: 1
                            }, 100);
                            c.resize(c.xa, c.Ga - 2);
                            jQuery(c.da).trigger("onFullscreenChanged", y);
                        }) : (c.resize(c.xa, c.Ga - 2), jQuery(c.da).trigger("onFullscreenChanged", y));
                        jQuery(document).unbind("webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange");
                        c.hf && (c.hf = y, c.ha.zb.xg(c.ca, c.ga));
                        window.annotations && (jQuery(".flowpaper_pageword_" + c.ea).remove(), c.Nc(), c.ca.La());
                    });
                    window.clearTimeout(c.bg);
                    c.bg = setTimeout(function() {
                        !c.PreviewMode && (c.ha && c.ha.Cj) && c.ha.Vk();
                    }, 1000);
                });
                d = eb.platform.android && !e.webkitRequestFullScreen;
                !c.document.FullScreenAsMaxWindow && document.documentElement.requestFullScreen && !d ? (c.ja.css({
                    visibility: "hidden"
                }), e.requestFullScreen(), c.ja.css({
                    left: "0px",
                    top: "0px"
                })) : !c.document.FullScreenAsMaxWindow && document.documentElement.mozRequestFullScreen && !d ? (c.ja.css({
                    visibility: "hidden"
                }), e.mozRequestFullScreen(), c.ja.css({
                    left: "0px",
                    top: "0px"
                })) : !c.document.FullScreenAsMaxWindow && document.documentElement.webkitRequestFullScreen && !d ? (c.ja.css({
                    visibility: "hidden"
                }), e.webkitRequestFullScreen(!(eb.browser.safari && 10 > eb.browser.gc) ? 1 : 0), c.ja.css({
                    left: "0px",
                    top: "0px"
                })) : !c.document.FullScreenAsMaxWindow && document.documentElement.msRequestFullscreen ? (c.ja.css({
                    visibility: "hidden"
                }), c.Jf ? (c.Jf = y, window.document.msExitFullscreen()) : (c.Jf = q, e.msRequestFullscreen()), setTimeout(function() {
                    c.ja.css({
                        visibility: "visible"
                    });
                    c.resize(window.outerWidth, window.outerHeight);
                    window.annotations && (jQuery(".flowpaper_pageword_" + c.ea).remove(), c.Nc(), c.ca.La());
                }, 500)) : (c.pk(), setTimeout(function() {
                    c.ja.css({
                        visibility: "visible"
                    });
                }, 500));
                jQuery(c.da).trigger("onFullscreenChanged", q);
            }
        },
        pk: function() {
            var c = "",
              c = "toolbar=no, location=no, scrollbars=no, width=" + screen.width,
              c = c + (", height=" + screen.height),
              c = c + ", top=0, left=0, fullscreen=yes";
            nw = this.document.FullScreenAsMaxWindow ? window.open("") : window.open("", "windowname4", c);
            nw.params = c;
            c = "<!doctype html><head>";
            c += '<meta name="viewport" content="initial-scale=1,user-scalable=no,maximum-scale=1,width=device-width" />';
            c += '<link rel="stylesheet" type="text/css" href="' + this.config.cssDirectory + (-1 == this.config.cssDirectory.indexOf("flowpaper.css") ? "flowpaper.css" : "") + '" />';
            this.renderer.mc && (c += "<link rel='stylesheet' type='text/css' href='" + this.document.JSONFile.substring(0, this.document.JSONFile.lastIndexOf("/")) + "/fonts.css' />");
            c += '<script type="text/javascript" src="' + this.config.jsDirectory + 'jquery.min.js">\x3c/script>';
            c += '<script type="text/javascript" src="' + this.config.jsDirectory + 'jquery.extensions.min.js">\x3c/script>';
            c += '<script type="text/javascript" src="' + this.config.jsDirectory + 'flowpaper.js">\x3c/script>';
            c += '<script type="text/javascript" src="' + this.config.jsDirectory + 'flowpaper_handlers.js">\x3c/script>';
            c += '<style type="text/css" media="screen">body{ margin:0; padding:0; overflow-x:hidden;overflow-y:hidden; }</style>';
            c += "</head>";
            c += '<body onload="openViewer();">';
            c += '<div id="documentViewer" class="flowpaper_viewer" style="position:absolute;left:0px;top:0px;width:100%;height:100%;"></div>';
            c += '<script type="text/javascript">';
            c += "function openViewer(){";
            c += 'jQuery("#documentViewer").FlowPaperViewer(';
            c += "{ config : {";
            c += "";
            c += 'SWFFile : "' + this.document.SWFFile + '",';
            c += 'IMGFiles : "' + this.document.IMGFiles + '",';
            c += 'JSONFile : "' + this.document.JSONFile + '",';
            c += 'PDFFile : "' + this.document.PDFFile + '",';
            c += "";
            c += "Scale : " + this.scale + ",";
            c += 'ZoomTransition : "' + this.document.ZoomTransition + '",';
            c += "ZoomTime : " + this.document.ZoomTime + ",";
            c += "ZoomInterval : " + this.document.ZoomInterval + ",";
            c += "FitPageOnLoad : " + this.document.FitPageOnLoad + ",";
            c += "FitWidthOnLoad : " + this.document.FitWidthOnLoad + ",";
            c += "FullScreenAsMaxWindow : " + this.document.FullScreenAsMaxWindow + ",";
            c += "ProgressiveLoading : " + this.document.ProgressiveLoading + ",";
            c += "MinZoomSize : " + this.document.MinZoomSize + ",";
            c += "MaxZoomSize : " + this.document.MaxZoomSize + ",";
            c += "MixedMode : " + this.document.MixedMode + ",";
            c += "SearchMatchAll : " + this.document.SearchMatchAll + ",";
            c += 'InitViewMode : "' + this.document.InitViewMode + '",';
            c += 'RenderingOrder : "' + this.document.RenderingOrder + '",';
            c += "useCustomJSONFormat : " + this.document.useCustomJSONFormat + ",";
            c += 'JSONDataType : "' + this.document.JSONDataType + '",';
            this.document.JSONPageDataFormat != r && (c += "JSONPageDataFormat : {", c += 'pageWidth : "' + this.document.JSONPageDataFormat.Sa + '",', c += 'pageHeight : "' + this.document.JSONPageDataFormat.Ya + '",', c += 'textCollection : "' + this.document.JSONPageDataFormat.Yc + '",', c += 'textFragment : "' + this.document.JSONPageDataFormat.ob + '",', c += 'textFont : "' + this.document.JSONPageDataFormat.Ce + '",', c += 'textLeft : "' + this.document.JSONPageDataFormat.yc + '",', c += 'textTop : "' + this.document.JSONPageDataFormat.zc + '",', c += 'textWidth : "' + this.document.JSONPageDataFormat.Ac + '",', c += 'textHeight : "' + this.document.JSONPageDataFormat.xc + '"', c += "},");
            c += "ViewModeToolsVisible : " + this.document.ViewModeToolsVisible + ",";
            c += "ZoomToolsVisible : " + this.document.ZoomToolsVisible + ",";
            c += "NavToolsVisible : " + this.document.NavToolsVisible + ",";
            c += "CursorToolsVisible : " + this.document.CursorToolsVisible + ",";
            c += "SearchToolsVisible : " + this.document.SearchToolsVisible + ",";
            window.zine || (c += 'Toolbar : "' + escape(this.config.Toolbar) + '",');
            c += 'BottomToolbar : "' + this.config.BottomToolbar + '",';
            c += 'UIConfig : "' + this.document.UIConfig + '",';
            c += 'jsDirectory : "' + this.config.jsDirectory + '",';
            c += 'cssDirectory : "' + this.config.cssDirectory + '",';
            c += 'localeDirectory : "' + this.config.localeDirectory + '",';
            c += 'key : "' + this.config.key + '",';
            c += "";
            c += 'localeChain: "' + this.document.localeChain + '"';
            c += "}});";
            c += "}";
            c += "jQuery('#documentViewer').bind('onDocumentLoaded',function(e,totalPages){";
            c += "var ml = " + JSON.stringify(this.plugin.dh()) + ";";
            c += "$FlowPaper('documentViewer').addMarks(ml);";
            c += "});";
            c += "jQuery('#documentViewer').bind('onMarkCreated',function(e,mark){";
            c += "   window.opener.$FlowPaper('" + this.ea + "').trigger('onMarkCreated',mark);";
            c += "});";
            c += "jQuery('#documentViewer').bind('onMarkDeleted',function(e,mark){";
            c += "   window.opener.$FlowPaper('" + this.ea + "').trigger('onMarkDeleted',mark);";
            c += "});";
            c += "jQuery('#documentViewer').bind('onMarkChanged',function(e,mark){";
            c += "   window.opener.$FlowPaper('" + this.ea + "').trigger('onMarkChanged',mark);";
            c += "});";
            c += "jQuery('#documentViewer').bind('onSelectedMarkChanged',function(e,mark){";
            c += "   window.opener.$FlowPaper('" + this.ea + "').trigger('onSelectedMarkChanged',mark);";
            c += "});";
            c += "document.fullscreen = true;";
            c += "$(document).keyup(function(e) {if (e.keyCode == 27){window.close();}});";
            c += "\x3c/script>";
            c += "</body>";
            c += "</html>";
            nw.document.write(c);
            nw.gf = q;
            window.focus && nw.focus();
            nw.document.close();
            return y;
        },
        resize: function(c, d, e, f) {
            var g = this;
            if (g.initialized) {
                g.width = r;
                if (g.ba == g.na()) {
                    g.ha.resize(c, d, e, f);
                } else {
                    g.nb && (c -= g.nb.width() / 2, g.ga.animate({
                        left: g.nb.width() / 2 + "px"
                    }, 0));
                    var n = jQuery(g.da).height() + 1 + 14,
                      l = 0 < g.Rd ? g.Rd + 1 : 0;
                    g.ga.css({
                        width: c,
                        height: d - n - l
                    });
                    (e == r || e == q) && this.ja.css({
                        width: c,
                        height: d
                    });
                    g.ca.resize(c, d - n - l, f);
                    jQuery(".flowpaper_interactiveobject_" + g.ea).remove();
                    jQuery(".flowpaper_pageword_" + g.ea).remove();
                    (g.ba == U || g.ba == R) && g.fitheight();
                    window.clearTimeout(g.uk);
                    g.uk = setTimeout(function() {
                        g.ca.La();
                    }, 700);
                }
                g.ha && g.ha.Cj && (window.clearTimeout(g.bg), g.bg = setTimeout(function() {
                    g.PreviewMode || g.ha.Vk();
                }, 2500));
            }
        }
    };
    g.loadFromUrl = g.loadFromUrl;
    return g;
}();
window.print_flowpaper_Document = function(g, c, d, e, f) {
    FLOWPAPER.ih.init();
    g = Array(f + 1);
    var m = 0;
    if ("all" == d) {
        for (var n = 1; n < f + 1; n++) {
            g[n] = q;
        }
        m = f;
    } else {
        if ("current" == d) {
            g[e] = q, m = 1;
        } else {
            if (-1 == d.indexOf(",") && -1 < d.indexOf("-")) {
                for (var l = parseInt(d.substr(0, d.toString().indexOf("-"))), s = parseInt(d.substr(d.toString().indexOf("-") + 1)); l < s + 1; l++) {
                    g[l] = q, m++;
                }
            } else {
                if (0 < d.indexOf(",")) {
                    for (var h = d.split(","), n = 0; n < h.length; n++) {
                        if (-1 < h[n].indexOf("-")) {
                            l = parseInt(h[n].substr(0, h[n].toString().indexOf("-")));
                            for (s = parseInt(h[n].substr(h[n].toString().indexOf("-") + 1)); l < s + 1; l++) {
                                g[l] = q, m++;
                            }
                        } else {
                            g[parseInt(h[n].toString())] = q, m++;
                        }
                    }
                }
            }
        }
    }
    jQuery(document.body).append("<div id='documentViewer' style='position:absolute;width:100%;height:100%'></div>");
    g = "1-" + f;
    window.Sf = 0;
    g = "current" == d ? e + "-" + e : "all" == d ? "1-" + f : d; - 1 == g.indexOf("-") && (g = g + "-" + g, m = 1);
    jQuery("#documentViewer").FlowPaperViewer({
        config: {
            IMGFiles: c.pageImagePattern,
            JSONFile: c.jsonfile && "undefined" != c.jsonfile ? c.jsonfile : r,
            PDFFile: c.PdfFile,
            JSONDataType: c.JSONDataType,
            Scale: 1,
            RenderingOrder: c.jsonfile != r && "undefined" != c.jsonfile && 0 < c.jsonfile.length && c.pageImagePattern != r && 0 < c.pageImagePattern.length && "undefined" != c.pageImagePattern ? "html,html" : "html5,html",
            key: c.key,
            UserCollaboration: c.UserCollaboration,
            InitViewMode: "Portrait",
            DisableOverflow: q,
            DisplayRange: g
        }
    });
    jQuery("#documentViewer").bind("onPageLoaded", function() {
        window.Sf == m - 1 && setTimeout(function() {
            if (window.parent.onPrintRenderingCompleted) {
                window.parent.onPrintRenderingCompleted();
            }
            window.focus && window.focus();
            window.print();
            window.close && window.close();
        }, 2000);
        window.Sf++;
        if (window.parent.onPrintRenderingProgress) {
            window.parent.onPrintRenderingProgress(window.Sf);
        }
    });
};
window.renderPrintPage = function $(c, d) {
    "CanvasPageRenderer" == c.ee() && (d < c.getNumPages() ? c.Da ? document.getElementById("ppage_" + d) ? c.Mf(d + 1, function() {
        if (parent.onPrintRenderingProgress) {
            parent.onPrintRenderingProgress(d + 1);
        }
        document.getElementById("ppage_" + d) ? c.Ka[d].getPage(1).then(function(e) {
            var f = document.getElementById("ppage_" + d);
            if (f) {
                var m = f.getContext("2d"),
                  n = e.getViewport(4),
                  m = {
                      canvasContext: m,
                      viewport: n,
                      bi: r,
                      continueCallback: function(c) {
                          c();
                      }
                  };
                f.width = n.width;
                f.height = n.height;
                e.render(m).promise.then(function() {
                    e.destroy();
                    $(c, d + 1);
                }, function(c) {
                    console.log(c);
                });
            } else {
                $(c, d + 1);
            }
        }) : $(c, d + 1);
    }) : $(c, d + 1) : document.getElementById("ppage_" + d) ? c.Ka.getPage(d + 1).then(function(e) {
        if (parent.onPrintRenderingProgress) {
            parent.onPrintRenderingProgress(d + 1);
        }
        var f = document.getElementById("ppage_" + d);
        if (f) {
            var m = f.getContext("2d"),
              n = e.getViewport(4),
              m = {
                  canvasContext: m,
                  viewport: n,
                  bi: r,
                  continueCallback: function(c) {
                      c();
                  }
              };
            f.width = n.width;
            f.height = n.height;
            e.render(m).promise.then(function() {
                $(c, d + 1);
                e.destroy();
            }, function(c) {
                console.log(c);
            });
        } else {
            $(c, d + 1);
        }
    }) : $(c, d + 1) : (parent.onPrintRenderingCompleted(), window.print()));
};
xa && self.addEventListener("message", function(g) {
    g = g.data;
    if ("undefined" !== g.cmd) {
        switch (g.cmd) {
            case "loadImageResource":
                var c = new XMLHttpRequest;
                c.open("GET", "../../" + g.src);
                c.Km = c.responseType = "arraybuffer";
                c.onreadystatechange = function() {
                    if (4 == c.readyState && 200 == c.status) {
                        for (var d = new Uint8Array(this.response), e = d.length, f = Array(e); e--;) {
                            f[e] = String.fromCharCode(d[e]);
                        }
                        self.postMessage({
                            status: "ImageResourceLoaded",
                            blob: f.join("")
                        });
                        self.close();
                    }
                };
                c.send(r);
        }
    }
}, y);
