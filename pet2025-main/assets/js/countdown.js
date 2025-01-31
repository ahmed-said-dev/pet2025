!(function (t) {
  "use strict";
  "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery);
})(function (n) {
  "use strict";
  var i = [],
    o = { precision: 100, elapse: !1, defer: !1 };
  (e = []).push(/^[0-9]*$/.source),
    e.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),
    e.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source);
  var e = new RegExp(e.join("|")),
    c = {
      Y: "years",
      m: "months",
      n: "daysToMonth",
      d: "daysToWeek",
      w: "weeks",
      W: "weeksToMonth",
      H: "hours",
      M: "minutes",
      S: "seconds",
      D: "totalDays",
      I: "totalHours",
      N: "totalMinutes",
      T: "totalSeconds",
    };
  function s(r) {
    return function (t) {
      var e = t.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
      if (e)
        for (var s = 0, n = e.length; s < n; ++s) {
          var i = e[s].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),
            o =
              ((o = (o = i[0])
                .toString()
                .replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")),
              new RegExp(o)),
            a = i[1] || "",
            h = i[3] || "",
            l = null,
            i = i[2];
          c.hasOwnProperty(i) && ((l = c[i]), (l = Number(r[l]))),
            null !== l &&
              ("!" === a &&
                (l = (function (t, e) {
                  var s = "s",
                    n = "";
                  t &&
                    ((t = t.replace(/(:|;|\s)/gi, "").split(/\,/)),
                    (s = 1 === t.length ? t[0] : ((n = t[0]), t[1])));
                  return 1 < Math.abs(e) ? s : n;
                })(h, l)),
              "" === a && l < 10 && (l = "0" + l.toString()),
              (t = t.replace(o, l.toString())));
        }
      return (t = t.replace(/%%/, "%"));
    };
  }
  function a(t, e, s) {
    (this.el = t),
      (this.$el = n(t)),
      (this.interval = null),
      (this.offset = {}),
      (this.options = n.extend({}, o)),
      (this.instanceNumber = i.length),
      i.push(this),
      this.$el.data("countdown-instance", this.instanceNumber),
      s &&
        ("function" == typeof s
          ? (this.$el.on("update.countdown", s),
            this.$el.on("stoped.countdown", s),
            this.$el.on("finish.countdown", s))
          : (this.options = n.extend({}, o, s))),
      this.setFinalDate(e),
      !1 === this.options.defer && this.start();
  }
  n.extend(a.prototype, {
    start: function () {
      null !== this.interval && clearInterval(this.interval);
      var t = this;
      this.update(),
        (this.interval = setInterval(function () {
          t.update.call(t);
        }, this.options.precision));
    },
    stop: function () {
      clearInterval(this.interval),
        (this.interval = null),
        this.dispatchEvent("stoped");
    },
    toggle: function () {
      this.interval ? this.stop() : this.start();
    },
    pause: function () {
      this.stop();
    },
    resume: function () {
      this.start();
    },
    remove: function () {
      this.stop.call(this),
        (i[this.instanceNumber] = null),
        delete this.$el.data().countdownInstance;
    },
    setFinalDate: function (t) {
      this.finalDate = (function (t) {
        if (t instanceof Date) return t;
        if (String(t).match(e))
          return (
            String(t).match(/^[0-9]*$/) && (t = Number(t)),
            String(t).match(/\-/) && (t = String(t).replace(/\-/g, "/")),
            new Date(t)
          );
        throw new Error("Couldn't cast `" + t + "` to a date object.");
      })(t);
    },
    update: function () {
      var t, e, s;
      0 === this.$el.closest("html").length
        ? this.remove()
        : ((t = void 0 !== n._data(this.el, "events")),
          (e = new Date()),
          (s = this.finalDate.getTime() - e.getTime()),
          (s = Math.ceil(s / 1e3)),
          (s = !this.options.elapse && s < 0 ? 0 : Math.abs(s)),
          this.totalSecsLeft !== s &&
            t &&
            ((this.totalSecsLeft = s),
            (this.elapsed = e >= this.finalDate),
            (this.offset = {
              seconds: this.totalSecsLeft % 60,
              minutes: Math.floor(this.totalSecsLeft / 60) % 60,
              hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
              days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
              daysToWeek: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
              daysToMonth: Math.floor(
                (this.totalSecsLeft / 60 / 60 / 24) % 30.4368
              ),
              weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
              weeksToMonth:
                Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7) % 4,
              months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30.4368),
              years: Math.abs(this.finalDate.getFullYear() - e.getFullYear()),
              totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
              totalHours: Math.floor(this.totalSecsLeft / 60 / 60),
              totalMinutes: Math.floor(this.totalSecsLeft / 60),
              totalSeconds: this.totalSecsLeft,
            }),
            this.options.elapse || 0 !== this.totalSecsLeft
              ? this.dispatchEvent("update")
              : (this.stop(), this.dispatchEvent("finish"))));
    },
    dispatchEvent: function (t) {
      t = n.Event(t + ".countdown");
      (t.finalDate = this.finalDate),
        (t.elapsed = this.elapsed),
        (t.offset = n.extend({}, this.offset)),
        (t.strftime = s(this.offset)),
        this.$el.trigger(t);
    },
  }),
    (n.fn.countdown = function () {
      var s = Array.prototype.slice.call(arguments, 0);
      return this.each(function () {
        var t,
          e = n(this).data("countdown-instance");
        void 0 !== e
          ? ((e = i[e]),
            (t = s[0]),
            a.prototype.hasOwnProperty(t)
              ? e[t].apply(e, s.slice(1))
              : null === String(t).match(/^[$A-Z_][0-9A-Z_$]*$/i)
              ? (e.setFinalDate.call(e, t), e.start())
              : n.error(
                  "Method %s does not exist on jQuery.countdown".replace(
                    /\%s/gi,
                    t
                  )
                ))
          : new a(this, s[0], s[1]);
      });
    });
});
