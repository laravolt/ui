$(function(){});var UI={init:function(){$(".ui.checkbox").checkbox(),$(".ui.dropdown:not(.tag)").dropdown({forceSelection:!1,fullTextSearch:"exact"});var e=$('[data-role="sidebar"]');if(e.length>0){new SimpleBar(e[0]);var t=$('[data-role="sidebar-visibility-switcher"]');t.length>0&&t.on("click",function(){e.parent().toggleClass("show")}),$(document).click(function(e){$("nav.sidebar").hasClass("show")&&($(e.target).closest("nav.sidebar").length||$(e.target).closest('[data-role="sidebar-visibility-switcher"]').length||$("nav.sidebar").removeClass("show"))})}$('[data-role="sidebar-accordion"]').accordion({selector:{trigger:".title:not(.empty)"}}),$("[data-role=suitable-header-searchable]").on("keypress","input[type=text]",function(e){13==e.which&&$("[data-role=suitable-form-searchable]").submit()}),$("[data-role=suitable-header-searchable] .ui.dropdown").dropdown({onChange:function(e){$("[data-role=suitable-form-searchable]").submit()}}),$(".ui.dropdown.tag").each(function(){var e=$(this).data("value").toString().split(",");1==e.length&&""==e[0]&&(e=!1),$(this).dropdown({forceSelection:!1,allowAdditions:!0,keys:{delimiter:13}}).dropdown("set selected",e)}),$('.checkbox[data-toggle="checkall"]').each(function(){var e=$(this),t=$(document).find(e.data("selector")),a=$(document).find(e.data("storage"));e.checkbox({onChecked:function(){t.checkbox("check")},onUnchecked:function(){t.checkbox("uncheck")}}),t.checkbox({fireOnInit:!0,onChange:function(){var i=e,o=!0,n=!0,r=[];t.each(function(){$(this).checkbox("is checked")?(n=!1,r.push($(this).children().first().val())):o=!1});var c=$('form[data-type="delete-multiple"]');if(c.length>0){var l=$('form[data-type="delete-multiple"]').attr("action"),d=l.lastIndexOf("/"),s=l.substr(0,d)+"/"+r.join(",");$('form[data-type="delete-multiple"]').attr("action",s)}a.length>0&&a.val(r.join(",")).trigger("change"),o?(i.checkbox("set checked"),c.find('[type="submit"]').removeClass("disabled")):n?(i.checkbox("set unchecked"),c.find('[type="submit"]').addClass("disabled")):(i.checkbox("set indeterminate"),c.find('[type="submit"]').removeClass("disabled"))}})}),key("⌘+k, ctrl+k",function(){$('[data-role="quick-switcher-modal"]').modal({onHide:function(){$('[data-role="quick-menu-searchbox"]').val("").trigger("keyup")}}).modal("show")}),$('[data-role="quick-menu-searchbox"]').on("keyup",function(e){var t=$(e.currentTarget).val();if($('[data-role="quick-menu-searchbox"]').val(t),$('[data-role="quick-menu"] .items').html(""),""==t)$('[data-role="original-menu"]').show();else{$('[data-role="original-menu"]').hide();var a=[];$('[data-role="original-menu"] a').each(function(e,t){a.push({text:$(t).html(),url:$(t).attr("href")})});var i=new Fuse(a,{tokenize:!0,threshold:.5,keys:["text"]}).search(t),o="";for(var n in i){var r=i[n];o+="<a class='title' href='"+r.url+"'>"+r.text+"</a>"}$('[data-role="quick-menu"] .items').append(o)}});var a=$('[data-role="quick-switcher-dropdown"]');$('[data-role="original-menu"] a').each(function(e,t){var i=$(t).data("parent"),o=$(t).html();i&&(o+='<div class="ui mini label right floated">'+i+"</div>");var n=$("<option>").attr("value",$(t).attr("href")).html(o);a.append(n)}),a.dropdown({fullTextSearch:!0,forceSelection:!1,selectOnKeydown:!1,match:"text",action:function(e,t){swup.loadPage({url:t})}})}};$(function(){UI.init()}),document.addEventListener("swup:contentReplaced",function(e){UI.init(),Messenger().hideAll()}),$(function(){});
