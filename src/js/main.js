$( document ).ready(function() {

    $('.document-name').each(function(){
        if($(this).next().length==0)
            $(this).css('margin-bottom','0');
    });

    $('.meeting-title').each(function(){
        if($(this).next().length==0)
            $(this).css('margin-bottom','0');
    });

    var accordionIcon = $('<svg width="17" height="11" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                          '<path d="M16 1L8.5 9L1 1" stroke="#CFD5DB" stroke-width="2"/>\n' +
                          '</svg>');
    $('.accordion-icon').append(accordionIcon.clone());

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

            if ($(window).width() < 960) {
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
        $('section').each (function () {
            var outer = $(this).find('.heading-wrapper');
            var inner = $(this).find('.link-transform');
            if ($(window).width() > 959) {
                inner.removeClass('btn btn-filled');
                inner.clone().addClass('link-more link-more-large').appendTo(outer);
                inner.hide();
            }
            else {
                inner.parent('.heading-wrapper').hide();
                inner.removeClass('link-more link-more-large');
                inner.addClass('btn btn-filled');
                inner.show();
            }
        });


        if ($(window).width() > 959) {
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

        if ($(window).width() > 959) {
            $.moveColumn(tbl1, 1, 0);
            $.moveColumn(tbl1, 2, 4);
            $.moveColumn(tbl2, 1, 0);
            $.moveColumn(tbl3, 1, 0);
            $.moveColumn(tbl4, 1, 0);
        }
        else {
            $.moveColumn(tbl1, 0, 1);
            $.moveColumn(tbl1, 4, 2);
            $.moveColumn(tbl2, 0, 1);
            $.moveColumn(tbl3, 0, 1);
            $.moveColumn(tbl4, 0, 1);
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

    $(document).on('click', '.dropdown-tab', function(){
        $('.dropdown-tab').removeClass('active');
        $('.dropdown-tab').parents('.dropdown-tabs').toggleClass('expanded');
        $(this).addClass('active');
    });

    $('.dropdown-toggle').click(function () {
        $(this).toggleAttrVal('aria-expanded', 'true', 'false');
    });
    $.fn.toggleAttrVal = function(attr, val1, val2) {
        var test = $(this).attr(attr);
        if ( test === val1) {
            $(this).attr(attr, val2);
            return this;
        }
        if ( test === val2) {
            $(this).attr(attr, val1);
            return this;
        }
        // default to val1 if neither
        $(this).attr(attr, val1);
        return this;
    };

    $('.documents-filter-title').click(function(){
        $(this).parents('.documents-filter').toggleClass('expanded');
    });


    $('select').each(function(){
        var $this = $(this), numberOfOptions = $(this).children('option').length;

        $this.addClass('select-hidden');
        $this.wrap('<div class="select"></div>');
        $this.after('<div class="select-icon"></div>');
        $this.after('<div class="select-custom"></div>');

        var $styledSelect = $this.next('div.select-custom');
        $styledSelect.text($this.children('option').eq(0).text());

        var $list = $('<ul />', {
            'class': 'select-options'
        }).insertAfter($styledSelect);

        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }

        var $listItems = $list.children('li');

        $styledSelect.click(function(e) {
            e.stopPropagation();
            $('div.select-custom.active').not(this).each(function(){
                $(this).removeClass('active').next('ul.select-options').hide();
            });
            $(this).toggleClass('active').next('ul.select-options').toggle();
        });

        $listItems.click(function(e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            $list.hide();
        });

        $(document).click(function() {
            $styledSelect.removeClass('active');
            $list.hide();
        });

    });

    var selectIcon = $('<svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
        '<path d="M20 2L11 11.3913L2 2" stroke="#706C71" stroke-width="3"/>\n' +
        '</svg>');
    $('.select-icon').append(selectIcon.clone());

});