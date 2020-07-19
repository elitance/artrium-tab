// Variables of: 'background.js'

Date.prototype.getWeek=function(){var e=new Date(this.getTime());e.setHours(0,0,0,0),e.setDate(e.getDate()+3-(e.getDay()+6)%7);var t=new Date(e.getFullYear(),0,4);return 1+Math.round(((e.getTime()-t.getTime())/864e5-3+(t.getDay()+6)%7)/7)};const body=document.querySelector("body"),date=new Date,week=date.getWeek();let random=Math.floor(10*Math.random());const dateQuery={citys:{0:"australia",1:"uk",2:"france",3:"us",4:"canada",5:"italy",6:"ireland",7:"russia",8:"swiss",9:"landscape"},arts:{0:"interior",1:"nature",2:"business",3:"minimal",4:"architecture",5:"sustainability",6:"textures",7:"technology",8:"music",9:"car"}},accessCode="3CVHz8RtTUrydWpPKmbmNGlOBnZ4zxn6k2YvNn-bjPw";let query;

// Variables of: 'bookmark.js'

const bkList=document.querySelector("#bkList"),crtBkTab=document.querySelector("#crtBk");let bkArr=[],crtBkCnl=!1,crtBkMnl=!1;

// Variables of: 'init.js'

const mobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,PREF_JSON=JSON.parse(localStorage.getItem("pref"));

// Variables of: 'search.js'

const searchForm=document.querySelector("#search"),searchInput=searchForm.querySelector("input");

// Variables of: 'theme.js'

const cssLink = document.querySelector("link");