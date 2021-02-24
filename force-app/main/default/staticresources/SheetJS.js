/*! xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
var DO_NOT_EXPORT_CODEPAGE = true;
var DO_NOT_EXPORT_JSZIP = true;
(function (e) {
	if ("object" == typeof exports && "undefined" != typeof module && "undefined" == typeof DO_NOT_EXPORT_JSZIP)
		module.exports = e();
	else if ("function" == typeof define && define.amd && "undefined" == typeof DO_NOT_EXPORT_JSZIP) {
		JSZipSync = e();
		define([], e)
	} else {
		var t;
		"undefined" != typeof globalThis ? t = globalThis : "undefined" != typeof window ? t = window : "undefined" != typeof global ? t = global : "undefined" != typeof $ && $.global ? t = $.global : "undefined" != typeof self && (t = self),
		t.JSZipSync = e()
	}
})(function () {
	var e,
	t,
	r;
	return function a(e, t, r) {
		function n(s, o) {
			if (!t[s]) {
				if (!e[s]) {
					var l = typeof require == "function" && require;
					if (!o && l)
						return l(s, !0);
					if (i)
						return i(s, !0);
					throw new Error("Cannot find module '" + s + "'")
				}
				var c = t[s] = {
					exports: {}
				};
				e[s][0].call(c.exports, function (t) {
					var r = e[s][1][t];
					return n(r ? r : t)
				}, c, c.exports, a, e, t, r)
			}
			return t[s].exports
		}
		var i = typeof require == "function" && require;
		for (var s = 0; s < r.length; s++)
			n(r[s]);
		return n
	}
	({
		1: [function (e, t, r) {
				"use strict";
				var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
				r.encode = function (e, t) {
					var r = "";
					var n,
					i,
					s,
					o,
					l,
					c,
					f;
					var u = 0;
					while (u < e.length) {
						n = e.charCodeAt(u++);
						i = e.charCodeAt(u++);
						s = e.charCodeAt(u++);
						o = n >> 2;
						l = (n & 3) << 4 | i >> 4;
						c = (i & 15) << 2 | s >> 6;
						f = s & 63;
						if (isNaN(i)) {
							c = f = 64
						} else if (isNaN(s)) {
							f = 64
						}
						r = r + a.charAt(o) + a.charAt(l) + a.charAt(c) + a.charAt(f)
					}
					return r
				};
				r.decode = function (e, t) {
					var r = "";
					var n,
					i,
					s;
					var o,
					l,
					c,
					f;
					var u = 0;
					e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
					while (u < e.length) {
						o = a.indexOf(e.charAt(u++));
						l = a.indexOf(e.charAt(u++));
						c = a.indexOf(e.charAt(u++));
						f = a.indexOf(e.charAt(u++));
						n = o << 2 | l >> 4;
						i = (l & 15) << 4 | c >> 2;
						s = (c & 3) << 6 | f;
						r = r + String.fromCharCode(n);
						if (c != 64) {
							r = r + String.fromCharCode(i)
						}
						if (f != 64) {
							r = r + String.fromCharCode(s)
						}
					}
					return r
				}
			}, {}
		],
		2: [function (e, t, r) {
				"use strict";
				function a() {
					this.compressedSize = 0;
					this.uncompressedSize = 0;
					this.crc32 = 0;
					this.compressionMethod = null;
					this.compressedContent = null
				}
				a.prototype = {
					getContent: function () {
						return null
					},
					getCompressedContent: function () {
						return null
					}
				};
				t.exports = a
			}, {}
		],
		3: [function (e, t, r) {
				"use strict";
				r.STORE = {
					magic: "\0\0",
					compress: function (e) {
						return e
					},
					uncompress: function (e) {
						return e
					},
					compressInputType: null,
					uncompressInputType: null
				};
				r.DEFLATE = e("./flate")
			}, {
				"./flate": 8
			}
		],
		4: [function (e, t, r) {
				"use strict";
				var a = e("./utils");
				var n = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918e3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117];
				t.exports = function i(e, t) {
					if (typeof e === "undefined" || !e.length) {
						return 0
					}
					var r = a.getTypeOf(e) !== "string";
					if (typeof t == "undefined") {
						t = 0
					}
					var i = 0;
					var s = 0;
					var o = 0;
					t = t ^ -1;
					for (var l = 0, c = e.length; l < c; l++) {
						o = r ? e[l] : e.charCodeAt(l);
						s = (t ^ o) & 255;
						i = n[s];
						t = t >>> 8 ^ i
					}
					return t ^ -1
				}
			}, {
				"./utils": 21
			}
		],
		5: [function (e, t, r) {
				"use strict";
				var a = e("./utils");
				function n(e) {
					this.data = null;
					this.length = 0;
					this.index = 0
				}
				n.prototype = {
					checkOffset: function (e) {
						this.checkIndex(this.index + e)
					},
					checkIndex: function (e) {
						if (this.length < e || e < 0) {
							throw new Error("End of data reached (data length = " + this.length + ", asked index = " + e + "). Corrupted zip ?")
						}
					},
					setIndex: function (e) {
						this.checkIndex(e);
						this.index = e
					},
					skip: function (e) {
						this.setIndex(this.index + e)
					},
					byteAt: function (e) {},
					readInt: function (e) {
						var t = 0,
						r;
						this.checkOffset(e);
						for (r = this.index + e - 1; r >= this.index; r--) {
							t = (t << 8) + this.byteAt(r)
						}
						this.index += e;
						return t
					},
					readString: function (e) {
						return a.transformTo("string", this.readData(e))
					},
					readData: function (e) {},
					lastIndexOfSignature: function (e) {},
					readDate: function () {
						var e = this.readInt(4);
						return new Date((e >> 25 & 127) + 1980, (e >> 21 & 15) - 1, e >> 16 & 31, e >> 11 & 31, e >> 5 & 63, (e & 31) << 1)
					}
				};
				t.exports = n
			}, {
				"./utils": 21
			}
		],
		6: [function (e, t, r) {
				"use strict";
				r.base64 = false;
				r.binary = false;
				r.dir = false;
				r.createFolders = false;
				r.date = null;
				r.compression = null;
				r.comment = null
			}, {}
		],
		7: [function (e, t, r) {
				"use strict";
				var a = e("./utils");
				r.string2binary = function (e) {
					return a.string2binary(e)
				};
				r.string2Uint8Array = function (e) {
					return a.transformTo("uint8array", e)
				};
				r.uint8Array2String = function (e) {
					return a.transformTo("string", e)
				};
				r.string2Blob = function (e) {
					var t = a.transformTo("arraybuffer", e);
					return a.arrayBuffer2Blob(t)
				};
				r.arrayBuffer2Blob = function (e) {
					return a.arrayBuffer2Blob(e)
				};
				r.transformTo = function (e, t) {
					return a.transformTo(e, t)
				};
				r.getTypeOf = function (e) {
					return a.getTypeOf(e)
				};
				r.checkSupport = function (e) {
					return a.checkSupport(e)
				};
				r.MAX_VALUE_16BITS = a.MAX_VALUE_16BITS;
				r.MAX_VALUE_32BITS = a.MAX_VALUE_32BITS;
				r.pretty = function (e) {
					return a.pretty(e)
				};
				r.findCompression = function (e) {
					return a.findCompression(e)
				};
				r.isRegExp = function (e) {
					return a.isRegExp(e)
				}
			}, {
				"./utils": 21
			}
		],
		8: [function (e, t, r) {
				"use strict";
				var a = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Uint32Array !== "undefined";
				var n = e("pako");
				r.uncompressInputType = a ? "uint8array" : "array";
				r.compressInputType = a ? "uint8array" : "array";
				r.magic = "\b\0";
				r.compress = function (e) {
					return n.deflateRaw(e)
				};
				r.uncompress = function (e) {
					return n.inflateRaw(e)
				}
			}, {
				pako: 24
			}
		],
		9: [function (e, t, r) {
				"use strict";
				var a = e("./base64");
				function n(e, t) {
					if (!(this instanceof n))
						return new n(e, t);
					this.files = {};
					this.comment = null;
					this.root = "";
					if (e) {
						this.load(e, t)
					}
					this.clone = function () {
						var e = new n;
						for (var t in this) {
							if (typeof this[t] !== "function") {
								e[t] = this[t]
							}
						}
						return e
					}
				}
				n.prototype = e("./object");
				n.prototype.load = e("./load");
				n.support = e("./support");
				n.defaults = e("./defaults");
				n.utils = e("./deprecatedPublicUtils");
				n.base64 = {
					encode: function (e) {
						return a.encode(e)
					},
					decode: function (e) {
						return a.decode(e)
					}
				};
				n.compressions = e("./compressions");
				t.exports = n
			}, {
				"./base64": 1,
				"./compressions": 3,
				"./defaults": 6,
				"./deprecatedPublicUtils": 7,
				"./load": 10,
				"./object": 13,
				"./support": 17
			}
		],
		10: [function (e, t, r) {
				"use strict";
				var a = e("./base64");
				var n = e("./zipEntries");
				t.exports = function (e, t) {
					var r,
					i,
					s,
					o;
					t = t || {};
					if (t.base64) {
						e = a.decode(e)
					}
					i = new n(e, t);
					r = i.files;
					for (s = 0; s < r.length; s++) {
						o = r[s];
						this.file(o.fileName, o.decompressed, {
							binary: true,
							optimizedBinaryString: true,
							date: o.date,
							dir: o.dir,
							comment: o.fileComment.length ? o.fileComment : null,
							createFolders: t.createFolders
						})
					}
					if (i.zipComment.length) {
						this.comment = i.zipComment
					}
					return this
				}
			}, {
				"./base64": 1,
				"./zipEntries": 22
			}
		],
		11: [function (e, t, r) {
				(function (e) {
					"use strict";
					var r = function () {};
					if (typeof e !== "undefined") {
						var a = !e.from;
						if (!a)
							try {
								e.from("foo", "utf8")
							} catch (n) {
								a = true
							}
						r = a ? function (t, r) {
							return r ? new e(t, r) : new e(t)
						}
						 : e.from.bind(e);
						if (!e.alloc)
							e.alloc = function (t) {
								return new e(t)
							}
					}
					t.exports = function (t, a) {
						return typeof t == "number" ? e.alloc(t) : r(t, a)
					};
					t.exports.test = function (t) {
						return e.isBuffer(t)
					}
				}).call(this, typeof Buffer !== "undefined" ? Buffer : undefined)
			}, {}
		],
		12: [function (e, t, r) {
				"use strict";
				var a = e("./uint8ArrayReader");
				function n(e) {
					this.data = e;
					this.length = this.data.length;
					this.index = 0
				}
				n.prototype = new a;
				n.prototype.readData = function (e) {
					this.checkOffset(e);
					var t = this.data.slice(this.index, this.index + e);
					this.index += e;
					return t
				};
				t.exports = n
			}, {
				"./uint8ArrayReader": 18
			}
		],
		13: [function (e, t, r) {
				"use strict";
				var a = e("./support");
				var n = e("./utils");
				var i = e("./crc32");
				var s = e("./signature");
				var o = e("./defaults");
				var l = e("./base64");
				var c = e("./compressions");
				var f = e("./compressedObject");
				var u = e("./nodeBuffer");
				var h = e("./utf8");
				var d = e("./stringWriter");
				var p = e("./uint8ArrayWriter");
				var m = function (e) {
					if (e._data instanceof f) {
						e._data = e._data.getContent();
						e.options.binary = true;
						e.options.base64 = false;
						if (n.getTypeOf(e._data) === "uint8array") {
							var t = e._data;
							e._data = new Uint8Array(t.length);
							if (t.length !== 0) {
								e._data.set(t, 0)
							}
						}
					}
					return e._data
				};
				var v = function (e) {
					var t = m(e),
					r = n.getTypeOf(t);
					if (r === "string") {
						if (!e.options.binary) {
							if (a.nodebuffer) {
								return u(t, "utf-8")
							}
						}
						return e.asBinary()
					}
					return t
				};
				var g = function (e) {
					var t = m(this);
					if (t === null || typeof t === "undefined") {
						return ""
					}
					if (this.options.base64) {
						t = l.decode(t)
					}
					if (e && this.options.binary) {
						t = T.utf8decode(t)
					} else {
						t = n.transformTo("string", t)
					}
					if (!e && !this.options.binary) {
						t = n.transformTo("string", T.utf8encode(t))
					}
					return t
				};
				var b = function (e, t, r) {
					this.name = e;
					this.dir = r.dir;
					this.date = r.date;
					this.comment = r.comment;
					this._data = t;
					this.options = r;
					this._initialMetadata = {
						dir: r.dir,
						date: r.date
					}
				};
				b.prototype = {
					asText: function () {
						return g.call(this, true)
					},
					asBinary: function () {
						return g.call(this, false)
					},
					asNodeBuffer: function () {
						var e = v(this);
						return n.transformTo("nodebuffer", e)
					},
					asUint8Array: function () {
						var e = v(this);
						return n.transformTo("uint8array", e)
					},
					asArrayBuffer: function () {
						return this.asUint8Array().buffer
					}
				};
				var y = function (e, t) {
					var r = "",
					a;
					for (a = 0; a < t; a++) {
						r += String.fromCharCode(e & 255);
						e = e >>> 8
					}
					return r
				};
				var w = function () {
					var e = {},
					t,
					r;
					for (t = 0; t < arguments.length; t++) {
						for (r in arguments[t]) {
							if (arguments[t].hasOwnProperty(r) && typeof e[r] === "undefined") {
								e[r] = arguments[t][r]
							}
						}
					}
					return e
				};
				var k = function (e) {
					e = e || {};
					if (e.base64 === true && (e.binary === null || e.binary === undefined)) {
						e.binary = true
					}
					e = w(e, o);
					e.date = e.date || new Date;
					if (e.compression !== null)
						e.compression = e.compression.toUpperCase();
					return e
				};
				var x = function (e, t, r) {
					var a = n.getTypeOf(t),
					i;
					r = k(r);
					if (r.createFolders && (i = _(e))) {
						C.call(this, i, true)
					}
					if (r.dir || t === null || typeof t === "undefined") {
						r.base64 = false;
						r.binary = false;
						t = null
					} else if (a === "string") {
						if (r.binary && !r.base64) {
							if (r.optimizedBinaryString !== true) {
								t = n.string2binary(t)
							}
						}
					} else {
						r.base64 = false;
						r.binary = true;
						if (!a && !(t instanceof f)) {
							throw new Error("The data of '" + e + "' is in an unsupported format !")
						}
						if (a === "arraybuffer") {
							t = n.transformTo("uint8array", t)
						}
					}
					var s = new b(e, t, r);
					this.files[e] = s;
					return s
				};
				var _ = function (e) {
					if (e.slice(-1) == "/") {
						e = e.substring(0, e.length - 1)
					}
					var t = e.lastIndexOf("/");
					return t > 0 ? e.substring(0, t) : ""
				};
				var C = function (e, t) {
					if (e.slice(-1) != "/") {
						e += "/"
					}
					t = typeof t !== "undefined" ? t : false;
					if (!this.files[e]) {
						x.call(this, e, null, {
							dir: true,
							createFolders: t
						})
					}
					return this.files[e]
				};
				var S = function (e, t) {
					var r = new f,
					a;
					if (e._data instanceof f) {
						r.uncompressedSize = e._data.uncompressedSize;
						r.crc32 = e._data.crc32;
						if (r.uncompressedSize === 0 || e.dir) {
							t = c["STORE"];
							r.compressedContent = "";
							r.crc32 = 0
						} else if (e._data.compressionMethod === t.magic) {
							r.compressedContent = e._data.getCompressedContent()
						} else {
							a = e._data.getContent();
							r.compressedContent = t.compress(n.transformTo(t.compressInputType, a))
						}
					} else {
						a = v(e);
						if (!a || a.length === 0 || e.dir) {
							t = c["STORE"];
							a = ""
						}
						r.uncompressedSize = a.length;
						r.crc32 = i(a);
						r.compressedContent = t.compress(n.transformTo(t.compressInputType, a))
					}
					r.compressedSize = r.compressedContent.length;
					r.compressionMethod = t.magic;
					return r
				};
				var A = function (e, t, r, a) {
					var o = r.compressedContent,
					l = n.transformTo("string", h.utf8encode(t.name)),
					c = t.comment || "",
					f = n.transformTo("string", h.utf8encode(c)),
					u = l.length !== t.name.length,
					d = f.length !== c.length,
					p = t.options,
					m,
					v,
					g = "",
					b = "",
					w = "",
					k,
					x;
					if (t._initialMetadata.dir !== t.dir) {
						k = t.dir
					} else {
						k = p.dir
					}
					if (t._initialMetadata.date !== t.date) {
						x = t.date
					} else {
						x = p.date
					}
					m = x.getHours();
					m = m << 6;
					m = m | x.getMinutes();
					m = m << 5;
					m = m | x.getSeconds() / 2;
					v = x.getFullYear() - 1980;
					v = v << 4;
					v = v | x.getMonth() + 1;
					v = v << 5;
					v = v | x.getDate();
					if (u) {
						b = y(1, 1) + y(i(l), 4) + l;
						g += "up" + y(b.length, 2) + b
					}
					if (d) {
						w = y(1, 1) + y(this.crc32(f), 4) + f;
						g += "uc" + y(w.length, 2) + w
					}
					var _ = "";
					_ += "\n\0";
					_ += u || d ? "\0\b" : "\0\0";
					_ += r.compressionMethod;
					_ += y(m, 2);
					_ += y(v, 2);
					_ += y(r.crc32, 4);
					_ += y(r.compressedSize, 4);
					_ += y(r.uncompressedSize, 4);
					_ += y(l.length, 2);
					_ += y(g.length, 2);
					var C = s.LOCAL_FILE_HEADER + _ + l + g;
					var S = s.CENTRAL_FILE_HEADER + "\0" + _ + y(f.length, 2) + "\0\0" + "\0\0" + (k === true ? "\0\0\0" : "\0\0\0\0") + y(a, 4) + l + g + f;
					return {
						fileRecord: C,
						dirRecord: S,
						compressedObject: r
					}
				};
				var T = {
					load: function (e, t) {
						throw new Error("Load method is not defined. Is the file jszip-load.js included ?")
					},
					filter: function (e) {
						var t = [],
						r,
						a,
						n,
						i;
						for (r in this.files) {
							if (!this.files.hasOwnProperty(r)) {
								continue
							}
							n = this.files[r];
							i = new b(n.name, n._data, w(n.options));
							a = r.slice(this.root.length, r.length);
							if (r.slice(0, this.root.length) === this.root && e(a, i)) {
								t.push(i)
							}
						}
						return t
					},
					file: function (e, t, r) {
						if (arguments.length === 1) {
							if (n.isRegExp(e)) {
								var a = e;
								return this.filter(function (e, t) {
									return !t.dir && a.test(e)
								})
							} else {
								return this.filter(function (t, r) {
									return !r.dir && t === e
								})[0] || null
							}
						} else {
							e = this.root + e;
							x.call(this, e, t, r)
						}
						return this
					},
					folder: function (e) {
						if (!e) {
							return this
						}
						if (n.isRegExp(e)) {
							return this.filter(function (t, r) {
								return r.dir && e.test(t)
							})
						}
						var t = this.root + e;
						var r = C.call(this, t);
						var a = this.clone();
						a.root = r.name;
						return a
					},
					remove: function (e) {
						e = this.root + e;
						var t = this.files[e];
						if (!t) {
							if (e.slice(-1) != "/") {
								e += "/"
							}
							t = this.files[e]
						}
						if (t && !t.dir) {
							delete this.files[e]
						} else {
							var r = this.filter(function (t, r) {
									return r.name.slice(0, e.length) === e
								});
							for (var a = 0; a < r.length; a++) {
								delete this.files[r[a].name]
							}
						}
						return this
					},
					generate: function (e) {
						e = w(e || {}, {
								base64: true,
								compression: "STORE",
								type: "base64",
								comment: null
							});
						n.checkSupport(e.type);
						var t = [],
						r = 0,
						a = 0,
						i,
						o,
						f = n.transformTo("string", this.utf8encode(e.comment || this.comment || ""));
						for (var u in this.files) {
							if (!this.files.hasOwnProperty(u)) {
								continue
							}
							var h = this.files[u];
							var m = h.options.compression || e.compression.toUpperCase();
							var v = c[m];
							if (!v) {
								throw new Error(m + " is not a valid compression method !")
							}
							var g = S.call(this, h, v);
							var b = A.call(this, u, h, g, r);
							r += b.fileRecord.length + g.compressedSize;
							a += b.dirRecord.length;
							t.push(b)
						}
						var k = "";
						k = s.CENTRAL_DIRECTORY_END + "\0\0" + "\0\0" + y(t.length, 2) + y(t.length, 2) + y(a, 4) + y(r, 4) + y(f.length, 2) + f;
						var x = e.type.toLowerCase();
						if (x === "uint8array" || x === "arraybuffer" || x === "blob" || x === "nodebuffer") {
							i = new p(r + a + k.length)
						} else {
							i = new d(r + a + k.length)
						}
						for (o = 0; o < t.length; o++) {
							i.append(t[o].fileRecord);
							i.append(t[o].compressedObject.compressedContent)
						}
						for (o = 0; o < t.length; o++) {
							i.append(t[o].dirRecord)
						}
						i.append(k);
						var _ = i.finalize();
						switch (e.type.toLowerCase()) {
						case "uint8array": ;
						case "arraybuffer": ;
						case "nodebuffer":
							return n.transformTo(e.type.toLowerCase(), _);
						case "blob":
							return n.arrayBuffer2Blob(n.transformTo("arraybuffer", _));
						case "base64":
							return e.base64 ? l.encode(_) : _;
						default:
							return _;
						}
					},
					crc32: function (e, t) {
						return i(e, t)
					},
					utf8encode: function (e) {
						return n.transformTo("string", h.utf8encode(e))
					},
					utf8decode: function (e) {
						return h.utf8decode(e)
					}
				};
				t.exports = T
			}, {
				"./base64": 1,
				"./compressedObject": 2,
				"./compressions": 3,
				"./crc32": 4,
				"./defaults": 6,
				"./nodeBuffer": 11,
				"./signature": 14,
				"./stringWriter": 16,
				"./support": 17,
				"./uint8ArrayWriter": 19,
				"./utf8": 20,
				"./utils": 21
			}
		],
		14: [function (e, t, r) {
				"use strict";
				r.LOCAL_FILE_HEADER = "PK";
				r.CENTRAL_FILE_HEADER = "PK";
				r.CENTRAL_DIRECTORY_END = "PK";
				r.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK";
				r.ZIP64_CENTRAL_DIRECTORY_END = "PK";
				r.DATA_DESCRIPTOR = "PK\b"
			}, {}
		],
		15: [function (e, t, r) {
				"use strict";
				var a = e("./dataReader");
				var n = e("./utils");
				function i(e, t) {
					this.data = e;
					if (!t) {
						this.data = n.string2binary(this.data)
					}
					this.length = this.data.length;
					this.index = 0
				}
				i.prototype = new a;
				i.prototype.byteAt = function (e) {
					return this.data.charCodeAt(e)
				};
				i.prototype.lastIndexOfSignature = function (e) {
					return this.data.lastIndexOf(e)
				};
				i.prototype.readData = function (e) {
					this.checkOffset(e);
					var t = this.data.slice(this.index, this.index + e);
					this.index += e;
					return t
				};
				t.exports = i
			}, {
				"./dataReader": 5,
				"./utils": 21
			}
		],
		16: [function (e, t, r) {
				"use strict";
				var a = e("./utils");
				var n = function () {
					this.data = []
				};
				n.prototype = {
					append: function (e) {
						e = a.transformTo("string", e);
						this.data.push(e)
					},
					finalize: function () {
						return this.data.join("")
					}
				};
				t.exports = n
			}, {
				"./utils": 21
			}
		],
		17: [function (e, t, r) {
				(function (e) {
					"use strict";
					r.base64 = true;
					r.array = true;
					r.string = true;
					r.arraybuffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined";
					r.nodebuffer = typeof e !== "undefined";
					r.uint8array = typeof Uint8Array !== "undefined";
					if (typeof ArrayBuffer === "undefined") {
						r.blob = false
					} else {
						var t = new ArrayBuffer(0);
						try {
							r.blob = new Blob([t], {
									type: "application/zip"
								}).size === 0
						} catch (a) {
							try {
								var n = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
								var i = new n;
								i.append(t);
								r.blob = i.getBlob("application/zip").size === 0
							} catch (a) {
								r.blob = false
							}
						}
					}
				}).call(this, typeof Buffer !== "undefined" ? Buffer : undefined)
			}, {}
		],
		18: [function (e, t, r) {
				"use strict";
				var a = e("./dataReader");
				function n(e) {
					if (e) {
						this.data = e;
						this.length = this.data.length;
						this.index = 0
					}
				}
				n.prototype = new a;
				n.prototype.byteAt = function (e) {
					return this.data[e]
				};
				n.prototype.lastIndexOfSignature = function (e) {
					var t = e.charCodeAt(0),
					r = e.charCodeAt(1),
					a = e.charCodeAt(2),
					n = e.charCodeAt(3);
					for (var i = this.length - 4; i >= 0; --i) {
						if (this.data[i] === t && this.data[i + 1] === r && this.data[i + 2] === a && this.data[i + 3] === n) {
							return i
						}
					}
					return -1
				};
				n.prototype.readData = function (e) {
					this.checkOffset(e);
					if (e === 0) {
						return new Uint8Array(0)
					}
					var t = this.data.subarray(this.index, this.index + e);
					this.index += e;
					return t
				};
				t.exports = n
			}, {
				"./dataReader": 5
			}
		],
		19: [function (e, t, r) {
				"use strict";
				var a = e("./utils");
				var n = function (e) {
					this.data = new Uint8Array(e);
					this.index = 0
				};
				n.prototype = {
					append: function (e) {
						if (e.length !== 0) {
							e = a.transformTo("uint8array", e);
							this.data.set(e, this.index);
							this.index += e.length
						}
					},
					finalize: function () {
						return this.data
					}
				};
				t.exports = n
			}, {
				"./utils": 21
			}
		],
		20: [function (e, t, r) {
				"use strict";
				var a = e("./utils");
				var n = e("./support");
				var i = e("./nodeBuffer");
				var s = new Array(256);
				for (var o = 0; o < 256; o++) {
					s[o] = o >= 252 ? 6 : o >= 248 ? 5 : o >= 240 ? 4 : o >= 224 ? 3 : o >= 192 ? 2 : 1
				}
				s[254] = s[254] = 1;
				var l = function (e) {
					var t,
					r,
					a,
					i,
					s,
					o = e.length,
					l = 0;
					for (i = 0; i < o; i++) {
						r = e.charCodeAt(i);
						if ((r & 64512) === 55296 && i + 1 < o) {
							a = e.charCodeAt(i + 1);
							if ((a & 64512) === 56320) {
								r = 65536 + (r - 55296 << 10) + (a - 56320);
								i++
							}
						}
						l += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4
					}
					if (n.uint8array) {
						t = new Uint8Array(l)
					} else {
						t = new Array(l)
					}
					for (s = 0, i = 0; s < l; i++) {
						r = e.charCodeAt(i);
						if ((r & 64512) === 55296 && i + 1 < o) {
							a = e.charCodeAt(i + 1);
							if ((a & 64512) === 56320) {
								r = 65536 + (r - 55296 << 10) + (a - 56320);
								i++
							}
						}
						if (r < 128) {
							t[s++] = r
						} else if (r < 2048) {
							t[s++] = 192 | r >>> 6;
							t[s++] = 128 | r & 63
						} else if (r < 65536) {
							t[s++] = 224 | r >>> 12;
							t[s++] = 128 | r >>> 6 & 63;
							t[s++] = 128 | r & 63
						} else {
							t[s++] = 240 | r >>> 18;
							t[s++] = 128 | r >>> 12 & 63;
							t[s++] = 128 | r >>> 6 & 63;
							t[s++] = 128 | r & 63
						}
					}
					return t
				};
				var c = function (e, t) {
					var r;
					t = t || e.length;
					if (t > e.length) {
						t = e.length
					}
					r = t - 1;
					while (r >= 0 && (e[r] & 192) === 128) {
						r--
					}
					if (r < 0) {
						return t
					}
					if (r === 0) {
						return t
					}
					return r + s[e[r]] > t ? r : t
				};
				var f = function (e) {
					var t,
					r,
					n,
					i,
					o;
					var l = e.length;
					var c = new Array(l * 2);
					for (n = 0, r = 0; r < l; ) {
						i = e[r++];
						if (i < 128) {
							c[n++] = i;
							continue
						}
						o = s[i];
						if (o > 4) {
							c[n++] = 65533;
							r += o - 1;
							continue
						}
						i &= o === 2 ? 31 : o === 3 ? 15 : 7;
						while (o > 1 && r < l) {
							i = i << 6 | e[r++] & 63;
							o--
						}
						if (o > 1) {
							c[n++] = 65533;
							continue
						}
						if (i < 65536) {
							c[n++] = i
						} else {
							i -= 65536;
							c[n++] = 55296 | i >> 10 & 1023;
							c[n++] = 56320 | i & 1023
						}
					}
					if (c.length !== n) {
						if (c.subarray) {
							c = c.subarray(0, n)
						} else {
							c.length = n
						}
					}
					return a.applyFromCharCode(c)
				};
				r.utf8encode = function u(e) {
					if (n.nodebuffer) {
						return i(e, "utf-8")
					}
					return l(e)
				};
				r.utf8decode = function h(e) {
					if (n.nodebuffer) {
						return a.transformTo("nodebuffer", e).toString("utf-8")
					}
					e = a.transformTo(n.uint8array ? "uint8array" : "array", e);
					var t = [],
					r = 0,
					i = e.length,
					s = 65536;
					while (r < i) {
						var o = c(e, Math.min(r + s, i));
						if (n.uint8array) {
							t.push(f(e.subarray(r, o)))
						} else {
							t.push(f(e.slice(r, o)))
						}
						r = o
					}
					return t.join("")
				}
			}, {
				"./nodeBuffer": 11,
				"./support": 17,
				"./utils": 21
			}
		],
		21: [function (e, t, r) {
				"use strict";
				var a = e("./support");
				var n = e("./compressions");
				var i = e("./nodeBuffer");
				r.string2binary = function (e) {
					var t = "";
					for (var r = 0; r < e.length; r++) {
						t += String.fromCharCode(e.charCodeAt(r) & 255)
					}
					return t
				};
				r.arrayBuffer2Blob = function (e) {
					r.checkSupport("blob");
					try {
						return new Blob([e], {
							type: "application/zip"
						})
					} catch (t) {
						try {
							var a = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
							var n = new a;
							n.append(e);
							return n.getBlob("application/zip")
						} catch (t) {
							throw new Error("Bug : can't construct the Blob.")
						}
					}
				};
				function s(e) {
					return e
				}
				function o(e, t) {
					for (var r = 0; r < e.length; ++r) {
						t[r] = e.charCodeAt(r) & 255
					}
					return t
				}
				function l(e) {
					var t = 65536;
					var a = [],
					n = e.length,
					s = r.getTypeOf(e),
					o = 0,
					l = true;
					try {
						switch (s) {
						case "uint8array":
							String.fromCharCode.apply(null, new Uint8Array(0));
							break;
						case "nodebuffer":
							String.fromCharCode.apply(null, i(0));
							break;
						}
					} catch (c) {
						l = false
					}
					if (!l) {
						var f = "";
						for (var u = 0; u < e.length; u++) {
							f += String.fromCharCode(e[u])
						}
						return f
					}
					while (o < n && t > 1) {
						try {
							if (s === "array" || s === "nodebuffer") {
								a.push(String.fromCharCode.apply(null, e.slice(o, Math.min(o + t, n))))
							} else {
								a.push(String.fromCharCode.apply(null, e.subarray(o, Math.min(o + t, n))))
							}
							o += t
						} catch (c) {
							t = Math.floor(t / 2)
						}
					}
					return a.join("")
				}
				r.applyFromCharCode = l;
				function c(e, t) {
					for (var r = 0; r < e.length; r++) {
						t[r] = e[r]
					}
					return t
				}
				var f = {};
				f["string"] = {
					string: s,
					array: function (e) {
						return o(e, new Array(e.length))
					},
					arraybuffer: function (e) {
						return f["string"]["uint8array"](e).buffer
					},
					uint8array: function (e) {
						return o(e, new Uint8Array(e.length))
					},
					nodebuffer: function (e) {
						return o(e, i(e.length))
					}
				};
				f["array"] = {
					string: l,
					array: s,
					arraybuffer: function (e) {
						return new Uint8Array(e).buffer
					},
					uint8array: function (e) {
						return new Uint8Array(e)
					},
					nodebuffer: function (e) {
						return i(e)
					}
				};
				f["arraybuffer"] = {
					string: function (e) {
						return l(new Uint8Array(e))
					},
					array: function (e) {
						return c(new Uint8Array(e), new Array(e.byteLength))
					},
					arraybuffer: s,
					uint8array: function (e) {
						return new Uint8Array(e)
					},
					nodebuffer: function (e) {
						return i(new Uint8Array(e))
					}
				};
				f["uint8array"] = {
					string: l,
					array: function (e) {
						return c(e, new Array(e.length))
					},
					arraybuffer: function (e) {
						return e.buffer
					},
					uint8array: s,
					nodebuffer: function (e) {
						return i(e)
					}
				};
				f["nodebuffer"] = {
					string: l,
					array: function (e) {
						return c(e, new Array(e.length))
					},
					arraybuffer: function (e) {
						return f["nodebuffer"]["uint8array"](e).buffer
					},
					uint8array: function (e) {
						return c(e, new Uint8Array(e.length))
					},
					nodebuffer: s
				};
				r.transformTo = function (e, t) {
					if (!t) {
						t = ""
					}
					if (!e) {
						return t
					}
					r.checkSupport(e);
					var a = r.getTypeOf(t);
					var n = f[a][e](t);
					return n
				};
				r.getTypeOf = function (e) {
					if (typeof e === "string") {
						return "string"
					}
					if (Object.prototype.toString.call(e) === "[object Array]") {
						return "array"
					}
					if (a.nodebuffer && i.test(e)) {
						return "nodebuffer"
					}
					if (a.uint8array && e instanceof Uint8Array) {
						return "uint8array"
					}
					if (a.arraybuffer && e instanceof ArrayBuffer) {
						return "arraybuffer"
					}
				};
				r.checkSupport = function (e) {
					var t = a[e.toLowerCase()];
					if (!t) {
						throw new Error(e + " is not supported by this browser")
					}
				};
				r.MAX_VALUE_16BITS = 65535;
				r.MAX_VALUE_32BITS = -1;
				r.pretty = function (e) {
					var t = "",
					r,
					a;
					for (a = 0; a < (e || "").length; a++) {
						r = e.charCodeAt(a);
						t += "\\x" + (r < 16 ? "0" : "") + r.toString(16).toUpperCase()
					}
					return t
				};
				r.findCompression = function (e) {
					for (var t in n) {
						if (!n.hasOwnProperty(t)) {
							continue
						}
						if (n[t].magic === e) {
							return n[t]
						}
					}
					return null
				};
				r.isRegExp = function (e) {
					return Object.prototype.toString.call(e) === "[object RegExp]"
				}
			}, {
				"./compressions": 3,
				"./nodeBuffer": 11,
				"./support": 17
			}
		],
		22: [function (e, t, r) {
				"use strict";
				var a = e("./stringReader");
				var n = e("./nodeBufferReader");
				var i = e("./uint8ArrayReader");
				var s = e("./utils");
				var o = e("./signature");
				var l = e("./zipEntry");
				var c = e("./support");
				var f = e("./object");
				function u(e, t) {
					this.files = [];
					this.loadOptions = t;
					if (e) {
						this.load(e)
					}
				}
				u.prototype = {
					checkSignature: function (e) {
						var t = this.reader.readString(4);
						if (t !== e) {
							throw new Error("Corrupted zip or bug : unexpected signature " + "(" + s.pretty(t) + ", expected " + s.pretty(e) + ")")
						}
					},
					readBlockEndOfCentral: function () {
						this.diskNumber = this.reader.readInt(2);
						this.diskWithCentralDirStart = this.reader.readInt(2);
						this.centralDirRecordsOnThisDisk = this.reader.readInt(2);
						this.centralDirRecords = this.reader.readInt(2);
						this.centralDirSize = this.reader.readInt(4);
						this.centralDirOffset = this.reader.readInt(4);
						this.zipCommentLength = this.reader.readInt(2);
						this.zipComment = this.reader.readString(this.zipCommentLength);
						this.zipComment = f.utf8decode(this.zipComment)
					},
					readBlockZip64EndOfCentral: function () {
						this.zip64EndOfCentralSize = this.reader.readInt(8);
						this.versionMadeBy = this.reader.readString(2);
						this.versionNeeded = this.reader.readInt(2);
						this.diskNumber = this.reader.readInt(4);
						this.diskWithCentralDirStart = this.reader.readInt(4);
						this.centralDirRecordsOnThisDisk = this.reader.readInt(8);
						this.centralDirRecords = this.reader.readInt(8);
						this.centralDirSize = this.reader.readInt(8);
						this.centralDirOffset = this.reader.readInt(8);
						this.zip64ExtensibleData = {};
						var e = this.zip64EndOfCentralSize - 44,
						t = 0,
						r,
						a,
						n;
						while (t < e) {
							r = this.reader.readInt(2);
							a = this.reader.readInt(4);
							n = this.reader.readString(a);
							this.zip64ExtensibleData[r] = {
								id: r,
								length: a,
								value: n
							}
						}
					},
					readBlockZip64EndOfCentralLocator: function () {
						this.diskWithZip64CentralDirStart = this.reader.readInt(4);
						this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8);
						this.disksCount = this.reader.readInt(4);
						if (this.disksCount > 1) {
							throw new Error("Multi-volumes zip are not supported")
						}
					},
					readLocalFiles: function () {
						var e,
						t;
						for (e = 0; e < this.files.length; e++) {
							t = this.files[e];
							this.reader.setIndex(t.localHeaderOffset);
							this.checkSignature(o.LOCAL_FILE_HEADER);
							t.readLocalPart(this.reader);
							t.handleUTF8()
						}
					},
					readCentralDir: function () {
						var e;
						this.reader.setIndex(this.centralDirOffset);
						while (this.reader.readString(4) === o.CENTRAL_FILE_HEADER) {
							e = new l({
									zip64: this.zip64
								}, this.loadOptions);
							e.readCentralPart(this.reader);
							this.files.push(e)
						}
					},
					readEndOfCentral: function () {
						var e = this.reader.lastIndexOfSignature(o.CENTRAL_DIRECTORY_END);
						if (e === -1) {
							throw new Error("Corrupted zip : can't find end of central directory")
						}
						this.reader.setIndex(e);
						this.checkSignature(o.CENTRAL_DIRECTORY_END);
						this.readBlockEndOfCentral();
						if (this.diskNumber === s.MAX_VALUE_16BITS || this.diskWithCentralDirStart === s.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === s.MAX_VALUE_16BITS || this.centralDirRecords === s.MAX_VALUE_16BITS || this.centralDirSize === s.MAX_VALUE_32BITS || this.centralDirOffset === s.MAX_VALUE_32BITS) {
							this.zip64 = true;
							e = this.reader.lastIndexOfSignature(o.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
							if (e === -1) {
								throw new Error("Corrupted zip : can't find the ZIP64 end of central directory locator")
							}
							this.reader.setIndex(e);
							this.checkSignature(o.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
							this.readBlockZip64EndOfCentralLocator();
							this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir);
							this.checkSignature(o.ZIP64_CENTRAL_DIRECTORY_END);
							this.readBlockZip64EndOfCentral()
						}
					},
					prepareReader: function (e) {
						var t = s.getTypeOf(e);
						if (t === "string" && !c.uint8array) {
							this.reader = new a(e, this.loadOptions.optimizedBinaryString)
						} else if (t === "nodebuffer") {
							this.reader = new n(e)
						} else {
							this.reader = new i(s.transformTo("uint8array", e))
						}
					},
					load: function (e) {
						this.prepareReader(e);
						this.readEndOfCentral();
						this.readCentralDir();
						this.readLocalFiles()
					}
				};
				t.exports = u
			}, {
				"./nodeBufferReader": 12,
				"./object": 13,
				"./signature": 14,
				"./stringReader": 15,
				"./support": 17,
				"./uint8ArrayReader": 18,
				"./utils": 21,
				"./zipEntry": 23
			}
		],
		23: [function (e, t, r) {
				"use strict";
				var a = e("./stringReader");
				var n = e("./utils");
				var i = e("./compressedObject");
				var s = e("./object");
				function o(e, t) {
					this.options = e;
					this.loadOptions = t
				}
				o.prototype = {
					isEncrypted: function () {
						return (this.bitFlag & 1) === 1
					},
					useUTF8: function () {
						return (this.bitFlag & 2048) === 2048
					},
					prepareCompressedContent: function (e, t, r) {
						return function () {
							var a = e.index;
							e.setIndex(t);
							var n = e.readData(r);
							e.setIndex(a);
							return n
						}
					},
					prepareContent: function (e, t, r, a, i) {
						return function () {
							var e = n.transformTo(a.uncompressInputType, this.getCompressedContent());
							var t = a.uncompress(e);
							if (t.length !== i) {
								throw new Error("Bug : uncompressed data size mismatch")
							}
							return t
						}
					},
					readLocalPart: function (e) {
						var t,
						r;
						e.skip(22);
						this.fileNameLength = e.readInt(2);
						r = e.readInt(2);
						this.fileName = e.readString(this.fileNameLength);
						e.skip(r);
						if (this.compressedSize == -1 || this.uncompressedSize == -1) {
							throw new Error("Bug or corrupted zip : didn't get enough informations from the central directory " + "(compressedSize == -1 || uncompressedSize == -1)")
						}
						t = n.findCompression(this.compressionMethod);
						if (t === null) {
							throw new Error("Corrupted zip : compression " + n.pretty(this.compressionMethod) + " unknown (inner file : " + this.fileName + ")")
						}
						this.decompressed = new i;
						this.decompressed.compressedSize = this.compressedSize;
						this.decompressed.uncompressedSize = this.uncompressedSize;
						this.decompressed.crc32 = this.crc32;
						this.decompressed.compressionMethod = this.compressionMethod;
						this.decompressed.getCompressedContent = this.prepareCompressedContent(e, e.index, this.compressedSize, t);
						this.decompressed.getContent = this.prepareContent(e, e.index, this.compressedSize, t, this.uncompressedSize);
						if (this.loadOptions.checkCRC32) {
							this.decompressed = n.transformTo("string", this.decompressed.getContent());
							if (s.crc32(this.decompressed) !== this.crc32) {
								throw new Error("Corrupted zip : CRC32 mismatch")
							}
						}
					},
					readCentralPart: function (e) {
						this.versionMadeBy = e.readString(2);
						this.versionNeeded = e.readInt(2);
						this.bitFlag = e.readInt(2);
						this.compressionMethod = e.readString(2);
						this.date = e.readDate();
						this.crc32 = e.readInt(4);
						this.compressedSize = e.readInt(4);
						this.uncompressedSize = e.readInt(4);
						this.fileNameLength = e.readInt(2);
						this.extraFieldsLength = e.readInt(2);
						this.fileCommentLength = e.readInt(2);
						this.diskNumberStart = e.readInt(2);
						this.internalFileAttributes = e.readInt(2);
						this.externalFileAttributes = e.readInt(4);
						this.localHeaderOffset = e.readInt(4);
						if (this.isEncrypted()) {
							throw new Error("Encrypted zip are not supported")
						}
						this.fileName = e.readString(this.fileNameLength);
						this.readExtraFields(e);
						this.parseZIP64ExtraField(e);
						this.fileComment = e.readString(this.fileCommentLength);
						this.dir = this.externalFileAttributes & 16 ? true : false
					},
					parseZIP64ExtraField: function (e) {
						if (!this.extraFields[1]) {
							return
						}
						var t = new a(this.extraFields[1].value);
						if (this.uncompressedSize === n.MAX_VALUE_32BITS) {
							this.uncompressedSize = t.readInt(8)
						}
						if (this.compressedSize === n.MAX_VALUE_32BITS) {
							this.compressedSize = t.readInt(8)
						}
						if (this.localHeaderOffset === n.MAX_VALUE_32BITS) {
							this.localHeaderOffset = t.readInt(8)
						}
						if (this.diskNumberStart === n.MAX_VALUE_32BITS) {
							this.diskNumberStart = t.readInt(4)
						}
					},
					readExtraFields: function (e) {
						var t = e.index,
						r,
						a,
						n;
						this.extraFields = this.extraFields || {};
						while (e.index < t + this.extraFieldsLength) {
							r = e.readInt(2);
							a = e.readInt(2);
							n = e.readString(a);
							this.extraFields[r] = {
								id: r,
								length: a,
								value: n
							}
						}
					},
					handleUTF8: function () {
						if (this.useUTF8()) {
							this.fileName = s.utf8decode(this.fileName);
							this.fileComment = s.utf8decode(this.fileComment)
						} else {
							var e = this.findExtraFieldUnicodePath();
							if (e !== null) {
								this.fileName = e
							}
							var t = this.findExtraFieldUnicodeComment();
							if (t !== null) {
								this.fileComment = t
							}
						}
					},
					findExtraFieldUnicodePath: function () {
						var e = this.extraFields[28789];
						if (e) {
							var t = new a(e.value);
							if (t.readInt(1) !== 1) {
								return null
							}
							if (s.crc32(this.fileName) !== t.readInt(4)) {
								return null
							}
							return s.utf8decode(t.readString(e.length - 5))
						}
						return null
					},
					findExtraFieldUnicodeComment: function () {
						var e = this.extraFields[25461];
						if (e) {
							var t = new a(e.value);
							if (t.readInt(1) !== 1) {
								return null
							}
							if (s.crc32(this.fileComment) !== t.readInt(4)) {
								return null
							}
							return s.utf8decode(t.readString(e.length - 5))
						}
						return null
					}
				};
				t.exports = o
			}, {
				"./compressedObject": 2,
				"./object": 13,
				"./stringReader": 15,
				"./utils": 21
			}
		],
		24: [function (e, t, r) {
				"use strict";
				var a = e("./lib/utils/common").assign;
				var n = e("./lib/deflate");
				var i = e("./lib/inflate");
				var s = e("./lib/zlib/constants");
				var o = {};
				a(o, n, i, s);
				t.exports = o
			}, {
				"./lib/deflate": 25,
				"./lib/inflate": 26,
				"./lib/utils/common": 27,
				"./lib/zlib/constants": 30
			}
		],
		25: [function (e, t, r) {
				"use strict";
				var a = e("./zlib/deflate.js");
				var n = e("./utils/common");
				var i = e("./utils/strings");
				var s = e("./zlib/messages");
				var o = e("./zlib/zstream");
				var l = 0;
				var c = 4;
				var f = 0;
				var u = 1;
				var h = -1;
				var d = 0;
				var p = 8;
				var m = function (e) {
					this.options = n.assign({
							level: h,
							method: p,
							chunkSize: 16384,
							windowBits: 15,
							memLevel: 8,
							strategy: d,
							to: ""
						}, e || {});
					var t = this.options;
					if (t.raw && t.windowBits > 0) {
						t.windowBits = -t.windowBits
					} else if (t.gzip && t.windowBits > 0 && t.windowBits < 16) {
						t.windowBits += 16
					}
					this.err = 0;
					this.msg = "";
					this.ended = false;
					this.chunks = [];
					this.strm = new o;
					this.strm.avail_out = 0;
					var r = a.deflateInit2(this.strm, t.level, t.method, t.windowBits, t.memLevel, t.strategy);
					if (r !== f) {
						throw new Error(s[r])
					}
					if (t.header) {
						a.deflateSetHeader(this.strm, t.header)
					}
				};
				m.prototype.push = function (e, t) {
					var r = this.strm;
					var s = this.options.chunkSize;
					var o,
					h;
					if (this.ended) {
						return false
					}
					h = t === ~~t ? t : t === true ? c : l;
					if (typeof e === "string") {
						r.input = i.string2buf(e)
					} else {
						r.input = e
					}
					r.next_in = 0;
					r.avail_in = r.input.length;
					do {
						if (r.avail_out === 0) {
							r.output = new n.Buf8(s);
							r.next_out = 0;
							r.avail_out = s
						}
						o = a.deflate(r, h);
						if (o !== u && o !== f) {
							this.onEnd(o);
							this.ended = true;
							return false
						}
						if (r.avail_out === 0 || r.avail_in === 0 && h === c) {
							if (this.options.to === "string") {
								this.onData(i.buf2binstring(n.shrinkBuf(r.output, r.next_out)))
							} else {
								this.onData(n.shrinkBuf(r.output, r.next_out))
							}
						}
					} while ((r.avail_in > 0 || r.avail_out === 0) && o !== u);
					if (h === c) {
						o = a.deflateEnd(this.strm);
						this.onEnd(o);
						this.ended = true;
						return o === f
					}
					return true
				};
				m.prototype.onData = function (e) {
					this.chunks.push(e)
				};
				m.prototype.onEnd = function (e) {
					if (e === f) {
						if (this.options.to === "string") {
							this.result = this.chunks.join("")
						} else {
							this.result = n.flattenChunks(this.chunks)
						}
					}
					this.chunks = [];
					this.err = e;
					this.msg = this.strm.msg
				};
				function v(e, t) {
					var r = new m(t);
					r.push(e, true);
					if (r.err) {
						throw r.msg
					}
					return r.result
				}
				function g(e, t) {
					t = t || {};
					t.raw = true;
					return v(e, t)
				}
				function b(e, t) {
					t = t || {};
					t.gzip = true;
					return v(e, t)
				}
				r.Deflate = m;
				r.deflate = v;
				r.deflateRaw = g;
				r.gzip = b
			}, {
				"./utils/common": 27,
				"./utils/strings": 28,
				"./zlib/deflate.js": 32,
				"./zlib/messages": 37,
				"./zlib/zstream": 39
			}
		],
		26: [function (e, t, r) {
				"use strict";
				var a = e("./zlib/inflate.js");
				var n = e("./utils/common");
				var i = e("./utils/strings");
				var s = e("./zlib/constants");
				var o = e("./zlib/messages");
				var l = e("./zlib/zstream");
				var c = e("./zlib/gzheader");
				var f = function (e) {
					this.options = n.assign({
							chunkSize: 16384,
							windowBits: 0,
							to: ""
						}, e || {});
					var t = this.options;
					if (t.raw && t.windowBits >= 0 && t.windowBits < 16) {
						t.windowBits = -t.windowBits;
						if (t.windowBits === 0) {
							t.windowBits = -15
						}
					}
					if (t.windowBits >= 0 && t.windowBits < 16 && !(e && e.windowBits)) {
						t.windowBits += 32
					}
					if (t.windowBits > 15 && t.windowBits < 48) {
						if ((t.windowBits & 15) === 0) {
							t.windowBits |= 15
						}
					}
					this.err = 0;
					this.msg = "";
					this.ended = false;
					this.chunks = [];
					this.strm = new l;
					this.strm.avail_out = 0;
					var r = a.inflateInit2(this.strm, t.windowBits);
					if (r !== s.Z_OK) {
						throw new Error(o[r])
					}
					this.header = new c;
					a.inflateGetHeader(this.strm, this.header)
				};
				f.prototype.push = function (e, t) {
					var r = this.strm;
					var o = this.options.chunkSize;
					var l,
					c;
					var f,
					u,
					h;
					if (this.ended) {
						return false
					}
					c = t === ~~t ? t : t === true ? s.Z_FINISH : s.Z_NO_FLUSH;
					if (typeof e === "string") {
						r.input = i.binstring2buf(e)
					} else {
						r.input = e
					}
					r.next_in = 0;
					r.avail_in = r.input.length;
					do {
						if (r.avail_out === 0) {
							r.output = new n.Buf8(o);
							r.next_out = 0;
							r.avail_out = o
						}
						l = a.inflate(r, s.Z_NO_FLUSH);
						if (l !== s.Z_STREAM_END && l !== s.Z_OK) {
							this.onEnd(l);
							this.ended = true;
							return false
						}
						if (r.next_out) {
							if (r.avail_out === 0 || l === s.Z_STREAM_END || r.avail_in === 0 && c === s.Z_FINISH) {
								if (this.options.to === "string") {
									f = i.utf8border(r.output, r.next_out);
									u = r.next_out - f;
									h = i.buf2string(r.output, f);
									r.next_out = u;
									r.avail_out = o - u;
									if (u) {
										n.arraySet(r.output, r.output, f, u, 0)
									}
									this.onData(h)
								} else {
									this.onData(n.shrinkBuf(r.output, r.next_out))
								}
							}
						}
					} while (r.avail_in > 0 && l !== s.Z_STREAM_END);
					if (l === s.Z_STREAM_END) {
						c = s.Z_FINISH
					}
					if (c === s.Z_FINISH) {
						l = a.inflateEnd(this.strm);
						this.onEnd(l);
						this.ended = true;
						return l === s.Z_OK
					}
					return true
				};
				f.prototype.onData = function (e) {
					this.chunks.push(e)
				};
				f.prototype.onEnd = function (e) {
					if (e === s.Z_OK) {
						if (this.options.to === "string") {
							this.result = this.chunks.join("")
						} else {
							this.result = n.flattenChunks(this.chunks)
						}
					}
					this.chunks = [];
					this.err = e;
					this.msg = this.strm.msg
				};
				function u(e, t) {
					var r = new f(t);
					r.push(e, true);
					if (r.err) {
						throw r.msg
					}
					return r.result
				}
				function h(e, t) {
					t = t || {};
					t.raw = true;
					return u(e, t)
				}
				r.Inflate = f;
				r.inflate = u;
				r.inflateRaw = h;
				r.ungzip = u
			}, {
				"./utils/common": 27,
				"./utils/strings": 28,
				"./zlib/constants": 30,
				"./zlib/gzheader": 33,
				"./zlib/inflate.js": 35,
				"./zlib/messages": 37,
				"./zlib/zstream": 39
			}
		],
		27: [function (e, t, r) {
				"use strict";
				var a = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Int32Array !== "undefined";
				r.assign = function (e) {
					var t = Array.prototype.slice.call(arguments, 1);
					while (t.length) {
						var r = t.shift();
						if (!r) {
							continue
						}
						if (typeof r !== "object") {
							throw new TypeError(r + "must be non-object")
						}
						for (var a in r) {
							if (r.hasOwnProperty(a)) {
								e[a] = r[a]
							}
						}
					}
					return e
				};
				r.shrinkBuf = function (e, t) {
					if (e.length === t) {
						return e
					}
					if (e.subarray) {
						return e.subarray(0, t)
					}
					e.length = t;
					return e
				};
				var n = {
					arraySet: function (e, t, r, a, n) {
						if (t.subarray && e.subarray) {
							e.set(t.subarray(r, r + a), n);
							return
						}
						for (var i = 0; i < a; i++) {
							e[n + i] = t[r + i]
						}
					},
					flattenChunks: function (e) {
						var t,
						r,
						a,
						n,
						i,
						s;
						a = 0;
						for (t = 0, r = e.length; t < r; t++) {
							a += e[t].length
						}
						s = new Uint8Array(a);
						n = 0;
						for (t = 0, r = e.length; t < r; t++) {
							i = e[t];
							s.set(i, n);
							n += i.length
						}
						return s
					}
				};
				var i = {
					arraySet: function (e, t, r, a, n) {
						for (var i = 0; i < a; i++) {
							e[n + i] = t[r + i]
						}
					},
					flattenChunks: function (e) {
						return [].concat.apply([], e)
					}
				};
				r.setTyped = function (e) {
					if (e) {
						r.Buf8 = Uint8Array;
						r.Buf16 = Uint16Array;
						r.Buf32 = Int32Array;
						r.assign(r, n)
					} else {
						r.Buf8 = Array;
						r.Buf16 = Array;
						r.Buf32 = Array;
						r.assign(r, i)
					}
				};
				r.setTyped(a)
			}, {}
		],
		28: [function (e, t, r) {
				"use strict";
				var a = e("./common");
				var n = true;
				var i = true;
				try {
					String.fromCharCode.apply(null, [0])
				} catch (s) {
					n = false
				}
				try {
					String.fromCharCode.apply(null, new Uint8Array(1))
				} catch (s) {
					i = false
				}
				var o = new a.Buf8(256);
				for (var l = 0; l < 256; l++) {
					o[l] = l >= 252 ? 6 : l >= 248 ? 5 : l >= 240 ? 4 : l >= 224 ? 3 : l >= 192 ? 2 : 1
				}
				o[254] = o[254] = 1;
				r.string2buf = function (e) {
					var t,
					r,
					n,
					i,
					s,
					o = e.length,
					l = 0;
					for (i = 0; i < o; i++) {
						r = e.charCodeAt(i);
						if ((r & 64512) === 55296 && i + 1 < o) {
							n = e.charCodeAt(i + 1);
							if ((n & 64512) === 56320) {
								r = 65536 + (r - 55296 << 10) + (n - 56320);
								i++
							}
						}
						l += r < 128 ? 1 : r < 2048 ? 2 : r < 65536 ? 3 : 4
					}
					t = new a.Buf8(l);
					for (s = 0, i = 0; s < l; i++) {
						r = e.charCodeAt(i);
						if ((r & 64512) === 55296 && i + 1 < o) {
							n = e.charCodeAt(i + 1);
							if ((n & 64512) === 56320) {
								r = 65536 + (r - 55296 << 10) + (n - 56320);
								i++
							}
						}
						if (r < 128) {
							t[s++] = r
						} else if (r < 2048) {
							t[s++] = 192 | r >>> 6;
							t[s++] = 128 | r & 63
						} else if (r < 65536) {
							t[s++] = 224 | r >>> 12;
							t[s++] = 128 | r >>> 6 & 63;
							t[s++] = 128 | r & 63
						} else {
							t[s++] = 240 | r >>> 18;
							t[s++] = 128 | r >>> 12 & 63;
							t[s++] = 128 | r >>> 6 & 63;
							t[s++] = 128 | r & 63
						}
					}
					return t
				};
				function c(e, t) {
					if (t < 65537) {
						if (e.subarray && i || !e.subarray && n) {
							return String.fromCharCode.apply(null, a.shrinkBuf(e, t))
						}
					}
					var r = "";
					for (var s = 0; s < t; s++) {
						r += String.fromCharCode(e[s])
					}
					return r
				}
				r.buf2binstring = function (e) {
					return c(e, e.length)
				};
				r.binstring2buf = function (e) {
					var t = new a.Buf8(e.length);
					for (var r = 0, n = t.length; r < n; r++) {
						t[r] = e.charCodeAt(r)
					}
					return t
				};
				r.buf2string = function (e, t) {
					var r,
					a,
					n,
					i;
					var s = t || e.length;
					var l = new Array(s * 2);
					for (a = 0, r = 0; r < s; ) {
						n = e[r++];
						if (n < 128) {
							l[a++] = n;
							continue
						}
						i = o[n];
						if (i > 4) {
							l[a++] = 65533;
							r += i - 1;
							continue
						}
						n &= i === 2 ? 31 : i === 3 ? 15 : 7;
						while (i > 1 && r < s) {
							n = n << 6 | e[r++] & 63;
							i--
						}
						if (i > 1) {
							l[a++] = 65533;
							continue
						}
						if (n < 65536) {
							l[a++] = n
						} else {
							n -= 65536;
							l[a++] = 55296 | n >> 10 & 1023;
							l[a++] = 56320 | n & 1023
						}
					}
					return c(l, a)
				};
				r.utf8border = function (e, t) {
					var r;
					t = t || e.length;
					if (t > e.length) {
						t = e.length
					}
					r = t - 1;
					while (r >= 0 && (e[r] & 192) === 128) {
						r--
					}
					if (r < 0) {
						return t
					}
					if (r === 0) {
						return t
					}
					return r + o[e[r]] > t ? r : t
				}
			}, {
				"./common": 27
			}
		],
		29: [function (e, t, r) {
				"use strict";
				function a(e, t, r, a) {
					var n = e & 65535 | 0,
					i = e >>> 16 & 65535 | 0,
					s = 0;
					while (r !== 0) {
						s = r > 2e3 ? 2e3 : r;
						r -= s;
						do {
							n = n + t[a++] | 0;
							i = i + n | 0
						} while (--s);
						n %= 65521;
						i %= 65521
					}
					return n | i << 16 | 0
				}
				t.exports = a
			}, {}
		],
		30: [function (e, t, r) {
				t.exports = {
					Z_NO_FLUSH: 0,
					Z_PARTIAL_FLUSH: 1,
					Z_SYNC_FLUSH: 2,
					Z_FULL_FLUSH: 3,
					Z_FINISH: 4,
					Z_BLOCK: 5,
					Z_TREES: 6,
					Z_OK: 0,
					Z_STREAM_END: 1,
					Z_NEED_DICT: 2,
					Z_ERRNO: -1,
					Z_STREAM_ERROR: -2,
					Z_DATA_ERROR: -3,
					Z_BUF_ERROR: -5,
					Z_NO_COMPRESSION: 0,
					Z_BEST_SPEED: 1,
					Z_BEST_COMPRESSION: 9,
					Z_DEFAULT_COMPRESSION: -1,
					Z_FILTERED: 1,
					Z_HUFFMAN_ONLY: 2,
					Z_RLE: 3,
					Z_FIXED: 4,
					Z_DEFAULT_STRATEGY: 0,
					Z_BINARY: 0,
					Z_TEXT: 1,
					Z_UNKNOWN: 2,
					Z_DEFLATED: 8
				}
			}, {}
		],
		31: [function (e, t, r) {
				"use strict";
				function a() {
					var e,
					t = [];
					for (var r = 0; r < 256; r++) {
						e = r;
						for (var a = 0; a < 8; a++) {
							e = e & 1 ? 3988292384 ^ e >>> 1 : e >>> 1
						}
						t[r] = e
					}
					return t
				}
				var n = a();
				function i(e, t, r, a) {
					var i = n,
					s = a + r;
					e = e ^ -1;
					for (var o = a; o < s; o++) {
						e = e >>> 8 ^ i[(e ^ t[o]) & 255]
					}
					return e ^ -1
				}
				t.exports = i
			}, {}
		],
		32: [function (e, t, r) {
				"use strict";
				var a = e("../utils/common");
				var n = e("./trees");
				var i = e("./adler32");
				var s = e("./crc32");
				var o = e("./messages");
				var l = 0;
				var c = 1;
				var f = 3;
				var u = 4;
				var h = 5;
				var d = 0;
				var p = 1;
				var m = -2;
				var v = -3;
				var g = -5;
				var b = -1;
				var y = 1;
				var w = 2;
				var k = 3;
				var x = 4;
				var _ = 0;
				var C = 2;
				var S = 8;
				var A = 9;
				var T = 15;
				var E = 8;
				var F = 29;
				var D = 256;
				var z = D + 1 + F;
				var O = 30;
				var R = 19;
				var I = 2 * z + 1;
				var N = 15;
				var L = 3;
				var B = 258;
				var M = B + L + 1;
				var P = 32;
				var j = 42;
				var W = 69;
				var U = 73;
				var $ = 91;
				var H = 103;
				var X = 113;
				var V = 666;
				var G = 1;
				var Z = 2;
				var q = 3;
				var Y = 4;
				var K = 3;
				function J(e, t) {
					e.msg = o[t];
					return t
				}
				function Q(e) {
					return (e << 1) - (e > 4 ? 9 : 0)
				}
				function ee(e) {
					var t = e.length;
					while (--t >= 0) {
						e[t] = 0
					}
				}
				function te(e) {
					var t = e.state;
					var r = t.pending;
					if (r > e.avail_out) {
						r = e.avail_out
					}
					if (r === 0) {
						return
					}
					a.arraySet(e.output, t.pending_buf, t.pending_out, r, e.next_out);
					e.next_out += r;
					t.pending_out += r;
					e.total_out += r;
					e.avail_out -= r;
					t.pending -= r;
					if (t.pending === 0) {
						t.pending_out = 0
					}
				}
				function re(e, t) {
					n._tr_flush_block(e, e.block_start >= 0 ? e.block_start : -1, e.strstart - e.block_start, t);
					e.block_start = e.strstart;
					te(e.strm)
				}
				function ae(e, t) {
					e.pending_buf[e.pending++] = t
				}
				function ne(e, t) {
					e.pending_buf[e.pending++] = t >>> 8 & 255;
					e.pending_buf[e.pending++] = t & 255
				}
				function ie(e, t, r, n) {
					var o = e.avail_in;
					if (o > n) {
						o = n
					}
					if (o === 0) {
						return 0
					}
					e.avail_in -= o;
					a.arraySet(t, e.input, e.next_in, o, r);
					if (e.state.wrap === 1) {
						e.adler = i(e.adler, t, o, r)
					} else if (e.state.wrap === 2) {
						e.adler = s(e.adler, t, o, r)
					}
					e.next_in += o;
					e.total_in += o;
					return o
				}
				function se(e, t) {
					var r = e.max_chain_length;
					var a = e.strstart;
					var n;
					var i;
					var s = e.prev_length;
					var o = e.nice_match;
					var l = e.strstart > e.w_size - M ? e.strstart - (e.w_size - M) : 0;
					var c = e.window;
					var f = e.w_mask;
					var u = e.prev;
					var h = e.strstart + B;
					var d = c[a + s - 1];
					var p = c[a + s];
					if (e.prev_length >= e.good_match) {
						r >>= 2
					}
					if (o > e.lookahead) {
						o = e.lookahead
					}
					do {
						n = t;
						if (c[n + s] !== p || c[n + s - 1] !== d || c[n] !== c[a] || c[++n] !== c[a + 1]) {
							continue
						}
						a += 2;
						n++;
						do {}
						while (c[++a] === c[++n] && c[++a] === c[++n] && c[++a] === c[++n] && c[++a] === c[++n] && c[++a] === c[++n] && c[++a] === c[++n] && c[++a] === c[++n] && c[++a] === c[++n] && a < h);
						i = B - (h - a);
						a = h - B;
						if (i > s) {
							e.match_start = t;
							s = i;
							if (i >= o) {
								break
							}
							d = c[a + s - 1];
							p = c[a + s]
						}
					} while ((t = u[t & f]) > l && --r !== 0);
					if (s <= e.lookahead) {
						return s
					}
					return e.lookahead
				}
				function oe(e) {
					var t = e.w_size;
					var r,
					n,
					i,
					s,
					o;
					do {
						s = e.window_size - e.lookahead - e.strstart;
						if (e.strstart >= t + (t - M)) {
							a.arraySet(e.window, e.window, t, t, 0);
							e.match_start -= t;
							e.strstart -= t;
							e.block_start -= t;
							n = e.hash_size;
							r = n;
							do {
								i = e.head[--r];
								e.head[r] = i >= t ? i - t : 0
							} while (--n);
							n = t;
							r = n;
							do {
								i = e.prev[--r];
								e.prev[r] = i >= t ? i - t : 0
							} while (--n);
							s += t
						}
						if (e.strm.avail_in === 0) {
							break
						}
						n = ie(e.strm, e.window, e.strstart + e.lookahead, s);
						e.lookahead += n;
						if (e.lookahead + e.insert >= L) {
							o = e.strstart - e.insert;
							e.ins_h = e.window[o];
							e.ins_h = (e.ins_h << e.hash_shift ^ e.window[o + 1]) & e.hash_mask;
							while (e.insert) {
								e.ins_h = (e.ins_h << e.hash_shift ^ e.window[o + L - 1]) & e.hash_mask;
								e.prev[o & e.w_mask] = e.head[e.ins_h];
								e.head[e.ins_h] = o;
								o++;
								e.insert--;
								if (e.lookahead + e.insert < L) {
									break
								}
							}
						}
					} while (e.lookahead < M && e.strm.avail_in !== 0)
				}
				function le(e, t) {
					var r = 65535;
					if (r > e.pending_buf_size - 5) {
						r = e.pending_buf_size - 5
					}
					for (; ; ) {
						if (e.lookahead <= 1) {
							oe(e);
							if (e.lookahead === 0 && t === l) {
								return G
							}
							if (e.lookahead === 0) {
								break
							}
						}
						e.strstart += e.lookahead;
						e.lookahead = 0;
						var a = e.block_start + r;
						if (e.strstart === 0 || e.strstart >= a) {
							e.lookahead = e.strstart - a;
							e.strstart = a;
							re(e, false);
							if (e.strm.avail_out === 0) {
								return G
							}
						}
						if (e.strstart - e.block_start >= e.w_size - M) {
							re(e, false);
							if (e.strm.avail_out === 0) {
								return G
							}
						}
					}
					e.insert = 0;
					if (t === u) {
						re(e, true);
						if (e.strm.avail_out === 0) {
							return q
						}
						return Y
					}
					if (e.strstart > e.block_start) {
						re(e, false);
						if (e.strm.avail_out === 0) {
							return G
						}
					}
					return G
				}
				function ce(e, t) {
					var r;
					var a;
					for (; ; ) {
						if (e.lookahead < M) {
							oe(e);
							if (e.lookahead < M && t === l) {
								return G
							}
							if (e.lookahead === 0) {
								break
							}
						}
						r = 0;
						if (e.lookahead >= L) {
							e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + L - 1]) & e.hash_mask;
							r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h];
							e.head[e.ins_h] = e.strstart
						}
						if (r !== 0 && e.strstart - r <= e.w_size - M) {
							e.match_length = se(e, r)
						}
						if (e.match_length >= L) {
							a = n._tr_tally(e, e.strstart - e.match_start, e.match_length - L);
							e.lookahead -= e.match_length;
							if (e.match_length <= e.max_lazy_match && e.lookahead >= L) {
								e.match_length--;
								do {
									e.strstart++;
									e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + L - 1]) & e.hash_mask;
									r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h];
									e.head[e.ins_h] = e.strstart
								} while (--e.match_length !== 0);
								e.strstart++
							} else {
								e.strstart += e.match_length;
								e.match_length = 0;
								e.ins_h = e.window[e.strstart];
								e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + 1]) & e.hash_mask
							}
						} else {
							a = n._tr_tally(e, 0, e.window[e.strstart]);
							e.lookahead--;
							e.strstart++
						}
						if (a) {
							re(e, false);
							if (e.strm.avail_out === 0) {
								return G
							}
						}
					}
					e.insert = e.strstart < L - 1 ? e.strstart : L - 1;
					if (t === u) {
						re(e, true);
						if (e.strm.avail_out === 0) {
							return q
						}
						return Y
					}
					if (e.last_lit) {
						re(e, false);
						if (e.strm.avail_out === 0) {
							return G
						}
					}
					return Z
				}
				function fe(e, t) {
					var r;
					var a;
					var i;
					for (; ; ) {
						if (e.lookahead < M) {
							oe(e);
							if (e.lookahead < M && t === l) {
								return G
							}
							if (e.lookahead === 0) {
								break
							}
						}
						r = 0;
						if (e.lookahead >= L) {
							e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + L - 1]) & e.hash_mask;
							r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h];
							e.head[e.ins_h] = e.strstart
						}
						e.prev_length = e.match_length;
						e.prev_match = e.match_start;
						e.match_length = L - 1;
						if (r !== 0 && e.prev_length < e.max_lazy_match && e.strstart - r <= e.w_size - M) {
							e.match_length = se(e, r);
							if (e.match_length <= 5 && (e.strategy === y || e.match_length === L && e.strstart - e.match_start > 4096)) {
								e.match_length = L - 1
							}
						}
						if (e.prev_length >= L && e.match_length <= e.prev_length) {
							i = e.strstart + e.lookahead - L;
							a = n._tr_tally(e, e.strstart - 1 - e.prev_match, e.prev_length - L);
							e.lookahead -= e.prev_length - 1;
							e.prev_length -= 2;
							do {
								if (++e.strstart <= i) {
									e.ins_h = (e.ins_h << e.hash_shift ^ e.window[e.strstart + L - 1]) & e.hash_mask;
									r = e.prev[e.strstart & e.w_mask] = e.head[e.ins_h];
									e.head[e.ins_h] = e.strstart
								}
							} while (--e.prev_length !== 0);
							e.match_available = 0;
							e.match_length = L - 1;
							e.strstart++;
							if (a) {
								re(e, false);
								if (e.strm.avail_out === 0) {
									return G
								}
							}
						} else if (e.match_available) {
							a = n._tr_tally(e, 0, e.window[e.strstart - 1]);
							if (a) {
								re(e, false)
							}
							e.strstart++;
							e.lookahead--;
							if (e.strm.avail_out === 0) {
								return G
							}
						} else {
							e.match_available = 1;
							e.strstart++;
							e.lookahead--
						}
					}
					if (e.match_available) {
						a = n._tr_tally(e, 0, e.window[e.strstart - 1]);
						e.match_available = 0
					}
					e.insert = e.strstart < L - 1 ? e.strstart : L - 1;
					if (t === u) {
						re(e, true);
						if (e.strm.avail_out === 0) {
							return q
						}
						return Y
					}
					if (e.last_lit) {
						re(e, false);
						if (e.strm.avail_out === 0) {
							return G
						}
					}
					return Z
				}
				function ue(e, t) {
					var r;
					var a;
					var i,
					s;
					var o = e.window;
					for (; ; ) {
						if (e.lookahead <= B) {
							oe(e);
							if (e.lookahead <= B && t === l) {
								return G
							}
							if (e.lookahead === 0) {
								break
							}
						}
						e.match_length = 0;
						if (e.lookahead >= L && e.strstart > 0) {
							i = e.strstart - 1;
							a = o[i];
							if (a === o[++i] && a === o[++i] && a === o[++i]) {
								s = e.strstart + B;
								do {}
								while (a === o[++i] && a === o[++i] && a === o[++i] && a === o[++i] && a === o[++i] && a === o[++i] && a === o[++i] && a === o[++i] && i < s);
								e.match_length = B - (s - i);
								if (e.match_length > e.lookahead) {
									e.match_length = e.lookahead
								}
							}
						}
						if (e.match_length >= L) {
							r = n._tr_tally(e, 1, e.match_length - L);
							e.lookahead -= e.match_length;
							e.strstart += e.match_length;
							e.match_length = 0
						} else {
							r = n._tr_tally(e, 0, e.window[e.strstart]);
							e.lookahead--;
							e.strstart++
						}
						if (r) {
							re(e, false);
							if (e.strm.avail_out === 0) {
								return G
							}
						}
					}
					e.insert = 0;
					if (t === u) {
						re(e, true);
						if (e.strm.avail_out === 0) {
							return q
						}
						return Y
					}
					if (e.last_lit) {
						re(e, false);
						if (e.strm.avail_out === 0) {
							return G
						}
					}
					return Z
				}
				function he(e, t) {
					var r;
					for (; ; ) {
						if (e.lookahead === 0) {
							oe(e);
							if (e.lookahead === 0) {
								if (t === l) {
									return G
								}
								break
							}
						}
						e.match_length = 0;
						r = n._tr_tally(e, 0, e.window[e.strstart]);
						e.lookahead--;
						e.strstart++;
						if (r) {
							re(e, false);
							if (e.strm.avail_out === 0) {
								return G
							}
						}
					}
					e.insert = 0;
					if (t === u) {
						re(e, true);
						if (e.strm.avail_out === 0) {
							return q
						}
						return Y
					}
					if (e.last_lit) {
						re(e, false);
						if (e.strm.avail_out === 0) {
							return G
						}
					}
					return Z
				}
				var de = function (e, t, r, a, n) {
					this.good_length = e;
					this.max_lazy = t;
					this.nice_length = r;
					this.max_chain = a;
					this.func = n
				};
				var pe;
				pe = [new de(0, 0, 0, 0, le), new de(4, 4, 8, 4, ce), new de(4, 5, 16, 8, ce), new de(4, 6, 32, 32, ce), new de(4, 4, 16, 16, fe), new de(8, 16, 32, 32, fe), new de(8, 16, 128, 128, fe), new de(8, 32, 128, 256, fe), new de(32, 128, 258, 1024, fe), new de(32, 258, 258, 4096, fe)];
				function me(e) {
					e.window_size = 2 * e.w_size;
					ee(e.head);
					e.max_lazy_match = pe[e.level].max_lazy;
					e.good_match = pe[e.level].good_length;
					e.nice_match = pe[e.level].nice_length;
					e.max_chain_length = pe[e.level].max_chain;
					e.strstart = 0;
					e.block_start = 0;
					e.lookahead = 0;
					e.insert = 0;
					e.match_length = e.prev_length = L - 1;
					e.match_available = 0;
					e.ins_h = 0
				}
				function ve() {
					this.strm = null;
					this.status = 0;
					this.pending_buf = null;
					this.pending_buf_size = 0;
					this.pending_out = 0;
					this.pending = 0;
					this.wrap = 0;
					this.gzhead = null;
					this.gzindex = 0;
					this.method = S;
					this.last_flush = -1;
					this.w_size = 0;
					this.w_bits = 0;
					this.w_mask = 0;
					this.window = null;
					this.window_size = 0;
					this.prev = null;
					this.head = null;
					this.ins_h = 0;
					this.hash_size = 0;
					this.hash_bits = 0;
					this.hash_mask = 0;
					this.hash_shift = 0;
					this.block_start = 0;
					this.match_length = 0;
					this.prev_match = 0;
					this.match_available = 0;
					this.strstart = 0;
					this.match_start = 0;
					this.lookahead = 0;
					this.prev_length = 0;
					this.max_chain_length = 0;
					this.max_lazy_match = 0;
					this.level = 0;
					this.strategy = 0;
					this.good_match = 0;
					this.nice_match = 0;
					this.dyn_ltree = new a.Buf16(I * 2);
					this.dyn_dtree = new a.Buf16((2 * O + 1) * 2);
					this.bl_tree = new a.Buf16((2 * R + 1) * 2);
					ee(this.dyn_ltree);
					ee(this.dyn_dtree);
					ee(this.bl_tree);
					this.l_desc = null;
					this.d_desc = null;
					this.bl_desc = null;
					this.bl_count = new a.Buf16(N + 1);
					this.heap = new a.Buf16(2 * z + 1);
					ee(this.heap);
					this.heap_len = 0;
					this.heap_max = 0;
					this.depth = new a.Buf16(2 * z + 1);
					ee(this.depth);
					this.l_buf = 0;
					this.lit_bufsize = 0;
					this.last_lit = 0;
					this.d_buf = 0;
					this.opt_len = 0;
					this.static_len = 0;
					this.matches = 0;
					this.insert = 0;
					this.bi_buf = 0;
					this.bi_valid = 0
				}
				function ge(e) {
					var t;
					if (!e || !e.state) {
						return J(e, m)
					}
					e.total_in = e.total_out = 0;
					e.data_type = C;
					t = e.state;
					t.pending = 0;
					t.pending_out = 0;
					if (t.wrap < 0) {
						t.wrap = -t.wrap
					}
					t.status = t.wrap ? j : X;
					e.adler = t.wrap === 2 ? 0 : 1;
					t.last_flush = l;
					n._tr_init(t);
					return d
				}
				function be(e) {
					var t = ge(e);
					if (t === d) {
						me(e.state)
					}
					return t
				}
				function ye(e, t) {
					if (!e || !e.state) {
						return m
					}
					if (e.state.wrap !== 2) {
						return m
					}
					e.state.gzhead = t;
					return d
				}
				function we(e, t, r, n, i, s) {
					if (!e) {
						return m
					}
					var o = 1;
					if (t === b) {
						t = 6
					}
					if (n < 0) {
						o = 0;
						n = -n
					} else if (n > 15) {
						o = 2;
						n -= 16
					}
					if (i < 1 || i > A || r !== S || n < 8 || n > 15 || t < 0 || t > 9 || s < 0 || s > x) {
						return J(e, m)
					}
					if (n === 8) {
						n = 9
					}
					var l = new ve;
					e.state = l;
					l.strm = e;
					l.wrap = o;
					l.gzhead = null;
					l.w_bits = n;
					l.w_size = 1 << l.w_bits;
					l.w_mask = l.w_size - 1;
					l.hash_bits = i + 7;
					l.hash_size = 1 << l.hash_bits;
					l.hash_mask = l.hash_size - 1;
					l.hash_shift = ~~((l.hash_bits + L - 1) / L);
					l.window = new a.Buf8(l.w_size * 2);
					l.head = new a.Buf16(l.hash_size);
					l.prev = new a.Buf16(l.w_size);
					l.lit_bufsize = 1 << i + 6;
					l.pending_buf_size = l.lit_bufsize * 4;
					l.pending_buf = new a.Buf8(l.pending_buf_size);
					l.d_buf = l.lit_bufsize >> 1;
					l.l_buf = (1 + 2) * l.lit_bufsize;
					l.level = t;
					l.strategy = s;
					l.method = r;
					return be(e)
				}
				function ke(e, t) {
					return we(e, t, S, T, E, _)
				}
				function xe(e, t) {
					var r,
					a;
					var i,
					o;
					if (!e || !e.state || t > h || t < 0) {
						return e ? J(e, m) : m
					}
					a = e.state;
					if (!e.output || !e.input && e.avail_in !== 0 || a.status === V && t !== u) {
						return J(e, e.avail_out === 0 ? g : m)
					}
					a.strm = e;
					r = a.last_flush;
					a.last_flush = t;
					if (a.status === j) {
						if (a.wrap === 2) {
							e.adler = 0;
							ae(a, 31);
							ae(a, 139);
							ae(a, 8);
							if (!a.gzhead) {
								ae(a, 0);
								ae(a, 0);
								ae(a, 0);
								ae(a, 0);
								ae(a, 0);
								ae(a, a.level === 9 ? 2 : a.strategy >= w || a.level < 2 ? 4 : 0);
								ae(a, K);
								a.status = X
							} else {
								ae(a, (a.gzhead.text ? 1 : 0) + (a.gzhead.hcrc ? 2 : 0) + (!a.gzhead.extra ? 0 : 4) + (!a.gzhead.name ? 0 : 8) + (!a.gzhead.comment ? 0 : 16));
								ae(a, a.gzhead.time & 255);
								ae(a, a.gzhead.time >> 8 & 255);
								ae(a, a.gzhead.time >> 16 & 255);
								ae(a, a.gzhead.time >> 24 & 255);
								ae(a, a.level === 9 ? 2 : a.strategy >= w || a.level < 2 ? 4 : 0);
								ae(a, a.gzhead.os & 255);
								if (a.gzhead.extra && a.gzhead.extra.length) {
									ae(a, a.gzhead.extra.length & 255);
									ae(a, a.gzhead.extra.length >> 8 & 255)
								}
								if (a.gzhead.hcrc) {
									e.adler = s(e.adler, a.pending_buf, a.pending, 0)
								}
								a.gzindex = 0;
								a.status = W
							}
						} else {
							var v = S + (a.w_bits - 8 << 4) << 8;
							var b = -1;
							if (a.strategy >= w || a.level < 2) {
								b = 0
							} else if (a.level < 6) {
								b = 1
							} else if (a.level === 6) {
								b = 2
							} else {
								b = 3
							}
							v |= b << 6;
							if (a.strstart !== 0) {
								v |= P
							}
							v += 31 - v % 31;
							a.status = X;
							ne(a, v);
							if (a.strstart !== 0) {
								ne(a, e.adler >>> 16);
								ne(a, e.adler & 65535)
							}
							e.adler = 1
						}
					}
					if (a.status === W) {
						if (a.gzhead.extra) {
							i = a.pending;
							while (a.gzindex < (a.gzhead.extra.length & 65535)) {
								if (a.pending === a.pending_buf_size) {
									if (a.gzhead.hcrc && a.pending > i) {
										e.adler = s(e.adler, a.pending_buf, a.pending - i, i)
									}
									te(e);
									i = a.pending;
									if (a.pending === a.pending_buf_size) {
										break
									}
								}
								ae(a, a.gzhead.extra[a.gzindex] & 255);
								a.gzindex++
							}
							if (a.gzhead.hcrc && a.pending > i) {
								e.adler = s(e.adler, a.pending_buf, a.pending - i, i)
							}
							if (a.gzindex === a.gzhead.extra.length) {
								a.gzindex = 0;
								a.status = U
							}
						} else {
							a.status = U
						}
					}
					if (a.status === U) {
						if (a.gzhead.name) {
							i = a.pending;
							do {
								if (a.pending === a.pending_buf_size) {
									if (a.gzhead.hcrc && a.pending > i) {
										e.adler = s(e.adler, a.pending_buf, a.pending - i, i)
									}
									te(e);
									i = a.pending;
									if (a.pending === a.pending_buf_size) {
										o = 1;
										break
									}
								}
								if (a.gzindex < a.gzhead.name.length) {
									o = a.gzhead.name.charCodeAt(a.gzindex++) & 255
								} else {
									o = 0
								}
								ae(a, o)
							} while (o !== 0);
							if (a.gzhead.hcrc && a.pending > i) {
								e.adler = s(e.adler, a.pending_buf, a.pending - i, i)
							}
							if (o === 0) {
								a.gzindex = 0;
								a.status = $
							}
						} else {
							a.status = $
						}
					}
					if (a.status === $) {
						if (a.gzhead.comment) {
							i = a.pending;
							do {
								if (a.pending === a.pending_buf_size) {
									if (a.gzhead.hcrc && a.pending > i) {
										e.adler = s(e.adler, a.pending_buf, a.pending - i, i)
									}
									te(e);
									i = a.pending;
									if (a.pending === a.pending_buf_size) {
										o = 1;
										break
									}
								}
								if (a.gzindex < a.gzhead.comment.length) {
									o = a.gzhead.comment.charCodeAt(a.gzindex++) & 255
								} else {
									o = 0
								}
								ae(a, o)
							} while (o !== 0);
							if (a.gzhead.hcrc && a.pending > i) {
								e.adler = s(e.adler, a.pending_buf, a.pending - i, i)
							}
							if (o === 0) {
								a.status = H
							}
						} else {
							a.status = H
						}
					}
					if (a.status === H) {
						if (a.gzhead.hcrc) {
							if (a.pending + 2 > a.pending_buf_size) {
								te(e)
							}
							if (a.pending + 2 <= a.pending_buf_size) {
								ae(a, e.adler & 255);
								ae(a, e.adler >> 8 & 255);
								e.adler = 0;
								a.status = X
							}
						} else {
							a.status = X
						}
					}
					if (a.pending !== 0) {
						te(e);
						if (e.avail_out === 0) {
							a.last_flush = -1;
							return d
						}
					} else if (e.avail_in === 0 && Q(t) <= Q(r) && t !== u) {
						return J(e, g)
					}
					if (a.status === V && e.avail_in !== 0) {
						return J(e, g)
					}
					if (e.avail_in !== 0 || a.lookahead !== 0 || t !== l && a.status !== V) {
						var y = a.strategy === w ? he(a, t) : a.strategy === k ? ue(a, t) : pe[a.level].func(a, t);
						if (y === q || y === Y) {
							a.status = V
						}
						if (y === G || y === q) {
							if (e.avail_out === 0) {
								a.last_flush = -1
							}
							return d
						}
						if (y === Z) {
							if (t === c) {
								n._tr_align(a)
							} else if (t !== h) {
								n._tr_stored_block(a, 0, 0, false);
								if (t === f) {
									ee(a.head);
									if (a.lookahead === 0) {
										a.strstart = 0;
										a.block_start = 0;
										a.insert = 0
									}
								}
							}
							te(e);
							if (e.avail_out === 0) {
								a.last_flush = -1;
								return d
							}
						}
					}
					if (t !== u) {
						return d
					}
					if (a.wrap <= 0) {
						return p
					}
					if (a.wrap === 2) {
						ae(a, e.adler & 255);
						ae(a, e.adler >> 8 & 255);
						ae(a, e.adler >> 16 & 255);
						ae(a, e.adler >> 24 & 255);
						ae(a, e.total_in & 255);
						ae(a, e.total_in >> 8 & 255);
						ae(a, e.total_in >> 16 & 255);
						ae(a, e.total_in >> 24 & 255)
					} else {
						ne(a, e.adler >>> 16);
						ne(a, e.adler & 65535)
					}
					te(e);
					if (a.wrap > 0) {
						a.wrap = -a.wrap
					}
					return a.pending !== 0 ? d : p
				}
				function _e(e) {
					var t;
					if (!e || !e.state) {
						return m
					}
					t = e.state.status;
					if (t !== j && t !== W && t !== U && t !== $ && t !== H && t !== X && t !== V) {
						return J(e, m)
					}
					e.state = null;
					return t === X ? J(e, v) : d
				}
				r.deflateInit = ke;
				r.deflateInit2 = we;
				r.deflateReset = be;
				r.deflateResetKeep = ge;
				r.deflateSetHeader = ye;
				r.deflate = xe;
				r.deflateEnd = _e;
				r.deflateInfo = "pako deflate (from Nodeca project)"
			}, {
				"../utils/common": 27,
				"./adler32": 29,
				"./crc32": 31,
				"./messages": 37,
				"./trees": 38
			}
		],
		33: [function (e, t, r) {
				"use strict";
				function a() {
					this.text = 0;
					this.time = 0;
					this.xflags = 0;
					this.os = 0;
					this.extra = null;
					this.extra_len = 0;
					this.name = "";
					this.comment = "";
					this.hcrc = 0;
					this.done = false
				}
				t.exports = a
			}, {}
		],
		34: [function (e, t, r) {
				"use strict";
				var a = 30;
				var n = 12;
				t.exports = function i(e, t) {
					var r;
					var i;
					var s;
					var o;
					var l;
					var c;
					var f;
					var u;
					var h;
					var d;
					var p;
					var m;
					var v;
					var g;
					var b;
					var y;
					var w;
					var k;
					var x;
					var _;
					var C;
					var S;
					var A;
					var T,
					E;
					r = e.state;
					i = e.next_in;
					T = e.input;
					s = i + (e.avail_in - 5);
					o = e.next_out;
					E = e.output;
					l = o - (t - e.avail_out);
					c = o + (e.avail_out - 257);
					f = r.dmax;
					u = r.wsize;
					h = r.whave;
					d = r.wnext;
					p = r.window;
					m = r.hold;
					v = r.bits;
					g = r.lencode;
					b = r.distcode;
					y = (1 << r.lenbits) - 1;
					w = (1 << r.distbits) - 1;
					e: do {
						if (v < 15) {
							m += T[i++] << v;
							v += 8;
							m += T[i++] << v;
							v += 8
						}
						k = g[m & y];
						t: for (; ; ) {
							x = k >>> 24;
							m >>>= x;
							v -= x;
							x = k >>> 16 & 255;
							if (x === 0) {
								E[o++] = k & 65535
							} else if (x & 16) {
								_ = k & 65535;
								x &= 15;
								if (x) {
									if (v < x) {
										m += T[i++] << v;
										v += 8
									}
									_ += m & (1 << x) - 1;
									m >>>= x;
									v -= x
								}
								if (v < 15) {
									m += T[i++] << v;
									v += 8;
									m += T[i++] << v;
									v += 8
								}
								k = b[m & w];
								r: for (; ; ) {
									x = k >>> 24;
									m >>>= x;
									v -= x;
									x = k >>> 16 & 255;
									if (x & 16) {
										C = k & 65535;
										x &= 15;
										if (v < x) {
											m += T[i++] << v;
											v += 8;
											if (v < x) {
												m += T[i++] << v;
												v += 8
											}
										}
										C += m & (1 << x) - 1;
										if (C > f) {
											e.msg = "invalid distance too far back";
											r.mode = a;
											break e
										}
										m >>>= x;
										v -= x;
										x = o - l;
										if (C > x) {
											x = C - x;
											if (x > h) {
												if (r.sane) {
													e.msg = "invalid distance too far back";
													r.mode = a;
													break e
												}
											}
											S = 0;
											A = p;
											if (d === 0) {
												S += u - x;
												if (x < _) {
													_ -= x;
													do {
														E[o++] = p[S++]
													} while (--x);
													S = o - C;
													A = E
												}
											} else if (d < x) {
												S += u + d - x;
												x -= d;
												if (x < _) {
													_ -= x;
													do {
														E[o++] = p[S++]
													} while (--x);
													S = 0;
													if (d < _) {
														x = d;
														_ -= x;
														do {
															E[o++] = p[S++]
														} while (--x);
														S = o - C;
														A = E
													}
												}
											} else {
												S += d - x;
												if (x < _) {
													_ -= x;
													do {
														E[o++] = p[S++]
													} while (--x);
													S = o - C;
													A = E
												}
											}
											while (_ > 2) {
												E[o++] = A[S++];
												E[o++] = A[S++];
												E[o++] = A[S++];
												_ -= 3
											}
											if (_) {
												E[o++] = A[S++];
												if (_ > 1) {
													E[o++] = A[S++]
												}
											}
										} else {
											S = o - C;
											do {
												E[o++] = E[S++];
												E[o++] = E[S++];
												E[o++] = E[S++];
												_ -= 3
											} while (_ > 2);
											if (_) {
												E[o++] = E[S++];
												if (_ > 1) {
													E[o++] = E[S++]
												}
											}
										}
									} else if ((x & 64) === 0) {
										k = b[(k & 65535) + (m & (1 << x) - 1)];
										continue r
									} else {
										e.msg = "invalid distance code";
										r.mode = a;
										break e
									}
									break
								}
							} else if ((x & 64) === 0) {
								k = g[(k & 65535) + (m & (1 << x) - 1)];
								continue t
							} else if (x & 32) {
								r.mode = n;
								break e
							} else {
								e.msg = "invalid literal/length code";
								r.mode = a;
								break e
							}
							break
						}
					} while (i < s && o < c);
					_ = v >> 3;
					i -= _;
					v -= _ << 3;
					m &= (1 << v) - 1;
					e.next_in = i;
					e.next_out = o;
					e.avail_in = i < s ? 5 + (s - i) : 5 - (i - s);
					e.avail_out = o < c ? 257 + (c - o) : 257 - (o - c);
					r.hold = m;
					r.bits = v;
					return
				}
			}, {}
		],
		35: [function (e, t, r) {
				"use strict";
				var a = e("../utils/common");
				var n = e("./adler32");
				var i = e("./crc32");
				var s = e("./inffast");
				var o = e("./inftrees");
				var l = 0;
				var c = 1;
				var f = 2;
				var u = 4;
				var h = 5;
				var d = 6;
				var p = 0;
				var m = 1;
				var v = 2;
				var g = -2;
				var b = -3;
				var y = -4;
				var w = -5;
				var k = 8;
				var x = 1;
				var _ = 2;
				var C = 3;
				var S = 4;
				var A = 5;
				var T = 6;
				var E = 7;
				var F = 8;
				var D = 9;
				var z = 10;
				var O = 11;
				var R = 12;
				var I = 13;
				var N = 14;
				var L = 15;
				var B = 16;
				var M = 17;
				var P = 18;
				var j = 19;
				var W = 20;
				var U = 21;
				var $ = 22;
				var H = 23;
				var X = 24;
				var V = 25;
				var G = 26;
				var Z = 27;
				var q = 28;
				var Y = 29;
				var K = 30;
				var J = 31;
				var Q = 32;
				var ee = 852;
				var te = 592;
				var re = 15;
				var ae = re;
				function ne(e) {
					return (e >>> 24 & 255) + (e >>> 8 & 65280) + ((e & 65280) << 8) + ((e & 255) << 24)
				}
				function ie() {
					this.mode = 0;
					this.last = false;
					this.wrap = 0;
					this.havedict = false;
					this.flags = 0;
					this.dmax = 0;
					this.check = 0;
					this.total = 0;
					this.head = null;
					this.wbits = 0;
					this.wsize = 0;
					this.whave = 0;
					this.wnext = 0;
					this.window = null;
					this.hold = 0;
					this.bits = 0;
					this.length = 0;
					this.offset = 0;
					this.extra = 0;
					this.lencode = null;
					this.distcode = null;
					this.lenbits = 0;
					this.distbits = 0;
					this.ncode = 0;
					this.nlen = 0;
					this.ndist = 0;
					this.have = 0;
					this.next = null;
					this.lens = new a.Buf16(320);
					this.work = new a.Buf16(288);
					this.lendyn = null;
					this.distdyn = null;
					this.sane = 0;
					this.back = 0;
					this.was = 0
				}
				function se(e) {
					var t;
					if (!e || !e.state) {
						return g
					}
					t = e.state;
					e.total_in = e.total_out = t.total = 0;
					e.msg = "";
					if (t.wrap) {
						e.adler = t.wrap & 1
					}
					t.mode = x;
					t.last = 0;
					t.havedict = 0;
					t.dmax = 32768;
					t.head = null;
					t.hold = 0;
					t.bits = 0;
					t.lencode = t.lendyn = new a.Buf32(ee);
					t.distcode = t.distdyn = new a.Buf32(te);
					t.sane = 1;
					t.back = -1;
					return p
				}
				function oe(e) {
					var t;
					if (!e || !e.state) {
						return g
					}
					t = e.state;
					t.wsize = 0;
					t.whave = 0;
					t.wnext = 0;
					return se(e)
				}
				function le(e, t) {
					var r;
					var a;
					if (!e || !e.state) {
						return g
					}
					a = e.state;
					if (t < 0) {
						r = 0;
						t = -t
					} else {
						r = (t >> 4) + 1;
						if (t < 48) {
							t &= 15
						}
					}
					if (t && (t < 8 || t > 15)) {
						return g
					}
					if (a.window !== null && a.wbits !== t) {
						a.window = null
					}
					a.wrap = r;
					a.wbits = t;
					return oe(e)
				}
				function ce(e, t) {
					var r;
					var a;
					if (!e) {
						return g
					}
					a = new ie;
					e.state = a;
					a.window = null;
					r = le(e, t);
					if (r !== p) {
						e.state = null
					}
					return r
				}
				function fe(e) {
					return ce(e, ae)
				}
				var ue = true;
				var he,
				de;
				function pe(e) {
					if (ue) {
						var t;
						he = new a.Buf32(512);
						de = new a.Buf32(32);
						t = 0;
						while (t < 144) {
							e.lens[t++] = 8
						}
						while (t < 256) {
							e.lens[t++] = 9
						}
						while (t < 280) {
							e.lens[t++] = 7
						}
						while (t < 288) {
							e.lens[t++] = 8
						}
						o(c, e.lens, 0, 288, he, 0, e.work, {
							bits: 9
						});
						t = 0;
						while (t < 32) {
							e.lens[t++] = 5
						}
						o(f, e.lens, 0, 32, de, 0, e.work, {
							bits: 5
						});
						ue = false
					}
					e.lencode = he;
					e.lenbits = 9;
					e.distcode = de;
					e.distbits = 5
				}
				function me(e, t, r, n) {
					var i;
					var s = e.state;
					if (s.window === null) {
						s.wsize = 1 << s.wbits;
						s.wnext = 0;
						s.whave = 0;
						s.window = new a.Buf8(s.wsize)
					}
					if (n >= s.wsize) {
						a.arraySet(s.window, t, r - s.wsize, s.wsize, 0);
						s.wnext = 0;
						s.whave = s.wsize
					} else {
						i = s.wsize - s.wnext;
						if (i > n) {
							i = n
						}
						a.arraySet(s.window, t, r - n, i, s.wnext);
						n -= i;
						if (n) {
							a.arraySet(s.window, t, r - n, n, 0);
							s.wnext = n;
							s.whave = s.wsize
						} else {
							s.wnext += i;
							if (s.wnext === s.wsize) {
								s.wnext = 0
							}
							if (s.whave < s.wsize) {
								s.whave += i
							}
						}
					}
					return 0
				}
				function ve(e, t) {
					var r;
					var ee,
					te;
					var re;
					var ae;
					var ie,
					se;
					var oe;
					var le;
					var ce,
					fe;
					var ue;
					var he;
					var de;
					var ve = 0;
					var ge,
					be,
					ye;
					var we,
					ke,
					xe;
					var _e;
					var Ce;
					var Se = new a.Buf8(4);
					var Ae;
					var Te;
					var Ee = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
					if (!e || !e.state || !e.output || !e.input && e.avail_in !== 0) {
						return g
					}
					r = e.state;
					if (r.mode === R) {
						r.mode = I
					}
					ae = e.next_out;
					te = e.output;
					se = e.avail_out;
					re = e.next_in;
					ee = e.input;
					ie = e.avail_in;
					oe = r.hold;
					le = r.bits;
					ce = ie;
					fe = se;
					Ce = p;
					e: for (; ; ) {
						switch (r.mode) {
						case x:
							if (r.wrap === 0) {
								r.mode = I;
								break
							}
							while (le < 16) {
								if (ie === 0) {
									break e
								}
								ie--;
								oe += ee[re++] << le;
								le += 8
							}
							if (r.wrap & 2 && oe === 35615) {
								r.check = 0;
								Se[0] = oe & 255;
								Se[1] = oe >>> 8 & 255;
								r.check = i(r.check, Se, 2, 0);
								oe = 0;
								le = 0;
								r.mode = _;
								break
							}
							r.flags = 0;
							if (r.head) {
								r.head.done = false
							}
							if (!(r.wrap & 1) || (((oe & 255) << 8) + (oe >> 8)) % 31) {
								e.msg = "incorrect header check";
								r.mode = K;
								break
							}
							if ((oe & 15) !== k) {
								e.msg = "unknown compression method";
								r.mode = K;
								break
							}
							oe >>>= 4;
							le -= 4;
							_e = (oe & 15) + 8;
							if (r.wbits === 0) {
								r.wbits = _e
							} else if (_e > r.wbits) {
								e.msg = "invalid window size";
								r.mode = K;
								break
							}
							r.dmax = 1 << _e;
							e.adler = r.check = 1;
							r.mode = oe & 512 ? z : R;
							oe = 0;
							le = 0;
							break;
						case _:
							while (le < 16) {
								if (ie === 0) {
									break e
								}
								ie--;
								oe += ee[re++] << le;
								le += 8
							}
							r.flags = oe;
							if ((r.flags & 255) !== k) {
								e.msg = "unknown compression method";
								r.mode = K;
								break
							}
							if (r.flags & 57344) {
								e.msg = "unknown header flags set";
								r.mode = K;
								break
							}
							if (r.head) {
								r.head.text = oe >> 8 & 1
							}
							if (r.flags & 512) {
								Se[0] = oe & 255;
								Se[1] = oe >>> 8 & 255;
								r.check = i(r.check, Se, 2, 0)
							}
							oe = 0;
							le = 0;
							r.mode = C;
						case C:
							while (le < 32) {
								if (ie === 0) {
									break e
								}
								ie--;
								oe += ee[re++] << le;
								le += 8
							}
							if (r.head) {
								r.head.time = oe
							}
							if (r.flags & 512) {
								Se[0] = oe & 255;
								Se[1] = oe >>> 8 & 255;
								Se[2] = oe >>> 16 & 255;
								Se[3] = oe >>> 24 & 255;
								r.check = i(r.check, Se, 4, 0)
							}
							oe = 0;
							le = 0;
							r.mode = S;
						case S:
							while (le < 16) {
								if (ie === 0) {
									break e
								}
								ie--;
								oe += ee[re++] << le;
								le += 8
							}
							if (r.head) {
								r.head.xflags = oe & 255;
								r.head.os = oe >> 8
							}
							if (r.flags & 512) {
								Se[0] = oe & 255;
								Se[1] = oe >>> 8 & 255;
								r.check = i(r.check, Se, 2, 0)
							}
							oe = 0;
							le = 0;
							r.mode = A;
						case A:
							if (r.flags & 1024) {
								while (le < 16) {
									if (ie === 0) {
										break e
									}
									ie--;
									oe += ee[re++] << le;
									le += 8
								}
								r.length = oe;
								if (r.head) {
									r.head.extra_len = oe
								}
								if (r.flags & 512) {
									Se[0] = oe & 255;
									Se[1] = oe >>> 8 & 255;
									r.check = i(r.check, Se, 2, 0)
								}
								oe = 0;
								le = 0
							} else if (r.head) {
								r.head.extra = null
							}
							r.mode = T;
						case T:
							if (r.flags & 1024) {
								ue = r.length;
								if (ue > ie) {
									ue = ie
								}
								if (ue) {
									if (r.head) {
										_e = r.head.extra_len - r.length;
										if (!r.head.extra) {
											r.head.extra = new Array(r.head.extra_len)
										}
										a.arraySet(r.head.extra, ee, re, ue, _e)
									}
									if (r.flags & 512) {
										r.check = i(r.check, ee, ue, re)
									}
									ie -= ue;
									re += ue;
									r.length -= ue
								}
								if (r.length) {
									break e
								}
							}
							r.length = 0;
							r.mode = E;
						case E:
							if (r.flags & 2048) {
								if (ie === 0) {
									break e
								}
								ue = 0;
								do {
									_e = ee[re + ue++];
									if (r.head && _e && r.length < 65536) {
										r.head.name += String.fromCharCode(_e)
									}
								} while (_e && ue < ie);
								if (r.flags & 512) {
									r.check = i(r.check, ee, ue, re)
								}
								ie -= ue;
								re += ue;
								if (_e) {
									break e
								}
							} else if (r.head) {
								r.head.name = null
							}
							r.length = 0;
							r.mode = F;
						case F:
							if (r.flags & 4096) {
								if (ie === 0) {
									break e
								}
								ue = 0;
								do {
									_e = ee[re + ue++];
									if (r.head && _e && r.length < 65536) {
										r.head.comment += String.fromCharCode(_e)
									}
								} while (_e && ue < ie);
								if (r.flags & 512) {
									r.check = i(r.check, ee, ue, re)
								}
								ie -= ue;
								re += ue;
								if (_e) {
									break e
								}
							} else if (r.head) {
								r.head.comment = null
							}
							r.mode = D;
						case D:
							if (r.flags & 512) {
								while (le < 16) {
									if (ie === 0) {
										break e
									}
									ie--;
									oe += ee[re++] << le;
									le += 8
								}
								if (oe !== (r.check & 65535)) {
									e.msg = "header crc mismatch";
									r.mode = K;
									break
								}
								oe = 0;
								le = 0
							}
							if (r.head) {
								r.head.hcrc = r.flags >> 9 & 1;
								r.head.done = true
							}
							e.adler = r.check = 0;
							r.mode = R;
							break;
						case z:
							while (le < 32) {
								if (ie === 0) {
									break e
								}
								ie--;
								oe += ee[re++] << le;
								le += 8
							}
							e.adler = r.check = ne(oe);
							oe = 0;
							le = 0;
							r.mode = O;
						case O:
							if (r.havedict === 0) {
								e.next_out = ae;
								e.avail_out = se;
								e.next_in = re;
								e.avail_in = ie;
								r.hold = oe;
								r.bits = le;
								return v
							}
							e.adler = r.check = 1;
							r.mode = R;
						case R:
							if (t === h || t === d) {
								break e
							};
						case I:
							if (r.last) {
								oe >>>= le & 7;
								le -= le & 7;
								r.mode = Z;
								break
							}
							while (le < 3) {
								if (ie === 0) {
									break e
								}
								ie--;
								oe += ee[re++] << le;
								le += 8
							}
							r.last = oe & 1;
							oe >>>= 1;
							le -= 1;
							switch (oe & 3) {
							case 0:
								r.mode = N;
								break;
							case 1:
								pe(r);
								r.mode = W;
								if (t === d) {
									oe >>>= 2;
									le -= 2;
									break e
								}
								break;
							case 2:
								r.mode = M;
								break;
							case 3:
								e.msg = "invalid block type";
								r.mode = K;
							}
							oe >>>= 2;
							le -= 2;
							break;
						case N:
							oe >>>= le & 7;
							le -= le & 7;
							while (le < 32) {
								if (ie === 0) {
									break e
								}
								ie--;
								oe += ee[re++] << le;
								le += 8
							}
							if ((oe & 65535) !== (oe >>> 16 ^ 65535)) {
								e.msg = "invalid stored block lengths";
								r.mode = K;
								break
							}
							r.length = oe & 65535;
							oe = 0;
							le = 0;
							r.mode = L;
							if (t === d) {
								break e
							};
						case L:
							r.mode = B;
						case B:
							ue = r.length;
							if (ue) {
								if (ue > ie) {
									ue = ie
								}
								if (ue > se) {
									ue = se
								}
								if (ue === 0) {
									break e
								}
								a.arraySet(te, ee, re, ue, ae);
								ie -= ue;
								re += ue;
								se -= ue;
								ae += ue;
								r.length -= ue;
								break
							}
							r.mode = R;
							break;
						case M:
							while (le < 14) {
								if (ie === 0) {
									break e
								}
								ie--;
								oe += ee[re++] << le;
								le += 8
							}
							r.nlen = (oe & 31) + 257;
							oe >>>= 5;
							le -= 5;
							r.ndist = (oe & 31) + 1;
							oe >>>= 5;
							le -= 5;
							r.ncode = (oe & 15) + 4;
							oe >>>= 4;
							le -= 4;
							if (r.nlen > 286 || r.ndist > 30) {
								e.msg = "too many length or distance symbols";
								r.mode = K;
								break
							}
							r.have = 0;
							r.mode = P;
						case P:
							while (r.have < r.ncode) {
								while (le < 3) {
									if (ie === 0) {
										break e
									}
									ie--;
									oe += ee[re++] << le;
									le += 8
								}
								r.lens[Ee[r.have++]] = oe & 7;
								oe >>>= 3;
								le -= 3
							}
							while (r.have < 19) {
								r.lens[Ee[r.have++]] = 0
							}
							r.lencode = r.lendyn;
							r.lenbits = 7;
							Ae = {
								bits: r.lenbits
							};
							Ce = o(l, r.lens, 0, 19, r.lencode, 0, r.work, Ae);
							r.lenbits = Ae.bits;
							if (Ce) {
								e.msg = "invalid code lengths set";
								r.mode = K;
								break
							}
							r.have = 0;
							r.mode = j;
						case j:
							while (r.have < r.nlen + r.ndist) {
								for (; ; ) {
									ve = r.lencode[oe & (1 << r.lenbits) - 1];
									ge = ve >>> 24;
									be = ve >>> 16 & 255;
									ye = ve & 65535;
									if (ge <= le) {
										break
									}
									if (ie === 0) {
										break e
									}
									ie--;
									oe += ee[re++] << le;
									le += 8
								}
								if (ye < 16) {
									oe >>>= ge;
									le -= ge;
									r.lens[r.have++] = ye
								} else {
									if (ye === 16) {
										Te = ge + 2;
										while (le < Te) {
											if (ie === 0) {
												break e
											}
											ie--;
											oe += ee[re++] << le;
											le += 8
										}
										oe >>>= ge;
										le -= ge;
										if (r.have === 0) {
											e.msg = "invalid bit length repeat";
											r.mode = K;
											break
										}
										_e = r.lens[r.have - 1];
										ue = 3 + (oe & 3);
										oe >>>= 2;
										le -= 2
									} else if (ye === 17) {
										Te = ge + 3;
										while (le < Te) {
											if (ie === 0) {
												break e
											}
											ie--;
											oe += ee[re++] << le;
											le += 8
										}
										oe >>>= ge;
										le -= ge;
										_e = 0;
										ue = 3 + (oe & 7);
										oe >>>= 3;
										le -= 3
									} else {
										Te = ge + 7;
										while (le < Te) {
											if (ie === 0) {
												break e
											}
											ie--;
											oe += ee[re++] << le;
											le += 8
										}
										oe >>>= ge;
										le -= ge;
										_e = 0;
										ue = 11 + (oe & 127);
										oe >>>= 7;
										le -= 7
									}
									if (r.have + ue > r.nlen + r.ndist) {
										e.msg = "invalid bit length repeat";
										r.mode = K;
										break
									}
									while (ue--) {
										r.lens[r.have++] = _e
									}
								}
							}
							if (r.mode === K) {
								break
							}
							if (r.lens[256] === 0) {
								e.msg = "invalid code -- missing end-of-block";
								r.mode = K;
								break
							}
							r.lenbits = 9;
							Ae = {
								bits: r.lenbits
							};
							Ce = o(c, r.lens, 0, r.nlen, r.lencode, 0, r.work, Ae);
							r.lenbits = Ae.bits;
							if (Ce) {
								e.msg = "invalid literal/lengths set";
								r.mode = K;
								break
							}
							r.distbits = 6;
							r.distcode = r.distdyn;
							Ae = {
								bits: r.distbits
							};
							Ce = o(f, r.lens, r.nlen, r.ndist, r.distcode, 0, r.work, Ae);
							r.distbits = Ae.bits;
							if (Ce) {
								e.msg = "invalid distances set";
								r.mode = K;
								break
							}
							r.mode = W;
							if (t === d) {
								break e
							};
						case W:
							r.mode = U;
						case U:
							if (ie >= 6 && se >= 258) {
								e.next_out = ae;
								e.avail_out = se;
								e.next_in = re;
								e.avail_in = ie;
								r.hold = oe;
								r.bits = le;
								s(e, fe);
								ae = e.next_out;
								te = e.output;
								se = e.avail_out;
								re = e.next_in;
								ee = e.input;
								ie = e.avail_in;
								oe = r.hold;
								le = r.bits;
								if (r.mode === R) {
									r.back = -1
								}
								break
							}
							r.back = 0;
							for (; ; ) {
								ve = r.lencode[oe & (1 << r.lenbits) - 1];
								ge = ve >>> 24;
								be = ve >>> 16 & 255;
								ye = ve & 65535;
								if (ge <= le) {
									break
								}
								if (ie === 0) {
									break e
								}
								ie--;
								oe += ee[re++] << le;
								le += 8
							}
							if (be && (be & 240) === 0) {
								we = ge;
								ke = be;
								xe = ye;
								for (; ; ) {
									ve = r.lencode[xe + ((oe & (1 << we + ke) - 1) >> we)];
									ge = ve >>> 24;
									be = ve >>> 16 & 255;
									ye = ve & 65535;
									if (we + ge <= le) {
										break
									}
									if (ie === 0) {
										break e
									}
									ie--;
									oe += ee[re++] << le;
									le += 8
								}
								oe >>>= we;
								le -= we;
								r.back += we
							}
							oe >>>= ge;
							le -= ge;
							r.back += ge;
							r.length = ye;
							if (be === 0) {
								r.mode = G;
								break
							}
							if (be & 32) {
								r.back = -1;
								r.mode = R;
								break
							}
							if (be & 64) {
								e.msg = "invalid literal/length code";
								r.mode = K;
								break
							}
							r.extra = be & 15;
							r.mode = $;
						case $:
							if (r.extra) {
								Te = r.extra;
								while (le < Te) {
									if (ie === 0) {
										break e
									}
									ie--;
									oe += ee[re++] << le;
									le += 8
								}
								r.length += oe & (1 << r.extra) - 1;
								oe >>>= r.extra;
								le -= r.extra;
								r.back += r.extra
							}
							r.was = r.length;
							r.mode = H;
						case H:
							for (; ; ) {
								ve = r.distcode[oe & (1 << r.distbits) - 1];
								ge = ve >>> 24;
								be = ve >>> 16 & 255;
								ye = ve & 65535;
								if (ge <= le) {
									break
								}
								if (ie === 0) {
									break e
								}
								ie--;
								oe += ee[re++] << le;
								le += 8
							}
							if ((be & 240) === 0) {
								we = ge;
								ke = be;
								xe = ye;
								for (; ; ) {
									ve = r.distcode[xe + ((oe & (1 << we + ke) - 1) >> we)];
									ge = ve >>> 24;
									be = ve >>> 16 & 255;
									ye = ve & 65535;
									if (we + ge <= le) {
										break
									}
									if (ie === 0) {
										break e
									}
									ie--;
									oe += ee[re++] << le;
									le += 8
								}
								oe >>>= we;
								le -= we;
								r.back += we
							}
							oe >>>= ge;
							le -= ge;
							r.back += ge;
							if (be & 64) {
								e.msg = "invalid distance code";
								r.mode = K;
								break
							}
							r.offset = ye;
							r.extra = be & 15;
							r.mode = X;
						case X:
							if (r.extra) {
								Te = r.extra;
								while (le < Te) {
									if (ie === 0) {
										break e
									}
									ie--;
									oe += ee[re++] << le;
									le += 8
								}
								r.offset += oe & (1 << r.extra) - 1;
								oe >>>= r.extra;
								le -= r.extra;
								r.back += r.extra
							}
							if (r.offset > r.dmax) {
								e.msg = "invalid distance too far back";
								r.mode = K;
								break
							}
							r.mode = V;
						case V:
							if (se === 0) {
								break e
							}
							ue = fe - se;
							if (r.offset > ue) {
								ue = r.offset - ue;
								if (ue > r.whave) {
									if (r.sane) {
										e.msg = "invalid distance too far back";
										r.mode = K;
										break
									}
								}
								if (ue > r.wnext) {
									ue -= r.wnext;
									he = r.wsize - ue
								} else {
									he = r.wnext - ue
								}
								if (ue > r.length) {
									ue = r.length
								}
								de = r.window
							} else {
								de = te;
								he = ae - r.offset;
								ue = r.length
							}
							if (ue > se) {
								ue = se
							}
							se -= ue;
							r.length -= ue;
							do {
								te[ae++] = de[he++]
							} while (--ue);
							if (r.length === 0) {
								r.mode = U
							}
							break;
						case G:
							if (se === 0) {
								break e
							}
							te[ae++] = r.length;
							se--;
							r.mode = U;
							break;
						case Z:
							if (r.wrap) {
								while (le < 32) {
									if (ie === 0) {
										break e
									}
									ie--;
									oe |= ee[re++] << le;
									le += 8
								}
								fe -= se;
								e.total_out += fe;
								r.total += fe;
								if (fe) {
									e.adler = r.check = r.flags ? i(r.check, te, fe, ae - fe) : n(r.check, te, fe, ae - fe)
								}
								fe = se;
								if ((r.flags ? oe : ne(oe)) !== r.check) {
									e.msg = "incorrect data check";
									r.mode = K;
									break
								}
								oe = 0;
								le = 0
							}
							r.mode = q;
						case q:
							if (r.wrap && r.flags) {
								while (le < 32) {
									if (ie === 0) {
										break e
									}
									ie--;
									oe += ee[re++] << le;
									le += 8
								}
								if (oe !== (r.total & 4294967295)) {
									e.msg = "incorrect length check";
									r.mode = K;
									break
								}
								oe = 0;
								le = 0
							}
							r.mode = Y;
						case Y:
							Ce = m;
							break e;
						case K:
							Ce = b;
							break e;
						case J:
							return y;
						case Q: ;
						default:
							return g;
						}
					}
					e.next_out = ae;
					e.avail_out = se;
					e.next_in = re;
					e.avail_in = ie;
					r.hold = oe;
					r.bits = le;
					if (r.wsize || fe !== e.avail_out && r.mode < K && (r.mode < Z || t !== u)) {
						if (me(e, e.output, e.next_out, fe - e.avail_out)) {
							r.mode = J;
							return y
						}
					}
					ce -= e.avail_in;
					fe -= e.avail_out;
					e.total_in += ce;
					e.total_out += fe;
					r.total += fe;
					if (r.wrap && fe) {
						e.adler = r.check = r.flags ? i(r.check, te, fe, e.next_out - fe) : n(r.check, te, fe, e.next_out - fe)
					}
					e.data_type = r.bits + (r.last ? 64 : 0) + (r.mode === R ? 128 : 0) + (r.mode === W || r.mode === L ? 256 : 0);
					if ((ce === 0 && fe === 0 || t === u) && Ce === p) {
						Ce = w
					}
					return Ce
				}
				function ge(e) {
					if (!e || !e.state) {
						return g
					}
					var t = e.state;
					if (t.window) {
						t.window = null
					}
					e.state = null;
					return p
				}
				function be(e, t) {
					var r;
					if (!e || !e.state) {
						return g
					}
					r = e.state;
					if ((r.wrap & 2) === 0) {
						return g
					}
					r.head = t;
					t.done = false;
					return p
				}
				r.inflateReset = oe;
				r.inflateReset2 = le;
				r.inflateResetKeep = se;
				r.inflateInit = fe;
				r.inflateInit2 = ce;
				r.inflate = ve;
				r.inflateEnd = ge;
				r.inflateGetHeader = be;
				r.inflateInfo = "pako inflate (from Nodeca project)"
			}, {
				"../utils/common": 27,
				"./adler32": 29,
				"./crc32": 31,
				"./inffast": 34,
				"./inftrees": 36
			}
		],
		36: [function (e, t, r) {
				"use strict";
				var a = e("../utils/common");
				var n = 15;
				var i = 852;
				var s = 592;
				var o = 0;
				var l = 1;
				var c = 2;
				var f = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0];
				var u = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78];
				var h = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0];
				var d = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
				t.exports = function p(e, t, r, m, v, g, b, y) {
					var w = y.bits;
					var k = 0;
					var x = 0;
					var _ = 0,
					C = 0;
					var S = 0;
					var A = 0;
					var T = 0;
					var E = 0;
					var F = 0;
					var D = 0;
					var z;
					var O;
					var R;
					var I;
					var N;
					var L = null;
					var B = 0;
					var M;
					var P = new a.Buf16(n + 1);
					var j = new a.Buf16(n + 1);
					var W = null;
					var U = 0;
					var $,
					H,
					X;
					for (k = 0; k <= n; k++) {
						P[k] = 0
					}
					for (x = 0; x < m; x++) {
						P[t[r + x]]++
					}
					S = w;
					for (C = n; C >= 1; C--) {
						if (P[C] !== 0) {
							break
						}
					}
					if (S > C) {
						S = C
					}
					if (C === 0) {
						v[g++] = 1 << 24 | 64 << 16 | 0;
						v[g++] = 1 << 24 | 64 << 16 | 0;
						y.bits = 1;
						return 0
					}
					for (_ = 1; _ < C; _++) {
						if (P[_] !== 0) {
							break
						}
					}
					if (S < _) {
						S = _
					}
					E = 1;
					for (k = 1; k <= n; k++) {
						E <<= 1;
						E -= P[k];
						if (E < 0) {
							return -1
						}
					}
					if (E > 0 && (e === o || C !== 1)) {
						return -1
					}
					j[1] = 0;
					for (k = 1; k < n; k++) {
						j[k + 1] = j[k] + P[k]
					}
					for (x = 0; x < m; x++) {
						if (t[r + x] !== 0) {
							b[j[t[r + x]]++] = x
						}
					}
					if (e === o) {
						L = W = b;
						M = 19
					} else if (e === l) {
						L = f;
						B -= 257;
						W = u;
						U -= 257;
						M = 256
					} else {
						L = h;
						W = d;
						M = -1
					}
					D = 0;
					x = 0;
					k = _;
					N = g;
					A = S;
					T = 0;
					R = -1;
					F = 1 << S;
					I = F - 1;
					if (e === l && F > i || e === c && F > s) {
						return 1
					}
					var V = 0;
					for (; ; ) {
						V++;
						$ = k - T;
						if (b[x] < M) {
							H = 0;
							X = b[x]
						} else if (b[x] > M) {
							H = W[U + b[x]];
							X = L[B + b[x]]
						} else {
							H = 32 + 64;
							X = 0
						}
						z = 1 << k - T;
						O = 1 << A;
						_ = O;
						do {
							O -= z;
							v[N + (D >> T) + O] = $ << 24 | H << 16 | X | 0
						} while (O !== 0);
						z = 1 << k - 1;
						while (D & z) {
							z >>= 1
						}
						if (z !== 0) {
							D &= z - 1;
							D += z
						} else {
							D = 0
						}
						x++;
						if (--P[k] === 0) {
							if (k === C) {
								break
							}
							k = t[r + b[x]]
						}
						if (k > S && (D & I) !== R) {
							if (T === 0) {
								T = S
							}
							N += _;
							A = k - T;
							E = 1 << A;
							while (A + T < C) {
								E -= P[A + T];
								if (E <= 0) {
									break
								}
								A++;
								E <<= 1
							}
							F += 1 << A;
							if (e === l && F > i || e === c && F > s) {
								return 1
							}
							R = D & I;
							v[R] = S << 24 | A << 16 | N - g | 0
						}
					}
					if (D !== 0) {
						v[N + D] = k - T << 24 | 64 << 16 | 0
					}
					y.bits = S;
					return 0
				}
			}, {
				"../utils/common": 27
			}
		],
		37: [function (e, t, r) {
				"use strict";
				t.exports = {
					2: "need dictionary",
					1: "stream end",
					0: "",
					"-1": "file error",
					"-2": "stream error",
					"-3": "data error",
					"-4": "insufficient memory",
					"-5": "buffer error",
					"-6": "incompatible version"
				}
			}, {}
		],
		38: [function (e, t, r) {
				"use strict";
				var a = e("../utils/common");
				var n = 4;
				var i = 0;
				var s = 1;
				var o = 2;
				function l(e) {
					var t = e.length;
					while (--t >= 0) {
						e[t] = 0
					}
				}
				var c = 0;
				var f = 1;
				var u = 2;
				var h = 3;
				var d = 258;
				var p = 29;
				var m = 256;
				var v = m + 1 + p;
				var g = 30;
				var b = 19;
				var y = 2 * v + 1;
				var w = 15;
				var k = 16;
				var x = 7;
				var _ = 256;
				var C = 16;
				var S = 17;
				var A = 18;
				var T = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];
				var E = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
				var F = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7];
				var D = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
				var z = 512;
				var O = new Array((v + 2) * 2);
				l(O);
				var R = new Array(g * 2);
				l(R);
				var I = new Array(z);
				l(I);
				var N = new Array(d - h + 1);
				l(N);
				var L = new Array(p);
				l(L);
				var B = new Array(g);
				l(B);
				var M = function (e, t, r, a, n) {
					this.static_tree = e;
					this.extra_bits = t;
					this.extra_base = r;
					this.elems = a;
					this.max_length = n;
					this.has_stree = e && e.length
				};
				var P;
				var j;
				var W;
				var U = function (e, t) {
					this.dyn_tree = e;
					this.max_code = 0;
					this.stat_desc = t
				};
				function $(e) {
					return e < 256 ? I[e] : I[256 + (e >>> 7)]
				}
				function H(e, t) {
					e.pending_buf[e.pending++] = t & 255;
					e.pending_buf[e.pending++] = t >>> 8 & 255
				}
				function X(e, t, r) {
					if (e.bi_valid > k - r) {
						e.bi_buf |= t << e.bi_valid & 65535;
						H(e, e.bi_buf);
						e.bi_buf = t >> k - e.bi_valid;
						e.bi_valid += r - k
					} else {
						e.bi_buf |= t << e.bi_valid & 65535;
						e.bi_valid += r
					}
				}
				function V(e, t, r) {
					X(e, r[t * 2], r[t * 2 + 1])
				}
				function G(e, t) {
					var r = 0;
					do {
						r |= e & 1;
						e >>>= 1;
						r <<= 1
					} while (--t > 0);
					return r >>> 1
				}
				function Z(e) {
					if (e.bi_valid === 16) {
						H(e, e.bi_buf);
						e.bi_buf = 0;
						e.bi_valid = 0
					} else if (e.bi_valid >= 8) {
						e.pending_buf[e.pending++] = e.bi_buf & 255;
						e.bi_buf >>= 8;
						e.bi_valid -= 8
					}
				}
				function q(e, t) {
					var r = t.dyn_tree;
					var a = t.max_code;
					var n = t.stat_desc.static_tree;
					var i = t.stat_desc.has_stree;
					var s = t.stat_desc.extra_bits;
					var o = t.stat_desc.extra_base;
					var l = t.stat_desc.max_length;
					var c;
					var f,
					u;
					var h;
					var d;
					var p;
					var m = 0;
					for (h = 0; h <= w; h++) {
						e.bl_count[h] = 0
					}
					r[e.heap[e.heap_max] * 2 + 1] = 0;
					for (c = e.heap_max + 1; c < y; c++) {
						f = e.heap[c];
						h = r[r[f * 2 + 1] * 2 + 1] + 1;
						if (h > l) {
							h = l;
							m++
						}
						r[f * 2 + 1] = h;
						if (f > a) {
							continue
						}
						e.bl_count[h]++;
						d = 0;
						if (f >= o) {
							d = s[f - o]
						}
						p = r[f * 2];
						e.opt_len += p * (h + d);
						if (i) {
							e.static_len += p * (n[f * 2 + 1] + d)
						}
					}
					if (m === 0) {
						return
					}
					do {
						h = l - 1;
						while (e.bl_count[h] === 0) {
							h--
						}
						e.bl_count[h]--;
						e.bl_count[h + 1] += 2;
						e.bl_count[l]--;
						m -= 2
					} while (m > 0);
					for (h = l; h !== 0; h--) {
						f = e.bl_count[h];
						while (f !== 0) {
							u = e.heap[--c];
							if (u > a) {
								continue
							}
							if (r[u * 2 + 1] !== h) {
								e.opt_len += (h - r[u * 2 + 1]) * r[u * 2];
								r[u * 2 + 1] = h
							}
							f--
						}
					}
				}
				function Y(e, t, r) {
					var a = new Array(w + 1);
					var n = 0;
					var i;
					var s;
					for (i = 1; i <= w; i++) {
						a[i] = n = n + r[i - 1] << 1
					}
					for (s = 0; s <= t; s++) {
						var o = e[s * 2 + 1];
						if (o === 0) {
							continue
						}
						e[s * 2] = G(a[o]++, o)
					}
				}
				function K() {
					var e;
					var t;
					var r;
					var a;
					var n;
					var i = new Array(w + 1);
					r = 0;
					for (a = 0; a < p - 1; a++) {
						L[a] = r;
						for (e = 0; e < 1 << T[a]; e++) {
							N[r++] = a
						}
					}
					N[r - 1] = a;
					n = 0;
					for (a = 0; a < 16; a++) {
						B[a] = n;
						for (e = 0; e < 1 << E[a]; e++) {
							I[n++] = a
						}
					}
					n >>= 7;
					for (; a < g; a++) {
						B[a] = n << 7;
						for (e = 0; e < 1 << E[a] - 7; e++) {
							I[256 + n++] = a
						}
					}
					for (t = 0; t <= w; t++) {
						i[t] = 0
					}
					e = 0;
					while (e <= 143) {
						O[e * 2 + 1] = 8;
						e++;
						i[8]++
					}
					while (e <= 255) {
						O[e * 2 + 1] = 9;
						e++;
						i[9]++
					}
					while (e <= 279) {
						O[e * 2 + 1] = 7;
						e++;
						i[7]++
					}
					while (e <= 287) {
						O[e * 2 + 1] = 8;
						e++;
						i[8]++
					}
					Y(O, v + 1, i);
					for (e = 0; e < g; e++) {
						R[e * 2 + 1] = 5;
						R[e * 2] = G(e, 5)
					}
					P = new M(O, T, m + 1, v, w);
					j = new M(R, E, 0, g, w);
					W = new M(new Array(0), F, 0, b, x)
				}
				function J(e) {
					var t;
					for (t = 0; t < v; t++) {
						e.dyn_ltree[t * 2] = 0
					}
					for (t = 0; t < g; t++) {
						e.dyn_dtree[t * 2] = 0
					}
					for (t = 0; t < b; t++) {
						e.bl_tree[t * 2] = 0
					}
					e.dyn_ltree[_ * 2] = 1;
					e.opt_len = e.static_len = 0;
					e.last_lit = e.matches = 0
				}
				function Q(e) {
					if (e.bi_valid > 8) {
						H(e, e.bi_buf)
					} else if (e.bi_valid > 0) {
						e.pending_buf[e.pending++] = e.bi_buf
					}
					e.bi_buf = 0;
					e.bi_valid = 0
				}
				function ee(e, t, r, n) {
					Q(e);
					if (n) {
						H(e, r);
						H(e, ~r)
					}
					a.arraySet(e.pending_buf, e.window, t, r, e.pending);
					e.pending += r
				}
				function te(e, t, r, a) {
					var n = t * 2;
					var i = r * 2;
					return e[n] < e[i] || e[n] === e[i] && a[t] <= a[r]
				}
				function re(e, t, r) {
					var a = e.heap[r];
					var n = r << 1;
					while (n <= e.heap_len) {
						if (n < e.heap_len && te(t, e.heap[n + 1], e.heap[n], e.depth)) {
							n++
						}
						if (te(t, a, e.heap[n], e.depth)) {
							break
						}
						e.heap[r] = e.heap[n];
						r = n;
						n <<= 1
					}
					e.heap[r] = a
				}
				function ae(e, t, r) {
					var a;
					var n;
					var i = 0;
					var s;
					var o;
					if (e.last_lit !== 0) {
						do {
							a = e.pending_buf[e.d_buf + i * 2] << 8 | e.pending_buf[e.d_buf + i * 2 + 1];
							n = e.pending_buf[e.l_buf + i];
							i++;
							if (a === 0) {
								V(e, n, t)
							} else {
								s = N[n];
								V(e, s + m + 1, t);
								o = T[s];
								if (o !== 0) {
									n -= L[s];
									X(e, n, o)
								}
								a--;
								s = $(a);
								V(e, s, r);
								o = E[s];
								if (o !== 0) {
									a -= B[s];
									X(e, a, o)
								}
							}
						} while (i < e.last_lit)
					}
					V(e, _, t)
				}
				function ne(e, t) {
					var r = t.dyn_tree;
					var a = t.stat_desc.static_tree;
					var n = t.stat_desc.has_stree;
					var i = t.stat_desc.elems;
					var s,
					o;
					var l = -1;
					var c;
					e.heap_len = 0;
					e.heap_max = y;
					for (s = 0; s < i; s++) {
						if (r[s * 2] !== 0) {
							e.heap[++e.heap_len] = l = s;
							e.depth[s] = 0
						} else {
							r[s * 2 + 1] = 0
						}
					}
					while (e.heap_len < 2) {
						c = e.heap[++e.heap_len] = l < 2 ? ++l : 0;
						r[c * 2] = 1;
						e.depth[c] = 0;
						e.opt_len--;
						if (n) {
							e.static_len -= a[c * 2 + 1]
						}
					}
					t.max_code = l;
					for (s = e.heap_len >> 1; s >= 1; s--) {
						re(e, r, s)
					}
					c = i;
					do {
						s = e.heap[1];
						e.heap[1] = e.heap[e.heap_len--];
						re(e, r, 1);
						o = e.heap[1];
						e.heap[--e.heap_max] = s;
						e.heap[--e.heap_max] = o;
						r[c * 2] = r[s * 2] + r[o * 2];
						e.depth[c] = (e.depth[s] >= e.depth[o] ? e.depth[s] : e.depth[o]) + 1;
						r[s * 2 + 1] = r[o * 2 + 1] = c;
						e.heap[1] = c++;
						re(e, r, 1)
					} while (e.heap_len >= 2);
					e.heap[--e.heap_max] = e.heap[1];
					q(e, t);
					Y(r, l, e.bl_count)
				}
				function ie(e, t, r) {
					var a;
					var n = -1;
					var i;
					var s = t[0 * 2 + 1];
					var o = 0;
					var l = 7;
					var c = 4;
					if (s === 0) {
						l = 138;
						c = 3
					}
					t[(r + 1) * 2 + 1] = 65535;
					for (a = 0; a <= r; a++) {
						i = s;
						s = t[(a + 1) * 2 + 1];
						if (++o < l && i === s) {
							continue
						} else if (o < c) {
							e.bl_tree[i * 2] += o
						} else if (i !== 0) {
							if (i !== n) {
								e.bl_tree[i * 2]++
							}
							e.bl_tree[C * 2]++
						} else if (o <= 10) {
							e.bl_tree[S * 2]++
						} else {
							e.bl_tree[A * 2]++
						}
						o = 0;
						n = i;
						if (s === 0) {
							l = 138;
							c = 3
						} else if (i === s) {
							l = 6;
							c = 3
						} else {
							l = 7;
							c = 4
						}
					}
				}
				function se(e, t, r) {
					var a;
					var n = -1;
					var i;
					var s = t[0 * 2 + 1];
					var o = 0;
					var l = 7;
					var c = 4;
					if (s === 0) {
						l = 138;
						c = 3
					}
					for (a = 0; a <= r; a++) {
						i = s;
						s = t[(a + 1) * 2 + 1];
						if (++o < l && i === s) {
							continue
						} else if (o < c) {
							do {
								V(e, i, e.bl_tree)
							} while (--o !== 0)
						} else if (i !== 0) {
							if (i !== n) {
								V(e, i, e.bl_tree);
								o--
							}
							V(e, C, e.bl_tree);
							X(e, o - 3, 2)
						} else if (o <= 10) {
							V(e, S, e.bl_tree);
							X(e, o - 3, 3)
						} else {
							V(e, A, e.bl_tree);
							X(e, o - 11, 7)
						}
						o = 0;
						n = i;
						if (s === 0) {
							l = 138;
							c = 3
						} else if (i === s) {
							l = 6;
							c = 3
						} else {
							l = 7;
							c = 4
						}
					}
				}
				function oe(e) {
					var t;
					ie(e, e.dyn_ltree, e.l_desc.max_code);
					ie(e, e.dyn_dtree, e.d_desc.max_code);
					ne(e, e.bl_desc);
					for (t = b - 1; t >= 3; t--) {
						if (e.bl_tree[D[t] * 2 + 1] !== 0) {
							break
						}
					}
					e.opt_len += 3 * (t + 1) + 5 + 5 + 4;
					return t
				}
				function le(e, t, r, a) {
					var n;
					X(e, t - 257, 5);
					X(e, r - 1, 5);
					X(e, a - 4, 4);
					for (n = 0; n < a; n++) {
						X(e, e.bl_tree[D[n] * 2 + 1], 3)
					}
					se(e, e.dyn_ltree, t - 1);
					se(e, e.dyn_dtree, r - 1)
				}
				function ce(e) {
					var t = 4093624447;
					var r;
					for (r = 0; r <= 31; r++, t >>>= 1) {
						if (t & 1 && e.dyn_ltree[r * 2] !== 0) {
							return i
						}
					}
					if (e.dyn_ltree[9 * 2] !== 0 || e.dyn_ltree[10 * 2] !== 0 || e.dyn_ltree[13 * 2] !== 0) {
						return s
					}
					for (r = 32; r < m; r++) {
						if (e.dyn_ltree[r * 2] !== 0) {
							return s
						}
					}
					return i
				}
				var fe = false;
				function ue(e) {
					if (!fe) {
						K();
						fe = true
					}
					e.l_desc = new U(e.dyn_ltree, P);
					e.d_desc = new U(e.dyn_dtree, j);
					e.bl_desc = new U(e.bl_tree, W);
					e.bi_buf = 0;
					e.bi_valid = 0;
					J(e)
				}
				function he(e, t, r, a) {
					X(e, (c << 1) + (a ? 1 : 0), 3);
					ee(e, t, r, true)
				}
				function de(e) {
					X(e, f << 1, 3);
					V(e, _, O);
					Z(e)
				}
				function pe(e, t, r, a) {
					var i,
					s;
					var l = 0;
					if (e.level > 0) {
						if (e.strm.data_type === o) {
							e.strm.data_type = ce(e)
						}
						ne(e, e.l_desc);
						ne(e, e.d_desc);
						l = oe(e);
						i = e.opt_len + 3 + 7 >>> 3;
						s = e.static_len + 3 + 7 >>> 3;
						if (s <= i) {
							i = s
						}
					} else {
						i = s = r + 5
					}
					if (r + 4 <= i && t !== -1) {
						he(e, t, r, a)
					} else if (e.strategy === n || s === i) {
						X(e, (f << 1) + (a ? 1 : 0), 3);
						ae(e, O, R)
					} else {
						X(e, (u << 1) + (a ? 1 : 0), 3);
						le(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, l + 1);
						ae(e, e.dyn_ltree, e.dyn_dtree)
					}
					J(e);
					if (a) {
						Q(e)
					}
				}
				function me(e, t, r) {
					e.pending_buf[e.d_buf + e.last_lit * 2] = t >>> 8 & 255;
					e.pending_buf[e.d_buf + e.last_lit * 2 + 1] = t & 255;
					e.pending_buf[e.l_buf + e.last_lit] = r & 255;
					e.last_lit++;
					if (t === 0) {
						e.dyn_ltree[r * 2]++
					} else {
						e.matches++;
						t--;
						e.dyn_ltree[(N[r] + m + 1) * 2]++;
						e.dyn_dtree[$(t) * 2]++
					}
					return e.last_lit === e.lit_bufsize - 1
				}
				r._tr_init = ue;
				r._tr_stored_block = he;
				r._tr_flush_block = pe;
				r._tr_tally = me;
				r._tr_align = de
			}, {
				"../utils/common": 27
			}
		],
		39: [function (e, t, r) {
				"use strict";
				function a() {
					this.input = null;
					this.next_in = 0;
					this.avail_in = 0;
					this.total_in = 0;
					this.output = null;
					this.next_out = 0;
					this.avail_out = 0;
					this.total_out = 0;
					this.msg = "";
					this.state = null;
					this.data_type = 2;
					this.adler = 0
				}
				t.exports = a
			}, {}
		]
	}, {}, [9])(9)
});
var XLSX = {};
window.XLSX = XLSX;				   
function make_xlsx_lib(e) {
	e.version = "1.20210201.1";
	var t = 1200,
	r = 1252;
	var a = [874, 932, 936, 949, 950];
	for (var n = 0; n <= 8; ++n)
		a.push(1250 + n);
	var i = {
		0: 1252,
		1: 65001,
		2: 65001,
		77: 1e4,
		128: 932,
		129: 949,
		130: 1361,
		134: 936,
		136: 950,
		161: 1253,
		162: 1254,
		163: 1258,
		177: 1255,
		178: 1256,
		186: 1257,
		204: 1251,
		222: 874,
		238: 1250,
		255: 1252,
		69: 6969
	};
	var s = function (e) {
		if (a.indexOf(e) == -1)
			return;
		r = i[0] = e
	};
	function o() {
		s(1252)
	}
	var l = function (e) {
		t = e;
		s(e)
	};
	function c() {
		l(1200);
		o()
	}
	function f(e) {
		var t = [];
		for (var r = 0, a = e.length; r < a; ++r)
			t[r] = e.charCodeAt(r);
		return t
	}
	function u(e) {
		var t = [];
		for (var r = 0; r < e.length >> 1; ++r)
			t[r] = String.fromCharCode(e.charCodeAt(2 * r) + (e.charCodeAt(2 * r + 1) << 8));
		return t.join("")
	}
	function h(e) {
		var t = [];
		for (var r = 0; r < e.length >> 1; ++r)
			t[r] = String.fromCharCode(e.charCodeAt(2 * r + 1) + (e.charCodeAt(2 * r) << 8));
		return t.join("")
	}
	var d = function (e) {
		var t = e.charCodeAt(0),
		r = e.charCodeAt(1);
		if (t == 255 && r == 254)
			return u(e.slice(2));
		if (t == 254 && r == 255)
			return h(e.slice(2));
		if (t == 65279)
			return e.slice(1);
		return e
	};
	var p = function Vf(e) {
		return String.fromCharCode(e)
	};
	var m = function Gf(e) {
		return String.fromCharCode(e)
	};
	var v = null;
	var g = true;
	var b = function Zf() {
		var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		return {
			encode: function (t) {
				var r = "";
				var a = 0,
				n = 0,
				i = 0,
				s = 0,
				o = 0,
				l = 0,
				c = 0;
				for (var f = 0; f < t.length; ) {
					a = t.charCodeAt(f++);
					s = a >> 2;
					n = t.charCodeAt(f++);
					o = (a & 3) << 4 | n >> 4;
					i = t.charCodeAt(f++);
					l = (n & 15) << 2 | i >> 6;
					c = i & 63;
					if (isNaN(n)) {
						l = c = 64
					} else if (isNaN(i)) {
						c = 64
					}
					r += e.charAt(s) + e.charAt(o) + e.charAt(l) + e.charAt(c)
				}
				return r
			},
			decode: function t(r) {
				var a = "";
				var n = 0,
				i = 0,
				s = 0,
				o = 0,
				l = 0,
				c = 0,
				f = 0;
				r = r.replace(/[^\w\+\/\=]/g, "");
				for (var u = 0; u < r.length; ) {
					o = e.indexOf(r.charAt(u++));
					l = e.indexOf(r.charAt(u++));
					n = o << 2 | l >> 4;
					a += String.fromCharCode(n);
					c = e.indexOf(r.charAt(u++));
					i = (l & 15) << 4 | c >> 2;
					if (c !== 64) {
						a += String.fromCharCode(i)
					}
					f = e.indexOf(r.charAt(u++));
					s = (c & 3) << 6 | f;
					if (f !== 64) {
						a += String.fromCharCode(s)
					}
				}
				return a
			}
		}
	}
	();
	var y = typeof Buffer !== "undefined" && typeof process !== "undefined" && typeof process.versions !== "undefined" && !!process.versions.node;
	var w = function () {};
	if (typeof Buffer !== "undefined") {
		var k = !Buffer.from;
		if (!k)
			try {
				Buffer.from("foo", "utf8")
			} catch (x) {
				k = true
			}
		w = k ? function (e, t) {
			return t ? new Buffer(e, t) : new Buffer(e)
		}
		 : Buffer.from.bind(Buffer);
		if (!Buffer.alloc)
			Buffer.alloc = function (e) {
				return new Buffer(e)
			};
		if (!Buffer.allocUnsafe)
			Buffer.allocUnsafe = function (e) {
				return new Buffer(e)
			}
	}
	function _(e) {
		return y ? Buffer.alloc(e) : new Array(e)
	}
	function C(e) {
		return y ? Buffer.allocUnsafe(e) : new Array(e)
	}
	var S = function qf(e) {
		if (y)
			return w(e, "binary");
		return e.split("").map(function (e) {
			return e.charCodeAt(0) & 255
		})
	};
	function A(e) {
		if (typeof ArrayBuffer === "undefined")
			return S(e);
		var t = new ArrayBuffer(e.length),
		r = new Uint8Array(t);
		for (var a = 0; a != e.length; ++a)
			r[a] = e.charCodeAt(a) & 255;
		return t
	}
	function T(e) {
		if (Array.isArray(e))
			return e.map(function (e) {
				return String.fromCharCode(e)
			}).join("");
		var t = [];
		for (var r = 0; r < e.length; ++r)
			t[r] = String.fromCharCode(e[r]);
		return t.join("")
	}
	function E(e) {
		if (typeof Uint8Array === "undefined")
			throw new Error("Unsupported");
		return new Uint8Array(e)
	}
	function F(e) {
		if (typeof ArrayBuffer == "undefined")
			throw new Error("Unsupported");
		if (e instanceof ArrayBuffer)
			return F(new Uint8Array(e));
		var t = new Array(e.length);
		for (var r = 0; r < e.length; ++r)
			t[r] = e[r];
		return t
	}
	var D = function (e) {
		var t = [];
		e.forEach(function (e) {
			if (Array.isArray(e))
				t = t.concat(e);
			else if (typeof Uint8Array !== "undefined" && e instanceof Uint8Array)
				t = t.concat(F(e));
			else if (typeof ArrayBuffer !== "undefined" && e instanceof ArrayBuffer)
				t = t.concat(F(e))
		});
		return t
	};
	var z = /\u0000/g,
	O = /[\u0001-\u0006]/g;
	var R = {};
	var I = function Yf(e) {
		e.version = "1.20200828.1";
		function t(e) {
			var t = "",
			r = e.length - 1;
			while (r >= 0)
				t += e.charAt(r--);
			return t
		}
		function r(e, t) {
			var r = "";
			while (r.length < t)
				r += e;
			return r
		}
		function a(e, t) {
			var a = "" + e;
			return a.length >= t ? a : r("0", t - a.length) + a
		}
		function n(e, t) {
			var a = "" + e;
			return a.length >= t ? a : r(" ", t - a.length) + a
		}
		function i(e, t) {
			var a = "" + e;
			return a.length >= t ? a : a + r(" ", t - a.length)
		}
		function s(e, t) {
			var a = "" + Math.round(e);
			return a.length >= t ? a : r("0", t - a.length) + a
		}
		function o(e, t) {
			var a = "" + e;
			return a.length >= t ? a : r("0", t - a.length) + a
		}
		var l = Math.pow(2, 32);
		function c(e, t) {
			if (e > l || e < -l)
				return s(e, t);
			var r = Math.round(e);
			return o(r, t)
		}
		function f(e, t) {
			t = t || 0;
			return e.length >= 7 + t && (e.charCodeAt(t) | 32) === 103 && (e.charCodeAt(t + 1) | 32) === 101 && (e.charCodeAt(t + 2) | 32) === 110 && (e.charCodeAt(t + 3) | 32) === 101 && (e.charCodeAt(t + 4) | 32) === 114 && (e.charCodeAt(t + 5) | 32) === 97 && (e.charCodeAt(t + 6) | 32) === 108
		}
		function u(e) {
			var t = [],
			r = Object.keys(e);
			for (var a = 0; a !== r.length; ++a)
				t[e[r[a]]] = r[a];
			return t
		}
		var h = [["Sun", "Sunday"], ["Mon", "Monday"], ["Tue", "Tuesday"], ["Wed", "Wednesday"], ["Thu", "Thursday"], ["Fri", "Friday"], ["Sat", "Saturday"]];
		var d = [["J", "Jan", "January"], ["F", "Feb", "February"], ["M", "Mar", "March"], ["A", "Apr", "April"], ["M", "May", "May"], ["J", "Jun", "June"], ["J", "Jul", "July"], ["A", "Aug", "August"], ["S", "Sep", "September"], ["O", "Oct", "October"], ["N", "Nov", "November"], ["D", "Dec", "December"]];
		function p(e) {
			e[0] = "General";
			e[1] = "0";
			e[2] = "0.00";
			e[3] = "#,##0";
			e[4] = "#,##0.00";
			e[9] = "0%";
			e[10] = "0.00%";
			e[11] = "0.00E+00";
			e[12] = "# ?/?";
			e[13] = "# ??/??";
			e[14] = "m/d/yy";
			e[15] = "d-mmm-yy";
			e[16] = "d-mmm";
			e[17] = "mmm-yy";
			e[18] = "h:mm AM/PM";
			e[19] = "h:mm:ss AM/PM";
			e[20] = "h:mm";
			e[21] = "h:mm:ss";
			e[22] = "m/d/yy h:mm";
			e[37] = "#,##0 ;(#,##0)";
			e[38] = "#,##0 ;[Red](#,##0)";
			e[39] = "#,##0.00;(#,##0.00)";
			e[40] = "#,##0.00;[Red](#,##0.00)";
			e[45] = "mm:ss";
			e[46] = "[h]:mm:ss";
			e[47] = "mmss.0";
			e[48] = "##0.0E+0";
			e[49] = "@";
			e[56] = '"上午/下午 "hh"時"mm"分"ss"秒 "';
			M(e)
		}
		var m = {};
		p(m);
		var v = [];
		var g = 0;
		for (g = 5; g <= 8; ++g)
			v[g] = 32 + g;
		for (g = 23; g <= 26; ++g)
			v[g] = 0;
		for (g = 27; g <= 31; ++g)
			v[g] = 14;
		for (g = 50; g <= 58; ++g)
			v[g] = 14;
		for (g = 59; g <= 62; ++g)
			v[g] = g - 58;
		for (g = 67; g <= 68; ++g)
			v[g] = g - 58;
		for (g = 72; g <= 75; ++g)
			v[g] = g - 58;
		for (g = 67; g <= 68; ++g)
			v[g] = g - 57;
		for (g = 76; g <= 78; ++g)
			v[g] = g - 56;
		for (g = 79; g <= 81; ++g)
			v[g] = g - 34;
		var b = [];
		b[5] = b[63] = '"$"#,##0_);\\("$"#,##0\\)';
		b[6] = b[64] = '"$"#,##0_);[Red]\\("$"#,##0\\)';
		b[7] = b[65] = '"$"#,##0.00_);\\("$"#,##0.00\\)';
		b[8] = b[66] = '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)';
		b[41] = '_(* #,##0_);_(* \\(#,##0\\);_(* "-"_);_(@_)';
		b[42] = '_("$"* #,##0_);_("$"* \\(#,##0\\);_("$"* "-"_);_(@_)';
		b[43] = '_(* #,##0.00_);_(* \\(#,##0.00\\);_(* "-"??_);_(@_)';
		b[44] = '_("$"* #,##0.00_);_("$"* \\(#,##0.00\\);_("$"* "-"??_);_(@_)';
		function y(e, t, r) {
			var a = e < 0 ? -1 : 1;
			var n = e * a;
			var i = 0,
			s = 1,
			o = 0;
			var l = 1,
			c = 0,
			f = 0;
			var u = Math.floor(n);
			while (c < t) {
				u = Math.floor(n);
				o = u * s + i;
				f = u * c + l;
				if (n - u < 5e-8)
					break;
				n = 1 / (n - u);
				i = s;
				s = o;
				l = c;
				c = f
			}
			if (f > t) {
				if (c > t) {
					f = l;
					o = i
				} else {
					f = c;
					o = s
				}
			}
			if (!r)
				return [0, a * o, f];
			var h = Math.floor(a * o / f);
			return [h, a * o - h * f, f]
		}
		function w(e, t, r) {
			if (e > 2958465 || e < 0)
				return null;
			var a = e | 0,
			n = Math.floor(86400 * (e - a)),
			i = 0;
			var s = [];
			var o = {
				D: a,
				T: n,
				u: 86400 * (e - a) - n,
				y: 0,
				m: 0,
				d: 0,
				H: 0,
				M: 0,
				S: 0,
				q: 0
			};
			if (Math.abs(o.u) < 1e-6)
				o.u = 0;
			if (t && t.date1904)
				a += 1462;
			if (o.u > .9999) {
				o.u = 0;
				if (++n == 86400) {
					o.T = n = 0;
					++a;
					++o.D
				}
			}
			if (a === 60) {
				s = r ? [1317, 10, 29] : [1900, 2, 29];
				i = 3
			} else if (a === 0) {
				s = r ? [1317, 8, 29] : [1900, 1, 0];
				i = 6
			} else {
				if (a > 60)
					--a;
				var l = new Date(1900, 0, 1);
				l.setDate(l.getDate() + a - 1);
				s = [l.getFullYear(), l.getMonth() + 1, l.getDate()];
				i = l.getDay();
				if (a < 60)
					i = (i + 6) % 7;
				if (r)
					i = $(l, s)
			}
			o.y = s[0];
			o.m = s[1];
			o.d = s[2];
			o.S = n % 60;
			n = Math.floor(n / 60);
			o.M = n % 60;
			n = Math.floor(n / 60);
			o.H = n;
			o.q = i;
			return o
		}
		e.parse_date_code = w;
		var k = new Date(1899, 11, 31, 0, 0, 0);
		var x = k.getTime();
		var _ = new Date(1900, 2, 1, 0, 0, 0);
		function C(e, t) {
			var r = e.getTime();
			if (t)
				r -= 1461 * 24 * 60 * 60 * 1e3;
			else if (e >= _)
				r += 24 * 60 * 60 * 1e3;
			return (r - (x + (e.getTimezoneOffset() - k.getTimezoneOffset()) * 6e4)) / (24 * 60 * 60 * 1e3)
		}
		var S = "";
		var A = {
			"en-us": {
				y: "y",
				d: "d",
				",": ",",
				".": ".",
				date: "_/"
			},
			"de-de": {
				y: "j",
				d: "t",
				",": ".",
				".": ",",
				date: "_."
			},
			"it-it": {
				y: "y",
				d: "d",
				",": ".",
				".": ",",
				date: "_/"
			}
		};
		var T = A[S.toLowerCase()] || A["en-us"];
		var E = u(T);
		var F = "$",
		D = "";
		function z() {
			return D || "USD"
		}
		function O(e) {
			D = e;
			F = typeof Intl != "undefined" ? Intl.NumberFormat(S, {
					style: "currency",
					currencyDisplay: "symbol",
					currency: e
				}).format(0).replace(/[0\.\,\s]/g, "") : "$"
		}
		var R = ",",
		I = ".",
		N = "/";
		function L() {
			return S || "en-US"
		}
		function B(e) {
			P(m);
			S = e;
			M(m);
			if (typeof Intl != "undefined") {
				var t = Intl.DateTimeFormat(e);
				if (t.formatToParts) {
					var r = t.formatToParts(new Date(2020, 0, 5, 0, 0, 0));
					for (var a = 0; a < 7; ++a) {
						h[a][1] = Intl.DateTimeFormat(e, {
								weekday: "long"
							}).formatToParts(new Date(2020, 0, 5 + a, 0, 0, 0))[0].value;
						h[a][0] = Intl.DateTimeFormat(e, {
								weekday: "short"
							}).formatToParts(new Date(2020, 0, 5 + a, 0, 0, 0))[0].value
					}
					for (var n = 0; n < 12; ++n) {
						d[n][2] = Intl.DateTimeFormat(e, {
								month: "long"
							}).formatToParts(new Date(2020, n, 2, 0, 0, 0))[0].value;
						d[n][1] = Intl.DateTimeFormat(e, {
								month: "short"
							}).formatToParts(new Date(2020, n, 2, 0, 0, 0))[0].value;
						d[n][0] = d[n][1].slice(0, 1)
					}
					var i = "";
					for (var s = 0; s < r.length; ++s) {
						var o = r[s].value;
						switch (r[s].type) {
						case "year":
							i += o.length == 2 ? "yy" : "yyyy";
							break;
						case "month":
							if (o == "1")
								i += "m";
							else if (o == "01")
								i += "mm";
							else if (o == d[0][1])
								i += "mmm";
							else if (o == d[0][2])
								i += "mmmm";
							else if (o == d[0][0])
								i += "mmmmm";
							else
								i += "mm";
							break;
						case "day":
							if (o == "5")
								i += "d";
							else if (o == "05")
								i += "dd";
							else if (o == h[0][0])
								i += "ddd";
							else if (o == h[0][1])
								i += "dddd";
							else
								i += "dd";
							break;
						case "literal":
							i += o.replace(/./g, "\\$&");
							if (o.length == 1)
								N = o;
							break;
						}
					}
					if (e.match(/en/i) && e.match(/us/i) || !e)
						i = "m/d/yy";
					m[14] = i
				}
				var l = Intl.NumberFormat(e, {}).format(1234567.89);
				if (l) {
					R = (l.match(/1(.*)2/) || [])[1];
					I = (l.match(/7(.*)8/) || [])[1]
				}
			}
			if (!A[e.toLowerCase()]) {
				A[e.toLowerCase()] = {
					".": I,
					",": R
				}
			}
			E = u(T = A[e.toLowerCase()] || A["en-us"])
		}
		function M(e) {
			switch ((S || "").toLowerCase()) {
			case "zh-tw":
				e[27] = "[$-404]e/m/d";
				e[28] = '[$-404]e"年"m"月"d"日"';
				e[29] = '[$-404]e"年"m"月"d"日"';
				e[30] = 'm"/"d"/"yy';
				e[31] = 'yyyy"年"m"月"d"日"';
				e[32] = 'hh"時"mm"分"';
				e[33] = 'hh"時"mm"分"ss"秒"';
				e[34] = '上午/下午 hh"時"mm"分"';
				e[35] = '上午/下午 hh"時"mm"分"ss"秒"';
				e[36] = "[$-404]e/m/d";
				e[50] = "[$-404]e/m/d";
				e[51] = '[$-404]e"年"m"月"d"日"';
				e[52] = '上午/下午 hh"時"mm"分"';
				e[53] = '上午/下午 hh"時"mm"分"ss"秒"';
				e[54] = '[$-404]e"年"m"月"d"日"';
				e[55] = '上午/下午 hh"時"mm"分"';
				e[56] = '上午/下午 hh"時"mm"分"ss"秒"';
				e[57] = "[$-404]e/m/d";
				e[58] = '[$-404]e"年"m"月"d"日"';
				break;
			case "zh-cn":
				e[27] = 'yyyy"年"m"月"';
				e[28] = 'm"月"d"日"';
				e[29] = 'm"月"d"日"';
				e[30] = 'm"-"d"-"yy';
				e[31] = 'yyyy"年"m"月"d"日"';
				e[32] = 'h"时"mm"分"';
				e[33] = 'h"时"mm"分"ss"秒"';
				e[34] = '上午/下午 h"时"mm"分"';
				e[35] = '上午/下午 h"时"mm"分"ss"秒"';
				e[36] = 'yyyy"年"m"月"';
				e[50] = 'yyyy"年"m"月"';
				e[51] = 'm"月"d"日"';
				e[52] = 'yyyy"年"m"月"';
				e[53] = 'm"月"d"日"';
				e[54] = 'm"月"d"日"';
				e[55] = '上午/下午 h"时"mm"分"';
				e[56] = '上午/下午 h"时"mm"分"ss"秒"';
				e[57] = 'yyyy"年"m"月"';
				e[58] = 'm"月"d"日"';
				break;
			case "ja-jp":
				e[27] = '[$-411]ge"."m"."d';
				e[28] = '[$-411]ggge"年"m"月"d"日"';
				e[29] = '[$-411]ggge"年"m"月"d"日"';
				e[30] = 'm"/"d"/"yy';
				e[31] = 'yyyy"年"m"月"d"日"';
				e[32] = 'h"時"mm"分"';
				e[33] = 'h"時"mm"分"ss"秒"';
				e[34] = 'yyyy"年"m"月"';
				e[35] = 'm"月"d"日"';
				e[36] = '[$-411]ge"."m"."d';
				e[50] = '[$-411]ge"."m"."d';
				e[51] = '[$-411]ggge"年"m"月"d"日"';
				e[52] = 'yyyy"年"m"月"';
				e[53] = 'm"月"d"日"';
				e[54] = '[$-411]ggge"年"m"月"d"日"';
				e[55] = 'yyyy"年"m"月"';
				e[56] = 'm"月"d"日"';
				e[57] = '[$-411]ge"."m"."d';
				e[58] = '[$-411]ggge"年"m"月"d"日"';
				break;
			case "ko-kr":
				e[27] = 'yyyy"年" mm"月" dd"日"';
				e[28] = "mm-dd";
				e[29] = "mm-dd";
				e[30] = "mm-dd-yy";
				e[31] = 'yyyy"년" mm"월" dd"일"';
				e[32] = 'h"시" mm"분"';
				e[33] = 'h"시" mm"분" ss"초"';
				e[34] = "yyyy-mm-dd";
				e[35] = "yyyy-mm-dd";
				e[36] = 'yyyy"年" mm"月" dd"日"';
				e[50] = 'yyyy"年" mm"月" dd"日"';
				e[51] = "mm-dd";
				e[52] = "yyyy-mm-dd";
				e[53] = "yyyy-mm-dd";
				e[54] = "mm-dd";
				e[55] = "yyyy-mm-dd";
				e[56] = "yyyy-mm-dd";
				e[57] = 'yyyy"年" mm"月" dd"日"';
				e[58] = "mm-dd";
				break;
			case "th-th":
				e[59] = '"t"0';
				e[60] = '"t"0.00';
				e[61] = '"t"#,##0';
				e[62] = '"t"#,##0.00';
				e[67] = "t0%";
				e[68] = "t0.00%";
				e[69] = "t# ?/?";
				e[70] = "t# ??/??";
				e[71] = 'ว"/"ด"/"ปปปป';
				e[72] = 'ว"-"ดดด"-"ปป';
				e[73] = 'ว"-"ดดด';
				e[74] = 'ดดด"-"ปป';
				e[75] = 'ช":"นน';
				e[76] = 'ช":"นน":"ทท';
				e[77] = 'ว"/"ด"/"ปปปป ช":"นน';
				e[78] = 'นน":"ทท';
				e[79] = '[ช]นน":"ทท';
				e[80] = 'นน":"ทท.0';
				e[81] = "d/m/bb";
				break;
			}
		}
		function P(e) {
			var t = 0;
			switch ((S || "").toLowerCase()) {
			case "zh-tw": ;
			case "zh-cn": ;
			case "ja-jp": ;
			case "ko-kr":
				for (t = 27; t <= 36; ++t)
					delete e[t];
				for (t = 50; t <= 58; ++t)
					delete e[t];
				break;
			case "th-th":
				for (t = 59; t <= 62; ++t)
					delete e[t];
				for (t = 67; t <= 81; ++t)
					delete e[t];
				break;
			}
		}
		function j(e) {
			return e.toString(10)
		}
		e._general_int = j;
		var W = function ie() {
			var e = /(?:\.0*|(\.\d*[1-9])0+)$/;
			function t(t) {
				return t.indexOf(".") == -1 ? t : t.replace(e, "$1")
			}
			var r = /(?:\.0*|(\.\d*[1-9])0+)[Ee]/;
			var a = /(E[+-])(\d)$/;
			function n(e) {
				if (e.indexOf("E") == -1)
					return e;
				return e.replace(r, "$1E").replace(a, "$10$2")
			}
			function i(e) {
				var r = e < 0 ? 12 : 11;
				var a = t(e.toFixed(12));
				if (a.length <= r)
					return a;
				a = e.toPrecision(10);
				if (a.length <= r)
					return a;
				return e.toExponential(5)
			}
			function s(e) {
				var r = t(e.toFixed(11));
				return r.length > (e < 0 ? 12 : 11) || r === "0" || r === "-0" ? e.toPrecision(6) : r
			}
			function o(e) {
				var r = Math.floor(Math.log(Math.abs(e)) * Math.LOG10E),
				a;
				if (r >= -4 && r <= -1)
					a = e.toPrecision(10 + r);
				else if (Math.abs(r) <= 9)
					a = i(e);
				else if (r === 10)
					a = e.toFixed(10).substr(0, 12);
				else
					a = s(e);
				return t(n(a.toUpperCase()))
			}
			return function l(e) {
				var t = o(e);
				if (R === "," && I === ".")
					return t;
				return t.replace(/[,.]/g, function (e) {
					return e == "," ? R : I
				})
			}
		}
		();
		e._general_num = W;
		function U(e, t) {
			switch (typeof e) {
			case "string":
				return e;
			case "boolean":
				return e ? "TRUE" : "FALSE";
			case "number":
				return (e | 0) === e ? e.toString(10) : W(e);
			case "undefined":
				return "";
			case "object":
				if (e == null)
					return "";
				if (e instanceof Date)
					return ae(14, C(e, t && t.date1904), t);
			}
			throw new Error("unsupported value in General format: " + e)
		}
		e._general = U;
		function $(e, t) {
			t[0] -= 581;
			var r = e.getDay();
			if (e < 60)
				r = (r + 6) % 7;
			return r
		}
		var H = "๐๑๒๓๔๕๖๗๘๙".split("");
		function X(e, t, r, n) {
			var i = "",
			s = 0,
			o = 0,
			l = r.y,
			c,
			f = 0;
			switch (e) {
			case 98:
				l = r.y + 543;
			case 121:
				switch (t.length) {
				case 1: ;
				case 2:
					c = l % 100;
					f = 2;
					break;
				default:
					c = l % 1e4;
					f = 4;
					break;
				}
				break;
			case 109:
				switch (t.length) {
				case 1: ;
				case 2:
					c = r.m;
					f = t.length;
					break;
				case 3:
					return d[r.m - 1][1];
				case 5:
					return d[r.m - 1][0];
				default:
					return d[r.m - 1][2];
				}
				break;
			case 100:
				switch (t.length) {
				case 1: ;
				case 2:
					c = r.d;
					f = t.length;
					break;
				case 3:
					return h[r.q][0];
				default:
					return h[r.q][1];
				}
				break;
			case 104:
				switch (t.length) {
				case 1: ;
				case 2:
					c = 1 + (r.H + 11) % 12;
					f = t.length;
					break;
				default:
					throw "bad hour format: " + t;
				}
				break;
			case 72:
				switch (t.length) {
				case 1: ;
				case 2:
					c = r.H;
					f = t.length;
					break;
				default:
					throw "bad hour format: " + t;
				}
				break;
			case 77:
				switch (t.length) {
				case 1: ;
				case 2:
					c = r.M;
					f = t.length;
					break;
				default:
					throw "bad minute format: " + t;
				}
				break;
			case 115:
				if (t != "s" && t != "ss" && t != ".0" && t != ".00" && t != ".000")
					throw "bad second format: " + t;
				if (r.u === 0 && (t == "s" || t == "ss"))
					return a(r.S, t.length);
				if (n >= 2)
					o = n === 3 ? 1e3 : 100;
				else
					o = n === 1 ? 10 : 1;
				s = Math.round(o * (r.S + r.u));
				if (s >= 60 * o)
					s = 0;
				if (t === "s")
					return s === 0 ? "0" : "" + s / o;
				i = a(s, 2 + n);
				if (t === "ss")
					return i.substr(0, 2);
				return "." + i.substr(2, t.length - 1);
			case 90:
				switch (t) {
				case "[h]": ;
				case "[hh]":
					c = r.D * 24 + r.H;
					break;
				case "[m]": ;
				case "[mm]":
					c = (r.D * 24 + r.H) * 60 + r.M;
					break;
				case "[s]": ;
				case "[ss]":
					c = ((r.D * 24 + r.H) * 60 + r.M) * 60 + Math.round(r.S + r.u);
					break;
				case "[ช]": ;
				case "[ชช]":
					c = r.D * 24 + r.H;
					break;
				case "[น]": ;
				case "[นน]":
					c = (r.D * 24 + r.H) * 60 + r.M;
					break;
				case "[ท]": ;
				case "[ทท]":
					c = ((r.D * 24 + r.H) * 60 + r.M) * 60 + Math.round(r.S + r.u);
					break;
				default:
					throw "bad abstime format: " + t;
				}
				f = t.length === 3 ? 1 : 2;
				break;
			case 101:
				c = l;
				f = 1;
				break;
			case 3623:
				c = r.d;
				f = t.length;
				break;
			case 3604:
				switch (t.length) {
				case 1: ;
				case 2:
					c = r.m;
					f = t.length;
					break;
				case 3:
					return d[r.m - 1][1];
				case 5:
					return d[r.m - 1][0];
				default:
					return d[r.m - 1][2];
				}
				break;
			case 3611:
				l = r.y + 543;
				switch (t.length) {
				case 1: ;
				case 2:
					c = l % 100;
					f = 2;
					break;
				default:
					c = l % 1e4;
					f = 4;
					break;
				}
				break;
			case 3594:
				c = r.H;
				f = t.length;
				break;
			case 3609:
				c = r.M;
				f = t.length;
				break;
			case 3607:
				c = r.S;
				f = t.length;
				break;
			default:
				throw e.toString(16);
			}
			var u = f > 0 ? a(c, f) : "";
			if (e == 90 ? t.charCodeAt(1) < 3584 : e < 3584)
				return u;
			return u.replace(/[0-9]/g, function (e) {
				return H[+e]
			})
		}
		function V(e) {
			var t = 3;
			if (e.length <= t)
				return e;
			var r = e.length % t,
			a = e.substr(0, r);
			for (; r != e.length; r += t)
				a += (a.length > 0 ? "," : "") + e.substr(r, t);
			return a
		}
		var G = function se() {
			var e = /%/g;
			function s(t, a, n) {
				var i = a.replace(e, ""),
				s = a.length - i.length;
				return G(t, i, n * Math.pow(10, 2 * s)) + r("%", s)
			}
			function o(e, t, r) {
				var a = t.length - 1;
				while (t.charCodeAt(a - 1) === 44)
					--a;
				return G(e, t.substr(0, a), r / Math.pow(10, 3 * (t.length - a)))
			}
			function l(e, t) {
				var r;
				var a = e.indexOf("E") - e.indexOf(".") - 1;
				if (e.match(/^#+0.0E\+0$/)) {
					if (t == 0)
						return "0.0E+0";
					else if (t < 0)
						return "-" + l(e, -t);
					var n = e.indexOf(".");
					if (n === -1)
						n = e.indexOf("E");
					var i = Math.floor(Math.log(t) * Math.LOG10E) % n;
					if (i < 0)
						i += n;
					r = (t / Math.pow(10, i)).toPrecision(a + 1 + (n + i) % n);
					if (r.indexOf("e") === -1) {
						var s = Math.floor(Math.log(t) * Math.LOG10E);
						if (r.indexOf(".") === -1)
							r = r.charAt(0) + "." + r.substr(1) + "E+" + (s - r.length + i);
						else
							r += "E+" + (s - i);
						while (r.substr(0, 2) === "0.") {
							r = r.charAt(0) + r.substr(2, n) + "." + r.substr(2 + n);
							r = r.replace(/^0+([1-9])/, "$1").replace(/^0+\./, "0.")
						}
						r = r.replace(/\+-/, "-")
					}
					r = r.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function (e, t, r, a) {
							return t + r + a.substr(0, (n + i) % n) + "." + a.substr(i) + "E"
						})
				} else
					r = t.toExponential(a);
				if (e.match(/E\+00$/) && r.match(/e[+-]\d$/))
					r = r.substr(0, r.length - 1) + "0" + r.charAt(r.length - 1);
				if (e.match(/E\-/) && r.match(/e\+/))
					r = r.replace(/e\+/, "e");
				return r.replace("e", "E")
			}
			var f = /# (\?+)( ?)\/( ?)(\d+)/;
			function u(e, t, i) {
				var s = parseInt(e[4], 10),
				o = Math.round(t * s),
				l = Math.floor(o / s);
				var c = o - l * s,
				f = s;
				return i + (l === 0 ? "" : "" + l) + " " + (c === 0 ? r(" ", e[1].length + 1 + e[4].length) : n(c, e[1].length) + e[2] + "/" + e[3] + a(f, e[4].length))
			}
			function h(e, t, a) {
				return a + (t === 0 ? "" : "" + t) + r(" ", e[1].length + 2 + e[4].length)
			}
			var d = /^#*0*\.([0#]+)/;
			var p = /\).*[0#]/;
			var m = /\(###\) ###\\?-####/;
			function v(e) {
				var t = "",
				r;
				for (var a = 0; a != e.length; ++a)
					switch (r = e.charCodeAt(a)) {
					case 35:
						break;
					case 63:
						t += " ";
						break;
					case 48:
						t += "0";
						break;
					default:
						t += String.fromCharCode(r);
					}
				return t
			}
			function g(e, t) {
				var r = Math.pow(10, t);
				return "" + Math.round(e * r) / r
			}
			function b(e, t) {
				if (t > 11)
					return b(e, 11) * Math.pow(10, t - 11);
				var r = e - Math.floor(e),
				a = Math.pow(10, t);
				if (t < ("" + Math.round(r * a)).length)
					return 0;
				return Math.round(r * a)
			}
			function w(e, t) {
				if (t < ("" + Math.round((e - Math.floor(e)) * Math.pow(10, t))).length) {
					return 1
				}
				return 0
			}
			function k(e) {
				if (e < 2147483647 && e > -2147483648)
					return "" + (e >= 0 ? e | 0 : e - 1 | 0);
				return "" + Math.floor(e)
			}
			function x(e, h, _) {
				if (e.charCodeAt(0) === 40 && !h.match(p)) {
					var C = h.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
					if (_ >= 0)
						return x("n", C, _);
					return "(" + x("n", C, -_) + ")"
				}
				if (h.charCodeAt(h.length - 1) === 44)
					return o(e, h, _);
				if (h.indexOf("%") !== -1)
					return s(e, h, _);
				if (h.indexOf("E") !== -1)
					return l(h, _);
				if (h.charCodeAt(0) === 36)
					return "$" + x(e, h.substr(h.charAt(1) == " " ? 2 : 1), _);
				var S;
				var A,
				T,
				E,
				F = Math.abs(_),
				D = _ < 0 ? "-" : "";
				if (h.match(/^00+$/))
					return D + c(F, h.length);
				if (h.match(/^[#?]+$/)) {
					S = c(_, 0);
					if (S === "0")
						S = "";
					return S.length > h.length ? S : v(h.substr(0, h.length - S.length)) + S
				}
				if (A = h.match(f))
					return u(A, F, D);
				if (h.match(/^#+0+$/))
					return D + c(F, h.length - h.indexOf("0"));
				if (A = h.match(d)) {
					S = g(_, A[1].length).replace(/^([^\.]+)$/, "$1." + v(A[1])).replace(/\.$/, "." + v(A[1])).replace(/\.(\d*)$/, function (e, t) {
							return "." + t + r("0", v(A[1]).length - t.length)
						});
					return h.indexOf("0.") !== -1 ? S : S.replace(/^0\./, ".")
				}
				h = h.replace(/^#+([0.])/, "$1");
				if (A = h.match(/^(0*)\.(#*)$/)) {
					return D + g(F, A[2].length).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, A[1].length ? "0." : ".")
				}
				if (A = h.match(/^#{1,3},##0(\.?)$/))
					return D + V(c(F, 0));
				if (A = h.match(/^#,##0\.([#0]*0)$/)) {
					return _ < 0 ? "-" + x(e, h, -_) : V("" + (Math.floor(_) + w(_, A[1].length))) + "." + a(b(_, A[1].length), A[1].length)
				}
				if (A = h.match(/^#,#*,#0/))
					return x(e, h.replace(/^#,#*,/, ""), _);
				if (A = h.match(/^([0#]+)(\\?-([0#]+))+$/)) {
					S = t(x(e, h.replace(/[\\-]/g, ""), _));
					T = 0;
					return t(t(h.replace(/\\/g, "")).replace(/[0#]/g, function (e) {
							return T < S.length ? S.charAt(T++) : e === "0" ? "0" : ""
						}))
				}
				if (h.match(m)) {
					S = x(e, "##########", _);
					return "(" + S.substr(0, 3) + ") " + S.substr(3, 3) + "-" + S.substr(6)
				}
				var z = "";
				if (A = h.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/)) {
					T = Math.min(A[4].length, 7);
					E = y(F, Math.pow(10, T) - 1, false);
					S = "" + D;
					z = G("n", A[1], E[1]);
					if (z.charAt(z.length - 1) == " ")
						z = z.substr(0, z.length - 1) + "0";
					S += z + A[2] + "/" + A[3];
					z = i(E[2], T);
					if (z.length < A[4].length)
						z = v(A[4].substr(A[4].length - z.length)) + z;
					S += z;
					return S
				}
				if (A = h.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/)) {
					T = Math.min(Math.max(A[1].length, A[4].length), 7);
					E = y(F, Math.pow(10, T) - 1, true);
					return D + (E[0] || (E[1] ? "" : "0")) + " " + (E[1] ? n(E[1], T) + A[2] + "/" + A[3] + i(E[2], T) : r(" ", 2 * T + 1 + A[2].length + A[3].length))
				}
				if (A = h.match(/^[#0?]+$/)) {
					S = c(_, 0);
					if (h.length <= S.length)
						return S;
					return v(h.substr(0, h.length - S.length)) + S
				}
				if (A = h.match(/^([#0?]+)\.([#0]+)$/)) {
					S = "" + _.toFixed(Math.min(A[2].length, 10)).replace(/([^0])0+$/, "$1");
					T = S.indexOf(".");
					var O = h.indexOf(".") - T,
					R = h.length - S.length - O;
					return v(h.substr(0, O) + S + h.substr(h.length - R))
				}
				if (A = h.match(/^00,000\.([#0]*0)$/)) {
					T = b(_, A[1].length);
					return _ < 0 ? "-" + x(e, h, -_) : V(k(_)).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function (e) {
						return "00," + (e.length < 3 ? a(0, 3 - e.length) : "") + e
					}) + "." + a(T, A[1].length)
				}
				switch (h) {
				case "###,##0.00":
					return x(e, "#,##0.00", _);
				case "###,###": ;
				case "##,###": ;
				case "#,###":
					var I = V(c(F, 0));
					return I !== "0" ? D + I : "";
				case "###,###.00":
					return x(e, "###,##0.00", _).replace(/^0\./, ".");
				case "#,###.00":
					return x(e, "#,##0.00", _).replace(/^0\./, ".");
				default: ;
				}
				throw new Error("unsupported format |" + h + "|")
			}
			function _(e, t, r) {
				var a = t.length - 1;
				while (t.charCodeAt(a - 1) === 44)
					--a;
				return G(e, t.substr(0, a), r / Math.pow(10, 3 * (t.length - a)))
			}
			function C(t, a, n) {
				var i = a.replace(e, ""),
				s = a.length - i.length;
				return G(t, i, n * Math.pow(10, 2 * s)) + r("%", s)
			}
			function S(e, t) {
				var r;
				var a = e.indexOf("E") - e.indexOf(".") - 1;
				if (e.match(/^#+0.0E\+0$/)) {
					if (t == 0)
						return "0.0E+0";
					else if (t < 0)
						return "-" + S(e, -t);
					var n = e.indexOf(".");
					if (n === -1)
						n = e.indexOf("E");
					var i = Math.floor(Math.log(t) * Math.LOG10E) % n;
					if (i < 0)
						i += n;
					r = (t / Math.pow(10, i)).toPrecision(a + 1 + (n + i) % n);
					if (!r.match(/[Ee]/)) {
						var s = Math.floor(Math.log(t) * Math.LOG10E);
						if (r.indexOf(".") === -1)
							r = r.charAt(0) + "." + r.substr(1) + "E+" + (s - r.length + i);
						else
							r += "E+" + (s - i);
						r = r.replace(/\+-/, "-")
					}
					r = r.replace(/^([+-]?)(\d*)\.(\d*)[Ee]/, function (e, t, r, a) {
							return t + r + a.substr(0, (n + i) % n) + "." + a.substr(i) + "E"
						})
				} else
					r = t.toExponential(a);
				if (e.match(/E\+00$/) && r.match(/e[+-]\d$/))
					r = r.substr(0, r.length - 1) + "0" + r.charAt(r.length - 1);
				if (e.match(/E\-/) && r.match(/e\+/))
					r = r.replace(/e\+/, "e");
				return r.replace("e", "E")
			}
			function A(e, s, o) {
				if (e.charCodeAt(0) === 40 && !s.match(p)) {
					var l = s.replace(/\( */, "").replace(/ \)/, "").replace(/\)/, "");
					if (o >= 0)
						return A("n", l, o);
					return "(" + A("n", l, -o) + ")"
				}
				if (s.charCodeAt(s.length - 1) === 44)
					return _(e, s, o);
				if (s.indexOf("%") !== -1)
					return C(e, s, o);
				if (s.indexOf("E") !== -1)
					return S(s, o);
				if (s.charCodeAt(0) === 36)
					return "$" + A(e, s.substr(s.charAt(1) == " " ? 2 : 1), o);
				var c;
				var u,
				g,
				b,
				w = Math.abs(o),
				k = o < 0 ? "-" : "";
				if (s.match(/^00+$/))
					return k + a(w, s.length);
				if (s.match(/^[#?]+$/)) {
					c = "" + o;
					if (o === 0)
						c = "";
					return c.length > s.length ? c : v(s.substr(0, s.length - c.length)) + c
				}
				if (u = s.match(f))
					return h(u, w, k);
				if (s.match(/^#+0+$/))
					return k + a(w, s.length - s.indexOf("0"));
				if (u = s.match(d)) {
					c = ("" + o).replace(/^([^\.]+)$/, "$1." + v(u[1])).replace(/\.$/, "." + v(u[1]));
					c = c.replace(/\.(\d*)$/, function (e, t) {
							return "." + t + r("0", v(u[1]).length - t.length)
						});
					return s.indexOf("0.") !== -1 ? c : c.replace(/^0\./, ".")
				}
				s = s.replace(/^#+([0.])/, "$1");
				if (u = s.match(/^(0*)\.(#*)$/)) {
					return k + ("" + w).replace(/\.(\d*[1-9])0*$/, ".$1").replace(/^(-?\d*)$/, "$1.").replace(/^0\./, u[1].length ? "0." : ".")
				}
				if (u = s.match(/^#{1,3},##0(\.?)$/))
					return k + V("" + w);
				if (u = s.match(/^#,##0\.([#0]*0)$/)) {
					return o < 0 ? "-" + A(e, s, -o) : V("" + o) + "." + r("0", u[1].length)
				}
				if (u = s.match(/^#,#*,#0/))
					return A(e, s.replace(/^#,#*,/, ""), o);
				if (u = s.match(/^([0#]+)(\\?-([0#]+))+$/)) {
					c = t(A(e, s.replace(/[\\-]/g, ""), o));
					g = 0;
					return t(t(s.replace(/\\/g, "")).replace(/[0#]/g, function (e) {
							return g < c.length ? c.charAt(g++) : e === "0" ? "0" : ""
						}))
				}
				if (s.match(m)) {
					c = A(e, "##########", o);
					return "(" + c.substr(0, 3) + ") " + c.substr(3, 3) + "-" + c.substr(6)
				}
				var x = "";
				if (u = s.match(/^([#0?]+)( ?)\/( ?)([#0?]+)/)) {
					g = Math.min(u[4].length, 7);
					b = y(w, Math.pow(10, g) - 1, false);
					c = "" + k;
					x = G("n", u[1], b[1]);
					if (x.charAt(x.length - 1) == " ")
						x = x.substr(0, x.length - 1) + "0";
					c += x + u[2] + "/" + u[3];
					x = i(b[2], g);
					if (x.length < u[4].length)
						x = v(u[4].substr(u[4].length - x.length)) + x;
					c += x;
					return c
				}
				if (u = s.match(/^# ([#0?]+)( ?)\/( ?)([#0?]+)/)) {
					g = Math.min(Math.max(u[1].length, u[4].length), 7);
					b = y(w, Math.pow(10, g) - 1, true);
					return k + (b[0] || (b[1] ? "" : "0")) + " " + (b[1] ? n(b[1], g) + u[2] + "/" + u[3] + i(b[2], g) : r(" ", 2 * g + 1 + u[2].length + u[3].length))
				}
				if (u = s.match(/^[#0?]+$/)) {
					c = "" + o;
					if (s.length <= c.length)
						return c;
					return v(s.substr(0, s.length - c.length)) + c
				}
				if (u = s.match(/^([#0]+)\.([#0]+)$/)) {
					c = "" + o.toFixed(Math.min(u[2].length, 10)).replace(/([^0])0+$/, "$1");
					g = c.indexOf(".");
					var T = s.indexOf(".") - g,
					E = s.length - c.length - T;
					return v(s.substr(0, T) + c + s.substr(s.length - E))
				}
				if (u = s.match(/^00,000\.([#0]*0)$/)) {
					return o < 0 ? "-" + A(e, s, -o) : V("" + o).replace(/^\d,\d{3}$/, "0$&").replace(/^\d*$/, function (e) {
						return "00," + (e.length < 3 ? a(0, 3 - e.length) : "") + e
					}) + "." + a(0, u[1].length)
				}
				var F = V("" + w);
				switch (s) {
				case "###,###": ;
				case "##,###": ;
				case "#,###":
					return F !== "0" ? k + F : "";
				case "#,#00":
					F = a(F, 2);
					return F !== "00" ? k + F : "";
				default:
					if (s.match(/\.[0#?]*$/))
						return A(e, s.slice(0, s.lastIndexOf(".")), o) + v(s.slice(s.lastIndexOf(".")));
				}
				throw new Error("unsupported format |" + s + "|")
			}
			return function T(e, t, r) {
				if (t == "0,0")
					t = "#,#00";
				return (r | 0) === r ? A(e, t, r) : x(e, t, r)
			}
		}
		();
		function Z(e) {
			var t = [];
			var r = false;
			for (var a = 0, n = 0; a < e.length; ++a)
				switch (e.charCodeAt(a)) {
				case 34:
					r = !r;
					break;
				case 95: ;
				case 42: ;
				case 92:
					++a;
					break;
				case 59:
					t[t.length] = e.substr(n, a - n);
					n = a + 1;
				}
			t[t.length] = e.substr(n);
			if (r === true)
				throw new Error("Format |" + e + "| unterminated string ");
			return t
		}
		e._split = Z;
		var q = /\[[HhMmSs\u0E0A\u0E19\u0E17]*\]/;
		function Y(e) {
			var t = 0,
			r = "",
			a = "";
			while (t < e.length) {
				switch (r = e.charAt(t)) {
				case "G":
					if (f(e, t))
						t += 6;
					t++;
					break;
				case '"':
					for (; e.charCodeAt(++t) !== 34 && t < e.length; ) {}
					++t;
					break;
				case "\\":
					t += 2;
					break;
				case "_":
					t += 2;
					break;
				case "@":
					++t;
					break;
				case "B": ;
				case "b":
					if (e.charAt(t + 1) === "1" || e.charAt(t + 1) === "2")
						return true;
				case "M": ;
				case "D": ;
				case "Y": ;
				case "H": ;
				case "S": ;
				case "E": ;
				case "m": ;
				case "d": ;
				case "y": ;
				case "h": ;
				case "s": ;
				case "e": ;
				case "g":
					return true;
				case "A": ;
				case "a": ;
				case "上":
					if (e.substr(t, 3).toUpperCase() === "A/P")
						return true;
					if (e.substr(t, 5).toUpperCase() === "AM/PM")
						return true;
					if (e.substr(t, 5).toUpperCase() === "上午/下午")
						return true;
					++t;
					break;
				case "[":
					a = r;
					while (e.charAt(t++) !== "]" && t < e.length)
						a += e.charAt(t);
					if (a.match(q))
						return true;
					break;
				case ".": ;
				case "0": ;
				case "#":
					while (t < e.length && ("0#?.,E+-%".indexOf(r = e.charAt(++t)) > -1 || r == "\\" && e.charAt(t + 1) == "-" && "0#".indexOf(e.charAt(t + 2)) > -1)) {}
					break;
				case "?":
					while (e.charAt(++t) === r) {}
					break;
				case "*":
					++t;
					if (e.charAt(t) == " " || e.charAt(t) == "*")
						++t;
					break;
				case "(": ;
				case ")":
					++t;
					break;
				case "1": ;
				case "2": ;
				case "3": ;
				case "4": ;
				case "5": ;
				case "6": ;
				case "7": ;
				case "8": ;
				case "9":
					while (t < e.length && "0123456789".indexOf(e.charAt(++t)) > -1) {}
					break;
				case " ":
					++t;
					break;
				default:
					++t;
					break;
				}
			}
			return false
		}
		e.is_date = Y;
		function K(e, t, r, a) {
			var n = [],
			i = "",
			s = 0,
			o = "",
			l = "t",
			c,
			u,
			h;
			var d = "H";
			while (s < e.length) {
				switch (o = e.charAt(s)) {
				case "G":
					if (!f(e, s))
						throw new Error("unrecognized character " + o + " in " + e);
					n[n.length] = {
						t: "G",
						v: "General"
					};
					s += 7;
					break;
				case '"':
					for (i = ""; (h = e.charCodeAt(++s)) !== 34 && s < e.length; )
						i += String.fromCharCode(h);
					n[n.length] = {
						t: "t",
						v: i
					};
					++s;
					break;
				case "\\":
					var p = e.charAt(++s),
					m = p === "(" || p === ")" ? p : "t";
					n[n.length] = {
						t: m,
						v: p
					};
					++s;
					break;
				case "_":
					n[n.length] = {
						t: "t",
						v: " "
					};
					s += 2;
					break;
				case "@":
					n[n.length] = {
						t: "T",
						v: t
					};
					++s;
					break;
				case "B": ;
				case "b":
					if (e.charAt(s + 1) === "1" || e.charAt(s + 1) === "2") {
						if (c == null) {
							c = w(t, r, e.charAt(s + 1) === "2");
							if (c == null)
								return ""
						}
						n[n.length] = {
							t: "X",
							v: e.substr(s, 2)
						};
						l = o;
						s += 2;
						break
					};
				case "M": ;
				case "D": ;
				case "Y": ;
				case "H": ;
				case "S": ;
				case "E":
					o = o.toLowerCase();
				case "m": ;
				case "d": ;
				case "y": ;
				case "h": ;
				case "s": ;
				case "e": ;
				case "g": ;
				case "ว": ;
				case "ด": ;
				case "ป": ;
				case "ช": ;
				case "น": ;
				case "ท":
					if (t < 0)
						return "";
					if (c == null) {
						c = w(t, r);
						if (c == null)
							return ""
					}
					i = o;
					while (++s < e.length && e.charAt(s).toLowerCase() === o)
						i += o;
					if (o === "m" && l.toLowerCase() === "h")
						o = "M";
					if (o === "h")
						o = d;
					n[n.length] = {
						t: o,
						v: i
					};
					l = o;
					break;
				case "A": ;
				case "a": ;
				case "上":
					var v = {
						t: o,
						v: o
					};
					if (c == null)
						c = w(t, r);
					if (e.substr(s, 3).toUpperCase() === "A/P") {
						if (c != null)
							v.v = c.H >= 12 ? "P" : "A";
						v.t = "T";
						d = "h";
						s += 3
					} else if (e.substr(s, 5).toUpperCase() === "AM/PM") {
						if (c != null)
							v.v = c.H >= 12 ? "PM" : "AM";
						v.t = "T";
						s += 5;
						d = "h"
					} else if (e.substr(s, 5).toUpperCase() === "上午/下午") {
						if (c != null)
							v.v = c.H >= 12 ? "下午" : "上午";
						v.t = "T";
						s += 5;
						d = "h"
					} else {
						v.t = "t";
						++s
					}
					if (c == null && v.t === "T")
						return "";
					n[n.length] = v;
					l = o;
					break;
				case "[":
					i = o;
					while (e.charAt(s++) !== "]" && s < e.length)
						i += e.charAt(s);
					if (i.slice(-1) !== "]")
						throw 'unterminated "[" block: |' + i + "|";
					if (i.match(q)) {
						if (c == null) {
							c = w(t, r);
							if (c == null)
								return ""
						}
						n[n.length] = {
							t: "Z",
							v: i.toLowerCase()
						};
						l = i.charAt(1)
					} else if (i.indexOf("$") > -1) {
						i = (i.match(/\$([^-\[\]]*)/) || [])[1] || "$";
						if (!Y(e))
							n[n.length] = {
								t: "t",
								v: i
							}
					}
					break;
				case ".":
					if (c != null) {
						i = o;
						while (++s < e.length && (o = e.charAt(s)) === "0")
							i += o;
						n[n.length] = {
							t: "s",
							v: i
						};
						break
					};
				case "0": ;
				case "#":
					i = o;
					while (++s < e.length && "0#?.,E+-%".indexOf(o = e.charAt(s)) > -1)
						i += o;
					n[n.length] = {
						t: "n",
						v: i
					};
					break;
				case "?":
					i = o;
					while (e.charAt(++s) === o)
						i += o;
					n[n.length] = {
						t: o,
						v: i
					};
					l = o;
					break;
				case "*":
					++s;
					if (e.charAt(s) == " " || e.charAt(s) == "*")
						++s;
					break;
				case "(": ;
				case ")":
					n[n.length] = {
						t: a === 1 ? "t" : o,
						v: o
					};
					++s;
					break;
				case "1": ;
				case "2": ;
				case "3": ;
				case "4": ;
				case "5": ;
				case "6": ;
				case "7": ;
				case "8": ;
				case "9":
					i = o;
					while (s < e.length && "0123456789".indexOf(e.charAt(++s)) > -1)
						i += e.charAt(s);
					n[n.length] = {
						t: "D",
						v: i
					};
					break;
				case " ":
					n[n.length] = {
						t: o,
						v: o
					};
					++s;
					break;
				case "$":
					n[n.length] = {
						t: "t",
						v: F
					};
					++s;
					break;
				case "/":
					if (n.length > 0 && Y(n[n.length - 1].v))
						n[n.length] = {
							t: "t",
							v: N
						};
					else
						n[n.length] = {
							t: "t",
							v: "/"
						};
					++s;
					break;
				default:
					if (",$-+/():!^&'~{}<>=€acfijklopqrtuvwxzP".indexOf(o) === -1)
						throw new Error("unrecognized character " + o + " in " + e);
					n[n.length] = {
						t: "t",
						v: o
					};
					++s;
					break;
				}
			}
			var g = 0,
			b = 0,
			y;
			for (s = n.length - 1, l = "t"; s >= 0; --s) {
				switch (n[s].t) {
				case "h": ;
				case "H":
					n[s].t = d;
					l = "h";
					if (g < 1)
						g = 1;
					break;
				case "s":
					if (y = n[s].v.match(/\.0+$/))
						b = Math.max(b, y[0].length - 1);
					if (g < 3)
						g = 3;
				case "d": ;
				case "y": ;
				case "M": ;
				case "e":
					l = n[s].t;
					break;
				case "m":
					if (l === "s") {
						n[s].t = "M";
						if (g < 2)
							g = 2
					}
					break;
				case "X":
					break;
				case "Z":
					if (g < 1 && n[s].v.match(/[Hh]/))
						g = 1;
					if (g < 2 && n[s].v.match(/[Mm]/))
						g = 2;
					if (g < 3 && n[s].v.match(/[Ss]/))
						g = 3;
				}
			}
			switch (g) {
			case 0:
				break;
			case 1:
				if (c.u >= .5) {
					c.u = 0;
					++c.S
				}
				if (c.S >= 60) {
					c.S = 0;
					++c.M
				}
				if (c.M >= 60) {
					c.M = 0;
					++c.H
				}
				break;
			case 2:
				if (c.u >= .5) {
					c.u = 0;
					++c.S
				}
				if (c.S >= 60) {
					c.S = 0;
					++c.M
				}
				break;
			}
			var k = "",
			x;
			for (s = 0; s < n.length; ++s) {
				switch (n[s].t) {
				case "t": ;
				case "T": ;
				case " ": ;
				case "D":
					break;
				case "X":
					n[s].v = "";
					n[s].t = ";";
					break;
				case "d": ;
				case "m": ;
				case "y": ;
				case "h": ;
				case "H": ;
				case "M": ;
				case "s": ;
				case "e": ;
				case "b": ;
				case "Z": ;
				case "ว": ;
				case "ด": ;
				case "ป": ;
				case "ช": ;
				case "น": ;
				case "ท":
					n[s].v = X(n[s].t.charCodeAt(0), n[s].v, c, b);
					n[s].t = "t";
					break;
				case "n": ;
				case "?":
					x = s + 1;
					while (n[x] != null && ((o = n[x].t) === "?" || o === "D" || (o === " " || o === "t") && n[x + 1] != null && (n[x + 1].t === "?" || n[x + 1].t === "t" && n[x + 1].v === "/") || n[s].t === "(" && (o === " " || o === "n" || o === ")") || o === "t" && (n[x].v === "/" || n[x].v === " " && n[x + 1] != null && n[x + 1].t == "?"))) {
						n[s].v += n[x].v;
						n[x] = {
							v: "",
							t: ";"
						};
						++x
					}
					k += n[s].v;
					s = x - 1;
					break;
				case "G":
					n[s].t = "t";
					n[s].v = U(t, r);
					break;
				}
			}
			var _ = "",
			C,
			S;
			if (k.length > 0) {
				if (k.charCodeAt(0) == 40) {
					C = t < 0 && k.charCodeAt(0) === 45 ? -t : t;
					S = G("n", k, C)
				} else {
					C = t < 0 && a > 1 ? -t : t;
					S = G("n", k, C);
					if (C < 0 && n[0] && n[0].t == "t") {
						S = S.substr(1);
						n[0].v = "-" + n[0].v
					}
				}
				S = S.replace(/[,\.]/g, function (e) {
						return e == "." ? I : R
					});
				x = S.length - 1;
				var A = n.length;
				for (s = 0; s < n.length; ++s)
					if (n[s] != null && n[s].t != "t" && n[s].v.indexOf(".") > -1) {
						A = s;
						break
					}
				var T = n.length;
				if (A === n.length && S.indexOf("E") === -1) {
					for (s = n.length - 1; s >= 0; --s) {
						if (n[s] == null || "n?".indexOf(n[s].t) === -1)
							continue;
						if (x >= n[s].v.length - 1) {
							x -= n[s].v.length;
							n[s].v = S.substr(x + 1, n[s].v.length)
						} else if (x < 0)
							n[s].v = "";
						else {
							n[s].v = S.substr(0, x + 1);
							x = -1
						}
						n[s].t = "t";
						T = s
					}
					if (x >= 0 && T < n.length)
						n[T].v = S.substr(0, x + 1) + n[T].v
				} else if (A !== n.length && S.indexOf("E") === -1) {
					x = S.indexOf(I) - 1;
					for (s = A; s >= 0; --s) {
						if (n[s] == null || "n?".indexOf(n[s].t) === -1)
							continue;
						u = n[s].v.indexOf(".") > -1 && s === A ? n[s].v.indexOf(".") - 1 : n[s].v.length - 1;
						_ = n[s].v.substr(u + 1);
						for (; u >= 0; --u) {
							if (x >= 0 && (n[s].v.charAt(u) === "0" || n[s].v.charAt(u) === "#"))
								_ = S.charAt(x--) + _
						}
						n[s].v = _;
						n[s].t = "t";
						T = s
					}
					if (x >= 0 && T < n.length)
						n[T].v = S.substr(0, x + 1) + n[T].v;
					x = S.indexOf(I) + 1;
					for (s = A; s < n.length; ++s) {
						if (n[s] == null || "n?(".indexOf(n[s].t) === -1 && s !== A)
							continue;
						u = n[s].v.indexOf(I) > -1 && s === A ? n[s].v.indexOf(I) + 1 : 0;
						_ = n[s].v.substr(0, u);
						for (; u < n[s].v.length; ++u) {
							if (x < S.length)
								_ += S.charAt(x++)
						}
						n[s].v = _;
						n[s].t = "t";
						T = s
					}
				}
			}
			for (s = 0; s < n.length; ++s)
				if (n[s] != null && "n?".indexOf(n[s].t) > -1) {
					C = a > 1 && t < 0 && s > 0 && n[s - 1].v === "-" ? -t : t;
					n[s].v = G(n[s].t, n[s].v, C).replace(/\./g, I).replace(/,/, R);
					n[s].t = "t"
				}
			var E = "";
			for (s = 0; s !== n.length; ++s)
				if (n[s] != null)
					E += n[s].v;
			return E
		}
		e._eval = K;
		function J(e) {
			var t = 0,
			r = 0,
			a = "",
			n = "",
			i = "";
			var s = T.y || "y",
			o = s.toUpperCase();
			var l = T.d || "d",
			c = l.toUpperCase();
			var f = T["."];
			var u = T[","];
			var h = "0#?E+-%" + T[","] + f;
			while (t < e.length) {
				switch (a = e.charAt(t)) {
				case "G":
					t++;
					i += a;
					break;
				case '"':
					i += a;
					for (; (r = e.charCodeAt(++t)) !== 34 && t < e.length; ) {
						i += String.fromCharCode(r)
					}
					i += '"';
					++t;
					break;
				case "\\":
					i += e.slice(t, t + 2);
					t += 2;
					break;
				case "_":
					i += e.slice(t, t + 2);
					t += 2;
					break;
				case "@":
					i += a;
					++t;
					break;
				case "B": ;
				case "b":
					++t;
					i += a;
					break;
				case s: ;
				case o: ;
				case l: ;
				case c:
					i += E[a.toLowerCase()];
					++t;
					break;
				case "M": ;
				case "H": ;
				case "S": ;
				case "E":
					i += a;
					++t;
					break;
				case "m": ;
				case "h": ;
				case "s": ;
				case "e": ;
				case "g":
					i += a;
					++t;
					break;
				case "A": ;
				case "a":
					i += a;
					++t;
					break;
				case "[":
					n = a;
					while (e.charAt(t++) !== "]" && t < e.length)
						n += e.charAt(t);
					i += n;
					break;
				case u:
					i += '"' + a + '"';
					++t;
					break;
				case f:
					if (!(t < e.length && (h.indexOf(a = e.charAt(++t)) > -1 || a == "\\" && e.charAt(t + 1) == "-" && "0#".indexOf(e.charAt(t + 2)) > -1))) {
						i += '"' + f + '"';
						break
					}
					a = f;
					--t;
				case "0": ;
				case "#":
					i += E[a.toLowerCase()] || a;
					while (t < e.length && (h.indexOf(a = e.charAt(++t)) > -1 || a == "\\" && e.charAt(t + 1) == "-" && "0#".indexOf(e.charAt(t + 2)) > -1)) {
						i += E[a.toLowerCase()] || a
					}
					break;
				case "?":
					i += a;
					while (e.charAt(++t) === a)
						i += a;
					break;
				case "*":
					i += a;
					++t;
					if (e.charAt(t) == " " || e.charAt(t) == "*") {
						i += e.charAt(t);
						++t
					}
					break;
				case "(": ;
				case ")":
					i += a;
					++t;
					break;
				case "1": ;
				case "2": ;
				case "3": ;
				case "4": ;
				case "5": ;
				case "6": ;
				case "7": ;
				case "8": ;
				case "9":
					i += a;
					while (t < e.length && "0123456789".indexOf(e.charAt(++t)) > -1) {
						i += e.charAt(t)
					}
					break;
				case " ":
					i += a;
					++t;
					break;
				default:
					i += a;
					++t;
					break;
				}
			}
			return i
		}
		var Q = /\[[=<>]/;
		var ee = /\[(=|>[=]?|<[>=]?)(-?\d+(?:\.\d*)?)\]/;
		function te(e, t) {
			if (t == null)
				return false;
			var r = parseFloat(t[2]);
			switch (t[1]) {
			case "=":
				if (e == r)
					return true;
				break;
			case ">":
				if (e > r)
					return true;
				break;
			case "<":
				if (e < r)
					return true;
				break;
			case "<>":
				if (e != r)
					return true;
				break;
			case ">=":
				if (e >= r)
					return true;
				break;
			case "<=":
				if (e <= r)
					return true;
				break;
			}
			return false
		}
		function re(e, t) {
			var r = Z(e);
			var a = r.length,
			n = r[a - 1].indexOf("@");
			if (a < 4 && n > -1)
				--a;
			if (r.length > 4)
				throw new Error("cannot find right format for |" + r.join("|") + "|");
			if (typeof t !== "number")
				return [4, r.length === 4 || n > -1 ? r[r.length - 1] : "@"];
			switch (r.length) {
			case 1:
				r = n > -1 ? ["General", "General", "General", r[0]] : [r[0], r[0], r[0], "@"];
				break;
			case 2:
				r = n > -1 ? [r[0], r[0], r[0], r[1]] : [r[0], r[1], r[0], "@"];
				break;
			case 3:
				r = n > -1 ? [r[0], r[1], r[0], r[2]] : [r[0], r[1], r[2], "@"];
				break;
			case 4:
				break;
			}
			var i = t > 0 ? r[0] : t < 0 ? r[1] : r[2];
			if (r[0].indexOf("[") === -1 && r[1].indexOf("[") === -1)
				return [a, i];
			if (r[0].match(Q) != null || r[1].match(Q) != null) {
				var s = r[0].match(ee);
				var o = r[1].match(ee);
				return te(t, s) ? [a, r[0]] : te(t, o) ? [a, r[1]] : [a, r[s != null && o != null ? 2 : 1]]
			}
			return [a, i]
		}
		function ae(e, t, r) {
			if (r == null)
				r = {};
			var a = "";
			switch (typeof e) {
			case "string":
				if (e == "m/d/yy" && r.dateNF)
					a = r.dateNF;
				else
					a = e;
				break;
			case "number":
				if (e == 14 && r.dateNF)
					a = r.dateNF;
				else
					a = (r.table != null ? r.table : m)[e];
				if (a == null)
					a = r.table && r.table[v[e]] || m[v[e]];
				if (a == null)
					a = b[e] || "General";
				break;
			}
			if (f(a, 0))
				return U(t, r);
			if (t instanceof Date)
				t = C(t, r.date1904);
			var n = re(a, t);
			if (f(n[1]))
				return U(t, r);
			if (t === true)
				t = "TRUE";
			else if (t === false)
				t = "FALSE";
			else if (t === "" || t == null)
				return "";
			return K(n[1], t, r, n[0])
		}
		function ne(e, t) {
			if (typeof t != "number") {
				t = +t || -1;
				for (var r = 0; r < 392; ++r) {
					if (m[r] == undefined) {
						if (t < 0)
							t = r;
						continue
					}
					if (m[r] == e) {
						t = r;
						break
					}
				}
				if (t < 0)
					t = 391
			}
			m[t] = e;
			return t
		}
		e.load = ne;
		e._table = m;
		e.get_table = function oe() {
			return m
		};
		e.load_table = function le(e) {
			for (var t = 0; t != 392; ++t)
				if (e[t] !== undefined)
					ne(e[t], t)
		};
		e.init_table = p;
		e.format = ae;
		e.getlocale = L;
		e.setlocale = B;
		e.normalize = J;
		e.getcurrency = z;
		e.setcurrency = O
	};
	I(R);
	var N = {
		"General Number": "General",
		"General Date": R._table[22],
		"Long Date": "dddd, mmmm dd, yyyy",
		"Medium Date": R._table[15],
		"Short Date": R._table[14],
		"Long Time": R._table[19],
		"Medium Time": R._table[18],
		"Short Time": R._table[20],
		Currency: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
		Fixed: R._table[2],
		Standard: R._table[4],
		Percent: R._table[10],
		Scientific: R._table[11],
		"Yes/No": '"Yes";"Yes";"No";@',
		"True/False": '"True";"True";"False";@',
		"On/Off": '"Yes";"Yes";"No";@'
	};
	var L = {
		5: '"$"#,##0_);\\("$"#,##0\\)',
		6: '"$"#,##0_);[Red]\\("$"#,##0\\)',
		7: '"$"#,##0.00_);\\("$"#,##0.00\\)',
		8: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
		23: "General",
		24: "General",
		25: "General",
		26: "General",
		27: "m/d/yy",
		28: "m/d/yy",
		29: "m/d/yy",
		30: "m/d/yy",
		31: "m/d/yy",
		32: "h:mm:ss",
		33: "h:mm:ss",
		34: "h:mm:ss",
		35: "h:mm:ss",
		36: "m/d/yy",
		41: '_(* #,##0_);_(* (#,##0);_(* "-"_);_(@_)',
		42: '_("$"* #,##0_);_("$"* (#,##0);_("$"* "-"_);_(@_)',
		43: '_(* #,##0.00_);_(* (#,##0.00);_(* "-"??_);_(@_)',
		44: '_("$"* #,##0.00_);_("$"* (#,##0.00);_("$"* "-"??_);_(@_)',
		50: "m/d/yy",
		51: "m/d/yy",
		52: "m/d/yy",
		53: "m/d/yy",
		54: "m/d/yy",
		55: "m/d/yy",
		56: "m/d/yy",
		57: "m/d/yy",
		58: "m/d/yy",
		59: "0",
		60: "0.00",
		61: "#,##0",
		62: "#,##0.00",
		63: '"$"#,##0_);\\("$"#,##0\\)',
		64: '"$"#,##0_);[Red]\\("$"#,##0\\)',
		65: '"$"#,##0.00_);\\("$"#,##0.00\\)',
		66: '"$"#,##0.00_);[Red]\\("$"#,##0.00\\)',
		67: "0%",
		68: "0.00%",
		69: "# ?/?",
		70: "# ??/??",
		71: "m/d/yy",
		72: "m/d/yy",
		73: "d-mmm-yy",
		74: "d-mmm",
		75: "mmm-yy",
		76: "h:mm",
		77: "h:mm:ss",
		78: "m/d/yy h:mm",
		79: "mm:ss",
		80: "[h]:mm:ss",
		81: "mmss.0"
	};
	var B = /[dD]+|[mM]+|[yYeE]+|[Hh]+|[Ss]+/g;
	function M(e) {
		var t = typeof e == "number" ? R._table[e] : e;
		t = t.replace(B, "(\\d+)");
		return new RegExp("^" + t + "$")
	}
	function P(e, t, r) {
		var a = -1,
		n = -1,
		i = -1,
		s = -1,
		o = -1,
		l = -1;
		(t.match(B) || []).forEach(function (e, t) {
			var c = parseInt(r[t + 1], 10);
			switch (e.toLowerCase().charAt(0)) {
			case "y":
				a = c;
				break;
			case "d":
				i = c;
				break;
			case "h":
				s = c;
				break;
			case "s":
				l = c;
				break;
			case "m":
				if (s >= 0)
					o = c;
				else
					n = c;
				break;
			}
		});
		if (l >= 0 && o == -1 && n >= 0) {
			o = n;
			n = -1
		}
		var c = ("" + (a >= 0 ? a : (new Date).getFullYear())).slice(-4) + "-" + ("00" + (n >= 1 ? n : 1)).slice(-2) + "-" + ("00" + (i >= 1 ? i : 1)).slice(-2);
		if (c.length == 7)
			c = "0" + c;
		if (c.length == 8)
			c = "20" + c;
		var f = ("00" + (s >= 0 ? s : 0)).slice(-2) + ":" + ("00" + (o >= 0 ? o : 0)).slice(-2) + ":" + ("00" + (l >= 0 ? l : 0)).slice(-2);
		if (s == -1 && o == -1 && l == -1)
			return c;
		if (a == -1 && n == -1 && i == -1)
			return f;
		return c + "T" + f
	}
	var j;
	if (typeof require !== "undefined")
		try {
			j = require("fs")
		} catch (x) {}
	function W(e) {
		if (typeof e === "string")
			return A(e);
		if (Array.isArray(e))
			return E(e);
		return e
	}
	function U(e, t, r) {
		if (typeof j !== "undefined" && j.writeFileSync)
			return r ? j.writeFileSync(e, t, r) : j.writeFileSync(e, t);
		var a = r == "utf8" ? rt(t) : t;
		if (typeof IE_SaveFile !== "undefined")
			return IE_SaveFile(a, e);
		if (typeof Blob !== "undefined") {
			var n = new Blob([W(a)], {
					type: "application/octet-stream"
				});
			if (typeof navigator !== "undefined" && navigator.msSaveBlob)
				return navigator.msSaveBlob(n, e);
			if (typeof saveAs !== "undefined")
				return saveAs(n, e);
			if (typeof URL !== "undefined" && typeof document !== "undefined" && document.createElement && URL.createObjectURL) {
				var i = URL.createObjectURL(n);
				if (typeof chrome === "object" && typeof(chrome.downloads || {}).download == "function") {
					if (URL.revokeObjectURL && typeof setTimeout !== "undefined")
						setTimeout(function () {
							URL.revokeObjectURL(i)
						}, 6e4);
					return chrome.downloads.download({
						url: i,
						filename: e,
						saveAs: true
					})
				}
				var s = document.createElement("a");
				if (s.download != null) {
					s.download = e;
					s.href = i;
					document.body.appendChild(s);
					s.click();
					document.body.removeChild(s);
					if (URL.revokeObjectURL && typeof setTimeout !== "undefined")
						setTimeout(function () {
							URL.revokeObjectURL(i)
						}, 6e4);
					return i
				}
			}
		}
		if (typeof $ !== "undefined" && typeof File !== "undefined" && typeof Folder !== "undefined")
			try {
				var o = File(e);
				o.open("w");
				o.encoding = "binary";
				if (Array.isArray(t))
					t = T(t);
				o.write(t);
				o.close();
				return t
			} catch (l) {
				if (!l.message || !l.message.match(/onstruct/))
					throw l
			}
		throw new Error("cannot save file " + e)
	}
	function H(e) {
		if (typeof j !== "undefined")
			return j.readFileSync(e);
		if (typeof $ !== "undefined" && typeof File !== "undefined" && typeof Folder !== "undefined")
			try {
				var t = File(e);
				t.open("r");
				t.encoding = "binary";
				var r = t.read();
				t.close();
				return r
			} catch (a) {
				if (!a.message || !a.message.match(/onstruct/))
					throw a
			}
		throw new Error("Cannot access file " + e)
	}
	function X(e) {
		var t = Object.keys(e),
		r = [];
		for (var a = 0; a < t.length; ++a)
			if (Object.prototype.hasOwnProperty.call(e, t[a]))
				r.push(t[a]);
		return r
	}
	function V(e, t) {
		var r = [],
		a = X(e);
		for (var n = 0; n !== a.length; ++n)
			if (r[e[a[n]][t]] == null)
				r[e[a[n]][t]] = a[n];
		return r
	}
	function G(e) {
		var t = [],
		r = X(e);
		for (var a = 0; a !== r.length; ++a)
			t[e[r[a]]] = r[a];
		return t
	}
	function Z(e) {
		var t = [],
		r = X(e);
		for (var a = 0; a !== r.length; ++a)
			t[e[r[a]]] = parseInt(r[a], 10);
		return t
	}
	function q(e) {
		var t = [],
		r = X(e);
		for (var a = 0; a !== r.length; ++a) {
			if (t[e[r[a]]] == null)
				t[e[r[a]]] = [];
			t[e[r[a]]].push(r[a])
		}
		return t
	}
	var Y = new Date(1899, 11, 30, 0, 0, 0);
	var K = 0;
	var J,
	Q;
	function ee() {
		K = Y.getTime() + ((new Date).getTimezoneOffset() - Y.getTimezoneOffset()) * 6e4;
		J = function e(t, r) {
			var a = t.getTime();
			if (r)
				a -= 1462 * 24 * 60 * 60 * 1e3;
			return (a - K) / (24 * 60 * 60 * 1e3)
		};
		Q = function t(e) {
			var t = new Date;
			t.setTime(e * 24 * 60 * 60 * 1e3 + K);
			return t
		}
	}
	function te() {
		var e = new Date;
		K = Y.getTime() + (e.getTimezoneOffset() - Y.getTimezoneOffset()) * 6e4;
		var t = e.getTimezoneOffset();
		J = function r(e, t) {
			var r = e.getTime();
			if (t)
				r -= 1462 * 24 * 60 * 60 * 1e3;
			var a = Y.getTime() + (e.getTimezoneOffset() - Y.getTimezoneOffset()) * 6e4;
			return (r - a) / (24 * 60 * 60 * 1e3)
		};
		Q = function a(e) {
			var r = new Date;
			r.setTime(e * 24 * 60 * 60 * 1e3 + K);
			if (r.getTimezoneOffset() !== t) {
				r.setTime(r.getTime() + (r.getTimezoneOffset() - t) * 6e4)
			}
			return r
		}
	}
	ee();
	function re(e) {
		switch (e) {
		case 0:
			ee();
			break;
		case 1:
			te();
			break;
		}
	}
	function ae(e) {
		var t = 0,
		r = 0,
		a = false;
		var n = e.match(/P([0-9\.]+Y)?([0-9\.]+M)?([0-9\.]+D)?T([0-9\.]+H)?([0-9\.]+M)?([0-9\.]+S)?/);
		if (!n)
			throw new Error("|" + e + "| is not an ISO8601 Duration");
		for (var i = 1; i != n.length; ++i) {
			if (!n[i])
				continue;
			r = 1;
			if (i > 3)
				a = true;
			switch (n[i].slice(n[i].length - 1)) {
			case "Y":
				throw new Error("Unsupported ISO Duration Field: " + n[i].slice(n[i].length - 1));
			case "D":
				r *= 24;
			case "H":
				r *= 60;
			case "M":
				if (!a)
					throw new Error("Unsupported ISO Duration Field: M");
				else
					r *= 60;
			case "S":
				break;
			}
			t += r * parseInt(n[i], 10)
		}
		return t
	}
	var ne = new Date("2017-02-19T19:06:09.000Z");
	if (isNaN(ne.getFullYear()))
		ne = new Date("2/19/17");
	var ie = ne.getFullYear() == 2017;
	function se(e, t) {
		var r = new Date(e);
		if (ie) {
			if (t > 0)
				r.setTime(r.getTime() + r.getTimezoneOffset() * 60 * 1e3);
			else if (t < 0)
				r.setTime(r.getTime() - r.getTimezoneOffset() * 60 * 1e3);
			return r
		}
		if (e instanceof Date)
			return e;
		if (ne.getFullYear() == 1917 && !isNaN(r.getFullYear())) {
			var a = r.getFullYear();
			if (e.indexOf("" + a) > -1)
				return r;
			r.setFullYear(r.getFullYear() + 100);
			return r
		}
		var n = e.match(/\d+/g) || ["2017", "2", "19", "0", "0", "0"];
		var i = new Date(+n[0], +n[1] - 1, +n[2], +n[3] || 0, +n[4] || 0, +n[5] || 0);
		if (e.indexOf("Z") > -1)
			i = new Date(i.getTime() - i.getTimezoneOffset() * 60 * 1e3);
		return i
	}
	function oe(e) {
		var t = "";
		for (var r = 0; r != e.length; ++r)
			t += String.fromCharCode(e[r]);
		return t
	}
	function le(e) {
		if (typeof e !== "object" || e == null)
			return e;
		if (e instanceof Date)
			return new Date(e.getTime());
		if (Array.isArray(e))
			return ce(e);
		var t = {};
		for (var r in e)
			if (Object.prototype.hasOwnProperty.call(e, r))
				t[r] = le(e[r]);
		return t
	}
	function ce(e) {
		var t = [];
		for (var r = 0; r < e.length; ++r) {
			var a = e[r];
			if (typeof a === "object")
				t[r] = le(a);
			else if (a != null)
				t[r] = a
		}
		return t
	}
	function fe(e, t) {
		if (typeof t != "object" || t == null)
			return e;
		for (var r in t)
			if (Object.prototype.hasOwnProperty.call(t, r))
				e[r] = le(t[r]);
		return e
	}
	function ue(e, t) {
		var r = "";
		while (r.length < t)
			r += e;
		return r
	}
	function he(e) {
		var t = Number(e);
		if (!isNaN(t))
			return t;
		if (!/\d/.test(e))
			return t;
		var r = 1;
		var a = e.replace(/([\d]),([\d])/g, "$1$2").replace(/[$]/g, "").replace(/[%]/g, function () {
				r *= 100;
				return ""
			});
		if (!isNaN(t = Number(a)))
			return t / r;
		a = a.replace(/[(](.*)[)]/, function (e, t) {
				r = -r;
				return t
			});
		if (!isNaN(t = Number(a)))
			return t / r;
		return t
	}
	function de(e) {
		var t = new Date(e),
		r = new Date(NaN);
		var a = t.getYear(),
		n = t.getMonth(),
		i = t.getDate();
		if (isNaN(i))
			return r;
		if (a < 0 || a > 8099)
			return r;
		if ((n > 0 || i > 1) && a != 101)
			return t;
		if (e.toLowerCase().match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/))
			return t;
		if (e.match(/[^-0-9:,\/\\]/))
			return r;
		return t
	}
	function pe(e, t) {
		if (t && t.raw)
			return {
				t: "s",
				v: e
			};
		else if (!e)
			return {
				t: "z"
			};
		else if (e === "TRUE")
			return {
				t: "b",
				v: true
			};
		else if (e === "FALSE")
			return {
				t: "b",
				v: false
			};
		var r = "";
		var a = Number(e);
		e: {
			if (!isNaN(a))
				return {
					t: "n",
					v: a
				};
			if (!/\d/.test(e))
				break e;
			var n = 1;
			var i = e.replace(/([\d]),([\d])/g, function (e, t, a) {
					if (!r)
						r = "#,##0";
					return t + a
				}).replace(/[$]/g, "").replace(/\.\d*/, function (e) {
					if (!r)
						r = "0";
					r += ".";
					for (var t = 2; t <= e.length; ++t)
						r = r + "0";
					return e
				}).replace(/[%]/g, function () {
					n *= 100;
					if (!r)
						r = "0";
					r += "%";
					return ""
				});
			if (!isNaN(a = Number(i)))
				return {
					t: "n",
					v: a / n,
					z: r
				};
			i = i.replace(/[(](.*)[)]/, function (e, t) {
					n = -n;
					return t
				});
			if (!isNaN(a = Number(i)))
				return {
					t: "n",
					v: a / n,
					z: (r || "0") + "_);(" + (r || "0") + ");@"
				}
		}
		e: if (!(t && t.rawDates)) {
			var s = t && t.cellDates;
			var o = new Date(e),
			l = new Date(NaN);
			var c = o.getYear(),
			f = o.getMonth(),
			u = o.getDate();
			if (isNaN(u))
				break e;
			if (c < 0 || c > 8099)
				break e;
			if ((f > 0 || u > 1) && c != 101)
				return {
					t: s ? "d" : "n",
					v: s ? o : J(o),
					z: t.dateNF || R._table[14]
				};
			if (e.toLowerCase().match(/jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/))
				return {
					t: s ? "d" : "n",
					v: s ? o : J(o),
					z: t.dateNF || R._table[14]
				};
			if (e.match(/[^-0-9:,\/\\]/))
				break e;
			return o
		}
		return {
			t: "s",
			v: e
		}
	}
	var me = "abacaba".split(/(:?b)/i).length == 5;
	function ve(e, t, r) {
		if (me || typeof t == "string")
			return e.split(t);
		var a = e.split(t),
		n = [a[0]];
		for (var i = 1; i < a.length; ++i) {
			n.push(r);
			n.push(a[i])
		}
		return n
	}
	function ge(e, t) {
		if (t == 0)
			return e[0];
		if (t == 100)
			return e[e.length - 1];
		var r = e.length - 1;
		var a = t / 100 * r;
		var n = a - Math.floor(a);
		return n * e[Math.ceil(a)] + (1 - n) * e[Math.floor(a)]
	}
	function be(e) {
		return e != null && !e
	}
	function ye(e) {
		return e.charAt(0).toUpperCase() + e.slice(1)
	}
	function we(e) {
		if (!e)
			return null;
		if (e.data)
			return d(e.data);
		if (e.asNodeBuffer && y)
			return d(e.asNodeBuffer().toString("binary"));
		if (e.asBinary)
			return d(e.asBinary());
		if (e._data && e._data.getContent)
			return d(oe(Array.prototype.slice.call(e._data.getContent(), 0)));
		if (e.content && e.type)
			return d(oe(e.content));
		return null
	}
	function ke(e) {
		if (!e)
			return null;
		if (e.data)
			return f(e.data);
		if (e.asNodeBuffer && y)
			return e.asNodeBuffer();
		if (e._data && e._data.getContent) {
			var t = e._data.getContent();
			if (typeof t == "string")
				return f(t);
			return Array.prototype.slice.call(t)
		}
		if (e.content && e.type)
			return e.content;
		return null
	}
	function xe(e) {
		return e && e.name.slice(-4) === ".bin" ? ke(e) : we(e)
	}
	function _e(e, t) {
		var r = e.FullPaths || X(e.files);
		var a = t.toLowerCase(),
		n = a.replace(/\//g, "\\");
		for (var i = 0; i < r.length; ++i) {
			var s = r[i].toLowerCase();
			if (a == s || n == s)
				return e.files[r[i]]
		}
		return null
	}
	function Ce(e, t) {
		var r = _e(e, t);
		if (r == null)
			throw new Error("Cannot find file " + t + " in zip");
		return r
	}
	function Se(e, t, r) {
		if (!r)
			return xe(Ce(e, t));
		if (!t)
			return null;
		try {
			return Se(e, t)
		} catch (a) {
			return null
		}
	}
	function Ae(e, t, r) {
		if (!r)
			return we(Ce(e, t));
		if (!t)
			return null;
		try {
			return Ae(e, t)
		} catch (a) {
			return null
		}
	}
	function Te(e, t, r) {
		if (!r)
			return ke(Ce(e, t));
		if (!t)
			return null;
		try {
			return Te(e, t)
		} catch (a) {
			return null
		}
	}
	function Ee(e) {
		var t = e.FullPaths || X(e.files),
		r = [];
		for (var a = 0; a < t.length; ++a)
			if (t[a].slice(-1) != "/")
				r.push(t[a]);
		return r.sort()
	}
	function Fe(e, t, r) {
		if (e.FullPaths)
			CFB.utils.cfb_add(e, t, r);
		else
			e.file(t, r)
	}
	var De;
	if (typeof JSZipSync !== "undefined")
		De = JSZipSync;
	if (typeof exports !== "undefined") {
		if (typeof module !== "undefined" && module.exports) {
			if (typeof De === "undefined")
				De = require("./jszip.js")
		}
	}
	function ze() {
		if (!De)
			return CFB.utils.cfb_new();
		return new De
	}
	function Oe(e, t) {
		var r;
		if (De)
			switch (t.type) {
			case "base64":
				r = new De(e, {
						base64: true
					});
				break;
			case "binary": ;
			case "array":
				r = new De(e, {
						base64: false
					});
				break;
			case "buffer":
				r = new De(e);
				break;
			default:
				throw new Error("Unrecognized type " + t.type);
			}
		else
			switch (t.type) {
			case "base64":
				r = CFB.read(e, {
						type: "base64"
					});
				break;
			case "binary":
				r = CFB.read(e, {
						type: "binary"
					});
				break;
			case "buffer": ;
			case "array":
				r = CFB.read(e, {
						type: "buffer"
					});
				break;
			default:
				throw new Error("Unrecognized type " + t.type);
			}
		return r
	}
	function Re(e, t) {
		if (e.charAt(0) == "/")
			return e.slice(1);
		var r = t.split("/");
		if (t.slice(-1) != "/")
			r.pop();
		var a = e.split("/");
		while (a.length !== 0) {
			var n = a.shift();
			if (n === "..")
				r.pop();
			else if (n !== ".")
				r.push(n)
		}
		return r.join("/")
	}
	var Ie = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r\n';
	var Ne = /(?:[^"\s?>\/]+)\s*=\s*((?:")(?:[^"]*?)(?:")|(?:')(?:[^']*?)(?:')|(?:[^'">\s]+))/g;
	var Le = /<[\/\?]?[a-zA-Z0-9:_-]+(?:\s+[^"\s?>\/]+\s*=\s*(?:"[^"]*"|'[^']*'|[^'">\s=]+))*\s?[\/\?]?>/g;
	if (!Ie.match(Le))
		Le = /<[^>]*>/g;
	var Be = /<\w*:/,
	Me = /<(\/?)\w+:/;
	function Pe(e, t, r) {
		var a = {};
		var n = 0,
		i = 0;
		for (; n !== e.length; ++n)
			if ((i = e.charCodeAt(n)) === 32 || i === 10 || i === 13)
				break;
		if (!t)
			a[0] = e.slice(0, n);
		if (n === e.length)
			return a;
		var s = e.match(Ne),
		o = 0,
		l = "",
		c = 0,
		f = "",
		u = "",
		h = 1;
		if (s)
			for (c = 0; c != s.length; ++c) {
				u = s[c];
				for (i = 0; i != u.length; ++i)
					if (u.charCodeAt(i) === 61)
						break;
				f = u.slice(0, i).trim();
				while (u.charCodeAt(i + 1) == 32)
					++i;
				h = (n = u.charCodeAt(i + 1)) == 34 || n == 39 ? 1 : 0;
				l = u.slice(i + 1 + h, u.length - h);
				for (o = 0; o != f.length; ++o)
					if (f.charCodeAt(o) === 58)
						break;
				if (o === f.length) {
					if (f.indexOf("_") > 0)
						f = f.slice(0, f.indexOf("_"));
					a[f] = l;
					if (!r)
						a[f.toLowerCase()] = l
				} else {
					var d = (o === 5 && f.slice(0, 5) === "xmlns" ? "xmlns" : "") + f.slice(o + 1);
					if (a[d] && f.slice(o - 3, o) == "ext")
						continue;
					a[d] = l;
					if (!r)
						a[d.toLowerCase()] = l
				}
			}
		return a
	}
	function je(e) {
		return e.replace(Me, "<$1");
	}
	var We = {
		"&quot;": '"',
		"&apos;": "'",
		"&gt;": ">",
		"&lt;": "<",
		"&amp;": "&"
	};
	var Ue = G(We);
	var $e = function () {
		var e = /&(?:quot|apos|gt|lt|amp|#x?([\da-fA-F]+));/gi,
		t = /_x([\da-fA-F]{4})_/gi;
		return function r(a) {
			var n = a + "",
			i = n.indexOf("<![CDATA[");
			if (i == -1)
				return n.replace(e, function (e, t) {
					return We[e] || String.fromCharCode(parseInt(t, e.indexOf("x") > -1 ? 16 : 10)) || e
				}).replace(t, function (e, t) {
					return String.fromCharCode(parseInt(t, 16))
				});
			var s = n.indexOf("]]>");
			return r(n.slice(0, i)) + n.slice(i + 9, s) + r(n.slice(s + 3))
		}
	}
	();
	var He = /[&<>'"]/g,
	Xe = /[\u0000-\u0008\u000b-\u001f]/g;
	function Ve(e) {
		var t = e + "";
		return t.replace(He, function (e) {
			return Ue[e]
		}).replace(Xe, function (e) {
			return "_x" + ("000" + e.charCodeAt(0).toString(16)).slice(-4) + "_"
		})
	}
	function Ge(e) {
		return Ve(e).replace(/\n/g, "_x000a_")
	}
	function Ze(e) {
		return Ve(e).replace(/ /g, "_x0020_")
	}
	var qe = /[\u0000-\u001f]/g;
	function Ye(e) {
		var t = e + "";
		return t.replace(He, function (e) {
			return Ue[e]
		}).replace(/\n/g, "<br/>").replace(qe, function (e) {
			return "&#x" + ("000" + e.charCodeAt(0).toString(16)).slice(-4) + ";"
		})
	}
	function Ke(e) {
		var t = e + "";
		return t.replace(He, function (e) {
			return Ue[e]
		}).replace(qe, function (e) {
			return "&#x" + e.charCodeAt(0).toString(16).toUpperCase() + ";"
		})
	}
	var Je = function () {
		var e = /&#(\d+);/g;
		function t(e, t) {
			return String.fromCharCode(parseInt(t, 10))
		}
		return function r(a) {
			return a.replace(e, t)
		}
	}
	();
	var Qe = function () {
		return function e(t) {
			return t.replace(/(\r\n|[\r\n])/g, "&#10;")
		}
	}
	();
	function et(e) {
		switch (e) {
		case 1: ;
		case true: ;
		case "1": ;
		case "true": ;
		case "TRUE":
			return true;
		default:
			return false;
		}
	}
	var tt = function Kf(e) {
		var t = "",
		r = 0,
		a = 0,
		n = 0,
		i = 0,
		s = 0,
		o = 0;
		while (r < e.length) {
			a = e.charCodeAt(r++);
			if (a < 128) {
				t += String.fromCharCode(a);
				continue
			}
			n = e.charCodeAt(r++);
			if (a > 191 && a < 224) {
				s = (a & 31) << 6;
				s |= n & 63;
				t += String.fromCharCode(s);
				continue
			}
			i = e.charCodeAt(r++);
			if (a < 240) {
				t += String.fromCharCode((a & 15) << 12 | (n & 63) << 6 | i & 63);
				continue
			}
			s = e.charCodeAt(r++);
			o = ((a & 7) << 18 | (n & 63) << 12 | (i & 63) << 6 | s & 63) - 65536;
			t += String.fromCharCode(55296 + (o >>> 10 & 1023));
			t += String.fromCharCode(56320 + (o & 1023))
		}
		return t
	};
	var rt = function (e) {
		var t = [],
		r = 0,
		a = 0,
		n = 0;
		while (r < e.length) {
			a = e.charCodeAt(r++);
			switch (true) {
			case a < 128:
				t.push(String.fromCharCode(a));
				break;
			case a < 2048:
				t.push(String.fromCharCode(192 + (a >> 6)));
				t.push(String.fromCharCode(128 + (a & 63)));
				break;
			case a >= 55296 && a < 57344:
				a -= 55296;
				n = e.charCodeAt(r++) - 56320 + (a << 10);
				t.push(String.fromCharCode(240 + (n >> 18 & 7)));
				t.push(String.fromCharCode(144 + (n >> 12 & 63)));
				t.push(String.fromCharCode(128 + (n >> 6 & 63)));
				t.push(String.fromCharCode(128 + (n & 63)));
				break;
			default:
				t.push(String.fromCharCode(224 + (a >> 12)));
				t.push(String.fromCharCode(128 + (a >> 6 & 63)));
				t.push(String.fromCharCode(128 + (a & 63)));
			}
		}
		return t.join("")
	};
	if (y) {
		var at = function Jf(e) {
			var t = Buffer.alloc(2 * e.length),
			r,
			a,
			n = 1,
			i = 0,
			s = 0,
			o;
			for (a = 0; a < e.length; a += n) {
				n = 1;
				if ((o = e.charCodeAt(a)) < 128)
					r = o;
				else if (o < 224) {
					r = (o & 31) * 64 + (e.charCodeAt(a + 1) & 63);
					n = 2
				} else if (o < 240) {
					r = (o & 15) * 4096 + (e.charCodeAt(a + 1) & 63) * 64 + (e.charCodeAt(a + 2) & 63);
					n = 3
				} else {
					n = 4;
					r = (o & 7) * 262144 + (e.charCodeAt(a + 1) & 63) * 4096 + (e.charCodeAt(a + 2) & 63) * 64 + (e.charCodeAt(a + 3) & 63);
					r -= 65536;
					s = 55296 + (r >>> 10 & 1023);
					r = 56320 + (r & 1023)
				}
				if (s !== 0) {
					t[i++] = s & 255;
					t[i++] = s >>> 8;
					s = 0
				}
				t[i++] = r % 256;
				t[i++] = r >>> 8
			}
			return t.slice(0, i).toString("ucs2")
		};
		var nt = "foo bar bazâð£";
		if (tt(nt) == at(nt))
			tt = at;
		var it = function Qf(e) {
			return w(e, "binary").toString("utf8")
		};
		if (tt(nt) == it(nt))
			tt = it;
		rt = function (e) {
			return w(e, "utf8").toString("binary")
		}
	}
	var st = function () {
		var e = {};
		return function t(r, a) {
			var n = r + "|" + (a || "");
			if (e[n])
				return e[n];
			return e[n] = new RegExp("<(?:\\w+:)?" + r + '(?: xml:space="preserve")?(?:[^>]*)>([\\s\\S]*?)</(?:\\w+:)?' + r + ">", a || "")
		}
	}
	();
	var ot = function () {
		var e = [["nbsp", " "], ["middot", "·"], ["quot", '"'], ["apos", "'"], ["gt", ">"], ["lt", "<"], ["amp", "&"]].map(function (e) {
			return [new RegExp("&" + e[0] + ";", "ig"), e[1]]
		});
		return function t(r) {
			var a = r.replace(/^[\t\n\r ]+/, "").replace(/[\t\n\r ]+$/, "").replace(/[\t\n\r ]+/g, " ").replace(/<\s*[bB][rR]\s*\/?>/g, "\n").replace(/<[^>]*>/g, "");
			for (var n = 0; n < e.length; ++n)
				a = a.replace(e[n][0], e[n][1]);
			return a
		}
	}
	();
	var lt = function () {
		var e = {};
		return function t(r) {
			if (e[r] !== undefined)
				return e[r];
			return e[r] = new RegExp("<(?:vt:)?" + r + ">([\\s\\S]*?)</(?:vt:)?" + r + ">", "g")
		}
	}
	();
	var ct = /<\/?(?:vt:)?variant>/g,
	ft = /<(?:vt:)([^>]*)>([\s\S]*)</;
	function ut(e, t) {
		var r = Pe(e);
		var a = e.match(lt(r.baseType)) || [];
		var n = [];
		if (a.length != r.size) {
			if (t.WTF)
				throw new Error("unexpected vector length " + a.length + " != " + r.size);
			return n
		}
		a.forEach(function (e) {
			var t = e.replace(ct, "").match(ft);
			if (t)
				n.push({
					v: tt(t[2]),
					t: t[1]
				})
		});
		return n
	}
	var ht = /(^\s|\s$|\n)/;
	function dt(e, t) {
		return "<" + e + (t.match(ht) ? ' xml:space="preserve"' : "") + ">" + t + "</" + e + ">"
	}
	function pt(e) {
		return X(e).map(function (t) {
			return " " + t + '="' + e[t] + '"'
		}).join("")
	}
	function mt(e, t, r) {
		return "<" + e + (r != null ? pt(r) : "") + (t != null ? (t.match(ht) ? ' xml:space="preserve"' : "") + ">" + t + "</" + e : "/") + ">"
	}
	function vt(e) {
		return X(e).map(function (t) {
			return " " + t + '="' + Ve(e[t]) + '"'
		}).join("")
	}
	function gt(e, t, r) {
		return "<" + e + (r != null ? vt(r) : "") + (t != null ? (t.match(ht) ? ' xml:space="preserve"' : "") + ">" + Ve(t) + "</" + e : "/") + ">"
	}
	function bt(e, t) {
		try {
			return e.toISOString().replace(/\.\d*/, "")
		} catch (r) {
			if (t)
				throw r
		}
		return ""
	}
	function yt(e, t) {
		switch (typeof e) {
		case "string":
			var r = mt("vt:lpwstr", Ve(e));
			if (t)
				r = r.replace(/&quot;/g, "_x0022_");
			return r;
		case "number":
			return mt((e | 0) == e ? "vt:i4" : "vt:r8", Ve(String(e)));
		case "boolean":
			return mt("vt:bool", e ? "true" : "false");
		}
		if (e instanceof Date)
			return mt("vt:filetime", bt(e));
		throw new Error("Unable to serialize " + e)
	}
	var wt = {
		dc: "http://purl.org/dc/elements/1.1/",
		dcterms: "http://purl.org/dc/terms/",
		dcmitype: "http://purl.org/dc/dcmitype/",
		mx: "http://schemas.microsoft.com/office/mac/excel/2008/main",
		r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
		sjs: "http://schemas.openxmlformats.org/package/2006/sheetjs/core-properties",
		vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes",
		xsi: "http://www.w3.org/2001/XMLSchema-instance",
		xsd: "http://www.w3.org/2001/XMLSchema"
	};
	wt.main = ["http://schemas.openxmlformats.org/spreadsheetml/2006/main", "http://purl.oclc.org/ooxml/spreadsheetml/main", "http://schemas.microsoft.com/office/excel/2006/main", "http://schemas.microsoft.com/office/excel/2006/2"];
	var kt = {
		o: "urn:schemas-microsoft-com:office:office",
		x: "urn:schemas-microsoft-com:office:excel",
		ss: "urn:schemas-microsoft-com:office:spreadsheet",
		dt: "uuid:C2F41010-65B3-11d1-A29F-00AA00C14882",
		mv: "http://macVmlSchemaUri",
		v: "urn:schemas-microsoft-com:vml",
		html: "http://www.w3.org/TR/REC-html40"
	};
	function xt(e, t) {
		var r = 1 - 2 * (e[t + 7] >>> 7);
		var a = ((e[t + 7] & 127) << 4) + (e[t + 6] >>> 4 & 15);
		var n = e[t + 6] & 15;
		for (var i = 5; i >= 0; --i)
			n = n * 256 + e[t + i];
		if (a == 2047)
			return n == 0 ? r * Infinity : NaN;
		if (a == 0)
			a = -1022;
		else {
			a -= 1023;
			n += Math.pow(2, 52)
		}
		return r * Math.pow(2, a - 52) * n
	}
	function _t(e, t, r) {
		var a = (t < 0 || 1 / t == -Infinity ? 1 : 0) << 7,
		n = 0,
		i = 0;
		var s = a ? -t : t;
		if (!isFinite(s)) {
			n = 2047;
			i = isNaN(t) ? 26985 : 0
		} else if (s == 0)
			n = i = 0;
		else {
			n = Math.floor(Math.log(s) / Math.LN2);
			i = s * Math.pow(2, 52 - n);
			if (n <= -1023 && (!isFinite(i) || i < Math.pow(2, 52))) {
				n = -1022
			} else {
				i -= Math.pow(2, 52);
				n += 1023
			}
		}
		for (var o = 0; o <= 5; ++o, i /= 256)
			e[r + o] = i & 255;
		e[r + 6] = (n & 15) << 4 | i & 15;
		e[r + 7] = n >> 4 | a
	}
	var Ct = function (e) {
		var t = [],
		r = 10240;
		for (var a = 0; a < e[0].length; ++a)
			if (e[0][a])
				for (var n = 0, i = e[0][a].length; n < i; n += r)
					t.push.apply(t, e[0][a].slice(n, n + r));
		return t
	};
	var St = Ct;
	var At = function (e, t, r) {
		var a = [];
		for (var n = t; n < r; n += 2)
			a.push(String.fromCharCode(Vt(e, n)));
		return a.join("").replace(z, "")
	};
	var Tt = At;
	var Et = function (e, t, r) {
		var a = [];
		for (var n = t; n < t + r; ++n)
			a.push(("0" + e[n].toString(16)).slice(-2));
		return a.join("")
	};
	var Ft = Et;
	var Dt = function (e, t, r) {
		var a = [];
		for (var n = t; n < r; n++)
			a.push(String.fromCharCode(Xt(e, n)));
		return a.join("")
	};
	var zt = Dt;
	var Ot = function (e, t) {
		var r = Zt(e, t);
		return r > 0 ? Dt(e, t + 4, t + 4 + r - 1) : ""
	};
	var Rt = Ot;
	var It = function (e, t) {
		var r = Zt(e, t);
		return r > 0 ? Dt(e, t + 4, t + 4 + r - 1) : ""
	};
	var Nt = It;
	var Lt = function (e, t) {
		var r = 2 * Zt(e, t);
		return r > 0 ? Dt(e, t + 4, t + 4 + r - 1) : ""
	};
	var Bt = Lt;
	var Mt,
	Pt;
	Mt = Pt = function eu(e, t) {
		var r = Zt(e, t);
		return r > 0 ? At(e, t + 4, t + 4 + r) : ""
	};
	var jt = function (e, t) {
		var r = Zt(e, t);
		return r > 0 ? Dt(e, t + 4, t + 4 + r) : ""
	};
	var Wt = jt;
	var Ut,
	$t;
	Ut = $t = function (e, t) {
		return xt(e, t)
	};
	var Ht = function tu(e) {
		return Array.isArray(e)
	};
	if (y) {
		At = function (e, t, r) {
			if (!Buffer.isBuffer(e))
				return Tt(e, t, r);
			return e.toString("utf16le", t, r).replace(z, "")
		};
		Et = function (e, t, r) {
			return Buffer.isBuffer(e) ? e.toString("hex", t, t + r) : Ft(e, t, r)
		};
		Ot = function ru(e, t) {
			if (!Buffer.isBuffer(e))
				return Rt(e, t);
			var r = e.readUInt32LE(t);
			return r > 0 ? e.toString("utf8", t + 4, t + 4 + r - 1) : ""
		};
		It = function au(e, t) {
			if (!Buffer.isBuffer(e))
				return Nt(e, t);
			var r = e.readUInt32LE(t);
			return r > 0 ? e.toString("utf8", t + 4, t + 4 + r - 1) : ""
		};
		Lt = function nu(e, t) {
			if (!Buffer.isBuffer(e))
				return Bt(e, t);
			var r = 2 * e.readUInt32LE(t);
			return e.toString("utf16le", t + 4, t + 4 + r - 1)
		};
		Mt = function iu(e, t) {
			if (!Buffer.isBuffer(e))
				return Pt(e, t);
			var r = e.readUInt32LE(t);
			return e.toString("utf16le", t + 4, t + 4 + r)
		};
		jt = function su(e, t) {
			if (!Buffer.isBuffer(e))
				return Wt(e, t);
			var r = e.readUInt32LE(t);
			return e.toString("utf8", t + 4, t + 4 + r)
		};
		Dt = function ou(e, t, r) {
			return Buffer.isBuffer(e) ? e.toString("utf8", t, r) : zt(e, t, r)
		};
		Ct = function (e) {
			return e[0].length > 0 && Buffer.isBuffer(e[0][0]) ? Buffer.concat(e[0]) : St(e)
		};
		D = function (e) {
			return Buffer.isBuffer(e[0]) ? Buffer.concat(e) : [].concat.apply([], e)
		};
		Ut = function lu(e, t) {
			if (Buffer.isBuffer(e))
				return e.readDoubleLE(t);
			return $t(e, t)
		};
		Ht = function cu(e) {
			return Buffer.isBuffer(e) || Array.isArray(e)
		}
	}
	if (typeof cptable !== "undefined") {
		At = function (e, t, r) {
			return cptable.utils.decode(1200, e.slice(t, r)).replace(z, "")
		};
		Dt = function (e, t, r) {
			return cptable.utils.decode(65001, e.slice(t, r))
		};
		Ot = function (e, t) {
			var a = Zt(e, t);
			return a > 0 ? cptable.utils.decode(r, e.slice(t + 4, t + 4 + a - 1)) : ""
		};
		It = function (e, r) {
			var a = Zt(e, r);
			return a > 0 ? cptable.utils.decode(t, e.slice(r + 4, r + 4 + a - 1)) : ""
		};
		Lt = function (e, t) {
			var r = 2 * Zt(e, t);
			return r > 0 ? cptable.utils.decode(1200, e.slice(t + 4, t + 4 + r - 1)) : ""
		};
		Mt = function (e, t) {
			var r = Zt(e, t);
			return r > 0 ? cptable.utils.decode(1200, e.slice(t + 4, t + 4 + r)) : ""
		};
		jt = function (e, t) {
			var r = Zt(e, t);
			return r > 0 ? cptable.utils.decode(65001, e.slice(t + 4, t + 4 + r)) : ""
		}
	}
	var Xt = function (e, t) {
		return e[t]
	};
	var Vt = function (e, t) {
		return e[t + 1] * (1 << 8) + e[t]
	};
	var Gt = function (e, t) {
		var r = e[t + 1] * (1 << 8) + e[t];
		return r < 32768 ? r : (65535 - r + 1) * -1
	};
	var Zt = function (e, t) {
		return e[t + 3] * (1 << 24) + (e[t + 2] << 16) + (e[t + 1] << 8) + e[t]
	};
	var qt = function (e, t) {
		return e[t + 3] << 24 | e[t + 2] << 16 | e[t + 1] << 8 | e[t]
	};
	var Yt = function (e, t) {
		return e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3]
	};
	function Kt(e, r) {
		var a = "",
		n,
		i,
		s = [],
		o,
		l,
		c,
		f;
		switch (r) {
		case "dbcs":
			f = this.l;
			if (y && Buffer.isBuffer(this))
				a = this.slice(this.l, this.l + 2 * e).toString("utf16le");
			else
				for (c = 0; c < e; ++c) {
					a += String.fromCharCode(Vt(this, f));
					f += 2
				}
			e *= 2;
			break;
		case "utf8":
			a = Dt(this, this.l, this.l + e);
			break;
		case "utf16le":
			e *= 2;
			a = At(this, this.l, this.l + e);
			break;
		case "wstr":
			if (typeof cptable !== "undefined")
				a = cptable.utils.decode(t, this.slice(this.l, this.l + 2 * e));
			else
				return Kt.call(this, e, "dbcs");
			e = 2 * e;
			break;
		case "lpstr-ansi":
			a = Ot(this, this.l);
			e = 4 + Zt(this, this.l);
			break;
		case "lpstr-cp":
			a = It(this, this.l);
			e = 4 + Zt(this, this.l);
			break;
		case "lpwstr":
			a = Lt(this, this.l);
			e = 4 + 2 * Zt(this, this.l);
			break;
		case "lpp4":
			e = 4 + Zt(this, this.l);
			a = Mt(this, this.l);
			if (e & 2)
				e += 2;
			break;
		case "8lpp4":
			e = 4 + Zt(this, this.l);
			a = jt(this, this.l);
			if (e & 3)
				e += 4 - (e & 3);
			break;
		case "cstr":
			e = 0;
			a = "";
			while ((o = Xt(this, this.l + e++)) !== 0)
				s.push(p(o));
			a = s.join("");
			break;
		case "_wstr":
			e = 0;
			a = "";
			while ((o = Vt(this, this.l + e)) !== 0) {
				s.push(p(o));
				e += 2
			}
			e += 2;
			a = s.join("");
			break;
		case "dbcs-cont":
			a = "";
			f = this.l;
			for (c = 0; c < e; ++c) {
				if (this.lens && this.lens.indexOf(f) !== -1) {
					o = Xt(this, f);
					this.l = f + 1;
					l = Kt.call(this, e - c, o ? "dbcs-cont" : "sbcs-cont");
					return s.join("") + l
				}
				s.push(p(Vt(this, f)));
				f += 2
			}
			a = s.join("");
			e *= 2;
			break;
		case "cpstr":
			if (typeof cptable !== "undefined") {
				a = cptable.utils.decode(t, this.slice(this.l, this.l + e));
				break
			};
		case "sbcs-cont":
			a = "";
			f = this.l;
			for (c = 0; c != e; ++c) {
				if (this.lens && this.lens.indexOf(f) !== -1) {
					o = Xt(this, f);
					this.l = f + 1;
					l = Kt.call(this, e - c, o ? "dbcs-cont" : "sbcs-cont");
					return s.join("") + l
				}
				s.push(p(Xt(this, f)));
				f += 1
			}
			a = s.join("");
			break;
		default:
			switch (e) {
			case 1:
				n = Xt(this, this.l);
				this.l++;
				return n;
			case 2:
				n = (r === "i" ? Gt : Vt)(this, this.l);
				this.l += 2;
				return n;
			case 4: ;
			case -4:
				if (r === "i" || (this[this.l + 3] & 128) === 0) {
					n = (e > 0 ? qt : Yt)(this, this.l);
					this.l += 4;
					return n
				} else {
					i = Zt(this, this.l);
					this.l += 4
				}
				return i;
			case 8: ;
			case -8:
				if (r === "f") {
					if (e == 8)
						i = Ut(this, this.l);
					else
						i = Ut([this[this.l + 7], this[this.l + 6], this[this.l + 5], this[this.l + 4], this[this.l + 3], this[this.l + 2], this[this.l + 1], this[this.l + 0]], 0);
					this.l += 8;
					return i
				} else
					e = 8;
			case 16:
				a = Et(this, this.l, e);
				break;
			};
		}
		this.l += e;
		return a
	}
	var Jt = function (e, t, r) {
		e[r] = t & 255;
		e[r + 1] = t >>> 8 & 255;
		e[r + 2] = t >>> 16 & 255;
		e[r + 3] = t >>> 24 & 255
	};
	var Qt = function (e, t, r) {
		e[r] = t & 255;
		e[r + 1] = t >> 8 & 255;
		e[r + 2] = t >> 16 & 255;
		e[r + 3] = t >> 24 & 255
	};
	var er = function (e, t, r) {
		e[r] = t & 255;
		e[r + 1] = t >>> 8 & 255
	};
	function tr(e, t, a) {
		var n = 0,
		i = 0;
		if (a === "dbcs") {
			for (i = 0; i != t.length; ++i)
				er(this, t.charCodeAt(i), this.l + 2 * i);
			n = 2 * t.length
		} else if (a === "sbcs") {
			if (typeof cptable !== "undefined" && r == 874) {
				for (i = 0; i != t.length; ++i) {
					var s = cptable.utils.encode(r, t.charAt(i));
					this[this.l + i] = s[0]
				}
			} else {
				t = t.replace(/[^\x00-\x7F]/g, "_");
				for (i = 0; i != t.length; ++i)
					this[this.l + i] = t.charCodeAt(i) & 255
			}
			n = t.length
		} else if (a === "hex") {
			for (; i < e; ++i) {
				this[this.l++] = parseInt(t.slice(2 * i, 2 * i + 2), 16) || 0
			}
			return this
		} else if (a === "utf16le") {
			var o = Math.min(this.l + e, this.length);
			for (i = 0; i < Math.min(t.length, e); ++i) {
				var l = t.charCodeAt(i);
				this[this.l++] = l & 255;
				this[this.l++] = l >> 8
			}
			while (this.l < o)
				this[this.l++] = 0;
			return this
		} else
			switch (e) {
			case 1:
				n = 1;
				this[this.l] = t & 255;
				break;
			case 2:
				n = 2;
				this[this.l] = t & 255;
				t >>>= 8;
				this[this.l + 1] = t & 255;
				break;
			case 3:
				n = 3;
				this[this.l] = t & 255;
				t >>>= 8;
				this[this.l + 1] = t & 255;
				t >>>= 8;
				this[this.l + 2] = t & 255;
				break;
			case 4:
				n = 4;
				Jt(this, t, this.l);
				break;
			case 8:
				n = 8;
				if (a === "f") {
					_t(this, t, this.l);
					break
				};
			case 16:
				break;
			case -4:
				n = 4;
				Qt(this, t, this.l);
				break;
			}
		this.l += n;
		return this
	}
	function rr(e, t) {
		var r = Et(this, this.l, e.length >> 1);
		if (r !== e)
			throw new Error(t + "Expected " + e + " saw " + r);
		this.l += e.length >> 1
	}
	function ar(e, t) {
		e.l = t;
		e._R = Kt;
		e.chk = rr;
		e._W = tr
	}
	function nr(e, t) {
		e.l += t
	}
	function ir(e) {
		var t = _(e);
		ar(t, 0);
		return t
	}
	function sr(e, t, r) {
		if (!e)
			return;
		var a,
		n,
		i;
		ar(e, e.l || 0);
		var s = e.length,
		o = 0,
		l = 0;
		while (e.l < s) {
			o = e._R(1);
			if (o & 128)
				o = (o & 127) + ((e._R(1) & 127) << 7);
			var c = XLSBRecordEnum[o] || XLSBRecordEnum[65535];
			a = e._R(1);
			i = a & 127;
			for (n = 1; n < 4 && a & 128; ++n)
				i += ((a = e._R(1)) & 127) << 7 * n;
			l = e.l + i;
			var f = (c.f || nr)(e, i, r);
			e.l = l;
			if (t(f, c.n, o))
				return
		}
	}
	function or() {
		var e = [],
		t = y ? 256 : 2048;
		var r = function l(e) {
			var t = ir(e);
			ar(t, 0);
			return t
		};
		var a = r(t);
		var n = function c() {
			if (!a)
				return;
			if (a.length > a.l) {
				a = a.slice(0, a.l);
				a.l = a.length
			}
			if (a.length > 0)
				e.push(a);
			a = null
		};
		var i = function f(e) {
			if (a && e < a.length - a.l)
				return a;
			n();
			return a = r(Math.max(e + 1, t))
		};
		var s = function u() {
			n();
			return Ct([e])
		};
		var o = function h(e) {
			n();
			a = e;
			if (a.l == null)
				a.l = a.length;
			i(t)
		};
		return {
			next: i,
			push: o,
			end: s,
			_bufs: e
		}
	}
	function lr(e, t, r, a) {
		var n = +XLSBRE[t],
		i;
		if (isNaN(n))
			return;
		if (!a)
			a = XLSBRecordEnum[n].p || (r || []).length || 0;
		i = 1 + (n >= 128 ? 1 : 0) + 1;
		if (a >= 128)
			++i;
		if (a >= 16384)
			++i;
		if (a >= 2097152)
			++i;
		var s = e.next(i);
		if (n <= 127)
			s._W(1, n);
		else {
			s._W(1, (n & 127) + 128);
			s._W(1, n >> 7)
		}
		for (var o = 0; o != 4; ++o) {
			if (a >= 128) {
				s._W(1, (a & 127) + 128);
				a >>= 7
			} else {
				s._W(1, a);
				break
			}
		}
		if (a > 0 && Ht(r))
			e.push(r)
	}
	function cr(e, t, r) {
		var a = le(e);
		if (t.s) {
			if (a.cRel)
				a.c += t.s.c;
			if (a.rRel)
				a.r += t.s.r
		} else {
			if (a.cRel)
				a.c += t.c;
			if (a.rRel)
				a.r += t.r
		}
		if (!r || r.biff < 12) {
			while (a.c >= 256)
				a.c -= 256;
			while (a.r >= 65536)
				a.r -= 65536
		}
		return a
	}
	function fr(e, t, r) {
		var a = le(e);
		a.s = cr(a.s, t.s, r);
		a.e = cr(a.e, t.s, r);
		return a
	}
	function ur(e, t) {
		if (e.cRel && e.c < 0) {
			e = le(e);
			while (e.c < 0)
				e.c += t > 8 ? 16384 : 256
		}
		if (e.rRel && e.r < 0) {
			e = le(e);
			while (e.r < 0)
				e.r += t > 8 ? 1048576 : t > 5 ? 65536 : 16384
		}
		if (e.cRel && e.c >= (t > 8 ? 16384 : 256)) {
			e = le(e);
			while (e.c >= (t > 8 ? 16384 : 256))
				e.c -= t > 8 ? 16384 : 256
		}
		if (e.rRel && e.r >= (t > 8 ? 1048576 : 1048576)) {
			e = le(e);
			while (e.r >= (t > 8 ? 1048576 : 1048576))
				e.r -= t > 8 ? 1048576 : 1048576
		}
		var r = _r(e);
		if (!e.cRel && e.cRel != null)
			r = yr(r);
		if (!e.rRel && e.rRel != null)
			r = mr(r);
		return r
	}
	function hr(e, t) {
		if (e.s.r == 0 && !e.s.rRel) {
			if (e.e.r == (t.biff >= 12 ? 1048575 : t.biff >= 8 ? 65536 : 16384) && !e.e.rRel) {
				return (e.s.cRel ? "" : "$") + br(e.s.c) + ":" + (e.e.cRel ? "" : "$") + br(e.e.c)
			}
		}
		if (e.s.c == 0 && !e.s.cRel) {
			if (e.e.c == (t.biff >= 12 ? 16383 : 255) && !e.e.cRel) {
				return (e.s.rRel ? "" : "$") + pr(e.s.r) + ":" + (e.e.rRel ? "" : "$") + pr(e.e.r)
			}
		}
		return ur(e.s, t.biff) + ":" + ur(e.e, t.biff)
	}
	function dr(e) {
		return parseInt(vr(e), 10) - 1
	}
	function pr(e) {
		return "" + (e + 1)
	}
	function mr(e) {
		return e.replace(/([A-Z]|^)(\d+)$/, "$1$$$2")
	}
	function vr(e) {
		return e.replace(/\$(\d+)$/, "$1")
	}
	function gr(e) {
		var t = wr(e),
		r = 0,
		a = 0;
		for (; a !== t.length; ++a)
			r = 26 * r + t.charCodeAt(a) - 64;
		return r - 1
	}
	function br(e) {
		if (e < 0)
			throw new Error("invalid column " + e);
		var t = "";
		for (++e; e; e = Math.floor((e - 1) / 26))
			t = String.fromCharCode((e - 1) % 26 + 65) + t;
		return t
	}
	function yr(e) {
		return e.replace(/^([A-Z])/, "$$$1")
	}
	function wr(e) {
		return e.replace(/^\$([A-Z])/, "$1")
	}
	function kr(e) {
		return e.replace(/(\$?[A-Z]*)(\$?\d*)/, "$1,$2").split(",")
	}
	function xr(e) {
		var t = 0,
		r = 0;
		for (var a = 0; a < e.length; ++a) {
			var n = e.charCodeAt(a);
			if (n >= 48 && n <= 57)
				t = 10 * t + (n - 48);
			else if (n >= 65 && n <= 90)
				r = 26 * r + (n - 64)
		}
		return {
			c: r - 1,
			r: t - 1
		}
	}
	function _r(e) {
		var t = e.c + 1;
		var r = "";
		for (; t; t = (t - 1) / 26 | 0)
			r = String.fromCharCode((t - 1) % 26 + 65) + r;
		return r + (e.r + 1)
	}
	function Cr(e) {
		var t = e.indexOf(":");
		if (t == -1)
			return {
				s: xr(e),
				e: xr(e)
			};
		return {
			s: xr(e.slice(0, t)),
			e: xr(e.slice(t + 1))
		}
	}
	function Sr(e, t) {
		if (typeof t === "undefined" || typeof t === "number") {
			return Sr(e.s, e.e)
		}
		if (typeof e !== "string")
			e = _r(e);
		if (typeof t !== "string")
			t = _r(t);
		return e == t ? e : e + ":" + t
	}
	function Ar(e) {
		var t = JSON.parse('{"s":{"c":0,"r":0},"e":{"c":0,"r":0}}');
		var r = 0,
		a = 0,
		n = 0;
		var i = e.length;
		for (r = 0; a < i; ++a) {
			if ((n = e.charCodeAt(a) - 64) < 1 || n > 26)
				break;
			r = 26 * r + n
		}
		t.s.c = --r;
		for (r = 0; a < i; ++a) {
			if ((n = e.charCodeAt(a) - 48) < 0 || n > 9)
				break;
			r = 10 * r + n
		}
		t.s.r = --r;
		if (a === i || e.charCodeAt(++a) === 58) {
			t.e.c = t.s.c;
			t.e.r = t.s.r;
			return t
		}
		for (r = 0; a != i; ++a) {
			if ((n = e.charCodeAt(a) - 64) < 1 || n > 26)
				break;
			r = 26 * r + n
		}
		t.e.c = --r;
		for (r = 0; a != i; ++a) {
			if ((n = e.charCodeAt(a) - 48) < 0 || n > 9)
				break;
			r = 10 * r + n
		}
		t.e.r = --r;
		return t
	}
	function Tr(e, t) {
		var r = e.t == "d" && t instanceof Date;
		if (e.z != null)
			try {
				return e.w = R.format(e.z, r ? J(t) : t)
			} catch (a) {}
		try {
			return e.w = R.format((e.XF || {}).numFmtId || (r ? 14 : 0), r ? J(t) : t)
		} catch (a) {
			return "" + t
		}
	}
	function Er(e, t, r) {
		if (e == null || e.t == null || e.t == "z")
			return "";
		if (e.w !== undefined)
			return e.w;
		if (e.t == "d" && !e.z && r && r.dateNF)
			e.z = r.dateNF;
		if (t == undefined)
			return Tr(e, e.v);
		return Tr(e, t)
	}
	function Fr(e, t) {
		var r = t && t.sheet ? t.sheet : "Sheet1";
		var a = {};
		a[r] = e;
		return {
			SheetNames: [r],
			Sheets: a
		}
	}
	function Dr(e, t, r) {
		var a = r || {};
		var n = e ? Array.isArray(e) : a.dense;
		if (v != null && n == null)
			n = v;
		var i = e || (n ? [] : {});
		var s = 0,
		o = 0;
		if (i && a.origin != null) {
			if (typeof a.origin == "number")
				s = a.origin;
			else {
				var l = typeof a.origin == "string" ? xr(a.origin) : a.origin;
				s = l.r;
				o = l.c
			}
			if (!i["!ref"])
				i["!ref"] = "A1:A1"
		}
		var c = {
			s: {
				c: 1e7,
				r: 1e7
			},
			e: {
				c: 0,
				r: 0
			}
		};
		if (i["!ref"]) {
			var f = Ar(i["!ref"]);
			c.s.c = f.s.c;
			c.s.r = f.s.r;
			c.e.c = Math.max(c.e.c, f.e.c);
			c.e.r = Math.max(c.e.r, f.e.r);
			if (s == -1)
				c.e.r = s = f.e.r + 1
		}
		for (var u = 0; u != t.length; ++u) {
			if (!t[u])
				continue;
			if (!Array.isArray(t[u]))
				throw new Error("aoa_to_sheet expects an array of arrays");
			for (var h = 0; h != t[u].length; ++h) {
				if (typeof t[u][h] === "undefined")
					continue;
				var d = {
					v: t[u][h]
				};
				var p = s + u,
				m = o + h;
				if (c.s.r > p)
					c.s.r = p;
				if (c.s.c > m)
					c.s.c = m;
				if (c.e.r < p)
					c.e.r = p;
				if (c.e.c < m)
					c.e.c = m;
				if (t[u][h] && typeof t[u][h] === "object" && !Array.isArray(t[u][h]) && !(t[u][h]instanceof Date))
					d = t[u][h];
				else {
					if (Array.isArray(d.v)) {
						d.f = t[u][h][1];
						d.v = d.v[0]
					}
					if (d.v === null) {
						if (d.f)
							d.t = "n";
						else if (!a.sheetStubs)
							continue;
						else
							d.t = "z"
					} else if (typeof d.v === "number")
						d.t = "n";
					else if (typeof d.v === "boolean")
						d.t = "b";
					else if (d.v instanceof Date) {
						d.z = a.dateNF || R._table[14];
						if (a.cellDates) {
							d.t = "d";
							d.w = R.format(d.z, J(d.v))
						} else {
							d.t = "n";
							d.v = J(d.v);
							d.w = R.format(d.z, d.v)
						}
					} else
						d.t = "s"
				}
				if (n) {
					if (!i[p])
						i[p] = [];
					if (i[p][m] && i[p][m].s)
						d.s = i[p][m].s;
					if (i[p][m] && i[p][m].z)
						d.z = i[p][m].z;
					i[p][m] = d
				} else {
					var g = _r({
							c: m,
							r: p
						});
					if (i[g] && i[g].s)
						d.s = i[g].s;
					if (i[g] && i[g].z)
						d.z = i[g].z;
					i[g] = d
				}
			}
		}
		if (c.s.c < 1e7)
			i["!ref"] = Sr(c);
		return i
	}
	function zr(e, t) {
		return Dr(null, e, t)
	}
	var Or = 2;
	var Rr = 3;
	var Ir = 11;
	var Nr = 12;
	var Lr = 19;
	var Br = 30;
	var Mr = 64;
	var Pr = 65;
	var jr = 71;
	var Wr = 4096;
	var Ur = 80;
	var $r = 81;
	var Hr = [Ur, $r];
	var Xr = {
		1: {
			n: "CodePage",
			t: Or
		},
		2: {
			n: "Category",
			t: Ur
		},
		3: {
			n: "PresentationFormat",
			t: Ur
		},
		4: {
			n: "ByteCount",
			t: Rr
		},
		5: {
			n: "LineCount",
			t: Rr
		},
		6: {
			n: "ParagraphCount",
			t: Rr
		},
		7: {
			n: "SlideCount",
			t: Rr
		},
		8: {
			n: "NoteCount",
			t: Rr
		},
		9: {
			n: "HiddenCount",
			t: Rr
		},
		10: {
			n: "MultimediaClipCount",
			t: Rr
		},
		11: {
			n: "ScaleCrop",
			t: Ir
		},
		12: {
			n: "HeadingPairs",
			t: Wr | Nr
		},
		13: {
			n: "TitlesOfParts",
			t: Wr | Br
		},
		14: {
			n: "Manager",
			t: Ur
		},
		15: {
			n: "Company",
			t: Ur
		},
		16: {
			n: "LinksUpToDate",
			t: Ir
		},
		17: {
			n: "CharacterCount",
			t: Rr
		},
		19: {
			n: "SharedDoc",
			t: Ir
		},
		22: {
			n: "HyperlinksChanged",
			t: Ir
		},
		23: {
			n: "AppVersion",
			t: Rr,
			p: "version"
		},
		24: {
			n: "DigSig",
			t: Pr
		},
		26: {
			n: "ContentType",
			t: Ur
		},
		27: {
			n: "ContentStatus",
			t: Ur
		},
		28: {
			n: "Language",
			t: Ur
		},
		29: {
			n: "Version",
			t: Ur
		},
		255: {}
	};
	var Vr = {
		1: {
			n: "CodePage",
			t: Or
		},
		2: {
			n: "Title",
			t: Ur
		},
		3: {
			n: "Subject",
			t: Ur
		},
		4: {
			n: "Author",
			t: Ur
		},
		5: {
			n: "Keywords",
			t: Ur
		},
		6: {
			n: "Comments",
			t: Ur
		},
		7: {
			n: "Template",
			t: Ur
		},
		8: {
			n: "LastAuthor",
			t: Ur
		},
		9: {
			n: "RevNumber",
			t: Ur
		},
		10: {
			n: "EditTime",
			t: Mr
		},
		11: {
			n: "LastPrinted",
			t: Mr
		},
		12: {
			n: "CreatedDate",
			t: Mr
		},
		13: {
			n: "ModifiedDate",
			t: Mr
		},
		14: {
			n: "PageCount",
			t: Rr
		},
		15: {
			n: "WordCount",
			t: Rr
		},
		16: {
			n: "CharCount",
			t: Rr
		},
		17: {
			n: "Thumbnail",
			t: jr
		},
		18: {
			n: "Application",
			t: Ur
		},
		19: {
			n: "DocSecurity",
			t: Rr
		},
		255: {}
	};
	var Gr = {
		2147483648: {
			n: "Locale",
			t: Lr
		},
		2147483651: {
			n: "Behavior",
			t: Lr
		},
		1919054434: {}
	};
	(function () {
		for (var e in Gr)
			if (Object.prototype.hasOwnProperty.call(Gr, e))
				Xr[e] = Vr[e] = Gr[e]
	})();
	var Zr = V(Xr, "n");
	var qr = V(Vr, "n");
	var Yr = {
		1: "US",
		2: "CA",
		3: "",
		7: "RU",
		20: "EG",
		30: "GR",
		31: "NL",
		32: "BE",
		33: "FR",
		34: "ES",
		36: "HU",
		39: "IT",
		41: "CH",
		43: "AT",
		44: "GB",
		45: "DK",
		46: "SE",
		47: "NO",
		48: "PL",
		49: "DE",
		52: "MX",
		55: "BR",
		61: "AU",
		64: "NZ",
		66: "TH",
		81: "JP",
		82: "KR",
		84: "VN",
		86: "CN",
		90: "TR",
		105: "JS",
		213: "DZ",
		216: "MA",
		218: "LY",
		351: "PT",
		354: "IS",
		358: "FI",
		420: "CZ",
		886: "TW",
		961: "LB",
		962: "JO",
		963: "SY",
		964: "IQ",
		965: "KW",
		966: "SA",
		971: "AE",
		972: "IL",
		974: "QA",
		981: "IR",
		65535: "US"
	};
	var Kr = [null, "solid", "mediumGray", "darkGray", "lightGray", "darkHorizontal", "darkVertical", "darkDown", "darkUp", "darkGrid", "darkTrellis", "lightHorizontal", "lightVertical", "lightDown", "lightUp", "lightGrid", "lightTrellis", "gray125", "gray0625"];
	function Jr(e) {
		return e.map(function (e) {
			return [e >> 16 & 255, e >> 8 & 255, e & 255]
		})
	}
	var Qr = Jr([0, 16777215, 16711680, 65280, 255, 16776960, 16711935, 65535, 0, 16777215, 16711680, 65280, 255, 16776960, 16711935, 65535, 8388608, 32768, 128, 8421376, 8388736, 32896, 12632256, 8421504, 10066431, 10040166, 16777164, 13434879, 6684774, 16744576, 26316, 13421823, 128, 16711935, 16776960, 65535, 8388736, 8388608, 32896, 255, 52479, 13434879, 13434828, 16777113, 10079487, 16751052, 13408767, 16764057, 3368703, 3394764, 10079232, 16763904, 16750848, 16737792, 6710937, 9868950, 13158, 3381606, 13056, 3355392, 10040064, 10040166, 3355545, 3355443, 16777215, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
	var ea = le(Qr);
	var ta = {
		0: "#NULL!",
		7: "#DIV/0!",
		15: "#VALUE!",
		23: "#REF!",
		29: "#NAME?",
		36: "#NUM!",
		42: "#N/A",
		43: "#GETTING_DATA",
		255: "#WTF?"
	};
	var ra = Z(ta);
	var aa = {
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": "workbooks",
		"application/vnd.ms-excel.binIndexWs": "TODO",
		"application/vnd.ms-excel.intlmacrosheet": "TODO",
		"application/vnd.ms-excel.binIndexMs": "TODO",
		"application/vnd.openxmlformats-package.core-properties+xml": "coreprops",
		"application/vnd.openxmlformats-officedocument.custom-properties+xml": "custprops",
		"application/vnd.openxmlformats-officedocument.extended-properties+xml": "extprops",
		"application/vnd.openxmlformats-officedocument.customXmlProperties+xml": "customxmlprops",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.customProperty": "TODO",
		"application/vnd.ms-excel.pivotTable": "pivots",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotTable+xml": "pivots",
		"application/vnd.openxmlformats-officedocument.drawingml.chart+xml": "chartobjs",
		"application/vnd.ms-office.chartcolorstyle+xml": "chartcolors",
		"application/vnd.ms-office.chartstyle+xml": "chartstyles",
		"application/vnd.ms-office.chartex+xml": "chartexs",
		"application/vnd.ms-excel.calcChain": "calcchains",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.calcChain+xml": "calcchains",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.printerSettings": "TODO",
		"application/vnd.ms-office.activeX": "TODO",
		"application/vnd.ms-office.activeX+xml": "TODO",
		"application/vnd.ms-excel.attachedToolbars": "TODO",
		"application/vnd.ms-excel.connections": "conns",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": "conns",
		"application/vnd.ms-excel.externalLink": "links",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.externalLink+xml": "links",
		"application/vnd.ms-excel.sheetMetadata": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml": "TODO",
		"application/vnd.ms-excel.pivotCacheDefinition": "pivotcaches",
		"application/vnd.ms-excel.pivotCacheRecords": "pivotrecords",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheDefinition+xml": "pivotcaches",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheRecords+xml": "pivotrecords",
		"application/vnd.ms-excel.queryTable": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.queryTable+xml": "TODO",
		"application/vnd.ms-excel.userNames": "TODO",
		"application/vnd.ms-excel.revisionHeaders": "TODO",
		"application/vnd.ms-excel.revisionLog": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionHeaders+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionLog+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.userNames+xml": "TODO",
		"application/vnd.ms-excel.tableSingleCells": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.tableSingleCells+xml": "TODO",
		"application/vnd.ms-excel.slicer": "TODO",
		"application/vnd.ms-excel.slicerCache": "TODO",
		"application/vnd.ms-excel.slicer+xml": "TODO",
		"application/vnd.ms-excel.slicerCache+xml": "TODO",
		"application/vnd.ms-excel.wsSortMap": "TODO",
		"application/vnd.ms-excel.table": "tables",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": "tables",
		"application/vnd.openxmlformats-officedocument.theme+xml": "themes",
		"application/vnd.openxmlformats-officedocument.themeOverride+xml": "TODO",
		"application/vnd.ms-excel.Timeline+xml": "TODO",
		"application/vnd.ms-excel.TimelineCache+xml": "TODO",
		"application/vnd.ms-office.vbaProject": "vba",
		"application/vnd.ms-office.vbaProjectSignature": "TODO",
		"application/vnd.ms-office.volatileDependencies": "TODO",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.volatileDependencies+xml": "TODO",
		"application/vnd.ms-excel.controlproperties+xml": "ctrlprops",
		"application/vnd.openxmlformats-officedocument.model+data": "datamodels",
		"application/vnd.ms-excel.Survey+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.drawing+xml": "drawings",
		"application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.drawingml.diagramColors+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.drawingml.diagramData+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.drawingml.diagramLayout+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.drawingml.diagramStyle+xml": "TODO",
		"application/vnd.openxmlformats-officedocument.vmlDrawing": "TODO",
		"application/vnd.openxmlformats-package.relationships+xml": "rels",
		"application/vnd.openxmlformats-officedocument.oleObject": "TODO",
		"image/png": "TODO",
		sheet: "js"
	};
	var na = function () {
		var e = {
			workbooks: {
				xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml",
				xlsm: "application/vnd.ms-excel.sheet.macroEnabled.main+xml",
				xlsb: "application/vnd.ms-excel.sheet.binary.macroEnabled.main",
				xlam: "application/vnd.ms-excel.addin.macroEnabled.main+xml",
				xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml"
			},
			strs: {
				xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml",
				xlsb: "application/vnd.ms-excel.sharedStrings"
			},
			comments: {
				xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml",
				xlsb: "application/vnd.ms-excel.comments"
			},
			sheets: {
				xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml",
				xlsb: "application/vnd.ms-excel.worksheet"
			},
			charts: {
				xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml",
				xlsb: "application/vnd.ms-excel.chartsheet"
			},
			dialogs: {
				xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml",
				xlsb: "application/vnd.ms-excel.dialogsheet"
			},
			macros: {
				xlsx: "application/vnd.ms-excel.macrosheet+xml",
				xlsb: "application/vnd.ms-excel.macrosheet"
			},
			tables: {
				xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml",
				xlsb: "application/vnd.ms-excel.table"
			},
			pivots: {
				xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotTable+xml",
				xlsb: "application/vnd.ms-excel.pivotTable"
			},
			pivotcaches: {
				xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheDefinition+xml",
				xlsb: "application/vnd.ms-excel.pivotCacheDefinition"
			},
			pivotrecords: {
				xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheRecords+xml",
				xlsb: "application/vnd.ms-excel.pivotCacheRecords"
			},
			conns: {
				xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml",
				xlsb: "application/vnd.ms-excel.connections"
			},
			links: {
				xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.externalLink+xml",
				xlsb: "application/vnd.ms-excel.externalLink"
			},
			styles: {
				xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml",
				xlsb: "application/vnd.ms-excel.styles"
			}
		};
		X(e).forEach(function (t) {
			["xlsm", "xlam"].forEach(function (r) {
				if (!e[t][r])
					e[t][r] = e[t].xlsx
			})
		});
		X(e).forEach(function (t) {
			X(e[t]).forEach(function (r) {
				aa[e[t][r]] = t
			})
		});
		return e
	}
	();
	var ia = q(aa);
	wt.CT = "http://schemas.openxmlformats.org/package/2006/content-types";
	function sa() {
		return {
			workbooks: [],
			sheets: [],
			charts: [],
			dialogs: [],
			macros: [],
			rels: [],
			strs: [],
			comments: [],
			links: [],
			coreprops: [],
			extprops: [],
			custprops: [],
			themes: [],
			styles: [],
			calcchains: [],
			vba: [],
			drawings: [],
			pivots: [],
			pivotcaches: [],
			pivotrecords: [],
			datamodels: [],
			chartobjs: [],
			chartstyles: [],
			chartcolors: [],
			chartexs: [],
			tables: [],
			conns: [],
			ctrlprops: [],
			customxmlprops: [],
			TODO: [],
			xmlns: ""
		}
	}
	function oa(e) {
		var t = sa();
		if (!e || !e.match)
			return t;
		var r = {};
		(e.match(Le) || []).forEach(function (e) {
			var a = Pe(e);
			switch (a[0].replace(Be, "<")) {
			case "<?xml":
				break;
			case "<Types":
				t.xmlns = a["xmlns" + (a[0].match(/<(\w+):/) || ["", ""])[1]];
				break;
			case "<Default":
				r[a.Extension] = a.ContentType;
				break;
			case "<Override":
				if (t[aa[a.ContentType]] !== undefined)
					t[aa[a.ContentType]].push(a.PartName);
				break;
			}
		});
		if (t.xmlns !== wt.CT)
			throw new Error("Unknown Namespace: " + t.xmlns);
		t.calcchain = t.calcchains.length > 0 ? t.calcchains[0] : "";
		t.sst = t.strs.length > 0 ? t.strs[0] : "";
		t.style = t.styles.length > 0 ? t.styles[0] : "";
		t.conn = t.conns.length > 0 ? t.conns[0] : "";
		t.defaults = r;
		delete t.calcchains;
		return t
	}
	var la = mt("Types", null, {
			xmlns: wt.CT,
			"xmlns:xsd": wt.xsd,
			"xmlns:xsi": wt.xsi
		});
	var ca = [["xml", "application/xml"], ["bin", "application/vnd.ms-excel.sheet.binary.macroEnabled.main"], ["vml", "application/vnd.openxmlformats-officedocument.vmlDrawing"], ["data", "application/vnd.openxmlformats-officedocument.model+data"], ["bmp", "image/bmp"], ["png", "image/png"], ["gif", "image/gif"], ["emf", "image/x-emf"], ["wmf", "image/x-wmf"], ["jpg", "image/jpeg"], ["jpeg", "image/jpeg"], ["tif", "image/tiff"], ["tiff", "image/tiff"], ["pdf", "application/pdf"], ["rels", ia.rels[0]]].map(function (e) {
		return mt("Default", null, {
			Extension: e[0],
			ContentType: e[1]
		})
	});
	function fa(e, t) {
		var r = [],
		a;
		r[r.length] = Ie;
		r[r.length] = la;
		r = r.concat(ca);
		var n = function (n) {
			if (e[n] && e[n].length > 0) {
				a = e[n][0];
				r[r.length] = mt("Override", null, {
						PartName: (a[0] == "/" ? "" : "/") + a,
						ContentType: na[n][t.bookType || "xlsx"]
					})
			}
		};
		var i = function (a) {
			(e[a] || []).forEach(function (e) {
				r[r.length] = mt("Override", null, {
						PartName: (e[0] == "/" ? "" : "/") + e,
						ContentType: na[a][t.bookType || "xlsx"]
					})
			})
		};
		var s = function (t) {
			(e[t] || []).forEach(function (e) {
				r[r.length] = mt("Override", null, {
						PartName: (e[0] == "/" ? "" : "/") + e,
						ContentType: ia[t][0]
					})
			})
		};
		n("workbooks");
		i("sheets");
		i("charts");
		s("themes");
		["strs", "styles", "conns"].forEach(n);
		["coreprops", "extprops", "custprops"].forEach(s);
		s("vba");
		s("comments");
		s("drawings");
		i("tables");
		i("pivots");
		i("pivotcaches");
		i("pivotrecords");
		s("datamodels");
		s("ctrlprops");
		s("chartobjs");
		s("chartstyles");
		s("chartcolors");
		s("chartexs");
		i("links");
		s("customxmlprops");
		if (r.length > 2) {
			r[r.length] = "</Types>";
			r[1] = r[1].replace("/>", ">")
		}
		return r.join("")
	}
	var ua = {
		WB: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
		SHEET: "http://sheetjs.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
		HLINK: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
		VML: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/vmlDrawing",
		XPATH: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLinkPath",
		XMISS: "http://schemas.microsoft.com/office/2006/relationships/xlExternalLinkPath/xlPathMissing",
		XLINK: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/externalLink",
		CXML: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXml",
		CXMLP: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXmlProps",
		VBA: "http://schemas.microsoft.com/office/2006/relationships/vbaProject"
	};
	function ha(e) {
		var t = e.lastIndexOf("/");
		return e.slice(0, t + 1) + "_rels/" + e.slice(t + 1) + ".rels"
	}
	function da(e, t) {
		var r = {
			"!id": {}
		};
		if (!e)
			return r;
		if (t.charAt(0) !== "/") {
			t = "/" + t
		}
		var a = {};
		(e.match(Le) || []).forEach(function (e) {
			var n = Pe(e);
			if (n[0] === "<Relationship") {
				var i = {};
				i.Type = n.Type;
				i.Target = n.Target;
				i.Id = n.Id;
				i.TargetMode = n.TargetMode;
				var s = n.TargetMode === "External" ? n.Target : Re(n.Target, t);
				r[s] = i;
				a[n.Id] = i
			}
		});
		r["!id"] = a;
		return r
	}
	wt.RELS = "http://schemas.openxmlformats.org/package/2006/relationships";
	var pa = mt("Relationships", null, {
			xmlns: wt.RELS
		});
	function ma(e) {
		var t = [Ie, pa];
		X(e["!id"]).forEach(function (r) {
			t[t.length] = mt("Relationship", null, e["!id"][r])
		});
		if (t.length > 2) {
			t[t.length] = "</Relationships>";
			t[1] = t[1].replace("/>", ">")
		}
		return t.join("")
	}
	var va = [ua.HLINK, ua.XPATH, ua.XMISS];
	function ga(e, t, r, a, n, i) {
		if (!n)
			n = {};
		if (!e["!id"])
			e["!id"] = {};
		if (t < 0)
			for (t = 1; e["!id"]["rId" + t]; ++t) {}
		n.Id = "rId" + t;
		n.Type = a;
		n.Target = r;
		if (i)
			n.TargetMode = i;
		else if (va.indexOf(n.Type) > -1)
			n.TargetMode = "External";
		if (e["!id"][n.Id])
			throw new Error("Cannot rewrite rId " + t);
		e["!id"][n.Id] = n;
		e[("/" + n.Target).replace("//", "/")] = n;
		return t
	}
	var ba = "application/vnd.oasis.opendocument.spreadsheet";
	function ya(e, t) {
		var r = xlml_normalize(e);
		var a;
		var n;
		while (a = xlmlregex.exec(r))
			switch (a[3]) {
			case "manifest":
				break;
			case "file-entry":
				n = Pe(a[0], false);
				if (n.path == "/" && n.type !== ba)
					throw new Error("This OpenDocument is not a spreadsheet");
				break;
			case "encryption-data": ;
			case "algorithm": ;
			case "start-key-generation": ;
			case "key-derivation":
				throw new Error("Unsupported ODS Encryption");
			default:
				if (t && t.WTF)
					throw a;
			}
	}
	function wa(e) {
		var t = [Ie];
		t.push('<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2">\n');
		t.push('  <manifest:file-entry manifest:full-path="/" manifest:version="1.2" manifest:media-type="application/vnd.oasis.opendocument.spreadsheet"/>\n');
		for (var r = 0; r < e.length; ++r)
			t.push('  <manifest:file-entry manifest:full-path="' + e[r][0] + '" manifest:media-type="' + e[r][1] + '"/>\n');
		t.push("</manifest:manifest>");
		return t.join("")
	}
	function ka(e, t, r) {
		return ['  <rdf:Description rdf:about="' + e + '">\n', '    <rdf:type rdf:resource="http://docs.oasis-open.org/ns/office/1.2/meta/' + (r || "odf") + "#" + t + '"/>\n', "  </rdf:Description>\n"].join("")
	}
	function xa(e, t) {
		return ['  <rdf:Description rdf:about="' + e + '">\n', '    <ns0:hasPart xmlns:ns0="http://docs.oasis-open.org/ns/office/1.2/meta/pkg#" rdf:resource="' + t + '"/>\n', "  </rdf:Description>\n"].join("")
	}
	function _a(e) {
		var t = [Ie];
		t.push('<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">\n');
		for (var r = 0; r != e.length; ++r) {
			t.push(ka(e[r][0], e[r][1]));
			t.push(xa("", e[r][0]))
		}
		t.push(ka("", "Document", "pkg"));
		t.push("</rdf:RDF>");
		return t.join("")
	}
	var Ca = function () {
		var t = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><office:document-meta xmlns:office="urn:oasis:names:tc:opendocument:xmlns:office:1.0" xmlns:meta="urn:oasis:names:tc:opendocument:xmlns:meta:1.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xlink="http://www.w3.org/1999/xlink" office:version="1.2"><office:meta><meta:generator>Sheet' + "JS " + e.version + "</meta:generator></office:meta></office:document-meta>";
		return function r() {
			return t
		}
	}
	();
	var Sa = [["cp:category", "Category"], ["cp:contentStatus", "ContentStatus"], ["cp:keywords", "Keywords"], ["cp:lastModifiedBy", "LastAuthor"], ["cp:lastPrinted", "LastPrinted"], ["cp:revision", "RevNumber"], ["cp:version", "Version"], ["dc:creator", "Author"], ["dc:description", "Comments"], ["dc:identifier", "Identifier"], ["dc:language", "Language"], ["dc:subject", "Subject"], ["dc:title", "Title"], ["dcterms:created", "CreatedDate", "date"], ["dcterms:modified", "ModifiedDate", "date"]];
	wt.CORE_PROPS = "http://schemas.openxmlformats.org/package/2006/metadata/core-properties";
	ua.CORE_PROPS = "http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties";
	var Aa = function () {
		var e = new Array(Sa.length);
		for (var t = 0; t < Sa.length; ++t) {
			var r = Sa[t];
			var a = "(?:" + r[0].slice(0, r[0].indexOf(":")) + ":)" + r[0].slice(r[0].indexOf(":") + 1);
			e[t] = new RegExp("<" + a + "[^>]*>([\\s\\S]*?)</" + a + ">")
		}
		return e
	}
	();
	function Ta(e) {
		var t = {};
		e = tt(e);
		for (var r = 0; r < Sa.length; ++r) {
			var a = Sa[r],
			n = e.match(Aa[r]);
			if (n != null && n.length > 0)
				t[a[1]] = $e(n[1]);
			if (a[2] === "date" && t[a[1]])
				t[a[1]] = se(t[a[1]])
		}
		return t
	}
	var Ea = mt("cp:coreProperties", null, {
			"xmlns:cp": wt.CORE_PROPS,
			"xmlns:dc": wt.dc,
			"xmlns:dcterms": wt.dcterms,
			"xmlns:dcmitype": wt.dcmitype,
			"xmlns:xsi": wt.xsi
		});
	function Fa(e, t, r, a, n) {
		if (n[e] != null || t == null || t === "")
			return;
		n[e] = t;
		t = Ve(t);
		a[a.length] = r ? mt(e, t, r) : dt(e, t)
	}
	function Da(e, t) {
		var r = t || {};
		var a = [Ie, Ea],
		n = {};
		if (!e && !r.Props)
			return a.join("");
		if (e) {
			if (e.CreatedDate != null)
				Fa("dcterms:created", typeof e.CreatedDate === "string" ? e.CreatedDate : bt(e.CreatedDate, r.WTF), {
					"xsi:type": "dcterms:W3CDTF"
				}, a, n);
			if (e.ModifiedDate != null)
				Fa("dcterms:modified", typeof e.ModifiedDate === "string" ? e.ModifiedDate : bt(e.ModifiedDate, r.WTF), {
					"xsi:type": "dcterms:W3CDTF"
				}, a, n)
		}
		for (var i = 0; i != Sa.length; ++i) {
			var s = Sa[i];
			var o = r.Props && r.Props[s[1]] != null ? r.Props[s[1]] : e ? e[s[1]] : null;
			if (o === true)
				o = "1";
			else if (o === false)
				o = "0";
			else if (typeof o == "number")
				o = String(o);
			if (o != null)
				Fa(s[0], o, null, a, n)
		}
		if (a.length > 2) {
			a[a.length] = "</cp:coreProperties>";
			a[1] = a[1].replace("/>", ">")
		}
		return a.join("")
	}
	var za = [["Application", "Application", "string"], ["AppVersion", "AppVersion", "string"], ["Company", "Company", "string"], ["DocSecurity", "DocSecurity", "string"], ["Manager", "Manager", "string"], ["HyperlinksChanged", "HyperlinksChanged", "bool"], ["SharedDoc", "SharedDoc", "bool"], ["LinksUpToDate", "LinksUpToDate", "bool"], ["ScaleCrop", "ScaleCrop", "bool"], ["HeadingPairs", "HeadingPairs", "raw"], ["TitlesOfParts", "TitlesOfParts", "raw"]];
	wt.EXT_PROPS = "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties";
	ua.EXT_PROPS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties";
	var Oa = ["Worksheets", "SheetNames", "NamedRanges", "DefinedNames", "Chartsheets", "ChartNames"];
	function Ra(e, t, r, a) {
		var n = [];
		if (typeof e == "string")
			n = ut(e, a);
		else
			for (var i = 0; i < e.length; ++i)
				n = n.concat(e[i].map(function (e) {
							return {
								v: e
							}
						}));
		var s = typeof t == "string" ? ut(t, a).map(function (e) {
				return e.v
			}) : t;
		var o = 0,
		l = 0;
		if (s.length > 0)
			for (var c = 0; c !== n.length; c += 2) {
				l = +n[c + 1].v;
				switch (n[c].v) {
				case "Worksheets": ;
				case "工作表": ;
				case "Листы": ;
				case "أوراق العمل": ;
				case "ワークシート": ;
				case "גליונות עבודה": ;
				case "Arbeitsblätter": ;
				case "Çalışma Sayfaları": ;
				case "Feuilles de calcul": ;
				case "Fogli di lavoro": ;
				case "Folhas de cálculo": ;
				case "Planilhas": ;
				case "Regneark": ;
				case "Hojas de cálculo": ;
				case "Werkbladen":
					r.Worksheets = l;
					r.SheetNames = s.slice(o, o + l);
					break;
				case "Named Ranges": ;
				case "Rangos con nombre": ;
				case "名前付き一覧": ;
				case "Benannte Bereiche": ;
				case "Navngivne områder":
					r.NamedRanges = l;
					r.DefinedNames = s.slice(o, o + l);
					break;
				case "Charts": ;
				case "Diagramme":
					r.Chartsheets = l;
					r.ChartNames = s.slice(o, o + l);
					break;
				}
				o += l
			}
	}
	function Ia(e, t, r) {
		var a = {};
		if (!t)
			t = {};
		e = tt(e);
		za.forEach(function (r) {
			var n = (e.match(st(r[0])) || [])[1];
			switch (r[2]) {
			case "string":
				if (n)
					t[r[1]] = $e(n);
				break;
			case "bool":
				t[r[1]] = n === "true";
				break;
			case "raw":
				var i = e.match(new RegExp("<" + r[0] + "[^>]*>([\\s\\S]*?)</" + r[0] + ">"));
				if (i && i.length > 0)
					a[r[1]] = i[1];
				break;
			}
		});
		if (a.HeadingPairs && a.TitlesOfParts)
			Ra(a.HeadingPairs, a.TitlesOfParts, t, r);
		return t
	}
	var Na = mt("Properties", null, {
			xmlns: wt.EXT_PROPS,
			"xmlns:vt": wt.vt
		});
	function La(e) {
		var t = [],
		r = mt;
		if (!e)
			e = {};
		e.Application = "SheetJS";
		t[t.length] = Ie;
		t[t.length] = Na;
		za.forEach(function (a) {
			if (e[a[1]] === undefined)
				return;
			var n;
			switch (a[2]) {
			case "string":
				n = Ve(String(e[a[1]]));
				break;
			case "bool":
				n = e[a[1]] ? "true" : "false";
				break;
			}
			if (n !== undefined)
				t[t.length] = r(a[0], n)
		});
		t[t.length] = r("HeadingPairs", r("vt:vector", r("vt:variant", "<vt:lpstr>Worksheets</vt:lpstr>") + r("vt:variant", r("vt:i4", String(e.Worksheets))), {
					size: 2,
					baseType: "variant"
				}));
		t[t.length] = r("TitlesOfParts", r("vt:vector", e.SheetNames.map(function (e) {
						return "<vt:lpstr>" + Ve(e) + "</vt:lpstr>"
					}).join(""), {
					size: e.Worksheets,
					baseType: "lpstr"
				}));
		if (t.length > 2) {
			t[t.length] = "</Properties>";
			t[1] = t[1].replace("/>", ">")
		}
		return t.join("")
	}
	wt.CUST_PROPS = "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties";
	ua.CUST_PROPS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/custom-properties";
	var Ba = /<[^>]+>[^<]*/g;
	function Ma(e, t) {
		var r = {},
		a = "";
		var n = e.match(Ba);
		if (n)
			for (var i = 0; i != n.length; ++i) {
				var s = n[i],
				o = Pe(s);
				switch (o[0]) {
				case "<?xml":
					break;
				case "<Properties":
					break;
				case "<property":
					a = $e(o.name);
					break;
				case "</property>":
					a = null;
					break;
				default:
					if (s.indexOf("<vt:") === 0) {
						var l = s.split(">");
						var c = l[0].slice(4),
						f = l[1];
						switch (c) {
						case "lpstr": ;
						case "bstr": ;
						case "lpwstr":
							r[a] = $e(f);
							break;
						case "bool":
							r[a] = et(f);
							break;
						case "i1": ;
						case "i2": ;
						case "i4": ;
						case "i8": ;
						case "int": ;
						case "uint":
							r[a] = parseInt(f, 10);
							break;
						case "r4": ;
						case "r8": ;
						case "decimal":
							r[a] = parseFloat(f);
							break;
						case "filetime": ;
						case "date":
							r[a] = se(f);
							break;
						case "cy": ;
						case "error":
							r[a] = $e(f);
							break;
						default:
							if (c.slice(-1) == "/")
								break;
							if (t.WTF && typeof console !== "undefined")
								console.warn("Unexpected", s, c, l);
						}
					} else if (s.slice(0, 2) === "</") {}
					else if (t.WTF)
						throw new Error(s);
				}
			}
		return r
	}
	var Pa = mt("Properties", null, {
			xmlns: wt.CUST_PROPS,
			"xmlns:vt": wt.vt
		});
	function ja(e) {
		var t = [Ie, Pa];
		if (!e)
			return t.join("");
		var r = 1;
		X(e).forEach(function a(n) {
			++r;
			t[t.length] = mt("property", yt(e[n], true), {
					fmtid: "{D5CDD505-2E9C-101B-9397-08002B2CF9AE}",
					pid: r,
					name: Ve(n)
				})
		});
		if (t.length > 2) {
			t[t.length] = "</Properties>";
			t[1] = t[1].replace("/>", ">")
		}
		return t.join("")
	}
	function Wa(e) {
		var t = {},
		r = e.match(Le),
		a = 0;
		var n = false;
		if (r)
			for (; a != r.length; ++a) {
				var s = Pe(r[a]);
				switch (s[0].replace(/\w*:/g, "")) {
				case "<condense":
					break;
				case "<extend":
					break;
				case "<shadow":
					if (!s.val)
						break;
				case "<shadow>": ;
				case "<shadow/>":
					t.shadow = 1;
					break;
				case "</shadow>":
					break;
				case "<charset":
					if (s.val == "1")
						break;
					t.cp = i[parseInt(s.val, 10)];
					break;
				case "<outline":
					if (!s.val)
						break;
				case "<outline>": ;
				case "<outline/>":
					t.outline = 1;
					break;
				case "</outline>":
					break;
				case "<rFont":
					t.name = s.val;
					break;
				case "<sz":
					t.sz = s.val;
					break;
				case "<strike":
					if (!s.val)
						break;
				case "<strike>": ;
				case "<strike/>":
					t.strike = 1;
					break;
				case "</strike>":
					break;
				case "<u":
					if (!s.val)
						break;
					switch (s.val) {
					case "double":
						t.underline = 2;
						break;
					case "singleAccounting":
						t.underline = 33;
						break;
					case "doubleAccounting":
						t.underline = 34;
						break;
					};
				case "<u>": ;
				case "<u/>":
					if (!t.underline)
						t.underline = 1;
					break;
				case "</u>":
					break;
				case "<b":
					if (s.val == "0")
						break;
				case "<b>": ;
				case "<b/>":
					t.bold = 1;
					break;
				case "</b>":
					break;
				case "<i":
					if (s.val == "0")
						break;
				case "<i>": ;
				case "<i/>":
					t.italic = 1;
					break;
				case "</i>":
					break;
				case "<color":
					if (s.rgb)
						t.color = {
							rgb: s.rgb.length == 8 ? s.rgb.slice(2, 8) : ("000000" + s.rgb).slice(-6)
						};
					break;
				case "<family":
					t.family = s.val;
					break;
				case "<vertAlign":
					if ((s.val || "none") != "none")
						t.valign = s.val.replace("script", "");
					break;
				case "<scheme":
					break;
				case "<extLst": ;
				case "<extLst>": ;
				case "</extLst>":
					break;
				case "<ext":
					n = true;
					break;
				case "</ext>":
					n = false;
					break;
				default:
					if (s[0].charCodeAt(1) !== 47 && !n)
						throw new Error("Unrecognized rich format " + s[0]);
				}
			}
		return t
	}
	var Ua = function () {
		var e = st("t"),
		t = st("rPr");
		function r(r) {
			var a = r.match(e);
			if (!a)
				return {
					t: "s",
					v: ""
				};
			var n = {
				t: "s",
				v: $e(a[1])
			};
			var i = r.match(t);
			if (i)
				n.s = Wa(i[1]);
			return n
		}
		var a = /<(?:\w+:)?r>/g,
		n = /<\/(?:\w+:)?r>/;
		return function i(e) {
			return e.replace(a, "").split(n).map(r).filter(function (e) {
				return e.v
			})
		}
	}
	();
	var $a = {
		1: "single",
		2: "double",
		33: "single-accounting",
		34: "double-accounting"
	};
	var Ha = function fu() {
		var e = /(\r\n|\n)/g;
		function t(e, t, r) {
			var a = [];
			if (e.underline)
				a.push("text-decoration: underline;");
			if (e.underline > 1)
				a.push("text-underline-style:" + $a[e.underline] + ";");
			if (e.sz)
				a.push("font-size:" + e.sz + "pt;");
			if (e.outline)
				a.push("text-effect: outline;");
			if (e.shadow)
				a.push("text-shadow: auto;");
			if (e.color && e.color.rgb)
				a.push("color: #" + Pi(e.color.rgb) + ";");
			t.push('<span style="' + a.join("") + '">');
			if (e.bold) {
				t.push("<b>");
				r.push("</b>")
			}
			if (e.italic) {
				t.push("<i>");
				r.push("</i>")
			}
			if (e.strike) {
				t.push("<s>");
				r.push("</s>")
			}
			var n = e.valign || "";
			if (n == "superscript" || n == "super")
				n = "sup";
			else if (n == "subscript")
				n = "sub";
			if (n != "") {
				t.push("<" + n + ">");
				r.push("</" + n + ">")
			}
			r.push("</span>");
			return e
		}
		function r(r) {
			var a = [[], r.v, []];
			if (!r.v)
				return "";
			if (r.s)
				t(r.s, a[0], a[2]);
			return a[0].join("") + a[1].replace(e, "<br/>") + a[2].join("")
		}
		return function a(e) {
			return e.map(r).join("")
		}
	}
	();
	function Xa(e) {
		var t = "",
		r = [];
		if (e.s) {
			if (e.s.bold)
				r.push("<b/>");
			if (e.s.italic)
				r.push("<i/>");
			if (e.s.strike)
				r.push("<strike/>");
			if (e.s.underline)
				r.push('<u val="' + (Vn[e.s.underline] || "single") + '"/>');
			if (e.s.color)
				r.push(ji(e.s.color));
			if (e.s.sz)
				r.push('<sz val="' + e.s.sz + '"/>');
			if (e.s.name)
				r.push('<rFont val="' + e.s.name + '"/>');
			if (e.s.valign == "super" || e.s.valign == "sub")
				r.push('<vertAlign val="' + e.s.valign + 'script"/>')
		}
		if (r.length)
			t += "<rPr>" + r.join("") + "</rPr>";
		t += mt("t", Ve(e.v), null);
		return "<r>" + t + "</r>"
	}
	function Va(e) {
		var t = e.map(function (e) {
				return Xa(e)
			});
		return t.join("")
	}
	var Ga = /<(?:\w+:)?t[^>]*>([^<]*)<\/(?:\w+:)?t>/g,
	Za = /<(?:\w+:)?r>/;
	var qa = /<(?:\w+:)?rPh.*?>([\s\S]*?)<\/(?:\w+:)?rPh>/g;
	function Ya(e, t) {
		var r = t ? t.cellHTML : true;
		var a = {};
		if (!e)
			return {
				t: ""
			};
		if (e.match(/^\s*<(?:\w+:)?t[^>]*>/)) {
			a.t = $e(tt(e.slice(e.indexOf(">") + 1).split(/<\/(?:\w+:)?t>/)[0] || ""));
			a.r = tt(e);
			if (r)
				a.h = Ye(a.t)
		} else if (e.match(Za)) {
			a.r = tt(e);
			a.t = $e(tt((e.replace(qa, "").match(Ga) || []).join("").replace(Le, "")));
			a.R = Ua(a.r);
			if (r)
				a.h = Ha(a.R)
		}
		return a
	}
	var Ka = /<(?:\w+:)?sst([^>]*)>([\s\S]*)<\/(?:\w+:)?sst>/;
	var Ja = /<(?:\w+:)?(?:si|sstItem)>/g;
	var Qa = /<\/(?:\w+:)?(?:si|sstItem)>/;
	function en(e, t) {
		var r = [],
		a = "";
		if (!e)
			return r;
		var n = e.match(Ka);
		if (n) {
			a = n[2].replace(Ja, "").split(Qa);
			for (var i = 0; i != a.length; ++i) {
				var s = Ya(a[i].trim(), t);
				if (s != null)
					r[r.length] = s
			}
			n = Pe(n[1]);
			r.Count = n.count;
			r.Unique = n.uniqueCount
		}
		return r
	}
	ua.SST = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings";
	var tn = /^\s|\s$|[\t\n\r]/;
	function rn(e, t) {
		if (!t.bookSST)
			return "";
		var r = [Ie];
		r[r.length] = mt("sst", null, {
				xmlns: wt.main[0],
				count: e.Count,
				uniqueCount: e.Unique
			});
		for (var a = 0; a != e.length; ++a) {
			if (e[a] == null)
				continue;
			var n = e[a];
			var i = "<si>";
			if (n.r)
				i += n.r;
			else {
				i += "<t";
				if (!n.t)
					n.t = "";
				if (n.t.match(tn))
					i += ' xml:space="preserve"';
				i += ">" + Ve(n.t) + "</t>"
			}
			i += "</si>";
			r[r.length] = i
		}
		if (r.length > 2) {
			r[r.length] = "</sst>";
			r[1] = r[1].replace("/>", ">")
		}
		return r.join("")
	}
	function an(e) {
		var t = e.slice(e[0] === "#" ? 1 : 0).slice(0, 6);
		return [parseInt(t.slice(0, 2), 16), parseInt(t.slice(2, 4), 16), parseInt(t.slice(4, 6), 16)]
	}
	function nn(e) {
		for (var t = 0, r = 1; t != 3; ++t)
			r = r * 256 + (e[t] > 255 ? 255 : e[t] < 0 ? 0 : e[t]);
		return r.toString(16).toUpperCase().slice(1)
	}
	function sn(e) {
		var t = e[0] / 255,
		r = e[1] / 255,
		a = e[2] / 255;
		var n = Math.max(t, r, a),
		i = Math.min(t, r, a),
		s = n - i;
		if (s === 0)
			return [0, 0, t];
		var o = 0,
		l = 0,
		c = n + i;
		l = s / (c > 1 ? 2 - c : c);
		switch (n) {
		case t:
			o = ((r - a) / s + 6) % 6;
			break;
		case r:
			o = (a - t) / s + 2;
			break;
		case a:
			o = (t - r) / s + 4;
			break;
		}
		return [o / 6, l, c / 2]
	}
	function on(e) {
		var t = e[0],
		r = e[1],
		a = e[2];
		var n = r * 2 * (a < .5 ? a : 1 - a),
		i = a - n / 2;
		var s = [i, i, i],
		o = 6 * t;
		var l;
		if (r !== 0)
			switch (o | 0) {
			case 0: ;
			case 6:
				l = n * o;
				s[0] += n;
				s[1] += l;
				break;
			case 1:
				l = n * (2 - o);
				s[0] += l;
				s[1] += n;
				break;
			case 2:
				l = n * (o - 2);
				s[1] += n;
				s[2] += l;
				break;
			case 3:
				l = n * (4 - o);
				s[1] += l;
				s[2] += n;
				break;
			case 4:
				l = n * (o - 4);
				s[2] += n;
				s[0] += l;
				break;
			case 5:
				l = n * (6 - o);
				s[2] += l;
				s[0] += n;
				break;
			}
		for (var c = 0; c != 3; ++c)
			s[c] = Math.round(s[c] * 255);
		return s
	}
	function ln(e, t) {
		if (e == null)
			return t != null;
		if (t == null)
			return true;
		if (e.auto == 1 && t.auto == 1)
			return false;
		else if (!!e.auto != !!t.auto)
			return true;
		if (e.theme == null != (t.theme == null))
			return true;
		if (e.theme != null) {
			if (e.theme != t.theme)
				return true;
			if (e.tint != t.tint)
				return true;
			return false
		}
		var r = e.rgb;
		if (typeof r == "number")
			r = r.toString(16);
		r = r.slice(-6);
		var a = t.rgb;
		if (typeof a == "number")
			a = a.toString(16);
		a = a.slice(-6);
		return r.toLowerCase() != a.toLowerCase()
	}
	function cn(e, t) {
		if (e == null)
			return t != null;
		if (t == null)
			return e != null;
		if (e.style != t.style)
			return true;
		return ln(e.color, t.color)
	}
	function fn(e, t) {
		if (t === 0)
			return e;
		var r = sn(an(e));
		if (t < 0)
			r[2] = r[2] * (1 + t);
		else
			r[2] = 1 - (1 - r[2]) * (1 - t);
		return nn(on(r))
	}
	var un = 6,
	hn = 15,
	dn = 1,
	pn = un;
	function mn(e) {
		return Math.floor((e + Math.round(128 / pn) / 256) * pn)
	}
	function vn(e) {
		return Math.floor((e - 5) / pn * 100 + .5) / 100
	}
	function gn(e) {
		return Math.round((e * pn + 5) / pn * 256) / 256
	}
	function bn(e) {
		return gn(vn(mn(e)))
	}
	function yn(e) {
		var t = Math.abs(e - bn(e)),
		r = pn;
		if (t > .005)
			for (pn = dn; pn < hn; ++pn)
				if (Math.abs(e - bn(e)) <= t) {
					t = Math.abs(e - bn(e));
					r = pn
				}
		pn = r
	}
	function wn(e) {
		if (e.bestFit) {
			delete e.bestFit
		}
		if (e.width) {
			e.wpx = mn(e.width);
			e.wch = vn(e.wpx);
			e.MDW = pn
		} else if (e.wpx) {
			e.wch = vn(e.wpx);
			e.width = gn(e.wch);
			e.MDW = pn
		} else if (typeof e.wch == "number") {
			e.width = gn(e.wch);
			e.wpx = mn(e.width);
			e.MDW = pn
		}
		if (e.customWidth)
			delete e.customWidth
	}
	var kn = 96,
	xn = kn;
	function _n(e) {
		return e * 72 / xn
	}
	function Cn(e) {
		return e * xn / 72
	}
	function Sn(e) {
		e = {
			osx: 72,
			win: 96,
			win100: 96,
			win125: 120,
			win150: 144
		}
		[e] || e || kn;
		xn = e;
		Rn = zn[e]
	}
	function An(e) {
		if (e.hpx)
			e.hpt = _n(e.hpx);
		else if (e.hpt)
			e.hpx = Cn(e.hpt)
	}
	var Tn = {
		None: "none",
		Solid: "solid",
		Gray50: "mediumGray",
		Gray75: "darkGray",
		Gray25: "lightGray",
		HorzStripe: "darkHorizontal",
		VertStripe: "darkVertical",
		ReverseDiagStripe: "darkDown",
		DiagStripe: "darkUp",
		DiagCross: "darkGrid",
		ThickDiagCross: "darkTrellis",
		ThinHorzStripe: "lightHorizontal",
		ThinVertStripe: "lightVertical",
		ThinReverseDiagStripe: "lightDown",
		ThinHorzCross: "lightGrid"
	},
	En = G(Tn);
	var Fn = {
		orange: 16753920,
		black: 0,
		navy: 128,
		blue: 255,
		green: 32768,
		teal: 32896,
		lime: 65280,
		aqua: 65535,
		silver: 12632256,
		maroon: 8388608,
		purple: 8388736,
		olive: 8421376,
		gray: 8421504,
		red: 16711680,
		fuchsia: 16711935,
		yellow: 16776960,
		white: 16777215
	};
	function Dn(e, t) {
		if (e.replace("#", "").match(/^[0-9a-fA-F]{6}$/))
			return parseInt(e.replace("#", ""), 16);
		if (Fn[e])
			return Fn[e];
		var r = e.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/);
		if (r)
			return (+r[1] << 16) + (+r[2] << 8) + +r[3];
		r = e.match(/rgba\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*(\d*)/);
		if (r) {
			var a = r[4] && r[4].length > 0 && +r[4] || 0;
			if (a != 0 || +r[1] > 0 || +r[2] > 0 || +r[3] > 0)
				return (+r[1] << 16) + (+r[2] << 8) + +r[3];
			if (t)
				return -1;
			return 16777215
		}
		throw new Error("Unknown HTML color " + e)
	}
	var zn = {};
	function On(e) {
		e = e || 96;
		var t = {
			Calibri: [],
			Arial: [],
			"Sparkasse Rg": [],
			"宋体": [],
			"Century Gothic": []
		};
		t["Calibri"][11] = 7;
		t["Calibri"][12] = {
			72: 6,
			96: 8,
			120: 10,
			144: 12
		}
		[e] || 8;
		t["Calibri"][13] = 10;
		t["Calibri"][14] = 11;
		t["Calibri"][16] = 12;
		t["Calibri"][18] = 14;
		t["Calibri"][20] = 16;
		t["宋体"][11] = 8;
		t["Sparkasse Rg"][11] = 7;
		t["Arial"][10] = 7;
		t["Century Gothic"][12] = 9;
		return t
	}
	zn[72] = On(72);
	zn[96] = On(96);
	zn[120] = On(120);
	zn[144] = On(144);
	var Rn = zn[96];
	function In(e) {
		return (Rn[e.name || e.FontName] || [])[e.sz || e.Size]
	}
	function Nn(e) {
		if (e) {
			var t = In(e);
			if (t)
				return pn = t
		}
		return pn = 6
	}
	function Ln(e, t, r) {
		return [Math.round(t[0] * r + e[0] * (1 - r)), Math.round(t[1] * r + e[1] * (1 - r)), Math.round(t[2] * r + e[2] * (1 - r))]
	}
	function Bn(e, t, r) {
		var a = an(typeof e.rgb == "number" ? ("00000" + e.toString(16)).slice(-6) : e.rgb);
		var n = an(typeof t.rgb == "number" ? ("00000" + t.toString(16)).slice(-6) : t.rgb);
		return nn(Ln(a, n, r))
	}
	function Mn(e, t, r) {
		if (r)
			switch (+e) {
			case 64:
				e = 65;
				break;
			case 65:
				e = 64;
				break;
			}
		var a = t && t[+e] || ea[+e];
		if (+e == 81)
			a = ea[1];
		if (!a)
			throw new Error("bad ICV index " + e);
		return nn(a)
	}
	function Pn(e, t, r) {
		var a = {};
		if (e.indexed != null) {
			a.index = parseInt(e.indexed, 10);
			a.rgb = Mn(a.index, t.Indexed)
		}
		if (e.theme != null)
			a.theme = parseInt(e.theme, 10);
		if (e.tint != null)
			a.tint = parseFloat(e.tint);
		if (e.rgb != null)
			a.rgb = e.rgb.slice(-6);
		if (e.auto != null) {}
		if (a.theme != null && !a.rgb && r.themeElements) {
			a.rgb = fn(r.themeElements.clrScheme[a.theme].rgb, a.tint || 0);
			a.raw_rgb = r.themeElements.clrScheme[a.theme].rgb
		}
		return a
	}
	function jn(e, t, r, a) {
		t.Borders = [];
		var n = {},
		i = {};
		var s = false;
		(e[0].match(Le) || []).forEach(function (e) {
			var o = Pe(e);
			switch (je(o[0])) {
			case "<borders": ;
			case "<borders>": ;
			case "</borders>":
				break;
			case "<border": ;
			case "<border>": ;
			case "<border/>":
				n = {};
				if (o.diagonalUp)
					n.diagonalUp = et(o.diagonalUp);
				if (o.diagonalDown)
					n.diagonalDown = et(o.diagonalDown);
				t.Borders.push(n);
				break;
			case "</border>":
				break;
			case "<left/>":
				break;
			case "<left": ;
			case "<left>":
				i = n.left = {};
				if (o.style)
					i.style = o.style;
				break;
			case "</left>":
				break;
			case "<right/>":
				break;
			case "<right": ;
			case "<right>":
				i = n.right = {};
				if (o.style)
					i.style = o.style;
				break;
			case "</right>":
				break;
			case "<top/>":
				break;
			case "<top": ;
			case "<top>":
				i = n.top = {};
				if (o.style)
					i.style = o.style;
				break;
			case "</top>":
				break;
			case "<bottom/>":
				break;
			case "<bottom": ;
			case "<bottom>":
				i = n.bottom = {};
				if (o.style)
					i.style = o.style;
				break;
			case "</bottom>":
				break;
			case "<diagonal": ;
			case "<diagonal>": ;
			case "<diagonal/>":
				break;
			case "</diagonal>":
				n.diagonal = i;
				i = {};
				break;
			case "<horizontal": ;
			case "<horizontal>": ;
			case "<horizontal/>":
				break;
			case "</horizontal>":
				n.horizontal = i;
				i = {};
				break;
			case "<vertical": ;
			case "<vertical>": ;
			case "<vertical/>":
				break;
			case "</vertical>":
				n.vertical = i;
				i = {};
				break;
			case "<start": ;
			case "<start>": ;
			case "<start/>":
				break;
			case "</start>":
				break;
			case "<end": ;
			case "<end>": ;
			case "<end/>":
				break;
			case "</end>":
				break;
			case "<color": ;
			case "<color>":
				if (!i.color)
					i.color = {};
				if (o.auto)
					i.color.auto = et(o.auto);
				if (o.rgb != null)
					i.color.rgb = o.rgb.slice(-6);
				else if (o.indexed) {
					i.color.index = parseInt(o.indexed, 10);
					i.color.rgb = Mn(i.color.index, t.Indexed, true)
				} else if (o.theme) {
					i.color.theme = parseInt(o.theme, 10);
					if (o.tint)
						i.color.tint = parseFloat(o.tint);
					if (o.theme && r.themeElements && r.themeElements.clrScheme) {
						i.color.rgb = fn(r.themeElements.clrScheme[i.color.theme].rgb, i.color.tint || 0)
					}
				}
				break;
			case "<color/>": ;
			case "</color>":
				break;
			case "<extLst": ;
			case "<extLst>": ;
			case "</extLst>":
				break;
			case "<ext":
				s = true;
				break;
			case "</ext>":
				s = false;
				break;
			default:
				if (a && a.WTF) {
					if (!s)
						throw new Error("unrecognized " + o[0] + " in borders")
				};
			}
		})
	}
	function Wn(e, t) {
		var r = ["<" + t];
		if (!e || !e.style)
			return r[0] + "/>";
		r.push(' style="' + e.style + '"');
		if (!e.color)
			return r.join("") + "/>";
		r.push(">");
		r.push(ji(e.color, true));
		return r.join("") + "</" + t + ">"
	}
	function Un(e) {
		var t = [];
		e.forEach(function (e) {
			var r = [];
			r.push(Wn(e.left, "left"));
			r.push(Wn(e.right, "right"));
			r.push(Wn(e.top, "top"));
			r.push(Wn(e.bottom, "bottom"));
			r.push(Wn(e.diagonal, "diagonal"));
			t.push("<border>" + r.join("") + "</border>")
		});
		return '<borders count="' + t.length + '">' + t.join("") + "</borders>"
	}
	function $n(e, t, r, a) {
		t.Fills = [];
		var n = {},
		i = {},
		s = false;
		var o = false;
		(e[0].match(Le) || []).forEach(function (e) {
			var l = Pe(e);
			switch (je(l[0])) {
			case "<fills": ;
			case "<fills>": ;
			case "</fills>":
				break;
			case "<fill>": ;
			case "<fill": ;
			case "<fill/>":
				n = {};
				t.Fills.push(n);
				break;
			case "</fill>":
				break;
			case "<gradientFill>":
				n.stops = [];
				break;
			case "<gradientFill":
				n.stops = [];
				if (l["degree"])
					n.degree = l.degree;
				break;
			case "</gradientFill>":
				break;
			case "<patternFill": ;
			case "<patternFill>":
				if (l.patternType)
					n.patternType = l.patternType;
				break;
			case "<patternFill/>": ;
			case "</patternFill>":
				if (s)
					throw new Error("bad stop");
				break;
			case "<bgColor": ;
			case "<fgColor":
				var c = je(l[0]) == "<bgColor" ? "bgColor" : "fgColor";
				if (!n[c])
					n[c] = {};
				var f = n[c];
				if (l.indexed != null) {
					f.index = parseInt(l.indexed, 10);
					f.rgb = Mn(f.index, t.Indexed)
				}
				if (l.theme != null)
					f.theme = parseInt(l.theme, 10);
				if (l.tint != null)
					f.tint = parseFloat(l.tint);
				if (l.rgb != null)
					f.rgb = l.rgb.slice(-6);
				if (l.auto != null)
					delete n[c];
				if (f.theme != null && !f.rgb && r.themeElements) {
					f.rgb = fn(r.themeElements.clrScheme[f.theme].rgb, f.tint || 0);
					if (a.WTF)
						f.raw_rgb = r.themeElements.clrScheme[f.theme].rgb
				}
				break;
			case "<bgColor/>": ;
			case "</bgColor>": ;
			case "<fgColor/>": ;
			case "</fgColor>":
				break;
			case "<stop>":
				s = true;
				i = {};
				break;
			case "<stop":
				s = true;
				i = {};
				if (l["position"])
					i.position = parseInt(l["position"], 10);
				break;
			case "<stop/>":
				break;
			case "</stop>":
				s = false;
				if (i.position == null)
					n.stops.push(i);
				else
					n.stops[i.position] = i;
				break;
			case "<color": ;
			case "<color/>":
				break;
			case "</color>":
				break;
			case "<extLst": ;
			case "<extLst>": ;
			case "</extLst>":
				break;
			case "<ext":
				o = true;
				break;
			case "</ext>":
				o = false;
				break;
			default:
				if (a && a.WTF) {
					if (!o)
						throw new Error("unrecognized " + l[0] + " in fills")
				};
			}
		})
	}
	function Hn(e) {
		var t = [];
		e.forEach(function (e) {
			var r = null;
			if (e.fgColor) {
				r = (r || "") + "<fgColor ";
				if (e.fgColor.theme)
					r += 'theme="' + e.fgColor.theme + '"' + (e.fgColor.tint ? ' tint="' + e.fgColor.tint + '"' : "") + "/>";
				else if (e.fgColor.index != null && e.fgColor.rgb == null)
					r += 'indexed="' + e.fgColor.index + '"/>';
				else if (e.fgColor.auto)
					r += 'auto="1"/>';
				else if (e.fgColor.rgb != null)
					r += 'rgb="FF' + Pi(e.fgColor.rgb) + '"/>';
				else
					throw new Error("Bad color " + X(e.fgColor).join("|"));
				if (e.patternType == "solid" && !e.bgColor)
					e.bgColor = {
						index: 64
					}
			}
			if (e.bgColor) {
				r = (r || "") + "<bgColor ";
				if (e.bgColor.theme)
					r += 'theme="' + e.bgColor.theme + '"/>';
				else if (e.bgColor.index != null && e.bgColor.rgb == null)
					r += 'indexed="' + e.bgColor.index + '"/>';
				else if (e.bgColor.auto)
					r += 'auto="1"/>';
				else if (e.bgColor.rgb != null)
					r += 'rgb="FF' + Pi(e.bgColor.rgb) + '"/>';
				else
					throw new Error("Bad color " + X(e.bgColor).join("|"))
			}
			t.push("<fill>" + mt("patternFill", r, {
					patternType: e.patternType
				}) + "</fill>")
		});
		return '<fills count="' + t.length + '">' + t.join("") + "</fills>"
	}
	function Xn(e, t, r, a) {
		t.Fonts = [];
		var n = {};
		var s = false;
		(e[0].match(Le) || []).forEach(function (e) {
			var o = Pe(e);
			switch (je(o[0])) {
			case "<fonts": ;
			case "<fonts>": ;
			case "</fonts>":
				break;
			case "<font": ;
			case "<font>":
				break;
			case "</font>": ;
			case "<font/>":
				t.Fonts.push(n);
				n = {};
				break;
			case "<name":
				if (o.val)
					n.name = tt(o.val);
				break;
			case "<name/>": ;
			case "</name>":
				break;
			case "<b":
				n.bold = o.val ? et(o.val) : 1;
				break;
			case "<b/>":
				n.bold = 1;
				break;
			case "<i":
				n.italic = o.val ? et(o.val) : 1;
				break;
			case "<i/>":
				n.italic = 1;
				break;
			case "<u":
				switch (o.val) {
				case "none":
					n.underline = 0;
					break;
				case "single":
					n.underline = 1;
					break;
				case "double":
					n.underline = 2;
					break;
				case "singleAccounting":
					n.underline = 33;
					break;
				case "doubleAccounting":
					n.underline = 34;
					break;
				}
				break;
			case "<u/>":
				n.underline = 1;
				break;
			case "<strike":
				n.strike = o.val ? et(o.val) : 1;
				break;
			case "<strike/>":
				n.strike = 1;
				break;
			case "<outline":
				n.outline = o.val ? et(o.val) : 1;
				break;
			case "<outline/>":
				n.outline = 1;
				break;
			case "<shadow":
				n.shadow = o.val ? et(o.val) : 1;
				break;
			case "<shadow/>":
				n.shadow = 1;
				break;
			case "<condense":
				n.condense = o.val ? et(o.val) : 1;
				break;
			case "<condense/>":
				n.condense = 1;
				break;
			case "<extend":
				n.extend = o.val ? et(o.val) : 1;
				break;
			case "<extend/>":
				n.extend = 1;
				break;
			case "<sz":
				if (o.val)
					n.sz = +o.val;
				break;
			case "<sz/>": ;
			case "</sz>":
				break;
			case "<vertAlign":
				if ((o.val || "none") != "none")
					n.valign = o.val.replace("script", "");
				break;
			case "<vertAlign/>": ;
			case "</vertAlign>":
				break;
			case "<family":
				if (o.val)
					n.family = parseInt(o.val, 10);
				break;
			case "<family/>": ;
			case "</family>":
				break;
			case "<scheme":
				if (o.val)
					n.scheme = o.val;
				break;
			case "<scheme/>": ;
			case "</scheme>":
				break;
			case "<charset":
				if (o.val == "1")
					break;
				o.codepage = i[parseInt(o.val, 10)];
				break;
			case "<color":
				if (!n.color)
					n.color = {};
				if (o.auto)
					n.color.auto = et(o.auto);
				if (o.rgb)
					n.color.rgb = o.rgb.slice(-6);
				else if (o.indexed) {
					n.color.index = parseInt(o.indexed, 10);
					n.color.rgb = Mn(n.color.index, t.Indexed)
				} else if (o.theme) {
					n.color.theme = parseInt(o.theme, 10);
					if (o.tint)
						n.color.tint = parseFloat(o.tint);
					if (o.theme && r.themeElements && r.themeElements.clrScheme) {
						n.color.rgb = fn(r.themeElements.clrScheme[n.color.theme].rgb, n.color.tint || 0)
					}
				}
				break;
			case "<color/>": ;
			case "</color>":
				break;
			case "<AlternateContent":
				s = true;
				break;
			case "</AlternateContent>":
				s = false;
				break;
			case "<extLst": ;
			case "<extLst>": ;
			case "</extLst>":
				break;
			case "<ext":
				s = true;
				break;
			case "</ext>":
				s = false;
				break;
			default:
				if (a && a.WTF) {
					if (!s)
						throw new Error("unrecognized " + o[0] + " in fonts")
				};
			}
		})
	}
	var Vn = {
		0: "none",
		1: "single",
		2: "double",
		33: "singleAccounting",
		34: "doubleAccounting"
	};
	function Gn(e) {
		var t = [];
		e.forEach(function (e) {
			var r = ["<font>"];
			if (e.bold)
				r.push("<b/>");
			if (e.italic)
				r.push("<i/>");
			if (e.strike)
				r.push("<strike/>");
			if (e.shadow)
				r.push("<shadow/>");
			if (Vn[+e.underline])
				r.push('<u val="' + Vn[+e.underline] + '"/>');
			if (e.sz)
				r.push('<sz val="' + e.sz + '"/>');
			if (e.color) {
				r.push(ji(e.color, true))
			}
			if (e.name)
				r.push('<name val="' + e.name + '"/>');
			if (e.family)
				r.push('<family val="' + e.family + '"/>');
			if (e.scheme)
				r.push('<scheme val="' + e.scheme + '"/>');
			if (e.valign)
				r.push('<vertAlign val="' + e.valign + (e.valign == "sub" || e.valign == "super" ? "script" : "") + '"/>');
			t.push(r.join("") + "</font>")
		});
		return '<fonts count="' + t.length + '">' + t.join("") + "</fonts>"
	}
	function Zn(e, t, r) {
		t.NumberFmt = [];
		var a = X(R._table);
		for (var n = 0; n < a.length; ++n)
			t.NumberFmt[a[n]] = R._table[a[n]];
		var i = e[0].match(Le);
		if (!i)
			return;
		for (n = 0; n < i.length; ++n) {
			var s = Pe(i[n]);
			switch (je(s[0])) {
			case "<numFmts": ;
			case "</numFmts>": ;
			case "<numFmts/>": ;
			case "<numFmts>":
				break;
			case "<numFmt": {
					var o = $e(tt(s.formatCode)),
					l = parseInt(s.numFmtId, 10);
					t.NumberFmt[l] = o;
					if (l > 0) {
						if (l > 392) {
							for (l = 392; l > 60; --l)
								if (t.NumberFmt[l] == null)
									break;
							t.NumberFmt[l] = o
						}
						R.load(o, l)
					}
				}
				break;
			case "</numFmt>":
				break;
			default:
				if (r.WTF)
					throw new Error("unrecognized " + s[0] + " in numFmts");
			}
		}
	}
	function qn(e) {
		var t = ["<numFmts>"];
		[[5, 8], [23, 26], [41, 44], [50, 392]].forEach(function (r) {
			for (var a = r[0]; a <= r[1]; ++a)
				if (e[a] != null)
					t[t.length] = mt("numFmt", null, {
							numFmtId: a,
							formatCode: Ve(e[a])
						})
		});
		if (t.length === 1)
			return "";
		t[t.length] = "</numFmts>";
		t[0] = mt("numFmts", null, {
				count: t.length - 2
			}).replace("/>", ">");
		return t.join("")
	}
	var Yn = ["numFmtId", "fillId", "fontId", "borderId", "xfId"];
	var Kn = ["applyAlignment", "applyBorder", "applyFill", "applyFont", "applyNumberFormat", "applyProtection", "pivotButton", "quotePrefix"];
	function Jn(e, t, r) {
		t.CellXf = [];
		var a;
		var n = false;
		(e[0].match(Le) || []).forEach(function (e) {
			var i = Pe(e),
			s = 0;
			switch (je(i[0])) {
			case "<cellXfs": ;
			case "<cellXfs>": ;
			case "<cellXfs/>": ;
			case "</cellXfs>":
				break;
			case "<xf": ;
			case "<xf/>":
				a = i;
				delete a[0];
				for (s = 0; s < Yn.length; ++s)
					if (a[Yn[s]])
						a[Yn[s]] = parseInt(a[Yn[s]], 10);
				for (s = 0; s < Kn.length; ++s)
					if (a[Kn[s]])
						a[Kn[s]] = et(a[Kn[s]]);
				if (a.numFmtId > 392) {
					for (s = 392; s > 60; --s)
						if (t.NumberFmt[a.numFmtId] == t.NumberFmt[s]) {
							a.numFmtId = s;
							break
						}
				}
				if (t.CellStyleXf && a.xfId && t.CellStyleXf[a.xfId]) {
					if (t.CellStyleXf[a.xfId].style)
						a.style = t.CellStyleXf[a.xfId].style
				}
				t.CellXf.push(a);
				break;
			case "</xf>":
				break;
			case "<alignment": ;
			case "<alignment/>":
				var o = {};
				if (i.vertical)
					o.vertical = i.vertical;
				if (i.horizontal)
					o.horizontal = i.horizontal;
				if (i.textRotation != null)
					o.textRotation = i.textRotation;
				if (i.indent)
					o.indent = i.indent;
				if (i.wrapText)
					o.wrapText = et(i.wrapText);
				if (i.shrinkToFit)
					o.shrinkToFit = et(i.shrinkToFit);
				a.alignment = o;
				break;
			case "</alignment>":
				break;
			case "<protection":
				a.protection = {};
				if (et(i.hidden))
					a.protection.hidden = true;
				if (i.locked != null)
					a.protection.editable = !et(i.locked);
				break;
			case "</protection>": ;
			case "<protection/>":
				break;
			case "<AlternateContent":
				n = true;
				break;
			case "</AlternateContent>":
				n = false;
				break;
			case "<extLst": ;
			case "<extLst>": ;
			case "</extLst>":
				break;
			case "<ext":
				n = true;
				break;
			case "</ext>":
				n = false;
				break;
			default:
				if (r && r.WTF) {
					if (!n)
						throw new Error("unrecognized " + i[0] + " in cellXfs")
				};
			}
		})
	}
	function Qn(e) {
		var t = [];
		t[t.length] = mt("cellXfs", null);
		e.forEach(function (e) {
			var r = e.alignment;
			delete e.alignment;
			var a = e.protection;
			delete e.protection;
			var n = r ? mt("alignment", null, r) : "";
			n += a ? mt("protection", null, {
				hidden: a.hidden ? 1 : 0,
				locked: a.editable ? 0 : 1
			}) : "";
			t[t.length] = mt("xf", n || null, e);
			if (r)
				e.alignment = r;
			if (a)
				e.protection = a
		});
		t[t.length] = "</cellXfs>";
		if (t.length === 2)
			return "";
		t[0] = mt("cellXfs", null, {
				count: t.length - 2
			}).replace("/>", ">");
		return t.join("")
	}
	function ei(e, t, r) {
		t.CellStyleXf = [];
		var a;
		var n = false;
		(e[0].match(Le) || []).forEach(function (e) {
			var i = Pe(e),
			s = 0;
			switch (je(i[0])) {
			case "<cellStyleXfs": ;
			case "<cellStyleXfs>": ;
			case "<cellStyleXfs/>": ;
			case "</cellStyleXfs>":
				break;
			case "<xf": ;
			case "<xf/>":
				a = i;
				delete a[0];
				for (s = 0; s < Yn.length; ++s)
					if (a[Yn[s]])
						a[Yn[s]] = parseInt(a[Yn[s]], 10);
				for (s = 0; s < Kn.length; ++s)
					if (a[Kn[s]])
						a[Kn[s]] = et(a[Kn[s]]);
				if (a.numFmtId > 392) {
					for (s = 392; s > 60; --s)
						if (t.NumberFmt[a.numFmtId] == t.NumberFmt[s]) {
							a.numFmtId = s;
							break
						}
				}
				t.CellStyleXf.push(a);
				break;
			case "</xf>":
				break;
			case "<alignment": ;
			case "<alignment/>":
				var o = {};
				if (i.vertical)
					o.vertical = i.vertical;
				if (i.horizontal)
					o.horizontal = i.horizontal;
				if (i.textRotation != null)
					o.textRotation = i.textRotation;
				if (i.indent)
					o.indent = i.indent;
				if (i.wrapText)
					o.wrapText = i.wrapText;
				if (i.shrinkToFit)
					o.shrinkToFit = et(i.shrinkToFit);
				a.alignment = o;
				break;
			case "</alignment>":
				break;
			case "<protection":
				a.protection = {};
				if (et(i.hidden))
					a.protection.hidden = true;
				if (i.locked != null)
					a.protection.editable = !et(i.locked);
				break;
			case "</protection>": ;
			case "<protection/>":
				break;
			case "<extLst": ;
			case "<extLst>": ;
			case "</extLst>":
				break;
			case "<ext":
				n = true;
				break;
			case "</ext>":
				n = false;
				break;
			default:
				if (r && r.WTF) {
					if (!n)
						throw new Error("unrecognized " + i[0] + " in cellStyleXfs")
				};
			}
		})
	}
	function ti(e) {
		var t = ['<xf numFmtId="0" fontId="0" fillId="0" borderId="0"/>'];
		if (e)
			for (var r = 1; r < e.length; ++r)
				t.push(mt("xf", null, {
						numFmtId: e[r].numFmtId || 0,
						fontId: e[r].fontId || 0,
						fillId: e[r].fillId || 0,
						borderId: e[r].borderId || 0
					}));
		return '<cellStyleXfs count="' + t.length + '">' + t.join("") + "</cellStyleXfs>"
	}
	function ri(e, t, r) {
		if (!t.CellStyleXf)
			t.CellStyleXf = [];
		var a = false;
		(e[0].match(Le) || []).forEach(function (e) {
			var n = Pe(e);
			switch (je(n[0])) {
			case "<cellStyles": ;
			case "<cellStyles>": ;
			case "<cellStyles/>": ;
			case "</cellStyles>":
				break;
			case "<cellStyle": ;
			case "<cellStyle/>":
				delete n[0];
				var i = +n["xfId"];
				if (!t.CellStyleXf[i]) {
					if (!n["builtinId"])
						throw new Error("Could not find CellStyle " + i)
				} else {
					t.CellStyleXf[i].style = tt(n.name)
				}
				break;
			case "</xf>":
				break;
			case "<extLst": ;
			case "<extLst>": ;
			case "</extLst>":
				break;
			case "<ext":
				a = true;
				break;
			case "</ext>":
				a = false;
				break;
			default:
				if (r && r.WTF) {
					if (!a)
						throw new Error("unrecognized " + n[0] + " in cellStyles")
				};
			}
		})
	}
	function ai(e) {
		var t = ['<cellStyle name="Normal" xfId="0" builtinId="0"/>'];
		if (e)
			for (var r = 1; r < e.length; ++r)
				t.push(mt("cellStyle", null, {
						name: e[r].name,
						xfId: r
					}));
		return '<cellStyles count="' + t.length + '">' + t.join("") + "</cellStyles>"
	}
	function ni(e, t, r) {
		if (!t.Indexed)
			t.Indexed = [];
		var a = false;
		(e[0].match(Le) || []).forEach(function (e) {
			var n = Pe(e);
			switch (je(n[0])) {
			case "<indexedColors>": ;
			case "<indexedColors": ;
			case "<indexedColors/>": ;
			case "</indexedColors>":
				break;
			case "<rgbColor":
				delete n[0];
				var i = parseInt(n.rgb.slice(-6), 16);
				t.Indexed.push([i >> 16 & 255, i >> 8 & 255, i & 255]);
				break;
			case "<extLst": ;
			case "<extLst>": ;
			case "</extLst>":
				break;
			case "<ext":
				a = true;
				break;
			case "</ext>":
				a = false;
				break;
			default:
				if (r && r.WTF) {
					if (!a)
						throw new Error("unrecognized " + n[0] + " in cellStyles")
				};
			}
		})
	}
	var ii = function () {
		var e = /<(?:\w+:)?font([^>]*)>[\S\s]*?<\/(?:\w+:)?font>/;
		var t = /<(?:\w+:)?numFmt([^>]*)\/>/;
		var r = /<(?:\w+:)?fill([^>]*)>[\S\s]*?<\/(?:\w+:)?fill>/;
		var a = /<(?:\w+:)?alignment([^>]*)\/>/;
		var n = /<(?:\w+:)?border([^>]*)>[\S\s]*?<\/(?:\w+:)?border>/;
		var i = /<(?:\w+:)?protection([^>]*)\/>/;
		return function s(a, i, o, l) {
			var c = {};
			var f = {};
			var u,
			h;
			if (u = a.match(e)) {
				Xn(u, c, o, l);
				if ((c.Fonts || [])[0])
					fe(f, c.Fonts[0])
			}
			if (u = a.match(t)) {
				h = Pe(tt(u[0]));
				f.z = h.formatCode ? $e(h.formatCode) : (i.NumberFmt || [])[+h.numFmtId] || "General"
			}
			if (u = a.match(r)) {
				$n(u, c, o, l);
				if ((c.Fills || [])[0])
					fe(f, c.Fills[0])
			}
			if (u = a.match(n)) {
				jn(u, c, o, l);
				if ((c.Borders || [])[0])
					fe(f, c.Borders[0])
			}
			return f
		}
	}
	();
	var si = /<(?:\w+:)?dxf>[\S\s]*?<\/(?:\w+:)?dxf>/g;
	function oi(e, t, r, a) {
		if (!t.DXF)
			t.DXF = [];
		(e[0].match(si) || []).forEach(function (e) {
			t.DXF.push(ii(e, t, r, a))
		})
	}
	var li = function () {
		return function e(t, r, a, n) {
			var i = false;
			var s = {};
			(t.match(Le) || []).forEach(function (e) {
				var t = Pe(e);
				switch (je(t[0])) {
				case "<tableStyle>": ;
				case "<tableStyle":
					s.name = t.name.replace(/^(Table|Pivot)Style/, "");
					s.rawname = t.name;
					s.pivot = t.pivot ? et(t.pivot) : true;
					s.table = t.table ? et(t.table) : true;
					break;
				case "<tableStyle/>": ;
				case "</tableStyle>":
					break;
				case "<tableStyleElement":
					if (t.type && t.dxfId) {
						if (r.DXF && r.DXF[+t.dxfId]) {
							s[t.type] = r.DXF[+t.dxfId]
						} else
							throw new Error(e + " cannot find DXF")
					}
					break;
				case "<extLst": ;
				case "<extLst>": ;
				case "</extLst>":
					break;
				case "<ext":
					i = true;
					break;
				case "</ext>":
					i = false;
					break;
				default:
					if (n && n.WTF) {
						if (!i)
							throw new Error("unrecognized " + t[0] + " in tableStyle")
					};
				}
			});
			return s
		}
	}
	();
	var ci = /<(?:\w+:)?tableStyle\b.*?>[\S\s]*?<\/(?:\w+:)?tableStyle>/g;
	function fi(e, t, r, a) {
		if (!t.Table)
			t.Table = [];
		(e[0].match(ci) || []).forEach(function (e) {
			t.Table.push(li(e, t, r, a))
		})
	}
	function ui(e, t) {
		var r = {
			bold: "b",
			italic: "i",
			valign: "vertAlign"
		};
		var a = ["<dxf>"];
		var n = [],
		i = [],
		s = [],
		o = [],
		l = [],
		c = [];
		X(e).forEach(function (e) {
			switch (e) {
			case "bold": ;
			case "italic": ;
			case "strike": ;
			case "underline": ;
			case "color": ;
			case "valign": ;
			case "sz": ;
			case "name": ;
			case "outline": ;
			case "shadow": ;
			case "charset": ;
			case "family": ;
			case "condense": ;
			case "extend": ;
			case "scheme":
				n.push(e);
				break;
			case "bgColor": ;
			case "fgColor":
				s.push(e);
				break;
			case "z":
				i.push(e);
				break;
			case "top": ;
			case "bottom": ;
			case "left": ;
			case "right": ;
			case "diagonal": ;
			case "vertical": ;
			case "horizontal":
				l.push(e);
				break;
			case "patternType": ;
			case "diagonalDown": ;
			case "diagonalUp":
				break;
			case "stops": ;
			case "degree":
				break;
			default:
				throw "Unrecognized " + e + " in DXF";
			}
		});
		if (n.length > 0) {
			a.push("<font>");
			n.forEach(function (t) {
				switch (t) {
				case "bold": ;
				case "italic": ;
				case "strike": ;
				case "outline": ;
				case "shadow": ;
				case "condense": ;
				case "extend":
					a.push("<" + (r[t] || t) + ' val="' + (e[t] ? "1" : "0") + '"/>');
					break;
				case "color":
					a.push(ji(e[t], t, true));
					break;
				case "family": ;
				case "name": ;
				case "sz": ;
				case "scheme":
					a.push("<" + (r[t] || t) + ' val="' + e[t] + '"/>');
					break;
				case "underline":
					a.push('<u val="' + Vn[e[t] || 0] + '"/>');
					break;
				case "valign":
					a.push('<vertAlign val="' + e.valign + (e.valign == "sub" || e.valign == "super" ? "script" : "") + '"/>');
					break;
				default:
					throw "Unsupported " + t + " : font DXF";
				}
			});
			a.push("</font>")
		}
		if (i.length > 0)
			a.push('<numFmt formatCode="' + Ve(e.z) + '" numFmtId="' + $s(e.z, t) + '"/>');
		if (s.length > 0) {
			a.push("<fill>");
			a.push("<patternFill" + (e.patternType ? ' patternType="' + e.patternType + '">' : ">"));
			s.forEach(function (t) {
				switch (t) {
				case "patternType":
					break;
				case "fgColor": ;
				case "bgColor":
					a.push(ji(e[t], t, true));
					break;
				default:
					throw "Unsupported " + t + " : fill DXF";
				}
			});
			a.push("</patternFill>");
			a.push("</fill>")
		}
		if (o.length > 0)
			throw "Unsupported align - DXF";
		if (l.length > 0) {
			a.push(["<border", e.diagonalDown != null ? ' diagonalDown="' +  + !!e.diagonalDown + '"' : "", e.diagonalUp != null ? ' diagonalUp="' +  + !!e.diagonalUp + '"' : "", ">"].join(""));
			l.forEach(function (t) {
				a.push(Wn(e[t], t))
			});
			a.push("</border>")
		} else if (e.diagonalDown != null || e.diagonalUp != null)
			a.push(["<border", e.diagonalDown != null ? ' diagonalDown="' +  + !!e.diagonalDown + '"' : "", e.diagonalUp != null ? ' diagonalUp="' +  + !!e.diagonalUp + '"' : "", "/>"].join(""));
		if (c.length > 0)
			throw "Unsupported protection - DXF";
		return a.length == 1 ? "<dxf/>" : a.join("") + "</dxf>"
	}
	function hi(e, t) {
		if (!e.length)
			return '<dxfs count="0"/>';
		var r = ['<dxfs count="' + e.length + '">'];
		e.forEach(function (e) {
			r.push(ui(e, t))
		});
		return r.join("") + "</dxfs>"
	}
	var di = function uu() {
		var e = /<(?:\w+:)?numFmts([^>]*)>[\S\s]*?<\/(?:\w+:)?numFmts>/;
		var t = /<(?:\w+:)?cellStyleXfs([^>]*)>[\S\s]*?<\/(?:\w+:)?cellStyleXfs>/;
		var r = /<(?:\w+:)?cellStyles([^>]*)>[\S\s]*?<\/(?:\w+:)?cellStyles>/;
		var a = /<(?:\w+:)?cellXfs([^>]*)>[\S\s]*?<\/(?:\w+:)?cellXfs>/;
		var n = /<(?:\w+:)?fills([^>]*)>[\S\s]*?<\/(?:\w+:)?fills>/;
		var i = /<(?:\w+:)?fonts([^>]*)>[\S\s]*?<\/(?:\w+:)?fonts>/;
		var s = /<(?:\w+:)?borders([^>]*)>[\S\s]*?<\/(?:\w+:)?borders>/;
		var o = /<(?:\w+:)?indexedColors([^>]*)>[\S\s]*?<\/(?:\w+:)?indexedColors>/;
		var l = /<(?:\w+:)?tableStyles([^>]*)>[\S\s]*?<\/(?:\w+:)?tableStyles>/;
		var c = /<(?:\w+:)?dxfs([^>]*)>[\S\s]*?<\/(?:\w+:)?dxfs>/;
		return function f(u, h, d) {
			var p = {};
			if (!u)
				return p;
			u = u.replace(/<!--([\s\S]*?)-->/gm, "").replace(/<!DOCTYPE[^\[]*\[[^\]]*\]>/gm, "");
			var m;
			if (m = u.match(o))
				ni(m, p, d);
			if (m = u.match(e))
				Zn(m, p, d);
			if (m = u.match(i))
				Xn(m, p, h, d);
			if (m = u.match(n))
				$n(m, p, h, d);
			if (m = u.match(s))
				jn(m, p, h, d);
			if (m = u.match(t))
				ei(m, p, d);
			if (m = u.match(r))
				ri(m, p, d);
			if (m = u.match(a))
				Jn(m, p, d);
			if (m = u.match(c))
				oi(m, p, h, d);
			if (m = u.match(l))
				fi(m, p, h, d);
			if ((p.Fonts || [])[0])
				Nn(p.Fonts[0]);
			return p
		}
	}
	();
	var pi = mt("styleSheet", null, {
			xmlns: wt.main[0],
			"xmlns:vt": wt.vt
		});
	ua.STY = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles";
	function mi(e, t) {
		var r = [Ie, pi],
		a;
		if (e.SSF && (a = qn(e.SSF)) != null)
			r[r.length] = a;
		r[r.length] = Gn((e.Styles || {}).Fonts || [], t);
		r[r.length] = Hn((e.Styles || {}).Fills || [], t);
		r[r.length] = Un((e.Styles || {}).Borders || [], t);
		r[r.length] = ti(t.cellStyleXfs);
		if (a = Qn(t.cellXfs))
			r[r.length] = a;
		r[r.length] = ai(t.cellStyleXfs, t);
		r[r.length] = hi((e.Styles || {}).DXF || [], t);
		r[r.length] = '<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4"/>';
		if (r.length > 2) {
			r[r.length] = "</styleSheet>";
			r[1] = r[1].replace("/>", ">")
		}
		return r.join("")
	}
	ua.THEME = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme";
	var vi = ["</a:lt1>", "</a:dk1>", "</a:lt2>", "</a:dk2>", "</a:accent1>", "</a:accent2>", "</a:accent3>", "</a:accent4>", "</a:accent5>", "</a:accent6>", "</a:hlink>", "</a:folHlink>"];
	function gi(e, t, r) {
		t.themeElements.clrScheme = [];
		var a = {};
		(e[0].match(Le) || []).forEach(function (e) {
			var n = Pe(e);
			switch (n[0]) {
			case "<a:clrScheme": ;
			case "</a:clrScheme>":
				break;
			case "<a:srgbClr":
				a.rgb = n.val;
				break;
			case "<a:sysClr":
				a.rgb = n.lastClr;
				break;
			case "<a:dk1>": ;
			case "</a:dk1>": ;
			case "<a:lt1>": ;
			case "</a:lt1>": ;
			case "<a:dk2>": ;
			case "</a:dk2>": ;
			case "<a:lt2>": ;
			case "</a:lt2>": ;
			case "<a:accent1>": ;
			case "</a:accent1>": ;
			case "<a:accent2>": ;
			case "</a:accent2>": ;
			case "<a:accent3>": ;
			case "</a:accent3>": ;
			case "<a:accent4>": ;
			case "</a:accent4>": ;
			case "<a:accent5>": ;
			case "</a:accent5>": ;
			case "<a:accent6>": ;
			case "</a:accent6>": ;
			case "<a:hlink>": ;
			case "</a:hlink>": ;
			case "<a:folHlink>": ;
			case "</a:folHlink>":
				if (n[0].charAt(1) === "/") {
					t.themeElements.clrScheme[vi.indexOf(n[0])] = a;
					a = {}
				} else {
					a.name = n[0].slice(3, n[0].length - 1)
				}
				break;
			default:
				if (r && r.WTF)
					throw new Error("Unrecognized " + n[0] + " in clrScheme");
			}
		})
	}
	function bi() {}
	function yi() {}
	var wi = /<a:clrScheme([^>]*)>[\s\S]*<\/a:clrScheme>/;
	var ki = /<a:fontScheme([^>]*)>[\s\S]*<\/a:fontScheme>/;
	var xi = /<a:fmtScheme([^>]*)>[\s\S]*<\/a:fmtScheme>/;
	function _i(e, t, r) {
		t.themeElements = {};
		var a;
		[["clrScheme", wi, gi], ["fontScheme", ki, bi], ["fmtScheme", xi, yi]].forEach(function (n) {
			if (!(a = e.match(n[1])))
				throw new Error(n[0] + " not found in themeElements");
			n[2](a, t, r)
		})
	}
	var Ci = /<a:themeElements([^>]*)>[\s\S]*<\/a:themeElements>/;
	function Si(e, t) {
		if (!e || e.length === 0)
			return Si(Ai());
		var r;
		var a = {};
		if (!(r = e.match(Ci)))
			throw new Error("themeElements not found in theme");
		_i(r[0], a, t);
		a.raw = e;
		return a
	}
	function Ai(e, t) {
		if (t && t.themeXLSX)
			return t.themeXLSX;
		if (e && typeof e.raw == "string")
			return e.raw;
		var r = [Ie];
		r[r.length] = '<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme">';
		r[r.length] = "<a:themeElements>";
		r[r.length] = '<a:clrScheme name="Office">';
		r[r.length] = '<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>';
		r[r.length] = '<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>';
		r[r.length] = '<a:dk2><a:srgbClr val="1F497D"/></a:dk2>';
		r[r.length] = '<a:lt2><a:srgbClr val="EEECE1"/></a:lt2>';
		r[r.length] = '<a:accent1><a:srgbClr val="4F81BD"/></a:accent1>';
		r[r.length] = '<a:accent2><a:srgbClr val="C0504D"/></a:accent2>';
		r[r.length] = '<a:accent3><a:srgbClr val="9BBB59"/></a:accent3>';
		r[r.length] = '<a:accent4><a:srgbClr val="8064A2"/></a:accent4>';
		r[r.length] = '<a:accent5><a:srgbClr val="4BACC6"/></a:accent5>';
		r[r.length] = '<a:accent6><a:srgbClr val="F79646"/></a:accent6>';
		r[r.length] = '<a:hlink><a:srgbClr val="0000FF"/></a:hlink>';
		r[r.length] = '<a:folHlink><a:srgbClr val="800080"/></a:folHlink>';
		r[r.length] = "</a:clrScheme>";
		r[r.length] = '<a:fontScheme name="Office">';
		r[r.length] = "<a:majorFont>";
		r[r.length] = '<a:latin typeface="Cambria"/>';
		r[r.length] = '<a:ea typeface=""/>';
		r[r.length] = '<a:cs typeface=""/>';
		r[r.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>';
		r[r.length] = '<a:font script="Hang" typeface="맑은 고딕"/>';
		r[r.length] = '<a:font script="Hans" typeface="宋体"/>';
		r[r.length] = '<a:font script="Hant" typeface="新細明體"/>';
		r[r.length] = '<a:font script="Arab" typeface="Times New Roman"/>';
		r[r.length] = '<a:font script="Hebr" typeface="Times New Roman"/>';
		r[r.length] = '<a:font script="Thai" typeface="Tahoma"/>';
		r[r.length] = '<a:font script="Ethi" typeface="Nyala"/>';
		r[r.length] = '<a:font script="Beng" typeface="Vrinda"/>';
		r[r.length] = '<a:font script="Gujr" typeface="Shruti"/>';
		r[r.length] = '<a:font script="Khmr" typeface="MoolBoran"/>';
		r[r.length] = '<a:font script="Knda" typeface="Tunga"/>';
		r[r.length] = '<a:font script="Guru" typeface="Raavi"/>';
		r[r.length] = '<a:font script="Cans" typeface="Euphemia"/>';
		r[r.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>';
		r[r.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>';
		r[r.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>';
		r[r.length] = '<a:font script="Thaa" typeface="MV Boli"/>';
		r[r.length] = '<a:font script="Deva" typeface="Mangal"/>';
		r[r.length] = '<a:font script="Telu" typeface="Gautami"/>';
		r[r.length] = '<a:font script="Taml" typeface="Latha"/>';
		r[r.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>';
		r[r.length] = '<a:font script="Orya" typeface="Kalinga"/>';
		r[r.length] = '<a:font script="Mlym" typeface="Kartika"/>';
		r[r.length] = '<a:font script="Laoo" typeface="DokChampa"/>';
		r[r.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>';
		r[r.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>';
		r[r.length] = '<a:font script="Viet" typeface="Times New Roman"/>';
		r[r.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>';
		r[r.length] = '<a:font script="Geor" typeface="Sylfaen"/>';
		r[r.length] = "</a:majorFont>";
		r[r.length] = "<a:minorFont>";
		r[r.length] = '<a:latin typeface="Calibri"/>';
		r[r.length] = '<a:ea typeface=""/>';
		r[r.length] = '<a:cs typeface=""/>';
		r[r.length] = '<a:font script="Jpan" typeface="ＭＳ Ｐゴシック"/>';
		r[r.length] = '<a:font script="Hang" typeface="맑은 고딕"/>';
		r[r.length] = '<a:font script="Hans" typeface="宋体"/>';
		r[r.length] = '<a:font script="Hant" typeface="新細明體"/>';
		r[r.length] = '<a:font script="Arab" typeface="Arial"/>';
		r[r.length] = '<a:font script="Hebr" typeface="Arial"/>';
		r[r.length] = '<a:font script="Thai" typeface="Tahoma"/>';
		r[r.length] = '<a:font script="Ethi" typeface="Nyala"/>';
		r[r.length] = '<a:font script="Beng" typeface="Vrinda"/>';
		r[r.length] = '<a:font script="Gujr" typeface="Shruti"/>';
		r[r.length] = '<a:font script="Khmr" typeface="DaunPenh"/>';
		r[r.length] = '<a:font script="Knda" typeface="Tunga"/>';
		r[r.length] = '<a:font script="Guru" typeface="Raavi"/>';
		r[r.length] = '<a:font script="Cans" typeface="Euphemia"/>';
		r[r.length] = '<a:font script="Cher" typeface="Plantagenet Cherokee"/>';
		r[r.length] = '<a:font script="Yiii" typeface="Microsoft Yi Baiti"/>';
		r[r.length] = '<a:font script="Tibt" typeface="Microsoft Himalaya"/>';
		r[r.length] = '<a:font script="Thaa" typeface="MV Boli"/>';
		r[r.length] = '<a:font script="Deva" typeface="Mangal"/>';
		r[r.length] = '<a:font script="Telu" typeface="Gautami"/>';
		r[r.length] = '<a:font script="Taml" typeface="Latha"/>';
		r[r.length] = '<a:font script="Syrc" typeface="Estrangelo Edessa"/>';
		r[r.length] = '<a:font script="Orya" typeface="Kalinga"/>';
		r[r.length] = '<a:font script="Mlym" typeface="Kartika"/>';
		r[r.length] = '<a:font script="Laoo" typeface="DokChampa"/>';
		r[r.length] = '<a:font script="Sinh" typeface="Iskoola Pota"/>';
		r[r.length] = '<a:font script="Mong" typeface="Mongolian Baiti"/>';
		r[r.length] = '<a:font script="Viet" typeface="Arial"/>';
		r[r.length] = '<a:font script="Uigh" typeface="Microsoft Uighur"/>';
		r[r.length] = '<a:font script="Geor" typeface="Sylfaen"/>';
		r[r.length] = "</a:minorFont>";
		r[r.length] = "</a:fontScheme>";
		r[r.length] = '<a:fmtScheme name="Office">';
		r[r.length] = "<a:fillStyleLst>";
		r[r.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>';
		r[r.length] = '<a:gradFill rotWithShape="1">';
		r[r.length] = "<a:gsLst>";
		r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="50000"/><a:satMod val="300000"/></a:schemeClr></a:gs>';
		r[r.length] = '<a:gs pos="35000"><a:schemeClr val="phClr"><a:tint val="37000"/><a:satMod val="300000"/></a:schemeClr></a:gs>';
		r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="15000"/><a:satMod val="350000"/></a:schemeClr></a:gs>';
		r[r.length] = "</a:gsLst>";
		r[r.length] = '<a:lin ang="16200000" scaled="1"/>';
		r[r.length] = "</a:gradFill>";
		r[r.length] = '<a:gradFill rotWithShape="1">';
		r[r.length] = "<a:gsLst>";
		r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="100000"/><a:shade val="100000"/><a:satMod val="130000"/></a:schemeClr></a:gs>';
		r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:tint val="50000"/><a:shade val="100000"/><a:satMod val="350000"/></a:schemeClr></a:gs>';
		r[r.length] = "</a:gsLst>";
		r[r.length] = '<a:lin ang="16200000" scaled="0"/>';
		r[r.length] = "</a:gradFill>";
		r[r.length] = "</a:fillStyleLst>";
		r[r.length] = "<a:lnStyleLst>";
		r[r.length] = '<a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"><a:shade val="95000"/><a:satMod val="105000"/></a:schemeClr></a:solidFill><a:prstDash val="solid"/></a:ln>';
		r[r.length] = '<a:ln w="25400" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>';
		r[r.length] = '<a:ln w="38100" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/></a:ln>';
		r[r.length] = "</a:lnStyleLst>";
		r[r.length] = "<a:effectStyleLst>";
		r[r.length] = "<a:effectStyle>";
		r[r.length] = "<a:effectLst>";
		r[r.length] = '<a:outerShdw blurRad="40000" dist="20000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="38000"/></a:srgbClr></a:outerShdw>';
		r[r.length] = "</a:effectLst>";
		r[r.length] = "</a:effectStyle>";
		r[r.length] = "<a:effectStyle>";
		r[r.length] = "<a:effectLst>";
		r[r.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>';
		r[r.length] = "</a:effectLst>";
		r[r.length] = "</a:effectStyle>";
		r[r.length] = "<a:effectStyle>";
		r[r.length] = "<a:effectLst>";
		r[r.length] = '<a:outerShdw blurRad="40000" dist="23000" dir="5400000" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="35000"/></a:srgbClr></a:outerShdw>';
		r[r.length] = "</a:effectLst>";
		r[r.length] = '<a:scene3d><a:camera prst="orthographicFront"><a:rot lat="0" lon="0" rev="0"/></a:camera><a:lightRig rig="threePt" dir="t"><a:rot lat="0" lon="0" rev="1200000"/></a:lightRig></a:scene3d>';
		r[r.length] = '<a:sp3d><a:bevelT w="63500" h="25400"/></a:sp3d>';
		r[r.length] = "</a:effectStyle>";
		r[r.length] = "</a:effectStyleLst>";
		r[r.length] = "<a:bgFillStyleLst>";
		r[r.length] = '<a:solidFill><a:schemeClr val="phClr"/></a:solidFill>';
		r[r.length] = '<a:gradFill rotWithShape="1">';
		r[r.length] = "<a:gsLst>";
		r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="40000"/><a:satMod val="350000"/></a:schemeClr></a:gs>';
		r[r.length] = '<a:gs pos="40000"><a:schemeClr val="phClr"><a:tint val="45000"/><a:shade val="99000"/><a:satMod val="350000"/></a:schemeClr></a:gs>';
		r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="20000"/><a:satMod val="255000"/></a:schemeClr></a:gs>';
		r[r.length] = "</a:gsLst>";
		r[r.length] = '<a:path path="circle"><a:fillToRect l="50000" t="-80000" r="50000" b="180000"/></a:path>';
		r[r.length] = "</a:gradFill>";
		r[r.length] = '<a:gradFill rotWithShape="1">';
		r[r.length] = "<a:gsLst>";
		r[r.length] = '<a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="80000"/><a:satMod val="300000"/></a:schemeClr></a:gs>';
		r[r.length] = '<a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="30000"/><a:satMod val="200000"/></a:schemeClr></a:gs>';
		r[r.length] = "</a:gsLst>";
		r[r.length] = '<a:path path="circle"><a:fillToRect l="50000" t="50000" r="50000" b="50000"/></a:path>';
		r[r.length] = "</a:gradFill>";
		r[r.length] = "</a:bgFillStyleLst>";
		r[r.length] = "</a:fmtScheme>";
		r[r.length] = "</a:themeElements>";
		r[r.length] = "<a:objectDefaults>";
		r[r.length] = "<a:spDef>";
		r[r.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="1"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="3"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="2"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="lt1"/></a:fontRef></a:style>';
		r[r.length] = "</a:spDef>";
		r[r.length] = "<a:lnDef>";
		r[r.length] = '<a:spPr/><a:bodyPr/><a:lstStyle/><a:style><a:lnRef idx="2"><a:schemeClr val="accent1"/></a:lnRef><a:fillRef idx="0"><a:schemeClr val="accent1"/></a:fillRef><a:effectRef idx="1"><a:schemeClr val="accent1"/></a:effectRef><a:fontRef idx="minor"><a:schemeClr val="tx1"/></a:fontRef></a:style>';
		r[r.length] = "</a:lnDef>";
		r[r.length] = "</a:objectDefaults>";
		r[r.length] = "<a:extraClrSchemeLst/>";
		r[r.length] = "</a:theme>";
		return r.join("")
	}
	function Ti(e) {
		return e / 914400 * xn
	}
	function Ei(e) {
		return e * 914400 / xn
	}
	function Fi(e, t) {
		var r = {
			x: -1,
			y: -1,
			w: -1,
			h: -1
		};
		if (e.pos) {
			r.x = Ti(e.pos.x);
			r.y = Ti(e.pos.y)
		} else if (e.from) {
			r.x = Li(t, e.from.c, "C") + Ti(e.from.cOff);
			r.y = Li(t, e.from.r, "R") + Ti(e.from.rOff)
		} else
			throw "bad anchor start";
		if (e.ext) {
			r.w = Ti(e.ext.x);
			r.h = Ti(e.ext.y)
		} else if (e.to) {
			r.w = Li(t, e.to.c, "C") + Ti(e.to.cOff) - r.x;
			r.h = Li(t, e.to.r, "R") + Ti(e.to.rOff) - r.y
		} else
			throw "bad anchor end";
		return r
	}
	function Di(e, t) {
		var r = {
			r: -1,
			c: -1,
			x: -1,
			y: -1,
			R: -1,
			C: -1,
			X: -1,
			Y: -1
		};
		switch (e.type) {
		case "twoCellAnchor": {
				r.r = e.from.r;
				r.y = Ti(e.from.rOff);
				r.R = e.to.r;
				r.Y = Ti(e.to.rOff);
				r.c = e.from.c;
				r.x = Ti(e.from.cOff);
				r.C = e.to.c;
				r.X = Ti(e.to.cOff)
			}
			break;
		case "oneCellAnchor": {
				r.r = e.from.r;
				r.y = Ti(e.from.rOff);
				var a = Bi(t, r.r, r.y + Ti(e.ext.y));
				r.R = a[0];
				r.Y = a[1];
				r.c = e.from.c;
				r.x = Ti(e.from.cOff);
				var n = Mi(t, r.c, r.x + Ti(e.ext.x));
				r.C = n[0];
				r.X = n[1]
			}
			break;
		case "absoluteAnchor": {
				var i = Bi(t, 0, Ti(e.pos.y));
				r.r = i[0];
				r.y = i[1];
				var s = Bi(t, r.r, r.y + Ti(e.ext.y));
				r.R = s[0];
				r.Y = s[1];
				var o = Bi(t, 0, Ti(e.pos.x));
				r.c = o[0];
				r.x = o[1];
				var l = Bi(t, r.c, r.x + Ti(e.ext.x));
				r.C = l[0];
				r.X = l[1]
			}
			break;
		default:
			throw "bad anchor type " + e.type;
		}
		return r
	}
	function zi(e, t) {
		var r = e.trim().split(/\s*,\s*/);
		t["!pos"] = {
			c: +r[0],
			x: +r[1],
			r: +r[2],
			y: +r[3],
			C: +r[4],
			X: +r[5],
			R: +r[6],
			Y: +r[7]
		}
	}
	function Oi(e, t, r) {
		var a = -1;
		if (e.R != null || e.C != null)
			a = 0;
		else if (e.x != null && e.y != null && e.w != null && e.h != null)
			a = 1 + 2 * !(e.c || e.r);
		else
			throw "cannot parse anchor " + JSON.stringify(e);
		if (a == t)
			return;
		switch (t) {
		case 0: ;
		case 1:
			if (a != 3)
				break;
			var n = Mi(r, e.c || 0, e.x || 0);
			e.c = n[0];
			e.x = n[1];
			var i = Bi(r, e.r || 0, e.y || 0);
			e.r = i[0];
			e.y = i[1];
			break;
		case 3:
			if (a == 3)
				break;
			var s = e.c || 0,
			o = e.x || 0;
			delete e.c;
			delete e.x;
			e.x = (s ? Ni(r, s) : 0) + o;
			var l = e.r || 0,
			c = e.y || 0;
			delete e.r;
			delete e.y;
			e.y = (l ? Ii(r, l) : 0) + c;
			break;
		default:
			throw "convert_anchor unrecognized type " + t;
		}
		switch (t) {
		case 0:
			if (a == 0)
				break;
			var f = Mi(r, e.c || 0, (e.x || 0) + e.w);
			delete e.w;
			e.C = f[0];
			e.X = f[1];
			var u = Bi(r, e.r || 0, (e.y || 0) + e.h);
			delete e.h;
			e.R = u[0];
			e.Y = u[1];
			break;
		case 1: ;
		case 3:
			if (a != 0)
				break;
			var h = e.C || 0,
			d = e.X || 0;
			delete e.C;
			delete e.X;
			e.w = Ni(r, h) + d - (e.c ? Ni(r, e.c) : 0) - (e.x || 0);
			var p = e.R || 0,
			m = e.Y || 0;
			delete e.R;
			delete e.Y;
			e.h = Ii(r, p) + m - (e.r ? Ii(r, e.r) : 0) - (e.y || 0);
			break;
		default:
			throw "convert_anchor unrecognized type " + t;
		}
	}
	function Ri(e) {
		var t = [e.c || 0, e.x || 0, e.r || 0, e.y || 0];
		if (e.h && e.w)
			t = t.concat([t[0], t[1] + e.w, t[2], t[3] + e.h]);
		else
			t = t.concat([e.C || 0, e.X || 0, e.R || 0, e.Y || 0]);
		return t.join(", ")
	}
	function Ii(e, t) {
		if (!e)
			return 0;
		var r = 0;
		while (--t >= 0) {
			var a = ((e["!rows"] || [])[t] || {}).hpx;
			if (a == null)
				a = ((e["!sheetFormat"] || {}).row || {}).hpx;
			if (a == null)
				a = 24;
			r += a
		}
		return r
	}
	function Ni(e, t) {
		if (!e)
			return 0;
		var r = 0;
		while (--t >= 0) {
			var a = ((e["!cols"] || [])[t] || {}).wpx;
			if (a == null)
				a = ((e["!sheetFormat"] || {}).col || {}).wpx;
			if (a == null) {
				var n = {
					wch: 8.43
				};
				wn(n);
				if (e["!cols"])
					e["!cols"][t] = n;
				a = n.wpx
			}
			r += a
		}
		return r
	}
	function Li(e, t, r) {
		return r == "C" ? Ni(e, t) : Ii(e, t)
	}
	function Bi(e, t, r) {
		var a = [t, r];
		if (!e)
			return a;
		for (; ; ) {
			var n = (e["!rows"] || [])[a[0]] || {};
			if (n.hidden) {
				++a[0];
				continue
			}
			var i = n.hpx;
			if (i == null)
				i = ((e["!sheetFormat"] || {}).row || {}).hpx;
			if (i == null)
				i = Cn(15);
			if (a[1] < i)
				break;
			a[0]++;
			a[1] -= i
		}
		return a
	}
	function Mi(e, t, r) {
		var a = [t, r];
		if (!e)
			return a;
		for (; ; ) {
			var n = (e["!cols"] || [])[a[0]] || {};
			if (n.hidden || n.wpx === 0) {
				++a[0];
				continue
			}
			var i = n.wpx;
			if (i == null)
				i = ((e["!sheetFormat"] || {}).col || {}).wpx;
			if (i == null) {
				var s = {
					wch: 8.43
				};
				wn(s);
				if (e["!cols"])
					e["!cols"][a[0]] = s;
				i = s.wpx
			}
			if (a[1] < i)
				break;
			a[0]++;
			a[1] -= i
		}
		return a
	}
	function Pi(e) {
		return ("000000" + (typeof e == "number" ? e.toString(16) : e)).slice(-6)
	}
	function ji(e, t, r) {
		var a = typeof t == "string" ? !!r : !!t;
		if (typeof t != "string")
			t = "color";
		var n = "<" + t + " ";
		if (e.auto)
			return n + 'auto="1"/>';
		if (e.index && e.rgb == null)
			return n + 'indexed="' + e.index + '"/>';
		if (e.theme != null)
			return n + ('theme="' + e.theme + '"') + (e.tint ? ' tint="' + e.tint + '"' : "") + "/>";
		if (e.rgb != null)
			return n + 'rgb="' + (a ? "FF" : "") + Pi(e.rgb) + '"/>';
		return n + "/>"
	}
	function Wi(e, t) {
		if (!e)
			return t;
		if (e.rgb == null)
			return t;
		var r = ("000000" + e.rgb.toString(16)).slice(-6);
		var a = [r.slice(0, 2), r.slice(2, 4), r.slice(4, 6)].map(function (e) {
			return parseInt(e, 16)
		});
		for (var n = 0; n < ea.length; ++n) {
			var i = ea[n];
			if (i[0] == a[0] && i[1] == a[1] && i[2] == a[2])
				return n
		}
		if (ea.length < 64) {
			ea.push([a[0], a[1], a[2]]);
			return ea.length - 1
		}
		return t
	}
	function Ui(e) {
		var t = ["", ""];
		if (!e)
			return t;
		if (e.sz) {
			t[0] += "&" + e.sz;
			t[1] = "&12" + t[1]
		}
		if (e.name) {
			t[0] += '&"' + e.name + ',Regular"';
			t[1] = '&"-,Regular"' + t[1]
		}
		if (e.bold) {
			t[0] += "&B";
			t[1] = "&B" + t[1]
		}
		if (e.underline) {
			var r = e.underline == 2 ? "&E" : "&U";
			t[0] += r;
			t[1] = r + t[1]
		}
		if (e.italic) {
			t[0] += "&I";
			t[1] = "&I" + t[1]
		}
		if (e.color && e.color.rgb != null) {
			t[0] += "&K" + Pi(e.color.rgb);
			t[1] += "&K000000"
		}
		if (e.strike) {
			t[0] += "&S";
			t[1] = "&S" + t[1]
		}
		if (e.valign == "super") {
			t[0] += "&X";
			t[1] = "&X" + t[1]
		}
		if (e.valign == "sub") {
			t[0] += "&Y";
			t[1] = "&Y" + t[1]
		}
		return t
	}
	function $i(e) {
		var t = ["", "", ""];
		if (!e)
			return [];
		var r = "",
		a = e && e.s ? Ui(e.s) : ["", ""];
		if (typeof e == "string")
			return [e, e, e];
		else if (e.first != null || e.even != null || e.odd != null) {
			if (e.odd != null)
				t[0] = $i(e.odd)[0];
			if (e.first === undefined && t[0])
				t[1] = t[0];
			if (e.first != null)
				t[1] = $i(e.first)[0];
			if (e.even != null)
				t[2] = $i(e.even)[0];
			return t
		} else if (e.left || e.center || e.right) {
			if (e.left)
				r += "&L" + $i(e.left)[0];
			if (e.center)
				r += "&C" + $i(e.center)[0];
			if (e.right)
				r += "&R" + $i(e.right)[0];
			return [r, r, r]
		} else if (e.v != null) {
			r = a[0] + e.v.replace(/&/g, "&&") + a[1];
			return [r, r, r]
		} else if (e.w != null) {
			r = a[0] + e.w + a[1];
			return [r, r, r]
		} else if (Array.isArray(e.R)) {
			e.R.forEach(function (e) {
				r += $i(e)[0]
			});
			return [r, r, r]
		}
		return []
	}
	function Hi(e) {
		if (!e || !e.Workbook || !e.Workbook.Names)
			return;
		e.Workbook.Names.forEach(function (t) {
			if (!t.Name || t.Name.slice(0, 6) != "_xlnm.")
				return;
			if (!(t.Name == "_xlnm.Print_Area" || t.Name == "_xlnm.Print_Titles"))
				return;
			var r = e.Sheets[e.SheetNames[t.Sheet]];
			if (!r)
				return;
			if (!r["!print"])
				r["!print"] = {};
			if (!r["!print"].props)
				r["!print"].props = {};
			var a = r["!print"].props;
			var n = t.Ref;
			if (n.indexOf("!") > -1)
				n = n.slice(n.indexOf("!") + 1);
			n = n.replace(/[$]/g, "");
			var i = Ar(n);
			a.area = i
		})
	}
	function Xi(e) {
		var t,
		r;
		if (!e.Workbook)
			e.Workbook = {
				Names: []
			};
		if (!e.Workbook.Names)
			e.Workbook.Names = [];
		var a = e.Workbook.Names;
		for (var n = 0; n < e.SheetNames.length; ++n) {
			var i = e.SheetNames[n],
			s = e.Sheets[i];
			if (!s || !s["!print"])
				continue;
			var o = "'" + i + "'!";
			var l = s["!print"];
			if (!l)
				continue;
			t = l.area;
			r = l.titles;
			var c = !t,
			f = !r;
			var u = t ? typeof t == "string" ? t : Sr(t) : "";
			if (t || r)
				a.forEach(function (e) {
					if (e.Sheet != n)
						return;
					if (!c && e.Name == "_xlnm.Print_Area") {
						c = true;
						e.Ref = o + u
					}
				});
			if (t && !c)
				a.push({
					Name: "_xlnm.Print_Area",
					Ref: o + u,
					Sheet: n
				})
		}
	}
	var Vi = {
		1: "Letter",
		3: "Tabloid",
		5: "Legal",
		7: "Executive",
		8: "A3",
		9: "A4",
		11: "A5",
		12: "B4",
		13: "B5",
		14: "Folio",
		20: "Envelope",
		37: "Monarch",
		70: "A6"
	},
	Gi = G(Vi);
	ua.CONN = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/connections";
	function Zi(e, t, r, a) {
		var n = a || {};
		var i = {
			SheetNames: [],
			Sheets: {}
		},
		s = "",
		o = false;
		var l = {},
		c = -1,
		f = -1,
		u = {
			s: {
				r: 0,
				c: 0
			},
			e: {
				r: -1,
				c: -1
			}
		};
		var h = {},
		d = 0;
		(e || "").replace(Le, function (r, a) {
			var p = Pe(r);
			switch (je(p[0])) {
			case "<?xml":
				break;
			case "<externalLink": ;
			case "</externalLink>":
				break;
			case "<externalBook": ;
			case "<externalBook>":
				s = "book";
				i.Target = t["!id"][p.id].Target;
				i.Missing = t["!id"][p.id].Type == ua.XMISS;
				break;
			case "</externalBook>":
				break;
			case "<sheetNames": ;
			case "<sheetNames>":
				break;
			case "</sheetNames>":
				break;
			case "<sheetName":
				i.SheetNames.push($e(tt(p.val)));
				break;
			case "<sheetDataSet>": ;
			case "<sheetDataSet/>":
				break;
			case "</sheetDataSet>":
				break;
			case "<sheetData":
				l = {};
				i.Sheets[i.SheetNames[p.sheetId]] = et(p.refreshError || "0") ? null : l;
				break;
			case "</sheetData>":
				if (u.e.c >= 0)
					l["!ref"] = Sr(u);
				break;
			case "<row": ;
			case "<row>":
				if (p.r)
					c = parseInt(p.r, 10) - 1;
				else
					c++;
				f = -1;
				break;
			case "</row>":
				break;
			case "<cell": ;
			case "<cell>":
				if (p.r)
					f = xr(p.r).c;
				else ++f;
				h.t = p.t || "n";
				if (h.t == "str")
					h.t = "s";
				break;
			case "</cell>":
				if (u.e.r < c)
					u.e.r = c;
				if (u.e.c < f)
					u.e.c = f;
				l[_r({
						r: c,
						c: f
					})] = h;
				h = {};
				break;
			case "<v": ;
			case "<v>":
				d = r.length + a;
				break;
			case "</v>":
				var m = $e(e.slice(d, a));
				h.v = h.t == "n" ? parseFloat(m) : m;
				break;
			case "<v/>":
				h.v = "";
				break;
			case "<definedNames>":
				o = true;
				break;
			case "</definedNames>":
				o = false;
				break;
			default:
				if (!o && n.WTF)
					throw "unrecognized " + p[0] + " in external link";
			}
		});
		return i
	}
	var qi = mt("externalLink", null, {
			xmlns: wt.main[0]
		});
	function Yi(e) {
		var t = [Ie, qi];
		if ((e.SheetNames || []).length) {
			t.push('<externalBook xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" r:id="rId1">');
			t.push("<sheetNames>");
			e.SheetNames.forEach(function (e) {
				t.push('<sheetName val="' + Ve(e) + '"/>')
			});
			t.push("</sheetNames>");
			t.push("<sheetDataSet>");
			e.SheetNames.forEach(function (r, a) {
				var n = e.Sheets[r];
				var i = {
					sheetId: a
				};
				var s = null;
				if (n == null)
					i.refreshError = 1;
				else if (!n["!ref"]) {}
				else {
					var o = Cr(n["!ref"]);
					s = "";
					for (var l = o.s.r; l <= o.e.r; ++l) {
						var c = "";
						for (var f = o.s.c; f <= o.e.c; ++f) {
							var u = _r({
									r: l,
									c: f
								});
							if (!n[u])
								continue;
							if (!c)
								c = '<row r="' + (l + 1) + '">';
							c += '<cell r="' + u + '"' + (n[u].t ? ' t="' + n[u].t + '"' : "") + "><v>" + Ve(n[u].v) + "</v></cell>"
						}
						if (c)
							s += c + "</row>"
					}
				}
				t.push(mt("sheetData", s, i))
			});
			t.push("</sheetDataSet>");
			t.push("</externalBook>")
		}
		if (t.length > 2) {
			t[t.length] = "</externalLink>";
			t[1] = t[1].replace("/>", ">")
		}
		return t.join("")
	}
	function Ki(e, t, r) {
		if (!r.links)
			r.links = [];
		if (!e.ExternalWB)
			return;
		e.ExternalWB.forEach(function (e, a) {
			var n = "/xl/externalLinks/_rels/externalLink" + (a + 1) + ".xml.rels";
			var i = {};
			ga(i, -1, e.Target, e.Missing ? ua.XMISS : ua.XPATH);
			t.file(nf(n), ma(i));
			var s = "/xl/externalLinks/externalLink" + (a + 1) + ".xml";
			r.links.push(s);
			t.file(nf(s), Yi(e))
		})
	}
	function Ji(e, t, r, a) {
		if (!e)
			return e;
		var n = a || {};
		var i = false,
		s = false;
		sr(e, function o(e, t, r) {
			if (s)
				return;
			switch (r) {
			case 359: ;
			case 363: ;
			case 364: ;
			case 366: ;
			case 367: ;
			case 368: ;
			case 369: ;
			case 370: ;
			case 371: ;
			case 472: ;
			case 577: ;
			case 578: ;
			case 579: ;
			case 580: ;
			case 581: ;
			case 582: ;
			case 583: ;
			case 584: ;
			case 585: ;
			case 586: ;
			case 587:
				break;
			case 35:
				i = true;
				break;
			case 36:
				i = false;
				break;
			default:
				if ((t || "").indexOf("Begin") > 0) {}
				else if ((t || "").indexOf("End") > 0) {}
				else if (!i || n.WTF)
					throw new Error("Unexpected record " + r.toString(16) + " " + t);
			}
		}, n)
	}
	ua.IMG = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image";
	ua.DRAW = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing";
	var Qi = {
		t: "top",
		ctr: "center",
		b: "bottom",
		just: "top",
		dist: "top"
	},
	es = {
		top: "t",
		center: "ctr",
		bottom: "b"
	};
	var ts = {
		ctr: "center",
		dist: "center",
		just: "center",
		justLow: "center",
		l: "left",
		r: "right",
		thaiDist: "center"
	},
	rs = {
		left: "l",
		center: "ctr",
		right: "r"
	};
	function as(e, t, r, a, n) {
		var i = {
			charts: [],
			images: [],
			shapes: []
		};
		if (!e)
			return i;
		var s = n || {};
		(e.match(/<[^<]*?(absoluteAnchor|oneCellAnchor|twoCellAnchor).*?(absoluteAnchor|oneCellAnchor|twoCellAnchor).*?>/g) || []).forEach(function (e) {
			var r = "";
			var n = {
				type: ""
			},
			o = {},
			l = true;
			var c = false,
			f = false,
			u = false;
			var h = {
				s: {}
			};
			var d = -1;
			var p = [];
			var m = [];
			var v = {
				s: {
					alignment: {
						horizontal: "center",
						vertical: "center"
					}
				}
			};
			var g = "",
			b = -1;
			var y = "";
			var w = {};
			e.replace(Le, function (k, x) {
				p = null;
				var _ = Pe(k);
				var C = je(_[0]).replace(/[\/]?>$/, "");
				switch (C) {
				case "<clientData":
					break;
				case "<absoluteAnchor": ;
				case "<oneCellAnchor": ;
				case "<twoCellAnchor":
					n.type = je(_[0]).replace(/[<>]/g, "");
					break;
				case "</absoluteAnchor": ;
				case "</oneCellAnchor": ;
				case "</twoCellAnchor":
					break;
				case "<pos":
					n.pos = {
						x: +_.x,
						y: +_.y
					};
					break;
				case "<ext":
					if (l)
						n.ext = {
							x: +_.cx,
							y: +_.cy
						};
					break;
				case "<from": ;
				case "<to":
					o = {};
					break;
				case "</from":
					if (l)
						n.from = o;
					break;
				case "</to":
					if (l)
						n.to = o;
					break;
				case "<col": ;
				case "<colOff": ;
				case "<row": ;
				case "<rowOff":
					d = x + k.length;
					break;
				case "</col":
					o.c = +e.slice(d, x);
					break;
				case "</colOff":
					o.cOff = +e.slice(d, x);
					break;
				case "</row":
					o.r = +e.slice(d, x);
					break;
				case "</rowOff":
					o.rOff = +e.slice(d, x);
					break;
				case "<sp":
					r = "shape";
					v.Anchor = n;
					i.shapes.push(v);
					l = false;
					break;
				case "</sp":
					l = true;
					break;
				case "<graphicFrame":
					r = "graphic";
					l = false;
					break;
				case "</graphicFrame":
					l = true;
					break;
				case "<pic":
					r = "picture";
					l = false;
					break;
				case "</pic":
					l = true;
					break;
				case "<grpSp":
					r = "groupshape";
					l = false;
					break;
				case "</grpSp":
					l = true;
					break;
				case "<graphic":
					break;
				case "</graphic":
					break;
				case "<xfrm": ;
				case "</xfrm":
					break;
				case "<off":
					break;
				case "<graphicData":
					c = true;
					break;
				case "</graphicData":
					c = false;
					break;
				case "<blipFill":
					c = true;
					break;
				case "</blipFill":
					c = false;
					break;
				case "</blip":
					break;
				case "<srcRect":
					c = true;
					break;
				case "</srcRect":
					c = false;
					break;
				case "<noFill":
					if (f)
						break;
					if (m.slice(-1)[0] == "<spPr")
						v.s.fgColor = null;
					break;
				case "</solidFill":
					if (f || u)
						break;
					if (m.slice(-2)[0] == "<spPr")
						v.s.fgColor = w;
					else if (m.slice(-2)[0] == "<rPr" && m.indexOf("<txBody") > -1)
						h.s.color = w;
					w = {};
					u = false;
					break;
				case "<prstGeom":
					if (r == "shape")
						v["!shape"] = _.prst;
					break;
				case "</prstGeom":
					break;
				case "<avLst":
					break;
				case "<txBody":
					c = true;
					v.R = [];
					break;
				case "</txBody":
					c = false;
					break;
				case "<bodyPr":
					v.s.alignment.vertical = Qi[_.anchor || "t"] || "top";
					break;
				case "<lstStyle":
					break;
				case "<t":
					b = x + k.length;
					break;
				case "<br": ;
				case "<br/>":
					g += "\n";
					break;
				case "</t":
					g += e.slice(b, x);
					break;
				case "<pPr":
					if (!v.s.alignment.horizontal)
						v.s.alignment.horizontal = ts[_.algn || "l"] || "left";
					if (m.indexOf("<txBody") > -1)
						h.s.alignment.horizontal = ts[_.algn || "l"] || "left";
					break;
				case "<rPr":
					if (_.sz && m.indexOf("<txBody") > -1)
						v.s.sz = h.s.sz = +_.sz / 100;
					break;
				case "<p":
					g = "";
					h = {
						t: "s",
						v: "",
						s: {
							alignment: {}
						}
					};
					break;
				case "</p":
					if (r == "shape" && m.indexOf("<txBody") > -1) {
						v.v = (v.v || "") + g;
						h.v = g;
						v.R.push(h)
					}
					break;
				case "<latin":
					if (_.typeface && m.indexOf("<txBody") > -1)
						h.s.name = _.typeface;
					break;
				case "<style":
					c = true;
					f = true;
					break;
				case "</style":
					c = false;
					f = false;
					break;
				case "<lnRef":
					y = "line";
					break;
				case "<fillRef":
					y = "fill";
					break;
				case "<effectRef":
					y = "effect";
					break;
				case "<fontRef":
					y = "font";
					break;
				case "</fillRef":
					if (!f && r == "shape")
						v.s.fgColor = w;
					w = {};
					break;
				case "</fontRef":
					if (!f && r == "shape")
						v.s.color = w;
					w = {};
					break;
				case "<schemeClr":
					var S = {
						bg1: "lt1",
						bg2: "lt2",
						tx1: "dk1",
						tx2: "dk2"
					}
					[_.val] || _.val;
					var A = ((a.themeElements || {}).clrScheme || []).find(function (e) {
						return e.name == S
					});
					if (A)
						w.rgb = A.rgb;
					else
						u = true;
					break;
				case "<scrgbClr":
					u = true;
					break;
				case "<srgbClr":
					w.rgb = _.val.slice(-6);
					break;
				case "<hslClr":
					u = true;
					break;
				case "<sysClr":
					u = true;
					break;
				case "<prstClr":
					u = true;
					break;
				case "<chart":
					p = i.charts;
					var T = _.id;
				case "<blip":
					if (!p) {
						p = i.images;
						T = _.embed
					}
					p.push({
						Anchor: n,
						Target: t["!id"][T].Target
					});
					break;
				case "<grpSpPr":
					c = true;
					break;
				case "</grpSpPr":
					c = false;
					break;
				case "<nvGrpSpPr":
					c = true;
					break;
				case "</nvGrpSpPr":
					c = false;
					break;
				case "<spPr":
					c = true;
					break;
				case "</spPr":
					c = false;
					break;
				case "<stretch": ;
				case "</stretch":
					break;
				case "<fillRect":
					break;
				case "<nvGraphicFramePr": ;
				case "</nvGraphicFramePr":
					break;
				case "<cNvGraphicFramePr": ;
				case "</cNvGraphicFramePr":
					break;
				case "<graphicFrameLocks":
					break;
				case "<nvPicPr": ;
				case "</nvPicPr":
					break;
				case "<cNvPicPr": ;
				case "</cNvPicPr":
					break;
				case "<picLocks":
					break;
				case "<cNvGrpSpPr": ;
				case "</cNvGrpSpPr":
					break;
				case "<grpSpLocks":
					break;
				case "<nvSpPr": ;
				case "</nvSpPr":
					break;
				case "<cNvSpPr": ;
				case "</cNvSpPr":
					break;
				case "<spLocks":
					break;
				case "<cNvPr":
					c = true;
					break;
				case "</cNvPr":
					c = false;
					break;
				case "<cxnSp":
					c = true;
					break;
				case "</cxnSp":
					c = false;
					break;
				case "<cNvCxnSpPr":
					c = true;
					break;
				case "</cNvCxnSpPr":
					c = false;
					break;
				case "<nvCxnSpPr": ;
				case "</nvCxnSpPr":
					break;
				case "<extLst":
					c = true;
					f = true;
					break;
				case "</extLst":
					c = false;
					f = false;
					break;
				case "</ext":
					break;
				default:
					if (s && s.WTF) {
						if (!c)
							throw new Error("unrecognized " + _[0] + " in drawing")
					};
				}
				if (C.slice(0, 2) == "</")
					m.pop();
				else if (k.slice(k.length - 2) != "/>")
					m.push(C);
				return ""
			})
		});
		return i
	}
	function ns() {
		var e = [Ie];
		e.push('<xdr:wsDr xmlns:xdr="http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"/>');
		return e.join("")
	}
	function is(e) {
		var t = e["!data"],
		r;
		switch (e["!datatype"]) {
		case "base64":
			if (r = t.match(/^data:.*,/))
				t = t.slice(r[0].length);
			return b.decode(t);
		}
		return t
	}
	ua.TABLE = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/table";
	function ss(e, t, r) {
		var a = {
			style: {}
		};
		var n = false;
		e.replace(Le, function (e) {
			var t = Pe(e);
			switch (je(t[0])) {
			case "<?xml":
				break;
			case "<table":
				if (t.ref)
					a.ref = t.ref;
				if (t.name)
					a.name = t.name;
				if (t.headerrowcount != null && +t.headerrowcount != 1)
					a.header = +t.headerrowcount;
				break;
			case "</table>":
				break;
			case "<autoFilter": ;
			case "<autoFilter>":
				break;
			case "</autoFilter>":
				break;
			case "<sortState": ;
			case "<sortState>":
				break;
			case "</sortState>":
				break;
			case "<tableColumns":
				break;
			case "</tableColumns": ;
			case "</tableColumns>":
				break;
			case "<tableStyleInfo":
				if (t.showRowStripes)
					a.style.rowstripe = et(t.showRowStripes);
				if (t.showColumnStripes)
					a.style.colstripe = et(t.showRowStripes);
				if (t.name)
					a.style.name = t.name.replace(/TableStyle/, "");
				break;
			case "<tableColumn": ;
			case "<tableColumn>":
				break;
			case "</tableColumn>":
				break;
			case "<calculatedColumnFormula>": ;
			case "<calculatedColumnFormula":
				break;
			case "</calculatedColumnFormula>":
				break;
			case "<totalsRowFormula>": ;
			case "<totalsRowFormula":
				break;
			case "</totalsRowFormula>":
				break;
			case "<xmlColumnPr>": ;
			case "<xmlColumnPr":
				break;
			case "</xmlColumnPr>":
				break;
			case "<filterColumn>": ;
			case "<filterColumn":
				n = true;
				break;
			case "</filterColumn>":
				n = false;
				break;
			case "<sortCondition>": ;
			case "<sortCondition":
				break;
			case "<customFilters": ;
			case "<customFilters>":
				n = true;
				break;
			case "</customFilters>":
				n = false;
				break;
			case "<extLst": ;
			case "<extLst>": ;
			case "</extLst>": ;
			case "<extLst/>":
				break;
			case "<ext":
				n = true;
				break;
			case "</ext>":
				n = false;
				break;
			default:
				if (!n && r.WTF)
					throw new Error("unrecognized " + t[0] + " in table");
			}
			return e
		});
		t["!tables"].push(a)
	}
	function os(e, t, r, a) {
		e.forEach(function (e, n) {
			var i = t.Sheets[t.SheetNames[e[0]]];
			var s = "xl/tables/table" + (e[0] + 1) + "_" + e[1] + ".xml";
			a.tables.push(s);
			var o = e[2].ref || i["!ref"];
			if (typeof o !== "string")
				o = Sr(o);
			var l = Ar(o);
			var c = e[2].name || "sjstbl_" + e[0] + "_" + e[1];
			var f = [Ie];
			var u = !be(e[2].header);
			f.push('<table xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" id="' + (n + 1) + '" name="' + Ve(c) + '" displayName="' + Ve(c) + '" ref="' + o + '" ' + (e[2].header != null ? 'headerRowCount="' + (e[2].header || 0) + '" ' : "") + 'totalsRowShown="0">');
			if (u)
				f.push('<autoFilter ref="' + o + '"/>');
			f.push('<tableColumns count="' + (l.e.c - l.s.c + 1) + '">');
			var h = [];
			for (var d = l.s.c; d <= l.e.c; ++d) {
				if (u) {
					var p = _r({
							r: l.s.r,
							c: d
						});
					var m = i[p];
					var v = m && (m.w || m.v) || "Column " + (d - l.s.c + 1);
					var g = v;
					var b = 1;
					while (h.indexOf(g) > -1 && ++b < 16384)
						g = v + b;
					if (g != v)
						throw "table columns " + d + " and " + (h.indexOf(v) + l.s.c) + " have the same header '" + v + "'; try setting cell " + p + " to '" + g + "'";
					h.push(g);
					f.push('<tableColumn id="' + (d - l.s.c + 1) + '" name="' + Ve(g) + '"/>')
				} else
					f.push('<tableColumn id="' + (d - l.s.c + 1) + '" uniqueName="' + (d - l.s.c + 1) + '" name="' + (d - l.s.c + 1) + '"/>')
			}
			f.push("</tableColumns>");
			var y =  + !!((e[2].style || {}).rowstripe !== false);
			var w =  + !!(e[2].style || {}).colstripe;
			var k = (e[2].style || {}).name || "Medium9";
			f.push('<tableStyleInfo name="TableStyle' + k + '" showFirstColumn="0" showLastColumn="0" showRowStripes="' + y + '" showColumnStripes="' + w + '"/>');
			f.push("</table>");
			r.file(s, f.join(""))
		})
	}
	var ls = /<(?:\w+:)?shape(?:[^\w][^>]*)?>([\s\S]*?)<\/(?:\w+:)?shape>/g;
	function cs(e, t, r) {
		var a = 0;
		(e.match(ls) || []).forEach(function (e) {
			var n = "";
			var i = true;
			var s = "",
			o = -1;
			var l = {},
			c = {},
			f = {};
			var u = -1,
			h = -1;
			var d = "",
			p = "",
			m = "";
			var v,
			g,
			b,
			y,
			w,
			k,
			x,
			_;
			var C = false,
			S = false;
			e.replace(Le, function (t, r) {
				var a = Pe(t);
				switch (je(a[0])) {
				case "<shape":
					if (a.fillcolor)
						l.color1 = a.fillcolor;
					if (a.strokecolor)
						f.color = a.strokecolor;
					break;
				case "<fill": ;
				case "<fill>":
					if (a[0] == "<v:fill") {
						if (a.color2)
							l.color2 = a.color2;
						if (a.type)
							l.type = a.type
					}
					break;
				case "</fill>":
					break;
				case "<shadow":
					if (a.color)
						c.color = a.color;
					if (a.on)
						c.on = a.on;
					break;
				case "<ClientData":
					if (a.ObjectType)
						n = a.ObjectType;
					break;
				case "<Visible": ;
				case "<Visible/>":
					i = false;
					break;
				case "<Anchor": ;
				case "<Anchor>":
					o = r + t.length;
					break;
				case "</Anchor>":
					s = e.slice(o, r).trim();
					break;
				case "<Row": ;
				case "<Row>":
					o = r + t.length;
					break;
				case "</Row>":
					u = +e.slice(o, r).trim();
					break;
				case "<Column": ;
				case "<Column>":
					o = r + t.length;
					break;
				case "</Column>":
					h = +e.slice(o, r).trim();
					break;
				case "<FmlaMacro": ;
				case "<FmlaMacro>":
					o = r + t.length;
					break;
				case "</FmlaMacro>":
					d = e.slice(o, r).trim();
					break;
				case "<FmlaLink": ;
				case "<FmlaLink>":
					o = r + t.length;
					break;
				case "</FmlaLink>":
					p = e.slice(o, r).trim();
					break;
				case "<FmlaRange": ;
				case "<FmlaRange>":
					o = r + t.length;
					break;
				case "</FmlaRange>":
					x = e.slice(o, r).trim();
					break;
				case "<SelType": ;
				case "<SelType>":
					o = r + t.length;
					break;
				case "</SelType>":
					_ = e.slice(o, r).trim();
					break;
				case "<Val": ;
				case "<Val>":
					o = r + t.length;
					break;
				case "</Val>":
					v = +e.slice(o, r).trim();
					break;
				case "<Min": ;
				case "<Min>":
					o = r + t.length;
					break;
				case "</Min>":
					g = +e.slice(o, r).trim();
					break;
				case "<Max": ;
				case "<Max>":
					o = r + t.length;
					break;
				case "</Max>":
					b = +e.slice(o, r).trim();
					break;
				case "<Inc": ;
				case "<Inc>":
					o = r + t.length;
					break;
				case "</Inc>":
					y = +e.slice(o, r).trim();
					break;
				case "<Page": ;
				case "<Page>":
					o = r + t.length;
					break;
				case "</Page>":
					w = +e.slice(o, r).trim();
					break;
				case "<Checked": ;
				case "<Checked>":
					o = r + t.length;
					break;
				case "</Checked>":
					k = +e.slice(o, r).trim();
					break;
				case "<lock": ;
				case "<lock/>":
					break;
				case "<textbox": ;
				case "<textbox>":
					o = r + t.length;
					break;
				case "</textbox>":
					m = e.slice(o, r).trim();
					break;
				case "<MoveWithCells/>": ;
				case "<MoveWithCells>":
					C = true;
					break;
				case "<SizeWithCells/>": ;
				case "<SizeWithCells>":
					S = true;
					break;
				default: ;
				}
				return ""
			});
			switch (n) {
			case "Note":
				var A = jf.sheet_get_cell(t, u >= 0 && h >= 0 ? _r({
							r: u,
							c: h
						}) : r[a].ref);
				if (A.c) {
					A.c.hidden = i;
					if (s) {
						A.c.rawanchor = s;
						zi(s, A.c);
						Oi(A.c["!pos"], 2 * !!C + !!S, t)
					}
					if (l.color1)
						A.c.fill = l;
					if (c.color)
						A.c.shadow = c;
					if (f.color)
						A.c.stroke = f
				}
				++a;
				break;
			case "Button": ;
			case "GBox": ;
			case "Drop": ;
			case "Label": ;
			case "Checkbox": ;
			case "Scroll": ;
			case "List": ;
			case "Radio": ;
			case "Spin": ;
			case "Edit":
				if (!t["!controls"])
					t["!controls"] = [];
				var T = {
					"!type": n
				};
				if (s)
					zi(s, T);
				if (d)
					T["macro"] = d.replace("[0]!", "");
				if (p)
					T["link"] = p;
				if (n == "Scroll" || n == "Spin") {
					if (v == null)
						v = 0;
					if (g == null)
						g = 0;
					if (b == null)
						b = 3e4;
					if (y == null)
						y = 1;
					if (n == "Scroll" && w == null)
						w = 10
				} else if (n == "Radio" || n == "Checkbox") {
					if (k == null)
						k = 0;
					v = k
				} else if (n == "List" || n == "Drop") {
					if (x != null)
						T["ref"] = x;
					if (_ == null)
						_ = "Single";
					if (n == "List")
						T["sel"] = _
				}
				if (v != null)
					T["val"] = v;
				if (g != null)
					T["min"] = g;
				if (b != null)
					T["max"] = b;
				if (y != null)
					T["step"] = y;
				if (w != null)
					T["page"] = w;
				if (m)
					T["t"] = m.replace(/\s*<[\s\S]*?>\s*/g, "");
				t["!controls"].push(T);
				break;
			}
		})
	}
	function fs(e, t, r, a) {
		var n = [21600, 21600];
		var i = ["m0,0l0", n[1], n[0], n[1], n[0], "0xe"].join(",");
		var s = [mt("xml", null, {
				"xmlns:v": kt.v,
				"xmlns:o": kt.o,
				"xmlns:x": kt.x,
				"xmlns:mv": kt.mv
			}).replace(/\/>/, ">"), mt("o:shapelayout", mt("o:idmap", null, {
					"v:ext": "edit"
				}), {
				"v:ext": "edit"
			})];
		var o = 1024 * e;
		var l = r || [];
		if (l.length > 0)
			s.push(mt("v:shapetype", [mt("v:stroke", null, {
							joinstyle: "miter"
						}), mt("v:path", null, {
							shadowok: "f",
							extrusionok: "f",
							strokeok: "f",
							fillok: "f",
							"o:connecttype": "rect"
						}), mt("o:lock", null, {
							"v:ext": "edit",
							shapetype: "t"
						})].join(""), {
					id: "_x0000_t201",
					coordsize: n.join(","),
					"o:spt": 201,
					path: i
				}));
		if (typeof ps !== "undefined")
			l.forEach(function (e) {
				++o;
				s = s.concat(ps(e, o))
			});
		var c = t || [];
		if (c.length > 0)
			s.push(mt("v:shapetype", [mt("v:stroke", null, {
							joinstyle: "miter"
						}), mt("v:path", null, {
							gradientshapeok: "t",
							"o:connecttype": "rect"
						})].join(""), {
					id: "_x0000_t202",
					coordsize: n.join(","),
					"o:spt": 202,
					path: i
				}));
		c.forEach(function (e) {
			++o;
			s = s.concat(ms(e, o, a))
		});
		s.push("</xml>");
		return s.join("")
	}
	var us = {
		Button: ["<x:AutoFill>False</x:AutoFill>", "<x:TextHAlign>Center</x:TextHAlign>", "<x:TextVAlign>Center</x:TextVAlign>"],
		GBox: ["<x:SizeWithCells/>", "<x:AutoFill>False</x:AutoFill>", "<x:NoThreeD/>"],
		Label: ["<x:AutoFill>False</x:AutoFill>", "<x:AutoLine>False</x:AutoLine>"],
		Radio: ["<x:SizeWithCells/>", "<x:AutoFill>False</x:AutoFill>", "<x:AutoLine>False</x:AutoLine>", "<x:TextVAlign>Center</x:TextVAlign>", "<x:NoThreeD/>"],
		Checkbox: ["<x:SizeWithCells/>", "<x:AutoFill>False</x:AutoFill>", "<x:AutoLine>False</x:AutoLine>", "<x:TextVAlign>Center</x:TextVAlign>", "<x:NoThreeD/>"],
		Drop: ["<x:SizeWithCells/>", "<x:AutoLine>False</x:AutoLine>", "<x:NoThreeD2/>", "<x:SelType>Single</x:SelType>", "<x:DropStyle>Combo</x:DropStyle>", "<x:LCT>Normal</x:LCT>", "<x:DropLines>4</x:DropLines>"],
		List: ["<x:SizeWithCells/>", "<x:AutoLine>False</x:AutoLine>", "<x:NoThreeD2/>", "<x:LCT>Normal</x:LCT>", "<x:Val>0</x:Val>", "<x:Min>0</x:Min>", "<x:Max>5</x:Max>", "<x:Inc>1</x:Inc>", "<x:Page>4</x:Page>", "<x:Dx>15</x:Dx>"],
		Scroll: ["<x:SizeWithCells/>", "<x:Horiz/>", "<x:Dx>15</x:Dx>"],
		Spin: ["<x:Dx>15</x:Dx>"]
	};
	var hs = {
		Button: "<v:textbox style='mso-direction-alt:auto' o:singleclick='f'><div style='text-align:center'><font face='Calibri' size='240' color='#000000'>####</font></div></v:textbox>",
		GBox: "<v:textbox style='mso-direction-alt:auto' o:singleclick='f'><div style='text-align:left'><font face='Lucida Grande' size='260' color='#000000'>####</font></div></v:textbox>",
		Radio: "<v:textbox style='mso-direction-alt:auto' o:singleclick='f'><div style='text-align:left'><font face='Lucida Grande' size='260' color='auto'>####</font></div></v:textbox>",
		Label: "<v:textbox style='mso-direction-alt:auto' o:singleclick='f'><div style='text-align:left'><font face='Lucida Grande' size='260' color='#000000'>####</font></div></v:textbox>",
		Checkbox: "<v:textbox style='mso-direction-alt:auto' o:singleclick='f'><div style='text-align:left'><font face='Lucida Grande' size='260' color='#000000'>####</font></div></v:textbox>",
		sheetjs: "dafuq"
	};
	var ds = {
		Button: ['<v:fill color2="#f0f0f0 [67]" o:detectmouseclick="t"/>', '<o:lock v:ext="edit" rotation="t"/>'],
		GBox: ['<o:lock v:ext="edit" rotation="t"/>'],
		Drop: ['<o:lock v:ext="edit" rotation="t" text="t"/>'],
		List: ['<o:lock v:ext="edit" rotation="t" text="t"/>'],
		Spin: ['<o:lock v:ext="edit" rotation="t" text="t"/>'],
		Scroll: ['<o:lock v:ext="edit" rotation="t" text="t"/>'],
		Label: ['<o:lock v:ext="edit" rotation="t"/>'],
		Radio: ['<v:path shadowok="t" strokeok="t" fillok="t"/>', '<o:lock v:ext="edit" rotation="t"/>'],
		Checkbox: ['<v:path shadowok="t" strokeok="t" fillok="t"/>', '<o:lock v:ext="edit" rotation="t"/>'],
		sheetjs: []
	};
	function ps(e, t) {
		var r = {
			id: "_x0000_s" + t,
			type: "#_x0000_t201",
			style: "mso-wrap-style:tight"
		};
		if (e["!type"] == "Radio" || e["!type"] == "Checkbox" || e["!type"] == "List" || e["!type"] == "Drop")
			r.stroked = "f";
		if (e["!type"] == "Label")
			r.filled = "f";
		var a = "";
		if (e.t && hs[e["!type"]])
			a = hs[e["!type"]].replace(/####/, Ve(e.t));
		var n = [];
		if (e.macro)
			n.push(dt("x:FmlaMacro", e.macro));
		if (e.link)
			n.push(dt("x:FmlaLink", e.link));
		if (e.val) {
			if (e["!type"] == "Radio" || e["!type"] == "Checkbox")
				n.push(dt("x:Checked", String(e.val)));
			else
				n.push(dt("x:Val", String(e.val)))
		}
		if (e.ref)
			n.push(dt("x:FmlaRange", e.ref));
		if (e.sel && e["!type"] == "List")
			n.push(dt("x:SelType", e.sel));
		if (e.min)
			n.push(dt("x:Min", String(e.min)));
		if (e.max)
			n.push(dt("x:Max", String(e.max)));
		if (e.step)
			n.push(dt("x:Inc", String(e.step)));
		if (e.page)
			n.push(dt("x:Page", String(e.page)));
		var i = [].concat(["<v:shape" + pt(r) + ">"]).concat(ds[e["!type"]] || []).concat([a]).concat(['<x:ClientData ObjectType="' + e["!type"] + '">', dt("x:Anchor", Ri(e["!pos"])), dt("x:PrintObject", "False")]).concat(n).concat(us[e["!type"]] || []).concat(["</x:ClientData>", "</v:shape>"]);
		return i
	}
	function ms(e, t, r) {
		var a = xr(e[0]);
		var n = e[1].fill || {};
		if (e[1].s) {
			n = {
				type: e[1].s.patternType || "solid"
			};
			if (e[1].s.fgColor)
				n.color2 = n.color1 = "#" + Pi(e[1].s.fgColor.rgb);
			if (e[1].s.bgColor)
				n.color2 = "#" + Pi(e[1].s.bgColor.rgb)
		}
		var i = {
			color2: n.color2 || "#BEFF82",
			type: n.type || "gradient"
		};
		if (i.type == "gradient")
			i.angle = "-180";
		var s = i.type == "gradient" ? mt("o:fill", null, {
				type: "gradientUnscaled",
				"v:ext": "view"
			}) : null;
		var o = mt("v:fill", s, i);
		var l = {};
		if (e[1].shadow) {
			if (e[1].shadow.color)
				l.color = e[1].shadow.color;
			if (e[1].shadow.on)
				l.on = e[1].shadow.on
		}
		l.obscured = "t";
		var c = true,
		f = true;
		var u = e[1]["!pos"] ? le(e[1]["!pos"]) : null;
		if (u) {
			f = u.R == null && u.C == null && u.X == null && u.Y == null;
			c = !u.r && !u.c;
			Oi(u, 0, r)
		}
		return ["<v:shape" + pt({
				id: "_x0000_s" + t,
				type: "#_x0000_t202",
				style: "position:absolute; margin-left:80pt;margin-top:5pt;width:104pt;height:64pt;z-index:10" + (e[1].hidden ? ";visibility:hidden" : ""),
				fillcolor: n.color1 || "#ECFAD4",
				strokecolor: (e[1].stroke || {}).color || "#edeaa1"
			}) + ">", o, mt("v:shadow", null, l), mt("v:path", null, {
				"o:connecttype": "none"
			}), '<v:textbox><div style="text-align:left"></div></v:textbox>', '<x:ClientData ObjectType="Note">', c ? "<x:MoveWithCells/>" : "", f ? "<x:SizeWithCells/>" : "", dt("x:Anchor", u ? Ri(u) : e[1].rawanchor || [a.c + 1, 0, a.r + 1, 0, a.c + 3, 20, a.r + 5, 20].join(",")), dt("x:AutoFill", "False"), dt("x:Row", String(a.r)), dt("x:Column", String(a.c)), e[1].hidden ? "" : "<x:Visible/>", "</x:ClientData>", "</v:shape>"]
	}
	function vs(e, t, r, a) {
		var n = {
			"!id": {}
		};
		var i = [mt("xml", null, {
				"xmlns:v": kt.v,
				"xmlns:o": kt.o,
				"xmlns:x": kt.x
			}).replace(/\/>/, ">"), mt("o:shapelayout", mt("o:idmap", null, {
					"v:ext": "edit",
					data: 1
				}), {
				"v:ext": "edit"
			}), '<v:shapetype id="_x0000_t75" coordsize="21600,21600" o:spt="75" o:preferrelative="t" path="m@4@5l@4@11@9@11@9@5xe" filled="f" stroked="f">', '<v:stroke joinstyle="miter"/>', "<v:formulas>", '<v:f eqn="if lineDrawn pixelLineWidth 0"/>', '<v:f eqn="sum @0 1 0"/>', '<v:f eqn="sum 0 0 @1"/>', '<v:f eqn="prod @2 1 2"/>', '<v:f eqn="prod @3 21600 pixelWidth"/>', '<v:f eqn="prod @3 21600 pixelHeight"/>', '<v:f eqn="sum @0 0 1"/>', '<v:f eqn="prod @6 1 2"/>', '<v:f eqn="prod @7 21600 pixelWidth"/>', '<v:f eqn="sum @8 21600 0"/>', '<v:f eqn="prod @7 21600 pixelHeight"/>', '<v:f eqn="sum @10 21600 0"/>', "</v:formulas>", '<v:path o:extrusionok="f" gradientshapeok="t" o:connecttype="rect"/>', '<o:lock v:ext="edit" aspectratio="t"/>', "</v:shapetype>"];
		var s = 1;
		["header", "footer"].forEach(function (t) {
			if (!a[t])
				return;
			["odd", "even", "first"].forEach(function (r) {
				if (!a[t][r])
					return;
				["left", "right", "center"].forEach(function (o) {
					if (!Array.isArray(a[t][r][o]))
						return;
					for (var l = 0; l < a[t][r][o].length; ++l)
						if (a[t][r][o][l]) {
							var c = a[t][r][o][l];
							if (c["!datatype"] == "remote")
								throw "Cannot use linked image in header or footer";
							while (_e(e, "xl/media/image" + s + ".jpg"))
								++s;
							e.file("xl/media/image" + s + ".jpg", is(c), {
								binary: true
							});
							ga(n, -1, "../media/image" + s + ".jpg", ua.IMG);
							var f = "_x0000_s" + (1025 + c._cnt);
							var u = "position:absolute;margin-left:0;margin-top:0;z-index:" + (c._cnt + 1) + ";";
							u += "width:" + c["!pos"].w + "px;";
							u += "height:" + c["!pos"].h + "px;";
							var h = o.charAt(0).toUpperCase() + t.charAt(0).toUpperCase();
							if (r !== "odd")
								h += r.toUpperCase();
							if (a[t][r][o].length > 1)
								h += l;
							i.push(mt("v:shape", ['<v:imagedata o:relid="rId' + (c._cnt + 1) + '" o:title="sheetjs"/>', '<o:lock v:ext="edit" rotation="t"/>'].join(""), {
									id: h,
									"o:spid": f,
									type: "#_x0000_t75",
									style: u
								}))
						}
				})
			})
		});
		i.push("</xml>");
		e.file("xl/drawings/vmlDrawing" + r + "HF.vml", i.join(""));
		e.file("xl/drawings/_rels/vmlDrawing" + r + "HF.vml.rels", ma(n))
	}
	ua.CMNT = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments";
	function gs(e, t) {
		var r = Array.isArray(e);
		var a;
		t.forEach(function (t) {
			var n = xr(t.ref);
			if (r) {
				if (!e[n.r])
					e[n.r] = [];
				a = e[n.r][n.c]
			} else
				a = e[t.ref];
			if (!a) {
				a = {
					t: "z"
				};
				if (r)
					e[n.r][n.c] = a;
				else
					e[t.ref] = a;
				var i = Ar(e["!ref"] || "BDWGO1000001:A1");
				if (i.s.r > n.r)
					i.s.r = n.r;
				if (i.e.r < n.r)
					i.e.r = n.r;
				if (i.s.c > n.c)
					i.s.c = n.c;
				if (i.e.c < n.c)
					i.e.c = n.c;
				var s = Sr(i);
				if (s !== e["!ref"])
					e["!ref"] = s
			}
			if (!a.c)
				a.c = [];
			var o = {
				a: t.author,
				t: t.t,
				r: t.r
			};
			if (o.r && typeof o.r == "string")
				o.R = Ua(o.r);
			if (t.h)
				o.h = t.h;
			a.c.push(o)
		})
	}
	function bs(e, t) {
		if (e.match(/<(?:\w+:)?comments *\/>/))
			return [];
		var r = [];
		var a = [];
		var n = e.match(/<(?:\w+:)?authors>([\s\S]*)<\/(?:\w+:)?authors>/);
		if (n && n[1])
			n[1].split(/<\/\w*:?author>/).forEach(function (e) {
				if (e === "" || e.trim() === "")
					return;
				var t = e.match(/<(?:\w+:)?author[^>]*>(.*)/);
				if (t)
					r.push(t[1])
			});
		var i = e.match(/<(?:\w+:)?commentList>([\s\S]*)<\/(?:\w+:)?commentList>/);
		if (i && i[1])
			i[1].split(/<\/\w*:?comment>/).forEach(function (e) {
				if (e === "" || e.trim() === "")
					return;
				var n = e.match(/<(?:\w+:)?comment[^>]*>/);
				if (!n)
					return;
				var i = Pe(n[0]);
				var s = {
					author: i.authorId && r[i.authorId] || "sheetjsghost",
					ref: i.ref,
					guid: i.guid
				};
				var o = xr(i.ref);
				if (t.sheetRows && t.sheetRows <= o.r)
					return;
				var l = e.match(/<(?:\w+:)?text>([\s\S]*)<\/(?:\w+:)?text>/);
				var c = !!l && !!l[1] && Ya(l[1]) || {
					r: "",
					t: "",
					h: ""
				};
				s.r = c.r;
				if (c.r == "<t></t>")
					c.t = c.h = "";
				s.t = c.t.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
				if (t.cellHTML)
					s.h = c.h;
				a.push(s)
			});
		return a
	}
	var ys = mt("comments", null, {
			xmlns: wt.main[0]
		});
	function ws(e) {
		var t = [Ie, ys];
		var r = [];
		t.push("<authors>");
		e.forEach(function (e) {
			e[1].forEach(function (e) {
				var a = Ve(e.a);
				if (r.indexOf(a) > -1)
					return;
				r.push(a);
				t.push("<author>" + a + "</author>")
			})
		});
		t.push("</authors>");
		t.push("<commentList>");
		e.forEach(function (e) {
			e[1].forEach(function (a) {
				t.push('<comment ref="' + e[0] + '" authorId="' + r.indexOf(Ve(a.a)) + '"><text>');
				if (a.R)
					t.push(Va(a.R));
				else
					t.push(dt("t", a.t == null ? "" : Ve(a.t)));
				t.push("</text></comment>")
			})
		});
		t.push("</commentList>");
		if (t.length > 2) {
			t[t.length] = "</comments>";
			t[1] = t[1].replace("/>", ">")
		}
		return t.join("")
	}
	var ks = "application/vnd.ms-office.vbaProject";
	function xs(e) {
		var t = CFB.utils.cfb_new({
				root: "R"
			});
		e.FullPaths.forEach(function (r, a) {
			if (r.slice(-1) === "/" || !r.match(/_VBA_PROJECT_CUR/))
				return;
			var n = r.replace(/^[^\/]*/, "R").replace(/\/_VBA_PROJECT_CUR\u0000*/, "");
			CFB.utils.cfb_add(t, n, e.FileIndex[a].content)
		});
		return CFB.write(t)
	}
	function _s(e, t) {
		t.FullPaths.forEach(function (r, a) {
			if (a == 0)
				return;
			var n = r.replace(/[^\/]*[\/]/, "/_VBA_PROJECT_CUR/");
			if (n.slice(-1) !== "/")
				CFB.utils.cfb_add(e, n, t.FileIndex[a].content)
		})
	}
	var Cs = ["xlsb", "xlsm", "xlam", "biff8", "xla"];
	ua.DS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/dialogsheet";
	ua.MS = "http://schemas.microsoft.com/office/2006/relationships/xlMacrosheet";
	function Ss() {
		return {
			"!type": "dialog"
		}
	}
	function As() {
		return {
			"!type": "dialog"
		}
	}
	function Ts() {
		return {
			"!type": "macro"
		}
	}
	function Es() {
		return {
			"!type": "macro"
		}
	}
	var Fs = function () {
		var e = /(^|[^A-Za-z_])R(\[?-?\d+\]|[1-9]\d*|)C(\[?-?\d+\]|[1-9]\d*|)(?![A-Za-z0-9_])/g;
		var t = {
			r: 0,
			c: 0
		};
		function r(e, r, a, n) {
			var i = false,
			s = false;
			if (a.length == 0)
				s = true;
			else if (a.charAt(0) == "[") {
				s = true;
				a = a.slice(1, -1)
			}
			if (n.length == 0)
				i = true;
			else if (n.charAt(0) == "[") {
				i = true;
				n = n.slice(1, -1)
			}
			var o = a.length > 0 ? parseInt(a, 10) | 0 : 0,
			l = n.length > 0 ? parseInt(n, 10) | 0 : 0;
			if (i)
				l += t.c;
			else --l;
			if (s)
				o += t.r;
			else --o;
			return r + (i ? "" : "$") + br(l) + (s ? "" : "$") + pr(o)
		}
		return function a(n, i) {
			t = i;
			return n.replace(e, r)
		}
	}
	();
	var Ds = /(^|[^._A-Z0-9])([$]?)([A-Z]{1,2}|[A-W][A-Z]{2}|X[A-E][A-Z]|XF[A-D])([$]?)(10[0-3]\d{4}|104[0-7]\d{3}|1048[0-4]\d{2}|10485[0-6]\d|104857[0-6]|[1-9]\d{0,5})(?![_.\(A-Za-z0-9])/g;
	var zs = function () {
		return function e(t, r) {
			return t.replace(Ds, function (e, t, a, n, i, s) {
				var o = gr(n) - (a ? 0 : r.c);
				var l = dr(s) - (i ? 0 : r.r);
				var c = l == 0 ? "" : !i ? "[" + l + "]" : l + 1;
				var f = o == 0 ? "" : !a ? "[" + o + "]" : o + 1;
				return t + "R" + c + "C" + f
			})
		}
	}
	();
	function Os(e, t) {
		return e.replace(Ds, function (e, r, a, n, i, s) {
			return r + (a == "$" ? a + n : br(gr(n) + t.c)) + (i == "$" ? i + s : pr(dr(s) + t.r))
		}).replace(/(\d+):(\d+)/g, function (e, r, a) {
			return pr(dr(r) + t.r) + ":" + pr(dr(a) + t.r)
		})
	}
	function Rs(e, t, r) {
		var a = Cr(t),
		n = a.s,
		i = xr(r);
		var s = {
			r: i.r - n.r,
			c: i.c - n.c
		};
		return Os(e, s)
	}
	function Is(e) {
		if (e.length == 1)
			return false;
		return true
	}
	function Ns(e) {
		return e.replace(/_xlfn\./g, "")
	}
	var Ls = {};
	var Bs = {};
	ua.WS = ["http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet", "http://purl.oclc.org/ooxml/officeDocument/relationships/worksheet"];
	var Ms = typeof Map !== "undefined";
	function Ps(e, t, r, a) {
		var n = 0,
		i = e.length;
		if (a) {
			if (Ms ? a.has(t) : Object.prototype.hasOwnProperty.call(a, t)) {
				var s = Ms ? a.get(t) : a[t];
				for (; n < s.length; ++n) {
					if (e[s[n]].t === t && (!e[s[n]].r && !r || e[s[n]].r == r)) {
						e.Count++;
						return s[n]
					}
				}
			}
		} else
			for (; n < i; ++n) {
				if (e[n].t === t && (!e[n].r && !r || e[n].r == r)) {
					e.Count++;
					return n
				}
			}
		e[i] = {
			t: t,
			r: r
		};
		e.Count++;
		e.Unique++;
		if (a) {
			if (Ms) {
				if (!a.has(t))
					a.set(t, []);
				a.get(t).push(i)
			} else {
				if (!Object.prototype.hasOwnProperty.call(a, t))
					a[t] = [];
				a[t].push(i)
			}
		}
		return i
	}
	function js(e, t) {
		var r = {
			min: e + 1,
			max: e + 1
		};
		var a = pn;
		if (!t)
			return t;
		var n = -1;
		if (t.auto) {
			r.bestFit = 1;
			if (t.bestwidth)
				n = t.bestwidth;
			delete t.bestwidth
		}
		if (t.wpx != null)
			n = vn(t.wpx);
		else if (t.wch != null)
			n = t.wch;
		else if (t.width != null)
			r.customWidth = 1;
		if (n > -1) {
			r.width = gn(n);
			r.customWidth = 1
		} else if (t.width != null)
			r.width = t.width;
		if (t.hidden)
			r.hidden = true;
		if (r.bestFit) {
			delete r.customWidth
		}
		pn = a;
		if (t.level != null) {
			r.outlineLevel = r.level = t.level
		}
		if (t.style != null) {
			r.style = t.style
		}
		return r
	}
	function Ws(e, t, r) {
		var a = Cr(e["!ref"]);
		var n = 0;
		var i = e["!merges"] || [];
		e: for (var s = a.s.r; s <= a.e.r; ++s) {
			for (var o = 0; o < i.length; ++o) {
				if (i[o].s.r <= s && s <= i[o].e.r && i[o].s.c <= r && r <= i[o].e.c)
					continue e
			}
			var l = e[_r({
						r: s,
						c: r
					})];
			if (l) {
				var c = 1;
				if (l.s) {
					c = In(l.s) / Rn["Calibri"][12] || 1
				}
				if (l.w)
					n = Math.max(n, l.w.length * c);
				else
					switch (l.t) {
					case "b":
						n = Math.max(n, 5 * c);
						break;
					case "e":
						n = Math.max(n, 5 * c);
						break;
					case "s":
						n = Math.max(n, l.v.length * c * 1.2 | 0);
						break;
					case "n":
						Tr(l, l.v);
						n = Math.max(n, String(l.w || l.v).length * c);
						break;
					case "d":
						n = Math.max(n, 8 * c);
						break;
					case "z":
						break;
					}
			}
		}
		if (n < 1)
			n = 1;
		t.bestwidth = n
	}
	function Us(e, t) {
		if (!e)
			return;
		var r = [.7, .7, .75, .75, .3, .3];
		if (t == "xlml")
			r = [1, 1, 1, 1, .5, .5];
		if (e.left == null)
			e.left = r[0];
		if (e.right == null)
			e.right = r[1];
		if (e.top == null)
			e.top = r[2];
		if (e.bottom == null)
			e.bottom = r[3];
		if (e.header == null)
			e.header = r[4];
		if (e.footer == null)
			e.footer = r[5]
	}
	function $s(e, t) {
		if (typeof e == "number")
			return e;
		var r = t.revssf[e != null ? e : "General"];
		var a = 60;
		if (r == null) {
			for (; a < 392; ++a)
				if (t.ssf[a] == null) {
					R.load(e, a);
					t.ssf[a] = e;
					t.revssf[e] = a;
					return a
				}
		}
		return r
	}
	function Hs(e, t) {
		var r = X(t);
		for (var a = 0; a < e.length; ++a) {
			var n = true;
			var i = e[a];
			if (!i)
				continue;
			if (r.length != X(i).length)
				continue;
			r.forEach(function (e) {
				if (!n)
					return;
				if (t[e] === null != (i[e] === null)) {
					n = false;
					return
				}
				if (typeof t[e] == "object") {
					if (["color", "fgColor", "bgColor"].indexOf(e) > -1) {
						if (ln(t[e], i[e])) {
							n = false;
							return
						}
					} else if (["left", "right", "top", "bottom"].indexOf(e) > -1) {
						if (cn(t[e], i[e])) {
							n = false;
							return
						}
					} else {
						n = false;
						return
					}
				}
				if (t[e] != i[e]) {
					n = false;
					return
				}
			});
			if (n)
				return a
		}
		e[e.length] = le(t);
		return e.length - 1
	}
	function Xs(e, t, r, a) {
		var n = a.revssf[r.z != null ? r.z : "General"];
		var i = 60,
		s = e.length;
		if (n == null && a.ssf) {
			for (; i < 392; ++i)
				if (a.ssf[i] == null) {
					R.load(r.z, i);
					a.ssf[i] = r.z;
					a.revssf[r.z] = n = i;
					break
				}
		}
		var o = 0;
		var l = 0;
		var c = 0;
		var f = 0;
		if (!a.cellStyles) {
			for (i = 0; i != s; ++i)
				if (e[i].numFmtId === n)
					return i
		} else {
			if (r.s) {
				if (a.Fonts) {
					if (!r.s.color)
						r.s.color = {
							theme: 1,
							rgb: "000000"
						};
					for (; o < a.Fonts.length; ++o) {
						var u = a.Fonts[o];
						if (!!r.s.bold != !!u.bold)
							continue;
						if (!!r.s.italic != !!u.italic)
							continue;
						if (!!r.s.strike != !!u.strike)
							continue;
						if (!!r.s.shadow != !!u.shadow)
							continue;
						if (!!r.s.color != !!u.color)
							continue;
						if (r.s.valign != u.valign)
							continue;
						if ((r.s.sz || u.sz) && (r.s.sz || 12) != (u.sz || 12))
							continue;
						if (r.s.name && r.s.name != u.name)
							continue;
						if ((r.s.underline || 0) != (u.underline || 0))
							continue;
						if (r.s.color && ln(r.s.color, u.color))
							continue;
						break
					}
					if (o == a.Fonts.length) {
						a.Fonts.push({
							sz: r.s.sz || 12,
							color: r.s.color || {
								theme: 1,
								rgb: "000000"
							},
							name: r.s.name || "Calibri",
							family: r.s.family || 2,
							scheme: r.s.scheme,
							bold: r.s.bold,
							italic: r.s.italic,
							strike: r.s.strike,
							shadow: r.s.shadow,
							valign: r.s.valign,
							underline: r.s.underline
						});
						if (a.Fonts.length == 1)
							Nn(a.Fonts[0])
					}
				}
				if (a.Fills) {
					for (; l < a.Fills.length; ++l) {
						var h = a.Fills[l];
						if (r.s.patternType == null && r.s.fgColor)
							r.s.patternType = "solid";
						if (r.s.patternType == null)
							break;
						if (r.s.patternType != h.patternType)
							continue;
						if (ln(r.s.fgColor, h.fgColor))
							continue;
						if (ln(r.s.bgColor, h.bgColor))
							continue;
						break
					}
					if (l == a.Fills.length) {
						a.Fills.push({
							patternType: r.s.patternType,
							fgColor: r.s.fgColor,
							bgColor: r.s.bgColor
						})
					}
				}
				if (a.Borders) {
					for (; c < a.Borders.length; ++c) {
						var d = a.Borders[c];
						var p = "top";
						if (r.s[p]) {
							if (!d[p])
								continue;
							if (r.s[p].style != d[p].style)
								continue;
							if (ln(r.s[p].color, d[p].color))
								continue
						} else if (d[p] != null)
							continue;
						p = "bottom";
						if (r.s[p]) {
							if (!d[p])
								continue;
							if (r.s[p].style != d[p].style)
								continue;
							if (ln(r.s[p].color, d[p].color))
								continue
						} else if (d[p] != null)
							continue;
						p = "left";
						if (r.s[p]) {
							if (!d[p])
								continue;
							if (r.s[p].style != d[p].style)
								continue;
							if (ln(r.s[p].color, d[p].color))
								continue
						} else if (d[p] != null)
							continue;
						p = "right";
						if (r.s[p]) {
							if (!d[p])
								continue;
							if (r.s[p].style != d[p].style)
								continue;
							if (ln(r.s[p].color, d[p].color))
								continue
						} else if (d[p] != null)
							continue;
						break
					}
					if (c == a.Borders.length) {
						a.Borders.push({
							top: r.s.top && le(r.s.top) || void 0,
							bottom: r.s.bottom && le(r.s.bottom) || void 0,
							left: r.s.left && le(r.s.left) || void 0,
							right: r.s.right && le(r.s.right) || void 0
						})
					}
				}
				if (t && r.s.style && r.s.style !== "Normal") {
					for (f = 1; f < t.length; ++f)
						if (t[f].name == r.s.style)
							break;
					if (f == t.length)
						t.push({
							name: r.s.style,
							numFmtId: n,
							fontId: o,
							fillId: l,
							borderId: c
						})
				}
			}
			for (i = 0; i != s; ++i) {
				if (e[i].numFmtId != n)
					continue;
				if (e[i].fontId != o)
					continue;
				if (e[i].fillId != l)
					continue;
				if (e[i].borderId != c)
					continue;
				if (e[i].xfId != f)
					continue;
				if (r.s && r.s.alignment) {
					if (e[i].alignment) {
						if (r.s.alignment.horizontal != e[i].alignment.horizontal)
							continue;
						if (r.s.alignment.vertical != e[i].alignment.vertical)
							continue;
						if (r.s.alignment.wrapText != e[i].alignment.wrapText)
							continue;
						if (r.s.alignment.shrinkToFit != e[i].alignment.shrinkToFit)
							continue;
						if (r.s.alignment.textRotation != e[i].alignment.textRotation)
							continue;
						if (r.s.alignment.indent != e[i].alignment.indent)
							continue
					} else
						continue
				} else if (e[i].alignment)
					continue;
				if (r.s) {
					if (!!r.s.hidden == (!e[i].protection || !e[i].protection.hidden))
						continue;
					if (!!r.s.editable == (!e[i].protection || !e[i].protection.editable))
						continue
				} else if (e[i].protection)
					continue;
				return i
			}
		}
		e[s] = {
			numFmtId: n,
			fontId: o,
			fillId: l,
			borderId: c,
			xfId: f,
			applyNumberFormat: 1
		};
		if (o > 0)
			e[s].applyFont = 1;
		if (l > 0)
			e[s].applyFill = 1;
		if (c > 0)
			e[s].applyBorder = 1;
		if (!t && r.s && r.s.style && r.s.style != "Normal")
			e[s].style = r.s.style;
		if (r.s && r.s.alignment) {
			e[s].alignment = {};
			["horizontal", "vertical", "wrapText", "shrinkToFit", "indent", "textRotation"].forEach(function (t) {
				if (r.s.alignment[t] != null)
					e[s].alignment[t] = r.s.alignment[t]
			})
		}
		if (r.s && r.s.hidden) {
			if (!e[s].protection)
				e[s].protection = {};
			e[s].protection.hidden = true
		}
		if (r.s && r.s.editable) {
			if (!e[s].protection)
				e[s].protection = {};
			e[s].protection.editable = true
		}
		return s
	}
	function Vs(e, t, r, a, n, i, s, o) {
		if (e.t === "d" && typeof e.v === "string")
			e.v = se(e.v);
		try {
			if (i.cellNF)
				e.z = R._table[t]
		} catch (l) {
			if (i.WTF)
				throw l
		}
		if ((!i || i.cellText !== false) && e.t != "z")
			try {
				if (R._table[t] == null)
					R.load(L[t] || "General", t);
				if (e.t === "e")
					e.w = e.w || ta[e.v];
				else if (t === 0) {
					if (e.t === "n") {
						if ((e.v | 0) === e.v)
							e.w = R._general_int(e.v);
						else
							e.w = R._general_num(e.v)
					} else if (e.t === "d") {
						var c = J(e.v);
						if ((c | 0) === c)
							e.w = R._general_int(c);
						else
							e.w = R._general_num(c)
					} else if (e.v === undefined)
						return "";
					else
						e.w = R._general(e.v, Bs)
				} else if (e.t === "d")
					e.w = R.format(t, J(e.v), Bs);
				else
					e.w = R.format(t, e.v, Bs)
			} catch (l) {
				if (i.WTF)
					throw l
			}
		if (!i.cellStyles || !o)
			return;
		e.s = {};
		if (r != null && o.Fills)
			try {
				fe(e.s, o.Fills[r])
			} catch (l) {
				if (i.WTF)
					throw l
			}
		if (a != null && o.Fonts)
			try {
				fe(e.s, o.Fonts[a])
			} catch (l) {
				if (i.WTF)
					throw l
			}
		if (n != null && o.Borders)
			try {
				fe(e.s, o.Borders[n])
			} catch (l) {
				if (i.WTF)
					throw l
			}
	}
	function Gs(e, t, r) {
		if (e && e["!ref"]) {
			var a = Ar(e["!ref"]);
			if (a.e.c < a.s.c || a.e.r < a.s.r)
				throw new Error("Bad range (" + r + "): " + e["!ref"])
		}
	}
	function Zs(e, t) {
		var r = Ar(t);
		if (r.s.r <= r.e.r && r.s.c <= r.e.c && r.s.r >= 0 && r.s.c >= 0)
			e["!ref"] = Sr(r)
	}
	var qs = /<(?:\w:)?mergeCell ref="[A-Z0-9:]+"\s*[\/]?>/g;
	var Ys = /<(?:\w+:)?sheetData[^>]*>([\s\S]*)<\/(?:\w+:)?sheetData>/;
	var Ks = /<(?:\w:)?hyperlink [^>]*>/gm;
	var Js = /"(\w*:\w*)"/;
	var Qs = /<(?:\w:)?col\b[^>]*[\/]?>/g;
	var eo = /<(?:\w:)?control\b[^>]*[\/]?>/g;
	var to = /<(?:\w:)?autoFilter[^>]*([\/]|>([\s\S]*)<\/(?:\w:)?autoFilter)>/g;
	var ro = /<(?:\w:)?pageMargins[^>]*\/>/g;
	var ao = /<(?:\w:)?sheetPr\b(?:[^>a-z][^>]*)?\/>/;
	var no = /<(?:\w:)?sheetProtection\b(?:[^>a-z][^>]*)?\/>/;
	var io = /<(?:\w:)?sheetPr[^>]*(?:[\/]|>([\s\S]*)<\/(?:\w:)?sheetPr)>/;
	var so = /<(?:\w:)?sheetViews[^>]*(?:[\/]|>([\s\S]*)<\/(?:\w:)?sheetViews)>/;
	var oo = /<(?:\w+:)?dataValidations[^>]*(?:[\/]|>([\s\S]*?)<\/(?:\w+:)?dataValidations)>/;
	var lo = /<(?:\w+:)?conditionalFormatting\b[^>]*(?:[\/]|>([\s\S]*?)<\/(?:\w+:)?conditionalFormatting)>/g;
	var co = /<(?:\w:)?sheetFormatPr[^>]*\/>/;
	var fo = /<(?:\w+:)?tableParts.*?>([\s\S]*?)<\/(?:\w+:)?tableParts>/;
	var uo = /<(?:\w:)?pageSetup[^>]*\/>/;
	var ho = /<(?:\w:)?rowBreaks[^>]*(?:[\/]|>([\s\S]*)<\/(?:\w:)?rowBreaks)>/;
	var po = /<(?:\w:)?colBreaks[^>]*(?:[\/]|>([\s\S]*)<\/(?:\w:)?colBreaks)>/;
	var mo = /<(?:\w:)?headerFooter[^>]*(?:[\/]|>([\s\S]*)<\/(?:\w:)?headerFooter)>/;
	var vo = /<(?:\w:)?printOptions\b[^>\/]*\/>/;
	function go(e, t, r, a, n, i, s) {
		if (!e)
			return e;
		if (!a)
			a = {
				"!id": {}
			};
		if (v != null && t.dense == null)
			t.dense = v;
		var o = t.dense ? [] : {};
		var l = {
			s: {
				r: 2e6,
				c: 2e6
			},
			e: {
				r: 0,
				c: 0
			}
		};
		var c = "",
		f = "";
		var u = e.match(Ys);
		if (u) {
			c = e.slice(0, u.index);
			f = e.slice(u.index + u[0].length)
		} else
			c = f = e;
		var h = f.indexOf("extLst");
		var d = h == -1 ? "" : f.slice(h);
		var p = c.match(ao);
		if (p)
			xo(p[0], o, n, r);
		if (t.cellStyles) {
			if (p) {}
			else if (p = c.match(io))
				So(p[0], p[1] || "", o, n, r, s, i)
		}
		var m = (c.match(/<(?:\w*:)?dimension/) || {
			index: -1
		}).index;
		if (m > 0) {
			var g = c.slice(m, m + 50).match(Js);
			if (g && !(t && t.nodim))
				Zs(o, g[1])
		} {
			var b = c.match(so);
			if (b && b[1])
				gl(b[1], o, n, r)
		}
		var y = c.match(co);
		var w = [];
		if (t.cellStyles) {
			var k = c.match(Qs);
			if (k)
				Go(w, k, s)
		}
		if (u)
			kl(u[1], r, o, t, l, i, s);
		if (t.callback)
			return o;
		var x = f.match(no);
		if (x)
			o["!protect"] = $o(x[0]);
		var _ = f.match(to);
		if (_)
			o["!autofilter"] = qo(_[0]);
		var C = [];
		var S = f.match(qs);
		if (S)
			for (m = 0; m != S.length; ++m)
				C[m] = Ar(S[m].slice(S[m].indexOf('"') + 1));
		var A = (h == -1 ? f : f.slice(0, h)).match(lo);
		if (A)
			o["!condfmt"] = [].concat.apply([], A.map(function (e) {
					return dl(e, t, i, s)
				}));
		if (h > -1) {
			A = f.slice(h).match(lo);
			if (A) {
				if (!o["!condfmt"])
					o["!condfmt"] = [];
				o["!condfmt"] = o["!condfmt"].concat.apply(o["!condfmt"], A.map(function (e) {
							return dl(e, t, i, s, true)
						}))
			}
		}
		var T = (h == -1 ? f : f.slice(0, h)).match(oo);
		if (T)
			o["!validations"] = al(T[0], t);
		if (h > -1) {
			T = f.slice(h).match(oo);
			if (T) {
				if (!o["!validations"])
					o["!validations"] = [];
				o["!validations"] = o["!validations"].concat(al(T[0], t, true))
			}
		}
		var E = f.match(Ks);
		if (E)
			Ho(o, E, a);
		var F = f.match(vo);
		if (F)
			Ro(F[0], o);
		var D = f.match(ro);
		if (D)
			(o["!print"] || (o["!print"] = {})).margins = o["!margins"] = Xo(Pe(D[0]));
		var z = f.match(uo);
		if (z)
			zo(z[0], o);
		var O = f.match(mo);
		if (O)
			Ko(O, o);
		var R = f.match(ho);
		if (R)
			(o["!print"] || (o["!print"] = {})).rowBreaks = o["!rowBreaks"] = Lo(R[0]);
		var I = f.match(po);
		if (I)
			(o["!print"] || (o["!print"] = {})).colBreaks = o["!colBreaks"] = Mo(I[0]);
		var N = [];
		if (N = f.match(/drawing r:id="(.*?)"/))
			o["!rel"] = N[1];
		if (N = f.match(/legacyDrawing r:id="(.*?)"/))
			o["!legrel"] = N[1];
		if (N = f.match(eo))
			o["!ctrlid"] = N.map(function (e) {
					return Pe(e)
				});
		if (N = f.match(fo))
			wo(o, N[1]);
		if (t && t.nodim)
			l.s.c = l.s.r = 0;
		if (!o["!ref"] && l.e.c >= l.s.c && l.e.r >= l.s.r)
			o["!ref"] = Sr(l);
		if (t.sheetRows > 0 && o["!ref"]) {
			var L = Ar(o["!ref"]);
			if (t.sheetRows <= +L.e.r) {
				L.e.r = t.sheetRows - 1;
				if (L.e.r > l.e.r)
					L.e.r = l.e.r;
				if (L.e.r < L.s.r)
					L.s.r = L.e.r;
				if (L.e.c > l.e.c)
					L.e.c = l.e.c;
				if (L.e.c < L.s.c)
					L.s.c = L.e.c;
				o["!fullref"] = o["!ref"];
				o["!ref"] = Sr(L)
			}
		}
		if (y)
			o["!sheetFormat"] = bo(Pe(y[0]));
		if (w.length > 0)
			o["!cols"] = w;
		if (C.length > 0)
			o["!merges"] = C;
		if (a["!id"][o["!rel"]])
			o["!drawel"] = a["!id"][o["!rel"]];
		if (a["!id"][o["!legrel"]])
			o["!legdrawel"] = a["!id"][o["!legrel"]];
		(o["!ctrlid"] || []).forEach(function (e) {
			e.rel = a["!id"][e["id"]]
		});
		if (o["!gridlines"] == null)
			o["!gridlines"] = true;
		return o
	}
	function bo(e) {
		var t = {};
		var r = {},
		a = false;
		var n = {},
		i = false;
		if (e["defaultRowHeight"]) {
			a = true;
			r["hpt"] = parseFloat(e["defaultRowHeight"])
		}
		if (e["zeroHeight"]) {
			a = true;
			r["hidden"] = et(e["zeroHeight"])
		}
		if (e["baseColWidth"]) {
			i = true;
			n["wch"] = parseFloat(e["baseColWidth"])
		} else if (e["defaultColWidth"]) {
			i = true;
			n["wch"] = parseFloat(e["defaultColWidth"]) - 5 / pn
		} else {}
		if (e["outlineLevelCol"])
			t.coloutline = parseInt(e["outlineLevelCol"]);
		if (e["outlineLevelRow"])
			t.rowoutline = parseInt(e["outlineLevelRow"]);
		if (e["thickBottom"])
			t.botthick = et(e["thickBottom"]);
		if (e["thickTop"])
			t.topthick = et(e["thickTop"]);
		if (e["dyDescent"])
			t.dyDescent = parseFloat(e["dyDescent"]);
		if (a) {
			An(r);
			t.row = r
		}
		if (i) {
			wn(n);
			t.col = n
		}
		return t
	}
	var yo = /<(?:\w:)?tablePart\b[^\/>]*[\/]?>/g;
	function wo(e, t) {
		if (!e["!tablerefs"])
			e["!tablerefs"] = [];
		(t.match(yo) || []).forEach(function (t) {
			e["!tablerefs"].push(Pe(t).id)
		})
	}
	function ko(e) {
		if (e.length === 0)
			return "";
		var t = '<mergeCells count="' + e.length + '">';
		for (var r = 0; r != e.length; ++r)
			t += '<mergeCell ref="' + Sr(e[r]) + '"/>';
		return t + "</mergeCells>"
	}
	function xo(e, t, r, a) {
		var n = Pe(e);
		if (!r.Sheets[a])
			r.Sheets[a] = {};
		if (n.codeName)
			r.Sheets[a].CodeName = n.codeName
	}
	var _o = /<(?:\w:)?tabColor[^>]*[\/]?>/;
	var Co = /<(?:\w:)?pageSetUpPr[^>]*[\/]?>/;
	function So(e, t, r, a, n, i, s) {
		xo(e.slice(0, e.indexOf(">")), r, a, n);
		var o = t.match(_o);
		if (o) {
			var l = Pe(o[0]);
			var c = Pn(l, i, s);
			r["!tabcolor"] = c
		}
		if (o = t.match(Co)) {
			var f = Pe(o[0]);
			if (f.fitToPage) {
				if (!r["!print"])
					r["!print"] = {};
				if (!r["!print"].props)
					r["!print"].props = {};
				if (!r["!print"].props.fit)
					r["!print"].props.fit = {};
				if (!r["!print"].props.fit.height)
					r["!print"].props.fit.height = 1;
				if (!r["!print"].props.fit.width)
					r["!print"].props.fit.width = 1
			}
		}
	}
	function Ao(e, t, r, a, n) {
		var i = false;
		var s = {},
		o = null;
		if (a.bookType !== "xlsx" && t.vbaraw) {
			var l = t.SheetNames[r];
			try {
				if (t.Workbook)
					l = t.Workbook.Sheets[r].CodeName || l
			} catch (c) {}
			i = true;
			s.codeName = Ve(l)
		}
		if (e && e["!condfmt"])
			s.enableFormatConditionsCalculation = "1";
		if (e && e["!tabcolor"])
			o = (o || "") + '<tabColor rgb="FF' + Pi(e["!tabcolor"].rgb) + '"/>';
		var f = false,
		u = {};
		if ((((e || {})["!print"] || {}).props || {}).fit) {
			f = true;
			u.fitToPage = 1
		}
		if (f)
			o = (o || "") + mt("pageSetUpPr", null, u);
		if (e && e["!outline"]) {
			var h = {
				summaryBelow: 1,
				summaryRight: 1
			};
			if (e["!outline"].above)
				h.summaryBelow = 0;
			if (e["!outline"].left)
				h.summaryRight = 0;
			o = (o || "") + mt("outlinePr", null, h)
		}
		if (!i && !o)
			return;
		n[n.length] = mt("sheetPr", o, s)
	}
	var To = {
		displayed: "asDisplayed",
		end: "atEnd",
		none: "none"
	},
	Eo = G(To);
	var Fo = {
		displayed: "displayed",
		none: "blank",
		dash: "dash",
		"n/a": "NA"
	},
	Do = G(Fo);
	function zo(e, t) {
		var r = Pe(e, false, true);
		delete r["id"];
		delete r[0];
		if (!t["!print"])
			t["!print"] = {};
		if (!t["!print"].props)
			t["!print"].props = {};
		var a = t["!print"].props;
		if (r.orientation)
			a.orientation = r.orientation;
		if (r.scale)
			a.scale = +r.scale;
		if (+r.fitToHeight > 0)
			(a.fit || (a.fit = {})).height = +r.fitToHeight;
		if (+r.fitToWidth > 0)
			(a.fit || (a.fit = {})).width = +r.fitToWidth;
		if (r.paperHeight && r.paperWidth)
			a.paper = {
				width: r.paperWidth,
				height: r.paperHeight
			};
		else if (r.paperSize)
			a.paper = Vi[a.paper = +r.paperSize] || a.paper;
		if (r.horizontalDpi)
			a.dpi = +r.horizontalDpi;
		else if (r.verticalDpi)
			a.dpi = +r.verticalDpi;
		if ((r.firstPageNumber || "automatic") != "automatic")
			a.first = +r.firstPageNumber;
		if (et(r.blackAndWhite))
			a.bw = true;
		if (et(r.draft))
			a.draft = true;
		if (r.pageOrder == "overThenDown")
			a.order = "over";
		if (Eo[r.cellComments])
			a.comments = Eo[r.cellComments];
		if (Do[r.errors])
			a.errors = Do[r.errors]
	}
	function Oo(e) {
		if (e.props) {
			var t = {},
			r = e.props;
			if (r.orientation)
				t.orientation = r.orientation;
			if (r.scale)
				t.scale = r.scale;
			if (r.fit) {
				if (r.fit.height != null)
					t.fitToHeight = r.fit.height;
				if (r.fit.width != null)
					t.fitToWidth = r.fit.width
			}
			if (r.dpi)
				t.horizontalDpi = t.verticalDpi = r.dpi;
			if (r.first != null) {
				t.firstPageNumber = r.first;
				t.useFirstPageNumber = 1
			}
			if (r.bw)
				t.blackAndWhite = 1;
			if (r.draft)
				t.draft = 1;
			if (r.comments)
				t.cellComments = To[r.comments] || "none";
			if (r.errors)
				t.errors = Fo[r.errors] || "none";
			if (r.paper)
				switch (typeof r.paper) {
				case "number":
					t.paperSize = r.paper;
					break;
				case "string":
					if (Gi[r.paper])
						t.paperSize = Gi[r.paper];
					else if (+r.paper)
						t.paperSize = +r.paper;
					break;
				case "object":
					if (!r.paper.height || !r.paper.width)
						throw "Custom Paper Size must include width and height!";
					t.paperHeight = r.paper.height;
					t.paperWidth = r.paper.width;
					break;
				}
			if ([1, true, "true", "over"].indexOf(r.order) > -1)
				t.pageOrder = "overThenDown";
			return mt("pageSetup", null, t)
		}
		return ""
	}
	function Ro(e, t) {
		var r = Pe(e, false, true);
		if (!t["!print"])
			t["!print"] = {};
		if (!t["!print"].props)
			t["!print"].props = {};
		var a = t["!print"].props;
		if (r.horizontalCentered != null)
			a.centerX = et(r.horizontalCentered);
		if (r.verticalCentered != null)
			a.centerY = et(r.verticalCentered)
	}
	function Io(e) {
		if (e.props) {
			var t = {},
			r = e.props;
			if (r.gridlines)
				t.gridLines = t.gridLinesSet = 1;
			if (r.headings)
				t.headings = 1;
			if (r.centerX)
				t.horizontalCentered = 1;
			if (r.centerY)
				t.verticalCentered = 1;
			return mt("printOptions", null, t)
		}
		return ""
	}
	var No = /<(?:\w:)?brk[^>]*\/>/g;
	function Lo(e) {
		var t = [];
		(e.match(No) || []).forEach(function (e) {
			var r = Pe(e);
			t.push({
				R: +r.id
			})
		});
		return t
	}
	function Bo(e) {
		if (e.length == 0)
			return "";
		var t = ['<rowBreaks count="' + e.length + '" manualBreakCount="' + e.length + '">'];
		for (var r = 0; r < e.length; ++r)
			t.push('<brk id="' + e[r].R + '" man="1"/>');
		return t.join("") + "</rowBreaks>"
	}
	function Mo(e) {
		var t = [];
		(e.match(No) || []).forEach(function (e) {
			var r = Pe(e);
			t.push({
				C: +r.id
			})
		});
		return t
	}
	function Po(e) {
		if (e.length == 0)
			return "";
		var t = ['<colBreaks count="' + e.length + '" manualBreakCount="' + e.length + '">'];
		for (var r = 0; r < e.length; ++r)
			t.push('<brk id="' + e[r].C + '" man="1"/>');
		return t.join("") + "</colBreaks>"
	}
	var jo = ["objects", "scenarios", "selectLockedCells", "selectUnlockedCells"];
	var Wo = ["formatColumns", "formatRows", "formatCells", "insertColumns", "insertRows", "insertHyperlinks", "deleteColumns", "deleteRows", "sort", "autoFilter", "pivotTables"];
	function Uo(e) {
		var t = {
			sheet: 1
		};
		jo.forEach(function (r) {
			if (e[r] != null && e[r])
				t[r] = "1"
		});
		Wo.forEach(function (r) {
			if (e[r] != null && !e[r])
				t[r] = "0"
		});
		if (e.password)
			t.password = crypto_CreatePasswordVerifier_Method1(e.password).toString(16).toUpperCase();
		else if (e.encryption) {
			t.algorithmName = e.encryption.algo;
			t.hashValue = e.encryption.hash;
			t.saltValue = e.encryption.salt;
			t.spinCount = e.encryption.spin
		}
		return mt("sheetProtection", null, t)
	}
	function $o(e) {
		var t = Pe(e, true, true);
		var r = {};
		if (!et(t.sheet))
			return;
		jo.forEach(function (e) {
			r[e] = t[e] != null ? et(t[e]) : false
		});
		Wo.forEach(function (e) {
			r[e] = t[e] != null ? et(t[e]) : true
		});
		if (t.algorithmName)
			r.encryption = {
				algo: t.algorithmName,
				hash: t.hashValue,
				salt: t.saltValue,
				spin: +t.spinCount || 1e5
			};
		return r
	}
	function Ho(e, t, r) {
		var a = Array.isArray(e);
		for (var n = 0; n != t.length; ++n) {
			var i = Pe(tt(t[n]), true);
			if (!i.ref)
				return;
			var s = ((r || {})["!id"] || [])[i.id];
			if (s) {
				i.Target = s.Target;
				if (i.location)
					i.Target += "#" + i.location
			} else {
				i.Target = "#" + i.location;
				s = {
					Target: i.Target,
					TargetMode: "Internal"
				}
			}
			i.Rel = s;
			if (i.tooltip) {
				i.Tooltip = i.tooltip;
				delete i.tooltip
			}
			var o = Ar(i.ref);
			for (var l = o.s.r; l <= o.e.r; ++l)
				for (var c = o.s.c; c <= o.e.c; ++c) {
					var f = _r({
							c: c,
							r: l
						});
					if (a) {
						if (!e[l])
							e[l] = [];
						if (!e[l][c])
							e[l][c] = {
								t: "z",
								v: undefined
							};
						e[l][c].l = i
					} else {
						if (!e[f])
							e[f] = {
								t: "z",
								v: undefined
							};
						e[f].l = i
					}
				}
		}
	}
	function Xo(e) {
		var t = {};
		["left", "right", "top", "bottom", "header", "footer"].forEach(function (r) {
			if (e[r])
				t[r] = parseFloat(e[r])
		});
		return t
	}
	function Vo(e) {
		Us(e);
		return mt("pageMargins", null, e)
	}
	function Go(e, t, r) {
		var a = false;
		for (var n = 0; n != t.length; ++n) {
			var i = Pe(t[n], true);
			if (i.hidden)
				i.hidden = et(i.hidden);
			var s = parseInt(i.min, 10) - 1,
			o = parseInt(i.max, 10) - 1;
			if (i.outlineLevel)
				i.level = +i.outlineLevel || 0;
			delete i.min;
			delete i.max;
			i.width = +i.width;
			if (!a && i.width) {
				a = true
			}
			wn(i);
			if (i.style)
				i.s = yl(i.style, r);
			while (s <= o)
				e[s++] = le(i)
		}
	}
	function Zo(e, t, r) {
		var a = ["<cols>"],
		n;
		for (var i = 0; i != t.length; ++i) {
			if (!(n = t[i]))
				continue;
			if (n.auto)
				Ws(e, n, i);
			if (n.s || n.z) {
				var s = {
					t: "z"
				};
				if (n.s != null)
					s.s = n.s;
				if (n.z != null)
					s.z = n.z;
				n.style = Xs(r.cellXfs, r.cellStyleXfs, s, r)
			}
			a[a.length] = mt("col", null, js(i, n))
		}
		a[a.length] = "</cols>";
		return a.join("")
	}
	function qo(e) {
		var t = {
			ref: (e.match(/ref="([^"]*)"/) || [])[1]
		};
		return t
	}
	function Yo(e, t, r, a) {
		var n = typeof e.ref == "string" ? e.ref : Sr(e.ref);
		if (!r.Workbook)
			r.Workbook = {
				Sheets: []
			};
		if (!r.Workbook.Names)
			r.Workbook.Names = [];
		var i = r.Workbook.Names;
		var s = Cr(n);
		if (s.s.r == s.e.r) {
			s.e.r = Cr(t["!ref"]).e.r;
			n = Sr(s)
		}
		for (var o = 0; o < i.length; ++o) {
			var l = i[o];
			if (l.Name != "_xlnm._FilterDatabase")
				continue;
			if (l.Sheet != a)
				continue;
			l.Ref = "'" + r.SheetNames[a] + "'!" + n;
			break
		}
		if (o == i.length)
			i.push({
				Name: "_xlnm._FilterDatabase",
				Sheet: a,
				Ref: "'" + r.SheetNames[a] + "'!" + n
			});
		return mt("autoFilter", null, {
			ref: n
		})
	}
	function Ko(e, t) {
		if (!t["!print"])
			t["!print"] = {};
		if (!e[1])
			return;
		var r = "",
		a = 0;
		e[1].replace(Le, function (n, i) {
			if (n.charAt(1) != "/") {
				r = n.slice(1, -1);
				a = i + n.length
			} else if (r) {
				var s = r.match(/Header/) ? "header" : "footer";
				var o = r.replace(/Header|Footer/, "");
				r = "";
				if (!t["!print"][s])
					t["!print"][s] = {};
				t["!print"][s][o] = $e(tt(e[1].slice(a, i)))
			}
		})
	}
	function Jo(e) {
		var t = [],
		r = "";
		var a = "",
		n = "",
		i = "",
		s = "",
		o = "",
		l = "";
		var c = $i(e.header, (e.images || {}).header);
		if (c.length) {
			a = c[0];
			o = c[1];
			i = c[2]
		}
		var f = $i(e.footer, (e.images || {}).footer);
		if (f.length) {
			n = f[0];
			l = f[1];
			s = f[2]
		}
		if (a)
			t.push("<oddHeader>" + Ve(a) + "</oddHeader>");
		if (n)
			t.push("<oddFooter>" + Ve(n) + "</oddFooter>");
		if (s != n || i != a) {
			r += ' differentOddEven="1"';
			t.push("<evenHeader>" + Ve(i) + "</evenHeader>");
			t.push("<evenFooter>" + Ve(s) + "</evenFooter>")
		}
		if (l != n || o != a) {
			r += ' differentFirst="1"';
			t.push("<firstHeader>" + Ve(o) + "</firstHeader>");
			t.push("<firstFooter>" + Ve(l) + "</firstFooter>")
		}
		return t.length ? "<headerFooter" + r + ">" + t.join("") + "</headerFooter>" : ""
	}
	var Qo = {
		Custom: "custom",
		Date: "date",
		Time: "time",
		Length: "textLength",
		List: "list",
		Decimal: "decimal",
		Whole: "whole",
		Any: "none"
	},
	el = G(Qo);
	var tl = {
		IN: "between",
		OT: "notBetween",
		EQ: "equal",
		NE: "notEqual",
		GT: "greaterThan",
		LT: "lessThan",
		GE: "greaterThanOrEqual",
		LE: "lessThanOrEqual"
	},
	rl = G(tl);
	function al(e, t, r) {
		var a = [];
		var n = {},
		i = "";
		var s = false,
		o = 0,
		l = 0;
		e.replace(Le, function (c, f) {
			var u = Pe(c);
			switch (je(u[0])) {
			case "<dataValidations": ;
			case "<dataValidations>": ;
			case "</dataValidations>":
				break;
			case "<dataValidation":
				i = u["sqref"];
				n = {
					t: el[u["type"] || "none"],
					ref: i ? i.indexOf(" ") > -1 ? i : Ar(i) : ""
				};
				if (u["operator"])
					n.op = rl[u["operator"]];
				n.blank = u["allowBlank"] ? et(u["allowBlank"]) : false;
				if (!u["showInputMessage"] || !et(u["showInputMessage"]))
					n.input = false;
				if (u["promptTitle"])
					(n.input || (n.input = {})).title = $e(u["promptTitle"]);
				if (u["prompt"])
					(n.input || (n.input = {})).message = $e(u["prompt"]);
				if (!u["showErrorMessage"] || !et(u["showErrorMessage"]))
					n.error = false;
				if (u["errorTitle"])
					(n.error || (n.error = {})).title = $e(u["errorTitle"]);
				if (u["error"])
					(n.error || (n.error = {})).message = $e(u["error"]);
				if (n.error)
					n.error.style = u["errorStyle"] || "stop";
				else if (u["errorStyle"])
					n.error = {
						style: u["errorStyle"]
					};
				if (n.t)
					a.push(n);
				break;
			case "<dataValidation/>":
				break;
			case "</dataValidation>":
				break;
			case "<sqref>":
				l = f + c.length;
				break;
			case "</sqref>":
				i = e.slice(l, f);
				n.ref = i ? i.indexOf(" ") > -1 ? i : Ar(i) : "";
				break;
			case "<f>": ;
			case "<formula1": ;
			case "<formula1>": ;
			case "<formula2": ;
			case "<formula2>":
				o = f + c.length;
				break;
			case "</formula1>": ;
			case "</formula2>":
				if (r)
					break;
			case "</f>":
				var h = $e(tt(e.slice(o, f)));
				switch (n.t) {
				case "List":
					if (n.l || n.f)
						break;
					if (h.charCodeAt(0) == 34) {
						n.l = h.slice(1, -1).split(",");
						break
					};
				case "Custom":
					if (n.f == null)
						n.f = h;
					break;
				case "Date": ;
				case "Decimal": ;
				case "Length": ;
				case "Time": ;
				case "Whole":
					if (!n.op)
						n.op = "IN";
					if (n.v == null)
						n.v = isNaN(+h) ? h : +h;
					else {
						n.min = n.v;
						n.max = isNaN(+h) ? h : +h;
						delete n.v
					}
					break;
				}
				break;
			case "<extLst": ;
			case "<extLst>": ;
			case "</extLst>":
				break;
			case "<ext":
				s = true;
				break;
			case "</ext>":
				s = false;
				break;
			default:
				if (t && t.WTF) {
					if (!s)
						throw new Error("unrecognized " + u[0] + " in data validation")
				};
			}
			return c
		});
		return a
	}
	function nl(e) {
		if (!e || e.length == 0)
			return "";
		var t = [];
		var r = 0;
		for (var a = 0; a < e.length; ++a) {
			var n = e[a];
			var i = Qo[n.t];
			if (!n.ref)
				continue;
			if (typeof n.ref == "string" && n.ref.indexOf(" ") == -1) {
				n.ref = Ar(n.ref);
				if (!n.ref.s || n.ref.s.c < 0)
					continue
			}
			++r;
			var s = {
				type: i,
				allowBlank:  + (n.blank != false),
				showInputMessage:  + (n.input != false),
				showErrorMessage:  + (n.error != false),
				sqref: typeof n.ref == "string" ? n.ref : Sr(n.ref)
			};
			if (n.input) {
				if (n.input.title)
					s.promptTitle = Ge(n.input.title);
				if (n.input.message)
					s.prompt = Ge(n.input.message)
			}
			if (n.error) {
				if (n.error.title)
					s.errorTitle = Ge(n.error.title);
				if (n.error.message)
					s.error = Ge(n.error.message);
				if (n.error.style)
					s.errorStyle = n.error.style
			}
			if (!i)
				throw new Error("Bad validation: unrecognized type " + n.t);
			var o = "";
			switch (n.t) {
			case "Any":
				break;
			case "List": ;
			case "Custom":
				if (n.l)
					o = '<formula1>"' + Ve(n.l.join(",")) + '"</formula1>';
				else
					o = "<formula1>" + Ve(n.f) + "</formula1>";
				break;
			case "Date": ;
			case "Time": ;
			case "Decimal": ;
			case "Length": ;
			case "Whole":
				if (!tl[n.op])
					throw new Error("Bad Data Validation type " + n.op + " for " + n.t);
				s.operator = tl[n.op];
				if (n.v != null)
					o = "<formula1>" + Ve(String(n.v instanceof Date ? J(n.v) : n.v)) + "</formula1>";
				else if (n.min != null && n.max != null)
					o = "<formula1>" + Ve(String(n.min instanceof Date ? J(n.min) : n.min)) + "</formula1>" + "<formula2>" + Ve(String(n.max instanceof Date ? J(n.max) : n.max)) + "</formula2>";
				else
					throw new Error("Bad Data Validation: `v` or `min`+`max` required for Type " + n.t);
				break;
			}
			t.push(mt("dataValidation", o || null, s))
		}
		return r > 0 ? '<dataValidations count="' + r + '">' + t.join("") + "</dataValidations>" : ""
	}
	var il = {
		IN: "containsText",
		OT: "notContainsText",
		ST: "beginsWith",
		ND: "endsWith"
	},
	sl = G(il);
	var ol = {
		LM: "lastMonth",
		LS: "last7Days",
		LW: "lastWeek",
		NM: "nextMonth",
		NW: "nextWeek",
		TM: "thisMonth",
		TW: "thisWeek",
		TD: "today",
		TO: "tomorrow",
		YS: "yesterday"
	},
	ll = G(ol);
	function cl(e) {
		var t = {};
		if (e.val != null) {
			if (!isNaN(+e.val))
				t.v = +e.val;
			else
				t.f = e.val
		}
		t.t = e.type;
		return t
	}
	function fl(e) {
		return mt("cfvo", null, {
			type: e.t,
			val: e.v != null ? e.v : Ve(e.f)
		})
	}
	function ul(e, t, r, a) {
		var n = cl(e);
		n.color = Pn(t, r, a);
		return n
	}
	function hl(e, t, r, a, n, i) {
		var s = false;
		var o = [],
		l = {
			f: []
		},
		c = 0,
		f = 0,
		u = {
			cfvos: [],
			colors: []
		},
		h = {};
		var d = -1,
		p = 0,
		m = "";
		e.replace(Le, function (v, g) {
			var b = Pe(v);
			switch (je(b[0])) {
			case "<conditionalFormatting":
				break;
			case "</conditionalFormatting>":
				break;
			case "<cfRule": ;
			case "<cfRule>":
				f = g;
				h = b;
				l = {
					ref: t,
					f: []
				};
				if (!v.match(/\/>/))
					break;
			case "</cfRule>":
				if (h.dxfId && n && n.DXF)
					l.s = n.DXF[+h.dxfId];
				switch (h.type) {
				case "duplicateValues":
					l.t = "dup";
					break;
				case "uniqueValues":
					l.t = "unique";
					break;
				case "containsBlanks":
					l.t = "blank";
					l.v = true;
					break;
				case "notContainsBlanks":
					l.t = "blank";
					l.v = false;
					break;
				case "containsErrors":
					l.t = "error";
					l.v = true;
					break;
				case "notContainsErrors":
					l.t = "error";
					l.v = false;
					break;
				case "cellIs":
					switch (h.operator) {
					case "containsText": ;
					case "notContains": ;
					case "beginsWith": ;
					case "endsWith":
						l.t = "text";
						l.op = sl[h.operator];
						if (h.text == null)
							throw new Error("CF Text Rule " + l.op + " missing text");
						l.v = h.text;
						l.f = l.f[0];
						if (l.f == null)
							delete l.f;
						break;
					default:
						l.t = "val";
						l.op = rl[h.operator];
						if (l.f.length == 1) {
							if (!isNaN(+l.f[0])) {
								l.v = +l.f[0];
								delete l.f
							} else
								l.f = l.f[0]
						} else {
							l.min = isNaN(+l.f[0]) ? l.f[0] : +l.f[0];
							l.max = isNaN(+l.f[1]) ? l.f[1] : +l.f[1];
							delete l.f
						}
						break;
					}
					break;
				case "expression":
					l.t = "formula";
					l.f = l.f[0];
					break;
				case "containsText": ;
				case "notContainsText": ;
				case "beginsWith": ;
				case "endsWith":
					l.t = "text";
					l.op = sl[h.type];
					if (h.text == null && l.f.length < 2)
						throw new Error("CF Text Rule " + l.op + " missing text");
					l.v = h.text != null ? h.text : l.f[1].match(/".*"/) ? l.f[1].slice(1, -1) : l.f[1];
					l.f = l.f[0];
					if (l.f == null)
						delete l.f;
					break;
				case "colorScale":
					l.t = "scale";
					if (!l.colorScale)
						throw new Error("missing colorScale");
					u = l.colorScale;
					l.cmin = ul(u.cfvos[0], u.colors[0], n, a);
					if (u.cfvos.length == 3)
						l.cmid = ul(u.cfvos[1], u.colors[1], n, a);
					l.cmax = ul(u.cfvos[u.cfvos.length - 1], u.colors[u.cfvos.length - 1], n, a);
					break;
				case "dataBar":
					l.t = "bar";
					if (!l.dataBar)
						throw new Error("missing dataBar");
					u = l.dataBar;
					if (u.colors[0])
						l.color = Pn(u.colors[0], n, a);
					l.cmin = cl(u.cfvos[0]);
					l.cmax = cl(u.cfvos[1]);
					break;
				case "iconSet":
					l.t = "icon";
					if (!l.iconSet)
						throw new Error("missing iconSet");
					u = l.iconSet;
					l.thresh = u.cfvos.map(function (e) {
							return cl(e)
						});
					l.v = u.tag && u.tag.iconSet || "3TrafficLights1";
					l.rev = et(u.tag.reverse || "false");
					l.pct = et(u.tag.percent || "true");
					l.hidden = !et(u.tag.showValue || "true");
					break;
				case "timePeriod":
					l.t = "date";
					l.op = ll[h.timePeriod];
					break;
				case "aboveAverage":
					l.t = "avg";
					l.op = h.aboveAverage == "0" ? "L" : "G";
					if (h.stdDev)
						l.op += h.stdDev;
					else
						l.op += et(h.equalAverage || "0") ? "E" : "T";
					break;
				case "top10":
					l.t = "rank";
					l.op = (et(h.bottom || "0") ? "B" : "T") + (et(h.percent || "0") ? "P" : "V");
					l.v = +h.rank;
					break;
				default:
					throw "Unsupported CF Type " + h.type;
				}
				delete l.colorScale;
				delete l.dataBar;
				delete l.iconSet;
				if (!l.t) {
					console.log(e.slice(f, g + v.length));
					throw "bad CF rule"
				}
				if (l.f != null && !l.f.length)
					delete l.f;
				o.push(l);
				break;
			case "<formula": ;
			case "<formula>":
				c = g + v.length;
				break;
			case "</formula>":
				l.f.push($e(e.slice(c, g)));
				break;
			case "<f": ;
			case "<f>":
				c = g + v.length;
				break;
			case "</f>":
				l.f.push($e(e.slice(c, g)));
				break;
			case "<sqref>":
				p = g + v.length;
				break;
			case "</sqref>":
				m = e.slice(p, g);
				t = m ? m.indexOf(" ") > -1 ? m : Ar(m) : "";
				l.ref = t;
				o.forEach(function (e) {
					e.ref = t
				});
				break;
			case "<colorScale": ;
			case "<colorScale>": ;
			case "<dataBar": ;
			case "<dataBar>": ;
			case "<iconSet": ;
			case "<iconSet>":
				u = {
					cfvos: [],
					colors: [],
					tag: b
				};
				c = g + v.length;
				break;
			case "</colorScale>":
				l.colorScale = u;
				break;
			case "</dataBar>":
				l.dataBar = u;
				break;
			case "</iconSet>":
				l.iconSet = u;
				break;
			case "<cfvo": ;
			case "<cfvo/>":
				u.cfvos.push(b);
				break;
			case "</cfvo>":
				break;
			case "<color":
				u.colors.push(b);
				break;
			case "</color>":
				break;
			case "<extLst": ;
			case "<extLst>": ;
			case "</extLst>":
				break;
			case "<ext":
				s = true;
				break;
			case "</ext>":
				s = false;
				break;
			case "<dxf>":
				s = true;
				d = g;
				break;
			case "</dxf>":
				s = false;
				l.s = ii(e.slice(d, g + v.length), n, a, r);
				break;
			default:
				if (r && r.WTF) {
					if (i)
						break;
					if (!s)
						throw new Error("unrecognized " + b[0] + " in condfmt")
				};
			}
			return v
		});
		return o
	}
	function dl(e, t, r, a, n) {
		var i = (e.match(/sqref="([\w:$ ]*)"/) || [])[1];
		return hl(e, i, t, r, a, n)
	}
	function pl(e, t, r) {
		var a = e.s ? Hs(r.DXF, e.s) : -1;
		var n = typeof e.ref == "string" ? e.ref : Sr(e.ref);
		var i = Ar(n.replace(/\s.*$/, ""));
		var s = i.s;
		if (s.r < 0)
			s.r = 0;
		if (s.c < 0)
			s.c = 0;
		var o = "",
		l = {
			priority: t + 1
		};
		if (a > -1)
			l.dxfId = a;
		switch (e.t) {
		case "unique":
			l.type = "uniqueValues";
			break;
		case "dup":
			l.type = "duplicateValues";
			break;
		case "blank":
			l.type = (e.v ? "c" : "notC") + "ontainsBlanks";
			o = "<formula>LEN(TRIM(" + _r(s) + "))" + (e.v ? "=" : "&gt;") + "0</formula>";
			break;
		case "error":
			l.type = (e.v ? "c" : "notC") + "ontainsErrors";
			break;
		case "formula":
			l.type = "expression";
			o = mt("formula", Ve(e.f), {});
			break;
		case "date":
			l.type = "timePeriod";
			l.timePeriod = ol[e.op];
			break;
		case "text":
			l.type = l.operator = il[e.op];
			l.text = e.v;
			switch (e.op) {
			case "IN":
				o = '<formula>NOT(ISERROR(SEARCH("' + Ve(e.v) + '",' + _r(s) + ")))</formula>";
				break;
			case "OT":
				o = '<formula>ISERROR(SEARCH("' + Ve(e.v) + '",' + _r(s) + "))</formula>";
				break;
			case "ST":
				o = "<formula>LEFT(" + _r(s) + ',LEN("' + Ve(e.v) + '"))="' + Ve(e.v) + '"</formula>';
				break;
			case "ND":
				o = "<formula>RIGHT(" + _r(s) + ',LEN("' + Ve(e.v) + '"))="' + Ve(e.v) + '"</formula>';
				break;
			}
			break;
		case "val":
			l.type = "cellIs";
			l.operator = tl[e.op];
			if (e.min != null)
				o = mt("formula", Ve(String(e.min)), {}) + mt("formula", Ve(String(e.max)), {});
			else
				o = mt("formula", Ve(e.v != null ? String(e.v) : e.f), {});
			break;
		case "avg":
			l.type = "aboveAverage";
			l.aboveAverage = e.op.charAt(0) == "L" ? "0" : "1";
			switch (e.op.charAt(1)) {
			case "T":
				l.equalAverage = "0";
				break;
			case "E":
				l.equalAverage = "1";
				break;
			default:
				l.stdDev = e.op.charAt(1);
				break;
			}
			break;
		case "rank":
			l.type = "top10";
			l.bottom = e.op.charAt(0) == "B" ? "1" : "0";
			l.percent = e.op.charAt(1) == "P" ? "1" : "0";
			l.rank = e.v;
			break;
		case "icon":
			l.type = "iconSet";
			var c = {
				iconSet: e.v,
				percent: e.pct ? "true" : "false"
			};
			if (e.rev)
				c.reverse = "true";
			if (e.hidden)
				c.showValue = "false";
			o = mt("iconSet", e.thresh.map(fl).join(""), c);
			break;
		case "scale":
			l.type = "colorScale";
			o += fl(e.cmin);
			if (e.cmid)
				o += fl(e.cmid);
			o += fl(e.cmax);
			o += ji(e.cmin.color);
			if (e.cmid)
				o += ji(e.cmid.color);
			o += ji(e.cmax.color);
			o = mt("colorScale", o, {});
			break;
		case "bar":
			l.type = "dataBar";
			o += fl(e.cmin);
			o += fl(e.cmax);
			o += ji(e.color);
			o = mt("dataBar", o, {});
			break;
		default:
			console.log(e);
			throw "CF missing type " + e.t;
		}
		var f = mt("cfRule", o == "" ? null : o, l);
		return '<conditionalFormatting sqref="' + n + '">' + f + "</conditionalFormatting>"
	}
	function ml(e, t) {
		return e.map(function (e, r) {
			return pl(e, r, t)
		}).join("")
	}
	var vl = /<(?:\w:)?sheetView(?:[^>a-z][^>]*)?\/?>/g;
	function gl(e, t, r, a) {
		if (!r.Views)
			r.Views = [{}
			];
		var n = 0;
		e.replace(vl, function (i, s) {
			var o = Pe(i);
			if (!r.Views[a])
				r.Views[a] = {};
			if (et(o.rightToLeft))
				r.Views[a].RTL = true;
			if (o.showGridLines) {
				r.Views[a].grid = et(o.showGridLines);
				if (t["!gridlines"] == null)
					t["!gridlines"] = et(o.showGridLines)
			}
			if (+o.zoomScale)
				r.Views[a].zoom = +o.zoomScale;
			if (o.view)
				r.Views[a].view = o.view;
			++n;
			if (n == 1 && i.slice(-2) != "/>") {
				var l = e.slice(s + i.length);
				var c = l.match(/<\/(?:\w:)?sheetView(?:[^>a-z][^>]*)?\/?>/);
				if (!c)
					return "";
				l = l.slice(0, c.index);
				var f = l.match(/<(?:\w:)?pane(?:[^>a-z][^>]*)?\/?>/);
				if (f) {
					var u = Pe(f[0]);
					if (u.topLeftCell)
						t["!freeze"] = u.topLeftCell
				}
				var h = l.match(/<(?:\w:)?selection(?:[^>a-z][^>]*)?\/?>/);
				if (h) {
					var d = Pe(h[0]);
					if (d.activeCell)
						t["!sel"] = {
							cell: d.activeCell
						};
					if (d.sqref) {
						var p = d.sqref.replace(/\s.*$/, "");
						if (!t["!sel"])
							t["!sel"] = {
								cell: _r(Cr(p).s)
							};
						t["!sel"].range = d.sqref
					}
				}
			}
			return ""
		})
	}
	function bl(e, t, r, a) {
		var n = {
			workbookViewId: "0"
		};
		if ((((a || {}).Workbook || {}).Views || []).length) {
			var i = a.Workbook.Views;
			var s = i[r] || i[0];
			n.rightToLeft = s.RTL ? "1" : "0";
			if (s.zoom)
				n.zoomScale = s.zoom;
			if (s.grid != null)
				n.showGridLines = s.grid;
			if (s.view)
				n.view = s.view
		}
		if (e["!gridlines"] != null)
			n.showGridLines = !!e["!gridlines"];
		var o = "";
		var l = {
			r: 0,
			c: 0
		};
		if (e["!sel"]) {
			var l = e["!sel"].cell;
			if (!l) {
				if (!e["!sel"].range)
					throw new Error("Must specify a selection cell or range");
				l = Cr(e["!sel"].range.replace(/\s.*$/, "")).s
			}
			if (typeof l == "string")
				l = xr(l)
		}
		var c = "";
		if (e["!freeze"]) {
			var f = typeof e["!freeze"] == "string" ? xr(e["!freeze"]) : e["!freeze"];
			var u = _r(f);
			var h = {
				state: "frozen",
				xSplit: f.c,
				ySplit: f.r,
				topLeftCell: u
			};
			if (e["!sel"])
				h.activePane = c = (l.r >= f.r && f.r > 0 ? "bottom" : "top") + (l.c >= f.c && f.c > 0 ? "Right" : "Left");
			o = mt("pane", null, h)
		}
		if (e["!sel"]) {
			var d = {
				activeCell: typeof l == "string" ? l : _r(l)
			};
			if (e["!sel"].range)
				d.sqref = e["!sel"].range;
			else
				d.sqref = d.activeCell + ":" + d.activeCell;
			o += mt("selection", null, d);
			if (e["!freeze"]) {
				if (f.c > 0) {
					d.pane = "topRight";
					o += mt("selection", null, d)
				}
				if (f.r > 0) {
					d.pane = "bottomLeft";
					o += mt("selection", null, d)
				}
				if (f.c > 0 && f.r > 0) {
					d.pane = "bottomRight";
					o += mt("selection", null, d)
				}
			}
		}
		return mt("sheetViews", mt("sheetView", o || null, n), {})
	}
	function yl(e, t) {
		var r = 0,
		a = 0,
		n = 0,
		i = 0;
		if (!t || !t.CellXf)
			return null;
		var s = t.CellXf[e];
		if (s != null) {
			if (s.numFmtId != null)
				r = s.numFmtId;
			if (s.fillId != null)
				a = s.fillId;
			if (s.fontId != null)
				n = s.fontId;
			if (s.borderId != null)
				i = s.borderId
		}
		var o = {
			t: "z"
		};
		try {
			Vs(o, r, a, n, i, {
				WTF: 1,
				cellStyles: true
			}, null, t)
		} catch (l) {}
		return o.s
	}
	function wl(e, t, r, a) {
		if (e.v === undefined && e.f === undefined && e.s == null && !e.c || e.t === "z" && !e.c && !a.sheetStubs)
			return "";
		var n = "";
		var i = e.t,
		s = e.v;
		if (e.t !== "z")
			switch (e.t) {
			case "b":
				n = e.v ? "1" : "0";
				break;
			case "n":
				n = "" + e.v;
				break;
			case "e":
				n = ta[e.v];
				break;
			case "d":
				if (a && a.cellDates)
					n = se(e.v, -1).toISOString();
				else {
					e = le(e);
					e.t = "n";
					n = "" + (e.v = J(se(e.v)))
				}
				if (typeof e.z === "undefined")
					e.z = R._table[14];
				break;
			default:
				n = e.v;
				break;
			}
		var o = e.t == "z" ? "" : dt("v", Ve(n)),
		l = {
			r: t
		};
		var c = a ? Xs(a.cellXfs, a.cellStyleXfs, e, a) : 0;
		if (c !== 0)
			l.s = c;
		switch (e.t) {
		case "n":
			break;
		case "d":
			l.t = "d";
			break;
		case "b":
			l.t = "b";
			break;
		case "e":
			l.t = "e";
			break;
		case "z":
			break;
		default:
			if (e.v == null) {
				delete e.t;
				break
			}
			if (a && a.bookSST) {
				o = dt("v", "" + Ps(a.Strings, e.v, e.R ? e.r = Va(e.R) : null, a.revStrings));
				l.t = "s";
				break
			} else if (Array.isArray(e.R)) {
				o = "<is>" + Va(e.R) + "</is>";
				l.t = "inlineStr"
			} else
				l.t = "str";
			break;
		}
		if (e.t != i) {
			e.t = i;
			e.v = s
		}
		if (e.f) {
			var f = e.F && e.F.slice(0, t.length) == t ? {
				t: "array",
				ref: e.F
			}
			 : null;
			o = mt("f", Ve(e.f), f) + (e.v != null ? o : "")
		}
		if (e.l)
			r["!links"].push([t, e.l]);
		if (e.c)
			r["!comments"].push([t, e.c]);
		return mt("c", o, l)
	}
	var kl = function () {
		var e = /<(?:\w+:)?c[ \/>]/,
		t = /<\/(?:\w+:)?row>/;
		var r = /r=["']([^"']*)["']/,
		a = /<(?:\w+:)?is>([\S\s]*?)<\/(?:\w+:)?is>/;
		var n = /ref=["']([^"']*)["']/;
		var i = st("v"),
		s = st("f");
		return function o(l, c, f, u, h, d, p) {
			var m = 0,
			v = "",
			g = [],
			b = [],
			y = 0,
			w = 0,
			k = 0,
			x = "",
			_;
			var C,
			S = 0,
			A = 0;
			var T,
			E;
			var F = 0,
			D = 0,
			z = 0,
			O = 0;
			var I = Array.isArray(p.CellXf),
			N;
			var L = [];
			var B = [];
			var M = Array.isArray(f);
			var P = [],
			j = {},
			W = false;
			var U = l.split(t);
			var $ = !!u.sheetStubs,
			H = !!u.cellHTML,
			X = !(u.cellText === false && !u.cellNF && !u.cellStyles);
			for (var V = 0, G = U.length; V != G; ++V) {
				v = U[V].trim();
				var Z = v.length;
				if (Z === 0)
					continue;
				var q = 0;
				e: for (m = 0; m < Z; ++m)
					switch (v[m]) {
					case ">":
						if (v[m - 1] != "/") {
							++m;
							break e
						}
						break;
					case "<":
						q = m;
						break;
					}
				if (q >= m)
					break;
				C = Pe(v.slice(q, m), true);
				S = C.r != null ? parseInt(C.r, 10) : S + 1;
				A = -1;
				if (u.sheetRows && u.sheetRows < S)
					continue;
				if (!u.nodim) {
					if (h.s.r > S - 1)
						h.s.r = S - 1;
					if (h.e.r < S - 1)
						h.e.r = S - 1
				}
				var Y = {
					t: "row",
					row: [],
					R: S - 1,
					idx: c
				};
				if (u.cellStyles) {
					j = {};
					W = false;
					if (C.ht) {
						W = true;
						j.hpt = parseFloat(C.ht);
						j.hpx = Cn(j.hpt)
					}
					if (C.dyDescent) {
						W = true;
						j.dyDescent = C.dyDescent
					}
					if (C.hidden == "1") {
						W = true;
						j.hidden = true
					}
					if (C.outlineLevel != null) {
						W = true;
						j.level = +C.outlineLevel
					}
					if (C.s) {
						W = true;
						j.s = yl(C.s, p)
					}
					if (W) {
						if (u.callback)
							Y.props = j;
						else
							P[S - 1] = j
					}
				}
				g = v.slice(m).split(e);
				for (var K = 0; K != g.length; ++K)
					if (g[K].trim().charAt(0) != "<")
						break;
				g = g.slice(K);
				for (m = 0; m != g.length; ++m) {
					v = g[m].trim();
					if (v.length === 0)
						continue;
					b = v.match(r);
					y = m;
					w = 0;
					k = 0;
					v = "<c " + (v.slice(0, 1) == "<" ? ">" : "") + v;
					if (b != null && b.length === 2) {
						y = 0;
						x = b[1];
						for (w = 0; w != x.length; ++w) {
							if ((k = x.charCodeAt(w) - 64) < 1 || k > 26)
								break;
							y = 26 * y + k
						}
						--y;
						A = y
					} else ++A;
					for (w = 0; w != v.length; ++w)
						if (v.charCodeAt(w) === 62)
							break;
					++w;
					C = Pe(v.slice(0, w), true);
					if (!C.r)
						C.r = _r({
								r: S - 1,
								c: A
							});
					x = v.slice(w);
					_ = {
						t: ""
					};
					if ((b = x.match(i)) != null && b[1] !== "")
						_.v = $e(b[1]);
					if (u.cellFormula) {
						if ((b = x.match(s)) != null && b[1] !== "") {
							_.f = $e(tt(b[1])).replace(/\r\n/g, "\n");
							if (!u.xlfn)
								_.f = Ns(_.f);
							if (b[0].indexOf('t="array"') > -1) {
								_.F = (x.match(n) || [])[1];
								if (_.F.indexOf(":") > -1)
									L.push([Ar(_.F), _.F])
							} else if (b[0].indexOf('t="shared"') > -1) {
								E = Pe(b[0]);
								var ee = $e(tt(b[1]));
								if (!u.xlfn)
									ee = Ns(ee);
								B[parseInt(E.si, 10)] = [E, ee, C.r]
							}
						} else if (b = x.match(/<f[^>]*\/>/)) {
							E = Pe(b[0]);
							if (B[E.si])
								_.f = Rs(B[E.si][1], B[E.si][2], C.r)
						}
						var te = xr(C.r);
						for (w = 0; w < L.length; ++w)
							if (te.r >= L[w][0].s.r && te.r <= L[w][0].e.r)
								if (te.c >= L[w][0].s.c && te.c <= L[w][0].e.c)
									_.F = L[w][1]
					}
					if (C.t == null && _.v === undefined) {
						if (_.f || _.F) {
							_.v = 0;
							_.t = "n"
						} else if (!$)
							continue;
						else
							_.t = "z"
					} else
						_.t = C.t || "n";
					if (h.s.c > A)
						h.s.c = A;
					if (h.e.c < A)
						h.e.c = A;
					switch (_.t) {
					case "n":
						if (_.v == "" || _.v == null) {
							if (!$)
								continue;
							_.t = "z"
						} else
							_.v = parseFloat(_.v);
						break;
					case "s":
						if (typeof _.v == "undefined") {
							if (!$)
								continue;
							_.t = "z"
						} else {
							T = Ls[parseInt(_.v, 10)];
							_.v = T.t;
							_.r = T.r;
							if (T.R)
								_.R = T.R;
							if (H)
								_.h = T.h
						}
						break;
					case "str":
						_.t = "s";
						_.v = _.v != null ? tt(_.v) : "";
						if (H)
							_.h = Ye(_.v);
						break;
					case "inlineStr":
						b = x.match(a);
						_.t = "s";
						if (b != null && (T = Ya(b[1]))) {
							_.v = T.t;
							if (T.R)
								_.R = T.R;
							if (H)
								_.h = T.h
						} else
							_.v = "";
						break;
					case "b":
						_.v = et(_.v);
						break;
					case "d":
						if (u.cellDates)
							_.v = se(_.v, 1);
						else {
							_.v = J(se(_.v, 1));
							_.t = "n"
						}
						break;
					case "e":
						if (u.cellText !== false)
							_.w = _.v;
						_.v = ra[_.v];
						break;
					}
					if (X) {
						F = D = z = O = 0;
						N = null;
						if (I && C.s !== undefined) {
							N = p.CellXf[C.s];
							if (N != null) {
								if (N.numFmtId != null)
									F = N.numFmtId;
								if (u.cellStyles) {
									if (N.fillId != null)
										D = N.fillId;
									if (N.fontId != null)
										z = N.fontId;
									if (N.borderId != null)
										O = N.borderId
								}
							}
						}
						try {
							Vs(_, F, D, z, O, u, d, p)
						} catch (re) {}
						if (u.cellStyles && _.s) {
							if (N && N.alignment)
								_.s.alignment = le(N.alignment);
							if (N && N.protection) {
								if (N.protection.hidden != null)
									_.s.hidden = N.protection.hidden;
								if (N.protection.editable != null)
									_.s.editable = N.protection.editable
							}
							if (N && N.style)
								_.s.style = N.style
						}
						if (u.cellDates && I && _.t == "n" && R.is_date(R._table[F])) {
							_.t = "d";
							_.v = Q(_.v)
						}
					}
					var ae;
					if (u.nodim) {
						ae = xr(C.r);
						if (h.s.r > ae.r)
							h.s.r = ae.r;
						if (h.e.r < ae.r)
							h.e.r = ae.r
					}
					if (u.callback) {
						ae = xr(C.r);
						Y.row[ae.c] = _
					} else if (M) {
						ae = xr(C.r);
						if (!f[ae.r])
							f[ae.r] = [];
						f[ae.r][ae.c] = _
					} else
						f[C.r] = _
				}
				if (u.callback)
					u.callback(Y)
			}
			if ($ && !u.callback) {
				l.replace(/<(?:\w+:)?row[^>]*?\/>/g, function (e) {
					var t = Pe(e);
					if (t.r != null && parseInt(t.r, 10)) {
						var r = parseInt(t.r, 10);
						j = {};
						W = false;
						if (t.ht) {
							W = true;
							j.hpt = parseFloat(t.ht);
							j.hpx = Cn(j.hpt)
						}
						if (t.dyDescent) {
							W = true;
							j.dyDescent = t.dyDescent
						}
						if (t.hidden == "1") {
							W = true;
							j.hidden = true
						}
						if (t.outlineLevel != null) {
							W = true;
							j.level = +t.outlineLevel
						}
						if (t.s && p && p.CellXf) {
							W = true;
							j.s = yl(t.s, p)
						}
						if (W)
							P[r - 1] = j
					}
					return e
				});
				yl(0, p)
			}
			if (P.length > 0)
				f["!rows"] = P
		}
	}
	();
	function xl(e, t, r, a) {
		var n = [],
		i = [],
		s = Ar(e["!ref"]),
		o = "",
		l,
		c = "",
		f = [],
		u = 0,
		h = 0,
		d = e["!rows"];
		var p = Array.isArray(e);
		var m = {
			r: c
		},
		v,
		g = -1;
		for (h = s.s.c; h <= s.e.c; ++h)
			f[h] = br(h);
		for (u = s.s.r; u <= s.e.r; ++u) {
			i = [];
			c = pr(u);
			for (h = s.s.c; h <= s.e.c; ++h) {
				l = f[h] + c;
				var b = p ? (e[u] || [])[h] : e[l];
				if (b === undefined)
					continue;
				if ((o = wl(b, l, e, t, r, a)) != null)
					i.push(o)
			}
			if (i.length > 0 || d && d[u]) {
				m = {
					r: c
				};
				if (d && d[u]) {
					v = d[u];
					if (v.hidden)
						m.hidden = 1;
					g = -1;
					if (v.hpx)
						g = _n(v.hpx);
					else if (v.hpt)
						g = v.hpt;
					if (g > -1) {
						m.ht = g;
						m.customHeight = 1
					}
					if (v.level) {
						m.outlineLevel = v.level
					}
					if (v.dyDescent)
						m["x14ac:dyDescent"] = v.dyDescent;
					if (v.s) {
						m.s = Xs(t.cellXfs, t.cellStyleXfs, {
								t: "z",
								s: v.s
							}, t);
						m.customFormat = 1
					}
				}
				n[n.length] = mt("row", i.join(""), m)
			}
		}
		if (d)
			for (; u < d.length; ++u) {
				if (d && d[u]) {
					m = {
						r: u + 1
					};
					v = d[u];
					if (v.hidden)
						m.hidden = 1;
					g = -1;
					if (v.hpx)
						g = _n(v.hpx);
					else if (v.hpt)
						g = v.hpt;
					if (g > -1) {
						m.ht = g;
						m.customHeight = 1
					}
					if (v.level) {
						m.outlineLevel = v.level
					}
					n[n.length] = mt("row", "", m)
				}
			}
		return n.join("")
	}
	var _l = mt("worksheet", null, {
			xmlns: wt.main[0],
			"xmlns:r": wt.r,
			"xmlns:x14ac": "http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac",
			"xmlns:mc": "http://schemas.openxmlformats.org/markup-compatibility/2006",
			"mc:Ignorable": "x14ac"
		});
	function Cl(e, t, r, a) {
		var n = [Ie, _l];
		var i = r.SheetNames[e],
		s = 0,
		o = "";
		var l = r.Sheets[i];
		if (l == null)
			l = {};
		var c = l["!ref"] || "A1";
		var f = Ar(c);
		if (f.e.c > 16383 || f.e.r > 1048575) {
			if (t.WTF)
				throw new Error("Range " + c + " exceeds format limit A1:XFD1048576");
			f.e.c = Math.min(f.e.c, 16383);
			f.e.r = Math.min(f.e.c, 1048575);
			c = Sr(f)
		}
		if (!a)
			a = {};
		l["!comments"] = [];
		var u = [];
		var h = l["!print"];
		Ao(l, r, e, t, n);
		n[n.length] = mt("dimension", null, {
				ref: c
			});
		n[n.length] = bl(l, t, e, r);
		if (t.sheetFormat)
			n[n.length] = mt("sheetFormatPr", null, {
					defaultRowHeight: t.sheetFormat.defaultRowHeight || "16",
					baseColWidth: t.sheetFormat.baseColWidth || "10",
					outlineLevelRow: t.sheetFormat.outlineLevelRow || "7"
				});
		else if (l["!sheetFormat"]) {
			var d = {};
			var p = false;
			if (l["!sheetFormat"].row) {
				if (l["!sheetFormat"].row.hpt) {
					p = true;
					d.defaultRowHeight = l["!sheetFormat"].row.hpt;
					d.customHeight = 1
				} else if (l["!sheetFormat"].row.hpx) {
					p = true;
					d.defaultRowHeight = _n(l["!sheetFormat"].row.hpx);
					d.customHeight = 1
				} else if (l["!sheetFormat"].row.hpt === 0 || l["!sheetFormat"].row.hpx === 0 || l["!sheetFormat"].row.hidden) {
					p = true;
					d.defaultRowHeight = d.defaultRowHeight || 16;
					d.customHeight = 1;
					d.zeroHeight = 1
				}
				if (l["!sheetFormat"].dyDescent) {
					d["x14ac:dyDescent"] = l["!sheetFormat"].dyDescent
				}
			}
			if (l["!sheetFormat"].col) {
				if (!l["!sheetFormat"].col.wch)
					wn(l["!sheetFormat"].col);
				d.defaultColWidth = l["!sheetFormat"].col.wch + 5 / pn || 0;
				p = true
			}
			if (d.defaultRowHeight == null)
				d.defaultRowHeight = 16;
			if (d.defaultColWidth == null)
				d.defaultColWidth = 10;
			d.outlineLevelRow = d.outlineLevelRow || 7;
			if (p)
				n[n.length] = mt("sheetFormatPr", null, d)
		}
		if (l["!cols"] != null && l["!cols"].length > 0)
			n[n.length] = Zo(l, l["!cols"], t);
		n[s = n.length] = "<sheetData/>";
		l["!links"] = [];
		if (l["!ref"] != null) {
			o = xl(l, t, e, r, a);
			if (o.length > 0)
				n[n.length] = o
		}
		if (n.length > s + 1) {
			n[n.length] = "</sheetData>";
			n[s] = n[s].replace("/>", ">")
		}
		if (l["!protect"] != null)
			n[n.length] = Uo(l["!protect"]);
		if (l["!autofilter"] != null)
			n[n.length] = Yo(l["!autofilter"], l, r, e);
		if (l["!merges"] != null && l["!merges"].length > 0)
			n[n.length] = ko(l["!merges"]);
		if (l["!condfmt"])
			n[n.length] = ml(l["!condfmt"], t);
		if (l["!validations"])
			n[n.length] = nl(l["!validations"]);
		var m = -1,
		v,
		g = -1;
		if (l["!links"].length > 0) {
			n[n.length] = "<hyperlinks>";
			l["!links"].forEach(function (e) {
				if (!e[1].Target)
					return;
				v = {
					ref: e[0]
				};
				if (e[1].Target.charAt(0) != "#") {
					g = ga(a, -1, Ve(e[1].Target).replace(/#.*$/, ""), ua.HLINK);
					v["r:id"] = "rId" + g
				}
				if ((m = e[1].Target.indexOf("#")) > -1)
					v.location = Ve(e[1].Target.slice(m + 1));
				if (e[1].Tooltip)
					v.tooltip = Ve(e[1].Tooltip);
				n[n.length] = mt("hyperlink", null, v)
			});
			n[n.length] = "</hyperlinks>"
		}
		delete l["!links"];
		if (h) {
			var b = Io(h);
			if (b.length)
				n[n.length] = b
		}
		if (l["!margins"] != null || h && h.margins)
			n[n.length] = Vo(l["!margins"] || h.margins);
		if (h) {
			var y = Oo(h);
			if (y.length)
				n[n.length] = y;
			y = Jo(h);
			if (y.length)
				n[n.length] = y
		}
		if (l["!rowBreaks"] != null || h && h.rowBreaks)
			n[n.length] = Bo(l["!rowBreaks"] || h.rowBreaks);
		if (l["!colBreaks"] != null || h && h.colBreaks)
			n[n.length] = Po(l["!colBreaks"] || h.colBreaks);
		if (!t || t.ignoreEC || t.ignoreEC == void 0)
			n[n.length] = dt("ignoredErrors", mt("ignoredError", null, {
						numberStoredAsText: 1,
						sqref: c
					}));
		if (l["!charts"])
			u.push.apply(u, l["!charts"]);
		if (l["!images"])
			u.push.apply(u, l["!images"]);
		if (l["!shapes"])
			u.push.apply(u, l["!shapes"]);
		if (u.length > 0) {
			g = ga(a, -1, "../drawings/drawing" + (e + 1) + ".xml", ua.DRAW);
			n[n.length] = mt("drawing", null, {
					"r:id": "rId" + g
				});
			l["!drawing"] = u
		}
		if (l["!comments"].length > 0 || (l["!controls"] || []).length > 0) {
			g = ga(a, -1, "../drawings/vmlDrawing" + (e + 1) + ".vml", ua.VML);
			n[n.length] = mt("legacyDrawing", null, {
					"r:id": "rId" + g
				});
			l["!legacy"] = g
		}
		if (l["!print"] && l["!print"].images) {
			var w = l["!print"].images;
			var k = 0;
			["header", "footer"].forEach(function (e) {
				if (!w[e])
					return;
				["odd", "even", "first"].forEach(function (t) {
					if (!w[e][t])
						return;
					["left", "right", "center"].forEach(function (r) {
						if (!Array.isArray(w[e][t][r]))
							return;
						for (var a = 0; a < w[e][t][r].length; ++a)
							if (w[e][t][r][a])
								w[e][t][r][a]._cnt = k++
					})
				})
			});
			if (k > 0) {
				g = ga(a, -1, "../drawings/vmlDrawing" + (e + 1) + "HF.vml", ua.VML);
				n[n.length] = mt("legacyDrawingHF", null, {
						"r:id": "rId" + g
					});
				l["!legacyHF"] = g
			}
		}
		if ((l["!tables"] || []).length > 0) {
			n[n.length] = '<tableParts count="' + l["!tables"].length + '">';
			l["!tables"].forEach(function (t, r) {
				g = ga(a, -1, "../tables/table" + (e + 1) + "_" + r + ".xml", ua.TABLE);
				n[n.length] = '<tablePart r:id="rId' + g + '"/>'
			});
			n[n.length] = "</tableParts>"
		}
		if (n.length > 1) {
			n[n.length] = "</worksheet>";
			n[1] = n[1].replace("/>", ">")
		}
		return n.join("")
	}
	ua.CHART = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart";
	ua.CHARTEX = "http://schemas.microsoft.com/office/2014/relationships/chartEx";
	function Sl(e) {
		var t = [];
		var r = e.match(/^<c:numCache>/);
		var a;
		(e.match(/<c:pt idx="(\d*)">(.*?)<\/c:pt>/gm) || []).forEach(function (e) {
			var a = e.match(/<c:pt idx="(\d*?)"><c:v>(.*)<\/c:v><\/c:pt>/);
			if (!a)
				return;
			t[+a[1]] = r ? +a[2] : a[2]
		});
		var n = $e((e.match(/<c:formatCode>([\s\S]*?)<\/c:formatCode>/) || ["", "General"])[1]);
		(e.match(/<c:f>(.*?)<\/c:f>/gm) || []).forEach(function (e) {
			a = e.replace(/<.*?>/g, "")
		});
		return [t, n, a]
	}
	function Al(e, t) {
		t["!legend"] = {
			pos: "r"
		};
		var r = [];
		if (r = e.match(/<c:legendPos([^\/>]*)\/>/m))
			t["!legend"].pos = Pe(r[0]).val || "r"
	}
	function Tl(e, t) {
		var r = "";
		if (e.match(/<c:rich>/))
			e.replace(/<a:t>([\s\S]*?)<\/a:t>/g, function (e, t) {
				r += t
			});
		t["!title"] = r || "Chart Title"
	}
	var El = /<(?:\w+:)?chart>([\s\S]*?)<\/(?:\w+:)?chart>/;
	var Fl = /<(?:\w+:)?plotArea>([\s\S]*?)<\/(?:\w+:)?plotArea>/;
	var Dl = /<(?:\w+:)?legend>([\s\S]*?)<\/(?:\w+:)?legend>/;
	var zl = /<(?:\w+:)?title>([\s\S]*?)<\/(?:\w+:)?title>/;
	function Ol(e, t, r, a, n, i, s, o) {
		var l = i || {
			"!type": "chart"
		};
		if (!e)
			return i;
		if (s && s.Anchor) {
			l["!pos"] = Fi(s.Anchor, o);
			l["!posType"] = s.Anchor.type.replace(/Anchor/, "");
			l["!abspos"] = Fi(s.Anchor, o);
			l["!relpos"] = Di(s.Anchor, o)
		}
		l["!plot"] = [];
		var c = "",
		f = "";
		var u = e.match(El);
		if (u) {
			c = e.slice(0, u.index);
			f = e.slice(u.index + u[0].length)
		} else
			c = f = e;
		var h = [];
		var d = c.match(/<c:lang.*?>/) || e.match(/<c:lang.*?>/) || f.match(/<c:lang.*?>/);
		if (d)
			l["!lang"] = (Pe(d[0]) || {}).val || "en-US";
		if (u) {
			if (h = u[1].match(zl))
				Tl(h[1], l);
			Nl((u[1].match(Fl) || [])[1], l);
			if ((h = u[1].match(Dl)) != null)
				Al(h[0], l)
		}
		return l
	}
	var Rl = /<c:((?:area|line|stock|radar|scatter|pie|doughnut|bar|ofPie|surface|bubble)(?:3D)?)Chart[^>]*>([\s\S]*?)<\/c:(?:area|line|stock|radar|scatter|pie|doughnut|bar|ofPie|surface|bubble)(?:3D)?Chart>/gm;
	var Il = /<c:ser>([\s\S]*?)<\/c:ser>/gm;
	function Nl(e, t) {
		if (!e)
			return;
		var r = 0,
		a = 0,
		n = "A";
		var i = {
			s: {
				r: 2e6,
				c: 2e6
			},
			e: {
				r: 0,
				c: 0
			}
		};
		e.replace(Rl, function (e, s) {
			var o = {
				t: s,
				c: r,
				w: 0,
				ser: []
			},
			l = [];
			var c = (e.match(/<c:ser/) || []).index;
			var f = c ? e.slice(0, c) : e;
			var u = "marker";
			if (s == "scatter") {
				l = e.match(/<c:scatterStyle([^\/>]*)\/>/m);
				if (l)
					u = Pe(l[0]).val || "marker"
			}
			if (s == "bar") {
				l = e.match(/<c:barDir([^\/>]*)\/>/m);
				if (l)
					o.barDir = Pe(l[0]).val == "bar" ? "h" : "v"
			}
			l = f.match(/<c:grouping([^\/>]*)\/>/m);
			if (l)
				o.grouping = Pe(l[0]).val || "standard";
			(e.match(Il) || []).forEach(function (s) {
				var c = [],
				f = {},
				u = [];
				if (s.match(/<c:tx>/)) {
					var h = Sl((s.match(/<c:tx>([\s\S]*?)<\/c:tx>/) || [])[1] || "") || [];
					if (h[0] && h[0][0])
						f.name = h[0][0];
					if (h[2])
						f.nameref = h[2]
				}
				["xVal", "yVal", "cat", "val", "bubbleSize"].forEach(function (e) {
					var l = s.match(new RegExp("<c:" + e + ">[\\s\\S]*?<\\/c:" + e + ">", "gm"));
					if (!l)
						return;
					var h;
					(l[0].match(/<c:f>(.*?)<\/c:f>/gm) || []).forEach(function (e) {
						h = e.replace(/<.*?>/g, "")
					});
					(l[0].match(/<c:(?:\w*)Cache>[\s\S]*?<\/c:(?:\w*)Cache>/gm) || []).forEach(function (s) {
						var l = Sl(s);
						i.s.r = i.s.c = 0;
						i.e.c = r;
						n = br(r);
						l[0].forEach(function (e, r) {
							t[n + pr(r)] = {
								t: typeof e == "number" ? "n" : "s",
								v: e,
								z: l[1]
							};
							a = r
						});
						if (i.e.r < a)
							i.e.r = a;
						++r;
						o.w++;
						c.push(e);
						if (l[2] || h)
							u.push(l[2] || h);
						if (e == "val")
							f.z = l[1] || "General"
					})
				});
				l = e.match(/<c:smooth([^\/>]*)\/>/m);
				if (l)
					f.smooth = Pe(l[0]).val == null ? true : et(Pe(l[0]).val);
				f.cols = c;
				f.ranges = u;
				o.ser.push(f)
			});
			if (s == "scatter")
				switch (u) {
				case "line":
					break;
				}
			if (s == "doughnut") {
				l = e.match(/<c:holeSize([^\/>]*)\/>/m);
				if (l)
					o.hole = (Pe(l[0]).val || 10) / 100
			}
			t["!plot"].push(o)
		});
		if (r > 0)
			t["!ref"] = Sr(i)
	}
	ua.CS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chartsheet";
	var Ll = mt("chartsheet", null, {
			xmlns: wt.main[0],
			"xmlns:r": wt.r
		});
	function Bl(e, t, r, a, n) {
		if (!e)
			return e;
		if (!a)
			a = {
				"!id": {}
			};
		var i = {
			"!type": "chart",
			"!drawel": null,
			"!rel": ""
		};
		var s;
		var o = e.match(ao);
		if (o)
			xo(o[0], i, n, r);
		var l = e.match(ro);
		if (l)
			i["!margins"] = Xo(Pe(l[0]));
		if (s = e.match(/drawing r:id="(.*?)"/))
			i["!rel"] = s[1];
		if (a["!id"][i["!rel"]])
			i["!drawel"] = a["!id"][i["!rel"]];
		return i
	}
	function Ml(e, t, r, a) {
		var n = [Ie, Ll];
		n.push("<sheetPr/>");
		n.push('<sheetViews><sheetView zoomScale="100" workbookViewId="0" zoomToFit="1"/></sheetViews>');
		n[n.length] = mt("drawing", null, {
				"r:id": "rId1"
			});
		ga(a, -1, "../drawings/drawing" + (e + 1) + ".xml", ua.DRAW);
		if (n.length > 2) {
			n[n.length] = "</chartsheet>";
			n[1] = n[1].replace("/>", ">")
		}
		return n.join("")
	}
	function Pl(e, t) {
		e.l += 10;
		var r = parse_XLWideString(e, t - 10);
		return {
			name: r
		}
	}
	function jl(e, t, r, a, n) {
		if (!e)
			return e;
		if (!a)
			a = {
				"!id": {}
			};
		var i = {
			"!type": "chart",
			"!drawel": null,
			"!rel": ""
		};
		var s = [];
		var o = false;
		sr(e, function l(e, a, c) {
			switch (c) {
			case 550:
				i["!rel"] = e;
				break;
			case 651:
				if (!n.Sheets[r])
					n.Sheets[r] = {};
				if (e.name)
					n.Sheets[r].CodeName = e.name;
				break;
			case 562: ;
			case 652: ;
			case 669: ;
			case 679: ;
			case 551: ;
			case 552: ;
			case 476: ;
			case 3072:
				break;
			case 35:
				o = true;
				break;
			case 36:
				o = false;
				break;
			case 37:
				s.push(a);
				break;
			case 38:
				s.pop();
				break;
			default:
				if ((a || "").indexOf("Begin") > 0)
					s.push(a);
				else if ((a || "").indexOf("End") > 0)
					s.pop();
				else if (!o || t.WTF)
					throw new Error("Unexpected record " + c + " " + a);
			}
		}, t);
		if (a["!id"][i["!rel"]])
			i["!drawel"] = a["!id"][i["!rel"]];
		return i
	}
	function Wl() {
		var e = or();
		lr(e, "BrtBeginSheet");
		lr(e, "BrtEndSheet");
		return e.end()
	}
	var Ul = [["allowRefreshQuery", false, "bool"], ["autoCompressPictures", true, "bool"], ["backupFile", false, "bool"], ["checkCompatibility", false, "bool"], ["CodeName", ""], ["date1904", false, "bool"], ["defaultThemeVersion", 0, "int"], ["filterPrivacy", false, "bool"], ["hidePivotFieldList", false, "bool"], ["promptedSolutions", false, "bool"], ["publishItems", false, "bool"], ["refreshAllConnections", false, "bool"], ["saveExternalLinkValues", true, "bool"], ["showBorderUnselectedTables", true, "bool"], ["showInkAnnotation", true, "bool"], ["showObjects", "all"], ["showPivotChartFilter", false, "bool"], ["updateLinks", "userSet"]];
	var $l = [["activeTab", 0, "int"], ["autoFilterDateGrouping", true, "bool"], ["firstSheet", 0, "int"], ["minimized", false, "bool"], ["showHorizontalScroll", true, "bool"], ["showSheetTabs", true, "bool"], ["showVerticalScroll", true, "bool"], ["tabRatio", 600, "int"], ["visibility", "visible"]];
	var Hl = [];
	var Xl = [["calcCompleted", "true"], ["calcMode", "auto"], ["calcOnSave", "true"], ["concurrentCalc", "true"], ["fullCalcOnLoad", "false"], ["fullPrecision", "true"], ["iterate", "false"], ["iterateCount", "100"], ["iterateDelta", "0.001"], ["refMode", "A1"]];
	function Vl(e, t) {
		for (var r = 0; r != e.length; ++r) {
			var a = e[r];
			for (var n = 0; n != t.length; ++n) {
				var i = t[n];
				if (a[i[0]] == null)
					a[i[0]] = i[1];
				else
					switch (i[2]) {
					case "bool":
						if (typeof a[i[0]] == "string")
							a[i[0]] = et(a[i[0]]);
						break;
					case "int":
						if (typeof a[i[0]] == "string")
							a[i[0]] = parseInt(a[i[0]], 10);
						break;
					}
			}
		}
	}
	function Gl(e, t) {
		for (var r = 0; r != t.length; ++r) {
			var a = t[r];
			if (e[a[0]] == null)
				e[a[0]] = a[1];
			else
				switch (a[2]) {
				case "bool":
					if (typeof e[a[0]] == "string")
						e[a[0]] = et(e[a[0]]);
					break;
				case "int":
					if (typeof e[a[0]] == "string")
						e[a[0]] = parseInt(e[a[0]], 10);
					break;
				}
		}
	}
	function Zl(e) {
		Gl(e.WBProps, Ul);
		Gl(e.CalcPr, Xl);
		Vl(e.WBView, $l);
		Vl(e.Sheets, Hl);
		Bs.date1904 = et(e.WBProps.date1904)
	}
	function ql(e) {
		if (!e.Workbook)
			return "false";
		if (!e.Workbook.WBProps)
			return "false";
		return et(e.Workbook.WBProps.date1904) ? "true" : "false"
	}
	var Yl = "][*?/\\".split("");
	function Kl(e, t) {
		if (e.length > 31) {
			if (t)
				return false;
			throw new Error("Sheet names cannot exceed 31 chars")
		}
		var r = true;
		Yl.forEach(function (a) {
			if (e.indexOf(a) == -1)
				return;
			if (!t)
				throw new Error("Sheet name cannot contain : \\ / ? * [ ]");
			r = false
		});
		return r
	}
	function Jl(e, t, r) {
		e.forEach(function (a, n) {
			Kl(a);
			for (var i = 0; i < n; ++i)
				if (a == e[i])
					throw new Error("Duplicate Sheet Name: " + a);
			if (r) {
				var s = t && t[n] && t[n].CodeName || a;
				if (s.charCodeAt(0) == 95 && s.length > 22)
					throw new Error("Bad Code Name: Worksheet" + s)
			}
		})
	}
	function Ql(e) {
		if (!e || !e.SheetNames || !e.Sheets)
			throw new Error("Invalid Workbook");
		if (!e.SheetNames.length)
			throw new Error("Workbook is empty");
		var t = e.Workbook && e.Workbook.Sheets || [];
		Jl(e.SheetNames, t, !!e.vbaraw);
		for (var r = 0; r < e.SheetNames.length; ++r)
			Gs(e.Sheets[e.SheetNames[r]], e.SheetNames[r], r)
	}
	var ec = /<\w+:workbook/;
	function tc(e, t) {
		if (!e)
			throw new Error("Could not find file");
		var r = {
			AppVersion: {},
			WBProps: {},
			WBView: [],
			Sheets: [],
			CalcPr: {},
			Names: [],
			Extern: [],
			xmlns: ""
		};
		var a = false,
		n = "xmlns";
		var i = {},
		s = 0;
		e.replace(Le, function o(l, c) {
			var f = Pe(l);
			switch (je(f[0])) {
			case "<?xml":
				break;
			case "<workbook":
				if (l.match(ec))
					n = "xmlns" + l.match(/<(\w+):/)[1];
				r.xmlns = f[n];
				break;
			case "</workbook>":
				break;
			case "<fileVersion":
				delete f[0];
				r.AppVersion = f;
				break;
			case "<fileVersion/>": ;
			case "</fileVersion>":
				break;
			case "<fileSharing":
				r.Modify = {
					user: f.userName,
					warn: et(f.readOnlyRecommended || "false")
				};
				if (f.algorithmName || f.hashValue || f.saltValue || f.spinCount)
					r.Modify.encryption = {
						algo: f.algorithmName,
						hash: f.hashValue,
						salt: f.saltValue,
						spin: +f.spinCount || 1e5
					};
				break;
			case "<fileSharing/>":
				break;
			case "<workbookPr": ;
			case "<workbookPr/>":
				Ul.forEach(function (e) {
					if (f[e[0]] == null)
						return;
					switch (e[2]) {
					case "bool":
						r.WBProps[e[0]] = et(f[e[0]]);
						break;
					case "int":
						r.WBProps[e[0]] = parseInt(f[e[0]], 10);
						break;
					default:
						r.WBProps[e[0]] = f[e[0]];
					}
				});
				if (f.codeName)
					r.WBProps.CodeName = tt(f.codeName);
				break;
			case "</workbookPr>":
				break;
			case "<workbookProtection":
				var u = r.Protection || {};
				u.lockStructure = et(f.lockStructure || "false");
				u.lockWindows = et(f.lockWindows || "false");
				if (f.workbookAlgorithmName)
					u.encryption = {
						algo: f.workbookAlgorithmName,
						hash: f.workbookHashValue,
						salt: f.workbookSaltValue,
						spin: +f.workbookSpinCount || 1e5
					};
				r.Protection = u;
				break;
			case "<workbookProtection/>":
				break;
			case "<bookViews": ;
			case "<bookViews>": ;
			case "</bookViews>":
				break;
			case "<workbookView": ;
			case "<workbookView/>":
				delete f[0];
				r.WBView.push(f);
				break;
			case "</workbookView>":
				break;
			case "<sheets": ;
			case "<sheets>": ;
			case "</sheets>":
				break;
			case "<sheet":
				switch (f.state) {
				case "hidden":
					f.Hidden = 1;
					break;
				case "veryHidden":
					f.Hidden = 2;
					break;
				default:
					f.Hidden = 0;
				}
				delete f.state;
				f.name = $e(tt(f.name));
				delete f[0];
				r.Sheets.push(f);
				break;
			case "</sheet>":
				break;
			case "<functionGroups": ;
			case "<functionGroups/>":
				break;
			case "<functionGroup":
				break;
			case "<externalReferences": ;
			case "</externalReferences>": ;
			case "<externalReferences>":
				break;
			case "<externalReference":
				r.Extern.push(f.id);
				break;
			case "<definedNames/>":
				break;
			case "<definedNames>": ;
			case "<definedNames":
				a = true;
				break;
			case "</definedNames>":
				a = false;
				break;
			case "<definedName": {
					i = {};
					i.Name = tt(f.name);
					if (f.comment)
						i.Comment = f.comment;
					if (f.localSheetId)
						i.Sheet = +f.localSheetId;
					if (et(f.hidden || "0"))
						i.Hidden = true;
					s = c + l.length
				}
				break;
			case "</definedName>": {
					i.Ref = $e(tt(e.slice(s, c)));
					r.Names.push(i)
				}
				break;
			case "<definedName/>":
				break;
			case "<calcPr":
				delete f[0];
				r.CalcPr = f;
				break;
			case "<calcPr/>":
				delete f[0];
				r.CalcPr = f;
				break;
			case "</calcPr>":
				break;
			case "<oleSize":
				break;
			case "<customWorkbookViews>": ;
			case "</customWorkbookViews>": ;
			case "<customWorkbookViews":
				break;
			case "<customWorkbookView": ;
			case "</customWorkbookView>":
				break;
			case "<pivotCaches>": ;
			case "</pivotCaches>": ;
			case "<pivotCaches":
				break;
			case "<pivotCache":
				break;
			case "<smartTagPr": ;
			case "<smartTagPr/>":
				break;
			case "<smartTagTypes": ;
			case "<smartTagTypes>": ;
			case "</smartTagTypes>":
				break;
			case "<smartTagType":
				break;
			case "<webPublishing": ;
			case "<webPublishing/>":
				break;
			case "<fileRecoveryPr": ;
			case "<fileRecoveryPr/>":
				break;
			case "<webPublishObjects>": ;
			case "<webPublishObjects": ;
			case "</webPublishObjects>":
				break;
			case "<webPublishObject":
				break;
			case "<extLst": ;
			case "<extLst>": ;
			case "</extLst>": ;
			case "<extLst/>":
				break;
			case "<ext":
				a = true;
				break;
			case "</ext>":
				a = false;
				break;
			case "<ArchID":
				break;
			case "<AlternateContent": ;
			case "<AlternateContent>":
				a = true;
				break;
			case "</AlternateContent>":
				a = false;
				break;
			case "<revisionPtr":
				break;
			default:
				if (!a && t.WTF)
					throw new Error("unrecognized " + f[0] + " in workbook");
			}
			return l
		});
		if (wt.main.indexOf(r.xmlns) === -1)
			throw new Error("Unknown Namespace: " + r.xmlns);
		Zl(r);
		return r
	}
	function rc(e) {
		var t = {};
		if (e.warn)
			t.readOnlyRecommended = 1;
		t.userName = e.user || "Sheet JS";
		if (e.encryption) {
			if (e.encryption.algo)
				t.algorithmName = e.encryption.algo;
			if (e.encryption.hash)
				t.hashValue = e.encryption.hash;
			if (e.encryption.salt)
				t.saltValue = e.encryption.salt;
			if (e.encryption.spin)
				t.spinCount = e.encryption.spin
		}
		return mt("fileSharing", null, t)
	}
	function ac(e) {
		var t = {};
		if (e.lockStructure)
			t.lockStructure = 1;
		if (e.lockWindows)
			t.lockWindows = 1;
		if (e.encryption) {
			if (e.encryption.algo)
				t.workbookAlgorithmName = e.encryption.algo;
			if (e.encryption.hash)
				t.workbookHashValue = e.encryption.hash;
			if (e.encryption.salt)
				t.workbookSaltValue = e.encryption.salt;
			if (e.encryption.spin)
				t.workbookSpinCount = e.encryption.spin
		}
		return mt("workbookProtection", null, t)
	}
	var nc = mt("workbook", null, {
			xmlns: wt.main[0],
			"xmlns:r": wt.r
		});
	function ic(e, t) {
		var r = t || {};
		var a = [Ie];
		a[a.length] = nc;
		var n = e.Workbook && (e.Workbook.Names || []).length > 0;
		if (e.Workbook && e.Workbook.Modify)
			a[a.length] = rc(e.Workbook.Modify);
		var i = {
			codeName: "ThisWorkbook"
		};
		if (e.Workbook && e.Workbook.WBProps) {
			Ul.forEach(function (t) {
				if (e.Workbook.WBProps[t[0]] == null)
					return;
				if (e.Workbook.WBProps[t[0]] == t[1])
					return;
				i[t[0]] = e.Workbook.WBProps[t[0]]
			});
			if (e.Workbook.WBProps.CodeName) {
				i.codeName = e.Workbook.WBProps.CodeName;
				delete i.CodeName
			}
		}
		a[a.length] = mt("workbookPr", null, i);
		if (e.Workbook && e.Workbook.Protection)
			a[a.length] = ac(e.Workbook.Protection);
		var s = e.Workbook && e.Workbook.Sheets || [];
		var o = 0;
		if (s && s[0] && !!s[0].Hidden) {
			a[a.length] = "<bookViews>";
			for (o = 0; o != e.SheetNames.length; ++o) {
				if (!s[o])
					break;
				if (!s[o].Hidden)
					break
			}
			if (o == e.SheetNames.length)
				o = 0;
			a[a.length] = '<workbookView firstSheet="' + o + '" activeTab="' + o + '"/>';
			a[a.length] = "</bookViews>"
		}
		a[a.length] = "<sheets>";
		for (o = 0; o != e.SheetNames.length; ++o) {
			var l = {
				name: Ve(e.SheetNames[o].slice(0, 31))
			};
			l.sheetId = "" + (o + 1);
			l["r:id"] = "rId" + (o + 1);
			if (s[o])
				switch (s[o].Hidden) {
				case 1:
					l.state = "hidden";
					break;
				case 2:
					l.state = "veryHidden";
					break;
				}
			a[a.length] = mt("sheet", null, l)
		}
		a[a.length] = "</sheets>";
		if (e.ExternalWB && e.ExternalWB.length) {
			a[a.length] = "<externalReferences>";
			(e.ExternalWB || []).forEach(function (e, t) {
				var n = ga(r.wbrels, -1, "externalLinks/externalLink" + (t + 1) + ".xml", ua.XLINK);
				a[a.length] = '<externalReference r:id="rId' + n + '"/>'
			});
			a[a.length] = "</externalReferences>"
		}
		if (n) {
			a[a.length] = "<definedNames>";
			if (e.Workbook && e.Workbook.Names)
				e.Workbook.Names.forEach(function (e) {
					var t = {
						name: e.Name
					};
					if (e.Comment)
						t.comment = e.Comment;
					if (e.Sheet != null)
						t.localSheetId = "" + e.Sheet;
					if (e.Hidden)
						t.hidden = "1";
					if (!e.Ref)
						return;
					a[a.length] = mt("definedName", Ve(e.Ref), t)
				});
			a[a.length] = "</definedNames>"
		}
		if (r && r.pivots && r.pivots.length > 0) {
			a.push("<pivotCaches>");
			r.pivots.forEach(function (e, t) {
				a.push('<pivotCache cacheId="' + (t + 1) + '" r:id="rId' + e[2] + '"/>')
			});
			a.push("</pivotCaches>")
		}
		if (a.length > 2) {
			a[a.length] = "</workbook>";
			a[1] = a[1].replace("/>", ">")
		}
		return a.join("")
	}
	function sc(e, t, r) {
		if (t.slice(-4) === ".bin")
			return parse_wb_bin(e, r);
		return tc(e, r)
	}
	function oc(e, t, r, a, n, i, s, o) {
		if (t.slice(-4) === ".bin")
			return parse_ws_bin(e, a, r, n, i, s, o);
		return go(e, a, r, n, i, s, o)
	}
	function lc(e, t, r, a, n, i, s, o) {
		if (t.slice(-4) === ".bin")
			return jl(e, a, r, n, i, s, o);
		return Bl(e, a, r, n, i, s, o)
	}
	function cc(e, t, r, a, n, i, s, o) {
		if (t.slice(-4) === ".bin")
			return Ts(e, a, r, n, i, s, o);
		return Es(e, a, r, n, i, s, o)
	}
	function fc(e, t, r, a, n, i, s, o) {
		if (t.slice(-4) === ".bin")
			return Ss(e, a, r, n, i, s, o);
		return As(e, a, r, n, i, s, o)
	}
	function uc(e, t, r, a) {
		if (t.slice(-4) === ".bin")
			return parse_sty_bin(e, r, a);
		return di(e, r, a)
	}
	function hc(e, t, r) {
		return Si(e, r)
	}
	function dc(e, t, r) {
		if (t.slice(-4) === ".bin")
			return parse_sst_bin(e, r);
		return en(e, r)
	}
	function pc(e, t, r) {
		if (t.slice(-4) === ".bin")
			return parse_comments_bin(e, r);
		return bs(e, r)
	}
	function mc(e, t, r) {
		if (t.slice(-4) === ".bin")
			return parse_cc_bin(e, t, r);
		return parse_cc_xml(e, t, r)
	}
	function vc(e, t, r, a) {
		if (r.slice(-4) === ".bin")
			return Ji(e, t, r, a);
		return Zi(e, t, r, a)
	}
	function gc(e, t, r) {
		return (t.slice(-4) === ".bin" ? write_wb_bin : ic)(e, r)
	}
	function bc(e, t, r, a, n) {
		return (t.slice(-4) === ".bin" ? write_ws_bin : Cl)(e, r, a, n)
	}
	function yc(e, t, r, a, n) {
		return (t.slice(-4) === ".bin" ? Wl : Ml)(e, r, a, n)
	}
	function wc(e, t, r) {
		return (t.slice(-4) === ".bin" ? write_sty_bin : mi)(e, r)
	}
	function kc(e, t, r) {
		return (t.slice(-4) === ".bin" ? write_sst_bin : rn)(e, r)
	}
	function xc(e, t, r) {
		return (t.slice(-4) === ".bin" ? write_comments_bin : ws)(e, r)
	}
	var _c = function () {
		var e = {
			centerContinuous: "center",
			justify: "left"
		};
		function t(e) {
			var t = [];
			var r = {};
			var a = 0;
			e.replace(/<(\/?)([^\s?>!\/:]*:|)([^\s?>:\/]+)[^>]*>/gm, function (n, i, s, o, l) {
				var c = Pe(n),
				f = je(c[0]).replace(/[<\/>]/g, "");
				var u = e.slice(a, l).replace(/\s/g, " ");
				if (u.length > 0) {
					t.push({
						t: "s",
						v: u,
						s: r
					});
					r = le(r)
				}
				switch (f.toLowerCase()) {
				case "b":
					if (i != "/")
						r.bold = true;
					else
						delete r.bold;
					break;
				case "i":
					if (i != "/")
						r.italic = true;
					else
						delete r.italic;
					break;
				case "u":
					if (i != "/")
						r.underline = 1;
					else
						delete r.underline;
					break;
				case "s":
					if (i != "/")
						r.strike = true;
					else
						delete r.strike;
					break;
				}
				a = l + n.length;
				return n
			});
			return t
		}
		function r(e, t) {
			var r = t || {};
			if (v != null && r.dense == null)
				r.dense = v;
			var a = r.dense ? [] : {};
			e = e.replace(/<!--.*?-->/g, "");
			var n = e.match(/<table/i);
			if (!n)
				throw new Error("Invalid HTML: could not find <table>");
			var i = e.match(/<\/table/i);
			var s = n.index,
			o = i && i.index || e.length;
			var l = ve(e.slice(s, o), /(:?<tr[^>]*>)/i, "<tr>");
			var c = -1,
			f = 0,
			u = 0,
			h = 0;
			var d = {
				s: {
					r: 1e7,
					c: 1e7
				},
				e: {
					r: 0,
					c: 0
				}
			};
			var p = [];
			for (s = 0; s < l.length; ++s) {
				var m = l[s].trim();
				var g = m.slice(0, 3).toLowerCase();
				if (g == "<tr") {
					++c;
					if (r.sheetRows && r.sheetRows <= c) {
						--c;
						break
					}
					f = 0;
					continue
				}
				if (g != "<td" && g != "<th")
					continue;
				var b = m.split(/<\/t[dh]>/i);
				for (o = 0; o < b.length; ++o) {
					var y = b[o].trim();
					if (!y.match(/<t[dh]/i))
						continue;
					var w = y,
					k = 0;
					while (w.charAt(0) == "<" && (k = w.indexOf(">")) > -1)
						w = w.slice(k + 1);
					for (var x = 0; x < p.length; ++x) {
						var _ = p[x];
						if (_.s.c == f && _.s.r < c && c <= _.e.r) {
							f = _.e.c + 1;
							x = -1
						}
					}
					var C = Pe(y.slice(0, y.indexOf(">")));
					h = C.colspan ? +C.colspan : 1;
					if ((u = +C.rowspan) > 1 || h > 1)
						p.push({
							s: {
								r: c,
								c: f
							},
							e: {
								r: c + (u || 1) - 1,
								c: f + h - 1
							}
						});
					var S = C.t || C["data-t"] || "";
					if (!w.length) {
						f += h;
						continue
					}
					w = ot(w);
					if (d.s.r > c)
						d.s.r = c;
					if (d.e.r < c)
						d.e.r = c;
					if (d.s.c > f)
						d.s.c = f;
					if (d.e.c < f)
						d.e.c = f;
					if (!w.length)
						continue;
					var A = {
						t: "s",
						v: w
					};
					if (r.raw || !w.trim().length || S == "s") {}
					else
						A = pe(w, r);
					if (r.dense) {
						if (!a[c])
							a[c] = [];
						a[c][f] = A
					} else
						a[_r({
								r: c,
								c: f
							})] = A;
					f += h
				}
			}
			a["!ref"] = Sr(d);
			if (p.length)
				a["!merges"] = p;
			return a
		}
		function a(e, t) {
			return Fr(r(e, t), t)
		}
		function n(t, r, a, n, s, o) {
			var l = t["!merges"] || [];
			var c = [];
			var f;
			var u = {
				style: []
			};
			var h = false;
			function d(e, r, a) {
				var i = "",
				s = 0;
				if (f[e])
					switch (f[e].style) {
					case "thin": ;
					case "hair":
						i = "solid";
						s = 1;
						break;
					case "medium":
						i = "solid";
						s = 2;
						break;
					case "thick":
						i = "solid";
						s = 3;
						break;
					case "double":
						i = "double";
						s = 3;
						break;
					case "dotted": ;
					case "dashDotDot":
						i = "dotted";
						s = 1;
						break;
					case "mediumDashDotDot":
						i = "dotted";
						s = 2;
						break;
					case "dashed": ;
					case "dashDot": ;
					case "slantDashDot":
						i = "dashed";
						s = 1;
						break;
					case "mediumDashed": ;
					case "mediumDashDot":
						i = "dashed";
						s = 2;
						break;
					}
				e: if (s == 0) {
					switch (e) {
					case "top":
						--r;
						break;
					case "left":
						--a;
						break;
					case "bottom":
						++r;
						break;
					case "right":
						++a;
						break;
					}
					var o = r >= 0 && a >= 0 ? n.dense ? (t[r] || [])[a] : t[_r({
								r: r,
								c: a
							})] : null;
					if (o) {
						if (o.s && o.s[{
									top: "bottom",
									bottom: "top",
									left: "right",
									right: "left"
								}
								[e]])
							break e;
						if (o.s && o.s.fgColor)
							s = 1
					}
					if (f.fgColor)
						s = 1;
					if (!o && h && s == 0)
						s = 1
				}
				if (s == 0)
					return;
				if (s) {
					u.style.push("border-" + e + "-style:" + (i || "transparent"));
					u.style.push("border-" + e + "-width:" + s + "px");
					if (i == "")
						u.style.push("border-" + e + "-color: transparent");
					else if (f[e].color && f[e].color.rgb)
						u.style.push("border-" + e + "-color:#" + Pi(f[e].color.rgb))
				}
			}
			for (var p = r.s.c; p <= r.e.c; ++p) {
				var m = 0,
				v = 0;
				for (var g = 0; g < l.length; ++g) {
					if (l[g].s.r > a || l[g].s.c > p)
						continue;
					if (l[g].e.r < a || l[g].e.c < p)
						continue;
					if (l[g].s.r < a || l[g].s.c < p) {
						m = -1;
						break
					}
					m = l[g].e.r - l[g].s.r + 1;
					v = l[g].e.c - l[g].s.c + 1;
					break
				}
				if (m < 0)
					continue;
				var b = _r({
						r: a,
						c: p
					});
				var y = n.dense ? (t[a] || [])[p] : t[b];
				if (!y) {
					h = true;
					y = {
						t: "z",
						s: {}
					}
				} else
					h = false;
				var w = y.t == "z" ? "" : y.h || Ye(y.w || (Er(y), y.w) || "");
				u = {
					style: []
				};
				if (f = y.s) {
					var k = 1;
					if (f.valign == "super" || f.valign == "sub") {
						k = .83;
						w = mt("span", w, {
								style: "vertical-align: " + f.valign
							})
					}
					u.style.push("font-weight:" + (f.bold ? 700 : 400));
					if (f.italic)
						u.style.push("font-style: italic");
					if (f.underline || f.strike)
						u.style.push("text-decoration:" + (f.underline && " underline" || "") + (f.strike && " line-through" || ""));
					if (f.color && f.color.rgb)
						u.style.push("color: #" + Pi(f.color.rgb));
					if (f.name)
						u.style.push("font-family:" + f.name + ", sans-serif");
					if (f.sz)
						u.style.push("font-size:" + f.sz * k + "pt");
					if (f.fgColor && f.fgColor.rgb)
						u.style.push("background-color: #" + Pi(f.fgColor.rgb));
					["top", "left"].forEach(function (e) {
						d(e, a, p)
					});
					if (m > 1 || v > 1) {
						var x = _r({
								r: a + m - 1,
								c: p + v - 1
							});
						var _ = n.dense ? (t[a + m - 1] || [])[p + v - 1] : t[x];
						var C = _ && _.s || f;
						var S = f;
						f = C;
						["bottom", "right"].forEach(function (e) {
							d(e, a, p)
						});
						f = S
					} else ["bottom", "right"].forEach(function (e) {
							d(e, a, p)
						});
					if (f.alignment) {
						if (f.alignment.horizontal)
							u.style.push("text-align: " + (e[f.alignment.horizontal] || f.alignment.horizontal));
						else if (y.t == "n")
							u.style.push("text-align: right");
						if (f.alignment.vertical) {
							var A = f.alignment.vertical;
							u.style.push("vertical-align: " + (A == "center" ? "middle" : A))
						}
						if (f.alignment.wrapText)
							u.style.push("white-space: pre-wrap");
						else {
							var T = n.dense ? (t[a] || [])[p + 1] : t[_r({
										r: a,
										c: p + 1
									})];
							if (T && T.t != "z")
								u.style.push("white-space: pre-wrap")
						}
					} else if (y.t == "n")
						u.style.push("text-align: right");
					var E = ((t["!cols"] || [])[p] || {}).wpx;
					if (E == null)
						E = ((t["!sheetFormat"] || {}).col || {}).wpx
				}
				var F = 0;
				if (v <= 1 && m <= 1 && (F = ((t["!cols"] || [])[p] || {}).wpx))
					u.style.push("width: " + F + "px");
				if (t["!condfmt"])
					i(y, a, p, t["!condfmt"], u.style, t);
				if (u.style.length == 0)
					delete u.style;
				else
					u.style = u.style.join(";");
				if (n.css) {
					var D = s.indexOf(u.style);
					if (D == -1) {
						s.push(u.style);
						D = s.length - 1
					}
					delete u.style;
					u["class"] = "sjs" + (o || "") + "-" + D
				}
				if (m > 1)
					u.rowspan = m;
				if (v > 1)
					u.colspan = v;
				u["data-t"] = y && y.t || "z";
				if (n.editable)
					w = '<span contenteditable="true">' + w + "</span>";
				else if (y) {
					if (y.v != null)
						u["data-v"] = y.v;
					if (y.z != null)
						u["data-z"] = y.z
				}
				u.id = (n.id || "sjs") + "-" + b;
				c.push(mt("td", w, u))
			}
			var z = {
				style: []
			},
			O = {};
			if (O = t["!sheetFormat"]) {
				if (O.row) {
					An(O.row);
					if (O.row.hpx) {
						z.style.push(["height", O.row.hpx + "px"]);
						z.height = Math.round(O.row.hpx)
					}
				}
			}
			var R = t["!rows"];
			if (R && R[a]) {
				var I = R[a];
				if (I.hpx) {
					z.style.push(["height", +I.hpx + "px"]);
					z.height = Math.round(I.hpx)
				}
				if (I.hidden)
					z.style.push(["display", "none"])
			}
			var N = [];
			z.style = z.style.reverse().filter(function (e) {
					if (N.indexOf(e[0]) > -1)
						return false;
					N.push(e[0]);
					return true
				}).map(function (e) {
					return e[0] + ":" + e[1]
				});
			if (z.style.length == 0)
				delete z.style;
			else
				z.style = z.style.join(";");
			return mt("tr", c.join(""), z)
		}
		function i(e, t, r, a, n, i) {
			a.forEach(function (a) {
				if (!a._ref)
					a._ref = typeof a.ref == "string" ? Cr(a.ref) : a.ref;
				if (a._ref.s.c > r || a._ref.e.c < r || a._ref.s.r > t || a._ref.e.r < t)
					return;
				switch (a.t) {
				case "scale":
					if (e.t != "n")
						return;
					var s = "";
					if (a._min == null) {
						a._values = [];
						for (var o = a._ref.s.r; o <= a._ref.e.r; ++o)
							for (var l = a._ref.s.c; l <= a._ref.e.c; ++l) {
								var c = Array.isArray(i) ? (i[o] || [])[l] : i[_r({
											r: o,
											c: l
										})];
								if (c && c.t == "n")
									a._values.push(c.v)
							}
						a._values.sort(function (e, t) {
							return e - t
						});
						a._min = a._values[0];
						a._max = a._values.slice(-1)[0];
						a._band = a._max - a._min;
						if (a.cmid) {
							switch (a.cmid.t) {
							case "num":
								a._mid = a.cmid.v;
								break;
							case "percent":
								a._mid = a.cmid.v / 100 * a._band + a._min;
								break;
							case "percentile":
								a._mid = ge(a._values, a.cmid.v);
								break;
							}
							a._bandh = a._max - a._mid;
							a._bandl = a._mid - a._min
						}
					}
					if (!a.cmid) {
						s = Bn(a.cmin.color, a.cmax.color, (e.v - a._min) / a._band)
					} else {
						s = e.v >= a._mid ? Bn(a.cmid.color, a.cmax.color, (e.v - a._mid) / a._bandh) : Bn(a.cmin.color, a.cmid.color, (e.v - a._min) / a._bandl)
					}
					if (s)
						n.push("background-color: #" + s);
					break;
				}
			})
		}
		function s(e, t) {
			var r = {
				span: t || 1,
				style: ""
			};
			var a = [];
			if (e) {
				if (e.wpx) {
					r.width = Math.round(e.wpx * 4 / 3);
					a.push("width:" + (e.wpx || 0) + "px")
				}
			}
			if (a.length > 0)
				r.style = a.join(";");
			return mt("col", null, r)
		}
		function o(e, t, r) {
			var a = {
				border: 0,
				cellpadding: 0,
				cellspacing: 0,
				style: ["border-collapse:collapse", "table-layout:fixed"].join(";")
			};
			if (r && r.id)
				a.id = r.id;
			var n = e["!cols"];
			var i = e["!sheetFormat"];
			if (e && n) {
				var o = 0,
				l = 0;
				for (var c = t.s.c; c <= t.e.c; ++c) {
					var f = n[c];
					if (f && f.wpx)
						l = f.wpx;
					else if (i && i.col && i.col.wpx)
						l = i.col.wpx;
					else
						l = 53;
					o += l
				}
				a.style += ";width:" + o + "px"
			}
			var u = ["<table" + pt(a) + ">"];
			u.push("<style>td { padding-top: 1px; padding-right:1px; padding-left:1px; text-align:general; vertical-align:bottom; border:1px solid; border-color:" + (r && r.gridcolor ? r.gridcolor : be(e["!gridlines"]) ? "transparent" : "black") + "; white-space:nowrap; overflow: hidden; text-overflow:ellipsis}</style>");
			var h;
			u.push('<colgroup span="' + (t.e.c - t.s.c + 1) + '">');
			if (n) {
				for (var d = t.s.c; d < Math.min(n.length, t.e.c + 1); ++d) {
					h = n[d];
					if (!h && i && i.col)
						h = i.col;
					if (!h)
						h = {
							wpx: 53
						};
					u.push(s(h, 1))
				}
				if (t.e.c - t.s.c + 1 > n.length) {
					h = null;
					if (i && i.col)
						h = i.col;
					if (!h)
						h = {
							wpx: 53
						};
					u.push(s(h, t.e.c - t.s.c + 1 - n.length))
				}
			} else {
				h = null;
				if (i && i.col)
					h = i.col;
				if (!h)
					h = {
						wpx: 53
					};
				u.push(s(h, t.e.c - t.s.c + 1))
			}
			u.push("</colgroup>");
			return u.join("")
		}
		var l = '<html><head><meta charset="utf-8"/><title>SheetJS Table Export</title></head><body>';
		var c = "</body></html>";
		function f(e, t) {
			var r = t || {};
			var a = r.header != null ? r.header : l;
			var i = r.footer != null ? r.footer : c;
			var s = [a, ""];
			var f = [],
			u = (new Date).valueOf();
			if (!e)
				e = {};
			if (!e["!ref"])
				e["!ref"] = "A1:A1";
			var h = Cr(e["!ref"]);
			r.dense = Array.isArray(e);
			if (r.skipend) {
				var d = h.e.r;
				e: for (; d >= h.s.r; --d) {
					for (var p = h.e.c; p >= h.s.c; --p) {
						if (((r.dense ? (e[d] || [])[p] : e[_r({
											r: d,
											c: p
										})]) || {}).v != null)
							break e
					}
				}
				h.e.r = d;
				var m = h.e.c;
				e: for (; m >= h.s.c; --m) {
					for (var v = h.e.r; v >= h.s.r; --v) {
						if (((r.dense ? (e[v] || [])[m] : e[_r({
											r: v,
											c: m
										})]) || {}).v != null)
							break e
					}
				}
				h.e.c = m
			}
			s.push(o(e, h, r));
			for (var g = h.s.r; g <= h.e.r; ++g)
				s.push(n(e, h, g, r, f, u));
			s.push("</table>" + i);
			if (r.css)
				s[1] = "<style>\n" + f.map(function (e, t) {
						return ".sjs" + u + "-" + t + " {" + e + "}"
					}).join("\n") + "</style>";
			return s.join("")
		}
		return {
			to_workbook: a,
			to_sheet: r,
			_row: n,
			BEGIN: l,
			END: c,
			_preamble: o,
			html_to_rs: t,
			from_sheet: f
		}
	}
	();
	function Cc(e, t, r) {
		var a = {};
		if (typeof getComputedStyle == "undefined")
			return a;
		var n = getComputedStyle(e);
		if (n["font-weight"] == 700 || n["font-weight"] == "bold")
			a.bold = true;
		if ((n["font-style"] || "").match(/italic/))
			a.italic = true;
		if ((n["text-decoration"] || "").match(/underline/))
			a.underline = 1;
		if ((n["text-decoration"] || "").match(/line-through/))
			a.strike = 1;
		if (parseInt(n["font-size"]))
			a.sz = parseFloat(n["font-size"]) * (n["font-size"].match(/px/) ? 3 / 4 : 1);
		if (n["font-family"])
			a.name = n["font-family"].split(",")[0].replace(/\s*"\s*/g, "");
		if (n["color"]) {
			var i = Dn(n["color"].toLowerCase(), true);
			if (i >= 0)
				a.color = {
					rgb: i
				}
		}
		if (n["text-transform"])
			a.text_transform = n["text-transform"].toLowerCase();
		if ((n["text-shadow"] || "none") != "none")
			a.shadow = true;
		switch (n["text-align"]) {
		case "center":
			a.alignment = {
				horizontal: "center"
			};
			break;
		case "right":
			a.alignment = {
				horizontal: "right"
			};
			break;
		case "left":
			a.alignment = {
				horizontal: "left"
			};
			break;
		case "justify":
			a.alignment = {
				horizontal: "justify"
			};
			break;
		}
		switch (n["vertical-align"]) {
		case "top": ;
		case "middle": ;
		case "bottom":
			if (!a.alignment)
				a.alignment = {};
			a.alignment.vertical = n["vertical-align"];
			if (a.alignment.vertical == "middle")
				a.alignment.vertical = "center";
			break;
		case "sub": ;
		case "super":
			a.valign = n["vertical-align"];
			if (a.sz)
				a.sz /= .83;
			break;
		}
		var s = t && getComputedStyle(t);
		if (s) {
			if (a.alignment && s["box-sizing"] == "border-box") {
				switch (a.alignment.horizontal) {
				case "justify":
					break;
				}
			}
			if (r && t)
				["left", "right", "top", "bottom"].forEach(function (e) {
					var t = e.charAt(0).toUpperCase() + e.slice(1);
					var r = s["border-" + e + "-style"];
					if (r == "none" || !r)
						r = s["border" + t + "Style"];
					if (r == "none" || !r)
						return;
					var n = parseInt(s["border-" + e + "-width"] || s["border" + t + "Width"], 10);
					var i = "thin";
					if (n > 0) {
						switch (r) {
						case "double":
							i = "double";
							break;
						case "dashed":
							i = n >= 2 ? "mediumDashed" : "dashed";
							break;
						case "dotted":
							i = n >= 2 ? "mediumDashDotDot" : "dotted";
							break;
						case "solid":
							i = n >= 3 ? "thick" : n >= 2 ? "medium" : "thin";
							break;
						}
						a[e] = {
							style: i
						};
						if (s["border-" + e + "-color"] || s["border" + t + "Color"]) {
							var o = Dn((s["border-" + e + "-color"] || s["border" + t + "Color"]).toLowerCase(), true);
							if (o >= 0)
								a[e].color = {
									rgb: o
								}
						}
					}
				})
		}
		return a
	}
	function Sc(e, t, r, a) {
		var n = {
			t: "s",
			v: t
		};
		if (e) {
			var r = e.getAttribute("data-t") || e.getAttribute("t");
			var i = e.getAttribute("data-z") || e.getAttribute("z");
			var s = e.getAttribute("data-v") || e.getAttribute("v");
			if (r != null && s != null) {
				n.t = r;
				n.v = s;
				if (i != null)
					n.z = i;
				return n
			}
		}
		if (t != null) {
			if (t.length == 0)
				n.t = r || "z";
			else if (a.raw || !t.trim().length || r == "s") {}
			else
				n = pe(t, a)
		}
		return n
	}
	function Ac(e, t, r) {
		var a = e.childNodes;
		if (e.nodeType == 1)
			switch (e.tagName.toLowerCase()) {
			case "p":
				if (t.length > 0)
					t.push({
						t: "t",
						v: "\n",
						s: r
					});
				break;
			}
		if (a.length > 0) {
			var n = Cc(e, null, false);
			if (r) {
				if (r.underline)
					n.underline = r.underline;
				if (r.strike)
					n.strike = r.strike
			}
			for (var i = 0; i < a.length; ++i) {
				try {
					if (a[i].getAttribute("aria-hidden"))
						continue
				} catch (s) {}
				Ac(a[i], t, n)
			}
			delete n.text_transform
		} else if (e.nodeType == 3) {
			var o = {
				t: "t",
				v: e.nodeValue.replace(/^[\n ]+/, " ").replace(/[\n ]+$/, " "),
				s: r
			};
			switch (r.text_transform) {
			case "uppercase":
				o.v = o.v.toUpperCase();
				break;
			case "lowercase":
				o.v = o.v.toLowerCase();
				break;
			}
			if (t.length > 0 || o.v && o.v != " ")
				t.push(o)
		} else if (e.nodeType == 1)
			switch (e.tagName.toLowerCase()) {
			case "br":
				t.push({
					t: "t",
					v: "\n",
					s: r
				});
				break;
			}
	}
	function Tc(e, t, r, a, n) {
		var i = e.innerHTML;
		var s;
		if (typeof getComputedStyle !== "undefined") {
			s = getComputedStyle(e);
			if ((s["white-space"] || "").match(/pre/))
				i = i.replace(/\n/g, "<br/>");
			switch ((s["text-transform"] || "").toLowerCase()) {
			case "uppercase":
				i = i.toUpperCase();
				break;
			case "lowercase":
				i = i.toLowerCase();
				break;
			}
		}
		var o = Sc(e, ot(i), r, n);
		if (typeof getComputedStyle !== "undefined") {
			o.s = Cc(e, t, n.borders);
			delete o.s.text_transform;
			if (e.childNodes.length > 1 || e.childNodes.length == 1 && e.childNodes[0].nodeType != 3) {
				Ac(e, o.R = [], null);
				if (o.R && o.R[o.R.length - 1] && o.R[o.R.length - 1].v == "\n")
					o.R.length--;
				switch ((s["text-transform"] || "").toLowerCase()) {
				case "uppercase":
					o.R.forEach(function (e) {
						e.v = e.v.toUpperCase()
					});
					break;
				case "lowercase":
					o.R.forEach(function (e) {
						e.v = e.v.toLowerCase()
					});
					break;
				}
			}
		}
		if (o.t == "s") {
			var l = o.v.match(/\n/);
			if (!l && o.R)
				o.R.forEach(function (e) {
					if (typeof e.v == "string" && e.v.match(/\n/))
						l = true
				});
			if (o.t == "s" && l) {
				if (!o.s)
					o.s = {};
				if (!o.s.alignment)
					o.s.alignment = {};
				o.s.alignment.wrapText = true
			}
		}
		return o
	}
	function Ec(e, t, r) {
		var a;
		try {
			if (typeof getComputedStyle != "undefined")
				a = getComputedStyle;
			else if (t.ownerDocument.defaultView && typeof t.ownerDocument.defaultView.getComputedStyle === "function")
				a = t.ownerDocument.defaultView.getComputedStyle
		} catch (n) {}
		var i = r || {};
		if (v != null)
			i.dense = v;
		var s = 0,
		o = 0;
		if (i.origin != null) {
			if (typeof i.origin == "number")
				s = i.origin;
			else {
				var l = typeof i.origin == "string" ? xr(i.origin) : i.origin;
				s = l.r;
				o = l.c
			}
		}
		var c = t.getElementsByTagName("tr");
		var f = Math.min(i.sheetRows || 1e7, c.length);
		var u = {
			s: {
				r: 0,
				c: 0
			},
			e: {
				r: s,
				c: o
			}
		};
		if (e["!ref"]) {
			var h = Cr(e["!ref"]);
			u.s.r = Math.min(u.s.r, h.s.r);
			u.s.c = Math.min(u.s.c, h.s.c);
			u.e.r = Math.max(u.e.r, h.e.r);
			u.e.c = Math.max(u.e.c, h.e.c);
			if (s == -1)
				u.e.r = s = h.e.r + 1
		}
		var d = [],
		p = 0;
		var m = e["!rows"] || (e["!rows"] = []);
		var g = 0,
		b = 0,
		y = 0,
		w = 0,
		k = 0,
		x = 0;
		if (!e["!cols"])
			e["!cols"] = [];
		for (; g < c.length && b < f; ++g) {
			var _ = c[g];
			var C = _.parentElement;
			while (C.tagName.toUpperCase() != "TABLE")
				C = C.parentElement;
			if (C != t)
				continue;
			e: if (typeof a !== "undefined") {
				var S = a(_);
				if (S == null)
					break e;
				if (!S.style)
					S.style = {};
				if (i.display && (S.display || S.style.display) == "none")
					continue;
				if ((S.display || S.style.display) == "none")
					(m[b] || (m[b] = {})).hidden = true
			}
			var A = _.children;
			for (y = w = 0; y < A.length; ++y) {
				var T = A[y];
				var E = null;
				if (typeof a !== "undefined") {
					if (E == null)
						E = a(T);
					if (!E.style)
						E.style = {};
					if (i.display && E != null && (E.display || E.style.display) == "none")
						continue
				}
				x = +T.getAttribute("colspan") || 1;
				for (p = 0; p < d.length; ++p) {
					var F = d[p];
					if (F.s.c == w + o && F.s.r < b + s && b + s <= F.e.r) {
						w = F.e.c + 1 - o;
						p = -1
					}
				}
				if ((k = +T.getAttribute("rowspan") || 1) > 1 || x > 1)
					d.push({
						s: {
							r: b + s,
							c: w + o
						},
						e: {
							r: b + s + (k || 1) - 1,
							c: w + o + (x || 1) - 1
						}
					});
				var D = T.getAttribute("t") || "";
				var z = T.getAttribute("bgcolor");
				e: if (typeof a !== "undefined") {
					if (E == null)
						E = a(T);
					if (E == null)
						break e;
					if (!E.style)
						E.style = {};
					if (x == 1 && E.width) {
						e["!cols"][w + o] = e["!cols"][w + o] || {};
						if (E.width.match(/px/))
							e["!cols"][w + o].wpx = Math.max(parseInt(E.width, 10) + 5, e["!cols"][w + o].wpx || 0);
						else if (E.width.match(/pt/))
							e["!cols"][w + o].wpx = Math.max(parseInt(E.width, 10) * 4 / 3 + 5, e["!cols"][w + o].wpx || 0)
					}
					if (k <= 1) {
						if (!m[b + s])
							m[b + s] = {};
						var O = E.height;
						O = O.match(/pt/) ? Cn(parseInt(O, 10)) : parseInt(O, 10);
						if (O > (m[b + s].hpx || Cn(m[b + s].hpt) || 0)) {
							delete m[b + s].hpt;
							m[b + s].hpx = O
						}
					}
				}
				var R = T;
				if (T.firstElementChild && T.children.length == 1 && T.firstElementChild.nodeName.toLowerCase() == "span") {
					var I = 0,
					N = T.childNodes;
					for (var L = 0; L < N.length; ++L)
						if (N[L].nodeType == 3)
							++I;
					if (I == 0)
						T = T.firstElementChild
				}
				var B = Tc(T, R, D, d, i);
				e: if (E) {
					var M = a(T);
					if (M && !M.style)
						M.style = {};
					if (M && M["background-color"] || E["background-color"]) {
						if (!B.s)
							B.s = {};
						if (!B.s.fgColor)
							try {
								var P = M && M["background-color"] || E["background-color"];
								if (P.match(/rgba[(]\s*0.*[)]/i))
									P = E["background-color"];
								var j = Dn(P.toLowerCase(), true);
								if (j >= 0)
									B.s.fgColor = {
										rgb: j
									}
							} catch (n) {}
					}
					switch (E["vertical-align"]) {
					case "middle": ;
					case "baseline":
						if (!B.s)
							B.s = {};
						if (!B.s.alignment)
							B.s.alignment = {};
						B.s.alignment.vertical = "center";
						break;
					}
				}
				if (z) {
					if (!B.s)
						B.s = {};
					if (!B.s.fgColor)
						try {
							var W = Dn(z.toLowerCase(), true);
							if (W >= 0)
								B.s.fgColor = {
									rgb: W
								}
						} catch (n) {}
				}
				if (i.dense) {
					if (!e[b + s])
						e[b + s] = [];
					e[b + s][w + o] = B
				} else
					e[_r({
							c: w + o,
							r: b + s
						})] = B;
				if (k > 1 || x > 1)
					for (var U = b; U < b + k; ++U)
						for (var $ = w; $ < w + x; ++$) {
							if (b == U && w == $)
								continue;
							if (i.dense) {
								if (!e[U + s])
									e[U + s] = [];
								e[U + s][$ + o] = {
									t: "z",
									s: le(B.s || {})
								}
							} else
								e[_r({
										c: $ + o,
										r: U + s
									})] = {
									t: "z",
									s: le(B.s || {})
								}
						}
				if (u.e.c < w + o)
					u.e.c = w + o;
				w += x
			}
			++b
		}
		if (d.length)
			e["!merges"] = (e["!merges"] || []).concat(d);
		u.e.r = Math.max(u.e.r, b - 1 + s);
		e["!ref"] = Sr(u);
		if (b >= f)
			e["!fullref"] = Sr((u.e.r = c.length - g + b - 1 + s, u));
		if (i.borders) {
			for (b = u.s.r; b <= u.e.r; ++b) {
				for (w = u.s.c; w <= u.e.c; ++w) {
					if (i.dense);
					else {
						var H = e[_r({
									r: b,
									c: w
								})];
						if (!H || !H.s)
							continue;
						if (b > 0) {
							var X = e[_r({
										r: b - 1,
										c: w
									})];
							if (X && X.s && X.s.bottom)
								delete H.s.top
						}
						if (w > 0) {
							var V = e[_r({
										r: b,
										c: w - 1
									})];
							if (V && V.s && V.s.bottom)
								delete H.s.left
						}
					}
				}
			}
		}
		return e
	}
	function Fc(e, t) {
		var r = t || {};
		var a = r.dense ? [] : {};
		return Ec(a, e, t)
	}
	function Dc(e, t) {
		return Fr(Fc(e, t), t)
	}
	var zc = function () {
		var e = function (e, t, r) {
			var a = e.replace(/[\t\r\n]/g, " ").trim().replace(/ +/g, " ").replace(/<text:s\/>/g, " ").replace(/<text:s text:c="(\d+)"\/>/g, function (e, t) {
					return Array(parseInt(t, 10) + 1).join(" ")
				}).replace(/<text:tab[^>]*\/>/g, "\t").replace(/<text:line-break\/>/g, "\n");
			var n = $e(a.replace(/<[^>]*>/g, ""));
			var i = [],
			s = 0;
			a.replace(/(<text:span.*?>)(.*?)<[\/]text:span>/g, function (e, t, n, o) {
				if (o != s)
					i.push({
						t: "s",
						v: $e(a.slice(s, o))
					});
				var l = {
					t: "s",
					v: $e(n)
				};
				var c = Pe(t)["style-name"];
				if (c && r[c])
					l.s = le(r[c]);
				i.push(l);
				s = o + e.length;
				return ""
			});
			if (s < a.length)
				i.push({
					t: "s",
					v: $e(a.slice(s))
				});
			return [n, i]
		};
		var t = {
			day: ["d", "dd"],
			month: ["m", "mm"],
			year: ["y", "yy"],
			hours: ["h", "hh"],
			minutes: ["m", "mm"],
			seconds: ["s", "ss"],
			"am-pm": ["A/P", "AM/PM"],
			"day-of-week": ["ddd", "dddd"],
			era: ["e", "ee"],
			quarter: ["\\Qm", 'm\\"th quarter"']
		};
		var r = function (e, t) {
			var r = Pe(e.slice(0, e.indexOf(">"))),
			a = e.slice(e.indexOf(">") + 1);
			var n = {
				name: r.name,
				family: r.family
			};
			[["parent", "parent-style-name"], ["dataname", "data-style-name"], ["mpname", "master-page-name"]].forEach(function (e) {
				if (r[e[1]])
					n[e[0]] = r[e[1]]
			});
			var i = {};
			a.replace(Le, function (e) {
				var t = Pe(e);
				switch (t[0]) {
				case "<style:text-properties":
					if (t["font-weight"])
						i.bold =  + !!(t["font-weight"] == "bold" || t["font-weight"] == "700");
					if (t["font-style"] == "italic" || t["font-style"] == "oblique")
						i.italic = 1;
					if ((t["text-underline-style"] || "none") != "none")
						i.underline = t["text-underline-type"] == "double" ? 2 : 1;
					else if (t["text-underline-style"] || t["text-underline-type"] == "none")
						i.underline = 0;
					if ((t["font-size"] || "").match(/pt$/))
						i.sz = +t["font-size"].replace("pt", "");
					if ((t["text-line-through-style"] || "none") != "none")
						i.strike = 1;
					if (t["font-name"])
						i.name = t["font-name"];
					if (t["color"]) {
						var r = Dn(t["color"], true);
						if (r >= 0)
							i.color = r
					}
					switch (t["text-position"]) {
					case "super":
						i.valign = "super";
						break;
					case "sub":
						i.valign = "sub";
						break;
					default:
						if ((t["text-position"] || "").match(/%/))
							i.valign = t["text-position"].charAt(0) == "-" ? "sub" : "super";
					}
					if ((t["text-shadow"] || "none") != "none")
						i.shadow = 1;
					break;
				case "<style:table-cell-properties":
					break;
				case "<style:table-column-properties":
					break;
				case "<style:table-properties":
					break;
				case "<style:table-row-properties":
					break;
				case "</style:style>":
					break;
				default: ;
				}
				return ""
			});
			t[r.name] = i
		};
		return function a(n, i) {
			var s = i || {};
			if (v != null && s.dense == null)
				s.dense = v;
			var o = xlml_normalize(n);
			var l = [],
			c;
			var f;
			var u = {
				name: ""
			},
			h = "",
			d = 0;
			var p;
			var m;
			var g = {},
			b = [];
			var y = s.dense ? [] : {};
			var w,
			k;
			var x = {
				value: ""
			};
			var _ = "",
			C = 0,
			S;
			var A = [];
			var T = -1,
			E = -1,
			F = {
				s: {
					r: 1e6,
					c: 1e7
				},
				e: {
					r: 0,
					c: 0
				}
			};
			var D = 0;
			var z = {};
			var O = [],
			R = {},
			I = 0,
			N = 0;
			var L = [],
			B = 1,
			M = 1;
			var P = [];
			var j = {
				Names: []
			};
			var W = {};
			var U = ["", ""];
			var $ = [],
			H = {};
			var X = {},
			V = 0;
			var G = "",
			Z = 0;
			var q = false,
			Y = false;
			var K = 0;
			xlmlregex.lastIndex = 0;
			o = o.replace(/<!--([\s\S]*?)-->/gm, "").replace(/<!DOCTYPE[^\[]*\[[^\]]*\]>/gm, "");
			while (w = xlmlregex.exec(o))
				switch (w[3] = w[3].replace(/_.*$/, "")) {
				case "table": ;
				case "工作表":
					if (w[1] === "/") {
						if (F.e.c >= F.s.c && F.e.r >= F.s.r)
							y["!ref"] = Sr(F);
						else
							y["!ref"] = "A1:A1";
						if (s.sheetRows > 0 && s.sheetRows <= F.e.r) {
							y["!fullref"] = y["!ref"];
							F.e.r = s.sheetRows - 1;
							y["!ref"] = Sr(F)
						}
						if (O.length)
							y["!merges"] = O;
						if (L.length)
							y["!rows"] = L;
						p.name = p["名称"] || p.name;
						if (typeof JSON !== "undefined")
							JSON.stringify(p);
						b.push(p.name);
						g[p.name] = y;
						Y = false
					} else if (w[0].charAt(w[0].length - 2) !== "/") {
						p = Pe(w[0], false);
						T = E = -1;
						F.s.r = F.s.c = 1e7;
						F.e.r = F.e.c = 0;
						y = s.dense ? [] : {};
						O = [];
						L = [];
						Y = true
					}
					break;
				case "table-row-group":
					if (w[1] === "/")
						--D;
					else ++D;
					break;
				case "table-row": ;
				case "行":
					if (w[1] === "/") {
						T += B;
						B = 1;
						break
					}
					m = Pe(w[0], false);
					if (m["行号"])
						T = m["行号"] - 1;
					else if (T == -1)
						T = 0;
					B = +m["number-rows-repeated"] || 1;
					if (B < 10)
						for (K = 0; K < B; ++K)
							if (D > 0)
								L[T + K] = {
									level: D
								};
					E = -1;
					break;
				case "covered-table-cell":
					if (w[1] !== "/")
						++E;
					if (s.sheetStubs) {
						if (s.dense) {
							if (!y[T])
								y[T] = [];
							y[T][E] = {
								t: "z"
							}
						} else
							y[_r({
									r: T,
									c: E
								})] = {
								t: "z"
							}
					}
					_ = "";
					A = [];
					break;
				case "table-cell": ;
				case "数据":
					if (w[0].charAt(w[0].length - 2) === "/") {
						++E;
						x = Pe(w[0], false);
						M = parseInt(x["number-columns-repeated"] || "1", 10);
						k = {
							t: "z",
							v: null
						};
						if (x.formula && s.cellFormula != false)
							k.f = ods_to_csf_formula($e(x.formula));
						if ((x["数据类型"] || x["value-type"]) == "string") {
							k.t = "s";
							k.v = $e(x["string-value"] || "");
							if (s.dense) {
								if (!y[T])
									y[T] = [];
								y[T][E] = k
							} else {
								y[_r({
										r: T,
										c: E
									})] = k
							}
						}
						E += M - 1
					} else if (w[1] !== "/") {
						++E;
						M = 1;
						var Q = B ? T + B - 1 : T;
						if (E > F.e.c)
							F.e.c = E;
						if (E < F.s.c)
							F.s.c = E;
						if (T < F.s.r)
							F.s.r = T;
						if (Q > F.e.r)
							F.e.r = Q;
						x = Pe(w[0], false);
						$ = [];
						H = {};
						k = {
							t: x["数据类型"] || x["value-type"],
							v: null
						};
						if (s.cellFormula) {
							if (x.formula)
								x.formula = $e(x.formula);
							if (x["number-matrix-columns-spanned"] && x["number-matrix-rows-spanned"]) {
								I = parseInt(x["number-matrix-rows-spanned"], 10) || 0;
								N = parseInt(x["number-matrix-columns-spanned"], 10) || 0;
								R = {
									s: {
										r: T,
										c: E
									},
									e: {
										r: T + I - 1,
										c: E + N - 1
									}
								};
								k.F = Sr(R);
								P.push([R, k.F])
							}
							if (x.formula)
								k.f = ods_to_csf_formula(x.formula);
							else
								for (K = 0; K < P.length; ++K)
									if (T >= P[K][0].s.r && T <= P[K][0].e.r)
										if (E >= P[K][0].s.c && E <= P[K][0].e.c)
											k.F = P[K][1]
						}
						if (x["number-columns-spanned"] || x["number-rows-spanned"]) {
							I = parseInt(x["number-rows-spanned"], 10) || 0;
							N = parseInt(x["number-columns-spanned"], 10) || 0;
							R = {
								s: {
									r: T,
									c: E
								},
								e: {
									r: T + I - 1,
									c: E + N - 1
								}
							};
							O.push(R)
						}
						if (x["number-columns-repeated"])
							M = parseInt(x["number-columns-repeated"], 10);
						switch (k.t) {
						case "boolean":
							k.t = "b";
							k.v = et(x["boolean-value"]);
							break;
						case "float":
							k.t = "n";
							k.v = parseFloat(x.value);
							break;
						case "percentage":
							k.t = "n";
							k.v = parseFloat(x.value);
							break;
						case "currency":
							k.t = "n";
							k.v = parseFloat(x.value);
							break;
						case "date":
							k.t = "d";
							k.v = se(x["date-value"]);
							if (!s.cellDates) {
								k.t = "n";
								k.v = J(k.v)
							}
							k.z = "m/d/yy";
							break;
						case "time":
							k.t = "n";
							k.v = ae(x["time-value"]) / 86400;
							break;
						case "number":
							k.t = "n";
							k.v = parseFloat(x["数据数值"]);
							break;
						default:
							if (k.t === "string" || k.t === "text" || !k.t) {
								k.t = "s";
								if (x["string-value"] != null) {
									_ = $e(x["string-value"]);
									A = []
								}
							} else
								throw new Error("Unsupported value type " + k.t);
						}
					} else {
						q = false;
						if (k.t === "s") {
							k.v = _ || "";
							if (A.length)
								k.R = A;
							q = C == 0
						}
						if (W.Target)
							k.l = W;
						if ($.length > 0) {
							k.c = $;
							$ = []
						}
						if (_ && s.cellText !== false)
							k.w = _;
						if (q) {
							k.t = "z";
							delete k.v
						}
						if (s.cellHTML)
							k.h = k.R ? Ha(k.R) : Ye("" + k.v);
						if (!q || s.sheetStubs) {
							if (!(s.sheetRows && s.sheetRows <= T)) {
								for (var ee = 0; ee < B; ++ee) {
									M = parseInt(x["number-columns-repeated"] || "1", 10);
									if (s.dense) {
										if (!y[T + ee])
											y[T + ee] = [];
										y[T + ee][E] = ee == 0 ? k : le(k);
										while (--M > 0)
											y[T + ee][E + M] = le(k)
									} else {
										y[_r({
												r: T + ee,
												c: E
											})] = k;
										while (--M > 0)
											y[_r({
													r: T + ee,
													c: E + M
												})] = le(k)
									}
									if (F.e.c <= E)
										F.e.c = E
								}
							}
						}
						M = parseInt(x["number-columns-repeated"] || "1", 10);
						E += M - 1;
						M = 0;
						k = {};
						_ = "";
						A = []
					}
					W = {};
					break;
				case "document": ;
				case "document-content": ;
				case "电子表格文档": ;
				case "spreadsheet": ;
				case "主体": ;
				case "scripts": ;
				case "styles": ;
				case "font-face-decls": ;
				case "master-styles":
					if (w[1] === "/") {
						if ((c = l.pop())[0] !== w[3])
							throw "Bad state: " + c
					} else if (w[0].charAt(w[0].length - 2) !== "/")
						l.push([w[3], true]);
					break;
				case "annotation":
					if (w[1] === "/") {
						if ((c = l.pop())[0] !== w[3])
							throw "Bad state: " + c;
						H.t = _;
						if (A.length)
							H.R = A;
						H.a = G;
						$.push(H)
					} else if (w[0].charAt(w[0].length - 2) !== "/") {
						l.push([w[3], false])
					}
					G = "";
					Z = 0;
					_ = "";
					C = 0;
					A = [];
					break;
				case "creator":
					if (w[1] === "/") {
						G = o.slice(Z, w.index)
					} else
						Z = w.index + w[0].length;
					break;
				case "meta": ;
				case "元数据": ;
				case "settings": ;
				case "config-item-set": ;
				case "config-item-map-indexed": ;
				case "config-item-map-entry": ;
				case "config-item-map-named": ;
				case "shapes": ;
				case "frame": ;
				case "text-box": ;
				case "image": ;
				case "data-pilot-tables": ;
				case "list-style": ;
				case "form": ;
				case "dde-links": ;
				case "event-listeners": ;
				case "chart":
					if (w[1] === "/") {
						if ((c = l.pop())[0] !== w[3])
							throw "Bad state: " + c
					} else if (w[0].charAt(w[0].length - 2) !== "/")
						l.push([w[3], false]);
					_ = "";
					C = 0;
					A = [];
					break;
				case "scientific-number":
					break;
				case "currency-symbol":
					break;
				case "currency-style":
					break;
				case "number-style": ;
				case "percentage-style": ;
				case "date-style": ;
				case "time-style":
					if (w[1] === "/") {
						z[u.name] = h;
						if ((c = l.pop())[0] !== w[3])
							throw "Bad state: " + c
					} else if (w[0].charAt(w[0].length - 2) !== "/") {
						h = "";
						u = Pe(w[0], false);
						l.push([w[3], true])
					}
					break;
				case "script":
					break;
				case "libraries":
					break;
				case "automatic-styles":
					break;
				case "default-style": ;
				case "page-layout":
					break;
				case "style":
					if (w[0].slice(-2) === "/>")
						r(w[0], X);
					else if (w[1] == "/")
						r(o.slice(V, w.index + w[0].length), X);
					else
						V = w.index;
					break;
				case "map":
					break;
				case "font-face":
					break;
				case "paragraph-properties":
					break;
				case "table-properties":
					break;
				case "table-column-properties":
					break;
				case "table-row-properties":
					break;
				case "table-cell-properties":
					break;
				case "number":
					switch (l[l.length - 1][0]) {
					case "time-style": ;
					case "date-style":
						f = Pe(w[0], false);
						h += t[w[3]][f.style === "long" ? 1 : 0];
						break;
					}
					break;
				case "fraction":
					break;
				case "day": ;
				case "month": ;
				case "year": ;
				case "era": ;
				case "day-of-week": ;
				case "week-of-year": ;
				case "quarter": ;
				case "hours": ;
				case "minutes": ;
				case "seconds": ;
				case "am-pm":
					switch (l[l.length - 1][0]) {
					case "time-style": ;
					case "date-style":
						f = Pe(w[0], false);
						h += t[w[3]][f.style === "long" ? 1 : 0];
						break;
					}
					break;
				case "boolean-style":
					break;
				case "boolean":
					break;
				case "text-style":
					break;
				case "text":
					if (w[0].slice(-2) === "/>")
						break;
					else if (w[1] === "/")
						switch (l[l.length - 1][0]) {
						case "number-style": ;
						case "date-style": ;
						case "time-style":
							h += o.slice(d, w.index);
							break;
						}
					else
						d = w.index + w[0].length;
					break;
				case "named-range":
					f = Pe(w[0], false);
					U = ods_to_csf_3D(f["cell-range-address"]);
					var te = {
						Name: f.name,
						Ref: U[0] + "!" + U[1]
					};
					if (Y)
						te.Sheet = b.length;
					j.Names.push(te);
					break;
				case "text-content":
					break;
				case "text-properties":
					break;
				case "embedded-text":
					break;
				case "body": ;
				case "电子表格":
					break;
				case "forms":
					break;
				case "table-column":
					break;
				case "table-header-rows":
					break;
				case "table-rows":
					break;
				case "table-column-group":
					break;
				case "table-header-columns":
					break;
				case "table-columns":
					break;
				case "null-date":
					break;
				case "graphic-properties":
					break;
				case "calculation-settings":
					break;
				case "named-expressions":
					break;
				case "label-range":
					break;
				case "label-ranges":
					break;
				case "named-expression":
					break;
				case "sort":
					break;
				case "sort-by":
					break;
				case "sort-groups":
					break;
				case "tab":
					break;
				case "line-break":
					break;
				case "span":
					break;
				case "p": ;
				case "文本串":
					if (["master-styles"].indexOf(l[l.length - 1][0]) > -1)
						break;
					if (w[1] === "/" && (!x || !x["string-value"])) {
						var re = e(o.slice(C, w.index), S, X);
						_ = (_.length > 0 ? _ + "\n" : "") + re[0];
						A = re[1]
					} else {
						S = Pe(w[0], false);
						C = w.index + w[0].length
					}
					break;
				case "s":
					break;
				case "database-range":
					if (w[1] === "/")
						break;
					try {
						U = ods_to_csf_3D(Pe(w[0])["target-range-address"]);
						g[U[0]]["!autofilter"] = {
							ref: U[1]
						}
					} catch (ne) {}
					break;
				case "date":
					break;
				case "object":
					break;
				case "title": ;
				case "标题":
					break;
				case "desc":
					break;
				case "binary-data":
					break;
				case "table-source":
					break;
				case "scenario":
					break;
				case "iteration":
					break;
				case "content-validations":
					break;
				case "content-validation":
					break;
				case "help-message":
					break;
				case "error-message":
					break;
				case "database-ranges":
					break;
				case "filter":
					break;
				case "filter-and":
					break;
				case "filter-or":
					break;
				case "filter-condition":
					break;
				case "list-level-style-bullet":
					break;
				case "list-level-style-number":
					break;
				case "list-level-properties":
					break;
				case "sender-firstname": ;
				case "sender-lastname": ;
				case "sender-initials": ;
				case "sender-title": ;
				case "sender-position": ;
				case "sender-email": ;
				case "sender-phone-private": ;
				case "sender-fax": ;
				case "sender-company": ;
				case "sender-phone-work": ;
				case "sender-street": ;
				case "sender-city": ;
				case "sender-postal-code": ;
				case "sender-country": ;
				case "sender-state-or-province": ;
				case "author-name": ;
				case "author-initials": ;
				case "chapter": ;
				case "file-name": ;
				case "template-name": ;
				case "sheet-name":
					break;
				case "event-listener":
					break;
				case "initial-creator": ;
				case "creation-date": ;
				case "print-date": ;
				case "generator": ;
				case "document-statistic": ;
				case "user-defined": ;
				case "editing-duration": ;
				case "editing-cycles":
					break;
				case "config-item":
					break;
				case "page-number":
					break;
				case "page-count":
					break;
				case "time":
					break;
				case "cell-range-source":
					break;
				case "detective":
					break;
				case "operation":
					break;
				case "highlighted-range":
					break;
				case "data-pilot-table": ;
				case "source-cell-range": ;
				case "source-service": ;
				case "data-pilot-field": ;
				case "data-pilot-level": ;
				case "data-pilot-subtotals": ;
				case "data-pilot-subtotal": ;
				case "data-pilot-members": ;
				case "data-pilot-member": ;
				case "data-pilot-display-info": ;
				case "data-pilot-sort-info": ;
				case "data-pilot-layout-info": ;
				case "data-pilot-field-reference": ;
				case "data-pilot-groups": ;
				case "data-pilot-group": ;
				case "data-pilot-group-member":
					break;
				case "rect":
					break;
				case "dde-connection-decls": ;
				case "dde-connection-decl": ;
				case "dde-link": ;
				case "dde-source":
					break;
				case "properties":
					break;
				case "property":
					break;
				case "a":
					if (w[1] !== "/") {
						W = Pe(w[0], false);
						if (!W.href)
							break;
						W.Target = W.href;
						delete W.href;
						if (W.Target.charAt(0) == "#" && W.Target.indexOf(".") > -1) {
							U = ods_to_csf_3D(W.Target.slice(1));
							W.Target = "#" + U[0] + "!" + U[1]
						}
					}
					break;
				case "table-protection":
					break;
				case "data-pilot-grand-total":
					break;
				case "office-document-common-attrs":
					break;
				default:
					switch (w[2]) {
					case "dc:": ;
					case "calcext:": ;
					case "loext:": ;
					case "ooo:": ;
					case "chartooo:": ;
					case "draw:": ;
					case "style:": ;
					case "chart:": ;
					case "form:": ;
					case "uof:": ;
					case "表:": ;
					case "字:":
						break;
					default:
						if (s.WTF)
							throw new Error(w);
					};
				}
			var ie = {
				Sheets: g,
				SheetNames: b,
				Workbook: j
			};
			if (s.bookSheets)
				delete ie.Sheets;
			return ie
		}
	}
	();
	function Oc(e, t) {
		t = t || {};
		var r = !!_e(e, "objectdata");
		if (r)
			ya(Se(e, "META-INF/manifest.xml"), t);
		var a = Ae(e, "content.xml");
		if (!a)
			throw new Error("Missing content.xml in " + (r ? "ODS" : "UOF") + " file");
		var n = zc(r ? a : tt(a), t);
		if (_e(e, "meta.xml"))
			n.Props = Ta(Se(e, "meta.xml"));
		return n
	}
	function Rc(e, t) {
		return zc(e, t)
	}
	var Ic = function () {
		var e = "<office:document-styles " + pt({
				"xmlns:office": "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
				"xmlns:table": "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
				"xmlns:style": "urn:oasis:names:tc:opendocument:xmlns:style:1.0",
				"xmlns:text": "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
				"xmlns:draw": "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
				"xmlns:fo": "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",
				"xmlns:xlink": "http://www.w3.org/1999/xlink",
				"xmlns:dc": "http://purl.org/dc/elements/1.1/",
				"xmlns:number": "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
				"xmlns:svg": "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",
				"xmlns:of": "urn:oasis:names:tc:opendocument:xmlns:of:1.2",
				"office:version": "1.2"
			}) + "></office:document-styles>";
		return function t() {
			return Ie + e
		}
	}
	();
	var Nc = function () {
		var e = function (e) {
			return Ve(e).replace(/  +/g, function (e) {
				return '<text:s text:c="' + e.length + '"/>'
			}).replace(/\t/g, "<text:tab/>").replace(/\n/g, "<text:line-break/>").replace(/^ /, "<text:s/>").replace(/ $/, "<text:s/>")
		};
		var t = "          <table:table-cell />\n";
		var r = "          <table:covered-table-cell/>\n";
		var a = function (a, n, i) {
			var s = [];
			s.push('      <table:table table:name="' + Ve(n.SheetNames[i]) + '" table:style-name="ta1">\n');
			var o = 0,
			l = 0,
			c = Cr(a["!ref"]);
			var f = a["!merges"] || [],
			u = 0;
			var h = Array.isArray(a);
			if (a["!cols"]) {
				for (l = 0; l <= c.e.c; ++l)
					s.push("        <table:table-column" + (a["!cols"][l] ? ' table:style-name="co' + a["!cols"][l].ods + '"' : "") + "></table:table-column>\n")
			}
			var d = "",
			p = a["!rows"] || [];
			for (o = 0; o < c.s.r; ++o) {
				d = p[o] ? ' table:style-name="ro' + p[o].ods + '"' : "";
				s.push("        <table:table-row" + d + "></table:table-row>\n")
			}
			for (; o <= c.e.r; ++o) {
				d = p[o] ? ' table:style-name="ro' + p[o].ods + '"' : "";
				s.push("        <table:table-row" + d + ">\n");
				for (l = 0; l < c.s.c; ++l)
					s.push(t);
				for (; l <= c.e.c; ++l) {
					var m = false,
					v = {},
					g = "";
					for (u = 0; u != f.length; ++u) {
						if (f[u].s.c > l)
							continue;
						if (f[u].s.r > o)
							continue;
						if (f[u].e.c < l)
							continue;
						if (f[u].e.r < o)
							continue;
						if (f[u].s.c != l || f[u].s.r != o)
							m = true;
						v["table:number-columns-spanned"] = f[u].e.c - f[u].s.c + 1;
						v["table:number-rows-spanned"] = f[u].e.r - f[u].s.r + 1;
						break
					}
					if (m) {
						s.push(r);
						continue
					}
					var b = _r({
							r: o,
							c: l
						}),
					y = h ? (a[o] || [])[l] : a[b];
					if (y && y.f) {
						v["table:formula"] = Ve(csf_to_ods_formula(y.f));
						if (y.F) {
							if (y.F.slice(0, b.length) == b) {
								var w = Cr(y.F);
								v["table:number-matrix-columns-spanned"] = w.e.c - w.s.c + 1;
								v["table:number-matrix-rows-spanned"] = w.e.r - w.s.r + 1
							}
						}
					}
					if (!y) {
						s.push(t);
						continue
					}
					switch (y.t) {
					case "b":
						g = y.v ? "TRUE" : "FALSE";
						v["office:value-type"] = "boolean";
						v["office:boolean-value"] = y.v ? "true" : "false";
						break;
					case "n":
						g = y.w || String(y.v || 0);
						v["office:value-type"] = "float";
						v["office:value"] = y.v || 0;
						break;
					case "s": ;
					case "str":
						g = y.v;
						v["office:value-type"] = "string";
						break;
					case "d":
						g = y.w || se(y.v).toISOString();
						v["office:value-type"] = "date";
						v["office:date-value"] = se(y.v).toISOString();
						v["table:style-name"] = "ce1";
						break;
					default:
						s.push(t);
						continue;
					}
					if (y.ods != null && !v["table:style-name"])
						v["table:style-name"] = "ce" + y.ods;
					var k = e(g);
					if (y.l && y.l.Target) {
						var x = y.l.Target;
						x = x.charAt(0) == "#" ? "#" + csf_to_ods_3D(x.slice(1)) : x;
						k = mt("text:a", k, {
								"xlink:href": x
							})
					}
					s.push("          " + mt("table:table-cell", mt("text:p", k, {}), v) + "\n")
				}
				s.push("        </table:table-row>\n")
			}
			s.push("      </table:table>\n");
			return s.join("")
		};
		var n = {
			center: "center",
			left: "start",
			right: "end"
		};
		var i = function (e, t) {
			var r = [],
			a = {};
			r.push(" <office:automatic-styles>\n");
			r.push('  <number:date-style style:name="N37" number:automatic-order="true">\n');
			r.push('   <number:month number:style="long"/>\n');
			r.push("   <number:text>/</number:text>\n");
			r.push('   <number:day number:style="long"/>\n');
			r.push("   <number:text>/</number:text>\n");
			r.push("   <number:year/>\n");
			r.push("  </number:date-style>\n");
			var i = 0;
			t.SheetNames.map(function (e) {
				return t.Sheets[e]
			}).forEach(function (e) {
				if (!e)
					return;
				if (e["!cols"]) {
					for (var t = 0; t < e["!cols"].length; ++t)
						if (e["!cols"][t]) {
							e["!cols"][t].ods = i;
							var a = e["!cols"][t].wpx + "px";
							r.push('  <style:style style:name="co' + i + '" style:family="table-column">\n');
							r.push('   <style:table-column-properties fo:break-before="auto" style:column-width="' + a + '"/>\n');
							r.push("  </style:style>\n");
							++i
						}
				}
			});
			var s = 0;
			t.SheetNames.map(function (e) {
				return t.Sheets[e]
			}).forEach(function (e) {
				if (!e)
					return;
				if (e["!rows"]) {
					for (var t = 0; t < e["!rows"].length; ++t)
						if (e["!rows"][t]) {
							e["!rows"][t].ods = s;
							var a = e["!rows"][t].hpx + "px";
							r.push('  <style:style style:name="ro' + s + '" style:family="table-row">\n');
							r.push('   <style:table-row-properties fo:break-before="auto" style:row-height="' + a + '"/>\n');
							r.push("  </style:style>\n");
							++s
						}
				}
			});
			r.push('  <style:style style:name="ta1" style:family="table">\n');
			r.push('   <style:table-properties table:display="true" style:writing-mode="lr-tb"/>\n');
			r.push("  </style:style>\n");
			r.push('  <style:style style:name="ce1" style:family="table-cell" style:parent-style-name="Default" style:data-style-name="N37"/>\n');
			var o = 2;
			s = 0;
			t.SheetNames.map(function (e) {
				return t.Sheets[e]
			}).forEach(function (e) {
				if (!e)
					return;
				var t = 0,
				i = 0,
				s = Cr(e["!ref"]);
				var l = Array.isArray(e);
				for (; t <= s.e.r; ++t) {
					for (i = 0; i <= s.e.c; ++i) {
						var c = _r({
								r: t,
								c: i
							}),
						f = l ? (e[t] || [])[i] : e[c];
						if (!f || !(f.s && !f.R))
							continue;
						if (f.s) {
							var u = f.s;
							var h = "",
							d = {
								"style:name": "ce" + o,
								"style:family": "table-cell",
								"style:parent-style-name": "Default",
								"style:data-style-name": "N0"
							};
							var p = {},
							m = false;
							var v = {},
							g = false;
							var b = {},
							y = false;
							if (u.color) {
								v["fo:color"] = "#" + Pi(u.color.rgb);
								g = true
							}
							if (u.sz) {
								v["fo:font-size"] = u.sz + "pt";
								g = true
							}
							if (u.bold) {
								v["fo:font-weight"] = "bold";
								g = true
							}
							if (u.italic) {
								v["fo:font-style"] = "italic";
								g = true
							}
							if (u.name) {
								if (!a[u.name])
									a[u.name] = u.name.match(/ /) ? "&apos;" + u.name + "&apos;" : u.name;
								v["style:font-name"] = u.name;
								g = true
							}
							if (u.strike) {
								v["style:text-line-through-style"] = "solid";
								v["style:text-line-through-type"] = "single";
								g = true
							}
							if (u.underline) {
								v["style:text-underline-style"] = "solid";
								v["style:text-underline-width"] = "auto";
								v["style:text-underline-color"] = "font-color";
								g = true
							}
							if (u.alignment) {
								var w = u.alignment;
								if (w.wrapText) {
									p["fo:wrap-option"] = "wrap";
									m = true
								}
								if (w.vertical) {
									p["style:vertical-align"] = w.vertical == "center" ? "middle" : w.vertical;
									m = true
								}
								if (n[w.horizontal]) {
									b["fo:text-align"] = n[w.horizontal];
									y = true
								}
							}
							if (u.fgColor) {
								p["fo:background-color"] = "#" + Pi(u.fgColor.rgb);
								m = true
							}
							if (m)
								h += mt("style:table-cell-properties", null, p);
							if (g)
								h += mt("style:text-properties", null, v);
							if (y)
								h += mt("style:paragraph-properties", null, b);
							r.push("  " + mt("style:style", h, d) + "\n");
							f.ods = o;
							++o
						}
					}
				}
			});
			r.push(" </office:automatic-styles>\n");
			var l = " <office:font-face-decls>\n" + X(a).map(function (e) {
					return '  <style:font-face style:name="' + e + '" svg:font-family="' + a[e] + '"/>\n'
				}).join("") + " </office:font-face-decls>\n";
			e.push(l);
			e.push(r.join(""))
		};
		return function s(e, t) {
			var r = [Ie];
			var n = pt({
					"xmlns:office": "urn:oasis:names:tc:opendocument:xmlns:office:1.0",
					"xmlns:table": "urn:oasis:names:tc:opendocument:xmlns:table:1.0",
					"xmlns:style": "urn:oasis:names:tc:opendocument:xmlns:style:1.0",
					"xmlns:text": "urn:oasis:names:tc:opendocument:xmlns:text:1.0",
					"xmlns:draw": "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
					"xmlns:fo": "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",
					"xmlns:xlink": "http://www.w3.org/1999/xlink",
					"xmlns:dc": "http://purl.org/dc/elements/1.1/",
					"xmlns:meta": "urn:oasis:names:tc:opendocument:xmlns:meta:1.0",
					"xmlns:number": "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
					"xmlns:presentation": "urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",
					"xmlns:svg": "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",
					"xmlns:chart": "urn:oasis:names:tc:opendocument:xmlns:chart:1.0",
					"xmlns:dr3d": "urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",
					"xmlns:math": "http://www.w3.org/1998/Math/MathML",
					"xmlns:form": "urn:oasis:names:tc:opendocument:xmlns:form:1.0",
					"xmlns:script": "urn:oasis:names:tc:opendocument:xmlns:script:1.0",
					"xmlns:ooo": "http://openoffice.org/2004/office",
					"xmlns:ooow": "http://openoffice.org/2004/writer",
					"xmlns:oooc": "http://openoffice.org/2004/calc",
					"xmlns:dom": "http://www.w3.org/2001/xml-events",
					"xmlns:xforms": "http://www.w3.org/2002/xforms",
					"xmlns:xsd": "http://www.w3.org/2001/XMLSchema",
					"xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
					"xmlns:sheet": "urn:oasis:names:tc:opendocument:sh33tjs:1.0",
					"xmlns:rpt": "http://openoffice.org/2005/report",
					"xmlns:of": "urn:oasis:names:tc:opendocument:xmlns:of:1.2",
					"xmlns:xhtml": "http://www.w3.org/1999/xhtml",
					"xmlns:grddl": "http://www.w3.org/2003/g/data-view#",
					"xmlns:tableooo": "http://openoffice.org/2009/table",
					"xmlns:drawooo": "http://openoffice.org/2010/draw",
					"xmlns:calcext": "urn:org:documentfoundation:names:experimental:calc:xmlns:calcext:1.0",
					"xmlns:loext": "urn:org:documentfoundation:names:experimental:office:xmlns:loext:1.0",
					"xmlns:field": "urn:openoffice:names:experimental:ooo-ms-interop:xmlns:field:1.0",
					"xmlns:formx": "urn:openoffice:names:experimental:ooxml-odf-interop:xmlns:form:1.0",
					"xmlns:css3t": "http://www.w3.org/TR/css3-text/",
					"office:version": "1.2"
				});
			var s = pt({
					"xmlns:config": "urn:oasis:names:tc:opendocument:xmlns:config:1.0",
					"office:mimetype": "application/vnd.oasis.opendocument.spreadsheet"
				});
			if (t.bookType == "fods")
				r.push("<office:document" + n + s + ">\n");
			else
				r.push("<office:document-content" + n + ">\n");
			i(r, e);
			r.push("  <office:body>\n");
			r.push("    <office:spreadsheet>\n");
			for (var o = 0; o != e.SheetNames.length; ++o)
				r.push(a(e.Sheets[e.SheetNames[o]], e, o, t));
			r.push("    </office:spreadsheet>\n");
			r.push("  </office:body>\n");
			if (t.bookType == "fods")
				r.push("</office:document>");
			else
				r.push("</office:document-content>");
			return r.join("")
		}
	}
	();
	function Lc(e, t) {
		if (t.bookType == "fods")
			return Nc(e, t);
		var r = ze();
		var a = "";
		var n = [];
		var i = [];
		a = "mimetype";
		Fe(r, a, "application/vnd.oasis.opendocument.spreadsheet");
		a = "content.xml";
		Fe(r, a, Nc(e, t));
		n.push([a, "text/xml"]);
		i.push([a, "ContentFile"]);
		a = "styles.xml";
		Fe(r, a, Ic(e, t));
		n.push([a, "text/xml"]);
		i.push([a, "StylesFile"]);
		a = "meta.xml";
		Fe(r, a, Ca());
		n.push([a, "text/xml"]);
		i.push([a, "MetadataFile"]);
		a = "manifest.rdf";
		Fe(r, a, _a(i));
		n.push([a, "application/rdf+xml"]);
		a = "META-INF/manifest.xml";
		Fe(r, a, wa(n));
		return r
	}
	function Bc(e, t) {
		if (!t)
			return 0;
		var r = e.SheetNames.indexOf(t);
		if (r == -1)
			throw new Error("Sheet not found: " + t);
		return r
	}
	function Mc(e) {
		return function t(r, a) {
			var n = Bc(r, a.sheet);
			return e.from_sheet(r.Sheets[r.SheetNames[n]], a, r)
		}
	}
	var Pc = Mc(_c);
	var jc = Mc({
			from_sheet: Nf
		});
	var Wc = Mc(typeof SYLK !== "undefined" ? SYLK : {});
	var Uc = Mc(typeof DIF !== "undefined" ? DIF : {});
	var $c = Mc(typeof PRN !== "undefined" ? PRN : {});
	var Hc = Mc(typeof RTF !== "undefined" ? RTF : {});
	var Xc = Mc({
			from_sheet: Lf
		});
	var Vc = Mc(typeof DBF !== "undefined" ? DBF : {});
	var Gc = Mc(typeof ETH !== "undefined" ? ETH : {});
	function Zc(e) {
		return function t(r) {
			for (var a = 0; a != e.length; ++a) {
				var n = e[a];
				if (r[n[0]] === undefined)
					r[n[0]] = n[1];
				if (n[2] === "n")
					r[n[0]] = Number(r[n[0]])
			}
		}
	}
	var qc = function (e) {
		Zc([["cellNF", false], ["cellHTML", true], ["cellFormula", true], ["cellStyles", false], ["cellText", true], ["cellDates", false], ["sheetStubs", false], ["sheetRows", 0, "n"], ["bookDeps", false], ["bookSheets", false], ["bookProps", false], ["bookFiles", false], ["bookVBA", false], ["password", ""], ["WTF", false]])(e);
		if (e.bookImages)
			e.cellStyles = true
	};
	var Yc = Zc([["cellDates", false], ["bookSST", false], ["bookType", "xlsx"], ["compression", false], ["WTF", false]]);
	function Kc(e) {
		if (ua.WS.indexOf(e) > -1)
			return "sheet";
		if (ua.CS && e == ua.CS)
			return "chart";
		if (ua.DS && e == ua.DS)
			return "dialog";
		if (ua.MS && e == ua.MS)
			return "macro";
		return e && e.length ? e : "sheet"
	}
	function Jc(e, t) {
		if (!e)
			return 0;
		try {
			e = t.map(function a(t) {
					if (!t.id)
						t.id = t.strRelID;
					return [t.name, e["!id"][t.id].Target, Kc(e["!id"][t.id].Type)]
				})
		} catch (r) {
			return null
		}
		return !e || e.length === 0 ? null : e
	}
	function Qc(e, t, r, a, n, i, s, o) {
		if (!e || !e["!drawel"])
			return;
		var l = Re(e["!drawel"].Target, a);
		var c = ha(l);
		var f = as(Ae(r, l, true), da(Ae(r, c, true), l), s, o, n);
		if (!f)
			return;
		if (f.charts)
			for (var u = 0; u < f.charts.length; ++u) {
				var h = f.charts[u];
				var d = Re(h.Target, l);
				var p = ha(d);
				var m = t == "chart" && u == 0;
				var v = Ol(Ae(r, d, true), d, n, da(Ae(r, p, true), d), i, m ? e : null, h, m ? null : e);
				if (!m) {
					if (!e["!charts"])
						e["!charts"] = [];
					e["!charts"].push(v)
				}
			}
		if (n.bookImages && f.images)
			for (var g = 0; g < f.images.length; ++g) {
				var b = f.images[g];
				var y = {
					"!type": "image",
					"!pos": Fi(b.Anchor, e),
					"!posType": b.Anchor.type.replace(/Anchor/, ""),
					"!abspos": Fi(b.Anchor, e),
					"!relpos": Di(b.Anchor, e),
					"!path": Re(b.Target, l)
				};
				y["!data"] = Se(r, y["!path"]);
				if (!e["!images"])
					e["!images"] = [];
				e["!images"].push(y)
			}
		var w,
		k;
		function x(e) {
			if (w[e])
				k[e] = w[e]
		}
		if (f.shapes)
			for (var _ = 0; _ < f.shapes.length; ++_) {
				w = f.shapes[_];
				k = {
					"!type": "shape",
					"!pos": Fi(w.Anchor, e),
					"!posType": w.Anchor.type.replace(/Anchor/, ""),
					"!abspos": Fi(w.Anchor, e),
					"!relpos": Di(w.Anchor, e)
				};
				["v", "!shape", "s", "R"].forEach(x);
				if (!e["!shapes"])
					e["!shapes"] = [];
				e["!shapes"].push(k)
			}
	}
	function ef(e, t, r, a, n, i, s, o) {
		if (!e || !e["!legdrawel"])
			return;
		var l = Re(e["!legdrawel"].Target, a);
		var c = Ae(r, l, true);
		if (c)
			cs(tt(c), e, o || []);
		e["!LDP"] = l;
		if (e["!ctrlid"])
			e["!ctrlid"].forEach(function (e) {
				if (e.rel && e.rel.Target) {
					var t = Re(e.rel.Target, a);
					e.path = t;
					delete e.rel
				}
			})
	}
	function tf(e, t, r, a, n) {
		if (!e || !e["!tablerefs"] || !r || !r["!id"])
			return;
		e["!tables"] = [];
		e["!tablerefs"].forEach(function (i) {
			var s = r["!id"][i];
			if (!s || !s.Target)
				return;
			var o = Re(s.Target, a);
			if (typeof ss !== "undefined")
				ss(Se(t, o, true), e, n)
		});
		delete e["!tablerefs"]
	}
	var rf = [];
	function af(e, t, r, a, n, i, s, o, l, c, f, u) {
		try {
			i[a] = da(Ae(e, r, true), t);
			var h = Se(e, t);
			var d;
			switch (o) {
			case "sheet":
				d = oc(h, t, n, l, i[a], c, f, u);
				break;
			case "chart":
				d = lc(h, t, n, l, i[a], c, f, u);
				break;
			case "macro":
				d = cc(h, t, n, l, i[a], c, f, u);
				break;
			case "dialog":
				d = fc(h, t, n, l, i[a], c, f, u);
				break;
			default:
				throw new Error("Unrecognized sheet type " + o);
			}
			if (l.callback)
				return;
			s[a] = d;
			Qc(d, o, e, t, l, c, u, f);
			var p = [];
			if (i && i[a])
				X(i[a]).forEach(function (r) {
					if (i[a][r].Type == ua.CMNT) {
						var n = Re(i[a][r].Target, t);
						p = pc(Se(e, n, true), n, l);
						if (!p || !p.length)
							return;
						gs(d, p)
					}
				});
			tf(d, e, i[a], t, l);
			if (typeof parse_sheet_pivot !== "undefined")
				rf.push([d, e, i[a], t, {
							Sheets: s
						}, u, l]);
			ef(d, o, e, t, n, l, c, p);
			return d
		} catch (m) {
			if (l.WTF)
				throw m
		}
	}
	function nf(e) {
		return e.charAt(0) == "/" ? e.slice(1) : e
	}
	var sf = function () {};
	function of(e, t) {
		rf = [];
		t = t || {};
		qc(t);
		if (_e(e, "META-INF/manifest.xml"))
			return Oc(e, t);
		if (_e(e, "objectdata.xml"))
			return Oc(e, t);
		if (_e(e, "Index/Document.iwa"))
			throw new Error("Unsupported NUMBERS file");
		var r = Ee(e);
		var a = oa(Ae(e, "[Content_Types].xml"));
		var n = false;
		var i,
		s;
		if (a.workbooks.length === 0) {
			s = "xl/workbook.xml";
			if (Se(e, s, true))
				a.workbooks.push(s)
		}
		if (a.workbooks.length === 0) {
			s = "xl/workbook.bin";
			if (!Se(e, s, true))
				throw new Error("Could not find workbook");
			a.workbooks.push(s);
			n = true
		}
		if (a.workbooks[0].slice(-3) == "bin")
			n = true;
		var o = {};
		var l = {};
		if (!t.bookSheets && !t.bookProps) {
			Ls = [];
			if (a.sst)
				try {
					Ls = dc(Se(e, nf(a.sst)), a.sst, t)
				} catch (c) {
					if (t.WTF)
						throw c
				}
			if (t.cellStyles && a.themes.length)
				o = hc(Ae(e, a.themes[0].replace(/^\//, ""), true) || "", a.themes[0], t);
			if (a.style)
				l = uc(Se(e, nf(a.style)), a.style, o, t)
		}
		var f = a.links.map(function (r) {
				try {
					var a = da(Ae(e, ha(nf(r))), r);
					return vc(Se(e, nf(r)), a, r, t)
				} catch (n) {}
			});
		var u = sc(Se(e, nf(a.workbooks[0])), a.workbooks[0], t);
		var h = {},
		d = "";
		if (a.coreprops.length) {
			d = Se(e, nf(a.coreprops[0]), true);
			if (d)
				h = Ta(d);
			if (a.extprops.length !== 0) {
				d = Se(e, nf(a.extprops[0]), true);
				if (d)
					Ia(d, h, t)
			}
		}
		var p = {};
		if (!t.bookSheets || t.bookProps) {
			if (a.custprops.length !== 0) {
				d = Ae(e, nf(a.custprops[0]), true);
				if (d)
					p = Ma(d, t)
			}
		}
		var m = {};
		if (t.bookSheets || t.bookProps) {
			if (u.Sheets)
				i = u.Sheets.map(function j(e) {
						return e.name
					});
			else if (h.Worksheets && h.SheetNames.length > 0)
				i = h.SheetNames;
			if (t.bookProps) {
				m.Props = h;
				m.Custprops = p
			}
			if (t.bookSheets && typeof i !== "undefined")
				m.SheetNames = i;
			if (t.bookSheets ? m.SheetNames : t.bookProps)
				return m
		}
		i = {};
		var v = {};
		if (t.bookDeps && a.calcchain)
			v = mc(Se(e, nf(a.calcchain)), a.calcchain, t);
		var g = 0;
		var b = {};
		var y,
		w; {
			var k = u.Sheets;
			h.Worksheets = k.length;
			h.SheetNames = [];
			for (var x = 0; x != k.length; ++x) {
				h.SheetNames[x] = k[x].name
			}
		}
		var _ = n ? "bin" : "xml";
		var C = a.workbooks[0].lastIndexOf("/");
		var S = (a.workbooks[0].slice(0, C + 1) + "_rels/" + a.workbooks[0].slice(C + 1) + ".rels").replace(/^\//, "");
		if (!_e(e, S))
			S = "xl/_rels/workbook." + _ + ".rels";
		var A = da(Ae(e, S, true), S);
		var T = A;
		var E = [];
		if (A) {
			if (u && u.Extern && u.Extern.length) {
				u.Extern.forEach(function (e, t) {
					var r = A["!id"][e];
					var n = ("/xl/" + r.Target).replace(/[\/][\/]/g, "/");
					var i = a.links.indexOf(n);
					if (i > -1)
						E[t] = f[i]
				})
			}
			if (u)
				delete u.Extern
		}
		if (A)
			A = Jc(A, u.Sheets);
		var F = _e(e, "xl/worksheets/sheet.xml") ? 1 : 0;
		var D = [],
		z = [];
		e: for (g = 0; g != h.Worksheets; ++g) {
			var O = "sheet";
			if (A && A[g]) {
				y = "xl/" + A[g][1].replace(/[\/]?xl\//, "");
				if (!_e(e, y))
					y = A[g][1];
				if (!_e(e, y))
					y = S.replace(/_rels\/.*$/, "") + A[g][1];
				O = A[g][2]
			} else {
				y = "xl/worksheets/sheet" + (g + 1 - F) + "." + _;
				y = y.replace(/sheet0\./, "sheet.")
			}
			w = y.replace(/^(.*)(\/)([^\/]*)$/, "$1/_rels/$3.rels");
			D.push(y);
			if (t && t.sheets != null)
				switch (typeof t.sheets) {
				case "number":
					if (g != t.sheets)
						continue e;
					break;
				case "string":
					if (h.SheetNames[g].toLowerCase() != t.sheets.toLowerCase())
						continue e;
					break;
				default:
					if (Array.isArray && Array.isArray(t.sheets)) {
						var I = 0;
						for (var N = 0; N != t.sheets.length; ++N) {
							if (typeof t.sheets[N] == "number" && t.sheets[N] == g)
								I = 1;
							if (typeof t.sheets[N] == "string" && t.sheets[N].toLowerCase() == h.SheetNames[g].toLowerCase())
								I = 1
						}
						if (!I)
							continue e
					};
				}
			var L = af(e, y, w, h.SheetNames[g], g, b, i, O, t, u, o, l);
			if (L && L["!LDP"]) {
				z[g] = L["!LDP"];
				delete L["!LDP"]
			}
		}
		if (typeof parse_sheet_pivot !== "undefined")
			for (g = 0; g < rf.length; ++g)
				parse_sheet_pivot.apply(null, rf[g]);
		m = {
			Directory: a,
			Workbook: u,
			Props: h,
			Custprops: p,
			Deps: v,
			Sheets: i,
			SheetNames: h.SheetNames,
			Strings: Ls,
			Styles: l,
			Themes: o,
			SSF: R.get_table()
		};
		Hi(m);
		if (t && t.bookFiles) {
			m.keys = r;
			m.files = e.files
		}
		if (t && t.bookVBA) {
			if (a.vba.length > 0)
				m.vbaraw = Se(e, nf(a.vba[0]), true);
			else if (a.defaults && a.defaults.bin === ks)
				m.vbaraw = Se(e, "xl/vbaProject.bin", true)
		}
		if (T && T["!id"]) {
			var B = [];
			for (var M = 1; M <= 1024; ++M) {
				if (!T["!id"]["rId" + M])
					continue;
				if (!T["!id"]["rId" + M].Type)
					continue;
				if (/customXml$/.test(T["!id"]["rId" + M].Type))
					B.push(Re(T["!id"]["rId" + M].Target, a.workbooks[0]))
			}
			if (B.length > 0) {
				m.CustomXML = [];
				B.forEach(function (t) {
					var r = {
						data: Ae(e, nf(t))
					};
					var a = ha(t);
					try {
						var n = da(Ae(e, nf(a), true), a);
						if (n) {
							for (var i = 1; i <= 1024; ++i) {
								if (!n["!id"]["rId" + i])
									continue;
								if (!n["!id"]["rId" + i].Type)
									continue;
								if (/customXmlProps$/.test(n["!id"]["rId" + i].Type))
									r.props = Ae(e, nf(Re(n["!id"]["rId" + i].Target, t)))
							}
						}
					} catch (s) {}
					m.CustomXML.push(r)
				})
			}
		}
		var P = Te(e, "xl/model/item.data", true);
		if (P)
			m.model = P;
		if (a.conn)
			m.conn = Se(e, nf(a.conn), true);
		if (E.length)
			m.ExternalWB = E;
		if (u)
			u.PPI = xn;
		if (t.template) {
			m._wspaths = D;
			m._stypath = nf(a.style || "");
			m._wbpath = nf(a.workbooks[0] || "xl/workbook.xml");
			m._vmlpaths = z;
			m._wbrelspath = S;
			m._ct = Ae(e, "[Content_Types].xml");
			m.files = e.files;
			sf(m, e, t)
		}
		return m
	}
	function lf(e, t) {
		var r = t || {};
		if (!r.password)
			r.password = "VelvetSweatshop";
		var a = "Workbook",
		n = CFB.find(e, a);
		try {
			a = "/!DataSpaces/Version";
			n = CFB.find(e, a);
			if (!n || !n.content)
				throw new Error("ECMA-376 Encrypted file missing " + a);
			parse_DataSpaceVersionInfo(n.content);
			a = "/!DataSpaces/DataSpaceMap";
			n = CFB.find(e, a);
			if (!n || !n.content)
				throw new Error("ECMA-376 Encrypted file missing " + a);
			var i = parse_DataSpaceMap(n.content);
			if (i.length !== 1 || i[0].comps.length !== 1 || i[0].comps[0].t !== 0 || i[0].name !== "StrongEncryptionDataSpace" || i[0].comps[0].v !== "EncryptedPackage")
				throw new Error("ECMA-376 Encrypted file bad " + a);
			a = "/!DataSpaces/DataSpaceInfo/StrongEncryptionDataSpace";
			n = CFB.find(e, a);
			if (!n || !n.content)
				throw new Error("ECMA-376 Encrypted file missing " + a);
			var s = parse_DataSpaceDefinition(n.content);
			if (s.length != 1 || s[0] != "StrongEncryptionTransform")
				throw new Error("ECMA-376 Encrypted file bad " + a);
			a = "/!DataSpaces/TransformInfo/StrongEncryptionTransform/!Primary";
			n = CFB.find(e, a);
			if (!n || !n.content)
				throw new Error("ECMA-376 Encrypted file missing " + a);
			parse_Primary(n.content)
		} catch (o) {}
		a = "/EncryptionInfo";
		n = CFB.find(e, a);
		if (!n || !n.content)
			throw new Error("ECMA-376 Encrypted file missing " + a);
		var l = parse_EncryptionInfo(n.content);
		a = "/EncryptedPackage";
		n = CFB.find(e, a);
		if (!n || !n.content)
			throw new Error("ECMA-376 Encrypted file missing " + a);
		if (l[0] == 4 && typeof decrypt_agile !== "undefined")
			return decrypt_agile(l[1], n.content, r.password || "", r);
		if (l[0] == 2 && typeof decrypt_std76 !== "undefined")
			return decrypt_std76(l[1], n.content, r.password || "", r);
		throw new Error("File is password-protected")
	}
	var cf = function () {};
	function ff(e, t) {
		if (t.template)
			return cf(e, t);
		if (t.bookType == "ods")
			return Lc(e, t);
		Sn(t && t.PPI || 96);
		if (e && !e.SSF) {
			e.SSF = R.get_table()
		}
		if (e && e.SSF) {
			I(R);
			R.load_table(e.SSF);
			t.revssf = Z(e.SSF);
			t.revssf[e.SSF[65535]] = 0;
			t.ssf = e.SSF
		}
		e.Styles = {
			Fonts: t.Fonts = [{
					sz: 12,
					color: {
						theme: 1,
						rgb: "000000"
					},
					name: "Calibri",
					family: 2,
					scheme: "minor"
				}
			],
			Fills: t.Fills = [{
					patternType: "none"
				}, {
					patternType: "gray125"
				}
			],
			Borders: t.Borders = [{}
			],
			DXF: t.DXF = e.Styles && e.Styles.DXF || []
		};
		if (t.overrideMDW)
			pn = t.overrideMDW;
		else
			Nn(t.Fonts[0]);
		t.rels = {};
		t.wbrels = {};
		t.Strings = [];
		t.Strings.Count = 0;
		t.Strings.Unique = 0;
		if (Ms)
			t.revStrings = new Map;
		else {
			t.revStrings = {};
			t.revStrings.foo = [];
			delete t.revStrings.foo
		}
		var r = t.bookType == "xlsb" ? "bin" : "xml";
		var a = Cs.indexOf(t.bookType) > -1;
		var n = sa();
		Yc(t = t || {});
		var i = ze();
		var s = "",
		o = 0;
		t.cellXfs = [];
		t.cellStyleXfs = [{
				name: "Normal"
			}
		];
		Xs(t.cellXfs, t.cellStyleXfs, {}, {
			revssf: {
				General: 0
			}
		});
		if (!e.Props)
			e.Props = {};
		s = "docProps/core.xml";
		Fe(i, s, Da(e.Props, t));
		n.coreprops.push(s);
		ga(t.rels, 2, s, ua.CORE_PROPS);
		s = "docProps/app.xml";
		if (e.Props && e.Props.SheetNames) {}
		else if (!e.Workbook || !e.Workbook.Sheets)
			e.Props.SheetNames = e.SheetNames;
		else {
			var l = [];
			for (var c = 0; c < e.SheetNames.length; ++c)
				if ((e.Workbook.Sheets[c] || {}).Hidden != 2)
					l.push(e.SheetNames[c]);
			e.Props.SheetNames = l
		}
		e.Props.Worksheets = e.Props.SheetNames.length;
		Fe(i, s, La(e.Props, t));
		n.extprops.push(s);
		ga(t.rels, 3, s, ua.EXT_PROPS);
		if (e.Custprops !== e.Props && X(e.Custprops || {}).length > 0) {
			s = "docProps/custom.xml";
			Fe(i, s, ja(e.Custprops, t));
			n.custprops.push(s);
			ga(t.rels, 4, s, ua.CUST_PROPS)
		}
		var f = [];
		var u = [];
		function h(e, t) {
			u.push([o - 1, t, e])
		}
		function d(e) {
			f.push([o - 1, e]);
			ga(p, -1, "../pivotTables/pivotTable" + f.length + "." + r, ua.PIVOT)
		}
		for (o = 1; o <= e.SheetNames.length; ++o) {
			var p = {
				"!id": {}
			};
			var m = e.Sheets[e.SheetNames[o - 1]];
			var v = (m || {})["!type"] || "sheet";
			switch (v) {
			case "chart":
				if (typeof write_drawing_ !== "undefined") {
					s = "xl/chartsheets/sheet" + o + "." + r;
					i.file(s, yc(o - 1, s, t, e, p));
					n.charts.push(s);
					ga(t.wbrels, -1, "chartsheets/sheet" + o + "." + r, ua.CS);
					break
				};
			default:
				s = "xl/worksheets/sheet" + o + "." + r;
				Fe(i, s, bc(o - 1, s, t, e, p));
				n.sheets.push(s);
				ga(t.wbrels, -1, "worksheets/sheet" + o + "." + r, ua.WS[0]);
			}
			if (m) {
				if (v == "chart" && !m["!pos"])
					m["!pos"] = {
						x: 0,
						y: 0,
						w: 900,
						h: 600
					};
				var g = m["!comments"];
				var b = false;
				if (g && g.length > 0) {
					var y = "xl/comments" + o + "." + r;
					Fe(i, y, xc(g, y, t));
					n.comments.push(y);
					ga(p, -1, "../comments" + o + "." + r, ua.CMNT);
					b = true
				}
				if ((m["!controls"] || []).length > 0)
					b = true;
				if (m["!legacy"]) {
					if (b)
						Fe(i, "xl/drawings/vmlDrawing" + o + ".vml", fs(o, m["!comments"], m["!controls"], m))
				}
				if (m["!legacyHF"]) {
					vs(i, n, o, m["!print"].images)
				}
				var w = (m["!type"] == "chart" ? [m] : m["!charts"] || []).concat((m["!images"] || []).map(function (e) {
						if (!e["!type"])
							e["!type"] = "image";
						return e
					})).concat((m["!shapes"] || []).map(function (e) {
						if (!e["!type"])
							e["!type"] = "shape";
						return e
					}));
				if (w && w.length) {
					if (typeof write_drawing_ !== "undefined")
						write_drawing_(i, n, o, m, w);
					else {
						i.file("xl/drawings/drawing" + o + ".xml", ns());
						n.drawings.push("xl/drawings/drawing" + o + ".xml")
					}
				}
				delete m["!comments"];
				delete m["!legacy"];
				delete m["!legacyHF"]
			}
			if (m && m["!pivots"] && r == "xml" && typeof write_pivot_xml !== "undefined")
				m["!pivots"].forEach(d);
			if (p["!id"].rId1)
				Fe(i, ha(s), ma(p));
			if (m && m["!tables"] && r == "xml" && typeof os !== "undefined")
				m["!tables"].forEach(h)
		}
		if (t.Strings != null && t.Strings.length > 0) {
			s = "xl/sharedStrings." + r;
			Fe(i, s, kc(t.Strings, s, t));
			n.strs.push(s);
			ga(t.wbrels, -1, "sharedStrings." + r, ua.SST)
		}
		if (r == "xml" && typeof write_pivot_xml !== "undefined")
			write_pivot_xml(f, e, i, n, t);
		if (r == "xml" && typeof os !== "undefined")
			os(u, e, i, n, t);
		if (r == "xml" && (e.ExternalWB || []).length)
			Ki(e, i, n, t);
		if (r == "xml")
			Xi(e);
		s = "xl/workbook." + r;
		Fe(i, s, gc(e, s, t));
		n.workbooks.push(s);
		ga(t.rels, 1, s, ua.WB);
		s = "xl/theme/theme1.xml";
		Fe(i, s, Ai(e.Themes, t));
		n.themes.push(s);
		ga(t.wbrels, -1, "theme/theme1.xml", ua.THEME);
		s = "xl/styles." + r;
		Fe(i, s, wc(e, s, t));
		n.styles.push(s);
		ga(t.wbrels, -1, "styles." + r, ua.STY);
		if (e.vbaraw && a) {
			s = "xl/vbaProject.bin";
			Fe(i, s, e.vbaraw);
			n.vba.push(s);
			ga(t.wbrels, -1, "vbaProject.bin", ua.VBA)
		}
		if (e.model && e.model.length) {
			Fe(i, "xl/model/item.data", e.model);
			ga(t.wbrels, -1, "model/item.data", ua.PWRPD)
		}
		if (e.conn) {
			Fe(i, "xl/connections.xml", e.conn);
			n.conns.push("/xl/connections.xml");
			ga(t.wbrels, -1, "connections.xml", ua.CONN)
		}
		if (e.CustomXML) {
			e.CustomXML.forEach(function (e, r) {
				Fe(i, "customXml/item" + (r + 1) + ".xml", e.data);
				ga(t.wbrels, -1, "../customXml/item" + (r + 1) + ".xml", ua.CXML);
				if (e.props) {
					Fe(i, "customXml/itemProps" + (r + 1) + ".xml", e.props);
					n.customxmlprops.push("/customXml/itemProps" + (r + 1) + ".xml");
					var a = {};
					ga(a, -1, "itemProps" + (r + 1) + ".xml", ua.CXMLP);
					Fe(i, "customXml/_rels/item" + (r + 1) + ".xml.rels", ma(a))
				}
			})
		}
		Fe(i, "[Content_Types].xml", fa(n, t));
		Fe(i, "_rels/.rels", ma(t.rels));
		Fe(i, "xl/_rels/workbook." + r + ".rels", ma(t.wbrels));
		delete t.Fonts;
		delete t.Fills;
		delete t.Borders;
		delete t.revssf;
		delete t.ssf;
		return i
	}
	function uf(e, t) {
		var r = "";
		switch ((t || {}).type || "base64") {
		case "buffer":
			return [e[0], e[1], e[2], e[3]];
		case "base64":
			r = b.decode(e.slice(0, 24));
			break;
		case "binary":
			r = e;
			break;
		case "array":
			return [e[0], e[1], e[2], e[3]];
		default:
			throw new Error("Unrecognized type " + (t && t.type || "undefined"));
		}
		return [r.charCodeAt(0), r.charCodeAt(1), r.charCodeAt(2), r.charCodeAt(3)]
	}
	function hf(e, t) {
		if (CFB.find(e, "EncryptedPackage"))
			return lf(e, t);
		return parse_xlscfb(e, t)
	}
	function df(e, t) {
		var r,
		a = e;
		var n = t || {};
		if (!n.type)
			n.type = y && Buffer.isBuffer(e) ? "buffer" : "base64";
		r = Oe(a, n);
		return of(r, n)
	}
	function pf(e, t) {
		var r = 0;
		e: while (r < e.length)
			switch (e.charCodeAt(r)) {
			case 10: ;
			case 13: ;
			case 32:
				++r;
				break;
			case 60:
				return parse_xlml(e.slice(r), t);
			default:
				break e;
			}
		return PRN.to_workbook(e, t)
	}
	function mf(e, t) {
		var r = "",
		a = uf(e, t);
		switch (t.type) {
		case "base64":
			r = b.decode(e);
			break;
		case "binary":
			r = e;
			break;
		case "buffer":
			r = e.toString("binary");
			break;
		case "array":
			r = oe(e);
			break;
		default:
			throw new Error("Unrecognized type " + t.type);
		}
		if (a[0] == 239 && a[1] == 187 && a[2] == 191)
			r = tt(r);
		return pf(r, t)
	}
	function vf(e, t) {
		var r = e;
		if (t.type == "base64")
			r = b.decode(r);
		r = cptable.utils.decode(1200, r.slice(2), "str");
		t.type = "binary";
		return pf(r, t)
	}
	function gf(e) {
		return !e.match(/[^\x00-\x7F]/) ? e : rt(e)
	}
	function bf(e, t, r, a) {
		if (a) {
			r.type = "string";
			return PRN.to_workbook(e, r)
		}
		return PRN.to_workbook(t, r)
	}
	function yf(e, t) {
		var r = R.getlocale();
		I(R);
		R.setlocale(r);
		c();
		if (typeof ArrayBuffer !== "undefined" && e instanceof ArrayBuffer)
			return yf(new Uint8Array(e), t);
		var a = e,
		n = [0, 0, 0, 0],
		i = false;
		var s = t || {};
		Sn(xn = s.PPI || kn);
		if (s.cellStyles) {
			s.cellNF = true;
			s.sheetStubs = true
		}
		Bs = {};
		if (s.dateNF)
			Bs.dateNF = s.dateNF;
		if (!s.type)
			s.type = y && Buffer.isBuffer(e) ? "buffer" : "base64";
		if (s.type == "file") {
			s.type = y ? "buffer" : "binary";
			a = H(e)
		}
		if (s.type == "string") {
			i = true;
			s.type = "binary";
			s.codepage = 65001;
			a = gf(e)
		}
		if (s.type == "array" && typeof Uint8Array !== "undefined" && e instanceof Uint8Array && typeof ArrayBuffer !== "undefined") {
			var o = new ArrayBuffer(3),
			l = new Uint8Array(o);
			l.foo = "bar";
			if (!l.foo) {
				s = le(s);
				s.type = "array";
				return yf(F(a), s)
			}
		}
		switch ((n = uf(a, s))[0]) {
		case 208:
			return hf(CFB.read(a, s), s);
		case 9:
			if (n[1] <= 4)
				return parse_xlscfb(a, s);
			break;
		case 60:
			return parse_xlml(a, s);
		case 73:
			if (n[1] === 68)
				return read_wb_ID(a, s);
			break;
		case 84:
			if (n[1] === 65 && n[2] === 66 && n[3] === 76)
				return DIF.to_workbook(a, s);
			break;
		case 80:
			return n[1] === 75 && n[2] < 9 && n[3] < 9 ? df(a, s) : bf(e, a, s, i);
		case 239:
			return n[3] === 60 ? parse_xlml(a, s) : bf(e, a, s, i);
		case 255:
			if (n[1] === 254) {
				return vf(a, s)
			}
			break;
		case 0:
			if (n[1] === 0 && n[2] >= 2 && n[3] === 0)
				return WK_.to_workbook(a, s);
			break;
		case 3: ;
		case 131: ;
		case 139: ;
		case 140:
			return DBF.to_workbook(a, s);
		case 123:
			if (n[1] === 92 && n[2] === 114 && n[3] === 116)
				return RTF.to_workbook(a, s);
			break;
		case 10: ;
		case 13: ;
		case 32:
			return mf(a, s);
		}
		if (n[2] <= 12 && n[3] <= 31)
			return DBF.to_workbook(a, s);
		return bf(e, a, s, i)
	}
	function wf(e, t) {
		var r = t || {};
		r.type = "file";
		return yf(e, r)
	}
	function kf(e, t) {
		switch (t.type) {
		case "base64": ;
		case "binary":
			break;
		case "buffer": ;
		case "array":
			t.type = "";
			break;
		case "file":
			return U(t.file, CFB.write(e, {
					type: y ? "buffer" : ""
				}));
		case "string":
			throw new Error("'string' output type invalid for '" + t.bookType + "' files");
		default:
			throw new Error("Unrecognized type " + t.type);
		}
		return CFB.write(e, t)
	}
	function xf(e, t) {
		var r = t || {};
		var a = ff(e, r);
		var n = {};
		if (r.compression)
			n.compression = "DEFLATE";
		if (r.password)
			n.type = y ? "nodebuffer" : "string";
		else
			switch (r.type) {
			case "base64":
				n.type = "base64";
				break;
			case "binary":
				n.type = "string";
				break;
			case "string":
				throw new Error("'string' output type invalid for '" + r.bookType + "' files");
			case "buffer": ;
			case "file":
				n.type = y ? "nodebuffer" : "string";
				break;
			default:
				throw new Error("Unrecognized type " + r.type);
			}
		var i = a.FullPaths ? CFB.write(a, {
				fileType: "zip",
				type: {
					nodebuffer: "buffer",
					string: "binary"
				}
				[n.type] || n.type
			}) : a.generate(n);
		if (r.password && typeof encrypt_agile !== "undefined")
			return kf(encrypt_agile(i, r.password), r);
		if (r.type === "file")
			return U(r.file, i);
		return r.type == "string" ? tt(i) : i
	}
	function _f(e, t) {
		var r = t || {};
		var a = write_xlscfb(e, r);
		return kf(a, r)
	}
	function Cf(e, t, r) {
		if (!r)
			r = "";
		var a = r + e;
		switch (t.type) {
		case "base64":
			return b.encode(rt(a));
		case "binary":
			return rt(a);
		case "string":
			return e;
		case "file":
			return U(t.file, a, "utf8");
		case "buffer": {
				if (y)
					return w(a, "utf8");
				else
					return Cf(a, {
						type: "binary"
					}).split("").map(function (e) {
						return e.charCodeAt(0)
					})
			};
		}
		throw new Error("Unrecognized type " + t.type)
	}
	function Sf(e, t) {
		switch (t.type) {
		case "base64":
			return b.encode(e);
		case "binary":
			return e;
		case "string":
			return e;
		case "file":
			return U(t.file, e, "binary");
		case "buffer": {
				if (y)
					return w(e, "binary");
				else
					return e.split("").map(function (e) {
						return e.charCodeAt(0)
					})
			};
		}
		throw new Error("Unrecognized type " + t.type)
	}
	function Af(e, t) {
		switch (t.type) {
		case "string": ;
		case "base64": ;
		case "binary":
			var r = "";
			for (var a = 0; a < e.length; ++a)
				r += String.fromCharCode(e[a]);
			return t.type == "base64" ? b.encode(r) : t.type == "string" ? tt(r) : r;
		case "file":
			return U(t.file, e);
		case "buffer":
			return e;
		default:
			throw new Error("Unrecognized type " + t.type);
		}
	}
	function Tf(e, t) {
		c();
		Ql(e);
		var r = t || {};
		if (r.cellStyles) {
			r.cellNF = true;
			r.sheetStubs = true
		}
		if (r.type == "array") {
			r.type = "binary";
			var a = Tf(e, r);
			r.type = "array";
			return A(a)
		}
		switch (r.bookType || "xlsb") {
		case "xml": ;
		case "xlml":
			return Cf(write_xlml(e, r), r);
		case "slk": ;
		case "sylk":
			return Cf(Wc(e, r), r);
		case "htm": ;
		case "html":
			return Cf(Pc(e, r), r);
		case "txt":
			return Sf(Xc(e, r), r);
		case "csv":
			return Cf(jc(e, r), r, "\ufeff");
		case "dif":
			return Cf(Uc(e, r), r);
		case "dbf":
			return Af(Vc(e, r), r);
		case "prn":
			return Cf($c(e, r), r);
		case "rtf":
			return Cf(Hc(e, r), r);
		case "eth":
			return Cf(Gc(e, r), r);
		case "fods":
			return Cf(Lc(e, r), r);
		case "biff2":
			if (!r.biff)
				r.biff = 2;
		case "biff3":
			if (!r.biff)
				r.biff = 3;
		case "biff4":
			if (!r.biff)
				r.biff = 4;
			return Af(write_biff_buf(e, r), r);
		case "biff5":
			if (!r.biff)
				r.biff = 5;
		case "biff8": ;
		case "xla": ;
		case "xls":
			if (!r.biff)
				r.biff = 8;
			return _f(e, r);
		case "xlsx": ;
		case "xlsm": ;
		case "xlam": ;
		case "xlsb": ;
		case "ods":
			return xf(e, r);
		default:
			throw new Error("Unrecognized bookType |" + r.bookType + "|");
		}
	}
	function Ef(e) {
		if (e.bookType)
			return;
		var t = {
			xls: "biff8",
			htm: "html",
			slk: "sylk",
			socialcalc: "eth",
			Sh33tJS: "WTF"
		};
		var r = e.file.slice(e.file.lastIndexOf(".")).toLowerCase();
		if (r.match(/^\.[a-z]+$/))
			e.bookType = r.slice(1);
		e.bookType = t[e.bookType] || e.bookType
	}
	function Ff(e, t, r) {
		var a = r || {};
		a.type = "file";
		a.file = t;
		Ef(a);
		return Tf(e, a)
	}
	function Df(e, t, r, a) {
		var n = r || {};
		n.type = "file";
		n.file = e;
		Ef(n);
		n.type = "buffer";
		var i = a;
		if (!(i instanceof Function))
			i = r;
		return j.writeFile(e, Tf(t, n), i)
	}
	function zf(e, t, r, a, n, i, s, o) {
		var l = pr(r);
		var c = o.defval,
		f = o.raw;
		var u = true;
		var h = n === 1 ? [] : {};
		if (n !== 1) {
			if (Object.defineProperty)
				try {
					Object.defineProperty(h, "__rowNum__", {
						value: r,
						enumerable: false
					})
				} catch (d) {
					h.__rowNum__ = r
				}
			else
				h.__rowNum__ = r
		}
		if (!s || e[r])
			for (var p = t.s.c; p <= t.e.c; ++p) {
				var m = s ? e[r][p] : e[a[p] + l];
				if (m === undefined || m.t === undefined) {
					if (c === undefined)
						continue;
					if (i[p] != null) {
						h[i[p]] = c
					}
					continue
				}
				var v = m.v;
				switch (m.t) {
				case "z":
					if (v == null)
						break;
					continue;
				case "e":
					v = void 0;
					break;
				case "s": ;
				case "d": ;
				case "b": ;
				case "n":
					break;
				default:
					throw new Error("unrecognized type " + m.t);
				}
				if (i[p] != null) {
					if (v == null) {
						if (c !== undefined)
							h[i[p]] = c;
						else if (f && v === null)
							h[i[p]] = null;
						else
							continue
					} else {
						h[i[p]] = f ? v : Er(m, v, o)
					}
					if (v != null)
						u = false
				}
			}
		return {
			row: h,
			isempty: u
		}
	}
	function Of(e, t) {
		if (e == null || e["!ref"] == null)
			return [];
		var r = {
			t: "n",
			v: 0
		},
		a = 0,
		n = 1,
		i = [],
		s = 0,
		o = "";
		var l = JSON.parse('{"s":{"r":0,"c":0},"e":{"r":0,"c":0}}');
		var c = t || {};
		var f = c.range != null ? c.range : e["!ref"];
		if (c.header === 1)
			a = 1;
		else if (c.header === "A")
			a = 2;
		else if (Array.isArray(c.header))
			a = 3;
		else if (c.header == null)
			a = 0;
		switch (typeof f) {
		case "string":
			l = Ar(f);
			break;
		case "number":
			l = Ar(e["!ref"]);
			l.s.r = f;
			break;
		default:
			l = f;
		}
		if (a > 0)
			n = 0;
		var u = pr(l.s.r);
		var h = [];
		var d = [];
		var p = 0,
		m = 0;
		var v = Array.isArray(e);
		var g = l.s.r,
		b = 0,
		y = 0;
		if (v && !e[g])
			e[g] = [];
		for (b = l.s.c; b <= l.e.c; ++b) {
			h[b] = br(b);
			r = v ? e[g][b] : e[h[b] + u];
			switch (a) {
			case 1:
				i[b] = b - l.s.c;
				break;
			case 2:
				i[b] = h[b];
				break;
			case 3:
				i[b] = c.header[b - l.s.c];
				break;
			default:
				if (r == null)
					r = JSON.parse('{"w": "__EMPTY", "t": "s"}');
				o = s = Er(r, null, c);
				m = 0;
				for (y = 0; y < i.length; ++y)
					if (i[y] == o)
						o = s + "_" + ++m;
				i[b] = o;
			}
		}
		for (g = l.s.r + n; g <= l.e.r; ++g) {
			var w = zf(e, l, g, h, a, i, v, c);
			if (w.isempty === false || (a === 1 ? c.blankrows !== false : !!c.blankrows))
				d[p++] = w.row
		}
		d.length = p;
		return d
	}
	var Rf = /"/g;
	function If(e, t, r, a, n, i, s, o) {
		var l = true;
		var c = [],
		f = "",
		u = pr(r);
		for (var h = t.s.c; h <= t.e.c; ++h) {
			if (!a[h])
				continue;
			var d = o.dense ? (e[r] || [])[h] : e[a[h] + u];
			if (d == null)
				f = "";
			else if (d.v != null) {
				l = false;
				f = "" + Er(d, null, o);
				for (var p = 0, m = 0; p !== f.length; ++p)
					if ((m = f.charCodeAt(p)) === n || m === i || m === 34) {
						f = '"' + f.replace(Rf, '""') + '"';
						break
					}
				if (f == "ID")
					f = '"ID"'
			} else if (d.f != null && !d.F) {
				l = false;
				f = "=" + d.f;
				if (f.indexOf(",") >= 0)
					f = '"' + f.replace(Rf, '""') + '"'
			} else
				f = "";
			c.push(f)
		}
		if (o.blankrows === false && l)
			return null;
		return c.join(s)
	}
	function Nf(e, t) {
		var r = [];
		var a = t == null ? {}
		 : t;
		if (e == null || e["!ref"] == null)
			return "";
		var n = Ar(e["!ref"]);
		var i = a.FS !== undefined ? a.FS : ",",
		s = i.charCodeAt(0);
		var o = a.RS !== undefined ? a.RS : "\n",
		l = o.charCodeAt(0);
		var c = new RegExp((i == "|" ? "\\|" : i) + "+$");
		var f = "",
		u = [];
		a.dense = Array.isArray(e);
		var h = a.skipHidden && e["!cols"] || [];
		var d = a.skipHidden && e["!rows"] || [];
		for (var p = n.s.c; p <= n.e.c; ++p)
			if (!(h[p] || {}).hidden)
				u[p] = br(p);
		for (var m = n.s.r; m <= n.e.r; ++m) {
			if ((d[m] || {}).hidden)
				continue;
			f = If(e, n, m, u, s, l, i, a);
			if (f == null) {
				continue
			}
			if (a.strip)
				f = f.replace(c, "");
			r.push(f + o)
		}
		delete a.dense;
		return r.join("")
	}
	function Lf(e, t) {
		if (!t)
			t = {};
		t.FS = "\t";
		t.RS = "\n";
		var r = Nf(e, t);
		if (typeof cptable == "undefined" || t.type == "string")
			return r;
		var a = cptable.utils.encode(1200, r, "str");
		return String.fromCharCode(255) + String.fromCharCode(254) + a
	}
	function Bf(e) {
		var t = "",
		r,
		a = "";
		if (e == null || e["!ref"] == null)
			return [];
		var n = Ar(e["!ref"]),
		i = "",
		s = [],
		o;
		var l = [];
		var c = Array.isArray(e);
		for (o = n.s.c; o <= n.e.c; ++o)
			s[o] = br(o);
		for (var f = n.s.r; f <= n.e.r; ++f) {
			i = pr(f);
			for (o = n.s.c; o <= n.e.c; ++o) {
				t = s[o] + i;
				r = c ? (e[f] || [])[o] : e[t];
				a = "";
				if (r === undefined)
					continue;
				else if (r.F != null) {
					t = r.F;
					if (!r.f)
						continue;
					a = r.f;
					if (t.indexOf(":") == -1)
						t = t + ":" + t
				}
				if (r.f != null)
					a = r.f;
				else if (r.t == "z")
					continue;
				else if (r.t == "n" && r.v != null)
					a = "" + r.v;
				else if (r.t == "b")
					a = r.v ? "TRUE" : "FALSE";
				else if (r.w !== undefined)
					a = "'" + r.w;
				else if (r.v === undefined)
					continue;
				else if (r.t == "s")
					a = "'" + r.v;
				else
					a = "" + r.v;
				l[l.length] = t + "=" + a
			}
		}
		return l
	}
	function Mf(e, t, r) {
		var a = r || {};
		var n =  + !a.skipHeader;
		var i = e || {};
		var s = 0,
		o = 0;
		if (i && a.origin != null) {
			if (typeof a.origin == "number")
				s = a.origin;
			else {
				var l = typeof a.origin == "string" ? xr(a.origin) : a.origin;
				s = l.r;
				o = l.c
			}
		}
		var c;
		var f = JSON.parse('{"s": {"c":0, "r":0}, "e": {"c":0, "r":0}}');
		f.e.c = o;
		f.e.r = s + t.length - 1 + n;
		if (i["!ref"]) {
			var u = Ar(i["!ref"]);
			f.e.c = Math.max(f.e.c, u.e.c);
			f.e.r = Math.max(f.e.r, u.e.r);
			if (s == -1) {
				s = u.e.r + 1;
				f.e.r = s + t.length - 1 + n
			}
		} else {
			if (s == -1) {
				s = 0;
				f.e.r = t.length - 1 + n
			}
		}
		var h = a.header || [],
		d = 0;
		t.forEach(function (e, t) {
			X(e).forEach(function (r) {
				if ((d = h.indexOf(r)) == -1)
					h[d = h.length] = r;
				var l = e[r];
				var f = "z";
				var u = "";
				var p = _r({
						c: o + d,
						r: s + t + n
					});
				c = jf.sheet_get_cell(i, p);
				if (l && typeof l === "object" && !(l instanceof Date)) {
					i[p] = l
				} else {
					if (typeof l == "number")
						f = "n";
					else if (typeof l == "boolean")
						f = "b";
					else if (typeof l == "string")
						f = "s";
					else if (l instanceof Date) {
						f = "d";
						if (!a.cellDates) {
							f = "n";
							l = J(l)
						}
						u = c.z && R.is_date(c.z) ? c.z : a.dateNF || R._table[14]
					}
					if (!c)
						i[p] = c = {
							t: f,
							v: l
						};
					else {
						c.t = f;
						c.v = l;
						delete c.w;
						delete c.R;
						if (u)
							c.z = u
					}
					if (u)
						c.z = u
				}
			})
		});
		f.e.c = Math.max(f.e.c, o + h.length - 1);
		var p = pr(s);
		if (n)
			for (d = 0; d < h.length; ++d)
				i[br(d + o) + p] = {
					t: "s",
					v: h[d]
				};
		i["!ref"] = Sr(f);
		return i
	}
	function Pf(e, t) {
		return Mf(null, e, t)
	}
	var jf = {
		encode_col: br,
		encode_row: pr,
		encode_cell: _r,
		encode_range: Sr,
		decode_col: gr,
		decode_row: dr,
		split_cell: kr,
		decode_cell: xr,
		decode_range: Cr,
		format_cell: Er,
		get_formulae: Bf,
		make_csv: Nf,
		make_json: Of,
		make_formulae: Bf,
		sheet_add_aoa: Dr,
		sheet_add_json: Mf,
		sheet_add_dom: Ec,
		aoa_to_sheet: zr,
		json_to_sheet: Pf,
		table_to_sheet: Fc,
		table_to_book: Dc,
		sheet_to_csv: Nf,
		sheet_to_txt: Lf,
		sheet_to_json: Of,
		sheet_to_html: _c.from_sheet,
		sheet_to_formulae: Bf,
		sheet_to_row_object_array: Of
	};
	if (typeof test_password !== "undefined")
		jf.test_password = test_password;
	if (typeof hash_password !== "undefined")
		jf.hash_password = hash_password;
	var Wf = function () {};
	var Uf = function () {};
	jf.sheet_set_range_style = function (e, t, r) {
		if (!r)
			return;
		var a = typeof t == "string" ? Ar(t) : t;
		if (a.r != null && a.c != null)
			a = {
				s: a,
				e: a
			};
		var n = a.s.r,
		i = 0,
		s = "",
		o;
		function l(e) {
			if (e == "top" || e == "bottom" || e == "left" || e == "right")
				return;
			if (e == "z") {
				o.z = r.z;
				return
			}
			if (e == "alignment") {
				if (!o.s[e])
					o.s[e] = le(r[e]);
				else
					Object.keys(r[e]).forEach(function (t) {
						o.s[e][t] = r[e][t]
					});
				return
			}
			if (e == "incol") {
				if (i > a.s.c) {
					if (r["left"] === null)
						delete o.s["left"];
					else
						o.s["left"] = typeof r[e] == "object" ? le(r[e]) : r[e]
				}
				if (i < a.e.c) {
					if (r["right"] === null)
						delete o.s["right"];
					else
						o.s["right"] = typeof r[e] == "object" ? le(r[e]) : r[e]
				}
				return
			} else if (e == "inrow") {
				if (n > a.s.r) {
					if (r["top"] === null)
						delete o.s["top"];
					else
						o.s["top"] = typeof r[e] == "object" ? le(r[e]) : r[e]
				}
				if (n < a.e.r) {
					if (r["bottom"] === null)
						delete o.s["bottom"];
					else
						o.s["bottom"] = typeof r[e] == "object" ? le(r[e]) : r[e]
				}
				return
			}
			if (r[e] === null)
				delete o.s[e];
			else
				o.s[e] = typeof r[e] == "object" ? le(r[e]) : r[e]
		}
		var c = Array.isArray(e);
		for (; n <= a.e.r; ++n) {
			for (i = a.s.c; i <= a.e.c; ++i) {
				if (c) {
					if (!e[n])
						e[n] = [];
					if (!e[n][i])
						e[n][i] = {
							t: "z"
						};
					o = e[n][i]
				} else {
					s = _r({
							r: n,
							c: i
						});
					if (!e[s])
						e[s] = {
							t: "z"
						};
					o = e[s]
				}
				if (!o.s)
					o.s = {};
				Object.keys(r).forEach(l);
				if (o.s.patternType && !o.s.fgColor) {
					delete o.s.patternType;
					delete o.s.bgColor
				}
				if ((o.s.fgColor || o.s.bgColor) && (o.s.patternType || "none") == "none")
					o.s.patternType = "solid"
			}
		}
		n = a.s.r;
		if (r.top || r.top === null)
			for (i = a.s.c; i <= a.e.c; ++i) {
				if (c) {
					if (!e[n])
						continue;
					o = e[n][i]
				} else {
					s = _r({
							r: n,
							c: i
						});
					o = e[s]
				}
				if (!o)
					continue;
				if (r.top === null)
					delete o.s.top;
				else
					o.s.top = le(r.top)
			}
		n = a.e.r;
		if (r.bottom || r.bottom === null)
			for (i = a.s.c; i <= a.e.c; ++i) {
				if (c) {
					if (!e[n])
						continue;
					o = e[n][i]
				} else {
					s = _r({
							r: n,
							c: i
						});
					o = e[s]
				}
				if (!o)
					continue;
				if (r.bottom === null)
					delete o.s.bottom;
				else
					o.s.bottom = le(r.bottom)
			}
		i = a.s.c;
		if (r.left || r.left === null)
			for (n = a.s.r; n <= a.e.r; ++n) {
				if (c) {
					if (!e[n])
						continue;
					o = e[n][i]
				} else {
					s = _r({
							r: n,
							c: i
						});
					o = e[s]
				}
				if (!o)
					continue;
				if (r.left === null)
					delete o.s.left;
				else
					o.s.left = le(r.left)
			}
		i = a.e.c;
		if (r.right || r.right === null)
			for (n = a.s.r; n <= a.e.r; ++n) {
				if (c) {
					if (!e[n])
						continue;
					o = e[n][i]
				} else {
					s = _r({
							r: n,
							c: i
						});
					o = e[s]
				}
				if (!o)
					continue;
				if (r.right === null)
					delete o.s.right;
				else
					o.s.right = le(r.right)
			}
	};
	jf.apply_style_delta = function (e, t) {
		["sz", "bold", "italic", "underline", "strike", "name", "valign"].forEach(function (r) {
			var a = r;
			if (r == "bgColor")
				a = "fgColor";
			else if (r == "fgColor")
				a = "bgColor";
			if (Object.prototype.hasOwnProperty.call(t, r)) {
				if (t[r] === null)
					delete e[a];
				else if (t[r] != null)
					e[a] = t[r]
			}
		});
		["left", "right", "top", "bottom", "alignment", "protection", "color", "fgColor", "bgColor"].forEach(function (r) {
			if (Object.prototype.hasOwnProperty.call(t, r)) {
				if (t[r] === null)
					delete e[r];
				else if (t[r] != null)
					e[r] = le(t[r])
			}
		})
	};
	function $f(t, r, a, n, i) {
		if (!t.style)
			return;
		var s;
		if (t._range) {
			s = typeof t._range == "string" ? e.utils.decode_range(t._range) : t._range;
			if (a.c > s.e.c || a.c < s.s.c || a.r > s.e.r || a.r < s.s.r)
				return
		} else {}
		if (!s)
			return;
		var o = t.style.style;
		if (!o)
			return;
		e: if (o.wholeTable) {
			jf.apply_style_delta(n, o.wholeTable)
		}
		e: if (o.headerRow) {
			if (!i) {
				if (!(a.r == s.s.r))
					break e;
				if (!be(t.header))
					jf.apply_style_delta(n, o.headerRow)
			} else {
				if (!(a.r == s.s.r))
					break e;
				if (!be(t.style.colhead))
					jf.apply_style_delta(n, o.headerRow)
			}
		}
	}
	jf.get_computed_style = function (t, r) {
		if (typeof r == "string")
			r = e.utils.decode_cell(r);
		var a = Array.isArray(t) ? (t[r.r] || [])[r.c] : t[e.utils.encode_cell(r)];
		var n = le(a && a.s || {});
		if (t["!condfmt"]) {}
		if (t["!tables"]) {
			t["!tables"].forEach(function (e) {
				$f(e, t, r, n)
			})
		}
		if (t["!pivots"]) {
			t["!pivots"].forEach(function (e) {
				$f(e, t, r, n, true)
			})
		}
		return n
	};
	function Hf(e, t, r, a, n) {
		var i = true;
		var s = [],
		o = "";
		for (var l = 0; l <= e.length - 1; ++l) {
			var c = e[l];
			if (c == null)
				o = "";
			else if (c.v != null) {
				i = false;
				o = "" + Er(c, null, n);
				for (var f = 0, u = 0; f !== o.length; ++f)
					if ((u = o.charCodeAt(f)) === t || u === r || u === 34) {
						o = '"' + o.replace(Rf, '""') + '"';
						break
					}
				if (o == "ID")
					o = '"ID"'
			} else if (c.f != null && !c.F) {
				i = false;
				o = "=" + c.f;
				if (o.indexOf(",") >= 0)
					o = '"' + o.replace(Rf, '""') + '"'
			} else
				o = "";
			s.push(o)
		}
		if (n.blankrows === false && i)
			return null;
		return s.join(a)
	}
	var Xf = {};
	jf.cell_array_to_csv_row = function (e, t) {
		var r = t == null ? {}
		 : t;
		var a = r.FS !== undefined ? r.FS : ",",
		n = a.charCodeAt(0);
		var i = r.RS !== undefined ? r.RS : "\n",
		s = i.charCodeAt(0);
		var o = Xf[a] || (Xf[a] = new RegExp((a == "|" ? "\\|" : a) + "+$"));
		var l = Hf(e, n, s, a, r);
		if (r.strip)
			l = l.replace(o, "");
		return l + i
	};
	if (Date.now() > new Date(2021, 2, 15))
		throw 7262;
	(function (e) {
		e.consts = e.consts || {};
		function t(t) {
			t.forEach(function (t) {
				e.consts[t[0]] = t[1]
			})
		}
		function r(e, t, r) {
			return e[t] != null ? e[t] : e[t] = r
		}
		function a(e, t, r) {
			if (typeof t == "string") {
				if (Array.isArray(e)) {
					var n = xr(t);
					if (!e[n.r])
						e[n.r] = [];
					return e[n.r][n.c] || (e[n.r][n.c] = {
							t: "z"
						})
				}
				return e[t] || (e[t] = {
						t: "z"
					})
			}
			if (typeof t != "number")
				return a(e, _r(t));
			return a(e, _r({
					r: t,
					c: r || 0
				}))
		}
		e.sheet_get_cell = a;
		function n(e, t) {
			if (typeof t == "number") {
				if (t >= 0 && e.SheetNames.length > t)
					return t;
				throw new Error("Cannot find sheet # " + t)
			} else if (typeof t == "string") {
				var r = e.SheetNames.indexOf(t);
				if (r > -1)
					return r;
				throw new Error("Cannot find sheet name |" + t + "|")
			} else
				throw new Error("Cannot find sheet |" + t + "|")
		}
		e.book_new = function () {
			return {
				SheetNames: [],
				Sheets: {}
			}
		};
		e.book_append_sheet = function (e, t, r) {
			if (!r)
				for (var a = 1; a <= 65535; ++a)
					if (e.SheetNames.indexOf(r = "Sheet" + a) == -1)
						break;
			Kl(r);
			if (e.SheetNames.indexOf(r) >= 0)
				throw new Error("Worksheet with name |" + r + "| already exists!");
			e.SheetNames.push(r);
			e.Sheets[r] = t;
			Uf(e, t, r)
		};
		e.book_set_sheet_visibility = function (e, t, a) {
			r(e, "Workbook", {});
			r(e.Workbook, "Sheets", []);
			var i = n(e, t);
			r(e.Workbook.Sheets, i, {});
			switch (a) {
			case 0: ;
			case 1: ;
			case 2:
				break;
			default:
				throw new Error("Bad sheet visibility setting " + a);
			}
			e.Workbook.Sheets[i].Hidden = a;
			Wf(e, t, a)
		};
		t([["SHEET_VISIBLE", 0], ["SHEET_HIDDEN", 1], ["SHEET_VERY_HIDDEN", 2]]);
		e.cell_set_number_format = function (e, t) {
			e.z = t;
			return e
		};
		e.cell_set_hyperlink = function (e, t, r) {
			if (!t) {
				delete e.l;
				if (e.s && e.s.color && e.s.color.theme == 10)
					delete e.s.color
			} else {
				e.l = {
					Target: t
				};
				if (r)
					e.l.Tooltip = r;
				if (!e.s)
					e.s = {};
				e.s.color = {
					theme: 10
				}
			}
			return e
		};
		e.cell_set_internal_link = function (t, r, a) {
			return e.cell_set_hyperlink(t, "#" + r, a)
		};
		e.cell_add_comment = function (e, t, r) {
			if (!e.c)
				e.c = [];
			e.c.push({
				t: t,
				a: r || "SheetJS"
			})
		};
		e.sheet_set_array_formula = function (e, t, r) {
			var n = typeof t != "string" ? t : Ar(t);
			var i = typeof t == "string" ? t : Sr(t);
			for (var s = n.s.r; s <= n.e.r; ++s)
				for (var o = n.s.c; o <= n.e.c; ++o) {
					var l = a(e, s, o);
					l.t = "n";
					l.F = i;
					delete l.v;
					if (s == n.s.r && o == n.s.c)
						l.f = r
				}
			return e
		};
		return e
	})(jf);
	if (typeof parse_xlscfb !== "undefined")
		e.parse_xlscfb = parse_xlscfb;
	e.parse_zip = of;
	e.read = yf;
	e.readFile = wf;
	e.readFileSync = wf;
	e.write = Tf;
	e.writeFile = Ff;
	e.writeFileSync = Ff;
	e.writeFileAsync = Df;
	e.set_date_style = re;
	e.utils = jf;
	e.SSF = R;
	if (typeof CFB !== "undefined")
		e.CFB = CFB
}
if (typeof exports !== "undefined")
	make_xlsx_lib(exports);
else if (typeof module !== "undefined" && module.exports)
	make_xlsx_lib(module.exports);
else if (typeof define === "function" && define.amd)
	define(function () {
		if (!XLSX.version)
			make_xlsx_lib(XLSX);
		return XLSX
	});
else
	make_xlsx_lib(XLSX);
var XLS = XLSX, ODS = XLSX;