var library = (function () {
	var unixTime = function () {
		return Date.now();
	};
	var date = new Date(unixTime());
	var month = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"];
	var monthAbbr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
		"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"	];
	var dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
	var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
	return {
		TimeStamp: (function () {
			return {
				UnixTimestamp: function () {
					return Math.floor(unixTime() / 1000).toString();
				},
				UnixMillisecond: function () {
					return unixTime().toString();
				}
			}
		})(),
		Local: (function () {
			return {
				Time: (function () {
					return {
						WithSeconds: function () {
							return library.Hour.TwelveHour() + ":" + library.Minute.DblDigit() + ":" + library.Second.DblDigit() + " " + library.Hour.AMPM.UpperCase();
						},
						WithOutSeconds: function () {
							return library.Hour.TwelveHour() + ":" + library.Minute.DblDigit() + " " + library.Hour.AMPM.UpperCase();
						}
					}
				})(),
				MDY: (function () {
					return {
						Numeral: function () {
							return library.Month.MonthNumber() + "/" + library.Month.DateOfMonth.Numeral() + "/" + library.Year.YearFull();
						},
						Name: function () {
							return library.Month.CurrentMonth() + " " + library.Month.DateOfMonth.Numeral() + ", " + library.Year.YearFull();
						}
					}
				})(),
			}
		})(),
		Second: (function () {
			return {
				Second: function () {
					return date.getSeconds().toString();
				},
				DblDigit: function () {
					if (date.getSeconds() <= 10) { return "0" + date.getSeconds().toString() }
					else { return date.getSeconds().toString() };
				}
			}
		})(),
		Minute: (function () {
			return {
				Minute: function () {
					return date.getMinutes().toString();
				},
				DblDigit: function () {
					if (date.getMinutes() <= 10) { return "0" + date.getMinutes().toString() }
					else { return date.getMinutes().toString() };
				}
			}
		})(),
		Hour: (function () {
			return {
				TwentyFourHour: function () {
					return date.getHours().toString();
				},
				TwelveHour: function () {
					return ((date.getHours() + 11) % 12 + 1).toString();
				},
				AMPM: (function () {
					return {
						UpperCase: function () {
							if (date.getHours() >= 12) { return "PM" }
							else { return "AM" };
						},
						LowerCase: function () {
							if (date.getHours() >= 12) { return "pm" }
							else { return "am" };
						}
					}
				})()
			}
		})(),
		Week: (function () {
			return {
				DayOfWeek: function () {
					return weekDays[date.getDay()].toString();
				},
				AbrDayOfWeek: function () {
					return weekDays[date.getDay()].toString().substring(0, 3);
				},
				FirstTwoOfWeek: function () {
					return weekDays[date.getDay()].toString().substring(0, 2);
				},
				WeekOfYear: function () {

					return (Math.ceil((date.getDate() + dayCount[date.getMonth()]) / 7) + 1).toString();
				}
			}
		})(),
		Month: (function () {
			return {
				DateOfMonth: (function () {
					return {
						Numeral: function () {
							return date.getDate().toString();
						},
						Ordinal: function () {
							if (date.getDate() > 3 && date.getDate() < 21) return date.getDate() + 'th';
							switch (date.getDate() % 10) {
								case 1: return date.getDate() + "st";
								case 2: return date.getDate() + "nd";
								case 3: return date.getDate() + "rd";
								default: return date.getDate() + "th";
							}
						},
						DateDblDigit: function () {
							if ((date.getDate() + 1).toString().length < 2) {
								return "0" + (date.getDate() + 1).toString();
							}
							else {
								return date.getDate().toString();
							}
						}
					}
				})(),
				MonthNumber: function () {
					return (date.getMonth() + 1).toString();
				},
				MonthNumberDblDigit: function () {
					if ((date.getMonth() + 1).toString().length < 2) {
						return "0" + (date.getMonth() + 1).toString();
					}
				},
				AbrOfCurrentMonth: function () {

					return monthAbbr[date.getMonth()];
				},
				CurrentMonth: function () {

					return month[date.getMonth()];
				}
			}
		})(),
		Year: (function () {
			return {
				DayOfYear: (function () {
					return {
						Numeral: function () {
							return (date.getDate() + dayCount[date.getMonth()]).toString();
						},
						Ordinal: function () {
							if ((date.getDate() + dayCount[date.getMonth()]) > 3 && (date.getDate() + dayCount[date.getMonth()]) < 101 ||
								(date.getDate() + dayCount[date.getMonth()]) > 103 && (date.getDate() + dayCount[date.getMonth()]) < 201 ||
								(date.getDate() + dayCount[date.getMonth()]) > 203 && (date.getDate() + dayCount[date.getMonth()]) < 301 ||
								(date.getDate() + dayCount[date.getMonth()]) > 303 && (date.getDate() + dayCount[date.getMonth()]) < 400) return (date.getDate() + dayCount[date.getMonth()]).toString() + 'th';
							switch (date.getDate() % 10) {
								case 1: return (date.getDate() + dayCount[date.getMonth()]).toString() + "st";
								case 2: return (date.getDate() + dayCount[date.getMonth()]).toString() + "nd";
								case 3: return (date.getDate() + dayCount[date.getMonth()]).toString() + "rd";
								default: return (date.getDate() + dayCount[date.getMonth()]).toString() + "th";
							}
						}
					}
				})(),
				YearFull: function () {
					return date.getFullYear().toString();
				},
				YearAbr: function () {
					return date.getFullYear().toString().slice(-2);
				}
			}
		})(),
		Defaults: function () {
			return library.Year.YearFull() + "-" + library.Month.MonthNumberDblDigit() + "-" + library.Month.DateOfMonth.DateDblDigit() + "T" + library.Hour.TwentyFourHour() + ":" + library.Minute.DblDigit() + ":" + library.Second.DblDigit();
		}
	}
})();