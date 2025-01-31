!(function (t) {
  "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery);
})(function (x) {
  var t, e, i, s;
  function n(t, e) {
    var i,
      s,
      n = t.nodeName.toLowerCase();
    return "area" === n
      ? ((i = (s = t.parentNode).name),
        !(!t.href || !i || "map" !== s.nodeName.toLowerCase()) &&
          !!(s = x("img[usemap='#" + i + "']")[0]) &&
          o(s))
      : (/^(input|select|textarea|button|object)$/.test(n)
          ? !t.disabled
          : ("a" === n && t.href) || e) && o(t);
  }
  function o(t) {
    return (
      x.expr.filters.visible(t) &&
      !x(t)
        .parents()
        .addBack()
        .filter(function () {
          return "hidden" === x.css(this, "visibility");
        }).length
    );
  }
  (x.ui = x.ui || {}),
    x.extend(x.ui, {
      version: "1.11.4",
      keyCode: {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38,
      },
    }),
    x.fn.extend({
      scrollParent: function (t) {
        var e = this.css("position"),
          i = "absolute" === e,
          s = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
          t = this.parents()
            .filter(function () {
              var t = x(this);
              return (
                (!i || "static" !== t.css("position")) &&
                s.test(
                  t.css("overflow") + t.css("overflow-y") + t.css("overflow-x")
                )
              );
            })
            .eq(0);
        return "fixed" !== e && t.length
          ? t
          : x(this[0].ownerDocument || document);
      },
      uniqueId:
        ((t = 0),
        function () {
          return this.each(function () {
            this.id || (this.id = "ui-id-" + ++t);
          });
        }),
      removeUniqueId: function () {
        return this.each(function () {
          /^ui-id-\d+$/.test(this.id) && x(this).removeAttr("id");
        });
      },
    }),
    x.extend(x.expr[":"], {
      data: x.expr.createPseudo
        ? x.expr.createPseudo(function (e) {
            return function (t) {
              return !!x.data(t, e);
            };
          })
        : function (t, e, i) {
            return !!x.data(t, i[3]);
          },
      focusable: function (t) {
        return n(t, !isNaN(x.attr(t, "tabindex")));
      },
      tabbable: function (t) {
        var e = x.attr(t, "tabindex"),
          i = isNaN(e);
        return (i || 0 <= e) && n(t, !i);
      },
    }),
    x("<a>").outerWidth(1).jquery ||
      x.each(["Width", "Height"], function (t, i) {
        var n = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
          s = i.toLowerCase(),
          o = {
            innerWidth: x.fn.innerWidth,
            innerHeight: x.fn.innerHeight,
            outerWidth: x.fn.outerWidth,
            outerHeight: x.fn.outerHeight,
          };
        function a(t, e, i, s) {
          return (
            x.each(n, function () {
              (e -= parseFloat(x.css(t, "padding" + this)) || 0),
                i &&
                  (e -= parseFloat(x.css(t, "border" + this + "Width")) || 0),
                s && (e -= parseFloat(x.css(t, "margin" + this)) || 0);
            }),
            e
          );
        }
        (x.fn["inner" + i] = function (t) {
          return void 0 === t
            ? o["inner" + i].call(this)
            : this.each(function () {
                x(this).css(s, a(this, t) + "px");
              });
        }),
          (x.fn["outer" + i] = function (t, e) {
            return "number" != typeof t
              ? o["outer" + i].call(this, t)
              : this.each(function () {
                  x(this).css(s, a(this, t, !0, e) + "px");
                });
          });
      }),
    x.fn.addBack ||
      (x.fn.addBack = function (t) {
        return this.add(
          null == t ? this.prevObject : this.prevObject.filter(t)
        );
      }),
    x("<a>").data("a-b", "a").removeData("a-b").data("a-b") &&
      (x.fn.removeData =
        ((e = x.fn.removeData),
        function (t) {
          return arguments.length ? e.call(this, x.camelCase(t)) : e.call(this);
        })),
    (x.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase())),
    x.fn.extend({
      focus:
        ((s = x.fn.focus),
        function (e, i) {
          return "number" == typeof e
            ? this.each(function () {
                var t = this;
                setTimeout(function () {
                  x(t).focus(), i && i.call(t);
                }, e);
              })
            : s.apply(this, arguments);
        }),
      disableSelection:
        ((i =
          "onselectstart" in document.createElement("div")
            ? "selectstart"
            : "mousedown"),
        function () {
          return this.bind(i + ".ui-disableSelection", function (t) {
            t.preventDefault();
          });
        }),
      enableSelection: function () {
        return this.unbind(".ui-disableSelection");
      },
      zIndex: function (t) {
        if (void 0 !== t) return this.css("zIndex", t);
        if (this.length)
          for (var e, i = x(this[0]); i.length && i[0] !== document; ) {
            if (
              ("absolute" === (e = i.css("position")) ||
                "relative" === e ||
                "fixed" === e) &&
              ((e = parseInt(i.css("zIndex"), 10)), !isNaN(e) && 0 !== e)
            )
              return e;
            i = i.parent();
          }
        return 0;
      },
    }),
    (x.ui.plugin = {
      add: function (t, e, i) {
        var s,
          n = x.ui[t].prototype;
        for (s in i)
          (n.plugins[s] = n.plugins[s] || []), n.plugins[s].push([e, i[s]]);
      },
      call: function (t, e, i, s) {
        var n,
          o = t.plugins[e];
        if (
          o &&
          (s ||
            (t.element[0].parentNode &&
              11 !== t.element[0].parentNode.nodeType))
        )
          for (n = 0; n < o.length; n++)
            t.options[o[n][0]] && o[n][1].apply(t.element, i);
      },
    });
  var a,
    W = 0,
    O = Array.prototype.slice,
    r =
      ((x.cleanData =
        ((a = x.cleanData),
        function (t) {
          for (var e, i, s = 0; null != (i = t[s]); s++)
            try {
              (e = x._data(i, "events")) &&
                e.remove &&
                x(i).triggerHandler("remove");
            } catch (t) {}
          a(t);
        })),
      (x.widget = function (t, i, e) {
        var s,
          n,
          o,
          a,
          r = {},
          h = t.split(".")[0];
        return (
          (t = t.split(".")[1]),
          (s = h + "-" + t),
          e || ((e = i), (i = x.Widget)),
          (x.expr[":"][s.toLowerCase()] = function (t) {
            return !!x.data(t, s);
          }),
          (x[h] = x[h] || {}),
          (n = x[h][t]),
          (o = x[h][t] =
            function (t, e) {
              if (!this._createWidget) return new o(t, e);
              arguments.length && this._createWidget(t, e);
            }),
          x.extend(o, n, {
            version: e.version,
            _proto: x.extend({}, e),
            _childConstructors: [],
          }),
          ((a = new i()).options = x.widget.extend({}, a.options)),
          x.each(e, function (e, s) {
            function n() {
              return i.prototype[e].apply(this, arguments);
            }
            function o(t) {
              return i.prototype[e].apply(this, t);
            }
            x.isFunction(s)
              ? (r[e] = function () {
                  var t,
                    e = this._super,
                    i = this._superApply;
                  return (
                    (this._super = n),
                    (this._superApply = o),
                    (t = s.apply(this, arguments)),
                    (this._super = e),
                    (this._superApply = i),
                    t
                  );
                })
              : (r[e] = s);
          }),
          (o.prototype = x.widget.extend(
            a,
            { widgetEventPrefix: (n && a.widgetEventPrefix) || t },
            r,
            { constructor: o, namespace: h, widgetName: t, widgetFullName: s }
          )),
          n
            ? (x.each(n._childConstructors, function (t, e) {
                var i = e.prototype;
                x.widget(i.namespace + "." + i.widgetName, o, e._proto);
              }),
              delete n._childConstructors)
            : i._childConstructors.push(o),
          x.widget.bridge(t, o),
          o
        );
      }),
      (x.widget.extend = function (t) {
        for (
          var e, i, s = O.call(arguments, 1), n = 0, o = s.length;
          n < o;
          n++
        )
          for (e in s[n])
            (i = s[n][e]),
              s[n].hasOwnProperty(e) &&
                void 0 !== i &&
                (x.isPlainObject(i)
                  ? (t[e] = x.isPlainObject(t[e])
                      ? x.widget.extend({}, t[e], i)
                      : x.widget.extend({}, i))
                  : (t[e] = i));
        return t;
      }),
      (x.widget.bridge = function (o, e) {
        var a = e.prototype.widgetFullName || o;
        x.fn[o] = function (i) {
          var t = "string" == typeof i,
            s = O.call(arguments, 1),
            n = this;
          return (
            t
              ? this.each(function () {
                  var t,
                    e = x.data(this, a);
                  return "instance" === i
                    ? ((n = e), !1)
                    : e
                    ? x.isFunction(e[i]) && "_" !== i.charAt(0)
                      ? (t = e[i].apply(e, s)) !== e && void 0 !== t
                        ? ((n = t && t.jquery ? n.pushStack(t.get()) : t), !1)
                        : void 0
                      : x.error(
                          "no such method '" +
                            i +
                            "' for " +
                            o +
                            " widget instance"
                        )
                    : x.error(
                        "cannot call methods on " +
                          o +
                          " prior to initialization; attempted to call method '" +
                          i +
                          "'"
                      );
                })
              : (s.length && (i = x.widget.extend.apply(null, [i].concat(s))),
                this.each(function () {
                  var t = x.data(this, a);
                  t
                    ? (t.option(i || {}), t._init && t._init())
                    : x.data(this, a, new e(i, this));
                })),
            n
          );
        };
      }),
      (x.Widget = function () {}),
      (x.Widget._childConstructors = []),
      (x.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: { disabled: !1, create: null },
        _createWidget: function (t, e) {
          (e = x(e || this.defaultElement || this)[0]),
            (this.element = x(e)),
            (this.uuid = W++),
            (this.eventNamespace = "." + this.widgetName + this.uuid),
            (this.bindings = x()),
            (this.hoverable = x()),
            (this.focusable = x()),
            e !== this &&
              (x.data(e, this.widgetFullName, this),
              this._on(!0, this.element, {
                remove: function (t) {
                  t.target === e && this.destroy();
                },
              }),
              (this.document = x(e.style ? e.ownerDocument : e.document || e)),
              (this.window = x(
                this.document[0].defaultView || this.document[0].parentWindow
              ))),
            (this.options = x.widget.extend(
              {},
              this.options,
              this._getCreateOptions(),
              t
            )),
            this._create(),
            this._trigger("create", null, this._getCreateEventData()),
            this._init();
        },
        _getCreateOptions: x.noop,
        _getCreateEventData: x.noop,
        _create: x.noop,
        _init: x.noop,
        destroy: function () {
          this._destroy(),
            this.element
              .unbind(this.eventNamespace)
              .removeData(this.widgetFullName)
              .removeData(x.camelCase(this.widgetFullName)),
            this.widget()
              .unbind(this.eventNamespace)
              .removeAttr("aria-disabled")
              .removeClass(this.widgetFullName + "-disabled ui-state-disabled"),
            this.bindings.unbind(this.eventNamespace),
            this.hoverable.removeClass("ui-state-hover"),
            this.focusable.removeClass("ui-state-focus");
        },
        _destroy: x.noop,
        widget: function () {
          return this.element;
        },
        option: function (t, e) {
          var i,
            s,
            n,
            o = t;
          if (0 === arguments.length) return x.widget.extend({}, this.options);
          if ("string" == typeof t)
            if (((o = {}), (t = (i = t.split(".")).shift()), i.length)) {
              for (
                s = o[t] = x.widget.extend({}, this.options[t]), n = 0;
                n < i.length - 1;
                n++
              )
                (s[i[n]] = s[i[n]] || {}), (s = s[i[n]]);
              if (((t = i.pop()), 1 === arguments.length))
                return void 0 === s[t] ? null : s[t];
              s[t] = e;
            } else {
              if (1 === arguments.length)
                return void 0 === this.options[t] ? null : this.options[t];
              o[t] = e;
            }
          return this._setOptions(o), this;
        },
        _setOptions: function (t) {
          for (var e in t) this._setOption(e, t[e]);
          return this;
        },
        _setOption: function (t, e) {
          return (
            (this.options[t] = e),
            "disabled" === t &&
              (this.widget().toggleClass(
                this.widgetFullName + "-disabled",
                !!e
              ),
              e &&
                (this.hoverable.removeClass("ui-state-hover"),
                this.focusable.removeClass("ui-state-focus"))),
            this
          );
        },
        enable: function () {
          return this._setOptions({ disabled: !1 });
        },
        disable: function () {
          return this._setOptions({ disabled: !0 });
        },
        _on: function (n, o, t) {
          var a,
            r = this;
          "boolean" != typeof n && ((t = o), (o = n), (n = !1)),
            t
              ? ((o = a = x(o)), (this.bindings = this.bindings.add(o)))
              : ((t = o), (o = this.element), (a = this.widget())),
            x.each(t, function (t, e) {
              function i() {
                if (
                  n ||
                  (!0 !== r.options.disabled &&
                    !x(this).hasClass("ui-state-disabled"))
                )
                  return ("string" == typeof e ? r[e] : e).apply(r, arguments);
              }
              "string" != typeof e &&
                (i.guid = e.guid = e.guid || i.guid || x.guid++);
              var t = t.match(/^([\w:-]*)\s*(.*)$/),
                s = t[1] + r.eventNamespace,
                t = t[2];
              t ? a.delegate(t, s, i) : o.bind(s, i);
            });
        },
        _off: function (t, e) {
          (e =
            (e || "").split(" ").join(this.eventNamespace + " ") +
            this.eventNamespace),
            t.unbind(e).undelegate(e),
            (this.bindings = x(this.bindings.not(t).get())),
            (this.focusable = x(this.focusable.not(t).get())),
            (this.hoverable = x(this.hoverable.not(t).get()));
        },
        _delay: function (t, e) {
          var i = this;
          return setTimeout(function () {
            return ("string" == typeof t ? i[t] : t).apply(i, arguments);
          }, e || 0);
        },
        _hoverable: function (t) {
          (this.hoverable = this.hoverable.add(t)),
            this._on(t, {
              mouseenter: function (t) {
                x(t.currentTarget).addClass("ui-state-hover");
              },
              mouseleave: function (t) {
                x(t.currentTarget).removeClass("ui-state-hover");
              },
            });
        },
        _focusable: function (t) {
          (this.focusable = this.focusable.add(t)),
            this._on(t, {
              focusin: function (t) {
                x(t.currentTarget).addClass("ui-state-focus");
              },
              focusout: function (t) {
                x(t.currentTarget).removeClass("ui-state-focus");
              },
            });
        },
        _trigger: function (t, e, i) {
          var s,
            n,
            o = this.options[t];
          if (
            ((i = i || {}),
            ((e = x.Event(e)).type = (
              t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t
            ).toLowerCase()),
            (e.target = this.element[0]),
            (n = e.originalEvent))
          )
            for (s in n) s in e || (e[s] = n[s]);
          return (
            this.element.trigger(e, i),
            !(
              (x.isFunction(o) &&
                !1 === o.apply(this.element[0], [e].concat(i))) ||
              e.isDefaultPrevented()
            )
          );
        },
      }),
      x.each({ show: "fadeIn", hide: "fadeOut" }, function (o, a) {
        x.Widget.prototype["_" + o] = function (e, t, i) {
          var s = (t = "string" == typeof t ? { effect: t } : t)
              ? (!0 !== t && "number" != typeof t && t.effect) || a
              : o,
            n = !x.isEmptyObject(
              (t = "number" == typeof (t = t || {}) ? { duration: t } : t)
            );
          (t.complete = i),
            t.delay && e.delay(t.delay),
            n && x.effects && x.effects.effect[s]
              ? e[o](t)
              : s !== o && e[s]
              ? e[s](t.duration, t.easing, i)
              : e.queue(function (t) {
                  x(this)[o](), i && i.call(e[0]), t();
                });
        };
      }),
      x.widget,
      !1);
  x(document).mouseup(function () {
    r = !1;
  }),
    x.widget("ui.mouse", {
      version: "1.11.4",
      options: {
        cancel: "input,textarea,button,select,option",
        distance: 1,
        delay: 0,
      },
      _mouseInit: function () {
        var e = this;
        this.element
          .bind("mousedown." + this.widgetName, function (t) {
            return e._mouseDown(t);
          })
          .bind("click." + this.widgetName, function (t) {
            if (!0 === x.data(t.target, e.widgetName + ".preventClickEvent"))
              return (
                x.removeData(t.target, e.widgetName + ".preventClickEvent"),
                t.stopImmediatePropagation(),
                !1
              );
          }),
          (this.started = !1);
      },
      _mouseDestroy: function () {
        this.element.unbind("." + this.widgetName),
          this._mouseMoveDelegate &&
            this.document
              .unbind("mousemove." + this.widgetName, this._mouseMoveDelegate)
              .unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
      },
      _mouseDown: function (t) {
        var e, i, s;
        if (!r)
          return (
            (this._mouseMoved = !1),
            this._mouseStarted && this._mouseUp(t),
            (i = 1 === (this._mouseDownEvent = t).which),
            (s =
              !(
                "string" != typeof (e = this).options.cancel ||
                !t.target.nodeName
              ) && x(t.target).closest(this.options.cancel).length),
            i &&
              !s &&
              this._mouseCapture(t) &&
              ((this.mouseDelayMet = !this.options.delay),
              this.mouseDelayMet ||
                (this._mouseDelayTimer = setTimeout(function () {
                  e.mouseDelayMet = !0;
                }, this.options.delay)),
              this._mouseDistanceMet(t) &&
              this._mouseDelayMet(t) &&
              ((this._mouseStarted = !1 !== this._mouseStart(t)),
              !this._mouseStarted)
                ? t.preventDefault()
                : (!0 ===
                    x.data(t.target, this.widgetName + ".preventClickEvent") &&
                    x.removeData(
                      t.target,
                      this.widgetName + ".preventClickEvent"
                    ),
                  (this._mouseMoveDelegate = function (t) {
                    return e._mouseMove(t);
                  }),
                  (this._mouseUpDelegate = function (t) {
                    return e._mouseUp(t);
                  }),
                  this.document
                    .bind(
                      "mousemove." + this.widgetName,
                      this._mouseMoveDelegate
                    )
                    .bind("mouseup." + this.widgetName, this._mouseUpDelegate),
                  t.preventDefault(),
                  (r = !0))),
            !0
          );
      },
      _mouseMove: function (t) {
        if (this._mouseMoved) {
          if (
            x.ui.ie &&
            (!document.documentMode || document.documentMode < 9) &&
            !t.button
          )
            return this._mouseUp(t);
          if (!t.which) return this._mouseUp(t);
        }
        return (
          (t.which || t.button) && (this._mouseMoved = !0),
          this._mouseStarted
            ? (this._mouseDrag(t), t.preventDefault())
            : (this._mouseDistanceMet(t) &&
                this._mouseDelayMet(t) &&
                ((this._mouseStarted =
                  !1 !== this._mouseStart(this._mouseDownEvent, t)),
                this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)),
              !this._mouseStarted)
        );
      },
      _mouseUp: function (t) {
        return (
          this.document
            .unbind("mousemove." + this.widgetName, this._mouseMoveDelegate)
            .unbind("mouseup." + this.widgetName, this._mouseUpDelegate),
          this._mouseStarted &&
            ((this._mouseStarted = !1),
            t.target === this._mouseDownEvent.target &&
              x.data(t.target, this.widgetName + ".preventClickEvent", !0),
            this._mouseStop(t)),
          (r = !1)
        );
      },
      _mouseDistanceMet: function (t) {
        return (
          Math.max(
            Math.abs(this._mouseDownEvent.pageX - t.pageX),
            Math.abs(this._mouseDownEvent.pageY - t.pageY)
          ) >= this.options.distance
        );
      },
      _mouseDelayMet: function () {
        return this.mouseDelayMet;
      },
      _mouseStart: function () {},
      _mouseDrag: function () {},
      _mouseStop: function () {},
      _mouseCapture: function () {
        return !0;
      },
    });
  x.ui = x.ui || {};
  var h,
    F,
    k = Math.max,
    C = Math.abs,
    R = Math.round,
    L = /left|center|right/,
    Y = /top|center|bottom/,
    B = /[\+\-]\d+(\.[\d]+)?%?/,
    j = /^\w+/,
    q = /%$/,
    K = x.fn.position;
  function U(t, e, i) {
    return [
      parseFloat(t[0]) * (q.test(t[0]) ? e / 100 : 1),
      parseFloat(t[1]) * (q.test(t[1]) ? i / 100 : 1),
    ];
  }
  function D(t, e) {
    return parseInt(x.css(t, e), 10) || 0;
  }
  (x.position = {
    scrollbarWidth: function () {
      var t, e, i;
      return void 0 !== h
        ? h
        : ((i = (e = x(
            "<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"
          )).children()[0]),
          x("body").append(e),
          (t = i.offsetWidth),
          e.css("overflow", "scroll"),
          t === (i = i.offsetWidth) && (i = e[0].clientWidth),
          e.remove(),
          (h = t - i));
    },
    getScrollInfo: function (t) {
      var e = t.isWindow || t.isDocument ? "" : t.element.css("overflow-x"),
        i = t.isWindow || t.isDocument ? "" : t.element.css("overflow-y"),
        e =
          "scroll" === e ||
          ("auto" === e && t.width < t.element[0].scrollWidth);
      return {
        width:
          "scroll" === i ||
          ("auto" === i && t.height < t.element[0].scrollHeight)
            ? x.position.scrollbarWidth()
            : 0,
        height: e ? x.position.scrollbarWidth() : 0,
      };
    },
    getWithinInfo: function (t) {
      var t = x(t || window),
        e = x.isWindow(t[0]),
        i = !!t[0] && 9 === t[0].nodeType;
      return {
        element: t,
        isWindow: e,
        isDocument: i,
        offset: t.offset() || { left: 0, top: 0 },
        scrollLeft: t.scrollLeft(),
        scrollTop: t.scrollTop(),
        width: e || i ? t.width() : t.outerWidth(),
        height: e || i ? t.height() : t.outerHeight(),
      };
    },
  }),
    (x.fn.position = function (u) {
      if (!u || !u.of) return K.apply(this, arguments);
      u = x.extend({}, u);
      var d,
        p,
        f,
        m,
        g,
        t,
        v = x(u.of),
        _ = x.position.getWithinInfo(u.within),
        b = x.position.getScrollInfo(_),
        y = (u.collision || "flip").split(" "),
        w = {},
        e =
          9 === (e = (t = v)[0]).nodeType
            ? {
                width: t.width(),
                height: t.height(),
                offset: { top: 0, left: 0 },
              }
            : x.isWindow(e)
            ? {
                width: t.width(),
                height: t.height(),
                offset: { top: t.scrollTop(), left: t.scrollLeft() },
              }
            : e.preventDefault
            ? { width: 0, height: 0, offset: { top: e.pageY, left: e.pageX } }
            : {
                width: t.outerWidth(),
                height: t.outerHeight(),
                offset: t.offset(),
              };
      return (
        v[0].preventDefault && (u.at = "left top"),
        (p = e.width),
        (f = e.height),
        (g = x.extend({}, (m = e.offset))),
        x.each(["my", "at"], function () {
          var t,
            e,
            i = (u[this] || "").split(" ");
          ((i =
            1 === i.length
              ? L.test(i[0])
                ? i.concat(["center"])
                : Y.test(i[0])
                ? ["center"].concat(i)
                : ["center", "center"]
              : i)[0] = L.test(i[0]) ? i[0] : "center"),
            (i[1] = Y.test(i[1]) ? i[1] : "center"),
            (t = B.exec(i[0])),
            (e = B.exec(i[1])),
            (w[this] = [t ? t[0] : 0, e ? e[0] : 0]),
            (u[this] = [j.exec(i[0])[0], j.exec(i[1])[0]]);
        }),
        1 === y.length && (y[1] = y[0]),
        "right" === u.at[0]
          ? (g.left += p)
          : "center" === u.at[0] && (g.left += p / 2),
        "bottom" === u.at[1]
          ? (g.top += f)
          : "center" === u.at[1] && (g.top += f / 2),
        (d = U(w.at, p, f)),
        (g.left += d[0]),
        (g.top += d[1]),
        this.each(function () {
          var i,
            t,
            a = x(this),
            r = a.outerWidth(),
            h = a.outerHeight(),
            e = D(this, "marginLeft"),
            s = D(this, "marginTop"),
            n = r + e + D(this, "marginRight") + b.width,
            o = h + s + D(this, "marginBottom") + b.height,
            l = x.extend({}, g),
            c = U(w.my, a.outerWidth(), a.outerHeight());
          "right" === u.my[0]
            ? (l.left -= r)
            : "center" === u.my[0] && (l.left -= r / 2),
            "bottom" === u.my[1]
              ? (l.top -= h)
              : "center" === u.my[1] && (l.top -= h / 2),
            (l.left += c[0]),
            (l.top += c[1]),
            F || ((l.left = R(l.left)), (l.top = R(l.top))),
            (i = { marginLeft: e, marginTop: s }),
            x.each(["left", "top"], function (t, e) {
              x.ui.position[y[t]] &&
                x.ui.position[y[t]][e](l, {
                  targetWidth: p,
                  targetHeight: f,
                  elemWidth: r,
                  elemHeight: h,
                  collisionPosition: i,
                  collisionWidth: n,
                  collisionHeight: o,
                  offset: [d[0] + c[0], d[1] + c[1]],
                  my: u.my,
                  at: u.at,
                  within: _,
                  elem: a,
                });
            }),
            u.using &&
              (t = function (t) {
                var e = m.left - l.left,
                  i = e + p - r,
                  s = m.top - l.top,
                  n = s + f - h,
                  o = {
                    target: {
                      element: v,
                      left: m.left,
                      top: m.top,
                      width: p,
                      height: f,
                    },
                    element: {
                      element: a,
                      left: l.left,
                      top: l.top,
                      width: r,
                      height: h,
                    },
                    horizontal: i < 0 ? "left" : 0 < e ? "right" : "center",
                    vertical: n < 0 ? "top" : 0 < s ? "bottom" : "middle",
                  };
                p < r && C(e + i) < p && (o.horizontal = "center"),
                  f < h && C(s + n) < f && (o.vertical = "middle"),
                  k(C(e), C(i)) > k(C(s), C(n))
                    ? (o.important = "horizontal")
                    : (o.important = "vertical"),
                  u.using.call(this, t, o);
              }),
            a.offset(x.extend(l, { using: t }));
        })
      );
    }),
    (x.ui.position = {
      fit: {
        left: function (t, e) {
          var i,
            s = e.within,
            n = s.isWindow ? s.scrollLeft : s.offset.left,
            s = s.width,
            o = t.left - e.collisionPosition.marginLeft,
            a = n - o,
            r = o + e.collisionWidth - s - n;
          e.collisionWidth > s
            ? 0 < a && r <= 0
              ? ((i = t.left + a + e.collisionWidth - s - n), (t.left += a - i))
              : (t.left =
                  !(0 < r && a <= 0) && r < a ? n + s - e.collisionWidth : n)
            : 0 < a
            ? (t.left += a)
            : 0 < r
            ? (t.left -= r)
            : (t.left = k(t.left - o, t.left));
        },
        top: function (t, e) {
          var i,
            s = e.within,
            s = s.isWindow ? s.scrollTop : s.offset.top,
            n = e.within.height,
            o = t.top - e.collisionPosition.marginTop,
            a = s - o,
            r = o + e.collisionHeight - n - s;
          e.collisionHeight > n
            ? 0 < a && r <= 0
              ? ((i = t.top + a + e.collisionHeight - n - s), (t.top += a - i))
              : (t.top =
                  !(0 < r && a <= 0) && r < a ? s + n - e.collisionHeight : s)
            : 0 < a
            ? (t.top += a)
            : 0 < r
            ? (t.top -= r)
            : (t.top = k(t.top - o, t.top));
        },
      },
      flip: {
        left: function (t, e) {
          var i = e.within,
            s = i.offset.left + i.scrollLeft,
            n = i.width,
            i = i.isWindow ? i.scrollLeft : i.offset.left,
            o = t.left - e.collisionPosition.marginLeft,
            a = o - i,
            o = o + e.collisionWidth - n - i,
            r =
              "left" === e.my[0]
                ? -e.elemWidth
                : "right" === e.my[0]
                ? e.elemWidth
                : 0,
            h =
              "left" === e.at[0]
                ? e.targetWidth
                : "right" === e.at[0]
                ? -e.targetWidth
                : 0,
            l = -2 * e.offset[0];
          a < 0
            ? ((n = t.left + r + h + l + e.collisionWidth - n - s) < 0 ||
                n < C(a)) &&
              (t.left += r + h + l)
            : 0 < o &&
              (0 <
                (s = t.left - e.collisionPosition.marginLeft + r + h + l - i) ||
                C(s) < o) &&
              (t.left += r + h + l);
        },
        top: function (t, e) {
          var i = e.within,
            s = i.offset.top + i.scrollTop,
            n = i.height,
            i = i.isWindow ? i.scrollTop : i.offset.top,
            o = t.top - e.collisionPosition.marginTop,
            a = o - i,
            o = o + e.collisionHeight - n - i,
            r =
              "top" === e.my[1]
                ? -e.elemHeight
                : "bottom" === e.my[1]
                ? e.elemHeight
                : 0,
            h =
              "top" === e.at[1]
                ? e.targetHeight
                : "bottom" === e.at[1]
                ? -e.targetHeight
                : 0,
            l = -2 * e.offset[1];
          a < 0
            ? ((n = t.top + r + h + l + e.collisionHeight - n - s) < 0 ||
                n < C(a)) &&
              (t.top += r + h + l)
            : 0 < o &&
              (0 <
                (s = t.top - e.collisionPosition.marginTop + r + h + l - i) ||
                C(s) < o) &&
              (t.top += r + h + l);
        },
      },
      flipfit: {
        left: function () {
          x.ui.position.flip.left.apply(this, arguments),
            x.ui.position.fit.left.apply(this, arguments);
        },
        top: function () {
          x.ui.position.flip.top.apply(this, arguments),
            x.ui.position.fit.top.apply(this, arguments);
        },
      },
    });
  var l,
    c = document.getElementsByTagName("body")[0],
    u = document.createElement("div"),
    d = document.createElement(c ? "div" : "body"),
    p = {
      visibility: "hidden",
      width: 0,
      height: 0,
      border: 0,
      margin: 0,
      background: "none",
    };
  for (l in (c &&
    x.extend(p, { position: "absolute", left: "-1000px", top: "-1000px" }),
  p))
    d.style[l] = p[l];
  d.appendChild(u),
    (c = c || document.documentElement).insertBefore(d, c.firstChild),
    (u.style.cssText = "position: absolute; left: 10.7432222px;"),
    (u = x(u).offset().left),
    (F = 10 < u && u < 11),
    (d.innerHTML = ""),
    c.removeChild(d);
  x.ui.position,
    x.widget("ui.accordion", {
      version: "1.11.4",
      options: {
        active: 0,
        animate: {},
        collapsible: !1,
        event: "click",
        header: "> li > :first-child,> :not(li):even",
        heightStyle: "auto",
        icons: {
          activeHeader: "ui-icon-triangle-1-s",
          header: "ui-icon-triangle-1-e",
        },
        activate: null,
        beforeActivate: null,
      },
      hideProps: {
        borderTopWidth: "hide",
        borderBottomWidth: "hide",
        paddingTop: "hide",
        paddingBottom: "hide",
        height: "hide",
      },
      showProps: {
        borderTopWidth: "show",
        borderBottomWidth: "show",
        paddingTop: "show",
        paddingBottom: "show",
        height: "show",
      },
      _create: function () {
        var t = this.options;
        (this.prevShow = this.prevHide = x()),
          this.element
            .addClass("ui-accordion ui-widget ui-helper-reset")
            .attr("role", "tablist"),
          t.collapsible ||
            (!1 !== t.active && null != t.active) ||
            (t.active = 0),
          this._processPanels(),
          t.active < 0 && (t.active += this.headers.length),
          this._refresh();
      },
      _getCreateEventData: function () {
        return {
          header: this.active,
          panel: this.active.length ? this.active.next() : x(),
        };
      },
      _createIcons: function () {
        var t = this.options.icons;
        t &&
          (x("<span>")
            .addClass("ui-accordion-header-icon ui-icon " + t.header)
            .prependTo(this.headers),
          this.active
            .children(".ui-accordion-header-icon")
            .removeClass(t.header)
            .addClass(t.activeHeader),
          this.headers.addClass("ui-accordion-icons"));
      },
      _destroyIcons: function () {
        this.headers
          .removeClass("ui-accordion-icons")
          .children(".ui-accordion-header-icon")
          .remove();
      },
      _destroy: function () {
        var t;
        this.element
          .removeClass("ui-accordion ui-widget ui-helper-reset")
          .removeAttr("role"),
          this.headers
            .removeClass(
              "ui-accordion-header ui-accordion-header-active ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top"
            )
            .removeAttr("role")
            .removeAttr("aria-expanded")
            .removeAttr("aria-selected")
            .removeAttr("aria-controls")
            .removeAttr("tabIndex")
            .removeUniqueId(),
          this._destroyIcons(),
          (t = this.headers
            .next()
            .removeClass(
              "ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled"
            )
            .css("display", "")
            .removeAttr("role")
            .removeAttr("aria-hidden")
            .removeAttr("aria-labelledby")
            .removeUniqueId()),
          "content" !== this.options.heightStyle && t.css("height", "");
      },
      _setOption: function (t, e) {
        "active" === t
          ? this._activate(e)
          : ("event" === t &&
              (this.options.event &&
                this._off(this.headers, this.options.event),
              this._setupEvents(e)),
            this._super(t, e),
            "collapsible" !== t ||
              e ||
              !1 !== this.options.active ||
              this._activate(0),
            "icons" === t && (this._destroyIcons(), e && this._createIcons()),
            "disabled" === t &&
              (this.element
                .toggleClass("ui-state-disabled", !!e)
                .attr("aria-disabled", e),
              this.headers
                .add(this.headers.next())
                .toggleClass("ui-state-disabled", !!e)));
      },
      _keydown: function (t) {
        if (!t.altKey && !t.ctrlKey) {
          var e = x.ui.keyCode,
            i = this.headers.length,
            s = this.headers.index(t.target),
            n = !1;
          switch (t.keyCode) {
            case e.RIGHT:
            case e.DOWN:
              n = this.headers[(s + 1) % i];
              break;
            case e.LEFT:
            case e.UP:
              n = this.headers[(s - 1 + i) % i];
              break;
            case e.SPACE:
            case e.ENTER:
              this._eventHandler(t);
              break;
            case e.HOME:
              n = this.headers[0];
              break;
            case e.END:
              n = this.headers[i - 1];
          }
          n &&
            (x(t.target).attr("tabIndex", -1),
            x(n).attr("tabIndex", 0),
            n.focus(),
            t.preventDefault());
        }
      },
      _panelKeyDown: function (t) {
        t.keyCode === x.ui.keyCode.UP &&
          t.ctrlKey &&
          x(t.currentTarget).prev().focus();
      },
      refresh: function () {
        var t = this.options;
        this._processPanels(),
          (!1 === t.active && !0 === t.collapsible) || !this.headers.length
            ? ((t.active = !1), (this.active = x()))
            : !1 === t.active
            ? this._activate(0)
            : this.active.length && !x.contains(this.element[0], this.active[0])
            ? this.headers.length ===
              this.headers.find(".ui-state-disabled").length
              ? ((t.active = !1), (this.active = x()))
              : this._activate(Math.max(0, t.active - 1))
            : (t.active = this.headers.index(this.active)),
          this._destroyIcons(),
          this._refresh();
      },
      _processPanels: function () {
        var t = this.headers,
          e = this.panels;
        (this.headers = this.element
          .find(this.options.header)
          .addClass("ui-accordion-header ui-state-default ui-corner-all")),
          (this.panels = this.headers
            .next()
            .addClass(
              "ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom"
            )
            .filter(":not(.ui-accordion-content-active)")
            .hide()),
          e && (this._off(t.not(this.headers)), this._off(e.not(this.panels)));
      },
      _refresh: function () {
        var i,
          t = this.options,
          e = t.heightStyle,
          s = this.element.parent();
        (this.active = this._findActive(t.active)
          .addClass("ui-accordion-header-active ui-state-active ui-corner-top")
          .removeClass("ui-corner-all")),
          this.active.next().addClass("ui-accordion-content-active").show(),
          this.headers
            .attr("role", "tab")
            .each(function () {
              var t = x(this),
                e = t.uniqueId().attr("id"),
                i = t.next(),
                s = i.uniqueId().attr("id");
              t.attr("aria-controls", s), i.attr("aria-labelledby", e);
            })
            .next()
            .attr("role", "tabpanel"),
          this.headers
            .not(this.active)
            .attr({
              "aria-selected": "false",
              "aria-expanded": "false",
              tabIndex: -1,
            })
            .next()
            .attr({ "aria-hidden": "true" })
            .hide(),
          this.active.length
            ? this.active
                .attr({
                  "aria-selected": "true",
                  "aria-expanded": "true",
                  tabIndex: 0,
                })
                .next()
                .attr({ "aria-hidden": "false" })
            : this.headers.eq(0).attr("tabIndex", 0),
          this._createIcons(),
          this._setupEvents(t.event),
          "fill" === e
            ? ((i = s.height()),
              this.element.siblings(":visible").each(function () {
                var t = x(this),
                  e = t.css("position");
                "absolute" !== e && "fixed" !== e && (i -= t.outerHeight(!0));
              }),
              this.headers.each(function () {
                i -= x(this).outerHeight(!0);
              }),
              this.headers
                .next()
                .each(function () {
                  x(this).height(
                    Math.max(0, i - x(this).innerHeight() + x(this).height())
                  );
                })
                .css("overflow", "auto"))
            : "auto" === e &&
              ((i = 0),
              this.headers
                .next()
                .each(function () {
                  i = Math.max(i, x(this).css("height", "").height());
                })
                .height(i));
      },
      _activate: function (t) {
        t = this._findActive(t)[0];
        t !== this.active[0] &&
          ((t = t || this.active[0]),
          this._eventHandler({
            target: t,
            currentTarget: t,
            preventDefault: x.noop,
          }));
      },
      _findActive: function (t) {
        return "number" == typeof t ? this.headers.eq(t) : x();
      },
      _setupEvents: function (t) {
        var i = { keydown: "_keydown" };
        t &&
          x.each(t.split(" "), function (t, e) {
            i[e] = "_eventHandler";
          }),
          this._off(this.headers.add(this.headers.next())),
          this._on(this.headers, i),
          this._on(this.headers.next(), { keydown: "_panelKeyDown" }),
          this._hoverable(this.headers),
          this._focusable(this.headers);
      },
      _eventHandler: function (t) {
        var e = this.options,
          i = this.active,
          s = x(t.currentTarget),
          n = s[0] === i[0],
          o = n && e.collapsible,
          a = o ? x() : s.next(),
          r = i.next(),
          r = {
            oldHeader: i,
            oldPanel: r,
            newHeader: o ? x() : s,
            newPanel: a,
          };
        t.preventDefault(),
          (n && !e.collapsible) ||
            !1 === this._trigger("beforeActivate", t, r) ||
            ((e.active = !o && this.headers.index(s)),
            (this.active = n ? x() : s),
            this._toggle(r),
            i.removeClass("ui-accordion-header-active ui-state-active"),
            e.icons &&
              i
                .children(".ui-accordion-header-icon")
                .removeClass(e.icons.activeHeader)
                .addClass(e.icons.header),
            n ||
              (s
                .removeClass("ui-corner-all")
                .addClass(
                  "ui-accordion-header-active ui-state-active ui-corner-top"
                ),
              e.icons &&
                s
                  .children(".ui-accordion-header-icon")
                  .removeClass(e.icons.header)
                  .addClass(e.icons.activeHeader),
              s.next().addClass("ui-accordion-content-active")));
      },
      _toggle: function (t) {
        var e = t.newPanel,
          i = this.prevShow.length ? this.prevShow : t.oldPanel;
        this.prevShow.add(this.prevHide).stop(!0, !0),
          (this.prevShow = e),
          (this.prevHide = i),
          this.options.animate
            ? this._animate(e, i, t)
            : (i.hide(), e.show(), this._toggleComplete(t)),
          i.attr({ "aria-hidden": "true" }),
          i.prev().attr({ "aria-selected": "false", "aria-expanded": "false" }),
          e.length && i.length
            ? i.prev().attr({ tabIndex: -1, "aria-expanded": "false" })
            : e.length &&
              this.headers
                .filter(function () {
                  return 0 === parseInt(x(this).attr("tabIndex"), 10);
                })
                .attr("tabIndex", -1),
          e
            .attr("aria-hidden", "false")
            .prev()
            .attr({
              "aria-selected": "true",
              "aria-expanded": "true",
              tabIndex: 0,
            });
      },
      _animate: function (t, i, e) {
        function s() {
          o._toggleComplete(e);
        }
        var n,
          o = this,
          a = 0,
          r = t.css("box-sizing"),
          h = t.length && (!i.length || t.index() < i.index()),
          l = this.options.animate || {},
          h = (h && l.down) || l,
          c = (c = "string" == typeof h ? h : c) || h.easing || l.easing,
          u = (u = "number" == typeof h ? h : u) || h.duration || l.duration;
        return i.length
          ? t.length
            ? ((n = t.show().outerHeight()),
              i.animate(this.hideProps, {
                duration: u,
                easing: c,
                step: function (t, e) {
                  e.now = Math.round(t);
                },
              }),
              void t.hide().animate(this.showProps, {
                duration: u,
                easing: c,
                complete: s,
                step: function (t, e) {
                  (e.now = Math.round(t)),
                    "height" !== e.prop
                      ? "content-box" === r && (a += e.now)
                      : "content" !== o.options.heightStyle &&
                        ((e.now = Math.round(n - i.outerHeight() - a)),
                        (a = 0));
                },
              }))
            : i.animate(this.hideProps, u, c, s)
          : t.animate(this.showProps, u, c, s);
      },
      _toggleComplete: function (t) {
        var e = t.oldPanel;
        e
          .removeClass("ui-accordion-content-active")
          .prev()
          .removeClass("ui-corner-top")
          .addClass("ui-corner-all"),
          e.length && (e.parent()[0].className = e.parent()[0].className),
          this._trigger("activate", null, t);
      },
    }),
    x.widget("ui.menu", {
      version: "1.11.4",
      defaultElement: "<ul>",
      delay: 300,
      options: {
        icons: { submenu: "ui-icon-carat-1-e" },
        items: "> *",
        menus: "ul",
        position: { my: "left-1 top", at: "right top" },
        role: "menu",
        blur: null,
        focus: null,
        select: null,
      },
      _create: function () {
        (this.activeMenu = this.element),
          (this.mouseHandled = !1),
          this.element
            .uniqueId()
            .addClass("ui-menu ui-widget ui-widget-content")
            .toggleClass(
              "ui-menu-icons",
              !!this.element.find(".ui-icon").length
            )
            .attr({ role: this.options.role, tabIndex: 0 }),
          this.options.disabled &&
            this.element
              .addClass("ui-state-disabled")
              .attr("aria-disabled", "true"),
          this._on({
            "mousedown .ui-menu-item": function (t) {
              t.preventDefault();
            },
            "click .ui-menu-item": function (t) {
              var e = x(t.target);
              !this.mouseHandled &&
                e.not(".ui-state-disabled").length &&
                (this.select(t),
                t.isPropagationStopped() || (this.mouseHandled = !0),
                e.has(".ui-menu").length
                  ? this.expand(t)
                  : !this.element.is(":focus") &&
                    x(this.document[0].activeElement).closest(".ui-menu")
                      .length &&
                    (this.element.trigger("focus", [!0]),
                    this.active &&
                      1 === this.active.parents(".ui-menu").length &&
                      clearTimeout(this.timer)));
            },
            "mouseenter .ui-menu-item": function (t) {
              var e;
              this.previousFilter ||
                ((e = x(t.currentTarget))
                  .siblings(".ui-state-active")
                  .removeClass("ui-state-active"),
                this.focus(t, e));
            },
            mouseleave: "collapseAll",
            "mouseleave .ui-menu": "collapseAll",
            focus: function (t, e) {
              var i =
                this.active || this.element.find(this.options.items).eq(0);
              e || this.focus(t, i);
            },
            blur: function (t) {
              this._delay(function () {
                x.contains(this.element[0], this.document[0].activeElement) ||
                  this.collapseAll(t);
              });
            },
            keydown: "_keydown",
          }),
          this.refresh(),
          this._on(this.document, {
            click: function (t) {
              this._closeOnDocumentClick(t) && this.collapseAll(t),
                (this.mouseHandled = !1);
            },
          });
      },
      _destroy: function () {
        this.element
          .removeAttr("aria-activedescendant")
          .find(".ui-menu")
          .addBack()
          .removeClass(
            "ui-menu ui-widget ui-widget-content ui-menu-icons ui-front"
          )
          .removeAttr("role")
          .removeAttr("tabIndex")
          .removeAttr("aria-labelledby")
          .removeAttr("aria-expanded")
          .removeAttr("aria-hidden")
          .removeAttr("aria-disabled")
          .removeUniqueId()
          .show(),
          this.element
            .find(".ui-menu-item")
            .removeClass("ui-menu-item")
            .removeAttr("role")
            .removeAttr("aria-disabled")
            .removeUniqueId()
            .removeClass("ui-state-hover")
            .removeAttr("tabIndex")
            .removeAttr("role")
            .removeAttr("aria-haspopup")
            .children()
            .each(function () {
              var t = x(this);
              t.data("ui-menu-submenu-carat") && t.remove();
            }),
          this.element
            .find(".ui-menu-divider")
            .removeClass("ui-menu-divider ui-widget-content");
      },
      _keydown: function (t) {
        var e,
          i,
          s,
          n = !0;
        switch (t.keyCode) {
          case x.ui.keyCode.PAGE_UP:
            this.previousPage(t);
            break;
          case x.ui.keyCode.PAGE_DOWN:
            this.nextPage(t);
            break;
          case x.ui.keyCode.HOME:
            this._move("first", "first", t);
            break;
          case x.ui.keyCode.END:
            this._move("last", "last", t);
            break;
          case x.ui.keyCode.UP:
            this.previous(t);
            break;
          case x.ui.keyCode.DOWN:
            this.next(t);
            break;
          case x.ui.keyCode.LEFT:
            this.collapse(t);
            break;
          case x.ui.keyCode.RIGHT:
            this.active &&
              !this.active.is(".ui-state-disabled") &&
              this.expand(t);
            break;
          case x.ui.keyCode.ENTER:
          case x.ui.keyCode.SPACE:
            this._activate(t);
            break;
          case x.ui.keyCode.ESCAPE:
            this.collapse(t);
            break;
          default:
            (n = !1),
              (e = this.previousFilter || ""),
              (i = String.fromCharCode(t.keyCode)),
              (s = !1),
              clearTimeout(this.filterTimer),
              i === e ? (s = !0) : (i = e + i),
              (e = this._filterMenuItems(i)),
              (e =
                s && -1 !== e.index(this.active.next())
                  ? this.active.nextAll(".ui-menu-item")
                  : e).length ||
                ((i = String.fromCharCode(t.keyCode)),
                (e = this._filterMenuItems(i))),
              e.length
                ? (this.focus(t, e),
                  (this.previousFilter = i),
                  (this.filterTimer = this._delay(function () {
                    delete this.previousFilter;
                  }, 1e3)))
                : delete this.previousFilter;
        }
        n && t.preventDefault();
      },
      _activate: function (t) {
        this.active.is(".ui-state-disabled") ||
          (this.active.is("[aria-haspopup='true']")
            ? this.expand(t)
            : this.select(t));
      },
      refresh: function () {
        var e = this,
          s = this.options.icons.submenu,
          t = this.element.find(this.options.menus);
        this.element.toggleClass(
          "ui-menu-icons",
          !!this.element.find(".ui-icon").length
        ),
          t
            .filter(":not(.ui-menu)")
            .addClass("ui-menu ui-widget ui-widget-content ui-front")
            .hide()
            .attr({
              role: this.options.role,
              "aria-hidden": "true",
              "aria-expanded": "false",
            })
            .each(function () {
              var t = x(this),
                e = t.parent(),
                i = x("<span>")
                  .addClass("ui-menu-icon ui-icon " + s)
                  .data("ui-menu-submenu-carat", !0);
              e.attr("aria-haspopup", "true").prepend(i),
                t.attr("aria-labelledby", e.attr("id"));
            }),
          (t = t.add(this.element).find(this.options.items))
            .not(".ui-menu-item")
            .each(function () {
              var t = x(this);
              e._isDivider(t) &&
                t.addClass("ui-widget-content ui-menu-divider");
            }),
          t
            .not(".ui-menu-item, .ui-menu-divider")
            .addClass("ui-menu-item")
            .uniqueId()
            .attr({ tabIndex: -1, role: this._itemRole() }),
          t.filter(".ui-state-disabled").attr("aria-disabled", "true"),
          this.active &&
            !x.contains(this.element[0], this.active[0]) &&
            this.blur();
      },
      _itemRole: function () {
        return { menu: "menuitem", listbox: "option" }[this.options.role];
      },
      _setOption: function (t, e) {
        "icons" === t &&
          this.element
            .find(".ui-menu-icon")
            .removeClass(this.options.icons.submenu)
            .addClass(e.submenu),
          "disabled" === t &&
            this.element
              .toggleClass("ui-state-disabled", !!e)
              .attr("aria-disabled", e),
          this._super(t, e);
      },
      focus: function (t, e) {
        var i;
        this.blur(t, t && "focus" === t.type),
          this._scrollIntoView(e),
          (this.active = e.first()),
          (i = this.active
            .addClass("ui-state-focus")
            .removeClass("ui-state-active")),
          this.options.role &&
            this.element.attr("aria-activedescendant", i.attr("id")),
          this.active
            .parent()
            .closest(".ui-menu-item")
            .addClass("ui-state-active"),
          t && "keydown" === t.type
            ? this._close()
            : (this.timer = this._delay(function () {
                this._close();
              }, this.delay)),
          (i = e.children(".ui-menu")).length &&
            t &&
            /^mouse/.test(t.type) &&
            this._startOpening(i),
          (this.activeMenu = e.parent()),
          this._trigger("focus", t, { item: e });
      },
      _scrollIntoView: function (t) {
        var e, i, s;
        this._hasScroll() &&
          ((e = parseFloat(x.css(this.activeMenu[0], "borderTopWidth")) || 0),
          (i = parseFloat(x.css(this.activeMenu[0], "paddingTop")) || 0),
          (e = t.offset().top - this.activeMenu.offset().top - e - i),
          (i = this.activeMenu.scrollTop()),
          (s = this.activeMenu.height()),
          (t = t.outerHeight()),
          e < 0
            ? this.activeMenu.scrollTop(i + e)
            : s < e + t && this.activeMenu.scrollTop(i + e - s + t));
      },
      blur: function (t, e) {
        e || clearTimeout(this.timer),
          this.active &&
            (this.active.removeClass("ui-state-focus"),
            (this.active = null),
            this._trigger("blur", t, { item: this.active }));
      },
      _startOpening: function (t) {
        clearTimeout(this.timer),
          "true" === t.attr("aria-hidden") &&
            (this.timer = this._delay(function () {
              this._close(), this._open(t);
            }, this.delay));
      },
      _open: function (t) {
        var e = x.extend({ of: this.active }, this.options.position);
        clearTimeout(this.timer),
          this.element
            .find(".ui-menu")
            .not(t.parents(".ui-menu"))
            .hide()
            .attr("aria-hidden", "true"),
          t
            .show()
            .removeAttr("aria-hidden")
            .attr("aria-expanded", "true")
            .position(e);
      },
      collapseAll: function (e, i) {
        clearTimeout(this.timer),
          (this.timer = this._delay(function () {
            var t = i
              ? this.element
              : x(e && e.target).closest(this.element.find(".ui-menu"));
            t.length || (t = this.element),
              this._close(t),
              this.blur(e),
              (this.activeMenu = t);
          }, this.delay));
      },
      _close: function (t) {
        (t = t || (this.active ? this.active.parent() : this.element))
          .find(".ui-menu")
          .hide()
          .attr("aria-hidden", "true")
          .attr("aria-expanded", "false")
          .end()
          .find(".ui-state-active")
          .not(".ui-state-focus")
          .removeClass("ui-state-active");
      },
      _closeOnDocumentClick: function (t) {
        return !x(t.target).closest(".ui-menu").length;
      },
      _isDivider: function (t) {
        return !/[^\-\u2014\u2013\s]/.test(t.text());
      },
      collapse: function (t) {
        var e =
          this.active &&
          this.active.parent().closest(".ui-menu-item", this.element);
        e && e.length && (this._close(), this.focus(t, e));
      },
      expand: function (t) {
        var e =
          this.active &&
          this.active.children(".ui-menu ").find(this.options.items).first();
        e &&
          e.length &&
          (this._open(e.parent()),
          this._delay(function () {
            this.focus(t, e);
          }));
      },
      next: function (t) {
        this._move("next", "first", t);
      },
      previous: function (t) {
        this._move("prev", "last", t);
      },
      isFirstItem: function () {
        return this.active && !this.active.prevAll(".ui-menu-item").length;
      },
      isLastItem: function () {
        return this.active && !this.active.nextAll(".ui-menu-item").length;
      },
      _move: function (t, e, i) {
        var s;
        ((s = this.active
          ? "first" === t || "last" === t
            ? this.active["first" === t ? "prevAll" : "nextAll"](
                ".ui-menu-item"
              ).eq(-1)
            : this.active[t + "All"](".ui-menu-item").eq(0)
          : s) &&
          s.length &&
          this.active) ||
          (s = this.activeMenu.find(this.options.items)[e]()),
          this.focus(i, s);
      },
      nextPage: function (t) {
        var e, i, s;
        this.active
          ? this.isLastItem() ||
            (this._hasScroll()
              ? ((i = this.active.offset().top),
                (s = this.element.height()),
                this.active.nextAll(".ui-menu-item").each(function () {
                  return (e = x(this)).offset().top - i - s < 0;
                }),
                this.focus(t, e))
              : this.focus(
                  t,
                  this.activeMenu
                    .find(this.options.items)
                    [this.active ? "last" : "first"]()
                ))
          : this.next(t);
      },
      previousPage: function (t) {
        var e, i, s;
        this.active
          ? this.isFirstItem() ||
            (this._hasScroll()
              ? ((i = this.active.offset().top),
                (s = this.element.height()),
                this.active.prevAll(".ui-menu-item").each(function () {
                  return 0 < (e = x(this)).offset().top - i + s;
                }),
                this.focus(t, e))
              : this.focus(t, this.activeMenu.find(this.options.items).first()))
          : this.next(t);
      },
      _hasScroll: function () {
        return this.element.outerHeight() < this.element.prop("scrollHeight");
      },
      select: function (t) {
        this.active = this.active || x(t.target).closest(".ui-menu-item");
        var e = { item: this.active };
        this.active.has(".ui-menu").length || this.collapseAll(t, !0),
          this._trigger("select", t, e);
      },
      _filterMenuItems: function (t) {
        var t = t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
          e = new RegExp("^" + t, "i");
        return this.activeMenu
          .find(this.options.items)
          .filter(".ui-menu-item")
          .filter(function () {
            return e.test(x.trim(x(this).text()));
          });
      },
    }),
    x.widget("ui.autocomplete", {
      version: "1.11.4",
      defaultElement: "<input>",
      options: {
        appendTo: null,
        autoFocus: !1,
        delay: 300,
        minLength: 1,
        position: { my: "left top", at: "left bottom", collision: "none" },
        source: null,
        change: null,
        close: null,
        focus: null,
        open: null,
        response: null,
        search: null,
        select: null,
      },
      requestIndex: 0,
      pending: 0,
      _create: function () {
        var i,
          s,
          n,
          t = this.element[0].nodeName.toLowerCase(),
          e = "textarea" === t,
          t = "input" === t;
        (this.isMultiLine =
          e || (!t && this.element.prop("isContentEditable"))),
          (this.valueMethod = this.element[e || t ? "val" : "text"]),
          (this.isNewMenu = !0),
          this.element
            .addClass("ui-autocomplete-input")
            .attr("autocomplete", "off"),
          this._on(this.element, {
            keydown: function (t) {
              if (this.element.prop("readOnly")) s = n = i = !0;
              else {
                s = n = i = !1;
                var e = x.ui.keyCode;
                switch (t.keyCode) {
                  case e.PAGE_UP:
                    (i = !0), this._move("previousPage", t);
                    break;
                  case e.PAGE_DOWN:
                    (i = !0), this._move("nextPage", t);
                    break;
                  case e.UP:
                    (i = !0), this._keyEvent("previous", t);
                    break;
                  case e.DOWN:
                    (i = !0), this._keyEvent("next", t);
                    break;
                  case e.ENTER:
                    this.menu.active &&
                      ((i = !0), t.preventDefault(), this.menu.select(t));
                    break;
                  case e.TAB:
                    this.menu.active && this.menu.select(t);
                    break;
                  case e.ESCAPE:
                    this.menu.element.is(":visible") &&
                      (this.isMultiLine || this._value(this.term),
                      this.close(t),
                      t.preventDefault());
                    break;
                  default:
                    (s = !0), this._searchTimeout(t);
                }
              }
            },
            keypress: function (t) {
              if (i)
                (i = !1),
                  (this.isMultiLine && !this.menu.element.is(":visible")) ||
                    t.preventDefault();
              else if (!s) {
                var e = x.ui.keyCode;
                switch (t.keyCode) {
                  case e.PAGE_UP:
                    this._move("previousPage", t);
                    break;
                  case e.PAGE_DOWN:
                    this._move("nextPage", t);
                    break;
                  case e.UP:
                    this._keyEvent("previous", t);
                    break;
                  case e.DOWN:
                    this._keyEvent("next", t);
                }
              }
            },
            input: function (t) {
              n ? ((n = !1), t.preventDefault()) : this._searchTimeout(t);
            },
            focus: function () {
              (this.selectedItem = null), (this.previous = this._value());
            },
            blur: function (t) {
              this.cancelBlur
                ? delete this.cancelBlur
                : (clearTimeout(this.searching),
                  this.close(t),
                  this._change(t));
            },
          }),
          this._initSource(),
          (this.menu = x("<ul>")
            .addClass("ui-autocomplete ui-front")
            .appendTo(this._appendTo())
            .menu({ role: null })
            .hide()
            .menu("instance")),
          this._on(this.menu.element, {
            mousedown: function (t) {
              t.preventDefault(),
                (this.cancelBlur = !0),
                this._delay(function () {
                  delete this.cancelBlur;
                });
              var i = this.menu.element[0];
              x(t.target).closest(".ui-menu-item").length ||
                this._delay(function () {
                  var e = this;
                  this.document.one("mousedown", function (t) {
                    t.target === e.element[0] ||
                      t.target === i ||
                      x.contains(i, t.target) ||
                      e.close();
                  });
                });
            },
            menufocus: function (t, e) {
              var i;
              this.isNewMenu &&
              ((this.isNewMenu = !1),
              t.originalEvent && /^mouse/.test(t.originalEvent.type))
                ? (this.menu.blur(),
                  this.document.one("mousemove", function () {
                    x(t.target).trigger(t.originalEvent);
                  }))
                : ((i = e.item.data("ui-autocomplete-item")),
                  !1 !== this._trigger("focus", t, { item: i }) &&
                    t.originalEvent &&
                    /^key/.test(t.originalEvent.type) &&
                    this._value(i.value),
                  (e = e.item.attr("aria-label") || i.value) &&
                    x.trim(e).length &&
                    (this.liveRegion.children().hide(),
                    x("<div>").text(e).appendTo(this.liveRegion)));
            },
            menuselect: function (t, e) {
              var i = e.item.data("ui-autocomplete-item"),
                s = this.previous;
              this.element[0] !== this.document[0].activeElement &&
                (this.element.focus(),
                (this.previous = s),
                this._delay(function () {
                  (this.previous = s), (this.selectedItem = i);
                })),
                !1 !== this._trigger("select", t, { item: i }) &&
                  this._value(i.value),
                (this.term = this._value()),
                this.close(t),
                (this.selectedItem = i);
            },
          }),
          (this.liveRegion = x("<span>", {
            role: "status",
            "aria-live": "assertive",
            "aria-relevant": "additions",
          })
            .addClass("ui-helper-hidden-accessible")
            .appendTo(this.document[0].body)),
          this._on(this.window, {
            beforeunload: function () {
              this.element.removeAttr("autocomplete");
            },
          });
      },
      _destroy: function () {
        clearTimeout(this.searching),
          this.element
            .removeClass("ui-autocomplete-input")
            .removeAttr("autocomplete"),
          this.menu.element.remove(),
          this.liveRegion.remove();
      },
      _setOption: function (t, e) {
        this._super(t, e),
          "source" === t && this._initSource(),
          "appendTo" === t && this.menu.element.appendTo(this._appendTo()),
          "disabled" === t && e && this.xhr && this.xhr.abort();
      },
      _appendTo: function () {
        var t = this.options.appendTo;
        return (t = (t =
          (t =
            t &&
            (t.jquery || t.nodeType ? x(t) : this.document.find(t).eq(0))) &&
          t[0]
            ? t
            : this.element.closest(".ui-front")).length
          ? t
          : this.document[0].body);
      },
      _initSource: function () {
        var i,
          s,
          n = this;
        x.isArray(this.options.source)
          ? ((i = this.options.source),
            (this.source = function (t, e) {
              e(x.ui.autocomplete.filter(i, t.term));
            }))
          : "string" == typeof this.options.source
          ? ((s = this.options.source),
            (this.source = function (t, e) {
              n.xhr && n.xhr.abort(),
                (n.xhr = x.ajax({
                  url: s,
                  data: t,
                  dataType: "json",
                  success: function (t) {
                    e(t);
                  },
                  error: function () {
                    e([]);
                  },
                }));
            }))
          : (this.source = this.options.source);
      },
      _searchTimeout: function (s) {
        clearTimeout(this.searching),
          (this.searching = this._delay(function () {
            var t = this.term === this._value(),
              e = this.menu.element.is(":visible"),
              i = s.altKey || s.ctrlKey || s.metaKey || s.shiftKey;
            (t && (e || i)) ||
              ((this.selectedItem = null), this.search(null, s));
          }, this.options.delay));
      },
      search: function (t, e) {
        return (
          (t = null != t ? t : this._value()),
          (this.term = this._value()),
          t.length < this.options.minLength
            ? this.close(e)
            : !1 !== this._trigger("search", e)
            ? this._search(t)
            : void 0
        );
      },
      _search: function (t) {
        this.pending++,
          this.element.addClass("ui-autocomplete-loading"),
          (this.cancelSearch = !1),
          this.source({ term: t }, this._response());
      },
      _response: function () {
        var e = ++this.requestIndex;
        return x.proxy(function (t) {
          e === this.requestIndex && this.__response(t),
            this.pending--,
            this.pending || this.element.removeClass("ui-autocomplete-loading");
        }, this);
      },
      __response: function (t) {
        (t = t && this._normalize(t)),
          this._trigger("response", null, { content: t }),
          !this.options.disabled && t && t.length && !this.cancelSearch
            ? (this._suggest(t), this._trigger("open"))
            : this._close();
      },
      close: function (t) {
        (this.cancelSearch = !0), this._close(t);
      },
      _close: function (t) {
        this.menu.element.is(":visible") &&
          (this.menu.element.hide(),
          this.menu.blur(),
          (this.isNewMenu = !0),
          this._trigger("close", t));
      },
      _change: function (t) {
        this.previous !== this._value() &&
          this._trigger("change", t, { item: this.selectedItem });
      },
      _normalize: function (t) {
        return t.length && t[0].label && t[0].value
          ? t
          : x.map(t, function (t) {
              return "string" == typeof t
                ? { label: t, value: t }
                : x.extend({}, t, {
                    label: t.label || t.value,
                    value: t.value || t.label,
                  });
            });
      },
      _suggest: function (t) {
        var e = this.menu.element.empty();
        this._renderMenu(e, t),
          (this.isNewMenu = !0),
          this.menu.refresh(),
          e.show(),
          this._resizeMenu(),
          e.position(x.extend({ of: this.element }, this.options.position)),
          this.options.autoFocus && this.menu.next();
      },
      _resizeMenu: function () {
        var t = this.menu.element;
        t.outerWidth(
          Math.max(t.width("").outerWidth() + 1, this.element.outerWidth())
        );
      },
      _renderMenu: function (i, t) {
        var s = this;
        x.each(t, function (t, e) {
          s._renderItemData(i, e);
        });
      },
      _renderItemData: function (t, e) {
        return this._renderItem(t, e).data("ui-autocomplete-item", e);
      },
      _renderItem: function (t, e) {
        return x("<li>").text(e.label).appendTo(t);
      },
      _move: function (t, e) {
        this.menu.element.is(":visible")
          ? (this.menu.isFirstItem() && /^previous/.test(t)) ||
            (this.menu.isLastItem() && /^next/.test(t))
            ? (this.isMultiLine || this._value(this.term), this.menu.blur())
            : this.menu[t](e)
          : this.search(null, e);
      },
      widget: function () {
        return this.menu.element;
      },
      _value: function () {
        return this.valueMethod.apply(this.element, arguments);
      },
      _keyEvent: function (t, e) {
        (this.isMultiLine && !this.menu.element.is(":visible")) ||
          (this._move(t, e), e.preventDefault());
      },
    }),
    x.extend(x.ui.autocomplete, {
      escapeRegex: function (t) {
        return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
      },
      filter: function (t, e) {
        var i = new RegExp(x.ui.autocomplete.escapeRegex(e), "i");
        return x.grep(t, function (t) {
          return i.test(t.label || t.value || t);
        });
      },
    }),
    x.widget("ui.autocomplete", x.ui.autocomplete, {
      options: {
        messages: {
          noResults: "No search results.",
          results: function (t) {
            return (
              t +
              (1 < t ? " results are" : " result is") +
              " available, use up and down arrow keys to navigate."
            );
          },
        },
      },
      __response: function (t) {
        var e;
        this._superApply(arguments),
          this.options.disabled ||
            this.cancelSearch ||
            ((e =
              t && t.length
                ? this.options.messages.results(t.length)
                : this.options.messages.noResults),
            this.liveRegion.children().hide(),
            x("<div>").text(e).appendTo(this.liveRegion));
      },
    }),
    x.ui.autocomplete;
  function V() {
    var t = x(this);
    setTimeout(function () {
      t.find(":ui-button").button("refresh");
    }, 1);
  }
  function X(t) {
    var e = t.name,
      i = t.form,
      s = x([]);
    return (
      e &&
        ((e = e.replace(/'/g, "\\'")),
        (s = i
          ? x(i).find("[name='" + e + "'][type=radio]")
          : x("[name='" + e + "'][type=radio]", t.ownerDocument).filter(
              function () {
                return !this.form;
              }
            ))),
      s
    );
  }
  var f,
    m,
    $ = "ui-button ui-widget ui-state-default ui-corner-all",
    G =
      "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only";
  x.widget("ui.button", {
    version: "1.11.4",
    defaultElement: "<button>",
    options: {
      disabled: null,
      text: !0,
      label: null,
      icons: { primary: null, secondary: null },
    },
    _create: function () {
      this.element
        .closest("form")
        .unbind("reset" + this.eventNamespace)
        .bind("reset" + this.eventNamespace, V),
        "boolean" != typeof this.options.disabled
          ? (this.options.disabled = !!this.element.prop("disabled"))
          : this.element.prop("disabled", this.options.disabled),
        this._determineButtonType(),
        (this.hasTitle = !!this.buttonElement.attr("title"));
      var e = this,
        i = this.options,
        t = "checkbox" === this.type || "radio" === this.type,
        s = t ? "" : "ui-state-active";
      null === i.label &&
        (i.label =
          "input" === this.type
            ? this.buttonElement.val()
            : this.buttonElement.html()),
        this._hoverable(this.buttonElement),
        this.buttonElement
          .addClass($)
          .attr("role", "button")
          .bind("mouseenter" + this.eventNamespace, function () {
            i.disabled || (this === f && x(this).addClass("ui-state-active"));
          })
          .bind("mouseleave" + this.eventNamespace, function () {
            i.disabled || x(this).removeClass(s);
          })
          .bind("click" + this.eventNamespace, function (t) {
            i.disabled && (t.preventDefault(), t.stopImmediatePropagation());
          }),
        this._on({
          focus: function () {
            this.buttonElement.addClass("ui-state-focus");
          },
          blur: function () {
            this.buttonElement.removeClass("ui-state-focus");
          },
        }),
        t &&
          this.element.bind("change" + this.eventNamespace, function () {
            e.refresh();
          }),
        "checkbox" === this.type
          ? this.buttonElement.bind("click" + this.eventNamespace, function () {
              if (i.disabled) return !1;
            })
          : "radio" === this.type
          ? this.buttonElement.bind("click" + this.eventNamespace, function () {
              if (i.disabled) return !1;
              x(this).addClass("ui-state-active"),
                e.buttonElement.attr("aria-pressed", "true");
              var t = e.element[0];
              X(t)
                .not(t)
                .map(function () {
                  return x(this).button("widget")[0];
                })
                .removeClass("ui-state-active")
                .attr("aria-pressed", "false");
            })
          : (this.buttonElement
              .bind("mousedown" + this.eventNamespace, function () {
                if (i.disabled) return !1;
                x(this).addClass("ui-state-active"),
                  (f = this),
                  e.document.one("mouseup", function () {
                    f = null;
                  });
              })
              .bind("mouseup" + this.eventNamespace, function () {
                if (i.disabled) return !1;
                x(this).removeClass("ui-state-active");
              })
              .bind("keydown" + this.eventNamespace, function (t) {
                if (i.disabled) return !1;
                (t.keyCode !== x.ui.keyCode.SPACE &&
                  t.keyCode !== x.ui.keyCode.ENTER) ||
                  x(this).addClass("ui-state-active");
              })
              .bind(
                "keyup" + this.eventNamespace + " blur" + this.eventNamespace,
                function () {
                  x(this).removeClass("ui-state-active");
                }
              ),
            this.buttonElement.is("a") &&
              this.buttonElement.keyup(function (t) {
                t.keyCode === x.ui.keyCode.SPACE && x(this).click();
              })),
        this._setOption("disabled", i.disabled),
        this._resetButton();
    },
    _determineButtonType: function () {
      var t, e;
      this.element.is("[type=checkbox]")
        ? (this.type = "checkbox")
        : this.element.is("[type=radio]")
        ? (this.type = "radio")
        : this.element.is("input")
        ? (this.type = "input")
        : (this.type = "button"),
        "checkbox" === this.type || "radio" === this.type
          ? ((e = this.element.parents().last()),
            (t = "label[for='" + this.element.attr("id") + "']"),
            (this.buttonElement = e.find(t)),
            this.buttonElement.length ||
              ((e = (e.length ? e : this.element).siblings()),
              (this.buttonElement = e.filter(t)),
              this.buttonElement.length || (this.buttonElement = e.find(t))),
            this.element.addClass("ui-helper-hidden-accessible"),
            (e = this.element.is(":checked")) &&
              this.buttonElement.addClass("ui-state-active"),
            this.buttonElement.prop("aria-pressed", e))
          : (this.buttonElement = this.element);
    },
    widget: function () {
      return this.buttonElement;
    },
    _destroy: function () {
      this.element.removeClass("ui-helper-hidden-accessible"),
        this.buttonElement
          .removeClass($ + " ui-state-active " + G)
          .removeAttr("role")
          .removeAttr("aria-pressed")
          .html(this.buttonElement.find(".ui-button-text").html()),
        this.hasTitle || this.buttonElement.removeAttr("title");
    },
    _setOption: function (t, e) {
      this._super(t, e),
        "disabled" === t
          ? (this.widget().toggleClass("ui-state-disabled", !!e),
            this.element.prop("disabled", !!e),
            e &&
              ("checkbox" === this.type || "radio" === this.type
                ? this.buttonElement.removeClass("ui-state-focus")
                : this.buttonElement.removeClass(
                    "ui-state-focus ui-state-active"
                  )))
          : this._resetButton();
    },
    refresh: function () {
      var t = this.element.is("input, button")
        ? this.element.is(":disabled")
        : this.element.hasClass("ui-button-disabled");
      t !== this.options.disabled && this._setOption("disabled", t),
        "radio" === this.type
          ? X(this.element[0]).each(function () {
              x(this).is(":checked")
                ? x(this)
                    .button("widget")
                    .addClass("ui-state-active")
                    .attr("aria-pressed", "true")
                : x(this)
                    .button("widget")
                    .removeClass("ui-state-active")
                    .attr("aria-pressed", "false");
            })
          : "checkbox" === this.type &&
            (this.element.is(":checked")
              ? this.buttonElement
                  .addClass("ui-state-active")
                  .attr("aria-pressed", "true")
              : this.buttonElement
                  .removeClass("ui-state-active")
                  .attr("aria-pressed", "false"));
    },
    _resetButton: function () {
      var t, e, i, s, n;
      "input" === this.type
        ? this.options.label && this.element.val(this.options.label)
        : ((t = this.buttonElement.removeClass(G)),
          (e = x("<span></span>", this.document[0])
            .addClass("ui-button-text")
            .html(this.options.label)
            .appendTo(t.empty())
            .text()),
          (s = (i = this.options.icons).primary && i.secondary),
          (n = []),
          i.primary || i.secondary
            ? (this.options.text &&
                n.push(
                  "ui-button-text-icon" +
                    (s ? "s" : i.primary ? "-primary" : "-secondary")
                ),
              i.primary &&
                t.prepend(
                  "<span class='ui-button-icon-primary ui-icon " +
                    i.primary +
                    "'></span>"
                ),
              i.secondary &&
                t.append(
                  "<span class='ui-button-icon-secondary ui-icon " +
                    i.secondary +
                    "'></span>"
                ),
              this.options.text ||
                (n.push(s ? "ui-button-icons-only" : "ui-button-icon-only"),
                this.hasTitle || t.attr("title", x.trim(e))))
            : n.push("ui-button-text-only"),
          t.addClass(n.join(" ")));
    },
  }),
    x.widget("ui.buttonset", {
      version: "1.11.4",
      options: {
        items:
          "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)",
      },
      _create: function () {
        this.element.addClass("ui-buttonset");
      },
      _init: function () {
        this.refresh();
      },
      _setOption: function (t, e) {
        "disabled" === t && this.buttons.button("option", t, e),
          this._super(t, e);
      },
      refresh: function () {
        var t = "rtl" === this.element.css("direction"),
          e = this.element.find(this.options.items),
          i = e.filter(":ui-button");
        e.not(":ui-button").button(),
          i.button("refresh"),
          (this.buttons = e
            .map(function () {
              return x(this).button("widget")[0];
            })
            .removeClass("ui-corner-all ui-corner-left ui-corner-right")
            .filter(":first")
            .addClass(t ? "ui-corner-right" : "ui-corner-left")
            .end()
            .filter(":last")
            .addClass(t ? "ui-corner-left" : "ui-corner-right")
            .end()
            .end());
      },
      _destroy: function () {
        this.element.removeClass("ui-buttonset"),
          this.buttons
            .map(function () {
              return x(this).button("widget")[0];
            })
            .removeClass("ui-corner-left ui-corner-right")
            .end()
            .button("destroy");
      },
    }),
    x.ui.button;
  function Q() {
    (this._curInst = null),
      (this._keyEvent = !1),
      (this._disabledInputs = []),
      (this._datepickerShowing = !1),
      (this._inDialog = !1),
      (this._mainDivId = "ui-datepicker-div"),
      (this._inlineClass = "ui-datepicker-inline"),
      (this._appendClass = "ui-datepicker-append"),
      (this._triggerClass = "ui-datepicker-trigger"),
      (this._dialogClass = "ui-datepicker-dialog"),
      (this._disableClass = "ui-datepicker-disabled"),
      (this._unselectableClass = "ui-datepicker-unselectable"),
      (this._currentClass = "ui-datepicker-current-day"),
      (this._dayOverClass = "ui-datepicker-days-cell-over"),
      (this.regional = []),
      (this.regional[""] = {
        closeText: "Done",
        prevText: "Prev",
        nextText: "Next",
        currentText: "Today",
        monthNames: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        monthNamesShort: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        dayNames: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        weekHeader: "Wk",
        dateFormat: "mm/dd/yy",
        firstDay: 0,
        isRTL: !1,
        showMonthAfterYear: !1,
        yearSuffix: "",
      }),
      (this._defaults = {
        showOn: "focus",
        showAnim: "fadeIn",
        showOptions: {},
        defaultDate: null,
        appendText: "",
        buttonText: "...",
        buttonImage: "",
        buttonImageOnly: !1,
        hideIfNoPrevNext: !1,
        navigationAsDateFormat: !1,
        gotoCurrent: !1,
        changeMonth: !1,
        changeYear: !1,
        yearRange: "c-10:c+10",
        showOtherMonths: !1,
        selectOtherMonths: !1,
        showWeek: !1,
        calculateWeek: this.iso8601Week,
        shortYearCutoff: "+10",
        minDate: null,
        maxDate: null,
        duration: "fast",
        beforeShowDay: null,
        beforeShow: null,
        onSelect: null,
        onChangeMonthYear: null,
        onClose: null,
        numberOfMonths: 1,
        showCurrentAtPos: 0,
        stepMonths: 1,
        stepBigMonths: 12,
        altField: "",
        altFormat: "",
        constrainInput: !0,
        showButtonPanel: !1,
        autoSize: !1,
        disabled: !1,
      }),
      x.extend(this._defaults, this.regional[""]),
      (this.regional.en = x.extend(!0, {}, this.regional[""])),
      (this.regional["en-US"] = x.extend(!0, {}, this.regional.en)),
      (this.dpDiv = J(
        x(
          "<div id='" +
            this._mainDivId +
            "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"
        )
      ));
  }
  function J(t) {
    var e =
      "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
    return t
      .delegate(e, "mouseout", function () {
        x(this).removeClass("ui-state-hover"),
          -1 !== this.className.indexOf("ui-datepicker-prev") &&
            x(this).removeClass("ui-datepicker-prev-hover"),
          -1 !== this.className.indexOf("ui-datepicker-next") &&
            x(this).removeClass("ui-datepicker-next-hover");
      })
      .delegate(e, "mouseover", Z);
  }
  function Z() {
    x.datepicker._isDisabledDatepicker(
      (m.inline ? m.dpDiv.parent() : m.input)[0]
    ) ||
      (x(this)
        .parents(".ui-datepicker-calendar")
        .find("a")
        .removeClass("ui-state-hover"),
      x(this).addClass("ui-state-hover"),
      -1 !== this.className.indexOf("ui-datepicker-prev") &&
        x(this).addClass("ui-datepicker-prev-hover"),
      -1 !== this.className.indexOf("ui-datepicker-next") &&
        x(this).addClass("ui-datepicker-next-hover"));
  }
  function g(t, e) {
    for (var i in (x.extend(t, e), e)) null == e[i] && (t[i] = e[i]);
  }
  x.extend(x.ui, { datepicker: { version: "1.11.4" } }),
    x.extend(Q.prototype, {
      markerClassName: "hasDatepicker",
      maxRows: 4,
      _widgetDatepicker: function () {
        return this.dpDiv;
      },
      setDefaults: function (t) {
        return g(this._defaults, t || {}), this;
      },
      _attachDatepicker: function (t, e) {
        var i,
          s = t.nodeName.toLowerCase(),
          n = "div" === s || "span" === s;
        t.id || ((this.uuid += 1), (t.id = "dp" + this.uuid)),
          ((i = this._newInst(x(t), n)).settings = x.extend({}, e || {})),
          "input" === s
            ? this._connectDatepicker(t, i)
            : n && this._inlineDatepicker(t, i);
      },
      _newInst: function (t, e) {
        return {
          id: t[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1"),
          input: t,
          selectedDay: 0,
          selectedMonth: 0,
          selectedYear: 0,
          drawMonth: 0,
          drawYear: 0,
          inline: e,
          dpDiv: e
            ? J(
                x(
                  "<div class='" +
                    this._inlineClass +
                    " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"
                )
              )
            : this.dpDiv,
        };
      },
      _connectDatepicker: function (t, e) {
        var i = x(t);
        (e.append = x([])),
          (e.trigger = x([])),
          i.hasClass(this.markerClassName) ||
            (this._attachments(i, e),
            i
              .addClass(this.markerClassName)
              .keydown(this._doKeyDown)
              .keypress(this._doKeyPress)
              .keyup(this._doKeyUp),
            this._autoSize(e),
            x.data(t, "datepicker", e),
            e.settings.disabled && this._disableDatepicker(t));
      },
      _attachments: function (t, e) {
        var i,
          s = this._get(e, "appendText"),
          n = this._get(e, "isRTL");
        e.append && e.append.remove(),
          s &&
            ((e.append = x(
              "<span class='" + this._appendClass + "'>" + s + "</span>"
            )),
            t[n ? "before" : "after"](e.append)),
          t.unbind("focus", this._showDatepicker),
          e.trigger && e.trigger.remove(),
          ("focus" !== (s = this._get(e, "showOn")) && "both" !== s) ||
            t.focus(this._showDatepicker),
          ("button" !== s && "both" !== s) ||
            ((s = this._get(e, "buttonText")),
            (i = this._get(e, "buttonImage")),
            (e.trigger = x(
              this._get(e, "buttonImageOnly")
                ? x("<img/>")
                    .addClass(this._triggerClass)
                    .attr({ src: i, alt: s, title: s })
                : x("<button type='button'></button>")
                    .addClass(this._triggerClass)
                    .html(
                      i ? x("<img/>").attr({ src: i, alt: s, title: s }) : s
                    )
            )),
            t[n ? "before" : "after"](e.trigger),
            e.trigger.click(function () {
              return (
                x.datepicker._datepickerShowing &&
                x.datepicker._lastInput === t[0]
                  ? x.datepicker._hideDatepicker()
                  : (x.datepicker._datepickerShowing &&
                      x.datepicker._lastInput !== t[0] &&
                      x.datepicker._hideDatepicker(),
                    x.datepicker._showDatepicker(t[0])),
                !1
              );
            }));
      },
      _autoSize: function (t) {
        var e, i, s, n, o, a;
        this._get(t, "autoSize") &&
          !t.inline &&
          ((o = new Date(2009, 11, 20)),
          (a = this._get(t, "dateFormat")).match(/[DM]/) &&
            (o.setMonth(
              (e = function (t) {
                for (n = s = i = 0; n < t.length; n++)
                  t[n].length > i && ((i = t[n].length), (s = n));
                return s;
              })(this._get(t, a.match(/MM/) ? "monthNames" : "monthNamesShort"))
            ),
            o.setDate(
              e(this._get(t, a.match(/DD/) ? "dayNames" : "dayNamesShort")) +
                20 -
                o.getDay()
            )),
          t.input.attr("size", this._formatDate(t, o).length));
      },
      _inlineDatepicker: function (t, e) {
        var i = x(t);
        i.hasClass(this.markerClassName) ||
          (i.addClass(this.markerClassName).append(e.dpDiv),
          x.data(t, "datepicker", e),
          this._setDate(e, this._getDefaultDate(e), !0),
          this._updateDatepicker(e),
          this._updateAlternate(e),
          e.settings.disabled && this._disableDatepicker(t),
          e.dpDiv.css("display", "block"));
      },
      _dialogDatepicker: function (t, e, i, s, n) {
        var o,
          a = this._dialogInst;
        return (
          a ||
            ((this.uuid += 1),
            (o = "dp" + this.uuid),
            (this._dialogInput = x(
              "<input type='text' id='" +
                o +
                "' style='position: absolute; top: -100px; width: 0px;'/>"
            )),
            this._dialogInput.keydown(this._doKeyDown),
            x("body").append(this._dialogInput),
            ((a = this._dialogInst =
              this._newInst(this._dialogInput, !1)).settings = {}),
            x.data(this._dialogInput[0], "datepicker", a)),
          g(a.settings, s || {}),
          (e = e && e.constructor === Date ? this._formatDate(a, e) : e),
          this._dialogInput.val(e),
          (this._pos = n ? (n.length ? n : [n.pageX, n.pageY]) : null),
          this._pos ||
            ((o = document.documentElement.clientWidth),
            (s = document.documentElement.clientHeight),
            (e =
              document.documentElement.scrollLeft || document.body.scrollLeft),
            (n = document.documentElement.scrollTop || document.body.scrollTop),
            (this._pos = [o / 2 - 100 + e, s / 2 - 150 + n])),
          this._dialogInput
            .css("left", this._pos[0] + 20 + "px")
            .css("top", this._pos[1] + "px"),
          (a.settings.onSelect = i),
          (this._inDialog = !0),
          this.dpDiv.addClass(this._dialogClass),
          this._showDatepicker(this._dialogInput[0]),
          x.blockUI && x.blockUI(this.dpDiv),
          x.data(this._dialogInput[0], "datepicker", a),
          this
        );
      },
      _destroyDatepicker: function (t) {
        var e,
          i = x(t),
          s = x.data(t, "datepicker");
        i.hasClass(this.markerClassName) &&
          ((e = t.nodeName.toLowerCase()),
          x.removeData(t, "datepicker"),
          "input" === e
            ? (s.append.remove(),
              s.trigger.remove(),
              i
                .removeClass(this.markerClassName)
                .unbind("focus", this._showDatepicker)
                .unbind("keydown", this._doKeyDown)
                .unbind("keypress", this._doKeyPress)
                .unbind("keyup", this._doKeyUp))
            : ("div" !== e && "span" !== e) ||
              i.removeClass(this.markerClassName).empty(),
          m === s && (m = null));
      },
      _enableDatepicker: function (e) {
        var t,
          i = x(e),
          s = x.data(e, "datepicker");
        i.hasClass(this.markerClassName) &&
          ("input" === (t = e.nodeName.toLowerCase())
            ? ((e.disabled = !1),
              s.trigger
                .filter("button")
                .each(function () {
                  this.disabled = !1;
                })
                .end()
                .filter("img")
                .css({ opacity: "1.0", cursor: "" }))
            : ("div" !== t && "span" !== t) ||
              ((s = i.children("." + this._inlineClass))
                .children()
                .removeClass("ui-state-disabled"),
              s
                .find("select.ui-datepicker-month, select.ui-datepicker-year")
                .prop("disabled", !1)),
          (this._disabledInputs = x.map(this._disabledInputs, function (t) {
            return t === e ? null : t;
          })));
      },
      _disableDatepicker: function (e) {
        var t,
          i = x(e),
          s = x.data(e, "datepicker");
        i.hasClass(this.markerClassName) &&
          ("input" === (t = e.nodeName.toLowerCase())
            ? ((e.disabled = !0),
              s.trigger
                .filter("button")
                .each(function () {
                  this.disabled = !0;
                })
                .end()
                .filter("img")
                .css({ opacity: "0.5", cursor: "default" }))
            : ("div" !== t && "span" !== t) ||
              ((s = i.children("." + this._inlineClass))
                .children()
                .addClass("ui-state-disabled"),
              s
                .find("select.ui-datepicker-month, select.ui-datepicker-year")
                .prop("disabled", !0)),
          (this._disabledInputs = x.map(this._disabledInputs, function (t) {
            return t === e ? null : t;
          })),
          (this._disabledInputs[this._disabledInputs.length] = e));
      },
      _isDisabledDatepicker: function (t) {
        if (t)
          for (var e = 0; e < this._disabledInputs.length; e++)
            if (this._disabledInputs[e] === t) return !0;
        return !1;
      },
      _getInst: function (t) {
        try {
          return x.data(t, "datepicker");
        } catch (t) {
          throw "Missing instance data for this datepicker";
        }
      },
      _optionDatepicker: function (t, e, i) {
        var s,
          n,
          o,
          a,
          r = this._getInst(t);
        if (2 === arguments.length && "string" == typeof e)
          return "defaults" === e
            ? x.extend({}, x.datepicker._defaults)
            : r
            ? "all" === e
              ? x.extend({}, r.settings)
              : this._get(r, e)
            : null;
        (s = e || {}),
          "string" == typeof e && ((s = {})[e] = i),
          r &&
            (this._curInst === r && this._hideDatepicker(),
            (n = this._getDateDatepicker(t, !0)),
            (o = this._getMinMaxDate(r, "min")),
            (a = this._getMinMaxDate(r, "max")),
            g(r.settings, s),
            null !== o &&
              void 0 !== s.dateFormat &&
              void 0 === s.minDate &&
              (r.settings.minDate = this._formatDate(r, o)),
            null !== a &&
              void 0 !== s.dateFormat &&
              void 0 === s.maxDate &&
              (r.settings.maxDate = this._formatDate(r, a)),
            "disabled" in s &&
              (s.disabled
                ? this._disableDatepicker(t)
                : this._enableDatepicker(t)),
            this._attachments(x(t), r),
            this._autoSize(r),
            this._setDate(r, n),
            this._updateAlternate(r),
            this._updateDatepicker(r));
      },
      _changeDatepicker: function (t, e, i) {
        this._optionDatepicker(t, e, i);
      },
      _refreshDatepicker: function (t) {
        t = this._getInst(t);
        t && this._updateDatepicker(t);
      },
      _setDateDatepicker: function (t, e) {
        t = this._getInst(t);
        t &&
          (this._setDate(t, e),
          this._updateDatepicker(t),
          this._updateAlternate(t));
      },
      _getDateDatepicker: function (t, e) {
        t = this._getInst(t);
        return (
          t && !t.inline && this._setDateFromField(t, e),
          t ? this._getDate(t) : null
        );
      },
      _doKeyDown: function (t) {
        var e,
          i,
          s = x.datepicker._getInst(t.target),
          n = !0,
          o = s.dpDiv.is(".ui-datepicker-rtl");
        if (((s._keyEvent = !0), x.datepicker._datepickerShowing))
          switch (t.keyCode) {
            case 9:
              x.datepicker._hideDatepicker(), (n = !1);
              break;
            case 13:
              return (
                (i = x(
                  "td." +
                    x.datepicker._dayOverClass +
                    ":not(." +
                    x.datepicker._currentClass +
                    ")",
                  s.dpDiv
                ))[0] &&
                  x.datepicker._selectDay(
                    t.target,
                    s.selectedMonth,
                    s.selectedYear,
                    i[0]
                  ),
                (i = x.datepicker._get(s, "onSelect"))
                  ? ((e = x.datepicker._formatDate(s)),
                    i.apply(s.input ? s.input[0] : null, [e, s]))
                  : x.datepicker._hideDatepicker(),
                !1
              );
            case 27:
              x.datepicker._hideDatepicker();
              break;
            case 33:
              x.datepicker._adjustDate(
                t.target,
                t.ctrlKey
                  ? -x.datepicker._get(s, "stepBigMonths")
                  : -x.datepicker._get(s, "stepMonths"),
                "M"
              );
              break;
            case 34:
              x.datepicker._adjustDate(
                t.target,
                t.ctrlKey
                  ? +x.datepicker._get(s, "stepBigMonths")
                  : +x.datepicker._get(s, "stepMonths"),
                "M"
              );
              break;
            case 35:
              (t.ctrlKey || t.metaKey) && x.datepicker._clearDate(t.target),
                (n = t.ctrlKey || t.metaKey);
              break;
            case 36:
              (t.ctrlKey || t.metaKey) && x.datepicker._gotoToday(t.target),
                (n = t.ctrlKey || t.metaKey);
              break;
            case 37:
              (t.ctrlKey || t.metaKey) &&
                x.datepicker._adjustDate(t.target, o ? 1 : -1, "D"),
                (n = t.ctrlKey || t.metaKey),
                t.originalEvent.altKey &&
                  x.datepicker._adjustDate(
                    t.target,
                    t.ctrlKey
                      ? -x.datepicker._get(s, "stepBigMonths")
                      : -x.datepicker._get(s, "stepMonths"),
                    "M"
                  );
              break;
            case 38:
              (t.ctrlKey || t.metaKey) &&
                x.datepicker._adjustDate(t.target, -7, "D"),
                (n = t.ctrlKey || t.metaKey);
              break;
            case 39:
              (t.ctrlKey || t.metaKey) &&
                x.datepicker._adjustDate(t.target, o ? -1 : 1, "D"),
                (n = t.ctrlKey || t.metaKey),
                t.originalEvent.altKey &&
                  x.datepicker._adjustDate(
                    t.target,
                    t.ctrlKey
                      ? +x.datepicker._get(s, "stepBigMonths")
                      : +x.datepicker._get(s, "stepMonths"),
                    "M"
                  );
              break;
            case 40:
              (t.ctrlKey || t.metaKey) &&
                x.datepicker._adjustDate(t.target, 7, "D"),
                (n = t.ctrlKey || t.metaKey);
              break;
            default:
              n = !1;
          }
        else
          36 === t.keyCode && t.ctrlKey
            ? x.datepicker._showDatepicker(this)
            : (n = !1);
        n && (t.preventDefault(), t.stopPropagation());
      },
      _doKeyPress: function (t) {
        var e,
          i = x.datepicker._getInst(t.target);
        if (x.datepicker._get(i, "constrainInput"))
          return (
            (i = x.datepicker._possibleChars(
              x.datepicker._get(i, "dateFormat")
            )),
            (e = String.fromCharCode(
              null == t.charCode ? t.keyCode : t.charCode
            )),
            t.ctrlKey || t.metaKey || e < " " || !i || -1 < i.indexOf(e)
          );
      },
      _doKeyUp: function (t) {
        t = x.datepicker._getInst(t.target);
        if (t.input.val() !== t.lastVal)
          try {
            x.datepicker.parseDate(
              x.datepicker._get(t, "dateFormat"),
              t.input ? t.input.val() : null,
              x.datepicker._getFormatConfig(t)
            ) &&
              (x.datepicker._setDateFromField(t),
              x.datepicker._updateAlternate(t),
              x.datepicker._updateDatepicker(t));
          } catch (t) {}
        return !0;
      },
      _showDatepicker: function (t) {
        var e, i, s, n;
        "input" !== (t = t.target || t).nodeName.toLowerCase() &&
          (t = x("input", t.parentNode)[0]),
          x.datepicker._isDisabledDatepicker(t) ||
            x.datepicker._lastInput === t ||
            ((n = x.datepicker._getInst(t)),
            x.datepicker._curInst &&
              x.datepicker._curInst !== n &&
              (x.datepicker._curInst.dpDiv.stop(!0, !0),
              n &&
                x.datepicker._datepickerShowing &&
                x.datepicker._hideDatepicker(x.datepicker._curInst.input[0])),
            !1 !==
              (i = (i = x.datepicker._get(n, "beforeShow"))
                ? i.apply(t, [t, n])
                : {}) &&
              (g(n.settings, i),
              (n.lastVal = null),
              (x.datepicker._lastInput = t),
              x.datepicker._setDateFromField(n),
              x.datepicker._inDialog && (t.value = ""),
              x.datepicker._pos ||
                ((x.datepicker._pos = x.datepicker._findPos(t)),
                (x.datepicker._pos[1] += t.offsetHeight)),
              (e = !1),
              x(t)
                .parents()
                .each(function () {
                  return !(e |= "fixed" === x(this).css("position"));
                }),
              (i = { left: x.datepicker._pos[0], top: x.datepicker._pos[1] }),
              (x.datepicker._pos = null),
              n.dpDiv.empty(),
              n.dpDiv.css({
                position: "absolute",
                display: "block",
                top: "-1000px",
              }),
              x.datepicker._updateDatepicker(n),
              (i = x.datepicker._checkOffset(n, i, e)),
              n.dpDiv.css({
                position:
                  x.datepicker._inDialog && x.blockUI
                    ? "static"
                    : e
                    ? "fixed"
                    : "absolute",
                display: "none",
                left: i.left + "px",
                top: i.top + "px",
              }),
              n.inline ||
                ((i = x.datepicker._get(n, "showAnim")),
                (s = x.datepicker._get(n, "duration")),
                n.dpDiv.css(
                  "z-index",
                  (function (t) {
                    for (var e; t.length && t[0] !== document; ) {
                      if (
                        ("absolute" === (e = t.css("position")) ||
                          "relative" === e ||
                          "fixed" === e) &&
                        ((e = parseInt(t.css("zIndex"), 10)),
                        !isNaN(e) && 0 !== e)
                      )
                        return e;
                      t = t.parent();
                    }
                    return 0;
                  })(x(t)) + 1
                ),
                (x.datepicker._datepickerShowing = !0),
                x.effects && x.effects.effect[i]
                  ? n.dpDiv.show(i, x.datepicker._get(n, "showOptions"), s)
                  : n.dpDiv[i || "show"](i ? s : null),
                x.datepicker._shouldFocusInput(n) && n.input.focus(),
                (x.datepicker._curInst = n))));
      },
      _updateDatepicker: function (t) {
        (this.maxRows = 4),
          (m = t).dpDiv.empty().append(this._generateHTML(t)),
          this._attachHandlers(t);
        var e,
          i = this._getNumberOfMonths(t),
          s = i[1],
          n = t.dpDiv.find("." + this._dayOverClass + " a");
        0 < n.length && Z.apply(n.get(0)),
          t.dpDiv
            .removeClass(
              "ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4"
            )
            .width(""),
          1 < s &&
            t.dpDiv
              .addClass("ui-datepicker-multi-" + s)
              .css("width", 17 * s + "em"),
          t.dpDiv[(1 !== i[0] || 1 !== i[1] ? "add" : "remove") + "Class"](
            "ui-datepicker-multi"
          ),
          t.dpDiv[(this._get(t, "isRTL") ? "add" : "remove") + "Class"](
            "ui-datepicker-rtl"
          ),
          t === x.datepicker._curInst &&
            x.datepicker._datepickerShowing &&
            x.datepicker._shouldFocusInput(t) &&
            t.input.focus(),
          t.yearshtml &&
            ((e = t.yearshtml),
            setTimeout(function () {
              e === t.yearshtml &&
                t.yearshtml &&
                t.dpDiv
                  .find("select.ui-datepicker-year:first")
                  .replaceWith(t.yearshtml),
                (e = t.yearshtml = null);
            }, 0));
      },
      _shouldFocusInput: function (t) {
        return (
          t.input &&
          t.input.is(":visible") &&
          !t.input.is(":disabled") &&
          !t.input.is(":focus")
        );
      },
      _checkOffset: function (t, e, i) {
        var s = t.dpDiv.outerWidth(),
          n = t.dpDiv.outerHeight(),
          o = t.input ? t.input.outerWidth() : 0,
          a = t.input ? t.input.outerHeight() : 0,
          r =
            document.documentElement.clientWidth +
            (i ? 0 : x(document).scrollLeft()),
          h =
            document.documentElement.clientHeight +
            (i ? 0 : x(document).scrollTop());
        return (
          (e.left -= this._get(t, "isRTL") ? s - o : 0),
          (e.left -=
            i && e.left === t.input.offset().left
              ? x(document).scrollLeft()
              : 0),
          (e.top -=
            i && e.top === t.input.offset().top + a
              ? x(document).scrollTop()
              : 0),
          (e.left -= Math.min(
            e.left,
            e.left + s > r && s < r ? Math.abs(e.left + s - r) : 0
          )),
          (e.top -= Math.min(
            e.top,
            e.top + n > h && n < h ? Math.abs(n + a) : 0
          )),
          e
        );
      },
      _findPos: function (t) {
        for (
          var e = this._getInst(t), i = this._get(e, "isRTL");
          t &&
          ("hidden" === t.type || 1 !== t.nodeType || x.expr.filters.hidden(t));

        )
          t = t[i ? "previousSibling" : "nextSibling"];
        return [(e = x(t).offset()).left, e.top];
      },
      _hideDatepicker: function (t) {
        var e,
          i,
          s = this._curInst;
        !s ||
          (t && s !== x.data(t, "datepicker")) ||
          (this._datepickerShowing &&
            ((t = this._get(s, "showAnim")),
            (i = this._get(s, "duration")),
            (e = function () {
              x.datepicker._tidyDialog(s);
            }),
            x.effects && (x.effects.effect[t] || x.effects[t])
              ? s.dpDiv.hide(t, x.datepicker._get(s, "showOptions"), i, e)
              : s.dpDiv[
                  "slideDown" === t
                    ? "slideUp"
                    : "fadeIn" === t
                    ? "fadeOut"
                    : "hide"
                ](t ? i : null, e),
            t || e(),
            (this._datepickerShowing = !1),
            (i = this._get(s, "onClose")) &&
              i.apply(s.input ? s.input[0] : null, [
                s.input ? s.input.val() : "",
                s,
              ]),
            (this._lastInput = null),
            this._inDialog &&
              (this._dialogInput.css({
                position: "absolute",
                left: "0",
                top: "-100px",
              }),
              x.blockUI && (x.unblockUI(), x("body").append(this.dpDiv))),
            (this._inDialog = !1)));
      },
      _tidyDialog: function (t) {
        t.dpDiv
          .removeClass(this._dialogClass)
          .unbind(".ui-datepicker-calendar");
      },
      _checkExternalClick: function (t) {
        var e;
        x.datepicker._curInst &&
          ((t = x(t.target)),
          (e = x.datepicker._getInst(t[0])),
          (!(
            t[0].id === x.datepicker._mainDivId ||
            0 !== t.parents("#" + x.datepicker._mainDivId).length ||
            t.hasClass(x.datepicker.markerClassName) ||
            t.closest("." + x.datepicker._triggerClass).length ||
            !x.datepicker._datepickerShowing ||
            (x.datepicker._inDialog && x.blockUI)
          ) ||
            (t.hasClass(x.datepicker.markerClassName) &&
              x.datepicker._curInst !== e)) &&
            x.datepicker._hideDatepicker());
      },
      _adjustDate: function (t, e, i) {
        var t = x(t),
          s = this._getInst(t[0]);
        this._isDisabledDatepicker(t[0]) ||
          (this._adjustInstDate(
            s,
            e + ("M" === i ? this._get(s, "showCurrentAtPos") : 0),
            i
          ),
          this._updateDatepicker(s));
      },
      _gotoToday: function (t) {
        var e,
          t = x(t),
          i = this._getInst(t[0]);
        this._get(i, "gotoCurrent") && i.currentDay
          ? ((i.selectedDay = i.currentDay),
            (i.drawMonth = i.selectedMonth = i.currentMonth),
            (i.drawYear = i.selectedYear = i.currentYear))
          : ((e = new Date()),
            (i.selectedDay = e.getDate()),
            (i.drawMonth = i.selectedMonth = e.getMonth()),
            (i.drawYear = i.selectedYear = e.getFullYear())),
          this._notifyChange(i),
          this._adjustDate(t);
      },
      _selectMonthYear: function (t, e, i) {
        var t = x(t),
          s = this._getInst(t[0]);
        (s["selected" + ("M" === i ? "Month" : "Year")] = s[
          "draw" + ("M" === i ? "Month" : "Year")
        ] =
          parseInt(e.options[e.selectedIndex].value, 10)),
          this._notifyChange(s),
          this._adjustDate(t);
      },
      _selectDay: function (t, e, i, s) {
        var n = x(t);
        x(s).hasClass(this._unselectableClass) ||
          this._isDisabledDatepicker(n[0]) ||
          (((n = this._getInst(n[0])).selectedDay = n.currentDay =
            x("a", s).html()),
          (n.selectedMonth = n.currentMonth = e),
          (n.selectedYear = n.currentYear = i),
          this._selectDate(
            t,
            this._formatDate(n, n.currentDay, n.currentMonth, n.currentYear)
          ));
      },
      _clearDate: function (t) {
        t = x(t);
        this._selectDate(t, "");
      },
      _selectDate: function (t, e) {
        var i,
          t = x(t),
          t = this._getInst(t[0]);
        (e = null != e ? e : this._formatDate(t)),
          t.input && t.input.val(e),
          this._updateAlternate(t),
          (i = this._get(t, "onSelect"))
            ? i.apply(t.input ? t.input[0] : null, [e, t])
            : t.input && t.input.trigger("change"),
          t.inline
            ? this._updateDatepicker(t)
            : (this._hideDatepicker(),
              (this._lastInput = t.input[0]),
              "object" != typeof t.input[0] && t.input.focus(),
              (this._lastInput = null));
      },
      _updateAlternate: function (t) {
        var e,
          i,
          s,
          n = this._get(t, "altField");
        n &&
          ((e = this._get(t, "altFormat") || this._get(t, "dateFormat")),
          (i = this._getDate(t)),
          (s = this.formatDate(e, i, this._getFormatConfig(t))),
          x(n).each(function () {
            x(this).val(s);
          }));
      },
      noWeekends: function (t) {
        t = t.getDay();
        return [0 < t && t < 6, ""];
      },
      iso8601Week: function (t) {
        var e,
          t = new Date(t.getTime());
        return (
          t.setDate(t.getDate() + 4 - (t.getDay() || 7)),
          (e = t.getTime()),
          t.setMonth(0),
          t.setDate(1),
          Math.floor(Math.round((e - t) / 864e5) / 7) + 1
        );
      },
      parseDate: function (e, n, t) {
        if (null == e || null == n) throw "Invalid arguments";
        if ("" === (n = "object" == typeof n ? n.toString() : n + ""))
          return null;
        function i(t) {
          var e = b(t),
            e =
              "@" === t
                ? 14
                : "!" === t
                ? 20
                : "y" === t && e
                ? 4
                : "o" === t
                ? 3
                : 2,
            t = new RegExp("^\\d{" + ("y" === t ? e : 1) + "," + e + "}");
          if ((e = n.substring(h).match(t)))
            return (h += e[0].length), parseInt(e[0], 10);
          throw "Missing number at position " + h;
        }
        function s(t, e, i) {
          var s = -1,
            t = x
              .map(b(t) ? i : e, function (t, e) {
                return [[e, t]];
              })
              .sort(function (t, e) {
                return -(t[1].length - e[1].length);
              });
          if (
            (x.each(t, function (t, e) {
              var i = e[1];
              if (n.substr(h, i.length).toLowerCase() === i.toLowerCase())
                return (s = e[0]), (h += i.length), !1;
            }),
            -1 !== s)
          )
            return s + 1;
          throw "Unknown name at position " + h;
        }
        function o() {
          if (n.charAt(h) !== e.charAt(y))
            throw "Unexpected literal at position " + h;
          h++;
        }
        for (
          var a,
            r,
            h = 0,
            l =
              (t ? t.shortYearCutoff : null) || this._defaults.shortYearCutoff,
            l =
              "string" != typeof l
                ? l
                : (new Date().getFullYear() % 100) + parseInt(l, 10),
            c = (t ? t.dayNamesShort : null) || this._defaults.dayNamesShort,
            u = (t ? t.dayNames : null) || this._defaults.dayNames,
            d =
              (t ? t.monthNamesShort : null) || this._defaults.monthNamesShort,
            p = (t ? t.monthNames : null) || this._defaults.monthNames,
            f = -1,
            m = -1,
            g = -1,
            v = -1,
            _ = !1,
            b = function (t) {
              t = y + 1 < e.length && e.charAt(y + 1) === t;
              return t && y++, t;
            },
            y = 0;
          y < e.length;
          y++
        )
          if (_) "'" !== e.charAt(y) || b("'") ? o() : (_ = !1);
          else
            switch (e.charAt(y)) {
              case "d":
                g = i("d");
                break;
              case "D":
                s("D", c, u);
                break;
              case "o":
                v = i("o");
                break;
              case "m":
                m = i("m");
                break;
              case "M":
                m = s("M", d, p);
                break;
              case "y":
                f = i("y");
                break;
              case "@":
                (f = (r = new Date(i("@"))).getFullYear()),
                  (m = r.getMonth() + 1),
                  (g = r.getDate());
                break;
              case "!":
                (f = (r = new Date(
                  (i("!") - this._ticksTo1970) / 1e4
                )).getFullYear()),
                  (m = r.getMonth() + 1),
                  (g = r.getDate());
                break;
              case "'":
                b("'") ? o() : (_ = !0);
                break;
              default:
                o();
            }
        if (h < n.length && ((t = n.substr(h)), !/^\s+/.test(t)))
          throw "Extra/unparsed characters found in date: " + t;
        if (
          (-1 === f
            ? (f = new Date().getFullYear())
            : f < 100 &&
              (f +=
                new Date().getFullYear() -
                (new Date().getFullYear() % 100) +
                (f <= l ? 0 : -100)),
          -1 < v)
        )
          for (m = 1, g = v; ; ) {
            if (g <= (a = this._getDaysInMonth(f, m - 1))) break;
            m++, (g -= a);
          }
        if (
          (r = this._daylightSavingAdjust(
            new Date(f, m - 1, g)
          )).getFullYear() !== f ||
          r.getMonth() + 1 !== m ||
          r.getDate() !== g
        )
          throw "Invalid date";
        return r;
      },
      ATOM: "yy-mm-dd",
      COOKIE: "D, dd M yy",
      ISO_8601: "yy-mm-dd",
      RFC_822: "D, d M y",
      RFC_850: "DD, dd-M-y",
      RFC_1036: "D, d M y",
      RFC_1123: "D, d M yy",
      RFC_2822: "D, d M yy",
      RSS: "D, d M y",
      TICKS: "!",
      TIMESTAMP: "@",
      W3C: "yy-mm-dd",
      _ticksTo1970:
        24 *
        (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) *
        60 *
        60 *
        1e7,
      formatDate: function (e, t, i) {
        if (!t) return "";
        function s(t, e, i) {
          var s = "" + e;
          if (c(t)) for (; s.length < i; ) s = "0" + s;
          return s;
        }
        function n(t, e, i, s) {
          return (c(t) ? s : i)[e];
        }
        var o,
          a = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
          r = (i ? i.dayNames : null) || this._defaults.dayNames,
          h = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
          l = (i ? i.monthNames : null) || this._defaults.monthNames,
          c = function (t) {
            t = o + 1 < e.length && e.charAt(o + 1) === t;
            return t && o++, t;
          },
          u = "",
          d = !1;
        if (t)
          for (o = 0; o < e.length; o++)
            if (d)
              "'" !== e.charAt(o) || c("'") ? (u += e.charAt(o)) : (d = !1);
            else
              switch (e.charAt(o)) {
                case "d":
                  u += s("d", t.getDate(), 2);
                  break;
                case "D":
                  u += n("D", t.getDay(), a, r);
                  break;
                case "o":
                  u += s(
                    "o",
                    Math.round(
                      (new Date(
                        t.getFullYear(),
                        t.getMonth(),
                        t.getDate()
                      ).getTime() -
                        new Date(t.getFullYear(), 0, 0).getTime()) /
                        864e5
                    ),
                    3
                  );
                  break;
                case "m":
                  u += s("m", t.getMonth() + 1, 2);
                  break;
                case "M":
                  u += n("M", t.getMonth(), h, l);
                  break;
                case "y":
                  u += c("y")
                    ? t.getFullYear()
                    : (t.getYear() % 100 < 10 ? "0" : "") + (t.getYear() % 100);
                  break;
                case "@":
                  u += t.getTime();
                  break;
                case "!":
                  u += 1e4 * t.getTime() + this._ticksTo1970;
                  break;
                case "'":
                  c("'") ? (u += "'") : (d = !0);
                  break;
                default:
                  u += e.charAt(o);
              }
        return u;
      },
      _possibleChars: function (e) {
        function t(t) {
          return (t = n + 1 < e.length && e.charAt(n + 1) === t) && n++, t;
        }
        for (var i = "", s = !1, n = 0; n < e.length; n++)
          if (s) "'" !== e.charAt(n) || t("'") ? (i += e.charAt(n)) : (s = !1);
          else
            switch (e.charAt(n)) {
              case "d":
              case "m":
              case "y":
              case "@":
                i += "0123456789";
                break;
              case "D":
              case "M":
                return null;
              case "'":
                t("'") ? (i += "'") : (s = !0);
                break;
              default:
                i += e.charAt(n);
            }
        return i;
      },
      _get: function (t, e) {
        return (void 0 !== t.settings[e] ? t.settings : this._defaults)[e];
      },
      _setDateFromField: function (t, e) {
        if (t.input.val() !== t.lastVal) {
          var i = this._get(t, "dateFormat"),
            s = (t.lastVal = t.input ? t.input.val() : null),
            n = this._getDefaultDate(t),
            o = n,
            a = this._getFormatConfig(t);
          try {
            o = this.parseDate(i, s, a) || n;
          } catch (t) {
            s = e ? "" : s;
          }
          (t.selectedDay = o.getDate()),
            (t.drawMonth = t.selectedMonth = o.getMonth()),
            (t.drawYear = t.selectedYear = o.getFullYear()),
            (t.currentDay = s ? o.getDate() : 0),
            (t.currentMonth = s ? o.getMonth() : 0),
            (t.currentYear = s ? o.getFullYear() : 0),
            this._adjustInstDate(t);
        }
      },
      _getDefaultDate: function (t) {
        return this._restrictMinMax(
          t,
          this._determineDate(t, this._get(t, "defaultDate"), new Date())
        );
      },
      _determineDate: function (r, t, e) {
        var i,
          s =
            null == t || "" === t
              ? e
              : "string" == typeof t
              ? (function (t) {
                  try {
                    return x.datepicker.parseDate(
                      x.datepicker._get(r, "dateFormat"),
                      t,
                      x.datepicker._getFormatConfig(r)
                    );
                  } catch (t) {}
                  for (
                    var e =
                        (t.toLowerCase().match(/^c/)
                          ? x.datepicker._getDate(r)
                          : null) || new Date(),
                      i = e.getFullYear(),
                      s = e.getMonth(),
                      n = e.getDate(),
                      o = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
                      a = o.exec(t);
                    a;

                  ) {
                    switch (a[2] || "d") {
                      case "d":
                      case "D":
                        n += parseInt(a[1], 10);
                        break;
                      case "w":
                      case "W":
                        n += 7 * parseInt(a[1], 10);
                        break;
                      case "m":
                      case "M":
                        (s += parseInt(a[1], 10)),
                          (n = Math.min(n, x.datepicker._getDaysInMonth(i, s)));
                        break;
                      case "y":
                      case "Y":
                        (i += parseInt(a[1], 10)),
                          (n = Math.min(n, x.datepicker._getDaysInMonth(i, s)));
                    }
                    a = o.exec(t);
                  }
                  return new Date(i, s, n);
                })(t)
              : "number" == typeof t
              ? isNaN(t)
                ? e
                : ((s = t), (i = new Date()).setDate(i.getDate() + s), i)
              : new Date(t.getTime());
        return (
          (s = s && "Invalid Date" === s.toString() ? e : s) &&
            (s.setHours(0),
            s.setMinutes(0),
            s.setSeconds(0),
            s.setMilliseconds(0)),
          this._daylightSavingAdjust(s)
        );
      },
      _daylightSavingAdjust: function (t) {
        return t
          ? (t.setHours(12 < t.getHours() ? t.getHours() + 2 : 0), t)
          : null;
      },
      _setDate: function (t, e, i) {
        var s = !e,
          n = t.selectedMonth,
          o = t.selectedYear,
          e = this._restrictMinMax(t, this._determineDate(t, e, new Date()));
        (t.selectedDay = t.currentDay = e.getDate()),
          (t.drawMonth = t.selectedMonth = t.currentMonth = e.getMonth()),
          (t.drawYear = t.selectedYear = t.currentYear = e.getFullYear()),
          (n === t.selectedMonth && o === t.selectedYear) ||
            i ||
            this._notifyChange(t),
          this._adjustInstDate(t),
          t.input && t.input.val(s ? "" : this._formatDate(t));
      },
      _getDate: function (t) {
        return !t.currentYear || (t.input && "" === t.input.val())
          ? null
          : this._daylightSavingAdjust(
              new Date(t.currentYear, t.currentMonth, t.currentDay)
            );
      },
      _attachHandlers: function (t) {
        var e = this._get(t, "stepMonths"),
          i = "#" + t.id.replace(/\\\\/g, "\\");
        t.dpDiv.find("[data-handler]").map(function () {
          var t = {
            prev: function () {
              x.datepicker._adjustDate(i, -e, "M");
            },
            next: function () {
              x.datepicker._adjustDate(i, +e, "M");
            },
            hide: function () {
              x.datepicker._hideDatepicker();
            },
            today: function () {
              x.datepicker._gotoToday(i);
            },
            selectDay: function () {
              return (
                x.datepicker._selectDay(
                  i,
                  +this.getAttribute("data-month"),
                  +this.getAttribute("data-year"),
                  this
                ),
                !1
              );
            },
            selectMonth: function () {
              return x.datepicker._selectMonthYear(i, this, "M"), !1;
            },
            selectYear: function () {
              return x.datepicker._selectMonthYear(i, this, "Y"), !1;
            },
          };
          x(this).bind(
            this.getAttribute("data-event"),
            t[this.getAttribute("data-handler")]
          );
        });
      },
      _generateHTML: function (t) {
        var e,
          i,
          s,
          n,
          o,
          W,
          O,
          F,
          R,
          a,
          r,
          L,
          h,
          l,
          c,
          u,
          d,
          p,
          f,
          m,
          g,
          v,
          Y,
          _,
          b,
          y,
          w,
          B,
          j,
          x,
          k,
          C,
          D = new Date(),
          q = this._daylightSavingAdjust(
            new Date(D.getFullYear(), D.getMonth(), D.getDate())
          ),
          I = this._get(t, "isRTL"),
          D = this._get(t, "showButtonPanel"),
          T = this._get(t, "hideIfNoPrevNext"),
          P = this._get(t, "navigationAsDateFormat"),
          M = this._getNumberOfMonths(t),
          S = this._get(t, "showCurrentAtPos"),
          z = this._get(t, "stepMonths"),
          K = 1 !== M[0] || 1 !== M[1],
          U = this._daylightSavingAdjust(
            t.currentDay
              ? new Date(t.currentYear, t.currentMonth, t.currentDay)
              : new Date(9999, 9, 9)
          ),
          H = this._getMinMaxDate(t, "min"),
          A = this._getMinMaxDate(t, "max"),
          N = t.drawMonth - S,
          E = t.drawYear;
        if ((N < 0 && ((N += 12), E--), A))
          for (
            e = this._daylightSavingAdjust(
              new Date(
                A.getFullYear(),
                A.getMonth() - M[0] * M[1] + 1,
                A.getDate()
              )
            ),
              e = H && e < H ? H : e;
            this._daylightSavingAdjust(new Date(E, N, 1)) > e;

          )
            --N < 0 && ((N = 11), E--);
        for (
          t.drawMonth = N,
            t.drawYear = E,
            S = this._get(t, "prevText"),
            S = P
              ? this.formatDate(
                  S,
                  this._daylightSavingAdjust(new Date(E, N - z, 1)),
                  this._getFormatConfig(t)
                )
              : S,
            i = this._canAdjustMonth(t, -1, E, N)
              ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" +
                S +
                "'><span class='ui-icon ui-icon-circle-triangle-" +
                (I ? "e" : "w") +
                "'>" +
                S +
                "</span></a>"
              : T
              ? ""
              : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" +
                S +
                "'><span class='ui-icon ui-icon-circle-triangle-" +
                (I ? "e" : "w") +
                "'>" +
                S +
                "</span></a>",
            S = this._get(t, "nextText"),
            S = P
              ? this.formatDate(
                  S,
                  this._daylightSavingAdjust(new Date(E, N + z, 1)),
                  this._getFormatConfig(t)
                )
              : S,
            s = this._canAdjustMonth(t, 1, E, N)
              ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" +
                S +
                "'><span class='ui-icon ui-icon-circle-triangle-" +
                (I ? "w" : "e") +
                "'>" +
                S +
                "</span></a>"
              : T
              ? ""
              : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" +
                S +
                "'><span class='ui-icon ui-icon-circle-triangle-" +
                (I ? "w" : "e") +
                "'>" +
                S +
                "</span></a>",
            z = this._get(t, "currentText"),
            T = this._get(t, "gotoCurrent") && t.currentDay ? U : q,
            z = P ? this.formatDate(z, T, this._getFormatConfig(t)) : z,
            S = t.inline
              ? ""
              : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" +
                this._get(t, "closeText") +
                "</button>",
            P = D
              ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" +
                (I ? S : "") +
                (this._isInRange(t, T)
                  ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" +
                    z +
                    "</button>"
                  : "") +
                (I ? "" : S) +
                "</div>"
              : "",
            n = parseInt(this._get(t, "firstDay"), 10),
            n = isNaN(n) ? 0 : n,
            o = this._get(t, "showWeek"),
            W = this._get(t, "dayNames"),
            O = this._get(t, "dayNamesMin"),
            F = this._get(t, "monthNames"),
            R = this._get(t, "monthNamesShort"),
            a = this._get(t, "beforeShowDay"),
            r = this._get(t, "showOtherMonths"),
            L = this._get(t, "selectOtherMonths"),
            h = this._getDefaultDate(t),
            l = "",
            u = 0;
          u < M[0];
          u++
        ) {
          for (d = "", this.maxRows = 4, p = 0; p < M[1]; p++) {
            if (
              ((f = this._daylightSavingAdjust(new Date(E, N, t.selectedDay))),
              (m = " ui-corner-all"),
              (g = ""),
              K)
            ) {
              if (((g += "<div class='ui-datepicker-group"), 1 < M[1]))
                switch (p) {
                  case 0:
                    (g += " ui-datepicker-group-first"),
                      (m = " ui-corner-" + (I ? "right" : "left"));
                    break;
                  case M[1] - 1:
                    (g += " ui-datepicker-group-last"),
                      (m = " ui-corner-" + (I ? "left" : "right"));
                    break;
                  default:
                    (g += " ui-datepicker-group-middle"), (m = "");
                }
              g += "'>";
            }
            for (
              g +=
                "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" +
                m +
                "'>" +
                (/all|left/.test(m) && 0 === u ? (I ? s : i) : "") +
                (/all|right/.test(m) && 0 === u ? (I ? i : s) : "") +
                this._generateMonthYearHeader(
                  t,
                  N,
                  E,
                  H,
                  A,
                  0 < u || 0 < p,
                  F,
                  R
                ) +
                "</div><table class='ui-datepicker-calendar'><thead><tr>",
                v = o
                  ? "<th class='ui-datepicker-week-col'>" +
                    this._get(t, "weekHeader") +
                    "</th>"
                  : "",
                c = 0;
              c < 7;
              c++
            )
              v +=
                "<th scope='col'" +
                (5 <= (c + n + 6) % 7
                  ? " class='ui-datepicker-week-end'"
                  : "") +
                "><span title='" +
                W[(Y = (c + n) % 7)] +
                "'>" +
                O[Y] +
                "</span></th>";
            for (
              g += v + "</tr></thead><tbody>",
                b = this._getDaysInMonth(E, N),
                E === t.selectedYear &&
                  N === t.selectedMonth &&
                  (t.selectedDay = Math.min(t.selectedDay, b)),
                _ = (this._getFirstDayOfMonth(E, N) - n + 7) % 7,
                b = Math.ceil((_ + b) / 7),
                y = K && this.maxRows > b ? this.maxRows : b,
                this.maxRows = y,
                w = this._daylightSavingAdjust(new Date(E, N, 1 - _)),
                B = 0;
              B < y;
              B++
            ) {
              for (
                g += "<tr>",
                  j = o
                    ? "<td class='ui-datepicker-week-col'>" +
                      this._get(t, "calculateWeek")(w) +
                      "</td>"
                    : "",
                  c = 0;
                c < 7;
                c++
              )
                (x = a ? a.apply(t.input ? t.input[0] : null, [w]) : [!0, ""]),
                  (C =
                    ((k = w.getMonth() !== N) && !L) ||
                    !x[0] ||
                    (H && w < H) ||
                    (A && A < w)),
                  (j +=
                    "<td class='" +
                    (5 <= (c + n + 6) % 7 ? " ui-datepicker-week-end" : "") +
                    (k ? " ui-datepicker-other-month" : "") +
                    ((w.getTime() === f.getTime() &&
                      N === t.selectedMonth &&
                      t._keyEvent) ||
                    (h.getTime() === w.getTime() && h.getTime() === f.getTime())
                      ? " " + this._dayOverClass
                      : "") +
                    (C
                      ? " " + this._unselectableClass + " ui-state-disabled"
                      : "") +
                    (k && !r
                      ? ""
                      : " " +
                        x[1] +
                        (w.getTime() === U.getTime()
                          ? " " + this._currentClass
                          : "") +
                        (w.getTime() === q.getTime()
                          ? " ui-datepicker-today"
                          : "")) +
                    "'" +
                    ((k && !r) || !x[2]
                      ? ""
                      : " title='" + x[2].replace(/'/g, "&#39;") + "'") +
                    (C
                      ? ""
                      : " data-handler='selectDay' data-event='click' data-month='" +
                        w.getMonth() +
                        "' data-year='" +
                        w.getFullYear() +
                        "'") +
                    ">" +
                    (k && !r
                      ? "&#xa0;"
                      : C
                      ? "<span class='ui-state-default'>" +
                        w.getDate() +
                        "</span>"
                      : "<a class='ui-state-default" +
                        (w.getTime() === q.getTime()
                          ? " ui-state-highlight"
                          : "") +
                        (w.getTime() === U.getTime()
                          ? " ui-state-active"
                          : "") +
                        (k ? " ui-priority-secondary" : "") +
                        "' href='#'>" +
                        w.getDate() +
                        "</a>") +
                    "</td>"),
                  w.setDate(w.getDate() + 1),
                  (w = this._daylightSavingAdjust(w));
              g += j + "</tr>";
            }
            11 < ++N && ((N = 0), E++),
              (d += g +=
                "</tbody></table>" +
                (K
                  ? "</div>" +
                    (0 < M[0] && p === M[1] - 1
                      ? "<div class='ui-datepicker-row-break'></div>"
                      : "")
                  : ""));
          }
          l += d;
        }
        return (l += P), (t._keyEvent = !1), l;
      },
      _generateMonthYearHeader: function (t, e, i, s, n, o, a, r) {
        var h,
          l,
          c,
          u,
          d,
          p,
          f,
          m = this._get(t, "changeMonth"),
          g = this._get(t, "changeYear"),
          v = this._get(t, "showMonthAfterYear"),
          _ = "<div class='ui-datepicker-title'>",
          b = "";
        if (o || !m)
          b += "<span class='ui-datepicker-month'>" + a[e] + "</span>";
        else {
          for (
            h = s && s.getFullYear() === i,
              l = n && n.getFullYear() === i,
              b +=
                "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>",
              c = 0;
            c < 12;
            c++
          )
            (!h || c >= s.getMonth()) &&
              (!l || c <= n.getMonth()) &&
              (b +=
                "<option value='" +
                c +
                "'" +
                (c === e ? " selected='selected'" : "") +
                ">" +
                r[c] +
                "</option>");
          b += "</select>";
        }
        if ((v || (_ += b + (!o && m && g ? "" : "&#xa0;")), !t.yearshtml))
          if (((t.yearshtml = ""), o || !g))
            _ += "<span class='ui-datepicker-year'>" + i + "</span>";
          else {
            for (
              a = this._get(t, "yearRange").split(":"),
                u = new Date().getFullYear(),
                p = (d = function (t) {
                  t = t.match(/c[+\-].*/)
                    ? i + parseInt(t.substring(1), 10)
                    : t.match(/[+\-].*/)
                    ? u + parseInt(t, 10)
                    : parseInt(t, 10);
                  return isNaN(t) ? u : t;
                })(a[0]),
                f = Math.max(p, d(a[1] || "")),
                p = s ? Math.max(p, s.getFullYear()) : p,
                f = n ? Math.min(f, n.getFullYear()) : f,
                t.yearshtml +=
                  "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";
              p <= f;
              p++
            )
              t.yearshtml +=
                "<option value='" +
                p +
                "'" +
                (p === i ? " selected='selected'" : "") +
                ">" +
                p +
                "</option>";
            (t.yearshtml += "</select>"),
              (_ += t.yearshtml),
              (t.yearshtml = null);
          }
        return (
          (_ += this._get(t, "yearSuffix")),
          v && (_ += (!o && m && g ? "" : "&#xa0;") + b),
          (_ += "</div>")
        );
      },
      _adjustInstDate: function (t, e, i) {
        var s = t.drawYear + ("Y" === i ? e : 0),
          n = t.drawMonth + ("M" === i ? e : 0),
          e =
            Math.min(t.selectedDay, this._getDaysInMonth(s, n)) +
            ("D" === i ? e : 0),
          s = this._restrictMinMax(
            t,
            this._daylightSavingAdjust(new Date(s, n, e))
          );
        (t.selectedDay = s.getDate()),
          (t.drawMonth = t.selectedMonth = s.getMonth()),
          (t.drawYear = t.selectedYear = s.getFullYear()),
          ("M" !== i && "Y" !== i) || this._notifyChange(t);
      },
      _restrictMinMax: function (t, e) {
        var i = this._getMinMaxDate(t, "min"),
          t = this._getMinMaxDate(t, "max"),
          i = i && e < i ? i : e;
        return t && t < i ? t : i;
      },
      _notifyChange: function (t) {
        var e = this._get(t, "onChangeMonthYear");
        e &&
          e.apply(t.input ? t.input[0] : null, [
            t.selectedYear,
            t.selectedMonth + 1,
            t,
          ]);
      },
      _getNumberOfMonths: function (t) {
        t = this._get(t, "numberOfMonths");
        return null == t ? [1, 1] : "number" == typeof t ? [1, t] : t;
      },
      _getMinMaxDate: function (t, e) {
        return this._determineDate(t, this._get(t, e + "Date"), null);
      },
      _getDaysInMonth: function (t, e) {
        return 32 - this._daylightSavingAdjust(new Date(t, e, 32)).getDate();
      },
      _getFirstDayOfMonth: function (t, e) {
        return new Date(t, e, 1).getDay();
      },
      _canAdjustMonth: function (t, e, i, s) {
        var n = this._getNumberOfMonths(t),
          i = this._daylightSavingAdjust(
            new Date(i, s + (e < 0 ? e : n[0] * n[1]), 1)
          );
        return (
          e < 0 &&
            i.setDate(this._getDaysInMonth(i.getFullYear(), i.getMonth())),
          this._isInRange(t, i)
        );
      },
      _isInRange: function (t, e) {
        var i,
          s = this._getMinMaxDate(t, "min"),
          n = this._getMinMaxDate(t, "max"),
          o = null,
          a = null,
          t = this._get(t, "yearRange");
        return (
          t &&
            ((t = t.split(":")),
            (i = new Date().getFullYear()),
            (o = parseInt(t[0], 10)),
            (a = parseInt(t[1], 10)),
            t[0].match(/[+\-].*/) && (o += i),
            t[1].match(/[+\-].*/) && (a += i)),
          (!s || e.getTime() >= s.getTime()) &&
            (!n || e.getTime() <= n.getTime()) &&
            (!o || e.getFullYear() >= o) &&
            (!a || e.getFullYear() <= a)
        );
      },
      _getFormatConfig: function (t) {
        var e = this._get(t, "shortYearCutoff");
        return {
          shortYearCutoff: (e =
            "string" != typeof e
              ? e
              : (new Date().getFullYear() % 100) + parseInt(e, 10)),
          dayNamesShort: this._get(t, "dayNamesShort"),
          dayNames: this._get(t, "dayNames"),
          monthNamesShort: this._get(t, "monthNamesShort"),
          monthNames: this._get(t, "monthNames"),
        };
      },
      _formatDate: function (t, e, i, s) {
        e ||
          ((t.currentDay = t.selectedDay),
          (t.currentMonth = t.selectedMonth),
          (t.currentYear = t.selectedYear));
        s = e
          ? "object" == typeof e
            ? e
            : this._daylightSavingAdjust(new Date(s, i, e))
          : this._daylightSavingAdjust(
              new Date(t.currentYear, t.currentMonth, t.currentDay)
            );
        return this.formatDate(
          this._get(t, "dateFormat"),
          s,
          this._getFormatConfig(t)
        );
      },
    }),
    (x.fn.datepicker = function (t) {
      if (!this.length) return this;
      x.datepicker.initialized ||
        (x(document).mousedown(x.datepicker._checkExternalClick),
        (x.datepicker.initialized = !0)),
        0 === x("#" + x.datepicker._mainDivId).length &&
          x("body").append(x.datepicker.dpDiv);
      var e = Array.prototype.slice.call(arguments, 1);
      return ("string" == typeof t &&
        ("isDisabled" === t || "getDate" === t || "widget" === t)) ||
        ("option" === t &&
          2 === arguments.length &&
          "string" == typeof arguments[1])
        ? x.datepicker["_" + t + "Datepicker"].apply(
            x.datepicker,
            [this[0]].concat(e)
          )
        : this.each(function () {
            "string" == typeof t
              ? x.datepicker["_" + t + "Datepicker"].apply(
                  x.datepicker,
                  [this].concat(e)
                )
              : x.datepicker._attachDatepicker(this, t);
          });
    }),
    (x.datepicker = new Q()),
    (x.datepicker.initialized = !1),
    (x.datepicker.uuid = new Date().getTime()),
    (x.datepicker.version = "1.11.4");
  x.datepicker,
    x.widget("ui.draggable", x.ui.mouse, {
      version: "1.11.4",
      widgetEventPrefix: "drag",
      options: {
        addClasses: !0,
        appendTo: "parent",
        axis: !1,
        connectToSortable: !1,
        containment: !1,
        cursor: "auto",
        cursorAt: !1,
        grid: !1,
        handle: !1,
        helper: "original",
        iframeFix: !1,
        opacity: !1,
        refreshPositions: !1,
        revert: !1,
        revertDuration: 500,
        scope: "default",
        scroll: !0,
        scrollSensitivity: 20,
        scrollSpeed: 20,
        snap: !1,
        snapMode: "both",
        snapTolerance: 20,
        stack: !1,
        zIndex: !1,
        drag: null,
        start: null,
        stop: null,
      },
      _create: function () {
        "original" === this.options.helper && this._setPositionRelative(),
          this.options.addClasses && this.element.addClass("ui-draggable"),
          this.options.disabled &&
            this.element.addClass("ui-draggable-disabled"),
          this._setHandleClassName(),
          this._mouseInit();
      },
      _setOption: function (t, e) {
        this._super(t, e),
          "handle" === t &&
            (this._removeHandleClassName(), this._setHandleClassName());
      },
      _destroy: function () {
        (this.helper || this.element).is(".ui-draggable-dragging")
          ? (this.destroyOnClear = !0)
          : (this.element.removeClass(
              "ui-draggable ui-draggable-dragging ui-draggable-disabled"
            ),
            this._removeHandleClassName(),
            this._mouseDestroy());
      },
      _mouseCapture: function (t) {
        var e = this.options;
        return (
          this._blurActiveElement(t),
          !(
            this.helper ||
            e.disabled ||
            0 < x(t.target).closest(".ui-resizable-handle").length
          ) &&
            ((this.handle = this._getHandle(t)),
            !!this.handle &&
              (this._blockFrames(!0 === e.iframeFix ? "iframe" : e.iframeFix),
              !0))
        );
      },
      _blockFrames: function (t) {
        this.iframeBlocks = this.document.find(t).map(function () {
          var t = x(this);
          return x("<div>")
            .css("position", "absolute")
            .appendTo(t.parent())
            .outerWidth(t.outerWidth())
            .outerHeight(t.outerHeight())
            .offset(t.offset())[0];
        });
      },
      _unblockFrames: function () {
        this.iframeBlocks &&
          (this.iframeBlocks.remove(), delete this.iframeBlocks);
      },
      _blurActiveElement: function (t) {
        var e = this.document[0];
        if (this.handleElement.is(t.target))
          try {
            e.activeElement &&
              "body" !== e.activeElement.nodeName.toLowerCase() &&
              x(e.activeElement).blur();
          } catch (t) {}
      },
      _mouseStart: function (t) {
        var e = this.options;
        return (
          (this.helper = this._createHelper(t)),
          this.helper.addClass("ui-draggable-dragging"),
          this._cacheHelperProportions(),
          x.ui.ddmanager && (x.ui.ddmanager.current = this),
          this._cacheMargins(),
          (this.cssPosition = this.helper.css("position")),
          (this.scrollParent = this.helper.scrollParent(!0)),
          (this.offsetParent = this.helper.offsetParent()),
          (this.hasFixedAncestor =
            0 <
            this.helper.parents().filter(function () {
              return "fixed" === x(this).css("position");
            }).length),
          (this.positionAbs = this.element.offset()),
          this._refreshOffsets(t),
          (this.originalPosition = this.position =
            this._generatePosition(t, !1)),
          (this.originalPageX = t.pageX),
          (this.originalPageY = t.pageY),
          e.cursorAt && this._adjustOffsetFromHelper(e.cursorAt),
          this._setContainment(),
          !1 === this._trigger("start", t)
            ? (this._clear(), !1)
            : (this._cacheHelperProportions(),
              x.ui.ddmanager &&
                !e.dropBehaviour &&
                x.ui.ddmanager.prepareOffsets(this, t),
              this._normalizeRightBottom(),
              this._mouseDrag(t, !0),
              x.ui.ddmanager && x.ui.ddmanager.dragStart(this, t),
              !0)
        );
      },
      _refreshOffsets: function (t) {
        (this.offset = {
          top: this.positionAbs.top - this.margins.top,
          left: this.positionAbs.left - this.margins.left,
          scroll: !1,
          parent: this._getParentOffset(),
          relative: this._getRelativeOffset(),
        }),
          (this.offset.click = {
            left: t.pageX - this.offset.left,
            top: t.pageY - this.offset.top,
          });
      },
      _mouseDrag: function (t, e) {
        if (
          (this.hasFixedAncestor &&
            (this.offset.parent = this._getParentOffset()),
          (this.position = this._generatePosition(t, !0)),
          (this.positionAbs = this._convertPositionTo("absolute")),
          !e)
        ) {
          e = this._uiHash();
          if (!1 === this._trigger("drag", t, e)) return this._mouseUp({}), !1;
          this.position = e.position;
        }
        return (
          (this.helper[0].style.left = this.position.left + "px"),
          (this.helper[0].style.top = this.position.top + "px"),
          x.ui.ddmanager && x.ui.ddmanager.drag(this, t),
          !1
        );
      },
      _mouseStop: function (t) {
        var e = this,
          i = !1;
        return (
          x.ui.ddmanager &&
            !this.options.dropBehaviour &&
            (i = x.ui.ddmanager.drop(this, t)),
          this.dropped && ((i = this.dropped), (this.dropped = !1)),
          ("invalid" === this.options.revert && !i) ||
          ("valid" === this.options.revert && i) ||
          !0 === this.options.revert ||
          (x.isFunction(this.options.revert) &&
            this.options.revert.call(this.element, i))
            ? x(this.helper).animate(
                this.originalPosition,
                parseInt(this.options.revertDuration, 10),
                function () {
                  !1 !== e._trigger("stop", t) && e._clear();
                }
              )
            : !1 !== this._trigger("stop", t) && this._clear(),
          !1
        );
      },
      _mouseUp: function (t) {
        return (
          this._unblockFrames(),
          x.ui.ddmanager && x.ui.ddmanager.dragStop(this, t),
          this.handleElement.is(t.target) && this.element.focus(),
          x.ui.mouse.prototype._mouseUp.call(this, t)
        );
      },
      cancel: function () {
        return (
          this.helper.is(".ui-draggable-dragging")
            ? this._mouseUp({})
            : this._clear(),
          this
        );
      },
      _getHandle: function (t) {
        return (
          !this.options.handle ||
          !!x(t.target).closest(this.element.find(this.options.handle)).length
        );
      },
      _setHandleClassName: function () {
        (this.handleElement = this.options.handle
          ? this.element.find(this.options.handle)
          : this.element),
          this.handleElement.addClass("ui-draggable-handle");
      },
      _removeHandleClassName: function () {
        this.handleElement.removeClass("ui-draggable-handle");
      },
      _createHelper: function (t) {
        var e = this.options,
          i = x.isFunction(e.helper),
          t = i
            ? x(e.helper.apply(this.element[0], [t]))
            : "clone" === e.helper
            ? this.element.clone().removeAttr("id")
            : this.element;
        return (
          t.parents("body").length ||
            t.appendTo(
              "parent" === e.appendTo ? this.element[0].parentNode : e.appendTo
            ),
          i && t[0] === this.element[0] && this._setPositionRelative(),
          t[0] === this.element[0] ||
            /(fixed|absolute)/.test(t.css("position")) ||
            t.css("position", "absolute"),
          t
        );
      },
      _setPositionRelative: function () {
        /^(?:r|a|f)/.test(this.element.css("position")) ||
          (this.element[0].style.position = "relative");
      },
      _adjustOffsetFromHelper: function (t) {
        "string" == typeof t && (t = t.split(" ")),
          "left" in (t = x.isArray(t) ? { left: +t[0], top: +t[1] || 0 } : t) &&
            (this.offset.click.left = t.left + this.margins.left),
          "right" in t &&
            (this.offset.click.left =
              this.helperProportions.width - t.right + this.margins.left),
          "top" in t && (this.offset.click.top = t.top + this.margins.top),
          "bottom" in t &&
            (this.offset.click.top =
              this.helperProportions.height - t.bottom + this.margins.top);
      },
      _isRootNode: function (t) {
        return /(html|body)/i.test(t.tagName) || t === this.document[0];
      },
      _getParentOffset: function () {
        var t = this.offsetParent.offset(),
          e = this.document[0];
        return (
          "absolute" === this.cssPosition &&
            this.scrollParent[0] !== e &&
            x.contains(this.scrollParent[0], this.offsetParent[0]) &&
            ((t.left += this.scrollParent.scrollLeft()),
            (t.top += this.scrollParent.scrollTop())),
          {
            top:
              (t = this._isRootNode(this.offsetParent[0])
                ? { top: 0, left: 0 }
                : t).top +
              (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
            left:
              t.left +
              (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0),
          }
        );
      },
      _getRelativeOffset: function () {
        var t, e;
        return "relative" !== this.cssPosition
          ? { top: 0, left: 0 }
          : ((t = this.element.position()),
            (e = this._isRootNode(this.scrollParent[0])),
            {
              top:
                t.top -
                (parseInt(this.helper.css("top"), 10) || 0) +
                (e ? 0 : this.scrollParent.scrollTop()),
              left:
                t.left -
                (parseInt(this.helper.css("left"), 10) || 0) +
                (e ? 0 : this.scrollParent.scrollLeft()),
            });
      },
      _cacheMargins: function () {
        this.margins = {
          left: parseInt(this.element.css("marginLeft"), 10) || 0,
          top: parseInt(this.element.css("marginTop"), 10) || 0,
          right: parseInt(this.element.css("marginRight"), 10) || 0,
          bottom: parseInt(this.element.css("marginBottom"), 10) || 0,
        };
      },
      _cacheHelperProportions: function () {
        this.helperProportions = {
          width: this.helper.outerWidth(),
          height: this.helper.outerHeight(),
        };
      },
      _setContainment: function () {
        var t,
          e = this.options,
          i = this.document[0];
        (this.relativeContainer = null),
          e.containment
            ? "window" === e.containment
              ? (this.containment = [
                  x(window).scrollLeft() -
                    this.offset.relative.left -
                    this.offset.parent.left,
                  x(window).scrollTop() -
                    this.offset.relative.top -
                    this.offset.parent.top,
                  x(window).scrollLeft() +
                    x(window).width() -
                    this.helperProportions.width -
                    this.margins.left,
                  x(window).scrollTop() +
                    (x(window).height() || i.body.parentNode.scrollHeight) -
                    this.helperProportions.height -
                    this.margins.top,
                ])
              : "document" === e.containment
              ? (this.containment = [
                  0,
                  0,
                  x(i).width() -
                    this.helperProportions.width -
                    this.margins.left,
                  (x(i).height() || i.body.parentNode.scrollHeight) -
                    this.helperProportions.height -
                    this.margins.top,
                ])
              : e.containment.constructor === Array
              ? (this.containment = e.containment)
              : ("parent" === e.containment &&
                  (e.containment = this.helper[0].parentNode),
                (e = (i = x(e.containment))[0]) &&
                  ((t = /(scroll|auto)/.test(i.css("overflow"))),
                  (this.containment = [
                    (parseInt(i.css("borderLeftWidth"), 10) || 0) +
                      (parseInt(i.css("paddingLeft"), 10) || 0),
                    (parseInt(i.css("borderTopWidth"), 10) || 0) +
                      (parseInt(i.css("paddingTop"), 10) || 0),
                    (t
                      ? Math.max(e.scrollWidth, e.offsetWidth)
                      : e.offsetWidth) -
                      (parseInt(i.css("borderRightWidth"), 10) || 0) -
                      (parseInt(i.css("paddingRight"), 10) || 0) -
                      this.helperProportions.width -
                      this.margins.left -
                      this.margins.right,
                    (t
                      ? Math.max(e.scrollHeight, e.offsetHeight)
                      : e.offsetHeight) -
                      (parseInt(i.css("borderBottomWidth"), 10) || 0) -
                      (parseInt(i.css("paddingBottom"), 10) || 0) -
                      this.helperProportions.height -
                      this.margins.top -
                      this.margins.bottom,
                  ]),
                  (this.relativeContainer = i)))
            : (this.containment = null);
      },
      _convertPositionTo: function (t, e) {
        e = e || this.position;
        var t = "absolute" === t ? 1 : -1,
          i = this._isRootNode(this.scrollParent[0]);
        return {
          top:
            e.top +
            this.offset.relative.top * t +
            this.offset.parent.top * t -
            ("fixed" === this.cssPosition
              ? -this.offset.scroll.top
              : i
              ? 0
              : this.offset.scroll.top) *
              t,
          left:
            e.left +
            this.offset.relative.left * t +
            this.offset.parent.left * t -
            ("fixed" === this.cssPosition
              ? -this.offset.scroll.left
              : i
              ? 0
              : this.offset.scroll.left) *
              t,
        };
      },
      _generatePosition: function (t, e) {
        var i,
          s = this.options,
          n = this._isRootNode(this.scrollParent[0]),
          o = t.pageX,
          a = t.pageY;
        return (
          (n && this.offset.scroll) ||
            (this.offset.scroll = {
              top: this.scrollParent.scrollTop(),
              left: this.scrollParent.scrollLeft(),
            }),
          e &&
            (this.containment &&
              ((i = this.relativeContainer
                ? ((e = this.relativeContainer.offset()),
                  [
                    this.containment[0] + e.left,
                    this.containment[1] + e.top,
                    this.containment[2] + e.left,
                    this.containment[3] + e.top,
                  ])
                : this.containment),
              t.pageX - this.offset.click.left < i[0] &&
                (o = i[0] + this.offset.click.left),
              t.pageY - this.offset.click.top < i[1] &&
                (a = i[1] + this.offset.click.top),
              t.pageX - this.offset.click.left > i[2] &&
                (o = i[2] + this.offset.click.left),
              t.pageY - this.offset.click.top > i[3] &&
                (a = i[3] + this.offset.click.top)),
            s.grid &&
              ((e = s.grid[1]
                ? this.originalPageY +
                  Math.round((a - this.originalPageY) / s.grid[1]) * s.grid[1]
                : this.originalPageY),
              (a =
                !i ||
                e - this.offset.click.top >= i[1] ||
                e - this.offset.click.top > i[3]
                  ? e
                  : e - this.offset.click.top >= i[1]
                  ? e - s.grid[1]
                  : e + s.grid[1]),
              (t = s.grid[0]
                ? this.originalPageX +
                  Math.round((o - this.originalPageX) / s.grid[0]) * s.grid[0]
                : this.originalPageX),
              (o =
                !i ||
                t - this.offset.click.left >= i[0] ||
                t - this.offset.click.left > i[2]
                  ? t
                  : t - this.offset.click.left >= i[0]
                  ? t - s.grid[0]
                  : t + s.grid[0])),
            "y" === s.axis && (o = this.originalPageX),
            "x" === s.axis && (a = this.originalPageY)),
          {
            top:
              a -
              this.offset.click.top -
              this.offset.relative.top -
              this.offset.parent.top +
              ("fixed" === this.cssPosition
                ? -this.offset.scroll.top
                : n
                ? 0
                : this.offset.scroll.top),
            left:
              o -
              this.offset.click.left -
              this.offset.relative.left -
              this.offset.parent.left +
              ("fixed" === this.cssPosition
                ? -this.offset.scroll.left
                : n
                ? 0
                : this.offset.scroll.left),
          }
        );
      },
      _clear: function () {
        this.helper.removeClass("ui-draggable-dragging"),
          this.helper[0] === this.element[0] ||
            this.cancelHelperRemoval ||
            this.helper.remove(),
          (this.helper = null),
          (this.cancelHelperRemoval = !1),
          this.destroyOnClear && this.destroy();
      },
      _normalizeRightBottom: function () {
        "y" !== this.options.axis &&
          "auto" !== this.helper.css("right") &&
          (this.helper.width(this.helper.width()),
          this.helper.css("right", "auto")),
          "x" !== this.options.axis &&
            "auto" !== this.helper.css("bottom") &&
            (this.helper.height(this.helper.height()),
            this.helper.css("bottom", "auto"));
      },
      _trigger: function (t, e, i) {
        return (
          (i = i || this._uiHash()),
          x.ui.plugin.call(this, t, [e, i, this], !0),
          /^(drag|start|stop)/.test(t) &&
            ((this.positionAbs = this._convertPositionTo("absolute")),
            (i.offset = this.positionAbs)),
          x.Widget.prototype._trigger.call(this, t, e, i)
        );
      },
      plugins: {},
      _uiHash: function () {
        return {
          helper: this.helper,
          position: this.position,
          originalPosition: this.originalPosition,
          offset: this.positionAbs,
        };
      },
    }),
    x.ui.plugin.add("draggable", "connectToSortable", {
      start: function (e, t, i) {
        var s = x.extend({}, t, { item: i.element });
        (i.sortables = []),
          x(i.options.connectToSortable).each(function () {
            var t = x(this).sortable("instance");
            t &&
              !t.options.disabled &&
              (i.sortables.push(t),
              t.refreshPositions(),
              t._trigger("activate", e, s));
          });
      },
      stop: function (e, t, i) {
        var s = x.extend({}, t, { item: i.element });
        (i.cancelHelperRemoval = !1),
          x.each(i.sortables, function () {
            var t = this;
            t.isOver
              ? ((t.isOver = 0),
                (i.cancelHelperRemoval = !0),
                (t.cancelHelperRemoval = !1),
                (t._storedCSS = {
                  position: t.placeholder.css("position"),
                  top: t.placeholder.css("top"),
                  left: t.placeholder.css("left"),
                }),
                t._mouseStop(e),
                (t.options.helper = t.options._helper))
              : ((t.cancelHelperRemoval = !0), t._trigger("deactivate", e, s));
          });
      },
      drag: function (i, s, n) {
        x.each(n.sortables, function () {
          var t = !1,
            e = this;
          (e.positionAbs = n.positionAbs),
            (e.helperProportions = n.helperProportions),
            (e.offset.click = n.offset.click),
            e._intersectsWith(e.containerCache) &&
              ((t = !0),
              x.each(n.sortables, function () {
                return (
                  (this.positionAbs = n.positionAbs),
                  (this.helperProportions = n.helperProportions),
                  (this.offset.click = n.offset.click),
                  (t =
                    this !== e &&
                    this._intersectsWith(this.containerCache) &&
                    x.contains(e.element[0], this.element[0])
                      ? !1
                      : t)
                );
              })),
            t
              ? (e.isOver ||
                  ((e.isOver = 1),
                  (n._parent = s.helper.parent()),
                  (e.currentItem = s.helper
                    .appendTo(e.element)
                    .data("ui-sortable-item", !0)),
                  (e.options._helper = e.options.helper),
                  (e.options.helper = function () {
                    return s.helper[0];
                  }),
                  (i.target = e.currentItem[0]),
                  e._mouseCapture(i, !0),
                  e._mouseStart(i, !0, !0),
                  (e.offset.click.top = n.offset.click.top),
                  (e.offset.click.left = n.offset.click.left),
                  (e.offset.parent.left -=
                    n.offset.parent.left - e.offset.parent.left),
                  (e.offset.parent.top -=
                    n.offset.parent.top - e.offset.parent.top),
                  n._trigger("toSortable", i),
                  (n.dropped = e.element),
                  x.each(n.sortables, function () {
                    this.refreshPositions();
                  }),
                  (n.currentItem = n.element),
                  (e.fromOutside = n)),
                e.currentItem && (e._mouseDrag(i), (s.position = e.position)))
              : e.isOver &&
                ((e.isOver = 0),
                (e.cancelHelperRemoval = !0),
                (e.options._revert = e.options.revert),
                (e.options.revert = !1),
                e._trigger("out", i, e._uiHash(e)),
                e._mouseStop(i, !0),
                (e.options.revert = e.options._revert),
                (e.options.helper = e.options._helper),
                e.placeholder && e.placeholder.remove(),
                s.helper.appendTo(n._parent),
                n._refreshOffsets(i),
                (s.position = n._generatePosition(i, !0)),
                n._trigger("fromSortable", i),
                (n.dropped = !1),
                x.each(n.sortables, function () {
                  this.refreshPositions();
                }));
        });
      },
    }),
    x.ui.plugin.add("draggable", "cursor", {
      start: function (t, e, i) {
        var s = x("body"),
          i = i.options;
        s.css("cursor") && (i._cursor = s.css("cursor")),
          s.css("cursor", i.cursor);
      },
      stop: function (t, e, i) {
        i = i.options;
        i._cursor && x("body").css("cursor", i._cursor);
      },
    }),
    x.ui.plugin.add("draggable", "opacity", {
      start: function (t, e, i) {
        (e = x(e.helper)), (i = i.options);
        e.css("opacity") && (i._opacity = e.css("opacity")),
          e.css("opacity", i.opacity);
      },
      stop: function (t, e, i) {
        i = i.options;
        i._opacity && x(e.helper).css("opacity", i._opacity);
      },
    }),
    x.ui.plugin.add("draggable", "scroll", {
      start: function (t, e, i) {
        i.scrollParentNotHidden ||
          (i.scrollParentNotHidden = i.helper.scrollParent(!1)),
          i.scrollParentNotHidden[0] !== i.document[0] &&
            "HTML" !== i.scrollParentNotHidden[0].tagName &&
            (i.overflowOffset = i.scrollParentNotHidden.offset());
      },
      drag: function (t, e, i) {
        var s = i.options,
          n = !1,
          o = i.scrollParentNotHidden[0],
          a = i.document[0];
        o !== a && "HTML" !== o.tagName
          ? ((s.axis && "x" === s.axis) ||
              (i.overflowOffset.top + o.offsetHeight - t.pageY <
              s.scrollSensitivity
                ? (o.scrollTop = n = o.scrollTop + s.scrollSpeed)
                : t.pageY - i.overflowOffset.top < s.scrollSensitivity &&
                  (o.scrollTop = n = o.scrollTop - s.scrollSpeed)),
            (s.axis && "y" === s.axis) ||
              (i.overflowOffset.left + o.offsetWidth - t.pageX <
              s.scrollSensitivity
                ? (o.scrollLeft = n = o.scrollLeft + s.scrollSpeed)
                : t.pageX - i.overflowOffset.left < s.scrollSensitivity &&
                  (o.scrollLeft = n = o.scrollLeft - s.scrollSpeed)))
          : ((s.axis && "x" === s.axis) ||
              (t.pageY - x(a).scrollTop() < s.scrollSensitivity
                ? (n = x(a).scrollTop(x(a).scrollTop() - s.scrollSpeed))
                : x(window).height() - (t.pageY - x(a).scrollTop()) <
                    s.scrollSensitivity &&
                  (n = x(a).scrollTop(x(a).scrollTop() + s.scrollSpeed))),
            (s.axis && "y" === s.axis) ||
              (t.pageX - x(a).scrollLeft() < s.scrollSensitivity
                ? (n = x(a).scrollLeft(x(a).scrollLeft() - s.scrollSpeed))
                : x(window).width() - (t.pageX - x(a).scrollLeft()) <
                    s.scrollSensitivity &&
                  (n = x(a).scrollLeft(x(a).scrollLeft() + s.scrollSpeed)))),
          !1 !== n &&
            x.ui.ddmanager &&
            !s.dropBehaviour &&
            x.ui.ddmanager.prepareOffsets(i, t);
      },
    }),
    x.ui.plugin.add("draggable", "snap", {
      start: function (t, e, i) {
        var s = i.options;
        (i.snapElements = []),
          x(
            s.snap.constructor !== String
              ? s.snap.items || ":data(ui-draggable)"
              : s.snap
          ).each(function () {
            var t = x(this),
              e = t.offset();
            this !== i.element[0] &&
              i.snapElements.push({
                item: this,
                width: t.outerWidth(),
                height: t.outerHeight(),
                top: e.top,
                left: e.left,
              });
          });
      },
      drag: function (t, e, i) {
        for (
          var s,
            n,
            o,
            a,
            r,
            h,
            l,
            c,
            u,
            d = i.options,
            p = d.snapTolerance,
            f = e.offset.left,
            m = f + i.helperProportions.width,
            g = e.offset.top,
            v = g + i.helperProportions.height,
            _ = i.snapElements.length - 1;
          0 <= _;
          _--
        )
          (h =
            (r = i.snapElements[_].left - i.margins.left) +
            i.snapElements[_].width),
            (c =
              (l = i.snapElements[_].top - i.margins.top) +
              i.snapElements[_].height),
            m < r - p ||
            h + p < f ||
            v < l - p ||
            c + p < g ||
            !x.contains(
              i.snapElements[_].item.ownerDocument,
              i.snapElements[_].item
            )
              ? (i.snapElements[_].snapping &&
                  i.options.snap.release &&
                  i.options.snap.release.call(
                    i.element,
                    t,
                    x.extend(i._uiHash(), { snapItem: i.snapElements[_].item })
                  ),
                (i.snapElements[_].snapping = !1))
              : ("inner" !== d.snapMode &&
                  ((s = Math.abs(l - v) <= p),
                  (n = Math.abs(c - g) <= p),
                  (o = Math.abs(r - m) <= p),
                  (a = Math.abs(h - f) <= p),
                  s &&
                    (e.position.top = i._convertPositionTo("relative", {
                      top: l - i.helperProportions.height,
                      left: 0,
                    }).top),
                  n &&
                    (e.position.top = i._convertPositionTo("relative", {
                      top: c,
                      left: 0,
                    }).top),
                  o &&
                    (e.position.left = i._convertPositionTo("relative", {
                      top: 0,
                      left: r - i.helperProportions.width,
                    }).left),
                  a &&
                    (e.position.left = i._convertPositionTo("relative", {
                      top: 0,
                      left: h,
                    }).left)),
                (u = s || n || o || a),
                "outer" !== d.snapMode &&
                  ((s = Math.abs(l - g) <= p),
                  (n = Math.abs(c - v) <= p),
                  (o = Math.abs(r - f) <= p),
                  (a = Math.abs(h - m) <= p),
                  s &&
                    (e.position.top = i._convertPositionTo("relative", {
                      top: l,
                      left: 0,
                    }).top),
                  n &&
                    (e.position.top = i._convertPositionTo("relative", {
                      top: c - i.helperProportions.height,
                      left: 0,
                    }).top),
                  o &&
                    (e.position.left = i._convertPositionTo("relative", {
                      top: 0,
                      left: r,
                    }).left),
                  a &&
                    (e.position.left = i._convertPositionTo("relative", {
                      top: 0,
                      left: h - i.helperProportions.width,
                    }).left)),
                !i.snapElements[_].snapping &&
                  (s || n || o || a || u) &&
                  i.options.snap.snap &&
                  i.options.snap.snap.call(
                    i.element,
                    t,
                    x.extend(i._uiHash(), { snapItem: i.snapElements[_].item })
                  ),
                (i.snapElements[_].snapping = s || n || o || a || u));
      },
    }),
    x.ui.plugin.add("draggable", "stack", {
      start: function (t, e, i) {
        var s,
          i = i.options,
          i = x.makeArray(x(i.stack)).sort(function (t, e) {
            return (
              (parseInt(x(t).css("zIndex"), 10) || 0) -
              (parseInt(x(e).css("zIndex"), 10) || 0)
            );
          });
        i.length &&
          ((s = parseInt(x(i[0]).css("zIndex"), 10) || 0),
          x(i).each(function (t) {
            x(this).css("zIndex", s + t);
          }),
          this.css("zIndex", s + i.length));
      },
    }),
    x.ui.plugin.add("draggable", "zIndex", {
      start: function (t, e, i) {
        (e = x(e.helper)), (i = i.options);
        e.css("zIndex") && (i._zIndex = e.css("zIndex")),
          e.css("zIndex", i.zIndex);
      },
      stop: function (t, e, i) {
        i = i.options;
        i._zIndex && x(e.helper).css("zIndex", i._zIndex);
      },
    }),
    x.ui.draggable,
    x.widget("ui.resizable", x.ui.mouse, {
      version: "1.11.4",
      widgetEventPrefix: "resize",
      options: {
        alsoResize: !1,
        animate: !1,
        animateDuration: "slow",
        animateEasing: "swing",
        aspectRatio: !1,
        autoHide: !1,
        containment: !1,
        ghost: !1,
        grid: !1,
        handles: "e,s,se",
        helper: !1,
        maxHeight: null,
        maxWidth: null,
        minHeight: 10,
        minWidth: 10,
        zIndex: 90,
        resize: null,
        start: null,
        stop: null,
      },
      _num: function (t) {
        return parseInt(t, 10) || 0;
      },
      _isNumber: function (t) {
        return !isNaN(parseInt(t, 10));
      },
      _hasScroll: function (t, e) {
        var i;
        return (
          "hidden" !== x(t).css("overflow") &&
          ((i = !1),
          0 < t[(e = e && "left" === e ? "scrollLeft" : "scrollTop")] ||
            ((t[e] = 1), (i = 0 < t[e]), (t[e] = 0), i))
        );
      },
      _create: function () {
        var t,
          e,
          i,
          s,
          n = this,
          o = this.options;
        if (
          (this.element.addClass("ui-resizable"),
          x.extend(this, {
            _aspectRatio: !!o.aspectRatio,
            aspectRatio: o.aspectRatio,
            originalElement: this.element,
            _proportionallyResizeElements: [],
            _helper:
              o.helper || o.ghost || o.animate
                ? o.helper || "ui-resizable-helper"
                : null,
          }),
          this.element[0].nodeName.match(
            /^(canvas|textarea|input|select|button|img)$/i
          ) &&
            (this.element.wrap(
              x("<div class='ui-wrapper' style='overflow: hidden;'></div>").css(
                {
                  position: this.element.css("position"),
                  width: this.element.outerWidth(),
                  height: this.element.outerHeight(),
                  top: this.element.css("top"),
                  left: this.element.css("left"),
                }
              )
            ),
            (this.element = this.element
              .parent()
              .data("ui-resizable", this.element.resizable("instance"))),
            (this.elementIsWrapper = !0),
            this.element.css({
              marginLeft: this.originalElement.css("marginLeft"),
              marginTop: this.originalElement.css("marginTop"),
              marginRight: this.originalElement.css("marginRight"),
              marginBottom: this.originalElement.css("marginBottom"),
            }),
            this.originalElement.css({
              marginLeft: 0,
              marginTop: 0,
              marginRight: 0,
              marginBottom: 0,
            }),
            (this.originalResizeStyle = this.originalElement.css("resize")),
            this.originalElement.css("resize", "none"),
            this._proportionallyResizeElements.push(
              this.originalElement.css({
                position: "static",
                zoom: 1,
                display: "block",
              })
            ),
            this.originalElement.css({
              margin: this.originalElement.css("margin"),
            }),
            this._proportionallyResize()),
          (this.handles =
            o.handles ||
            (x(".ui-resizable-handle", this.element).length
              ? {
                  n: ".ui-resizable-n",
                  e: ".ui-resizable-e",
                  s: ".ui-resizable-s",
                  w: ".ui-resizable-w",
                  se: ".ui-resizable-se",
                  sw: ".ui-resizable-sw",
                  ne: ".ui-resizable-ne",
                  nw: ".ui-resizable-nw",
                }
              : "e,s,se")),
          (this._handles = x()),
          this.handles.constructor === String)
        )
          for (
            "all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"),
              t = this.handles.split(","),
              this.handles = {},
              e = 0;
            e < t.length;
            e++
          )
            (i = x.trim(t[e])),
              (s = x(
                "<div class='ui-resizable-handle " +
                  ("ui-resizable-" + i) +
                  "'></div>"
              )).css({ zIndex: o.zIndex }),
              "se" === i && s.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),
              (this.handles[i] = ".ui-resizable-" + i),
              this.element.append(s);
        (this._renderAxis = function (t) {
          var e, i, s;
          for (e in ((t = t || this.element), this.handles))
            this.handles[e].constructor === String
              ? (this.handles[e] = this.element
                  .children(this.handles[e])
                  .first()
                  .show())
              : (this.handles[e].jquery || this.handles[e].nodeType) &&
                ((this.handles[e] = x(this.handles[e])),
                this._on(this.handles[e], { mousedown: n._mouseDown })),
              this.elementIsWrapper &&
                this.originalElement[0].nodeName.match(
                  /^(textarea|input|select|button)$/i
                ) &&
                ((s = x(this.handles[e], this.element)),
                (s = /sw|ne|nw|se|n|s/.test(e)
                  ? s.outerHeight()
                  : s.outerWidth()),
                (i = [
                  "padding",
                  /ne|nw|n/.test(e)
                    ? "Top"
                    : /se|sw|s/.test(e)
                    ? "Bottom"
                    : /^e$/.test(e)
                    ? "Right"
                    : "Left",
                ].join("")),
                t.css(i, s),
                this._proportionallyResize()),
              (this._handles = this._handles.add(this.handles[e]));
        }),
          this._renderAxis(this.element),
          (this._handles = this._handles.add(
            this.element.find(".ui-resizable-handle")
          )),
          this._handles.disableSelection(),
          this._handles.mouseover(function () {
            n.resizing ||
              (this.className &&
                (s = this.className.match(
                  /ui-resizable-(se|sw|ne|nw|n|e|s|w)/i
                )),
              (n.axis = s && s[1] ? s[1] : "se"));
          }),
          o.autoHide &&
            (this._handles.hide(),
            x(this.element)
              .addClass("ui-resizable-autohide")
              .mouseenter(function () {
                o.disabled ||
                  (x(this).removeClass("ui-resizable-autohide"),
                  n._handles.show());
              })
              .mouseleave(function () {
                o.disabled ||
                  n.resizing ||
                  (x(this).addClass("ui-resizable-autohide"),
                  n._handles.hide());
              })),
          this._mouseInit();
      },
      _destroy: function () {
        this._mouseDestroy();
        function t(t) {
          x(t)
            .removeClass(
              "ui-resizable ui-resizable-disabled ui-resizable-resizing"
            )
            .removeData("resizable")
            .removeData("ui-resizable")
            .unbind(".resizable")
            .find(".ui-resizable-handle")
            .remove();
        }
        var e;
        return (
          this.elementIsWrapper &&
            (t(this.element),
            (e = this.element),
            this.originalElement
              .css({
                position: e.css("position"),
                width: e.outerWidth(),
                height: e.outerHeight(),
                top: e.css("top"),
                left: e.css("left"),
              })
              .insertAfter(e),
            e.remove()),
          this.originalElement.css("resize", this.originalResizeStyle),
          t(this.originalElement),
          this
        );
      },
      _mouseCapture: function (t) {
        var e,
          i,
          s = !1;
        for (e in this.handles)
          ((i = x(this.handles[e])[0]) !== t.target &&
            !x.contains(i, t.target)) ||
            (s = !0);
        return !this.options.disabled && s;
      },
      _mouseStart: function (t) {
        var e,
          i,
          s = this.options,
          n = this.element;
        return (
          (this.resizing = !0),
          this._renderProxy(),
          (i = this._num(this.helper.css("left"))),
          (e = this._num(this.helper.css("top"))),
          s.containment &&
            ((i += x(s.containment).scrollLeft() || 0),
            (e += x(s.containment).scrollTop() || 0)),
          (this.offset = this.helper.offset()),
          (this.position = { left: i, top: e }),
          (this.size = this._helper
            ? { width: this.helper.width(), height: this.helper.height() }
            : { width: n.width(), height: n.height() }),
          (this.originalSize = this._helper
            ? { width: n.outerWidth(), height: n.outerHeight() }
            : { width: n.width(), height: n.height() }),
          (this.sizeDiff = {
            width: n.outerWidth() - n.width(),
            height: n.outerHeight() - n.height(),
          }),
          (this.originalPosition = { left: i, top: e }),
          (this.originalMousePosition = { left: t.pageX, top: t.pageY }),
          (this.aspectRatio =
            "number" == typeof s.aspectRatio
              ? s.aspectRatio
              : this.originalSize.width / this.originalSize.height || 1),
          (i = x(".ui-resizable-" + this.axis).css("cursor")),
          x("body").css("cursor", "auto" === i ? this.axis + "-resize" : i),
          n.addClass("ui-resizable-resizing"),
          this._propagate("start", t),
          !0
        );
      },
      _mouseDrag: function (t) {
        var e = this.originalMousePosition,
          i = this.axis,
          s = t.pageX - e.left || 0,
          e = t.pageY - e.top || 0,
          i = this._change[i];
        return (
          this._updatePrevProperties(),
          i &&
            ((i = i.apply(this, [t, s, e])),
            this._updateVirtualBoundaries(t.shiftKey),
            (this._aspectRatio || t.shiftKey) && (i = this._updateRatio(i, t)),
            (i = this._respectSize(i, t)),
            this._updateCache(i),
            this._propagate("resize", t),
            (s = this._applyChanges()),
            !this._helper &&
              this._proportionallyResizeElements.length &&
              this._proportionallyResize(),
            x.isEmptyObject(s) ||
              (this._updatePrevProperties(),
              this._trigger("resize", t, this.ui()),
              this._applyChanges())),
          !1
        );
      },
      _mouseStop: function (t) {
        this.resizing = !1;
        var e,
          i,
          s,
          n = this.options,
          o = this;
        return (
          this._helper &&
            ((i =
              (e =
                (i = this._proportionallyResizeElements).length &&
                /textarea/i.test(i[0].nodeName)) &&
              this._hasScroll(i[0], "left")
                ? 0
                : o.sizeDiff.height),
            (e = e ? 0 : o.sizeDiff.width),
            (e = {
              width: o.helper.width() - e,
              height: o.helper.height() - i,
            }),
            (i =
              parseInt(o.element.css("left"), 10) +
                (o.position.left - o.originalPosition.left) || null),
            (s =
              parseInt(o.element.css("top"), 10) +
                (o.position.top - o.originalPosition.top) || null),
            n.animate || this.element.css(x.extend(e, { top: s, left: i })),
            o.helper.height(o.size.height),
            o.helper.width(o.size.width),
            this._helper && !n.animate && this._proportionallyResize()),
          x("body").css("cursor", "auto"),
          this.element.removeClass("ui-resizable-resizing"),
          this._propagate("stop", t),
          this._helper && this.helper.remove(),
          !1
        );
      },
      _updatePrevProperties: function () {
        (this.prevPosition = {
          top: this.position.top,
          left: this.position.left,
        }),
          (this.prevSize = {
            width: this.size.width,
            height: this.size.height,
          });
      },
      _applyChanges: function () {
        var t = {};
        return (
          this.position.top !== this.prevPosition.top &&
            (t.top = this.position.top + "px"),
          this.position.left !== this.prevPosition.left &&
            (t.left = this.position.left + "px"),
          this.size.width !== this.prevSize.width &&
            (t.width = this.size.width + "px"),
          this.size.height !== this.prevSize.height &&
            (t.height = this.size.height + "px"),
          this.helper.css(t),
          t
        );
      },
      _updateVirtualBoundaries: function (t) {
        var e,
          i,
          s,
          n = this.options,
          n = {
            minWidth: this._isNumber(n.minWidth) ? n.minWidth : 0,
            maxWidth: this._isNumber(n.maxWidth) ? n.maxWidth : 1 / 0,
            minHeight: this._isNumber(n.minHeight) ? n.minHeight : 0,
            maxHeight: this._isNumber(n.maxHeight) ? n.maxHeight : 1 / 0,
          };
        (this._aspectRatio || t) &&
          ((t = n.minHeight * this.aspectRatio),
          (i = n.minWidth / this.aspectRatio),
          (e = n.maxHeight * this.aspectRatio),
          (s = n.maxWidth / this.aspectRatio),
          t > n.minWidth && (n.minWidth = t),
          i > n.minHeight && (n.minHeight = i),
          e < n.maxWidth && (n.maxWidth = e),
          s < n.maxHeight && (n.maxHeight = s)),
          (this._vBoundaries = n);
      },
      _updateCache: function (t) {
        (this.offset = this.helper.offset()),
          this._isNumber(t.left) && (this.position.left = t.left),
          this._isNumber(t.top) && (this.position.top = t.top),
          this._isNumber(t.height) && (this.size.height = t.height),
          this._isNumber(t.width) && (this.size.width = t.width);
      },
      _updateRatio: function (t) {
        var e = this.position,
          i = this.size,
          s = this.axis;
        return (
          this._isNumber(t.height)
            ? (t.width = t.height * this.aspectRatio)
            : this._isNumber(t.width) &&
              (t.height = t.width / this.aspectRatio),
          "sw" === s &&
            ((t.left = e.left + (i.width - t.width)), (t.top = null)),
          "nw" === s &&
            ((t.top = e.top + (i.height - t.height)),
            (t.left = e.left + (i.width - t.width))),
          t
        );
      },
      _respectSize: function (t) {
        var e = this._vBoundaries,
          i = this.axis,
          s = this._isNumber(t.width) && e.maxWidth && e.maxWidth < t.width,
          n = this._isNumber(t.height) && e.maxHeight && e.maxHeight < t.height,
          o = this._isNumber(t.width) && e.minWidth && e.minWidth > t.width,
          a = this._isNumber(t.height) && e.minHeight && e.minHeight > t.height,
          r = this.originalPosition.left + this.originalSize.width,
          h = this.position.top + this.size.height,
          l = /sw|nw|w/.test(i),
          i = /nw|ne|n/.test(i);
        return (
          o && (t.width = e.minWidth),
          a && (t.height = e.minHeight),
          s && (t.width = e.maxWidth),
          n && (t.height = e.maxHeight),
          o && l && (t.left = r - e.minWidth),
          s && l && (t.left = r - e.maxWidth),
          a && i && (t.top = h - e.minHeight),
          n && i && (t.top = h - e.maxHeight),
          t.width || t.height || t.left || !t.top
            ? t.width || t.height || t.top || !t.left || (t.left = null)
            : (t.top = null),
          t
        );
      },
      _getPaddingPlusBorderDimensions: function (t) {
        for (
          var e = 0,
            i = [],
            s = [
              t.css("borderTopWidth"),
              t.css("borderRightWidth"),
              t.css("borderBottomWidth"),
              t.css("borderLeftWidth"),
            ],
            n = [
              t.css("paddingTop"),
              t.css("paddingRight"),
              t.css("paddingBottom"),
              t.css("paddingLeft"),
            ];
          e < 4;
          e++
        )
          (i[e] = parseInt(s[e], 10) || 0), (i[e] += parseInt(n[e], 10) || 0);
        return { height: i[0] + i[2], width: i[1] + i[3] };
      },
      _proportionallyResize: function () {
        if (this._proportionallyResizeElements.length)
          for (
            var t, e = 0, i = this.helper || this.element;
            e < this._proportionallyResizeElements.length;
            e++
          )
            (t = this._proportionallyResizeElements[e]),
              this.outerDimensions ||
                (this.outerDimensions =
                  this._getPaddingPlusBorderDimensions(t)),
              t.css({
                height: i.height() - this.outerDimensions.height || 0,
                width: i.width() - this.outerDimensions.width || 0,
              });
      },
      _renderProxy: function () {
        var t = this.element,
          e = this.options;
        (this.elementOffset = t.offset()),
          this._helper
            ? ((this.helper =
                this.helper || x("<div style='overflow:hidden;'></div>")),
              this.helper
                .addClass(this._helper)
                .css({
                  width: this.element.outerWidth() - 1,
                  height: this.element.outerHeight() - 1,
                  position: "absolute",
                  left: this.elementOffset.left + "px",
                  top: this.elementOffset.top + "px",
                  zIndex: ++e.zIndex,
                }),
              this.helper.appendTo("body").disableSelection())
            : (this.helper = this.element);
      },
      _change: {
        e: function (t, e) {
          return { width: this.originalSize.width + e };
        },
        w: function (t, e) {
          var i = this.originalSize;
          return { left: this.originalPosition.left + e, width: i.width - e };
        },
        n: function (t, e, i) {
          var s = this.originalSize;
          return { top: this.originalPosition.top + i, height: s.height - i };
        },
        s: function (t, e, i) {
          return { height: this.originalSize.height + i };
        },
        se: function (t, e, i) {
          return x.extend(
            this._change.s.apply(this, arguments),
            this._change.e.apply(this, [t, e, i])
          );
        },
        sw: function (t, e, i) {
          return x.extend(
            this._change.s.apply(this, arguments),
            this._change.w.apply(this, [t, e, i])
          );
        },
        ne: function (t, e, i) {
          return x.extend(
            this._change.n.apply(this, arguments),
            this._change.e.apply(this, [t, e, i])
          );
        },
        nw: function (t, e, i) {
          return x.extend(
            this._change.n.apply(this, arguments),
            this._change.w.apply(this, [t, e, i])
          );
        },
      },
      _propagate: function (t, e) {
        x.ui.plugin.call(this, t, [e, this.ui()]),
          "resize" !== t && this._trigger(t, e, this.ui());
      },
      plugins: {},
      ui: function () {
        return {
          originalElement: this.originalElement,
          element: this.element,
          helper: this.helper,
          position: this.position,
          size: this.size,
          originalSize: this.originalSize,
          originalPosition: this.originalPosition,
        };
      },
    }),
    x.ui.plugin.add("resizable", "animate", {
      stop: function (e) {
        var i = x(this).resizable("instance"),
          t = i.options,
          s = i._proportionallyResizeElements,
          n = s.length && /textarea/i.test(s[0].nodeName),
          o = n && i._hasScroll(s[0], "left") ? 0 : i.sizeDiff.height,
          n = n ? 0 : i.sizeDiff.width,
          n = { width: i.size.width - n, height: i.size.height - o },
          o =
            parseInt(i.element.css("left"), 10) +
              (i.position.left - i.originalPosition.left) || null,
          a =
            parseInt(i.element.css("top"), 10) +
              (i.position.top - i.originalPosition.top) || null;
        i.element.animate(x.extend(n, a && o ? { top: a, left: o } : {}), {
          duration: t.animateDuration,
          easing: t.animateEasing,
          step: function () {
            var t = {
              width: parseInt(i.element.css("width"), 10),
              height: parseInt(i.element.css("height"), 10),
              top: parseInt(i.element.css("top"), 10),
              left: parseInt(i.element.css("left"), 10),
            };
            s && s.length && x(s[0]).css({ width: t.width, height: t.height }),
              i._updateCache(t),
              i._propagate("resize", e);
          },
        });
      },
    }),
    x.ui.plugin.add("resizable", "containment", {
      start: function () {
        var i,
          s,
          t,
          e,
          n = x(this).resizable("instance"),
          o = n.options,
          a = n.element,
          o = o.containment,
          a =
            o instanceof x
              ? o.get(0)
              : /parent/.test(o)
              ? a.parent().get(0)
              : o;
        a &&
          ((n.containerElement = x(a)),
          /document/.test(o) || o === document
            ? ((n.containerOffset = { left: 0, top: 0 }),
              (n.containerPosition = { left: 0, top: 0 }),
              (n.parentData = {
                element: x(document),
                left: 0,
                top: 0,
                width: x(document).width(),
                height:
                  x(document).height() || document.body.parentNode.scrollHeight,
              }))
            : ((i = x(a)),
              (s = []),
              x(["Top", "Right", "Left", "Bottom"]).each(function (t, e) {
                s[t] = n._num(i.css("padding" + e));
              }),
              (n.containerOffset = i.offset()),
              (n.containerPosition = i.position()),
              (n.containerSize = {
                height: i.innerHeight() - s[3],
                width: i.innerWidth() - s[1],
              }),
              (o = n.containerOffset),
              (e = n.containerSize.height),
              (t = n.containerSize.width),
              (t = n._hasScroll(a, "left") ? a.scrollWidth : t),
              (e = n._hasScroll(a) ? a.scrollHeight : e),
              (n.parentData = {
                element: a,
                left: o.left,
                top: o.top,
                width: t,
                height: e,
              })));
      },
      resize: function (t) {
        var e = x(this).resizable("instance"),
          i = e.options,
          s = e.containerOffset,
          n = e.position,
          t = e._aspectRatio || t.shiftKey,
          o = { top: 0, left: 0 },
          a = e.containerElement,
          r = !0;
        a[0] !== document && /static/.test(a.css("position")) && (o = s),
          n.left < (e._helper ? s.left : 0) &&
            ((e.size.width =
              e.size.width +
              (e._helper
                ? e.position.left - s.left
                : e.position.left - o.left)),
            t && ((e.size.height = e.size.width / e.aspectRatio), (r = !1)),
            (e.position.left = i.helper ? s.left : 0)),
          n.top < (e._helper ? s.top : 0) &&
            ((e.size.height =
              e.size.height +
              (e._helper ? e.position.top - s.top : e.position.top)),
            t && ((e.size.width = e.size.height * e.aspectRatio), (r = !1)),
            (e.position.top = e._helper ? s.top : 0)),
          (a = e.containerElement.get(0) === e.element.parent().get(0)),
          (i = /relative|absolute/.test(e.containerElement.css("position"))),
          a && i
            ? ((e.offset.left = e.parentData.left + e.position.left),
              (e.offset.top = e.parentData.top + e.position.top))
            : ((e.offset.left = e.element.offset().left),
              (e.offset.top = e.element.offset().top)),
          (n = Math.abs(
            e.sizeDiff.width +
              (e._helper ? e.offset.left - o.left : e.offset.left - s.left)
          )),
          (a = Math.abs(
            e.sizeDiff.height +
              (e._helper ? e.offset.top - o.top : e.offset.top - s.top)
          )),
          n + e.size.width >= e.parentData.width &&
            ((e.size.width = e.parentData.width - n),
            t && ((e.size.height = e.size.width / e.aspectRatio), (r = !1))),
          a + e.size.height >= e.parentData.height &&
            ((e.size.height = e.parentData.height - a),
            t && ((e.size.width = e.size.height * e.aspectRatio), (r = !1))),
          r ||
            ((e.position.left = e.prevPosition.left),
            (e.position.top = e.prevPosition.top),
            (e.size.width = e.prevSize.width),
            (e.size.height = e.prevSize.height));
      },
      stop: function () {
        var t = x(this).resizable("instance"),
          e = t.options,
          i = t.containerOffset,
          s = t.containerPosition,
          n = t.containerElement,
          o = x(t.helper),
          a = o.offset(),
          r = o.outerWidth() - t.sizeDiff.width,
          o = o.outerHeight() - t.sizeDiff.height;
        t._helper &&
          !e.animate &&
          /relative/.test(n.css("position")) &&
          x(this).css({ left: a.left - s.left - i.left, width: r, height: o }),
          t._helper &&
            !e.animate &&
            /static/.test(n.css("position")) &&
            x(this).css({
              left: a.left - s.left - i.left,
              width: r,
              height: o,
            });
      },
    }),
    x.ui.plugin.add("resizable", "alsoResize", {
      start: function () {
        var t = x(this).resizable("instance").options;
        x(t.alsoResize).each(function () {
          var t = x(this);
          t.data("ui-resizable-alsoresize", {
            width: parseInt(t.width(), 10),
            height: parseInt(t.height(), 10),
            left: parseInt(t.css("left"), 10),
            top: parseInt(t.css("top"), 10),
          });
        });
      },
      resize: function (t, i) {
        var e = x(this).resizable("instance"),
          s = e.options,
          n = e.originalSize,
          o = e.originalPosition,
          a = {
            height: e.size.height - n.height || 0,
            width: e.size.width - n.width || 0,
            top: e.position.top - o.top || 0,
            left: e.position.left - o.left || 0,
          };
        x(s.alsoResize).each(function () {
          var t = x(this),
            s = x(this).data("ui-resizable-alsoresize"),
            n = {},
            e = t.parents(i.originalElement[0]).length
              ? ["width", "height"]
              : ["width", "height", "top", "left"];
          x.each(e, function (t, e) {
            var i = (s[e] || 0) + (a[e] || 0);
            i && 0 <= i && (n[e] = i || null);
          }),
            t.css(n);
        });
      },
      stop: function () {
        x(this).removeData("resizable-alsoresize");
      },
    }),
    x.ui.plugin.add("resizable", "ghost", {
      start: function () {
        var t = x(this).resizable("instance"),
          e = t.options,
          i = t.size;
        (t.ghost = t.originalElement.clone()),
          t.ghost
            .css({
              opacity: 0.25,
              display: "block",
              position: "relative",
              height: i.height,
              width: i.width,
              margin: 0,
              left: 0,
              top: 0,
            })
            .addClass("ui-resizable-ghost")
            .addClass("string" == typeof e.ghost ? e.ghost : ""),
          t.ghost.appendTo(t.helper);
      },
      resize: function () {
        var t = x(this).resizable("instance");
        t.ghost &&
          t.ghost.css({
            position: "relative",
            height: t.size.height,
            width: t.size.width,
          });
      },
      stop: function () {
        var t = x(this).resizable("instance");
        t.ghost && t.helper && t.helper.get(0).removeChild(t.ghost.get(0));
      },
    }),
    x.ui.plugin.add("resizable", "grid", {
      resize: function () {
        var t,
          e = x(this).resizable("instance"),
          i = e.options,
          s = e.size,
          n = e.originalSize,
          o = e.originalPosition,
          a = e.axis,
          r = "number" == typeof i.grid ? [i.grid, i.grid] : i.grid,
          h = r[0] || 1,
          l = r[1] || 1,
          c = Math.round((s.width - n.width) / h) * h,
          s = Math.round((s.height - n.height) / l) * l,
          u = n.width + c,
          d = n.height + s,
          p = i.maxWidth && i.maxWidth < u,
          f = i.maxHeight && i.maxHeight < d,
          m = i.minWidth && i.minWidth > u,
          g = i.minHeight && i.minHeight > d;
        (i.grid = r),
          m && (u += h),
          g && (d += l),
          p && (u -= h),
          f && (d -= l),
          /^(se|s|e)$/.test(a)
            ? ((e.size.width = u), (e.size.height = d))
            : /^(ne)$/.test(a)
            ? ((e.size.width = u),
              (e.size.height = d),
              (e.position.top = o.top - s))
            : /^(sw)$/.test(a)
            ? ((e.size.width = u),
              (e.size.height = d),
              (e.position.left = o.left - c))
            : ((d - l <= 0 || u - h <= 0) &&
                (t = e._getPaddingPlusBorderDimensions(this)),
              0 < d - l
                ? ((e.size.height = d), (e.position.top = o.top - s))
                : ((d = l - t.height),
                  (e.size.height = d),
                  (e.position.top = o.top + n.height - d)),
              0 < u - h
                ? ((e.size.width = u), (e.position.left = o.left - c))
                : ((u = h - t.width),
                  (e.size.width = u),
                  (e.position.left = o.left + n.width - u)));
      },
    }),
    x.ui.resizable,
    x.widget("ui.dialog", {
      version: "1.11.4",
      options: {
        appendTo: "body",
        autoOpen: !0,
        buttons: [],
        closeOnEscape: !0,
        closeText: "Close",
        dialogClass: "",
        draggable: !0,
        hide: null,
        height: "auto",
        maxHeight: null,
        maxWidth: null,
        minHeight: 150,
        minWidth: 150,
        modal: !1,
        position: {
          my: "center",
          at: "center",
          of: window,
          collision: "fit",
          using: function (t) {
            var e = x(this).css(t).offset().top;
            e < 0 && x(this).css("top", t.top - e);
          },
        },
        resizable: !0,
        show: null,
        title: null,
        width: 300,
        beforeClose: null,
        close: null,
        drag: null,
        dragStart: null,
        dragStop: null,
        focus: null,
        open: null,
        resize: null,
        resizeStart: null,
        resizeStop: null,
      },
      sizeRelatedOptions: {
        buttons: !0,
        height: !0,
        maxHeight: !0,
        maxWidth: !0,
        minHeight: !0,
        minWidth: !0,
        width: !0,
      },
      resizableRelatedOptions: {
        maxHeight: !0,
        maxWidth: !0,
        minHeight: !0,
        minWidth: !0,
      },
      _create: function () {
        (this.originalCss = {
          display: this.element[0].style.display,
          width: this.element[0].style.width,
          minHeight: this.element[0].style.minHeight,
          maxHeight: this.element[0].style.maxHeight,
          height: this.element[0].style.height,
        }),
          (this.originalPosition = {
            parent: this.element.parent(),
            index: this.element.parent().children().index(this.element),
          }),
          (this.originalTitle = this.element.attr("title")),
          (this.options.title = this.options.title || this.originalTitle),
          this._createWrapper(),
          this.element
            .show()
            .removeAttr("title")
            .addClass("ui-dialog-content ui-widget-content")
            .appendTo(this.uiDialog),
          this._createTitlebar(),
          this._createButtonPane(),
          this.options.draggable && x.fn.draggable && this._makeDraggable(),
          this.options.resizable && x.fn.resizable && this._makeResizable(),
          (this._isOpen = !1),
          this._trackFocus();
      },
      _init: function () {
        this.options.autoOpen && this.open();
      },
      _appendTo: function () {
        var t = this.options.appendTo;
        return t && (t.jquery || t.nodeType)
          ? x(t)
          : this.document.find(t || "body").eq(0);
      },
      _destroy: function () {
        var t,
          e = this.originalPosition;
        this._untrackInstance(),
          this._destroyOverlay(),
          this.element
            .removeUniqueId()
            .removeClass("ui-dialog-content ui-widget-content")
            .css(this.originalCss)
            .detach(),
          this.uiDialog.stop(!0, !0).remove(),
          this.originalTitle && this.element.attr("title", this.originalTitle),
          (t = e.parent.children().eq(e.index)).length &&
          t[0] !== this.element[0]
            ? t.before(this.element)
            : e.parent.append(this.element);
      },
      widget: function () {
        return this.uiDialog;
      },
      disable: x.noop,
      enable: x.noop,
      close: function (t) {
        var e,
          i = this;
        if (this._isOpen && !1 !== this._trigger("beforeClose", t)) {
          if (
            ((this._isOpen = !1),
            (this._focusedElement = null),
            this._destroyOverlay(),
            this._untrackInstance(),
            !this.opener.filter(":focusable").focus().length)
          )
            try {
              (e = this.document[0].activeElement) &&
                "body" !== e.nodeName.toLowerCase() &&
                x(e).blur();
            } catch (t) {}
          this._hide(this.uiDialog, this.options.hide, function () {
            i._trigger("close", t);
          });
        }
      },
      isOpen: function () {
        return this._isOpen;
      },
      moveToTop: function () {
        this._moveToTop();
      },
      _moveToTop: function (t, e) {
        var i = !1,
          s = this.uiDialog
            .siblings(".ui-front:visible")
            .map(function () {
              return +x(this).css("z-index");
            })
            .get(),
          s = Math.max.apply(null, s);
        return (
          s >= +this.uiDialog.css("z-index") &&
            (this.uiDialog.css("z-index", s + 1), (i = !0)),
          i && !e && this._trigger("focus", t),
          i
        );
      },
      open: function () {
        var t = this;
        this._isOpen
          ? this._moveToTop() && this._focusTabbable()
          : ((this._isOpen = !0),
            (this.opener = x(this.document[0].activeElement)),
            this._size(),
            this._position(),
            this._createOverlay(),
            this._moveToTop(null, !0),
            this.overlay &&
              this.overlay.css("z-index", this.uiDialog.css("z-index") - 1),
            this._show(this.uiDialog, this.options.show, function () {
              t._focusTabbable(), t._trigger("focus");
            }),
            this._makeFocusTarget(),
            this._trigger("open"));
      },
      _focusTabbable: function () {
        var t = this._focusedElement;
        (t = (t = (t = (t = (t = t || this.element.find("[autofocus]")).length
          ? t
          : this.element.find(":tabbable")).length
          ? t
          : this.uiDialogButtonPane.find(":tabbable")).length
          ? t
          : this.uiDialogTitlebarClose.filter(":tabbable")).length
          ? t
          : this.uiDialog)
          .eq(0)
          .focus();
      },
      _keepFocus: function (t) {
        function e() {
          var t = this.document[0].activeElement;
          this.uiDialog[0] === t ||
            x.contains(this.uiDialog[0], t) ||
            this._focusTabbable();
        }
        t.preventDefault(), e.call(this), this._delay(e);
      },
      _createWrapper: function () {
        (this.uiDialog = x("<div>")
          .addClass(
            "ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " +
              this.options.dialogClass
          )
          .hide()
          .attr({ tabIndex: -1, role: "dialog" })
          .appendTo(this._appendTo())),
          this._on(this.uiDialog, {
            keydown: function (t) {
              var e, i, s;
              this.options.closeOnEscape &&
              !t.isDefaultPrevented() &&
              t.keyCode &&
              t.keyCode === x.ui.keyCode.ESCAPE
                ? (t.preventDefault(), this.close(t))
                : t.keyCode !== x.ui.keyCode.TAB ||
                  t.isDefaultPrevented() ||
                  ((e = this.uiDialog.find(":tabbable")),
                  (i = e.filter(":first")),
                  (s = e.filter(":last")),
                  (t.target !== s[0] && t.target !== this.uiDialog[0]) ||
                  t.shiftKey
                    ? (t.target !== i[0] && t.target !== this.uiDialog[0]) ||
                      !t.shiftKey ||
                      (this._delay(function () {
                        s.focus();
                      }),
                      t.preventDefault())
                    : (this._delay(function () {
                        i.focus();
                      }),
                      t.preventDefault()));
            },
            mousedown: function (t) {
              this._moveToTop(t) && this._focusTabbable();
            },
          }),
          this.element.find("[aria-describedby]").length ||
            this.uiDialog.attr({
              "aria-describedby": this.element.uniqueId().attr("id"),
            });
      },
      _createTitlebar: function () {
        var t;
        (this.uiDialogTitlebar = x("<div>")
          .addClass(
            "ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix"
          )
          .prependTo(this.uiDialog)),
          this._on(this.uiDialogTitlebar, {
            mousedown: function (t) {
              x(t.target).closest(".ui-dialog-titlebar-close") ||
                this.uiDialog.focus();
            },
          }),
          (this.uiDialogTitlebarClose = x("<button type='button'></button>")
            .button({
              label: this.options.closeText,
              icons: { primary: "ui-icon-closethick" },
              text: !1,
            })
            .addClass("ui-dialog-titlebar-close")
            .appendTo(this.uiDialogTitlebar)),
          this._on(this.uiDialogTitlebarClose, {
            click: function (t) {
              t.preventDefault(), this.close(t);
            },
          }),
          (t = x("<span>")
            .uniqueId()
            .addClass("ui-dialog-title")
            .prependTo(this.uiDialogTitlebar)),
          this._title(t),
          this.uiDialog.attr({ "aria-labelledby": t.attr("id") });
      },
      _title: function (t) {
        this.options.title || t.html("&#160;"), t.text(this.options.title);
      },
      _createButtonPane: function () {
        (this.uiDialogButtonPane = x("<div>").addClass(
          "ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"
        )),
          (this.uiButtonSet = x("<div>")
            .addClass("ui-dialog-buttonset")
            .appendTo(this.uiDialogButtonPane)),
          this._createButtons();
      },
      _createButtons: function () {
        var s = this,
          t = this.options.buttons;
        this.uiDialogButtonPane.remove(),
          this.uiButtonSet.empty(),
          x.isEmptyObject(t) || (x.isArray(t) && !t.length)
            ? this.uiDialog.removeClass("ui-dialog-buttons")
            : (x.each(t, function (t, e) {
                var i;
                (e = x.isFunction(e) ? { click: e, text: t } : e),
                  (e = x.extend({ type: "button" }, e)),
                  (i = e.click),
                  (e.click = function () {
                    i.apply(s.element[0], arguments);
                  }),
                  (t = { icons: e.icons, text: e.showText }),
                  delete e.icons,
                  delete e.showText,
                  x("<button></button>", e).button(t).appendTo(s.uiButtonSet);
              }),
              this.uiDialog.addClass("ui-dialog-buttons"),
              this.uiDialogButtonPane.appendTo(this.uiDialog));
      },
      _makeDraggable: function () {
        var n = this,
          o = this.options;
        function a(t) {
          return { position: t.position, offset: t.offset };
        }
        this.uiDialog.draggable({
          cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
          handle: ".ui-dialog-titlebar",
          containment: "document",
          start: function (t, e) {
            x(this).addClass("ui-dialog-dragging"),
              n._blockFrames(),
              n._trigger("dragStart", t, a(e));
          },
          drag: function (t, e) {
            n._trigger("drag", t, a(e));
          },
          stop: function (t, e) {
            var i = e.offset.left - n.document.scrollLeft(),
              s = e.offset.top - n.document.scrollTop();
            (o.position = {
              my: "left top",
              at:
                "left" +
                (0 <= i ? "+" : "") +
                i +
                " top" +
                (0 <= s ? "+" : "") +
                s,
              of: n.window,
            }),
              x(this).removeClass("ui-dialog-dragging"),
              n._unblockFrames(),
              n._trigger("dragStop", t, a(e));
          },
        });
      },
      _makeResizable: function () {
        var n = this,
          o = this.options,
          t = o.resizable,
          e = this.uiDialog.css("position"),
          t = "string" == typeof t ? t : "n,e,s,w,se,sw,ne,nw";
        function a(t) {
          return {
            originalPosition: t.originalPosition,
            originalSize: t.originalSize,
            position: t.position,
            size: t.size,
          };
        }
        this.uiDialog
          .resizable({
            cancel: ".ui-dialog-content",
            containment: "document",
            alsoResize: this.element,
            maxWidth: o.maxWidth,
            maxHeight: o.maxHeight,
            minWidth: o.minWidth,
            minHeight: this._minHeight(),
            handles: t,
            start: function (t, e) {
              x(this).addClass("ui-dialog-resizing"),
                n._blockFrames(),
                n._trigger("resizeStart", t, a(e));
            },
            resize: function (t, e) {
              n._trigger("resize", t, a(e));
            },
            stop: function (t, e) {
              var i = n.uiDialog.offset(),
                s = i.left - n.document.scrollLeft(),
                i = i.top - n.document.scrollTop();
              (o.height = n.uiDialog.height()),
                (o.width = n.uiDialog.width()),
                (o.position = {
                  my: "left top",
                  at:
                    "left" +
                    (0 <= s ? "+" : "") +
                    s +
                    " top" +
                    (0 <= i ? "+" : "") +
                    i,
                  of: n.window,
                }),
                x(this).removeClass("ui-dialog-resizing"),
                n._unblockFrames(),
                n._trigger("resizeStop", t, a(e));
            },
          })
          .css("position", e);
      },
      _trackFocus: function () {
        this._on(this.widget(), {
          focusin: function (t) {
            this._makeFocusTarget(), (this._focusedElement = x(t.target));
          },
        });
      },
      _makeFocusTarget: function () {
        this._untrackInstance(), this._trackingInstances().unshift(this);
      },
      _untrackInstance: function () {
        var t = this._trackingInstances(),
          e = x.inArray(this, t);
        -1 !== e && t.splice(e, 1);
      },
      _trackingInstances: function () {
        var t = this.document.data("ui-dialog-instances");
        return t || this.document.data("ui-dialog-instances", (t = [])), t;
      },
      _minHeight: function () {
        var t = this.options;
        return "auto" === t.height
          ? t.minHeight
          : Math.min(t.minHeight, t.height);
      },
      _position: function () {
        var t = this.uiDialog.is(":visible");
        t || this.uiDialog.show(),
          this.uiDialog.position(this.options.position),
          t || this.uiDialog.hide();
      },
      _setOptions: function (t) {
        var i = this,
          s = !1,
          n = {};
        x.each(t, function (t, e) {
          i._setOption(t, e),
            t in i.sizeRelatedOptions && (s = !0),
            t in i.resizableRelatedOptions && (n[t] = e);
        }),
          s && (this._size(), this._position()),
          this.uiDialog.is(":data(ui-resizable)") &&
            this.uiDialog.resizable("option", n);
      },
      _setOption: function (t, e) {
        var i,
          s = this.uiDialog;
        "dialogClass" === t &&
          s.removeClass(this.options.dialogClass).addClass(e),
          "disabled" !== t &&
            (this._super(t, e),
            "appendTo" === t && this.uiDialog.appendTo(this._appendTo()),
            "buttons" === t && this._createButtons(),
            "closeText" === t &&
              this.uiDialogTitlebarClose.button({ label: "" + e }),
            "draggable" === t &&
              ((i = s.is(":data(ui-draggable)")) &&
                !e &&
                s.draggable("destroy"),
              !i && e && this._makeDraggable()),
            "position" === t && this._position(),
            "resizable" === t &&
              ((i = s.is(":data(ui-resizable)")) &&
                !e &&
                s.resizable("destroy"),
              i && "string" == typeof e && s.resizable("option", "handles", e),
              i || !1 === e || this._makeResizable()),
            "title" === t &&
              this._title(this.uiDialogTitlebar.find(".ui-dialog-title")));
      },
      _size: function () {
        var t,
          e,
          i,
          s = this.options;
        this.element
          .show()
          .css({ width: "auto", minHeight: 0, maxHeight: "none", height: 0 }),
          s.minWidth > s.width && (s.width = s.minWidth),
          (t = this.uiDialog
            .css({ height: "auto", width: s.width })
            .outerHeight()),
          (e = Math.max(0, s.minHeight - t)),
          (i =
            "number" == typeof s.maxHeight
              ? Math.max(0, s.maxHeight - t)
              : "none"),
          "auto" === s.height
            ? this.element.css({ minHeight: e, maxHeight: i, height: "auto" })
            : this.element.height(Math.max(0, s.height - t)),
          this.uiDialog.is(":data(ui-resizable)") &&
            this.uiDialog.resizable("option", "minHeight", this._minHeight());
      },
      _blockFrames: function () {
        this.iframeBlocks = this.document.find("iframe").map(function () {
          var t = x(this);
          return x("<div>")
            .css({
              position: "absolute",
              width: t.outerWidth(),
              height: t.outerHeight(),
            })
            .appendTo(t.parent())
            .offset(t.offset())[0];
        });
      },
      _unblockFrames: function () {
        this.iframeBlocks &&
          (this.iframeBlocks.remove(), delete this.iframeBlocks);
      },
      _allowInteraction: function (t) {
        return (
          !!x(t.target).closest(".ui-dialog").length ||
          !!x(t.target).closest(".ui-datepicker").length
        );
      },
      _createOverlay: function () {
        var e;
        this.options.modal &&
          ((e = !0),
          this._delay(function () {
            e = !1;
          }),
          this.document.data("ui-dialog-overlays") ||
            this._on(this.document, {
              focusin: function (t) {
                e ||
                  this._allowInteraction(t) ||
                  (t.preventDefault(),
                  this._trackingInstances()[0]._focusTabbable());
              },
            }),
          (this.overlay = x("<div>")
            .addClass("ui-widget-overlay ui-front")
            .appendTo(this._appendTo())),
          this._on(this.overlay, { mousedown: "_keepFocus" }),
          this.document.data(
            "ui-dialog-overlays",
            (this.document.data("ui-dialog-overlays") || 0) + 1
          ));
      },
      _destroyOverlay: function () {
        var t;
        this.options.modal &&
          this.overlay &&
          ((t = this.document.data("ui-dialog-overlays") - 1)
            ? this.document.data("ui-dialog-overlays", t)
            : this.document.unbind("focusin").removeData("ui-dialog-overlays"),
          this.overlay.remove(),
          (this.overlay = null));
      },
    });
  function tt(t, e, i) {
    return e <= t && t < e + i;
  }
  x.widget("ui.droppable", {
    version: "1.11.4",
    widgetEventPrefix: "drop",
    options: {
      accept: "*",
      activeClass: !1,
      addClasses: !0,
      greedy: !1,
      hoverClass: !1,
      scope: "default",
      tolerance: "intersect",
      activate: null,
      deactivate: null,
      drop: null,
      out: null,
      over: null,
    },
    _create: function () {
      var t,
        e = this.options,
        i = e.accept;
      (this.isover = !1),
        (this.isout = !0),
        (this.accept = x.isFunction(i)
          ? i
          : function (t) {
              return t.is(i);
            }),
        (this.proportions = function () {
          if (!arguments.length)
            return (t = t || {
              width: this.element[0].offsetWidth,
              height: this.element[0].offsetHeight,
            });
          t = arguments[0];
        }),
        this._addToManager(e.scope),
        e.addClasses && this.element.addClass("ui-droppable");
    },
    _addToManager: function (t) {
      (x.ui.ddmanager.droppables[t] = x.ui.ddmanager.droppables[t] || []),
        x.ui.ddmanager.droppables[t].push(this);
    },
    _splice: function (t) {
      for (var e = 0; e < t.length; e++) t[e] === this && t.splice(e, 1);
    },
    _destroy: function () {
      var t = x.ui.ddmanager.droppables[this.options.scope];
      this._splice(t),
        this.element.removeClass("ui-droppable ui-droppable-disabled");
    },
    _setOption: function (t, e) {
      var i;
      "accept" === t
        ? (this.accept = x.isFunction(e)
            ? e
            : function (t) {
                return t.is(e);
              })
        : "scope" === t &&
          ((i = x.ui.ddmanager.droppables[this.options.scope]),
          this._splice(i),
          this._addToManager(e)),
        this._super(t, e);
    },
    _activate: function (t) {
      var e = x.ui.ddmanager.current;
      this.options.activeClass &&
        this.element.addClass(this.options.activeClass),
        e && this._trigger("activate", t, this.ui(e));
    },
    _deactivate: function (t) {
      var e = x.ui.ddmanager.current;
      this.options.activeClass &&
        this.element.removeClass(this.options.activeClass),
        e && this._trigger("deactivate", t, this.ui(e));
    },
    _over: function (t) {
      var e = x.ui.ddmanager.current;
      e &&
        (e.currentItem || e.element)[0] !== this.element[0] &&
        this.accept.call(this.element[0], e.currentItem || e.element) &&
        (this.options.hoverClass &&
          this.element.addClass(this.options.hoverClass),
        this._trigger("over", t, this.ui(e)));
    },
    _out: function (t) {
      var e = x.ui.ddmanager.current;
      e &&
        (e.currentItem || e.element)[0] !== this.element[0] &&
        this.accept.call(this.element[0], e.currentItem || e.element) &&
        (this.options.hoverClass &&
          this.element.removeClass(this.options.hoverClass),
        this._trigger("out", t, this.ui(e)));
    },
    _drop: function (e, t) {
      var i = t || x.ui.ddmanager.current,
        s = !1;
      return (
        !(!i || (i.currentItem || i.element)[0] === this.element[0]) &&
        (this.element
          .find(":data(ui-droppable)")
          .not(".ui-draggable-dragging")
          .each(function () {
            var t = x(this).droppable("instance");
            if (
              t.options.greedy &&
              !t.options.disabled &&
              t.options.scope === i.options.scope &&
              t.accept.call(t.element[0], i.currentItem || i.element) &&
              x.ui.intersect(
                i,
                x.extend(t, { offset: t.element.offset() }),
                t.options.tolerance,
                e
              )
            )
              return !(s = !0);
          }),
        !s &&
          !!this.accept.call(this.element[0], i.currentItem || i.element) &&
          (this.options.activeClass &&
            this.element.removeClass(this.options.activeClass),
          this.options.hoverClass &&
            this.element.removeClass(this.options.hoverClass),
          this._trigger("drop", e, this.ui(i)),
          this.element))
      );
    },
    ui: function (t) {
      return {
        draggable: t.currentItem || t.element,
        helper: t.helper,
        position: t.position,
        offset: t.positionAbs,
      };
    },
  }),
    (x.ui.intersect = function (t, e, i, s) {
      if (!e.offset) return !1;
      var n = (t.positionAbs || t.position.absolute).left + t.margins.left,
        o = (t.positionAbs || t.position.absolute).top + t.margins.top,
        a = n + t.helperProportions.width,
        r = o + t.helperProportions.height,
        h = e.offset.left,
        l = e.offset.top,
        c = h + e.proportions().width,
        u = l + e.proportions().height;
      switch (i) {
        case "fit":
          return h <= n && a <= c && l <= o && r <= u;
        case "intersect":
          return (
            h < n + t.helperProportions.width / 2 &&
            a - t.helperProportions.width / 2 < c &&
            l < o + t.helperProportions.height / 2 &&
            r - t.helperProportions.height / 2 < u
          );
        case "pointer":
          return (
            tt(s.pageY, l, e.proportions().height) &&
            tt(s.pageX, h, e.proportions().width)
          );
        case "touch":
          return (
            ((l <= o && o <= u) || (l <= r && r <= u) || (o < l && u < r)) &&
            ((h <= n && n <= c) || (h <= a && a <= c) || (n < h && c < a))
          );
        default:
          return !1;
      }
    }),
    (x.ui.ddmanager = {
      current: null,
      droppables: { default: [] },
      prepareOffsets: function (t, e) {
        var i,
          s,
          n = x.ui.ddmanager.droppables[t.options.scope] || [],
          o = e ? e.type : null,
          a = (t.currentItem || t.element)
            .find(":data(ui-droppable)")
            .addBack();
        t: for (i = 0; i < n.length; i++)
          if (
            !(
              n[i].options.disabled ||
              (t &&
                !n[i].accept.call(n[i].element[0], t.currentItem || t.element))
            )
          ) {
            for (s = 0; s < a.length; s++)
              if (a[s] === n[i].element[0]) {
                n[i].proportions().height = 0;
                continue t;
              }
            (n[i].visible = "none" !== n[i].element.css("display")),
              n[i].visible &&
                ("mousedown" === o && n[i]._activate.call(n[i], e),
                (n[i].offset = n[i].element.offset()),
                n[i].proportions({
                  width: n[i].element[0].offsetWidth,
                  height: n[i].element[0].offsetHeight,
                }));
          }
      },
      drop: function (t, e) {
        var i = !1;
        return (
          x.each(
            (x.ui.ddmanager.droppables[t.options.scope] || []).slice(),
            function () {
              this.options &&
                (!this.options.disabled &&
                  this.visible &&
                  x.ui.intersect(t, this, this.options.tolerance, e) &&
                  (i = this._drop.call(this, e) || i),
                !this.options.disabled &&
                  this.visible &&
                  this.accept.call(
                    this.element[0],
                    t.currentItem || t.element
                  ) &&
                  ((this.isout = !0),
                  (this.isover = !1),
                  this._deactivate.call(this, e)));
            }
          ),
          i
        );
      },
      dragStart: function (t, e) {
        t.element.parentsUntil("body").bind("scroll.droppable", function () {
          t.options.refreshPositions || x.ui.ddmanager.prepareOffsets(t, e);
        });
      },
      drag: function (n, o) {
        n.options.refreshPositions && x.ui.ddmanager.prepareOffsets(n, o),
          x.each(x.ui.ddmanager.droppables[n.options.scope] || [], function () {
            var t, e, i, s;
            this.options.disabled ||
              this.greedyChild ||
              !this.visible ||
              ((s =
                !(s = x.ui.intersect(n, this, this.options.tolerance, o)) &&
                this.isover
                  ? "isout"
                  : s && !this.isover
                  ? "isover"
                  : null) &&
                (this.options.greedy &&
                  ((e = this.options.scope),
                  (i = this.element
                    .parents(":data(ui-droppable)")
                    .filter(function () {
                      return x(this).droppable("instance").options.scope === e;
                    })).length &&
                    ((t = x(i[0]).droppable("instance")).greedyChild =
                      "isover" === s)),
                t &&
                  "isover" === s &&
                  ((t.isover = !1), (t.isout = !0), t._out.call(t, o)),
                (this[s] = !0),
                (this["isout" === s ? "isover" : "isout"] = !1),
                this["isover" === s ? "_over" : "_out"].call(this, o),
                t &&
                  "isout" === s &&
                  ((t.isout = !1), (t.isover = !0), t._over.call(t, o))));
          });
      },
      dragStop: function (t, e) {
        t.element.parentsUntil("body").unbind("scroll.droppable"),
          t.options.refreshPositions || x.ui.ddmanager.prepareOffsets(t, e);
      },
    });
  x.ui.droppable;
  var v,
    _,
    b,
    et,
    it,
    y,
    w,
    I,
    T,
    P,
    st,
    nt,
    ot,
    at,
    rt,
    ht,
    lt,
    ct,
    M,
    ut = "ui-effects-",
    dt = x;
  function S(t, e, i) {
    var s = I[e.type] || {};
    return null == t
      ? i || !e.def
        ? null
        : e.def
      : ((t = s.floor ? ~~t : parseFloat(t)),
        isNaN(t)
          ? e.def
          : s.mod
          ? (t + s.mod) % s.mod
          : t < 0
          ? 0
          : s.max < t
          ? s.max
          : t);
  }
  function pt(s) {
    var n = y(),
      o = (n._rgba = []);
    return (
      (s = s.toLowerCase()),
      P(it, function (t, e) {
        var i = e.re.exec(s),
          i = i && e.parse(i),
          e = e.space || "rgba";
        if (i)
          return (
            (i = n[e](i)),
            (n[w[e].cache] = i[w[e].cache]),
            (o = n._rgba = i._rgba),
            !1
          );
      }),
      o.length
        ? ("0,0,0,0" === o.join() && v.extend(o, b.transparent), n)
        : b[s]
    );
  }
  function z(t, e, i) {
    return 6 * (i = (i + 1) % 1) < 1
      ? t + (e - t) * i * 6
      : 2 * i < 1
      ? e
      : 3 * i < 2
      ? t + (e - t) * (2 / 3 - i) * 6
      : t;
  }
  function ft(t) {
    var e,
      i,
      s = t.ownerDocument.defaultView
        ? t.ownerDocument.defaultView.getComputedStyle(t, null)
        : t.currentStyle,
      n = {};
    if (s && s.length && s[0] && s[s[0]])
      for (i = s.length; i--; )
        "string" == typeof s[(e = s[i])] && (n[x.camelCase(e)] = s[e]);
    else for (e in s) "string" == typeof s[e] && (n[e] = s[e]);
    return n;
  }
  function H(t, e, i, s) {
    return (
      (t = { effect: (t = x.isPlainObject(t) ? (e = t).effect : t) }),
      x.isFunction((e = null == e ? {} : e)) && ((s = e), (i = null), (e = {})),
      ("number" != typeof e && !x.fx.speeds[e]) || ((s = i), (i = e), (e = {})),
      x.isFunction(i) && ((s = i), (i = null)),
      e && x.extend(t, e),
      (i = i || e.duration),
      (t.duration = x.fx.off
        ? 0
        : "number" == typeof i
        ? i
        : i in x.fx.speeds
        ? x.fx.speeds[i]
        : x.fx.speeds._default),
      (t.complete = s || e.complete),
      t
    );
  }
  function A(t) {
    return (
      !t ||
      "number" == typeof t ||
      x.fx.speeds[t] ||
      ("string" == typeof t && !x.effects.effect[t]) ||
      x.isFunction(t) ||
      ("object" == typeof t && !t.effect)
    );
  }
  (x.effects = { effect: {} }),
    (et = /^([\-+])=\s*(\d+\.?\d*)/),
    (it = [
      {
        re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
        parse: function (t) {
          return [t[1], t[2], t[3], t[4]];
        },
      },
      {
        re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
        parse: function (t) {
          return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]];
        },
      },
      {
        re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
        parse: function (t) {
          return [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)];
        },
      },
      {
        re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
        parse: function (t) {
          return [
            parseInt(t[1] + t[1], 16),
            parseInt(t[2] + t[2], 16),
            parseInt(t[3] + t[3], 16),
          ];
        },
      },
      {
        re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
        space: "hsla",
        parse: function (t) {
          return [t[1], t[2] / 100, t[3] / 100, t[4]];
        },
      },
    ]),
    (y = (v = dt).Color =
      function (t, e, i, s) {
        return new v.Color.fn.parse(t, e, i, s);
      }),
    (w = {
      rgba: {
        props: {
          red: { idx: 0, type: "byte" },
          green: { idx: 1, type: "byte" },
          blue: { idx: 2, type: "byte" },
        },
      },
      hsla: {
        props: {
          hue: { idx: 0, type: "degrees" },
          saturation: { idx: 1, type: "percent" },
          lightness: { idx: 2, type: "percent" },
        },
      },
    }),
    (I = {
      byte: { floor: !0, max: 255 },
      percent: { max: 1 },
      degrees: { mod: 360, floor: !0 },
    }),
    (T = y.support = {}),
    (u = v("<p>")[0]),
    (P = v.each),
    (u.style.cssText = "background-color:rgba(1,1,1,.5)"),
    (T.rgba = -1 < u.style.backgroundColor.indexOf("rgba")),
    P(w, function (t, e) {
      (e.cache = "_" + t),
        (e.props.alpha = { idx: 3, type: "percent", def: 1 });
    }),
    ((y.fn = v.extend(y.prototype, {
      parse: function (n, t, e, i) {
        if (n === _) return (this._rgba = [null, null, null, null]), this;
        (n.jquery || n.nodeType) && ((n = v(n).css(t)), (t = _));
        var o = this,
          s = v.type(n),
          a = (this._rgba = []);
        return (
          t !== _ && ((n = [n, t, e, i]), (s = "array")),
          "string" === s
            ? this.parse(pt(n) || b._default)
            : "array" === s
            ? (P(w.rgba.props, function (t, e) {
                a[e.idx] = S(n[e.idx], e);
              }),
              this)
            : "object" === s
            ? (n instanceof y
                ? P(w, function (t, e) {
                    n[e.cache] && (o[e.cache] = n[e.cache].slice());
                  })
                : P(w, function (t, i) {
                    var s = i.cache;
                    P(i.props, function (t, e) {
                      if (!o[s] && i.to) {
                        if ("alpha" === t || null == n[t]) return;
                        o[s] = i.to(o._rgba);
                      }
                      o[s][e.idx] = S(n[t], e, !0);
                    }),
                      o[s] &&
                        v.inArray(null, o[s].slice(0, 3)) < 0 &&
                        ((o[s][3] = 1), i.from && (o._rgba = i.from(o[s])));
                  }),
              this)
            : void 0
        );
      },
      is: function (t) {
        var n = y(t),
          o = !0,
          a = this;
        return (
          P(w, function (t, e) {
            var i,
              s = n[e.cache];
            return (
              s &&
                ((i = a[e.cache] || (e.to && e.to(a._rgba)) || []),
                P(e.props, function (t, e) {
                  if (null != s[e.idx]) return (o = s[e.idx] === i[e.idx]);
                })),
              o
            );
          }),
          o
        );
      },
      _space: function () {
        var i = [],
          s = this;
        return (
          P(w, function (t, e) {
            s[e.cache] && i.push(t);
          }),
          i.pop()
        );
      },
      transition: function (t, a) {
        var t = (l = y(t))._space(),
          e = w[t],
          i = 0 === this.alpha() ? y("transparent") : this,
          r = i[e.cache] || e.to(i._rgba),
          h = r.slice(),
          l = l[e.cache];
        return (
          P(e.props, function (t, e) {
            var i = e.idx,
              s = r[i],
              n = l[i],
              o = I[e.type] || {};
            null !== n &&
              (null === s
                ? (h[i] = n)
                : (o.mod &&
                    (n - s > o.mod / 2
                      ? (s += o.mod)
                      : s - n > o.mod / 2 && (s -= o.mod)),
                  (h[i] = S((n - s) * a + s, e))));
          }),
          this[t](h)
        );
      },
      blend: function (t) {
        var e, i, s;
        return 1 === this._rgba[3]
          ? this
          : ((e = this._rgba.slice()),
            (i = e.pop()),
            (s = y(t)._rgba),
            y(
              v.map(e, function (t, e) {
                return (1 - i) * s[e] + i * t;
              })
            ));
      },
      toRgbaString: function () {
        var t = "rgba(",
          e = v.map(this._rgba, function (t, e) {
            return null == t ? (2 < e ? 1 : 0) : t;
          });
        return 1 === e[3] && (e.pop(), (t = "rgb(")), t + e.join() + ")";
      },
      toHslaString: function () {
        var t = "hsla(",
          e = v.map(this.hsla(), function (t, e) {
            return (
              null == t && (t = 2 < e ? 1 : 0),
              (t = e && e < 3 ? Math.round(100 * t) + "%" : t)
            );
          });
        return 1 === e[3] && (e.pop(), (t = "hsl(")), t + e.join() + ")";
      },
      toHexString: function (t) {
        var e = this._rgba.slice(),
          i = e.pop();
        return (
          t && e.push(~~(255 * i)),
          "#" +
            v
              .map(e, function (t) {
                return 1 === (t = (t || 0).toString(16)).length ? "0" + t : t;
              })
              .join("")
        );
      },
      toString: function () {
        return 0 === this._rgba[3] ? "transparent" : this.toRgbaString();
      },
    })).parse.prototype = y.fn),
    (w.hsla.to = function (t) {
      var e, i, s, n, o, a, r, h;
      return null == t[0] || null == t[1] || null == t[2]
        ? [null, null, null, t[3]]
        : ((e = t[0] / 255),
          (i = t[1] / 255),
          (s = t[2] / 255),
          (t = t[3]),
          (n = (h = Math.max(e, i, s)) - (r = Math.min(e, i, s))),
          (a = 0.5 * (o = h + r)),
          (r =
            r === h
              ? 0
              : e === h
              ? (60 * (i - s)) / n + 360
              : i === h
              ? (60 * (s - e)) / n + 120
              : (60 * (e - i)) / n + 240),
          (h = 0 == n ? 0 : a <= 0.5 ? n / o : n / (2 - o)),
          [Math.round(r) % 360, h, a, null == t ? 1 : t]);
    }),
    (w.hsla.from = function (t) {
      var e, i, s;
      return null == t[0] || null == t[1] || null == t[2]
        ? [null, null, null, t[3]]
        : ((e = t[0] / 360),
          (s = t[1]),
          (i = t[2]),
          (t = t[3]),
          (s = 2 * i - (i = i <= 0.5 ? i * (1 + s) : i + s - i * s)),
          [
            Math.round(255 * z(s, i, e + 1 / 3)),
            Math.round(255 * z(s, i, e)),
            Math.round(255 * z(s, i, e - 1 / 3)),
            t,
          ]);
    }),
    P(w, function (r, t) {
      var o = t.props,
        a = t.cache,
        h = t.to,
        l = t.from;
      (y.fn[r] = function (t) {
        var e, i, s, n;
        return (
          h && !this[a] && (this[a] = h(this._rgba)),
          t === _
            ? this[a].slice()
            : ((i = v.type(t)),
              (s = "array" === i || "object" === i ? t : arguments),
              (n = this[a].slice()),
              P(o, function (t, e) {
                t = s["object" === i ? t : e.idx];
                null == t && (t = n[e.idx]), (n[e.idx] = S(t, e));
              }),
              l ? (((e = y(l(n)))[a] = n), e) : y(n))
        );
      }),
        P(o, function (o, a) {
          y.fn[o] ||
            (y.fn[o] = function (t) {
              var e = v.type(t),
                i = "alpha" === o ? (this._hsla ? "hsla" : "rgba") : r,
                s = this[i](),
                n = s[a.idx];
              return "undefined" === e
                ? n
                : ("function" === e && ((t = t.call(this, n)), (e = v.type(t))),
                  null == t && a.empty
                    ? this
                    : ("string" === e &&
                        (e = et.exec(t)) &&
                        (t = n + parseFloat(e[2]) * ("+" === e[1] ? 1 : -1)),
                      (s[a.idx] = t),
                      this[i](s)));
            });
        });
    }),
    (y.hook = function (t) {
      t = t.split(" ");
      P(t, function (t, o) {
        (v.cssHooks[o] = {
          set: function (t, e) {
            var i,
              s,
              n = "";
            if (
              "transparent" !== e &&
              ("string" !== v.type(e) || (i = pt(e)))
            ) {
              if (((e = y(i || e)), !T.rgba && 1 !== e._rgba[3])) {
                for (
                  s = "backgroundColor" === o ? t.parentNode : t;
                  ("" === n || "transparent" === n) && s && s.style;

                )
                  try {
                    (n = v.css(s, "backgroundColor")), (s = s.parentNode);
                  } catch (t) {}
                e = e.blend(n && "transparent" !== n ? n : "_default");
              }
              e = e.toRgbaString();
            }
            try {
              t.style[o] = e;
            } catch (t) {}
          },
        }),
          (v.fx.step[o] = function (t) {
            t.colorInit ||
              ((t.start = y(t.elem, o)),
              (t.end = y(t.end)),
              (t.colorInit = !0)),
              v.cssHooks[o].set(t.elem, t.start.transition(t.end, t.pos));
          });
      });
    })(
      "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor"
    ),
    (v.cssHooks.borderColor = {
      expand: function (i) {
        var s = {};
        return (
          P(["Top", "Right", "Bottom", "Left"], function (t, e) {
            s["border" + e + "Color"] = i;
          }),
          s
        );
      },
    }),
    (b = v.Color.names =
      {
        aqua: "#00ffff",
        black: "#000000",
        blue: "#0000ff",
        fuchsia: "#ff00ff",
        gray: "#808080",
        green: "#008000",
        lime: "#00ff00",
        maroon: "#800000",
        navy: "#000080",
        olive: "#808000",
        purple: "#800080",
        red: "#ff0000",
        silver: "#c0c0c0",
        teal: "#008080",
        white: "#ffffff",
        yellow: "#ffff00",
        transparent: [null, null, null, 0],
        _default: "#ffffff",
      }),
    (at = ["add", "remove", "toggle"]),
    (rt = {
      border: 1,
      borderBottom: 1,
      borderColor: 1,
      borderLeft: 1,
      borderRight: 1,
      borderTop: 1,
      borderWidth: 1,
      margin: 1,
      padding: 1,
    }),
    x.each(
      [
        "borderLeftStyle",
        "borderRightStyle",
        "borderBottomStyle",
        "borderTopStyle",
      ],
      function (t, e) {
        x.fx.step[e] = function (t) {
          (("none" !== t.end && !t.setAttr) || (1 === t.pos && !t.setAttr)) &&
            (dt.style(t.elem, e, t.end), (t.setAttr = !0));
        };
      }
    ),
    x.fn.addBack ||
      (x.fn.addBack = function (t) {
        return this.add(
          null == t ? this.prevObject : this.prevObject.filter(t)
        );
      }),
    (x.effects.animateClass = function (n, t, e, i) {
      var o = x.speed(t, e, i);
      return this.queue(function () {
        var i = x(this),
          t = i.attr("class") || "",
          e = (e = o.children ? i.find("*").addBack() : i).map(function () {
            return { el: x(this), start: ft(this) };
          }),
          s = function () {
            x.each(at, function (t, e) {
              n[e] && i[e + "Class"](n[e]);
            });
          };
        s(),
          (e = e.map(function () {
            return (
              (this.end = ft(this.el[0])),
              (this.diff = (function (t, e) {
                var i,
                  s,
                  n = {};
                for (i in e)
                  (s = e[i]),
                    t[i] === s ||
                      rt[i] ||
                      (!x.fx.step[i] && isNaN(parseFloat(s))) ||
                      (n[i] = s);
                return n;
              })(this.start, this.end)),
              this
            );
          })),
          i.attr("class", t),
          (e = e.map(function () {
            var t = this,
              e = x.Deferred(),
              i = x.extend({}, o, {
                queue: !1,
                complete: function () {
                  e.resolve(t);
                },
              });
            return this.el.animate(this.diff, i), e.promise();
          })),
          x.when.apply(x, e.get()).done(function () {
            s(),
              x.each(arguments, function () {
                var e = this.el;
                x.each(this.diff, function (t) {
                  e.css(t, "");
                });
              }),
              o.complete.call(i[0]);
          });
      });
    }),
    x.fn.extend({
      addClass:
        ((ot = x.fn.addClass),
        function (t, e, i, s) {
          return e
            ? x.effects.animateClass.call(this, { add: t }, e, i, s)
            : ot.apply(this, arguments);
        }),
      removeClass:
        ((nt = x.fn.removeClass),
        function (t, e, i, s) {
          return 1 < arguments.length
            ? x.effects.animateClass.call(this, { remove: t }, e, i, s)
            : nt.apply(this, arguments);
        }),
      toggleClass:
        ((st = x.fn.toggleClass),
        function (t, e, i, s, n) {
          return "boolean" == typeof e || void 0 === e
            ? i
              ? x.effects.animateClass.call(
                  this,
                  e ? { add: t } : { remove: t },
                  i,
                  s,
                  n
                )
              : st.apply(this, arguments)
            : x.effects.animateClass.call(this, { toggle: t }, e, i, s);
        }),
      switchClass: function (t, e, i, s, n) {
        return x.effects.animateClass.call(
          this,
          { add: e, remove: t },
          i,
          s,
          n
        );
      },
    }),
    x.extend(x.effects, {
      version: "1.11.4",
      save: function (t, e) {
        for (var i = 0; i < e.length; i++)
          null !== e[i] && t.data(ut + e[i], t[0].style[e[i]]);
      },
      restore: function (t, e) {
        for (var i, s = 0; s < e.length; s++)
          null !== e[s] &&
            (void 0 === (i = t.data(ut + e[s])) && (i = ""), t.css(e[s], i));
      },
      setMode: function (t, e) {
        return (e = "toggle" === e ? (t.is(":hidden") ? "show" : "hide") : e);
      },
      getBaseline: function (t, e) {
        var i, s;
        switch (t[0]) {
          case "top":
            i = 0;
            break;
          case "middle":
            i = 0.5;
            break;
          case "bottom":
            i = 1;
            break;
          default:
            i = t[0] / e.height;
        }
        switch (t[1]) {
          case "left":
            s = 0;
            break;
          case "center":
            s = 0.5;
            break;
          case "right":
            s = 1;
            break;
          default:
            s = t[1] / e.width;
        }
        return { x: s, y: i };
      },
      createWrapper: function (i) {
        if (i.parent().is(".ui-effects-wrapper")) return i.parent();
        var s = {
            width: i.outerWidth(!0),
            height: i.outerHeight(!0),
            float: i.css("float"),
          },
          t = x("<div></div>")
            .addClass("ui-effects-wrapper")
            .css({
              fontSize: "100%",
              background: "transparent",
              border: "none",
              margin: 0,
              padding: 0,
            }),
          e = { width: i.width(), height: i.height() },
          n = document.activeElement;
        try {
          n.id;
        } catch (t) {
          n = document.body;
        }
        return (
          i.wrap(t),
          (i[0] !== n && !x.contains(i[0], n)) || x(n).focus(),
          (t = i.parent()),
          "static" === i.css("position")
            ? (t.css({ position: "relative" }), i.css({ position: "relative" }))
            : (x.extend(s, {
                position: i.css("position"),
                zIndex: i.css("z-index"),
              }),
              x.each(["top", "left", "bottom", "right"], function (t, e) {
                (s[e] = i.css(e)), isNaN(parseInt(s[e], 10)) && (s[e] = "auto");
              }),
              i.css({
                position: "relative",
                top: 0,
                left: 0,
                right: "auto",
                bottom: "auto",
              })),
          i.css(e),
          t.css(s).show()
        );
      },
      removeWrapper: function (t) {
        var e = document.activeElement;
        return (
          t.parent().is(".ui-effects-wrapper") &&
            (t.parent().replaceWith(t),
            (t[0] !== e && !x.contains(t[0], e)) || x(e).focus()),
          t
        );
      },
      setTransition: function (s, t, n, o) {
        return (
          (o = o || {}),
          x.each(t, function (t, e) {
            var i = s.cssUnit(e);
            0 < i[0] && (o[e] = i[0] * n + i[1]);
          }),
          o
        );
      },
    }),
    x.fn.extend({
      effect: function () {
        var o = H.apply(this, arguments),
          t = o.mode,
          e = o.queue,
          a = x.effects.effect[o.effect];
        return x.fx.off || !a
          ? t
            ? this[t](o.duration, o.complete)
            : this.each(function () {
                o.complete && o.complete.call(this);
              })
          : !1 === e
          ? this.each(i)
          : this.queue(e || "fx", i);
        function i(t) {
          var e = x(this),
            i = o.complete,
            s = o.mode;
          function n() {
            x.isFunction(i) && i.call(e[0]), x.isFunction(t) && t();
          }
          (e.is(":hidden") ? "hide" === s : "show" === s)
            ? (e[s](), n())
            : a.call(e[0], o, n);
        }
      },
      show:
        ((ct = x.fn.show),
        function (t) {
          var e;
          return A(t)
            ? ct.apply(this, arguments)
            : (((e = H.apply(this, arguments)).mode = "show"),
              this.effect.call(this, e));
        }),
      hide:
        ((lt = x.fn.hide),
        function (t) {
          var e;
          return A(t)
            ? lt.apply(this, arguments)
            : (((e = H.apply(this, arguments)).mode = "hide"),
              this.effect.call(this, e));
        }),
      toggle:
        ((ht = x.fn.toggle),
        function (t) {
          var e;
          return A(t) || "boolean" == typeof t
            ? ht.apply(this, arguments)
            : (((e = H.apply(this, arguments)).mode = "toggle"),
              this.effect.call(this, e));
        }),
      cssUnit: function (t) {
        var i = this.css(t),
          s = [];
        return (
          x.each(["em", "px", "%", "pt"], function (t, e) {
            0 < i.indexOf(e) && (s = [parseFloat(i), e]);
          }),
          s
        );
      },
    }),
    (M = {}),
    x.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (e, t) {
      M[t] = function (t) {
        return Math.pow(t, e + 2);
      };
    }),
    x.extend(M, {
      Sine: function (t) {
        return 1 - Math.cos((t * Math.PI) / 2);
      },
      Circ: function (t) {
        return 1 - Math.sqrt(1 - t * t);
      },
      Elastic: function (t) {
        return 0 === t || 1 === t
          ? t
          : -Math.pow(2, 8 * (t - 1)) *
              Math.sin(((80 * (t - 1) - 7.5) * Math.PI) / 15);
      },
      Back: function (t) {
        return t * t * (3 * t - 2);
      },
      Bounce: function (t) {
        for (var e, i = 4; t < ((e = Math.pow(2, --i)) - 1) / 11; );
        return (
          1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * e - 2) / 22 - t, 2)
        );
      },
    }),
    x.each(M, function (t, e) {
      (x.easing["easeIn" + t] = e),
        (x.easing["easeOut" + t] = function (t) {
          return 1 - e(1 - t);
        }),
        (x.easing["easeInOut" + t] = function (t) {
          return t < 0.5 ? e(2 * t) / 2 : 1 - e(-2 * t + 2) / 2;
        });
    });
  x.effects,
    (x.effects.effect.blind = function (t, e) {
      var i,
        s,
        n,
        o = x(this),
        a = ["position", "top", "bottom", "left", "right", "height", "width"],
        r = x.effects.setMode(o, t.mode || "hide"),
        h = t.direction || "up",
        l = /up|down|vertical/.test(h),
        c = l ? "height" : "width",
        u = l ? "top" : "left",
        h = /up|left|vertical|horizontal/.test(h),
        d = {},
        p = "show" === r;
      o.parent().is(".ui-effects-wrapper")
        ? x.effects.save(o.parent(), a)
        : x.effects.save(o, a),
        o.show(),
        (s = (i = x.effects.createWrapper(o).css({ overflow: "hidden" }))[c]()),
        (n = parseFloat(i.css(u)) || 0),
        (d[c] = p ? s : 0),
        h ||
          (o
            .css(l ? "bottom" : "right", 0)
            .css(l ? "top" : "left", "auto")
            .css({ position: "absolute" }),
          (d[u] = p ? n : s + n)),
        p && (i.css(c, 0), h || i.css(u, n + s)),
        i.animate(d, {
          duration: t.duration,
          easing: t.easing,
          queue: !1,
          complete: function () {
            "hide" === r && o.hide(),
              x.effects.restore(o, a),
              x.effects.removeWrapper(o),
              e();
          },
        });
    }),
    (x.effects.effect.bounce = function (t, e) {
      var i,
        s,
        n,
        o = x(this),
        a = ["position", "top", "bottom", "left", "right", "height", "width"],
        r = x.effects.setMode(o, t.mode || "effect"),
        h = "hide" === r,
        r = "show" === r,
        l = t.direction || "up",
        c = t.distance,
        u = t.times || 5,
        d = 2 * u + (r || h ? 1 : 0),
        p = t.duration / d,
        f = t.easing,
        m = "up" === l || "down" === l ? "top" : "left",
        g = "up" === l || "left" === l,
        t = o.queue(),
        l = t.length;
      for (
        (r || h) && a.push("opacity"),
          x.effects.save(o, a),
          o.show(),
          x.effects.createWrapper(o),
          c = c || o["top" == m ? "outerHeight" : "outerWidth"]() / 3,
          r &&
            (((n = { opacity: 1 })[m] = 0),
            o
              .css("opacity", 0)
              .css(m, g ? 2 * -c : 2 * c)
              .animate(n, p, f)),
          h && (c /= Math.pow(2, u - 1)),
          i = (n = {})[m] = 0;
        i < u;
        i++
      )
        ((s = {})[m] = (g ? "-=" : "+=") + c),
          o.animate(s, p, f).animate(n, p, f),
          (c = h ? 2 * c : c / 2);
      h &&
        (((s = { opacity: 0 })[m] = (g ? "-=" : "+=") + c), o.animate(s, p, f)),
        o.queue(function () {
          h && o.hide(),
            x.effects.restore(o, a),
            x.effects.removeWrapper(o),
            e();
        }),
        1 < l && t.splice.apply(t, [1, 0].concat(t.splice(l, 1 + d))),
        o.dequeue();
    }),
    (x.effects.effect.clip = function (t, e) {
      var i,
        s,
        n = x(this),
        o = ["position", "top", "bottom", "left", "right", "height", "width"],
        a = "show" === x.effects.setMode(n, t.mode || "hide"),
        r = "vertical" === (t.direction || "vertical"),
        h = r ? "height" : "width",
        r = r ? "top" : "left",
        l = {};
      x.effects.save(n, o),
        n.show(),
        (i = x.effects.createWrapper(n).css({ overflow: "hidden" })),
        (s = (i = "IMG" === n[0].tagName ? i : n)[h]()),
        a && (i.css(h, 0), i.css(r, s / 2)),
        (l[h] = a ? s : 0),
        (l[r] = a ? 0 : s / 2),
        i.animate(l, {
          queue: !1,
          duration: t.duration,
          easing: t.easing,
          complete: function () {
            a || n.hide(),
              x.effects.restore(n, o),
              x.effects.removeWrapper(n),
              e();
          },
        });
    }),
    (x.effects.effect.drop = function (t, e) {
      var i,
        s = x(this),
        n = [
          "position",
          "top",
          "bottom",
          "left",
          "right",
          "opacity",
          "height",
          "width",
        ],
        o = x.effects.setMode(s, t.mode || "hide"),
        a = "show" === o,
        r = t.direction || "left",
        h = "up" === r || "down" === r ? "top" : "left",
        r = "up" === r || "left" === r ? "pos" : "neg",
        l = { opacity: a ? 1 : 0 };
      x.effects.save(s, n),
        s.show(),
        x.effects.createWrapper(s),
        (i =
          t.distance || s["top" == h ? "outerHeight" : "outerWidth"](!0) / 2),
        a && s.css("opacity", 0).css(h, "pos" == r ? -i : i),
        (l[h] =
          (a ? ("pos" == r ? "+=" : "-=") : "pos" == r ? "-=" : "+=") + i),
        s.animate(l, {
          queue: !1,
          duration: t.duration,
          easing: t.easing,
          complete: function () {
            "hide" === o && s.hide(),
              x.effects.restore(s, n),
              x.effects.removeWrapper(s),
              e();
          },
        });
    }),
    (x.effects.effect.explode = function (t, e) {
      var i,
        s,
        n,
        o,
        a,
        r,
        h = t.pieces ? Math.round(Math.sqrt(t.pieces)) : 3,
        l = h,
        c = x(this),
        u = "show" === x.effects.setMode(c, t.mode || "hide"),
        d = c.show().css("visibility", "hidden").offset(),
        p = Math.ceil(c.outerWidth() / l),
        f = Math.ceil(c.outerHeight() / h),
        m = [];
      function g() {
        m.push(this),
          m.length === h * l &&
            (c.css({ visibility: "visible" }),
            x(m).remove(),
            u || c.hide(),
            e());
      }
      for (i = 0; i < h; i++)
        for (o = d.top + i * f, r = i - (h - 1) / 2, s = 0; s < l; s++)
          (n = d.left + s * p),
            (a = s - (l - 1) / 2),
            c
              .clone()
              .appendTo("body")
              .wrap("<div></div>")
              .css({
                position: "absolute",
                visibility: "visible",
                left: -s * p,
                top: -i * f,
              })
              .parent()
              .addClass("ui-effects-explode")
              .css({
                position: "absolute",
                overflow: "hidden",
                width: p,
                height: f,
                left: n + (u ? a * p : 0),
                top: o + (u ? r * f : 0),
                opacity: u ? 0 : 1,
              })
              .animate(
                {
                  left: n + (u ? 0 : a * p),
                  top: o + (u ? 0 : r * f),
                  opacity: u ? 1 : 0,
                },
                t.duration || 500,
                t.easing,
                g
              );
    }),
    (x.effects.effect.fade = function (t, e) {
      var i = x(this),
        s = x.effects.setMode(i, t.mode || "toggle");
      i.animate(
        { opacity: s },
        { queue: !1, duration: t.duration, easing: t.easing, complete: e }
      );
    }),
    (x.effects.effect.fold = function (t, e) {
      var i,
        s = x(this),
        n = ["position", "top", "bottom", "left", "right", "height", "width"],
        o = x.effects.setMode(s, t.mode || "hide"),
        a = "show" === o,
        r = "hide" === o,
        o = t.size || 15,
        h = /([0-9]+)%/.exec(o),
        l = !!t.horizFirst,
        c = a != l,
        u = c ? ["width", "height"] : ["height", "width"],
        d = t.duration / 2,
        p = {},
        f = {};
      x.effects.save(s, n),
        s.show(),
        (i = x.effects.createWrapper(s).css({ overflow: "hidden" })),
        (c = c ? [i.width(), i.height()] : [i.height(), i.width()]),
        h && (o = (parseInt(h[1], 10) / 100) * c[r ? 0 : 1]),
        a && i.css(l ? { height: 0, width: o } : { height: o, width: 0 }),
        (p[u[0]] = a ? c[0] : o),
        (f[u[1]] = a ? c[1] : 0),
        i.animate(p, d, t.easing).animate(f, d, t.easing, function () {
          r && s.hide(),
            x.effects.restore(s, n),
            x.effects.removeWrapper(s),
            e();
        });
    }),
    (x.effects.effect.highlight = function (t, e) {
      var i = x(this),
        s = ["backgroundImage", "backgroundColor", "opacity"],
        n = x.effects.setMode(i, t.mode || "show"),
        o = { backgroundColor: i.css("backgroundColor") };
      "hide" === n && (o.opacity = 0),
        x.effects.save(i, s),
        i
          .show()
          .css({
            backgroundImage: "none",
            backgroundColor: t.color || "#ffff99",
          })
          .animate(o, {
            queue: !1,
            duration: t.duration,
            easing: t.easing,
            complete: function () {
              "hide" === n && i.hide(), x.effects.restore(i, s), e();
            },
          });
    }),
    (x.effects.effect.size = function (o, t) {
      var e,
        a,
        r = x(this),
        i = [
          "position",
          "top",
          "bottom",
          "left",
          "right",
          "width",
          "height",
          "overflow",
          "opacity",
        ],
        h = ["width", "height", "overflow"],
        s = ["fontSize"],
        l = [
          "borderTopWidth",
          "borderBottomWidth",
          "paddingTop",
          "paddingBottom",
        ],
        c = [
          "borderLeftWidth",
          "borderRightWidth",
          "paddingLeft",
          "paddingRight",
        ],
        n = x.effects.setMode(r, o.mode || "effect"),
        u = o.restore || "effect" !== n,
        d = o.scale || "both",
        p = o.origin || ["middle", "center"],
        f = r.css("position"),
        m = u
          ? i
          : [
              "position",
              "top",
              "bottom",
              "left",
              "right",
              "overflow",
              "opacity",
            ],
        g = { height: 0, width: 0, outerHeight: 0, outerWidth: 0 };
      "show" === n && r.show(),
        (e = {
          height: r.height(),
          width: r.width(),
          outerHeight: r.outerHeight(),
          outerWidth: r.outerWidth(),
        }),
        "toggle" === o.mode && "show" === n
          ? ((r.from = o.to || g), (r.to = o.from || e))
          : ((r.from = o.from || ("show" === n ? g : e)),
            (r.to = o.to || ("hide" === n ? g : e))),
        (a = {
          from: { y: r.from.height / e.height, x: r.from.width / e.width },
          to: { y: r.to.height / e.height, x: r.to.width / e.width },
        }),
        ("box" !== d && "both" !== d) ||
          (a.from.y !== a.to.y &&
            ((m = m.concat(l)),
            (r.from = x.effects.setTransition(r, l, a.from.y, r.from)),
            (r.to = x.effects.setTransition(r, l, a.to.y, r.to))),
          a.from.x !== a.to.x &&
            ((m = m.concat(c)),
            (r.from = x.effects.setTransition(r, c, a.from.x, r.from)),
            (r.to = x.effects.setTransition(r, c, a.to.x, r.to)))),
        ("content" !== d && "both" !== d) ||
          (a.from.y !== a.to.y &&
            ((m = m.concat(s).concat(h)),
            (r.from = x.effects.setTransition(r, s, a.from.y, r.from)),
            (r.to = x.effects.setTransition(r, s, a.to.y, r.to)))),
        x.effects.save(r, m),
        r.show(),
        x.effects.createWrapper(r),
        r.css("overflow", "hidden").css(r.from),
        p &&
          ((g = x.effects.getBaseline(p, e)),
          (r.from.top = (e.outerHeight - r.outerHeight()) * g.y),
          (r.from.left = (e.outerWidth - r.outerWidth()) * g.x),
          (r.to.top = (e.outerHeight - r.to.outerHeight) * g.y),
          (r.to.left = (e.outerWidth - r.to.outerWidth) * g.x)),
        r.css(r.from),
        ("content" !== d && "both" !== d) ||
          ((l = l.concat(["marginTop", "marginBottom"]).concat(s)),
          (c = c.concat(["marginLeft", "marginRight"])),
          (h = i.concat(l).concat(c)),
          r.find("*[width]").each(function () {
            var t = x(this),
              e = t.height(),
              i = t.width(),
              s = t.outerHeight(),
              n = t.outerWidth();
            u && x.effects.save(t, h),
              (t.from = {
                height: e * a.from.y,
                width: i * a.from.x,
                outerHeight: s * a.from.y,
                outerWidth: n * a.from.x,
              }),
              (t.to = {
                height: e * a.to.y,
                width: i * a.to.x,
                outerHeight: e * a.to.y,
                outerWidth: i * a.to.x,
              }),
              a.from.y !== a.to.y &&
                ((t.from = x.effects.setTransition(t, l, a.from.y, t.from)),
                (t.to = x.effects.setTransition(t, l, a.to.y, t.to))),
              a.from.x !== a.to.x &&
                ((t.from = x.effects.setTransition(t, c, a.from.x, t.from)),
                (t.to = x.effects.setTransition(t, c, a.to.x, t.to))),
              t.css(t.from),
              t.animate(t.to, o.duration, o.easing, function () {
                u && x.effects.restore(t, h);
              });
          })),
        r.animate(r.to, {
          queue: !1,
          duration: o.duration,
          easing: o.easing,
          complete: function () {
            0 === r.to.opacity && r.css("opacity", r.from.opacity),
              "hide" === n && r.hide(),
              x.effects.restore(r, m),
              u ||
                ("static" === f
                  ? r.css({
                      position: "relative",
                      top: r.to.top,
                      left: r.to.left,
                    })
                  : x.each(["top", "left"], function (n, t) {
                      r.css(t, function (t, e) {
                        var i = parseInt(e, 10),
                          s = n ? r.to.left : r.to.top;
                        return "auto" === e ? s + "px" : i + s + "px";
                      });
                    })),
              x.effects.removeWrapper(r),
              t();
          },
        });
    }),
    (x.effects.effect.scale = function (t, e) {
      var i = x(this),
        s = x.extend(!0, {}, t),
        n = x.effects.setMode(i, t.mode || "effect"),
        o =
          parseInt(t.percent, 10) ||
          (0 === parseInt(t.percent, 10) || "hide" === n ? 0 : 100),
        a = t.direction || "both",
        r = t.origin,
        h = {
          height: i.height(),
          width: i.width(),
          outerHeight: i.outerHeight(),
          outerWidth: i.outerWidth(),
        },
        l = "horizontal" !== a ? o / 100 : 1,
        a = "vertical" !== a ? o / 100 : 1;
      (s.effect = "size"),
        (s.queue = !1),
        (s.complete = e),
        "effect" !== n &&
          ((s.origin = r || ["middle", "center"]), (s.restore = !0)),
        (s.from =
          t.from ||
          ("show" === n
            ? { height: 0, width: 0, outerHeight: 0, outerWidth: 0 }
            : h)),
        (s.to = {
          height: h.height * l,
          width: h.width * a,
          outerHeight: h.outerHeight * l,
          outerWidth: h.outerWidth * a,
        }),
        s.fade &&
          ("show" === n && ((s.from.opacity = 0), (s.to.opacity = 1)),
          "hide" === n && ((s.from.opacity = 1), (s.to.opacity = 0))),
        i.effect(s);
    }),
    (x.effects.effect.puff = function (t, e) {
      var i = x(this),
        s = x.effects.setMode(i, t.mode || "hide"),
        n = "hide" === s,
        o = parseInt(t.percent, 10) || 150,
        a = o / 100,
        r = {
          height: i.height(),
          width: i.width(),
          outerHeight: i.outerHeight(),
          outerWidth: i.outerWidth(),
        };
      x.extend(t, {
        effect: "scale",
        queue: !1,
        fade: !0,
        mode: s,
        complete: e,
        percent: n ? o : 100,
        from: n
          ? r
          : {
              height: r.height * a,
              width: r.width * a,
              outerHeight: r.outerHeight * a,
              outerWidth: r.outerWidth * a,
            },
      }),
        i.effect(t);
    }),
    (x.effects.effect.pulsate = function (t, e) {
      var i,
        s = x(this),
        n = x.effects.setMode(s, t.mode || "show"),
        o = "show" === n,
        a = "hide" === n,
        r = 2 * (t.times || 5) + (o || "hide" === n ? 1 : 0),
        h = t.duration / r,
        l = 0,
        n = s.queue(),
        c = n.length;
      for (
        (!o && s.is(":visible")) || (s.css("opacity", 0).show(), (l = 1)),
          i = 1;
        i < r;
        i++
      )
        s.animate({ opacity: l }, h, t.easing), (l = 1 - l);
      s.animate({ opacity: l }, h, t.easing),
        s.queue(function () {
          a && s.hide(), e();
        }),
        1 < c && n.splice.apply(n, [1, 0].concat(n.splice(c, 1 + r))),
        s.dequeue();
    }),
    (x.effects.effect.shake = function (t, e) {
      var i,
        s = x(this),
        n = ["position", "top", "bottom", "left", "right", "height", "width"],
        o = x.effects.setMode(s, t.mode || "effect"),
        a = t.direction || "left",
        r = t.distance || 20,
        h = t.times || 3,
        l = 2 * h + 1,
        c = Math.round(t.duration / l),
        u = "up" === a || "down" === a ? "top" : "left",
        a = "up" === a || "left" === a,
        d = {},
        p = {},
        f = {},
        m = s.queue(),
        g = m.length;
      for (
        x.effects.save(s, n),
          s.show(),
          x.effects.createWrapper(s),
          d[u] = (a ? "-=" : "+=") + r,
          p[u] = (a ? "+=" : "-=") + 2 * r,
          f[u] = (a ? "-=" : "+=") + 2 * r,
          s.animate(d, c, t.easing),
          i = 1;
        i < h;
        i++
      )
        s.animate(p, c, t.easing).animate(f, c, t.easing);
      s
        .animate(p, c, t.easing)
        .animate(d, c / 2, t.easing)
        .queue(function () {
          "hide" === o && s.hide(),
            x.effects.restore(s, n),
            x.effects.removeWrapper(s),
            e();
        }),
        1 < g && m.splice.apply(m, [1, 0].concat(m.splice(g, 1 + l))),
        s.dequeue();
    }),
    (x.effects.effect.slide = function (t, e) {
      var i,
        s = x(this),
        n = ["position", "top", "bottom", "left", "right", "width", "height"],
        o = x.effects.setMode(s, t.mode || "show"),
        a = "show" === o,
        r = t.direction || "left",
        h = "up" === r || "down" === r ? "top" : "left",
        r = "up" === r || "left" === r,
        l = {};
      x.effects.save(s, n),
        s.show(),
        (i = t.distance || s["top" == h ? "outerHeight" : "outerWidth"](!0)),
        x.effects.createWrapper(s).css({ overflow: "hidden" }),
        a && s.css(h, r ? (isNaN(i) ? "-" + i : -i) : i),
        (l[h] = (a ? (r ? "+=" : "-=") : r ? "-=" : "+=") + i),
        s.animate(l, {
          queue: !1,
          duration: t.duration,
          easing: t.easing,
          complete: function () {
            "hide" === o && s.hide(),
              x.effects.restore(s, n),
              x.effects.removeWrapper(s),
              e();
          },
        });
    }),
    (x.effects.effect.transfer = function (t, e) {
      var i = x(this),
        s = x(t.to),
        n = "fixed" === s.css("position"),
        o = x("body"),
        a = n ? o.scrollTop() : 0,
        o = n ? o.scrollLeft() : 0,
        r = s.offset(),
        r = {
          top: r.top - a,
          left: r.left - o,
          height: s.innerHeight(),
          width: s.innerWidth(),
        },
        s = i.offset(),
        h = x("<div class='ui-effects-transfer'></div>")
          .appendTo(document.body)
          .addClass(t.className)
          .css({
            top: s.top - a,
            left: s.left - o,
            height: i.innerHeight(),
            width: i.innerWidth(),
            position: n ? "fixed" : "absolute",
          })
          .animate(r, t.duration, t.easing, function () {
            h.remove(), e();
          });
    }),
    x.widget("ui.progressbar", {
      version: "1.11.4",
      options: { max: 100, value: 0, change: null, complete: null },
      min: 0,
      _create: function () {
        (this.oldValue = this.options.value = this._constrainedValue()),
          this.element
            .addClass(
              "ui-progressbar ui-widget ui-widget-content ui-corner-all"
            )
            .attr({ role: "progressbar", "aria-valuemin": this.min }),
          (this.valueDiv = x(
            "<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>"
          ).appendTo(this.element)),
          this._refreshValue();
      },
      _destroy: function () {
        this.element
          .removeClass(
            "ui-progressbar ui-widget ui-widget-content ui-corner-all"
          )
          .removeAttr("role")
          .removeAttr("aria-valuemin")
          .removeAttr("aria-valuemax")
          .removeAttr("aria-valuenow"),
          this.valueDiv.remove();
      },
      value: function (t) {
        if (void 0 === t) return this.options.value;
        (this.options.value = this._constrainedValue(t)), this._refreshValue();
      },
      _constrainedValue: function (t) {
        return (
          void 0 === t && (t = this.options.value),
          (this.indeterminate = !1 === t),
          "number" != typeof t && (t = 0),
          !this.indeterminate &&
            Math.min(this.options.max, Math.max(this.min, t))
        );
      },
      _setOptions: function (t) {
        var e = t.value;
        delete t.value,
          this._super(t),
          (this.options.value = this._constrainedValue(e)),
          this._refreshValue();
      },
      _setOption: function (t, e) {
        "max" === t && (e = Math.max(this.min, e)),
          "disabled" === t &&
            this.element
              .toggleClass("ui-state-disabled", !!e)
              .attr("aria-disabled", e),
          this._super(t, e);
      },
      _percentage: function () {
        return this.indeterminate
          ? 100
          : (100 * (this.options.value - this.min)) /
              (this.options.max - this.min);
      },
      _refreshValue: function () {
        var t = this.options.value,
          e = this._percentage();
        this.valueDiv
          .toggle(this.indeterminate || t > this.min)
          .toggleClass("ui-corner-right", t === this.options.max)
          .width(e.toFixed(0) + "%"),
          this.element.toggleClass(
            "ui-progressbar-indeterminate",
            this.indeterminate
          ),
          this.indeterminate
            ? (this.element.removeAttr("aria-valuenow"),
              this.overlayDiv ||
                (this.overlayDiv = x(
                  "<div class='ui-progressbar-overlay'></div>"
                ).appendTo(this.valueDiv)))
            : (this.element.attr({
                "aria-valuemax": this.options.max,
                "aria-valuenow": t,
              }),
              this.overlayDiv &&
                (this.overlayDiv.remove(), (this.overlayDiv = null))),
          this.oldValue !== t && ((this.oldValue = t), this._trigger("change")),
          t === this.options.max && this._trigger("complete");
      },
    }),
    x.widget("ui.selectable", x.ui.mouse, {
      version: "1.11.4",
      options: {
        appendTo: "body",
        autoRefresh: !0,
        distance: 0,
        filter: "*",
        tolerance: "touch",
        selected: null,
        selecting: null,
        start: null,
        stop: null,
        unselected: null,
        unselecting: null,
      },
      _create: function () {
        var t,
          e = this;
        this.element.addClass("ui-selectable"),
          (this.dragged = !1),
          (this.refresh = function () {
            (t = x(e.options.filter, e.element[0])).addClass("ui-selectee"),
              t.each(function () {
                var t = x(this),
                  e = t.offset();
                x.data(this, "selectable-item", {
                  element: this,
                  $element: t,
                  left: e.left,
                  top: e.top,
                  right: e.left + t.outerWidth(),
                  bottom: e.top + t.outerHeight(),
                  startselected: !1,
                  selected: t.hasClass("ui-selected"),
                  selecting: t.hasClass("ui-selecting"),
                  unselecting: t.hasClass("ui-unselecting"),
                });
              });
          }),
          this.refresh(),
          (this.selectees = t.addClass("ui-selectee")),
          this._mouseInit(),
          (this.helper = x("<div class='ui-selectable-helper'></div>"));
      },
      _destroy: function () {
        this.selectees.removeClass("ui-selectee").removeData("selectable-item"),
          this.element.removeClass("ui-selectable ui-selectable-disabled"),
          this._mouseDestroy();
      },
      _mouseStart: function (i) {
        var s = this,
          t = this.options;
        (this.opos = [i.pageX, i.pageY]),
          this.options.disabled ||
            ((this.selectees = x(t.filter, this.element[0])),
            this._trigger("start", i),
            x(t.appendTo).append(this.helper),
            this.helper.css({
              left: i.pageX,
              top: i.pageY,
              width: 0,
              height: 0,
            }),
            t.autoRefresh && this.refresh(),
            this.selectees.filter(".ui-selected").each(function () {
              var t = x.data(this, "selectable-item");
              (t.startselected = !0),
                i.metaKey ||
                  i.ctrlKey ||
                  (t.$element.removeClass("ui-selected"),
                  (t.selected = !1),
                  t.$element.addClass("ui-unselecting"),
                  (t.unselecting = !0),
                  s._trigger("unselecting", i, { unselecting: t.element }));
            }),
            x(i.target)
              .parents()
              .addBack()
              .each(function () {
                var t,
                  e = x.data(this, "selectable-item");
                if (e)
                  return (
                    (t =
                      (!i.metaKey && !i.ctrlKey) ||
                      !e.$element.hasClass("ui-selected")),
                    e.$element
                      .removeClass(t ? "ui-unselecting" : "ui-selected")
                      .addClass(t ? "ui-selecting" : "ui-unselecting"),
                    (e.unselecting = !t),
                    (e.selecting = t),
                    (e.selected = t)
                      ? s._trigger("selecting", i, { selecting: e.element })
                      : s._trigger("unselecting", i, {
                          unselecting: e.element,
                        }),
                    !1
                  );
              }));
      },
      _mouseDrag: function (i) {
        var t, s, n, o, a, r, h;
        if (((this.dragged = !0), !this.options.disabled))
          return (
            (n = (s = this).options),
            (o = this.opos[0]),
            (a = this.opos[1]),
            (r = i.pageX),
            (h = i.pageY),
            r < o && ((t = r), (r = o), (o = t)),
            h < a && ((t = h), (h = a), (a = t)),
            this.helper.css({ left: o, top: a, width: r - o, height: h - a }),
            this.selectees.each(function () {
              var t = x.data(this, "selectable-item"),
                e = !1;
              t &&
                t.element !== s.element[0] &&
                ("touch" === n.tolerance
                  ? (e = !(
                      t.left > r ||
                      t.right < o ||
                      t.top > h ||
                      t.bottom < a
                    ))
                  : "fit" === n.tolerance &&
                    (e =
                      t.left > o && t.right < r && t.top > a && t.bottom < h),
                e
                  ? (t.selected &&
                      (t.$element.removeClass("ui-selected"),
                      (t.selected = !1)),
                    t.unselecting &&
                      (t.$element.removeClass("ui-unselecting"),
                      (t.unselecting = !1)),
                    t.selecting ||
                      (t.$element.addClass("ui-selecting"),
                      (t.selecting = !0),
                      s._trigger("selecting", i, { selecting: t.element })))
                  : (t.selecting &&
                      ((i.metaKey || i.ctrlKey) && t.startselected
                        ? (t.$element.removeClass("ui-selecting"),
                          (t.selecting = !1),
                          t.$element.addClass("ui-selected"),
                          (t.selected = !0))
                        : (t.$element.removeClass("ui-selecting"),
                          (t.selecting = !1),
                          t.startselected &&
                            (t.$element.addClass("ui-unselecting"),
                            (t.unselecting = !0)),
                          s._trigger("unselecting", i, {
                            unselecting: t.element,
                          }))),
                    !t.selected ||
                      i.metaKey ||
                      i.ctrlKey ||
                      t.startselected ||
                      (t.$element.removeClass("ui-selected"),
                      (t.selected = !1),
                      t.$element.addClass("ui-unselecting"),
                      (t.unselecting = !0),
                      s._trigger("unselecting", i, {
                        unselecting: t.element,
                      }))));
            }),
            !1
          );
      },
      _mouseStop: function (e) {
        var i = this;
        return (
          (this.dragged = !1),
          x(".ui-unselecting", this.element[0]).each(function () {
            var t = x.data(this, "selectable-item");
            t.$element.removeClass("ui-unselecting"),
              (t.unselecting = !1),
              (t.startselected = !1),
              i._trigger("unselected", e, { unselected: t.element });
          }),
          x(".ui-selecting", this.element[0]).each(function () {
            var t = x.data(this, "selectable-item");
            t.$element.removeClass("ui-selecting").addClass("ui-selected"),
              (t.selecting = !1),
              (t.selected = !0),
              (t.startselected = !0),
              i._trigger("selected", e, { selected: t.element });
          }),
          this._trigger("stop", e),
          this.helper.remove(),
          !1
        );
      },
    }),
    x.widget("ui.selectmenu", {
      version: "1.11.4",
      defaultElement: "<select>",
      options: {
        appendTo: null,
        disabled: null,
        icons: { button: "ui-icon-triangle-1-s" },
        position: { my: "left top", at: "left bottom", collision: "none" },
        width: null,
        change: null,
        close: null,
        focus: null,
        open: null,
        select: null,
      },
      _create: function () {
        var t = this.element.uniqueId().attr("id");
        (this.ids = { element: t, button: t + "-button", menu: t + "-menu" }),
          this._drawButton(),
          this._drawMenu(),
          this.options.disabled && this.disable();
      },
      _drawButton: function () {
        var t = this;
        (this.label = x("label[for='" + this.ids.element + "']").attr(
          "for",
          this.ids.button
        )),
          this._on(this.label, {
            click: function (t) {
              this.button.focus(), t.preventDefault();
            },
          }),
          this.element.hide(),
          (this.button = x("<span>", {
            class:
              "ui-selectmenu-button ui-widget ui-state-default ui-corner-all",
            tabindex: this.options.disabled ? -1 : 0,
            id: this.ids.button,
            role: "combobox",
            "aria-expanded": "false",
            "aria-autocomplete": "list",
            "aria-owns": this.ids.menu,
            "aria-haspopup": "true",
          }).insertAfter(this.element)),
          x("<span>", {
            class: "ui-icon " + this.options.icons.button,
          }).prependTo(this.button),
          (this.buttonText = x("<span>", {
            class: "ui-selectmenu-text",
          }).appendTo(this.button)),
          this._setText(
            this.buttonText,
            this.element.find("option:selected").text()
          ),
          this._resizeButton(),
          this._on(this.button, this._buttonEvents),
          this.button.one("focusin", function () {
            t.menuItems || t._refreshMenu();
          }),
          this._hoverable(this.button),
          this._focusable(this.button);
      },
      _drawMenu: function () {
        var i = this;
        (this.menu = x("<ul>", {
          "aria-hidden": "true",
          "aria-labelledby": this.ids.button,
          id: this.ids.menu,
        })),
          (this.menuWrap = x("<div>", { class: "ui-selectmenu-menu ui-front" })
            .append(this.menu)
            .appendTo(this._appendTo())),
          (this.menuInstance = this.menu
            .menu({
              role: "listbox",
              select: function (t, e) {
                t.preventDefault(),
                  i._setSelection(),
                  i._select(e.item.data("ui-selectmenu-item"), t);
              },
              focus: function (t, e) {
                e = e.item.data("ui-selectmenu-item");
                null != i.focusIndex &&
                  e.index !== i.focusIndex &&
                  (i._trigger("focus", t, { item: e }),
                  i.isOpen || i._select(e, t)),
                  (i.focusIndex = e.index),
                  i.button.attr(
                    "aria-activedescendant",
                    i.menuItems.eq(e.index).attr("id")
                  );
              },
            })
            .menu("instance")),
          this.menu.addClass("ui-corner-bottom").removeClass("ui-corner-all"),
          this.menuInstance._off(this.menu, "mouseleave"),
          (this.menuInstance._closeOnDocumentClick = function () {
            return !1;
          }),
          (this.menuInstance._isDivider = function () {
            return !1;
          });
      },
      refresh: function () {
        this._refreshMenu(),
          this._setText(this.buttonText, this._getSelectedItem().text()),
          this.options.width || this._resizeButton();
      },
      _refreshMenu: function () {
        this.menu.empty();
        var t = this.element.find("option");
        t.length &&
          (this._parseOptions(t),
          this._renderMenu(this.menu, this.items),
          this.menuInstance.refresh(),
          (this.menuItems = this.menu
            .find("li")
            .not(".ui-selectmenu-optgroup")),
          (t = this._getSelectedItem()),
          this.menuInstance.focus(null, t),
          this._setAria(t.data("ui-selectmenu-item")),
          this._setOption("disabled", this.element.prop("disabled")));
      },
      open: function (t) {
        this.options.disabled ||
          (this.menuItems
            ? (this.menu.find(".ui-state-focus").removeClass("ui-state-focus"),
              this.menuInstance.focus(null, this._getSelectedItem()))
            : this._refreshMenu(),
          (this.isOpen = !0),
          this._toggleAttr(),
          this._resizeMenu(),
          this._position(),
          this._on(this.document, this._documentClick),
          this._trigger("open", t));
      },
      _position: function () {
        this.menuWrap.position(
          x.extend({ of: this.button }, this.options.position)
        );
      },
      close: function (t) {
        this.isOpen &&
          ((this.isOpen = !1),
          this._toggleAttr(),
          (this.range = null),
          this._off(this.document),
          this._trigger("close", t));
      },
      widget: function () {
        return this.button;
      },
      menuWidget: function () {
        return this.menu;
      },
      _renderMenu: function (i, t) {
        var s = this,
          n = "";
        x.each(t, function (t, e) {
          e.optgroup !== n &&
            (x("<li>", {
              class:
                "ui-selectmenu-optgroup ui-menu-divider" +
                (e.element.parent("optgroup").prop("disabled")
                  ? " ui-state-disabled"
                  : ""),
              text: e.optgroup,
            }).appendTo(i),
            (n = e.optgroup)),
            s._renderItemData(i, e);
        });
      },
      _renderItemData: function (t, e) {
        return this._renderItem(t, e).data("ui-selectmenu-item", e);
      },
      _renderItem: function (t, e) {
        var i = x("<li>");
        return (
          e.disabled && i.addClass("ui-state-disabled"),
          this._setText(i, e.label),
          i.appendTo(t)
        );
      },
      _setText: function (t, e) {
        e ? t.text(e) : t.html("&#160;");
      },
      _move: function (t, e) {
        var i,
          s = ".ui-menu-item";
        this.isOpen
          ? (i = this.menuItems.eq(this.focusIndex))
          : ((i = this.menuItems.eq(this.element[0].selectedIndex)),
            (s += ":not(.ui-state-disabled)")),
          (i =
            "first" === t || "last" === t
              ? i["first" === t ? "prevAll" : "nextAll"](s).eq(-1)
              : i[t + "All"](s).eq(0)).length && this.menuInstance.focus(e, i);
      },
      _getSelectedItem: function () {
        return this.menuItems.eq(this.element[0].selectedIndex);
      },
      _toggle: function (t) {
        this[this.isOpen ? "close" : "open"](t);
      },
      _setSelection: function () {
        var t;
        this.range &&
          (window.getSelection
            ? ((t = window.getSelection()).removeAllRanges(),
              t.addRange(this.range))
            : this.range.select(),
          this.button.focus());
      },
      _documentClick: {
        mousedown: function (t) {
          !this.isOpen ||
            x(t.target).closest(".ui-selectmenu-menu, #" + this.ids.button)
              .length ||
            this.close(t);
        },
      },
      _buttonEvents: {
        mousedown: function () {
          var t;
          window.getSelection
            ? (t = window.getSelection()).rangeCount &&
              (this.range = t.getRangeAt(0))
            : (this.range = document.selection.createRange());
        },
        click: function (t) {
          this._setSelection(), this._toggle(t);
        },
        keydown: function (t) {
          var e = !0;
          switch (t.keyCode) {
            case x.ui.keyCode.TAB:
            case x.ui.keyCode.ESCAPE:
              this.close(t), (e = !1);
              break;
            case x.ui.keyCode.ENTER:
              this.isOpen && this._selectFocusedItem(t);
              break;
            case x.ui.keyCode.UP:
              t.altKey ? this._toggle(t) : this._move("prev", t);
              break;
            case x.ui.keyCode.DOWN:
              t.altKey ? this._toggle(t) : this._move("next", t);
              break;
            case x.ui.keyCode.SPACE:
              this.isOpen ? this._selectFocusedItem(t) : this._toggle(t);
              break;
            case x.ui.keyCode.LEFT:
              this._move("prev", t);
              break;
            case x.ui.keyCode.RIGHT:
              this._move("next", t);
              break;
            case x.ui.keyCode.HOME:
            case x.ui.keyCode.PAGE_UP:
              this._move("first", t);
              break;
            case x.ui.keyCode.END:
            case x.ui.keyCode.PAGE_DOWN:
              this._move("last", t);
              break;
            default:
              this.menu.trigger(t), (e = !1);
          }
          e && t.preventDefault();
        },
      },
      _selectFocusedItem: function (t) {
        var e = this.menuItems.eq(this.focusIndex);
        e.hasClass("ui-state-disabled") ||
          this._select(e.data("ui-selectmenu-item"), t);
      },
      _select: function (t, e) {
        var i = this.element[0].selectedIndex;
        (this.element[0].selectedIndex = t.index),
          this._setText(this.buttonText, t.label),
          this._setAria(t),
          this._trigger("select", e, { item: t }),
          t.index !== i && this._trigger("change", e, { item: t }),
          this.close(e);
      },
      _setAria: function (t) {
        t = this.menuItems.eq(t.index).attr("id");
        this.button.attr({ "aria-labelledby": t, "aria-activedescendant": t }),
          this.menu.attr("aria-activedescendant", t);
      },
      _setOption: function (t, e) {
        "icons" === t &&
          this.button
            .find("span.ui-icon")
            .removeClass(this.options.icons.button)
            .addClass(e.button),
          this._super(t, e),
          "appendTo" === t && this.menuWrap.appendTo(this._appendTo()),
          "disabled" === t &&
            (this.menuInstance.option("disabled", e),
            this.button
              .toggleClass("ui-state-disabled", e)
              .attr("aria-disabled", e),
            this.element.prop("disabled", e),
            e
              ? (this.button.attr("tabindex", -1), this.close())
              : this.button.attr("tabindex", 0)),
          "width" === t && this._resizeButton();
      },
      _appendTo: function () {
        var t = this.options.appendTo;
        return (t = (t =
          (t =
            t &&
            (t.jquery || t.nodeType ? x(t) : this.document.find(t).eq(0))) &&
          t[0]
            ? t
            : this.element.closest(".ui-front")).length
          ? t
          : this.document[0].body);
      },
      _toggleAttr: function () {
        this.button
          .toggleClass("ui-corner-top", this.isOpen)
          .toggleClass("ui-corner-all", !this.isOpen)
          .attr("aria-expanded", this.isOpen),
          this.menuWrap.toggleClass("ui-selectmenu-open", this.isOpen),
          this.menu.attr("aria-hidden", !this.isOpen);
      },
      _resizeButton: function () {
        var t = this.options.width;
        t || ((t = this.element.show().outerWidth()), this.element.hide()),
          this.button.outerWidth(t);
      },
      _resizeMenu: function () {
        this.menu.outerWidth(
          Math.max(
            this.button.outerWidth(),
            this.menu.width("").outerWidth() + 1
          )
        );
      },
      _getCreateOptions: function () {
        return { disabled: this.element.prop("disabled") };
      },
      _parseOptions: function (t) {
        var s = [];
        t.each(function (t, e) {
          var e = x(e),
            i = e.parent("optgroup");
          s.push({
            element: e,
            index: t,
            value: e.val(),
            label: e.text(),
            optgroup: i.attr("label") || "",
            disabled: i.prop("disabled") || e.prop("disabled"),
          });
        }),
          (this.items = s);
      },
      _destroy: function () {
        this.menuWrap.remove(),
          this.button.remove(),
          this.element.show(),
          this.element.removeUniqueId(),
          this.label.attr("for", this.ids.element);
      },
    }),
    x.widget("ui.slider", x.ui.mouse, {
      version: "1.11.4",
      widgetEventPrefix: "slide",
      options: {
        animate: !1,
        distance: 0,
        max: 100,
        min: 0,
        orientation: "horizontal",
        range: !1,
        step: 1,
        value: 0,
        values: null,
        change: null,
        slide: null,
        start: null,
        stop: null,
      },
      numPages: 5,
      _create: function () {
        (this._keySliding = !1),
          (this._mouseSliding = !1),
          (this._animateOff = !0),
          (this._handleIndex = null),
          this._detectOrientation(),
          this._mouseInit(),
          this._calculateNewMax(),
          this.element.addClass(
            "ui-slider ui-slider-" +
              this.orientation +
              " ui-widget ui-widget-content ui-corner-all"
          ),
          this._refresh(),
          this._setOption("disabled", this.options.disabled),
          (this._animateOff = !1);
      },
      _refresh: function () {
        this._createRange(),
          this._createHandles(),
          this._setupEvents(),
          this._refreshValue();
      },
      _createHandles: function () {
        var t,
          e = this.options,
          i = this.element
            .find(".ui-slider-handle")
            .addClass("ui-state-default ui-corner-all"),
          s = [],
          n = (e.values && e.values.length) || 1;
        for (
          i.length > n && (i.slice(n).remove(), (i = i.slice(0, n))),
            t = i.length;
          t < n;
          t++
        )
          s.push(
            "<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>"
          );
        (this.handles = i.add(x(s.join("")).appendTo(this.element))),
          (this.handle = this.handles.eq(0)),
          this.handles.each(function (t) {
            x(this).data("ui-slider-handle-index", t);
          });
      },
      _createRange: function () {
        var t = this.options,
          e = "";
        t.range
          ? (!0 === t.range &&
              (t.values
                ? t.values.length && 2 !== t.values.length
                  ? (t.values = [t.values[0], t.values[0]])
                  : x.isArray(t.values) && (t.values = t.values.slice(0))
                : (t.values = [this._valueMin(), this._valueMin()])),
            this.range && this.range.length
              ? this.range
                  .removeClass("ui-slider-range-min ui-slider-range-max")
                  .css({ left: "", bottom: "" })
              : ((this.range = x("<div></div>").appendTo(this.element)),
                (e = "ui-slider-range ui-widget-header ui-corner-all")),
            this.range.addClass(
              e +
                ("min" === t.range || "max" === t.range
                  ? " ui-slider-range-" + t.range
                  : "")
            ))
          : (this.range && this.range.remove(), (this.range = null));
      },
      _setupEvents: function () {
        this._off(this.handles),
          this._on(this.handles, this._handleEvents),
          this._hoverable(this.handles),
          this._focusable(this.handles);
      },
      _destroy: function () {
        this.handles.remove(),
          this.range && this.range.remove(),
          this.element.removeClass(
            "ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"
          ),
          this._mouseDestroy();
      },
      _mouseCapture: function (t) {
        var i,
          s,
          n,
          o,
          e,
          a,
          r = this,
          h = this.options;
        return (
          !h.disabled &&
          ((this.elementSize = {
            width: this.element.outerWidth(),
            height: this.element.outerHeight(),
          }),
          (this.elementOffset = this.element.offset()),
          (e = { x: t.pageX, y: t.pageY }),
          (i = this._normValueFromMouse(e)),
          (s = this._valueMax() - this._valueMin() + 1),
          this.handles.each(function (t) {
            var e = Math.abs(i - r.values(t));
            (e < s ||
              (s === e &&
                (t === r._lastChangedValue || r.values(t) === h.min))) &&
              ((s = e), (n = x(this)), (o = t));
          }),
          !1 !== this._start(t, o) &&
            ((this._mouseSliding = !0),
            (this._handleIndex = o),
            n.addClass("ui-state-active").focus(),
            (e = n.offset()),
            (a = !x(t.target).parents().addBack().is(".ui-slider-handle")),
            (this._clickOffset = a
              ? { left: 0, top: 0 }
              : {
                  left: t.pageX - e.left - n.width() / 2,
                  top:
                    t.pageY -
                    e.top -
                    n.height() / 2 -
                    (parseInt(n.css("borderTopWidth"), 10) || 0) -
                    (parseInt(n.css("borderBottomWidth"), 10) || 0) +
                    (parseInt(n.css("marginTop"), 10) || 0),
                }),
            this.handles.hasClass("ui-state-hover") || this._slide(t, o, i),
            (this._animateOff = !0)))
        );
      },
      _mouseStart: function () {
        return !0;
      },
      _mouseDrag: function (t) {
        var e = { x: t.pageX, y: t.pageY },
          e = this._normValueFromMouse(e);
        return this._slide(t, this._handleIndex, e), !1;
      },
      _mouseStop: function (t) {
        return (
          this.handles.removeClass("ui-state-active"),
          (this._mouseSliding = !1),
          this._stop(t, this._handleIndex),
          this._change(t, this._handleIndex),
          (this._handleIndex = null),
          (this._clickOffset = null),
          (this._animateOff = !1)
        );
      },
      _detectOrientation: function () {
        this.orientation =
          "vertical" === this.options.orientation ? "vertical" : "horizontal";
      },
      _normValueFromMouse: function (t) {
        var e,
          t =
            "horizontal" === this.orientation
              ? ((e = this.elementSize.width),
                t.x -
                  this.elementOffset.left -
                  (this._clickOffset ? this._clickOffset.left : 0))
              : ((e = this.elementSize.height),
                t.y -
                  this.elementOffset.top -
                  (this._clickOffset ? this._clickOffset.top : 0)),
          t = t / e;
        return (
          (t = 1 < t ? 1 : t) < 0 && (t = 0),
          "vertical" === this.orientation && (t = 1 - t),
          (e = this._valueMax() - this._valueMin()),
          (t = this._valueMin() + t * e),
          this._trimAlignValue(t)
        );
      },
      _start: function (t, e) {
        var i = { handle: this.handles[e], value: this.value() };
        return (
          this.options.values &&
            this.options.values.length &&
            ((i.value = this.values(e)), (i.values = this.values())),
          this._trigger("start", t, i)
        );
      },
      _slide: function (t, e, i) {
        var s, n;
        this.options.values && this.options.values.length
          ? ((s = this.values(e ? 0 : 1)),
            (i =
              2 === this.options.values.length &&
              !0 === this.options.range &&
              ((0 === e && s < i) || (1 === e && i < s))
                ? s
                : i) !== this.values(e) &&
              (((n = this.values())[e] = i),
              (n = this._trigger("slide", t, {
                handle: this.handles[e],
                value: i,
                values: n,
              })),
              (s = this.values(e ? 0 : 1)),
              !1 !== n && this.values(e, i)))
          : i !== this.value() &&
            !1 !==
              (n = this._trigger("slide", t, {
                handle: this.handles[e],
                value: i,
              })) &&
            this.value(i);
      },
      _stop: function (t, e) {
        var i = { handle: this.handles[e], value: this.value() };
        this.options.values &&
          this.options.values.length &&
          ((i.value = this.values(e)), (i.values = this.values())),
          this._trigger("stop", t, i);
      },
      _change: function (t, e) {
        var i;
        this._keySliding ||
          this._mouseSliding ||
          ((i = { handle: this.handles[e], value: this.value() }),
          this.options.values &&
            this.options.values.length &&
            ((i.value = this.values(e)), (i.values = this.values())),
          (this._lastChangedValue = e),
          this._trigger("change", t, i));
      },
      value: function (t) {
        if (!arguments.length) return this._value();
        (this.options.value = this._trimAlignValue(t)),
          this._refreshValue(),
          this._change(null, 0);
      },
      values: function (t, e) {
        var i, s, n;
        if (1 < arguments.length)
          (this.options.values[t] = this._trimAlignValue(e)),
            this._refreshValue(),
            this._change(null, t);
        else {
          if (!arguments.length) return this._values();
          if (!x.isArray(t))
            return this.options.values && this.options.values.length
              ? this._values(t)
              : this.value();
          for (i = this.options.values, s = t, n = 0; n < i.length; n += 1)
            (i[n] = this._trimAlignValue(s[n])), this._change(null, n);
          this._refreshValue();
        }
      },
      _setOption: function (t, e) {
        var i,
          s = 0;
        switch (
          ("range" === t &&
            !0 === this.options.range &&
            ("min" === e
              ? ((this.options.value = this._values(0)),
                (this.options.values = null))
              : "max" === e &&
                ((this.options.value = this._values(
                  this.options.values.length - 1
                )),
                (this.options.values = null))),
          x.isArray(this.options.values) && (s = this.options.values.length),
          "disabled" === t &&
            this.element.toggleClass("ui-state-disabled", !!e),
          this._super(t, e),
          t)
        ) {
          case "orientation":
            this._detectOrientation(),
              this.element
                .removeClass("ui-slider-horizontal ui-slider-vertical")
                .addClass("ui-slider-" + this.orientation),
              this._refreshValue(),
              this.handles.css("horizontal" === e ? "bottom" : "left", "");
            break;
          case "value":
            (this._animateOff = !0),
              this._refreshValue(),
              this._change(null, 0),
              (this._animateOff = !1);
            break;
          case "values":
            for (
              this._animateOff = !0, this._refreshValue(), i = 0;
              i < s;
              i += 1
            )
              this._change(null, i);
            this._animateOff = !1;
            break;
          case "step":
          case "min":
          case "max":
            (this._animateOff = !0),
              this._calculateNewMax(),
              this._refreshValue(),
              (this._animateOff = !1);
            break;
          case "range":
            (this._animateOff = !0), this._refresh(), (this._animateOff = !1);
        }
      },
      _value: function () {
        var t = this.options.value;
        return this._trimAlignValue(t);
      },
      _values: function (t) {
        var e, i, s;
        if (arguments.length)
          return (e = this.options.values[t]), this._trimAlignValue(e);
        if (this.options.values && this.options.values.length) {
          for (i = this.options.values.slice(), s = 0; s < i.length; s += 1)
            i[s] = this._trimAlignValue(i[s]);
          return i;
        }
        return [];
      },
      _trimAlignValue: function (t) {
        var e, i;
        return t <= this._valueMin()
          ? this._valueMin()
          : t >= this._valueMax()
          ? this._valueMax()
          : ((e = 0 < this.options.step ? this.options.step : 1),
            (i = t - (t = (t - this._valueMin()) % e)),
            2 * Math.abs(t) >= e && (i += 0 < t ? e : -e),
            parseFloat(i.toFixed(5)));
      },
      _calculateNewMax: function () {
        var t = this.options.max,
          e = this._valueMin(),
          i = this.options.step,
          t = Math.floor(+(t - e).toFixed(this._precision()) / i) * i + e;
        this.max = parseFloat(t.toFixed(this._precision()));
      },
      _precision: function () {
        var t = this._precisionOf(this.options.step);
        return (t =
          null !== this.options.min
            ? Math.max(t, this._precisionOf(this.options.min))
            : t);
      },
      _precisionOf: function (t) {
        var t = t.toString(),
          e = t.indexOf(".");
        return -1 === e ? 0 : t.length - e - 1;
      },
      _valueMin: function () {
        return this.options.min;
      },
      _valueMax: function () {
        return this.max;
      },
      _refreshValue: function () {
        var e,
          i,
          t,
          s,
          n,
          o = this.options.range,
          a = this.options,
          r = this,
          h = !this._animateOff && a.animate,
          l = {};
        this.options.values && this.options.values.length
          ? this.handles.each(function (t) {
              (i =
                ((r.values(t) - r._valueMin()) /
                  (r._valueMax() - r._valueMin())) *
                100),
                (l["horizontal" === r.orientation ? "left" : "bottom"] =
                  i + "%"),
                x(this).stop(1, 1)[h ? "animate" : "css"](l, a.animate),
                !0 === r.options.range &&
                  ("horizontal" === r.orientation
                    ? (0 === t &&
                        r.range
                          .stop(1, 1)
                          [h ? "animate" : "css"]({ left: i + "%" }, a.animate),
                      1 === t &&
                        r.range[h ? "animate" : "css"](
                          { width: i - e + "%" },
                          { queue: !1, duration: a.animate }
                        ))
                    : (0 === t &&
                        r.range
                          .stop(1, 1)
                          [h ? "animate" : "css"](
                            { bottom: i + "%" },
                            a.animate
                          ),
                      1 === t &&
                        r.range[h ? "animate" : "css"](
                          { height: i - e + "%" },
                          { queue: !1, duration: a.animate }
                        ))),
                (e = i);
            })
          : ((t = this.value()),
            (s = this._valueMin()),
            (n = this._valueMax()),
            (i = n !== s ? ((t - s) / (n - s)) * 100 : 0),
            (l["horizontal" === this.orientation ? "left" : "bottom"] =
              i + "%"),
            this.handle.stop(1, 1)[h ? "animate" : "css"](l, a.animate),
            "min" === o &&
              "horizontal" === this.orientation &&
              this.range
                .stop(1, 1)
                [h ? "animate" : "css"]({ width: i + "%" }, a.animate),
            "max" === o &&
              "horizontal" === this.orientation &&
              this.range[h ? "animate" : "css"](
                { width: 100 - i + "%" },
                { queue: !1, duration: a.animate }
              ),
            "min" === o &&
              "vertical" === this.orientation &&
              this.range
                .stop(1, 1)
                [h ? "animate" : "css"]({ height: i + "%" }, a.animate),
            "max" === o &&
              "vertical" === this.orientation &&
              this.range[h ? "animate" : "css"](
                { height: 100 - i + "%" },
                { queue: !1, duration: a.animate }
              ));
      },
      _handleEvents: {
        keydown: function (t) {
          var e,
            i,
            s,
            n = x(t.target).data("ui-slider-handle-index");
          switch (t.keyCode) {
            case x.ui.keyCode.HOME:
            case x.ui.keyCode.END:
            case x.ui.keyCode.PAGE_UP:
            case x.ui.keyCode.PAGE_DOWN:
            case x.ui.keyCode.UP:
            case x.ui.keyCode.RIGHT:
            case x.ui.keyCode.DOWN:
            case x.ui.keyCode.LEFT:
              if (
                (t.preventDefault(),
                this._keySliding ||
                  ((this._keySliding = !0),
                  x(t.target).addClass("ui-state-active"),
                  !1 !== this._start(t, n)))
              )
                break;
              return;
          }
          switch (
            ((s = this.options.step),
            (e = i =
              this.options.values && this.options.values.length
                ? this.values(n)
                : this.value()),
            t.keyCode)
          ) {
            case x.ui.keyCode.HOME:
              i = this._valueMin();
              break;
            case x.ui.keyCode.END:
              i = this._valueMax();
              break;
            case x.ui.keyCode.PAGE_UP:
              i = this._trimAlignValue(
                e + (this._valueMax() - this._valueMin()) / this.numPages
              );
              break;
            case x.ui.keyCode.PAGE_DOWN:
              i = this._trimAlignValue(
                e - (this._valueMax() - this._valueMin()) / this.numPages
              );
              break;
            case x.ui.keyCode.UP:
            case x.ui.keyCode.RIGHT:
              if (e === this._valueMax()) return;
              i = this._trimAlignValue(e + s);
              break;
            case x.ui.keyCode.DOWN:
            case x.ui.keyCode.LEFT:
              if (e === this._valueMin()) return;
              i = this._trimAlignValue(e - s);
          }
          this._slide(t, n, i);
        },
        keyup: function (t) {
          var e = x(t.target).data("ui-slider-handle-index");
          this._keySliding &&
            ((this._keySliding = !1),
            this._stop(t, e),
            this._change(t, e),
            x(t.target).removeClass("ui-state-active"));
        },
      },
    }),
    x.widget("ui.sortable", x.ui.mouse, {
      version: "1.11.4",
      widgetEventPrefix: "sort",
      ready: !1,
      options: {
        appendTo: "parent",
        axis: !1,
        connectWith: !1,
        containment: !1,
        cursor: "auto",
        cursorAt: !1,
        dropOnEmpty: !0,
        forcePlaceholderSize: !1,
        forceHelperSize: !1,
        grid: !1,
        handle: !1,
        helper: "original",
        items: "> *",
        opacity: !1,
        placeholder: !1,
        revert: !1,
        scroll: !0,
        scrollSensitivity: 20,
        scrollSpeed: 20,
        scope: "default",
        tolerance: "intersect",
        zIndex: 1e3,
        activate: null,
        beforeStop: null,
        change: null,
        deactivate: null,
        out: null,
        over: null,
        receive: null,
        remove: null,
        sort: null,
        start: null,
        stop: null,
        update: null,
      },
      _isOverAxis: function (t, e, i) {
        return e <= t && t < e + i;
      },
      _isFloating: function (t) {
        return (
          /left|right/.test(t.css("float")) ||
          /inline|table-cell/.test(t.css("display"))
        );
      },
      _create: function () {
        (this.containerCache = {}),
          this.element.addClass("ui-sortable"),
          this.refresh(),
          (this.offset = this.element.offset()),
          this._mouseInit(),
          this._setHandleClassName(),
          (this.ready = !0);
      },
      _setOption: function (t, e) {
        this._super(t, e), "handle" === t && this._setHandleClassName();
      },
      _setHandleClassName: function () {
        this.element
          .find(".ui-sortable-handle")
          .removeClass("ui-sortable-handle"),
          x.each(this.items, function () {
            (this.instance.options.handle
              ? this.item.find(this.instance.options.handle)
              : this.item
            ).addClass("ui-sortable-handle");
          });
      },
      _destroy: function () {
        this.element
          .removeClass("ui-sortable ui-sortable-disabled")
          .find(".ui-sortable-handle")
          .removeClass("ui-sortable-handle"),
          this._mouseDestroy();
        for (var t = this.items.length - 1; 0 <= t; t--)
          this.items[t].item.removeData(this.widgetName + "-item");
        return this;
      },
      _mouseCapture: function (t, e) {
        var i = null,
          s = !1,
          n = this;
        return (
          !this.reverting &&
          !this.options.disabled &&
          "static" !== this.options.type &&
          (this._refreshItems(t),
          x(t.target)
            .parents()
            .each(function () {
              if (x.data(this, n.widgetName + "-item") === n)
                return (i = x(this)), !1;
            }),
          !!(i =
            x.data(t.target, n.widgetName + "-item") === n ? x(t.target) : i) &&
            !(
              this.options.handle &&
              !e &&
              (x(this.options.handle, i)
                .find("*")
                .addBack()
                .each(function () {
                  this === t.target && (s = !0);
                }),
              !s)
            ) &&
            ((this.currentItem = i), this._removeCurrentsFromItems(), !0))
        );
      },
      _mouseStart: function (t, e, i) {
        var s,
          n,
          o = this.options;
        if (
          ((this.currentContainer = this).refreshPositions(),
          (this.helper = this._createHelper(t)),
          this._cacheHelperProportions(),
          this._cacheMargins(),
          (this.scrollParent = this.helper.scrollParent()),
          (this.offset = this.currentItem.offset()),
          (this.offset = {
            top: this.offset.top - this.margins.top,
            left: this.offset.left - this.margins.left,
          }),
          x.extend(this.offset, {
            click: {
              left: t.pageX - this.offset.left,
              top: t.pageY - this.offset.top,
            },
            parent: this._getParentOffset(),
            relative: this._getRelativeOffset(),
          }),
          this.helper.css("position", "absolute"),
          (this.cssPosition = this.helper.css("position")),
          (this.originalPosition = this._generatePosition(t)),
          (this.originalPageX = t.pageX),
          (this.originalPageY = t.pageY),
          o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt),
          (this.domPosition = {
            prev: this.currentItem.prev()[0],
            parent: this.currentItem.parent()[0],
          }),
          this.helper[0] !== this.currentItem[0] && this.currentItem.hide(),
          this._createPlaceholder(),
          o.containment && this._setContainment(),
          o.cursor &&
            "auto" !== o.cursor &&
            ((n = this.document.find("body")),
            (this.storedCursor = n.css("cursor")),
            n.css("cursor", o.cursor),
            (this.storedStylesheet = x(
              "<style>*{ cursor: " + o.cursor + " !important; }</style>"
            ).appendTo(n))),
          o.opacity &&
            (this.helper.css("opacity") &&
              (this._storedOpacity = this.helper.css("opacity")),
            this.helper.css("opacity", o.opacity)),
          o.zIndex &&
            (this.helper.css("zIndex") &&
              (this._storedZIndex = this.helper.css("zIndex")),
            this.helper.css("zIndex", o.zIndex)),
          this.scrollParent[0] !== this.document[0] &&
            "HTML" !== this.scrollParent[0].tagName &&
            (this.overflowOffset = this.scrollParent.offset()),
          this._trigger("start", t, this._uiHash()),
          this._preserveHelperProportions || this._cacheHelperProportions(),
          !i)
        )
          for (s = this.containers.length - 1; 0 <= s; s--)
            this.containers[s]._trigger("activate", t, this._uiHash(this));
        return (
          x.ui.ddmanager && (x.ui.ddmanager.current = this),
          x.ui.ddmanager &&
            !o.dropBehaviour &&
            x.ui.ddmanager.prepareOffsets(this, t),
          (this.dragging = !0),
          this.helper.addClass("ui-sortable-helper"),
          this._mouseDrag(t),
          !0
        );
      },
      _mouseDrag: function (t) {
        var e,
          i,
          s,
          n,
          o = this.options,
          a = !1;
        for (
          this.position = this._generatePosition(t),
            this.positionAbs = this._convertPositionTo("absolute"),
            this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs),
            this.options.scroll &&
              (this.scrollParent[0] !== this.document[0] &&
              "HTML" !== this.scrollParent[0].tagName
                ? (this.overflowOffset.top +
                    this.scrollParent[0].offsetHeight -
                    t.pageY <
                  o.scrollSensitivity
                    ? (this.scrollParent[0].scrollTop = a =
                        this.scrollParent[0].scrollTop + o.scrollSpeed)
                    : t.pageY - this.overflowOffset.top < o.scrollSensitivity &&
                      (this.scrollParent[0].scrollTop = a =
                        this.scrollParent[0].scrollTop - o.scrollSpeed),
                  this.overflowOffset.left +
                    this.scrollParent[0].offsetWidth -
                    t.pageX <
                  o.scrollSensitivity
                    ? (this.scrollParent[0].scrollLeft = a =
                        this.scrollParent[0].scrollLeft + o.scrollSpeed)
                    : t.pageX - this.overflowOffset.left <
                        o.scrollSensitivity &&
                      (this.scrollParent[0].scrollLeft = a =
                        this.scrollParent[0].scrollLeft - o.scrollSpeed))
                : (t.pageY - this.document.scrollTop() < o.scrollSensitivity
                    ? (a = this.document.scrollTop(
                        this.document.scrollTop() - o.scrollSpeed
                      ))
                    : this.window.height() -
                        (t.pageY - this.document.scrollTop()) <
                        o.scrollSensitivity &&
                      (a = this.document.scrollTop(
                        this.document.scrollTop() + o.scrollSpeed
                      )),
                  t.pageX - this.document.scrollLeft() < o.scrollSensitivity
                    ? (a = this.document.scrollLeft(
                        this.document.scrollLeft() - o.scrollSpeed
                      ))
                    : this.window.width() -
                        (t.pageX - this.document.scrollLeft()) <
                        o.scrollSensitivity &&
                      (a = this.document.scrollLeft(
                        this.document.scrollLeft() + o.scrollSpeed
                      ))),
              !1 !== a &&
                x.ui.ddmanager &&
                !o.dropBehaviour &&
                x.ui.ddmanager.prepareOffsets(this, t)),
            this.positionAbs = this._convertPositionTo("absolute"),
            (this.options.axis && "y" === this.options.axis) ||
              (this.helper[0].style.left = this.position.left + "px"),
            (this.options.axis && "x" === this.options.axis) ||
              (this.helper[0].style.top = this.position.top + "px"),
            e = this.items.length - 1;
          0 <= e;
          e--
        )
          if (
            ((s = (i = this.items[e]).item[0]),
            (n = this._intersectsWithPointer(i)) &&
              i.instance === this.currentContainer &&
              !(
                s === this.currentItem[0] ||
                this.placeholder[1 === n ? "next" : "prev"]()[0] === s ||
                x.contains(this.placeholder[0], s) ||
                ("semi-dynamic" === this.options.type &&
                  x.contains(this.element[0], s))
              ))
          ) {
            if (
              ((this.direction = 1 === n ? "down" : "up"),
              "pointer" !== this.options.tolerance &&
                !this._intersectsWithSides(i))
            )
              break;
            this._rearrange(t, i), this._trigger("change", t, this._uiHash());
            break;
          }
        return (
          this._contactContainers(t),
          x.ui.ddmanager && x.ui.ddmanager.drag(this, t),
          this._trigger("sort", t, this._uiHash()),
          (this.lastPositionAbs = this.positionAbs),
          !1
        );
      },
      _mouseStop: function (t, e) {
        var i, s, n, o;
        if (t)
          return (
            x.ui.ddmanager &&
              !this.options.dropBehaviour &&
              x.ui.ddmanager.drop(this, t),
            this.options.revert
              ? ((s = (i = this).placeholder.offset()),
                (o = {}),
                ((n = this.options.axis) && "x" !== n) ||
                  (o.left =
                    s.left -
                    this.offset.parent.left -
                    this.margins.left +
                    (this.offsetParent[0] === this.document[0].body
                      ? 0
                      : this.offsetParent[0].scrollLeft)),
                (n && "y" !== n) ||
                  (o.top =
                    s.top -
                    this.offset.parent.top -
                    this.margins.top +
                    (this.offsetParent[0] === this.document[0].body
                      ? 0
                      : this.offsetParent[0].scrollTop)),
                (this.reverting = !0),
                x(this.helper).animate(
                  o,
                  parseInt(this.options.revert, 10) || 500,
                  function () {
                    i._clear(t);
                  }
                ))
              : this._clear(t, e),
            !1
          );
      },
      cancel: function () {
        if (this.dragging) {
          this._mouseUp({ target: null }),
            "original" === this.options.helper
              ? this.currentItem
                  .css(this._storedCSS)
                  .removeClass("ui-sortable-helper")
              : this.currentItem.show();
          for (var t = this.containers.length - 1; 0 <= t; t--)
            this.containers[t]._trigger("deactivate", null, this._uiHash(this)),
              this.containers[t].containerCache.over &&
                (this.containers[t]._trigger("out", null, this._uiHash(this)),
                (this.containers[t].containerCache.over = 0));
        }
        return (
          this.placeholder &&
            (this.placeholder[0].parentNode &&
              this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
            "original" !== this.options.helper &&
              this.helper &&
              this.helper[0].parentNode &&
              this.helper.remove(),
            x.extend(this, {
              helper: null,
              dragging: !1,
              reverting: !1,
              _noFinalSort: null,
            }),
            this.domPosition.prev
              ? x(this.domPosition.prev).after(this.currentItem)
              : x(this.domPosition.parent).prepend(this.currentItem)),
          this
        );
      },
      serialize: function (e) {
        var t = this._getItemsAsjQuery(e && e.connected),
          i = [];
        return (
          (e = e || {}),
          x(t).each(function () {
            var t = (x(e.item || this).attr(e.attribute || "id") || "").match(
              e.expression || /(.+)[\-=_](.+)/
            );
            t &&
              i.push(
                (e.key || t[1] + "[]") +
                  "=" +
                  (e.key && e.expression ? t[1] : t[2])
              );
          }),
          !i.length && e.key && i.push(e.key + "="),
          i.join("&")
        );
      },
      toArray: function (t) {
        var e = this._getItemsAsjQuery(t && t.connected),
          i = [];
        return (
          (t = t || {}),
          e.each(function () {
            i.push(x(t.item || this).attr(t.attribute || "id") || "");
          }),
          i
        );
      },
      _intersectsWith: function (t) {
        var e = this.positionAbs.left,
          i = e + this.helperProportions.width,
          s = this.positionAbs.top,
          n = s + this.helperProportions.height,
          o = t.left,
          a = o + t.width,
          r = t.top,
          h = r + t.height,
          l = this.offset.click.top,
          c = this.offset.click.left,
          l = "x" === this.options.axis || (r < s + l && s + l < h),
          c = "y" === this.options.axis || (o < e + c && e + c < a);
        return "pointer" === this.options.tolerance ||
          this.options.forcePointerForContainers ||
          ("pointer" !== this.options.tolerance &&
            this.helperProportions[this.floating ? "width" : "height"] >
              t[this.floating ? "width" : "height"])
          ? l && c
          : o < e + this.helperProportions.width / 2 &&
              i - this.helperProportions.width / 2 < a &&
              r < s + this.helperProportions.height / 2 &&
              n - this.helperProportions.height / 2 < h;
      },
      _intersectsWithPointer: function (t) {
        var e =
            "x" === this.options.axis ||
            this._isOverAxis(
              this.positionAbs.top + this.offset.click.top,
              t.top,
              t.height
            ),
          t =
            "y" === this.options.axis ||
            this._isOverAxis(
              this.positionAbs.left + this.offset.click.left,
              t.left,
              t.width
            ),
          e = e && t,
          t = this._getDragVerticalDirection(),
          i = this._getDragHorizontalDirection();
        return (
          !!e &&
          (this.floating
            ? (i && "right" === i) || "down" === t
              ? 2
              : 1
            : t && ("down" === t ? 2 : 1))
        );
      },
      _intersectsWithSides: function (t) {
        var e = this._isOverAxis(
            this.positionAbs.top + this.offset.click.top,
            t.top + t.height / 2,
            t.height
          ),
          t = this._isOverAxis(
            this.positionAbs.left + this.offset.click.left,
            t.left + t.width / 2,
            t.width
          ),
          i = this._getDragVerticalDirection(),
          s = this._getDragHorizontalDirection();
        return this.floating && s
          ? ("right" === s && t) || ("left" === s && !t)
          : i && (("down" === i && e) || ("up" === i && !e));
      },
      _getDragVerticalDirection: function () {
        var t = this.positionAbs.top - this.lastPositionAbs.top;
        return 0 != t && (0 < t ? "down" : "up");
      },
      _getDragHorizontalDirection: function () {
        var t = this.positionAbs.left - this.lastPositionAbs.left;
        return 0 != t && (0 < t ? "right" : "left");
      },
      refresh: function (t) {
        return (
          this._refreshItems(t),
          this._setHandleClassName(),
          this.refreshPositions(),
          this
        );
      },
      _connectWith: function () {
        var t = this.options;
        return t.connectWith.constructor === String
          ? [t.connectWith]
          : t.connectWith;
      },
      _getItemsAsjQuery: function (t) {
        var e,
          i,
          s,
          n,
          o = [],
          a = [],
          r = this._connectWith();
        if (r && t)
          for (e = r.length - 1; 0 <= e; e--)
            for (i = (s = x(r[e], this.document[0])).length - 1; 0 <= i; i--)
              (n = x.data(s[i], this.widgetFullName)) &&
                n !== this &&
                !n.options.disabled &&
                a.push([
                  x.isFunction(n.options.items)
                    ? n.options.items.call(n.element)
                    : x(n.options.items, n.element)
                        .not(".ui-sortable-helper")
                        .not(".ui-sortable-placeholder"),
                  n,
                ]);
        function h() {
          o.push(this);
        }
        for (
          a.push([
            x.isFunction(this.options.items)
              ? this.options.items.call(this.element, null, {
                  options: this.options,
                  item: this.currentItem,
                })
              : x(this.options.items, this.element)
                  .not(".ui-sortable-helper")
                  .not(".ui-sortable-placeholder"),
            this,
          ]),
            e = a.length - 1;
          0 <= e;
          e--
        )
          a[e][0].each(h);
        return x(o);
      },
      _removeCurrentsFromItems: function () {
        var i = this.currentItem.find(":data(" + this.widgetName + "-item)");
        this.items = x.grep(this.items, function (t) {
          for (var e = 0; e < i.length; e++) if (i[e] === t.item[0]) return !1;
          return !0;
        });
      },
      _refreshItems: function (t) {
        (this.items = []), (this.containers = [this]);
        var e,
          i,
          s,
          n,
          o,
          a,
          r,
          h,
          l = this.items,
          c = [
            [
              x.isFunction(this.options.items)
                ? this.options.items.call(this.element[0], t, {
                    item: this.currentItem,
                  })
                : x(this.options.items, this.element),
              this,
            ],
          ],
          u = this._connectWith();
        if (u && this.ready)
          for (e = u.length - 1; 0 <= e; e--)
            for (i = (s = x(u[e], this.document[0])).length - 1; 0 <= i; i--)
              (n = x.data(s[i], this.widgetFullName)) &&
                n !== this &&
                !n.options.disabled &&
                (c.push([
                  x.isFunction(n.options.items)
                    ? n.options.items.call(n.element[0], t, {
                        item: this.currentItem,
                      })
                    : x(n.options.items, n.element),
                  n,
                ]),
                this.containers.push(n));
        for (e = c.length - 1; 0 <= e; e--)
          for (o = c[e][1], h = (a = c[e][(i = 0)]).length; i < h; i++)
            (r = x(a[i])).data(this.widgetName + "-item", o),
              l.push({
                item: r,
                instance: o,
                width: 0,
                height: 0,
                left: 0,
                top: 0,
              });
      },
      refreshPositions: function (t) {
        var e, i, s, n;
        for (
          this.floating =
            !!this.items.length &&
            ("x" === this.options.axis || this._isFloating(this.items[0].item)),
            this.offsetParent &&
              this.helper &&
              (this.offset.parent = this._getParentOffset()),
            e = this.items.length - 1;
          0 <= e;
          e--
        )
          ((i = this.items[e]).instance !== this.currentContainer &&
            this.currentContainer &&
            i.item[0] !== this.currentItem[0]) ||
            ((s = this.options.toleranceElement
              ? x(this.options.toleranceElement, i.item)
              : i.item),
            t || ((i.width = s.outerWidth()), (i.height = s.outerHeight())),
            (n = s.offset()),
            (i.left = n.left),
            (i.top = n.top));
        if (this.options.custom && this.options.custom.refreshContainers)
          this.options.custom.refreshContainers.call(this);
        else
          for (e = this.containers.length - 1; 0 <= e; e--)
            (n = this.containers[e].element.offset()),
              (this.containers[e].containerCache.left = n.left),
              (this.containers[e].containerCache.top = n.top),
              (this.containers[e].containerCache.width =
                this.containers[e].element.outerWidth()),
              (this.containers[e].containerCache.height =
                this.containers[e].element.outerHeight());
        return this;
      },
      _createPlaceholder: function (i) {
        var s,
          n = (i = i || this).options;
        (n.placeholder && n.placeholder.constructor !== String) ||
          ((s = n.placeholder),
          (n.placeholder = {
            element: function () {
              var t = i.currentItem[0].nodeName.toLowerCase(),
                e = x("<" + t + ">", i.document[0])
                  .addClass(
                    s || i.currentItem[0].className + " ui-sortable-placeholder"
                  )
                  .removeClass("ui-sortable-helper");
              return (
                "tbody" === t
                  ? i._createTrPlaceholder(
                      i.currentItem.find("tr").eq(0),
                      x("<tr>", i.document[0]).appendTo(e)
                    )
                  : "tr" === t
                  ? i._createTrPlaceholder(i.currentItem, e)
                  : "img" === t && e.attr("src", i.currentItem.attr("src")),
                s || e.css("visibility", "hidden"),
                e
              );
            },
            update: function (t, e) {
              (s && !n.forcePlaceholderSize) ||
                (e.height() ||
                  e.height(
                    i.currentItem.innerHeight() -
                      parseInt(i.currentItem.css("paddingTop") || 0, 10) -
                      parseInt(i.currentItem.css("paddingBottom") || 0, 10)
                  ),
                e.width() ||
                  e.width(
                    i.currentItem.innerWidth() -
                      parseInt(i.currentItem.css("paddingLeft") || 0, 10) -
                      parseInt(i.currentItem.css("paddingRight") || 0, 10)
                  ));
            },
          })),
          (i.placeholder = x(
            n.placeholder.element.call(i.element, i.currentItem)
          )),
          i.currentItem.after(i.placeholder),
          n.placeholder.update(i, i.placeholder);
      },
      _createTrPlaceholder: function (t, e) {
        var i = this;
        t.children().each(function () {
          x("<td>&#160;</td>", i.document[0])
            .attr("colspan", x(this).attr("colspan") || 1)
            .appendTo(e);
        });
      },
      _contactContainers: function (t) {
        for (
          var e,
            i,
            s,
            n,
            o,
            a,
            r,
            h,
            l,
            c = null,
            u = null,
            d = this.containers.length - 1;
          0 <= d;
          d--
        )
          x.contains(this.currentItem[0], this.containers[d].element[0]) ||
            (this._intersectsWith(this.containers[d].containerCache)
              ? (c &&
                  x.contains(this.containers[d].element[0], c.element[0])) ||
                ((c = this.containers[d]), (u = d))
              : this.containers[d].containerCache.over &&
                (this.containers[d]._trigger("out", t, this._uiHash(this)),
                (this.containers[d].containerCache.over = 0)));
        if (c)
          if (1 === this.containers.length)
            this.containers[u].containerCache.over ||
              (this.containers[u]._trigger("over", t, this._uiHash(this)),
              (this.containers[u].containerCache.over = 1));
          else {
            for (
              i = 1e4,
                s = null,
                n = (h = c.floating || this._isFloating(this.currentItem))
                  ? "left"
                  : "top",
                o = h ? "width" : "height",
                l = h ? "clientX" : "clientY",
                e = this.items.length - 1;
              0 <= e;
              e--
            )
              x.contains(
                this.containers[u].element[0],
                this.items[e].item[0]
              ) &&
                this.items[e].item[0] !== this.currentItem[0] &&
                ((a = this.items[e].item.offset()[n]),
                (r = !1),
                t[l] - a > this.items[e][o] / 2 && (r = !0),
                Math.abs(t[l] - a) < i &&
                  ((i = Math.abs(t[l] - a)),
                  (s = this.items[e]),
                  (this.direction = r ? "up" : "down")));
            (s || this.options.dropOnEmpty) &&
              (this.currentContainer === this.containers[u]
                ? this.currentContainer.containerCache.over ||
                  (this.containers[u]._trigger("over", t, this._uiHash()),
                  (this.currentContainer.containerCache.over = 1))
                : (s
                    ? this._rearrange(t, s, null, !0)
                    : this._rearrange(t, null, this.containers[u].element, !0),
                  this._trigger("change", t, this._uiHash()),
                  this.containers[u]._trigger("change", t, this._uiHash(this)),
                  (this.currentContainer = this.containers[u]),
                  this.options.placeholder.update(
                    this.currentContainer,
                    this.placeholder
                  ),
                  this.containers[u]._trigger("over", t, this._uiHash(this)),
                  (this.containers[u].containerCache.over = 1)));
          }
      },
      _createHelper: function (t) {
        var e = this.options,
          t = x.isFunction(e.helper)
            ? x(e.helper.apply(this.element[0], [t, this.currentItem]))
            : "clone" === e.helper
            ? this.currentItem.clone()
            : this.currentItem;
        return (
          t.parents("body").length ||
            x(
              "parent" !== e.appendTo
                ? e.appendTo
                : this.currentItem[0].parentNode
            )[0].appendChild(t[0]),
          t[0] === this.currentItem[0] &&
            (this._storedCSS = {
              width: this.currentItem[0].style.width,
              height: this.currentItem[0].style.height,
              position: this.currentItem.css("position"),
              top: this.currentItem.css("top"),
              left: this.currentItem.css("left"),
            }),
          (t[0].style.width && !e.forceHelperSize) ||
            t.width(this.currentItem.width()),
          (t[0].style.height && !e.forceHelperSize) ||
            t.height(this.currentItem.height()),
          t
        );
      },
      _adjustOffsetFromHelper: function (t) {
        "string" == typeof t && (t = t.split(" ")),
          "left" in (t = x.isArray(t) ? { left: +t[0], top: +t[1] || 0 } : t) &&
            (this.offset.click.left = t.left + this.margins.left),
          "right" in t &&
            (this.offset.click.left =
              this.helperProportions.width - t.right + this.margins.left),
          "top" in t && (this.offset.click.top = t.top + this.margins.top),
          "bottom" in t &&
            (this.offset.click.top =
              this.helperProportions.height - t.bottom + this.margins.top);
      },
      _getParentOffset: function () {
        this.offsetParent = this.helper.offsetParent();
        var t = this.offsetParent.offset();
        return (
          "absolute" === this.cssPosition &&
            this.scrollParent[0] !== this.document[0] &&
            x.contains(this.scrollParent[0], this.offsetParent[0]) &&
            ((t.left += this.scrollParent.scrollLeft()),
            (t.top += this.scrollParent.scrollTop())),
          {
            top:
              (t =
                this.offsetParent[0] === this.document[0].body ||
                (this.offsetParent[0].tagName &&
                  "html" === this.offsetParent[0].tagName.toLowerCase() &&
                  x.ui.ie)
                  ? { top: 0, left: 0 }
                  : t).top +
              (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
            left:
              t.left +
              (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0),
          }
        );
      },
      _getRelativeOffset: function () {
        var t;
        return "relative" === this.cssPosition
          ? {
              top:
                (t = this.currentItem.position()).top -
                (parseInt(this.helper.css("top"), 10) || 0) +
                this.scrollParent.scrollTop(),
              left:
                t.left -
                (parseInt(this.helper.css("left"), 10) || 0) +
                this.scrollParent.scrollLeft(),
            }
          : { top: 0, left: 0 };
      },
      _cacheMargins: function () {
        this.margins = {
          left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
          top: parseInt(this.currentItem.css("marginTop"), 10) || 0,
        };
      },
      _cacheHelperProportions: function () {
        this.helperProportions = {
          width: this.helper.outerWidth(),
          height: this.helper.outerHeight(),
        };
      },
      _setContainment: function () {
        var t,
          e,
          i = this.options;
        "parent" === i.containment &&
          (i.containment = this.helper[0].parentNode),
          ("document" !== i.containment && "window" !== i.containment) ||
            (this.containment = [
              0 - this.offset.relative.left - this.offset.parent.left,
              0 - this.offset.relative.top - this.offset.parent.top,
              "document" === i.containment
                ? this.document.width()
                : this.window.width() -
                  this.helperProportions.width -
                  this.margins.left,
              ("document" === i.containment
                ? this.document.width()
                : this.window.height() ||
                  this.document[0].body.parentNode.scrollHeight) -
                this.helperProportions.height -
                this.margins.top,
            ]),
          /^(document|window|parent)$/.test(i.containment) ||
            ((t = x(i.containment)[0]),
            (i = x(i.containment).offset()),
            (e = "hidden" !== x(t).css("overflow")),
            (this.containment = [
              i.left +
                (parseInt(x(t).css("borderLeftWidth"), 10) || 0) +
                (parseInt(x(t).css("paddingLeft"), 10) || 0) -
                this.margins.left,
              i.top +
                (parseInt(x(t).css("borderTopWidth"), 10) || 0) +
                (parseInt(x(t).css("paddingTop"), 10) || 0) -
                this.margins.top,
              i.left +
                (e ? Math.max(t.scrollWidth, t.offsetWidth) : t.offsetWidth) -
                (parseInt(x(t).css("borderLeftWidth"), 10) || 0) -
                (parseInt(x(t).css("paddingRight"), 10) || 0) -
                this.helperProportions.width -
                this.margins.left,
              i.top +
                (e
                  ? Math.max(t.scrollHeight, t.offsetHeight)
                  : t.offsetHeight) -
                (parseInt(x(t).css("borderTopWidth"), 10) || 0) -
                (parseInt(x(t).css("paddingBottom"), 10) || 0) -
                this.helperProportions.height -
                this.margins.top,
            ]));
      },
      _convertPositionTo: function (t, e) {
        e = e || this.position;
        var t = "absolute" === t ? 1 : -1,
          i =
            "absolute" !== this.cssPosition ||
            (this.scrollParent[0] !== this.document[0] &&
              x.contains(this.scrollParent[0], this.offsetParent[0]))
              ? this.scrollParent
              : this.offsetParent,
          s = /(html|body)/i.test(i[0].tagName);
        return {
          top:
            e.top +
            this.offset.relative.top * t +
            this.offset.parent.top * t -
            ("fixed" === this.cssPosition
              ? -this.scrollParent.scrollTop()
              : s
              ? 0
              : i.scrollTop()) *
              t,
          left:
            e.left +
            this.offset.relative.left * t +
            this.offset.parent.left * t -
            ("fixed" === this.cssPosition
              ? -this.scrollParent.scrollLeft()
              : s
              ? 0
              : i.scrollLeft()) *
              t,
        };
      },
      _generatePosition: function (t) {
        var e = this.options,
          i = t.pageX,
          s = t.pageY,
          n =
            "absolute" !== this.cssPosition ||
            (this.scrollParent[0] !== this.document[0] &&
              x.contains(this.scrollParent[0], this.offsetParent[0]))
              ? this.scrollParent
              : this.offsetParent,
          o = /(html|body)/i.test(n[0].tagName);
        return (
          "relative" !== this.cssPosition ||
            (this.scrollParent[0] !== this.document[0] &&
              this.scrollParent[0] !== this.offsetParent[0]) ||
            (this.offset.relative = this._getRelativeOffset()),
          this.originalPosition &&
            (this.containment &&
              (t.pageX - this.offset.click.left < this.containment[0] &&
                (i = this.containment[0] + this.offset.click.left),
              t.pageY - this.offset.click.top < this.containment[1] &&
                (s = this.containment[1] + this.offset.click.top),
              t.pageX - this.offset.click.left > this.containment[2] &&
                (i = this.containment[2] + this.offset.click.left),
              t.pageY - this.offset.click.top > this.containment[3] &&
                (s = this.containment[3] + this.offset.click.top)),
            e.grid &&
              ((t =
                this.originalPageY +
                Math.round((s - this.originalPageY) / e.grid[1]) * e.grid[1]),
              (s =
                !this.containment ||
                (t - this.offset.click.top >= this.containment[1] &&
                  t - this.offset.click.top <= this.containment[3])
                  ? t
                  : t - this.offset.click.top >= this.containment[1]
                  ? t - e.grid[1]
                  : t + e.grid[1]),
              (t =
                this.originalPageX +
                Math.round((i - this.originalPageX) / e.grid[0]) * e.grid[0]),
              (i =
                !this.containment ||
                (t - this.offset.click.left >= this.containment[0] &&
                  t - this.offset.click.left <= this.containment[2])
                  ? t
                  : t - this.offset.click.left >= this.containment[0]
                  ? t - e.grid[0]
                  : t + e.grid[0]))),
          {
            top:
              s -
              this.offset.click.top -
              this.offset.relative.top -
              this.offset.parent.top +
              ("fixed" === this.cssPosition
                ? -this.scrollParent.scrollTop()
                : o
                ? 0
                : n.scrollTop()),
            left:
              i -
              this.offset.click.left -
              this.offset.relative.left -
              this.offset.parent.left +
              ("fixed" === this.cssPosition
                ? -this.scrollParent.scrollLeft()
                : o
                ? 0
                : n.scrollLeft()),
          }
        );
      },
      _rearrange: function (t, e, i, s) {
        i
          ? i[0].appendChild(this.placeholder[0])
          : e.item[0].parentNode.insertBefore(
              this.placeholder[0],
              "down" === this.direction ? e.item[0] : e.item[0].nextSibling
            ),
          (this.counter = this.counter ? ++this.counter : 1);
        var n = this.counter;
        this._delay(function () {
          n === this.counter && this.refreshPositions(!s);
        });
      },
      _clear: function (t, e) {
        this.reverting = !1;
        var i,
          s = [];
        if (
          (!this._noFinalSort &&
            this.currentItem.parent().length &&
            this.placeholder.before(this.currentItem),
          (this._noFinalSort = null),
          this.helper[0] === this.currentItem[0])
        ) {
          for (i in this._storedCSS)
            ("auto" !== this._storedCSS[i] &&
              "static" !== this._storedCSS[i]) ||
              (this._storedCSS[i] = "");
          this.currentItem
            .css(this._storedCSS)
            .removeClass("ui-sortable-helper");
        } else this.currentItem.show();
        function n(e, i, s) {
          return function (t) {
            s._trigger(e, t, i._uiHash(i));
          };
        }
        for (
          this.fromOutside &&
            !e &&
            s.push(function (t) {
              this._trigger("receive", t, this._uiHash(this.fromOutside));
            }),
            (!this.fromOutside &&
              this.domPosition.prev ===
                this.currentItem.prev().not(".ui-sortable-helper")[0] &&
              this.domPosition.parent === this.currentItem.parent()[0]) ||
              e ||
              s.push(function (t) {
                this._trigger("update", t, this._uiHash());
              }),
            this === this.currentContainer ||
              e ||
              (s.push(function (t) {
                this._trigger("remove", t, this._uiHash());
              }),
              s.push(
                function (e) {
                  return function (t) {
                    e._trigger("receive", t, this._uiHash(this));
                  };
                }.call(this, this.currentContainer)
              ),
              s.push(
                function (e) {
                  return function (t) {
                    e._trigger("update", t, this._uiHash(this));
                  };
                }.call(this, this.currentContainer)
              )),
            i = this.containers.length - 1;
          0 <= i;
          i--
        )
          e || s.push(n("deactivate", this, this.containers[i])),
            this.containers[i].containerCache.over &&
              (s.push(n("out", this, this.containers[i])),
              (this.containers[i].containerCache.over = 0));
        if (
          (this.storedCursor &&
            (this.document.find("body").css("cursor", this.storedCursor),
            this.storedStylesheet.remove()),
          this._storedOpacity &&
            this.helper.css("opacity", this._storedOpacity),
          this._storedZIndex &&
            this.helper.css(
              "zIndex",
              "auto" === this._storedZIndex ? "" : this._storedZIndex
            ),
          (this.dragging = !1),
          e || this._trigger("beforeStop", t, this._uiHash()),
          this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
          this.cancelHelperRemoval ||
            (this.helper[0] !== this.currentItem[0] && this.helper.remove(),
            (this.helper = null)),
          !e)
        ) {
          for (i = 0; i < s.length; i++) s[i].call(this, t);
          this._trigger("stop", t, this._uiHash());
        }
        return (this.fromOutside = !1), !this.cancelHelperRemoval;
      },
      _trigger: function () {
        !1 === x.Widget.prototype._trigger.apply(this, arguments) &&
          this.cancel();
      },
      _uiHash: function (t) {
        var e = t || this;
        return {
          helper: e.helper,
          placeholder: e.placeholder || x([]),
          position: e.position,
          originalPosition: e.originalPosition,
          offset: e.positionAbs,
          item: e.currentItem,
          sender: t ? t.element : null,
        };
      },
    });
  function N(e) {
    return function () {
      var t = this.element.val();
      e.apply(this, arguments),
        this._refresh(),
        t !== this.element.val() && this._trigger("change");
    };
  }
  var E;
  x.widget("ui.spinner", {
    version: "1.11.4",
    defaultElement: "<input>",
    widgetEventPrefix: "spin",
    options: {
      culture: null,
      icons: { down: "ui-icon-triangle-1-s", up: "ui-icon-triangle-1-n" },
      incremental: !0,
      max: null,
      min: null,
      numberFormat: null,
      page: 10,
      step: 1,
      change: null,
      spin: null,
      start: null,
      stop: null,
    },
    _create: function () {
      this._setOption("max", this.options.max),
        this._setOption("min", this.options.min),
        this._setOption("step", this.options.step),
        "" !== this.value() && this._value(this.element.val(), !0),
        this._draw(),
        this._on(this._events),
        this._refresh(),
        this._on(this.window, {
          beforeunload: function () {
            this.element.removeAttr("autocomplete");
          },
        });
    },
    _getCreateOptions: function () {
      var s = {},
        n = this.element;
      return (
        x.each(["min", "max", "step"], function (t, e) {
          var i = n.attr(e);
          void 0 !== i && i.length && (s[e] = i);
        }),
        s
      );
    },
    _events: {
      keydown: function (t) {
        this._start(t) && this._keydown(t) && t.preventDefault();
      },
      keyup: "_stop",
      focus: function () {
        this.previous = this.element.val();
      },
      blur: function (t) {
        this.cancelBlur
          ? delete this.cancelBlur
          : (this._stop(),
            this._refresh(),
            this.previous !== this.element.val() && this._trigger("change", t));
      },
      mousewheel: function (t, e) {
        if (e) {
          if (!this.spinning && !this._start(t)) return !1;
          this._spin((0 < e ? 1 : -1) * this.options.step, t),
            clearTimeout(this.mousewheelTimer),
            (this.mousewheelTimer = this._delay(function () {
              this.spinning && this._stop(t);
            }, 100)),
            t.preventDefault();
        }
      },
      "mousedown .ui-spinner-button": function (t) {
        var e;
        function i() {
          this.element[0] !== this.document[0].activeElement &&
            (this.element.focus(),
            (this.previous = e),
            this._delay(function () {
              this.previous = e;
            }));
        }
        (e =
          this.element[0] === this.document[0].activeElement
            ? this.previous
            : this.element.val()),
          t.preventDefault(),
          i.call(this),
          (this.cancelBlur = !0),
          this._delay(function () {
            delete this.cancelBlur, i.call(this);
          }),
          !1 !== this._start(t) &&
            this._repeat(
              null,
              x(t.currentTarget).hasClass("ui-spinner-up") ? 1 : -1,
              t
            );
      },
      "mouseup .ui-spinner-button": "_stop",
      "mouseenter .ui-spinner-button": function (t) {
        if (x(t.currentTarget).hasClass("ui-state-active"))
          return (
            !1 !== this._start(t) &&
            void this._repeat(
              null,
              x(t.currentTarget).hasClass("ui-spinner-up") ? 1 : -1,
              t
            )
          );
      },
      "mouseleave .ui-spinner-button": "_stop",
    },
    _draw: function () {
      var t = (this.uiSpinner = this.element
        .addClass("ui-spinner-input")
        .attr("autocomplete", "off")
        .wrap(this._uiSpinnerHtml())
        .parent()
        .append(this._buttonHtml()));
      this.element.attr("role", "spinbutton"),
        (this.buttons = t
          .find(".ui-spinner-button")
          .attr("tabIndex", -1)
          .button()
          .removeClass("ui-corner-all")),
        this.buttons.height() > Math.ceil(0.5 * t.height()) &&
          0 < t.height() &&
          t.height(t.height()),
        this.options.disabled && this.disable();
    },
    _keydown: function (t) {
      var e = this.options,
        i = x.ui.keyCode;
      switch (t.keyCode) {
        case i.UP:
          return this._repeat(null, 1, t), !0;
        case i.DOWN:
          return this._repeat(null, -1, t), !0;
        case i.PAGE_UP:
          return this._repeat(null, e.page, t), !0;
        case i.PAGE_DOWN:
          return this._repeat(null, -e.page, t), !0;
      }
      return !1;
    },
    _uiSpinnerHtml: function () {
      return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>";
    },
    _buttonHtml: function () {
      return (
        "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon " +
        this.options.icons.up +
        "'>&#9650;</span></a><a class='ui-spinner-button ui-spinner-down ui-corner-br'><span class='ui-icon " +
        this.options.icons.down +
        "'>&#9660;</span></a>"
      );
    },
    _start: function (t) {
      return (
        !(!this.spinning && !1 === this._trigger("start", t)) &&
        (this.counter || (this.counter = 1), (this.spinning = !0))
      );
    },
    _repeat: function (t, e, i) {
      (t = t || 500),
        clearTimeout(this.timer),
        (this.timer = this._delay(function () {
          this._repeat(40, e, i);
        }, t)),
        this._spin(e * this.options.step, i);
    },
    _spin: function (t, e) {
      var i = this.value() || 0;
      this.counter || (this.counter = 1),
        (i = this._adjustValue(i + t * this._increment(this.counter))),
        (this.spinning && !1 === this._trigger("spin", e, { value: i })) ||
          (this._value(i), this.counter++);
    },
    _increment: function (t) {
      var e = this.options.incremental;
      return e
        ? x.isFunction(e)
          ? e(t)
          : Math.floor((t * t * t) / 5e4 - (t * t) / 500 + (17 * t) / 200 + 1)
        : 1;
    },
    _precision: function () {
      var t = this._precisionOf(this.options.step);
      return (t =
        null !== this.options.min
          ? Math.max(t, this._precisionOf(this.options.min))
          : t);
    },
    _precisionOf: function (t) {
      var t = t.toString(),
        e = t.indexOf(".");
      return -1 === e ? 0 : t.length - e - 1;
    },
    _adjustValue: function (t) {
      var e = this.options,
        i = null !== e.min ? e.min : 0,
        s = t - i;
      return (
        (t = i + Math.round(s / e.step) * e.step),
        (t = parseFloat(t.toFixed(this._precision()))),
        null !== e.max && t > e.max
          ? e.max
          : null !== e.min && t < e.min
          ? e.min
          : t
      );
    },
    _stop: function (t) {
      this.spinning &&
        (clearTimeout(this.timer),
        clearTimeout(this.mousewheelTimer),
        (this.counter = 0),
        (this.spinning = !1),
        this._trigger("stop", t));
    },
    _setOption: function (t, e) {
      var i;
      "culture" === t || "numberFormat" === t
        ? ((i = this._parse(this.element.val())),
          (this.options[t] = e),
          this.element.val(this._format(i)))
        : (("max" !== t && "min" !== t && "step" !== t) ||
            ("string" == typeof e && (e = this._parse(e))),
          "icons" === t &&
            (this.buttons
              .first()
              .find(".ui-icon")
              .removeClass(this.options.icons.up)
              .addClass(e.up),
            this.buttons
              .last()
              .find(".ui-icon")
              .removeClass(this.options.icons.down)
              .addClass(e.down)),
          this._super(t, e),
          "disabled" === t &&
            (this.widget().toggleClass("ui-state-disabled", !!e),
            this.element.prop("disabled", !!e),
            this.buttons.button(e ? "disable" : "enable")));
    },
    _setOptions: N(function (t) {
      this._super(t);
    }),
    _parse: function (t) {
      return "" ===
        (t =
          "string" == typeof t && "" !== t
            ? window.Globalize && this.options.numberFormat
              ? Globalize.parseFloat(t, 10, this.options.culture)
              : +t
            : t) || isNaN(t)
        ? null
        : t;
    },
    _format: function (t) {
      return "" === t
        ? ""
        : window.Globalize && this.options.numberFormat
        ? Globalize.format(t, this.options.numberFormat, this.options.culture)
        : t;
    },
    _refresh: function () {
      this.element.attr({
        "aria-valuemin": this.options.min,
        "aria-valuemax": this.options.max,
        "aria-valuenow": this._parse(this.element.val()),
      });
    },
    isValid: function () {
      var t = this.value();
      return null !== t && t === this._adjustValue(t);
    },
    _value: function (t, e) {
      var i;
      "" !== t &&
        null !== (i = this._parse(t)) &&
        (e || (i = this._adjustValue(i)), (t = this._format(i))),
        this.element.val(t),
        this._refresh();
    },
    _destroy: function () {
      this.element
        .removeClass("ui-spinner-input")
        .prop("disabled", !1)
        .removeAttr("autocomplete")
        .removeAttr("role")
        .removeAttr("aria-valuemin")
        .removeAttr("aria-valuemax")
        .removeAttr("aria-valuenow"),
        this.uiSpinner.replaceWith(this.element);
    },
    stepUp: N(function (t) {
      this._stepUp(t);
    }),
    _stepUp: function (t) {
      this._start() && (this._spin((t || 1) * this.options.step), this._stop());
    },
    stepDown: N(function (t) {
      this._stepDown(t);
    }),
    _stepDown: function (t) {
      this._start() &&
        (this._spin((t || 1) * -this.options.step), this._stop());
    },
    pageUp: N(function (t) {
      this._stepUp((t || 1) * this.options.page);
    }),
    pageDown: N(function (t) {
      this._stepDown((t || 1) * this.options.page);
    }),
    value: function (t) {
      if (!arguments.length) return this._parse(this.element.val());
      N(this._value).call(this, t);
    },
    widget: function () {
      return this.uiSpinner;
    },
  }),
    x.widget("ui.tabs", {
      version: "1.11.4",
      delay: 300,
      options: {
        active: null,
        collapsible: !1,
        event: "click",
        heightStyle: "content",
        hide: null,
        show: null,
        activate: null,
        beforeActivate: null,
        beforeLoad: null,
        load: null,
      },
      _isLocal:
        ((E = /#.*$/),
        function (t) {
          var e = (t = t.cloneNode(!1)).href.replace(E, ""),
            i = location.href.replace(E, "");
          try {
            e = decodeURIComponent(e);
          } catch (t) {}
          try {
            i = decodeURIComponent(i);
          } catch (t) {}
          return 1 < t.hash.length && e === i;
        }),
      _create: function () {
        var e = this,
          t = this.options;
        (this.running = !1),
          this.element
            .addClass("ui-tabs ui-widget ui-widget-content ui-corner-all")
            .toggleClass("ui-tabs-collapsible", t.collapsible),
          this._processTabs(),
          (t.active = this._initialActive()),
          x.isArray(t.disabled) &&
            (t.disabled = x
              .unique(
                t.disabled.concat(
                  x.map(this.tabs.filter(".ui-state-disabled"), function (t) {
                    return e.tabs.index(t);
                  })
                )
              )
              .sort()),
          !1 !== this.options.active && this.anchors.length
            ? (this.active = this._findActive(t.active))
            : (this.active = x()),
          this._refresh(),
          this.active.length && this.load(t.active);
      },
      _initialActive: function () {
        var i = this.options.active,
          t = this.options.collapsible,
          s = location.hash.substring(1);
        return (
          null === i &&
            (s &&
              this.tabs.each(function (t, e) {
                if (x(e).attr("aria-controls") === s) return (i = t), !1;
              }),
            (null !==
              (i =
                null === i
                  ? this.tabs.index(this.tabs.filter(".ui-tabs-active"))
                  : i) &&
              -1 !== i) ||
              (i = !!this.tabs.length && 0)),
          !1 !== i &&
            -1 === (i = this.tabs.index(this.tabs.eq(i))) &&
            (i = !t && 0),
          (i = !t && !1 === i && this.anchors.length ? 0 : i)
        );
      },
      _getCreateEventData: function () {
        return {
          tab: this.active,
          panel: this.active.length ? this._getPanelForTab(this.active) : x(),
        };
      },
      _tabKeydown: function (t) {
        var e = x(this.document[0].activeElement).closest("li"),
          i = this.tabs.index(e),
          s = !0;
        if (!this._handlePageNav(t)) {
          switch (t.keyCode) {
            case x.ui.keyCode.RIGHT:
            case x.ui.keyCode.DOWN:
              i++;
              break;
            case x.ui.keyCode.UP:
            case x.ui.keyCode.LEFT:
              (s = !1), i--;
              break;
            case x.ui.keyCode.END:
              i = this.anchors.length - 1;
              break;
            case x.ui.keyCode.HOME:
              i = 0;
              break;
            case x.ui.keyCode.SPACE:
              return (
                t.preventDefault(),
                clearTimeout(this.activating),
                void this._activate(i)
              );
            case x.ui.keyCode.ENTER:
              return (
                t.preventDefault(),
                clearTimeout(this.activating),
                void this._activate(i !== this.options.active && i)
              );
            default:
              return;
          }
          t.preventDefault(),
            clearTimeout(this.activating),
            (i = this._focusNextTab(i, s)),
            t.ctrlKey ||
              t.metaKey ||
              (e.attr("aria-selected", "false"),
              this.tabs.eq(i).attr("aria-selected", "true"),
              (this.activating = this._delay(function () {
                this.option("active", i);
              }, this.delay)));
        }
      },
      _panelKeydown: function (t) {
        this._handlePageNav(t) ||
          (t.ctrlKey &&
            t.keyCode === x.ui.keyCode.UP &&
            (t.preventDefault(), this.active.focus()));
      },
      _handlePageNav: function (t) {
        return t.altKey && t.keyCode === x.ui.keyCode.PAGE_UP
          ? (this._activate(this._focusNextTab(this.options.active - 1, !1)),
            !0)
          : t.altKey && t.keyCode === x.ui.keyCode.PAGE_DOWN
          ? (this._activate(this._focusNextTab(this.options.active + 1, !0)),
            !0)
          : void 0;
      },
      _findNextTab: function (t, e) {
        var i = this.tabs.length - 1;
        for (
          ;
          -1 !==
          x.inArray(
            (t = (t = i < t ? 0 : t) < 0 ? i : t),
            this.options.disabled
          );

        )
          t = e ? t + 1 : t - 1;
        return t;
      },
      _focusNextTab: function (t, e) {
        return (t = this._findNextTab(t, e)), this.tabs.eq(t).focus(), t;
      },
      _setOption: function (t, e) {
        "active" === t
          ? this._activate(e)
          : "disabled" === t
          ? this._setupDisabled(e)
          : (this._super(t, e),
            "collapsible" === t &&
              (this.element.toggleClass("ui-tabs-collapsible", e),
              e || !1 !== this.options.active || this._activate(0)),
            "event" === t && this._setupEvents(e),
            "heightStyle" === t && this._setupHeightStyle(e));
      },
      _sanitizeSelector: function (t) {
        return t
          ? t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&")
          : "";
      },
      refresh: function () {
        var t = this.options,
          e = this.tablist.children(":has(a[href])");
        (t.disabled = x.map(e.filter(".ui-state-disabled"), function (t) {
          return e.index(t);
        })),
          this._processTabs(),
          !1 !== t.active && this.anchors.length
            ? this.active.length && !x.contains(this.tablist[0], this.active[0])
              ? this.tabs.length === t.disabled.length
                ? ((t.active = !1), (this.active = x()))
                : this._activate(
                    this._findNextTab(Math.max(0, t.active - 1), !1)
                  )
              : (t.active = this.tabs.index(this.active))
            : ((t.active = !1), (this.active = x())),
          this._refresh();
      },
      _refresh: function () {
        this._setupDisabled(this.options.disabled),
          this._setupEvents(this.options.event),
          this._setupHeightStyle(this.options.heightStyle),
          this.tabs
            .not(this.active)
            .attr({
              "aria-selected": "false",
              "aria-expanded": "false",
              tabIndex: -1,
            }),
          this.panels
            .not(this._getPanelForTab(this.active))
            .hide()
            .attr({ "aria-hidden": "true" }),
          this.active.length
            ? (this.active
                .addClass("ui-tabs-active ui-state-active")
                .attr({
                  "aria-selected": "true",
                  "aria-expanded": "true",
                  tabIndex: 0,
                }),
              this._getPanelForTab(this.active)
                .show()
                .attr({ "aria-hidden": "false" }))
            : this.tabs.eq(0).attr("tabIndex", 0);
      },
      _processTabs: function () {
        var h = this,
          t = this.tabs,
          e = this.anchors,
          i = this.panels;
        (this.tablist = this._getList()
          .addClass(
            "ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"
          )
          .attr("role", "tablist")
          .delegate("> li", "mousedown" + this.eventNamespace, function (t) {
            x(this).is(".ui-state-disabled") && t.preventDefault();
          })
          .delegate(
            ".ui-tabs-anchor",
            "focus" + this.eventNamespace,
            function () {
              x(this).closest("li").is(".ui-state-disabled") && this.blur();
            }
          )),
          (this.tabs = this.tablist
            .find("> li:has(a[href])")
            .addClass("ui-state-default ui-corner-top")
            .attr({ role: "tab", tabIndex: -1 })),
          (this.anchors = this.tabs
            .map(function () {
              return x("a", this)[0];
            })
            .addClass("ui-tabs-anchor")
            .attr({ role: "presentation", tabIndex: -1 })),
          (this.panels = x()),
          this.anchors.each(function (t, e) {
            var i,
              s,
              n,
              o = x(e).uniqueId().attr("id"),
              a = x(e).closest("li"),
              r = a.attr("aria-controls");
            h._isLocal(e)
              ? ((n = (i = e.hash).substring(1)),
                (s = h.element.find(h._sanitizeSelector(i))))
              : ((n = a.attr("aria-controls") || x({}).uniqueId()[0].id),
                (s = h.element.find((i = "#" + n))).length ||
                  (s = h._createPanel(n)).insertAfter(
                    h.panels[t - 1] || h.tablist
                  ),
                s.attr("aria-live", "polite")),
              s.length && (h.panels = h.panels.add(s)),
              r && a.data("ui-tabs-aria-controls", r),
              a.attr({ "aria-controls": n, "aria-labelledby": o }),
              s.attr("aria-labelledby", o);
          }),
          this.panels
            .addClass("ui-tabs-panel ui-widget-content ui-corner-bottom")
            .attr("role", "tabpanel"),
          t &&
            (this._off(t.not(this.tabs)),
            this._off(e.not(this.anchors)),
            this._off(i.not(this.panels)));
      },
      _getList: function () {
        return this.tablist || this.element.find("ol,ul").eq(0);
      },
      _createPanel: function (t) {
        return x("<div>")
          .attr("id", t)
          .addClass("ui-tabs-panel ui-widget-content ui-corner-bottom")
          .data("ui-tabs-destroy", !0);
      },
      _setupDisabled: function (t) {
        x.isArray(t) &&
          (t.length ? t.length === this.anchors.length && (t = !0) : (t = !1));
        for (var e, i = 0; (e = this.tabs[i]); i++)
          !0 === t || -1 !== x.inArray(i, t)
            ? x(e).addClass("ui-state-disabled").attr("aria-disabled", "true")
            : x(e).removeClass("ui-state-disabled").removeAttr("aria-disabled");
        this.options.disabled = t;
      },
      _setupEvents: function (t) {
        var i = {};
        t &&
          x.each(t.split(" "), function (t, e) {
            i[e] = "_eventHandler";
          }),
          this._off(this.anchors.add(this.tabs).add(this.panels)),
          this._on(!0, this.anchors, {
            click: function (t) {
              t.preventDefault();
            },
          }),
          this._on(this.anchors, i),
          this._on(this.tabs, { keydown: "_tabKeydown" }),
          this._on(this.panels, { keydown: "_panelKeydown" }),
          this._focusable(this.tabs),
          this._hoverable(this.tabs);
      },
      _setupHeightStyle: function (t) {
        var i,
          e = this.element.parent();
        "fill" === t
          ? ((i = e.height()),
            (i -= this.element.outerHeight() - this.element.height()),
            this.element.siblings(":visible").each(function () {
              var t = x(this),
                e = t.css("position");
              "absolute" !== e && "fixed" !== e && (i -= t.outerHeight(!0));
            }),
            this.element
              .children()
              .not(this.panels)
              .each(function () {
                i -= x(this).outerHeight(!0);
              }),
            this.panels
              .each(function () {
                x(this).height(
                  Math.max(0, i - x(this).innerHeight() + x(this).height())
                );
              })
              .css("overflow", "auto"))
          : "auto" === t &&
            ((i = 0),
            this.panels
              .each(function () {
                i = Math.max(i, x(this).height("").height());
              })
              .height(i));
      },
      _eventHandler: function (t) {
        var e = this.options,
          i = this.active,
          s = x(t.currentTarget).closest("li"),
          n = s[0] === i[0],
          o = n && e.collapsible,
          a = o ? x() : this._getPanelForTab(s),
          r = i.length ? this._getPanelForTab(i) : x(),
          i = { oldTab: i, oldPanel: r, newTab: o ? x() : s, newPanel: a };
        t.preventDefault(),
          s.hasClass("ui-state-disabled") ||
            s.hasClass("ui-tabs-loading") ||
            this.running ||
            (n && !e.collapsible) ||
            !1 === this._trigger("beforeActivate", t, i) ||
            ((e.active = !o && this.tabs.index(s)),
            (this.active = n ? x() : s),
            this.xhr && this.xhr.abort(),
            r.length ||
              a.length ||
              x.error("jQuery UI Tabs: Mismatching fragment identifier."),
            a.length && this.load(this.tabs.index(s), t),
            this._toggle(t, i));
      },
      _toggle: function (t, e) {
        var i = this,
          s = e.newPanel,
          n = e.oldPanel;
        function o() {
          (i.running = !1), i._trigger("activate", t, e);
        }
        function a() {
          e.newTab.closest("li").addClass("ui-tabs-active ui-state-active"),
            s.length && i.options.show
              ? i._show(s, i.options.show, o)
              : (s.show(), o());
        }
        (this.running = !0),
          n.length && this.options.hide
            ? this._hide(n, this.options.hide, function () {
                e.oldTab
                  .closest("li")
                  .removeClass("ui-tabs-active ui-state-active"),
                  a();
              })
            : (e.oldTab
                .closest("li")
                .removeClass("ui-tabs-active ui-state-active"),
              n.hide(),
              a()),
          n.attr("aria-hidden", "true"),
          e.oldTab.attr({ "aria-selected": "false", "aria-expanded": "false" }),
          s.length && n.length
            ? e.oldTab.attr("tabIndex", -1)
            : s.length &&
              this.tabs
                .filter(function () {
                  return 0 === x(this).attr("tabIndex");
                })
                .attr("tabIndex", -1),
          s.attr("aria-hidden", "false"),
          e.newTab.attr({
            "aria-selected": "true",
            "aria-expanded": "true",
            tabIndex: 0,
          });
      },
      _activate: function (t) {
        var t = this._findActive(t);
        t[0] !== this.active[0] &&
          ((t = (t = t.length ? t : this.active).find(".ui-tabs-anchor")[0]),
          this._eventHandler({
            target: t,
            currentTarget: t,
            preventDefault: x.noop,
          }));
      },
      _findActive: function (t) {
        return !1 === t ? x() : this.tabs.eq(t);
      },
      _getIndex: function (t) {
        return (t =
          "string" == typeof t
            ? this.anchors.index(this.anchors.filter("[href$='" + t + "']"))
            : t);
      },
      _destroy: function () {
        this.xhr && this.xhr.abort(),
          this.element.removeClass(
            "ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"
          ),
          this.tablist
            .removeClass(
              "ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"
            )
            .removeAttr("role"),
          this.anchors
            .removeClass("ui-tabs-anchor")
            .removeAttr("role")
            .removeAttr("tabIndex")
            .removeUniqueId(),
          this.tablist.unbind(this.eventNamespace),
          this.tabs.add(this.panels).each(function () {
            x.data(this, "ui-tabs-destroy")
              ? x(this).remove()
              : x(this)
                  .removeClass(
                    "ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel"
                  )
                  .removeAttr("tabIndex")
                  .removeAttr("aria-live")
                  .removeAttr("aria-busy")
                  .removeAttr("aria-selected")
                  .removeAttr("aria-labelledby")
                  .removeAttr("aria-hidden")
                  .removeAttr("aria-expanded")
                  .removeAttr("role");
          }),
          this.tabs.each(function () {
            var t = x(this),
              e = t.data("ui-tabs-aria-controls");
            e
              ? t.attr("aria-controls", e).removeData("ui-tabs-aria-controls")
              : t.removeAttr("aria-controls");
          }),
          this.panels.show(),
          "content" !== this.options.heightStyle &&
            this.panels.css("height", "");
      },
      enable: function (i) {
        var t = this.options.disabled;
        !1 !== t &&
          ((t =
            void 0 !== i &&
            ((i = this._getIndex(i)),
            x.isArray(t)
              ? x.map(t, function (t) {
                  return t !== i ? t : null;
                })
              : x.map(this.tabs, function (t, e) {
                  return e !== i ? e : null;
                }))),
          this._setupDisabled(t));
      },
      disable: function (t) {
        var e = this.options.disabled;
        if (!0 !== e) {
          if (void 0 === t) e = !0;
          else {
            if (((t = this._getIndex(t)), -1 !== x.inArray(t, e))) return;
            e = x.isArray(e) ? x.merge([t], e).sort() : [t];
          }
          this._setupDisabled(e);
        }
      },
      load: function (t, s) {
        t = this._getIndex(t);
        function n(t, e) {
          "abort" === e && o.panels.stop(!1, !0),
            i.removeClass("ui-tabs-loading"),
            a.removeAttr("aria-busy"),
            t === o.xhr && delete o.xhr;
        }
        var o = this,
          i = this.tabs.eq(t),
          t = i.find(".ui-tabs-anchor"),
          a = this._getPanelForTab(i),
          r = { tab: i, panel: a };
        this._isLocal(t[0]) ||
          ((this.xhr = x.ajax(this._ajaxSettings(t, s, r))),
          this.xhr &&
            "canceled" !== this.xhr.statusText &&
            (i.addClass("ui-tabs-loading"),
            a.attr("aria-busy", "true"),
            this.xhr
              .done(function (t, e, i) {
                setTimeout(function () {
                  a.html(t), o._trigger("load", s, r), n(i, e);
                }, 1);
              })
              .fail(function (t, e) {
                setTimeout(function () {
                  n(t, e);
                }, 1);
              })));
      },
      _ajaxSettings: function (t, i, s) {
        var n = this;
        return {
          url: t.attr("href"),
          beforeSend: function (t, e) {
            return n._trigger(
              "beforeLoad",
              i,
              x.extend({ jqXHR: t, ajaxSettings: e }, s)
            );
          },
        };
      },
      _getPanelForTab: function (t) {
        t = x(t).attr("aria-controls");
        return this.element.find(this._sanitizeSelector("#" + t));
      },
    }),
    x.widget("ui.tooltip", {
      version: "1.11.4",
      options: {
        content: function () {
          var t = x(this).attr("title") || "";
          return x("<a>").text(t).html();
        },
        hide: !0,
        items: "[title]:not([disabled])",
        position: {
          my: "left top+15",
          at: "left bottom",
          collision: "flipfit flip",
        },
        show: !0,
        tooltipClass: null,
        track: !1,
        close: null,
        open: null,
      },
      _addDescribedBy: function (t, e) {
        var i = (t.attr("aria-describedby") || "").split(/\s+/);
        i.push(e),
          t
            .data("ui-tooltip-id", e)
            .attr("aria-describedby", x.trim(i.join(" ")));
      },
      _removeDescribedBy: function (t) {
        var e = t.data("ui-tooltip-id"),
          i = (t.attr("aria-describedby") || "").split(/\s+/),
          e = x.inArray(e, i);
        -1 !== e && i.splice(e, 1),
          t.removeData("ui-tooltip-id"),
          (i = x.trim(i.join(" ")))
            ? t.attr("aria-describedby", i)
            : t.removeAttr("aria-describedby");
      },
      _create: function () {
        this._on({ mouseover: "open", focusin: "open" }),
          (this.tooltips = {}),
          (this.parents = {}),
          this.options.disabled && this._disable(),
          (this.liveRegion = x("<div>")
            .attr({
              role: "log",
              "aria-live": "assertive",
              "aria-relevant": "additions",
            })
            .addClass("ui-helper-hidden-accessible")
            .appendTo(this.document[0].body));
      },
      _setOption: function (t, e) {
        var i = this;
        "disabled" === t
          ? (this[e ? "_disable" : "_enable"](), (this.options[t] = e))
          : (this._super(t, e),
            "content" === t &&
              x.each(this.tooltips, function (t, e) {
                i._updateContent(e.element);
              }));
      },
      _disable: function () {
        var s = this;
        x.each(this.tooltips, function (t, e) {
          var i = x.Event("blur");
          (i.target = i.currentTarget = e.element[0]), s.close(i, !0);
        }),
          this.element
            .find(this.options.items)
            .addBack()
            .each(function () {
              var t = x(this);
              t.is("[title]") &&
                t.data("ui-tooltip-title", t.attr("title")).removeAttr("title");
            });
      },
      _enable: function () {
        this.element
          .find(this.options.items)
          .addBack()
          .each(function () {
            var t = x(this);
            t.data("ui-tooltip-title") &&
              t.attr("title", t.data("ui-tooltip-title"));
          });
      },
      open: function (t) {
        var i = this,
          e = x(t ? t.target : this.element).closest(this.options.items);
        e.length &&
          !e.data("ui-tooltip-id") &&
          (e.attr("title") && e.data("ui-tooltip-title", e.attr("title")),
          e.data("ui-tooltip-open", !0),
          t &&
            "mouseover" === t.type &&
            e.parents().each(function () {
              var t,
                e = x(this);
              e.data("ui-tooltip-open") &&
                (((t = x.Event("blur")).target = t.currentTarget = this),
                i.close(t, !0)),
                e.attr("title") &&
                  (e.uniqueId(),
                  (i.parents[this.id] = {
                    element: this,
                    title: e.attr("title"),
                  }),
                  e.attr("title", ""));
            }),
          this._registerCloseHandlers(t, e),
          this._updateContent(e, t));
      },
      _updateContent: function (e, i) {
        var t = this.options.content,
          s = this,
          n = i ? i.type : null;
        if ("string" == typeof t) return this._open(i, e, t);
        (t = t.call(e[0], function (t) {
          s._delay(function () {
            e.data("ui-tooltip-open") &&
              (i && (i.type = n), this._open(i, e, t));
          });
        })) && this._open(i, e, t);
      },
      _open: function (t, e, i) {
        var s,
          n,
          o,
          a,
          r = x.extend({}, this.options.position);
        function h(t) {
          (r.of = t), n.is(":hidden") || n.position(r);
        }
        i &&
          ((s = this._find(e))
            ? s.tooltip.find(".ui-tooltip-content").html(i)
            : (e.is("[title]") &&
                (t && "mouseover" === t.type
                  ? e.attr("title", "")
                  : e.removeAttr("title")),
              (s = this._tooltip(e)),
              (n = s.tooltip),
              this._addDescribedBy(e, n.attr("id")),
              n.find(".ui-tooltip-content").html(i),
              this.liveRegion.children().hide(),
              i.clone
                ? (a = i.clone()).removeAttr("id").find("[id]").removeAttr("id")
                : (a = i),
              x("<div>").html(a).appendTo(this.liveRegion),
              this.options.track && t && /^mouse/.test(t.type)
                ? (this._on(this.document, { mousemove: h }), h(t))
                : n.position(x.extend({ of: e }, this.options.position)),
              n.hide(),
              this._show(n, this.options.show),
              this.options.show &&
                this.options.show.delay &&
                (o = this.delayedShow =
                  setInterval(function () {
                    n.is(":visible") && (h(r.of), clearInterval(o));
                  }, x.fx.interval)),
              this._trigger("open", t, { tooltip: n })));
      },
      _registerCloseHandlers: function (t, e) {
        var i = {
          keyup: function (t) {
            t.keyCode === x.ui.keyCode.ESCAPE &&
              (((t = x.Event(t)).currentTarget = e[0]), this.close(t, !0));
          },
        };
        e[0] !== this.element[0] &&
          (i.remove = function () {
            this._removeTooltip(this._find(e).tooltip);
          }),
          (t && "mouseover" !== t.type) || (i.mouseleave = "close"),
          (t && "focusin" !== t.type) || (i.focusout = "close"),
          this._on(!0, e, i);
      },
      close: function (t) {
        var e,
          i = this,
          s = x(t ? t.currentTarget : this.element),
          n = this._find(s);
        n
          ? ((e = n.tooltip),
            n.closing ||
              (clearInterval(this.delayedShow),
              s.data("ui-tooltip-title") &&
                !s.attr("title") &&
                s.attr("title", s.data("ui-tooltip-title")),
              this._removeDescribedBy(s),
              (n.hiding = !0),
              e.stop(!0),
              this._hide(e, this.options.hide, function () {
                i._removeTooltip(x(this));
              }),
              s.removeData("ui-tooltip-open"),
              this._off(s, "mouseleave focusout keyup"),
              s[0] !== this.element[0] && this._off(s, "remove"),
              this._off(this.document, "mousemove"),
              t &&
                "mouseleave" === t.type &&
                x.each(this.parents, function (t, e) {
                  x(e.element).attr("title", e.title), delete i.parents[t];
                }),
              (n.closing = !0),
              this._trigger("close", t, { tooltip: e }),
              n.hiding || (n.closing = !1)))
          : s.removeData("ui-tooltip-open");
      },
      _tooltip: function (t) {
        var e = x("<div>")
            .attr("role", "tooltip")
            .addClass(
              "ui-tooltip ui-widget ui-corner-all ui-widget-content " +
                (this.options.tooltipClass || "")
            ),
          i = e.uniqueId().attr("id");
        return (
          x("<div>").addClass("ui-tooltip-content").appendTo(e),
          e.appendTo(this.document[0].body),
          (this.tooltips[i] = { element: t, tooltip: e })
        );
      },
      _find: function (t) {
        t = t.data("ui-tooltip-id");
        return t ? this.tooltips[t] : null;
      },
      _removeTooltip: function (t) {
        t.remove(), delete this.tooltips[t.attr("id")];
      },
      _destroy: function () {
        var s = this;
        x.each(this.tooltips, function (t, e) {
          var i = x.Event("blur"),
            e = e.element;
          (i.target = i.currentTarget = e[0]),
            s.close(i, !0),
            x("#" + t).remove(),
            e.data("ui-tooltip-title") &&
              (e.attr("title") || e.attr("title", e.data("ui-tooltip-title")),
              e.removeData("ui-tooltip-title"));
        }),
          this.liveRegion.remove();
      },
    });
});
