$( document ).ready(function() {

    $('.document-name').each(function(){
        if($(this).next().length==0)
            $(this).css('margin-bottom','0');
    });

    $('.meeting-title').each(function(){
        if($(this).next().length==0)
            $(this).css('margin-bottom','0');
    });

    $(function () {
        $("table").each(function () {
            var trAcc = $(this).find("tr").not("tr:first-child, tr:first-child th"),
                thRows = trAcc.length,
                thHead = [];

            $(this).find("tr:first-child td, tr:first-child th").each(function () {
                headLines = $(this).text();
                thHead.push(headLines);
            });

            trAcc.each(function () {
                for (i = 0, l = thHead.length; i < l; i++) {
                    $(this).find("td").eq(i + 1).prepend("<div class=\"help-text\">" + thHead[i + 1] + "</div>");
                }
            });
        });
    });

    (function ($) {
        $.fn.responsiveTable = function() {

            var toggleColumns = function($table) {
                var selectedControls = [];
                $table.find(".accordion-btn").each(function() {
                    selectedControls.push($(this).attr("aria-expanded"));
                });
                var cellCount = 0, colCount = 0;
                var setNum = $table.find(".rtable-cell").length / Math.max($table.find(".accordion-btn").length);
                $table.find(".rtable-cell").each(function() {
                    $(this).addClass("hiddenSmall");
                    if (selectedControls[colCount] === "true") $(this).removeClass("hiddenSmall");
                        cellCount++;
                    if (cellCount % setNum === 0) colCount++;
                });
            };
            $(this).each(function(){toggleColumns($(this));});

            if ($(window).width() < 1440) {
                $(this).find(".accordion-btn").click( function() {
                    $(this).attr("aria-expanded", $(this).attr("aria-expanded") !== "true" );
                    toggleColumns($(this).parents(".rtable"));
                    $(this).parent().toggleClass('expanded');
                });
            }
            else {
                $(this).find(".accordion-btn").click( function(e){
                    e.preventDefault();
                });
            }
        };
    }(jQuery));


    $(".js-rtableAccordions").responsiveTable();

    $(window).resize(function () {

        $('.link-transform').each (function () {
            if ($(window).width() > 1439) {
                $(this).removeClass('btn btn-filled');
                $(this).addClass('link-more');
                $(this).siblings('.heading-wrapper').append(this);
            }
            else {
                $(this).removeClass('link-more');
                $(this).addClass('btn btn-filled');
                $(this).parent('.heading-wrapper').parent().append(this);
            }
        });

        $('.custom-file-label').each (function () {
            if ($(window).width() > 1439) {
                $(this).removeClass('btn-bordered');
                $(this).addClass('btn-filled');
            }
            else {
                $(this).removeClass('btn-filled');
                $(this).addClass('btn-bordered');
            }
        });

        if ($(window).width() > 1439) {
            $('.social').appendTo('.footer-top');
        }
        else {
            $('.social').prependTo('.footer-right');
        }

        jQuery.moveColumn = function (table, from, to) {
            var rows = jQuery('tr', table);
            var cols;
            rows.each(function() {
                cols = jQuery(this).children('th, td');

                if (to < cols.length)
                    cols.eq(from).detach().insertBefore(cols.eq(to));
                else
                    cols.eq(from).detach().insertAfter(cols.last());
            });
        }
        var tbl1 = jQuery('.operations-table');
        var tbl2 = jQuery('.accounts-table');
        var tbl3 = jQuery('.recent-table');
        var tbl4 = jQuery('.desktop-table');

        if ($(window).width() > 1439) {
            jQuery.moveColumn(tbl1, 1, 0);
            jQuery.moveColumn(tbl1, 2, 4);
            jQuery.moveColumn(tbl2, 1, 0);
            jQuery.moveColumn(tbl3, 1, 0);
            jQuery.moveColumn(tbl4, 1, 0);
        }
        else {
            jQuery.moveColumn(tbl1, 0, 1);
            jQuery.moveColumn(tbl1, 4, 2);
            jQuery.moveColumn(tbl2, 0, 1);
            jQuery.moveColumn(tbl3, 0, 1);
            jQuery.moveColumn(tbl4, 0, 1);
        }

    }).resize();

    $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
        if (!$(this).next().hasClass('show')) {
            $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
        }
        var $subMenu = $(this).next(".dropdown-menu");
        $subMenu.toggleClass('show');

        $(this).parents('.dropdown.show').on('hidden.bs.dropdown', function(e) {
            $('.dropdown-toggle .show').removeClass("show");
        });

        return false;
    });

    $('.nav-mobile' ).sliderMenu();

});