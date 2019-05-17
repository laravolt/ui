/*
 * @license jQuery Basictable | MIT | Jerry Low | https://www.github.com/jerrylow/basictable
 */

(function ($) {
  $.fn.basictable = function (options) {

    var setup = function (table, data) {
      var headings = [];

      if (data.tableWrap) {
        table.wrap('<div class="bt-wrapper"></div>');
      }

      // Table Header
      if (data.header) {
        var format = '';

        if (table.find('thead tr th').length) {
          format = 'thead th';
        } else if (table.find('tbody tr th').length) {
          format = 'tbody tr th';
        } else if (table.find('th').length) {
          format = 'tr:first th';
        } else {
          format = 'tr:first td';
        }

        $.each(table.find(format), function () {
          var $heading = $(this);
          var colspan = parseInt($heading.attr('colspan'), 10) || 1;
          var row = $heading.closest('tr').index();

          if (!headings[row]) {
            headings[row] = [];
          }

          for (var i = 0; i < colspan; i++) {
            headings[row].push($heading);
          }
        });
      }

      // Table Body
      $.each(table.find('tbody tr'), function () {
        setupRow($(this), headings, data);
      });

      // Table Footer
      $.each(table.find('tfoot tr'), function () {
        setupRow($(this), headings, data);
      });
    };

    var setupRow = function ($row, headings, data) {
      $row.children().each(function () {
        var $cell = $(this);

        if (($cell.html() === '' || $cell.html() === '&nbsp;') && (!data.showEmptyCells)) {
          $cell.addClass('bt-hide');
        } else {
          var cellIndex = $cell.index();

          var headingText = '';

          for (var j = 0; j < headings.length; j++) {
            if (j != 0) {
              headingText += ': ';
            }

            var $heading = headings[j][cellIndex];
            headingText += $heading.text();
          }

          $cell.attr('data-th', headingText);

          if (data.contentWrap && !$cell.children().hasClass('bt-content')) {
            $cell.wrapInner('<span class="bt-content" />');
          }
        }
      });
    };

    var unwrap = function (table) {
      $.each(table.find('td'), function () {
        var $cell = $(this);
        var content = $cell.children('.bt-content').html();
        $cell.html(content);
      });
    };

    var check = function (table, data) {
      // Only change when table is larger than parent if force
      // responsive is turned off.
      if (!data.forceResponsive) {
        if (table.removeClass('bt').outerWidth() > table.parent().width()) {
          start(table, data);
        } else {
          end(table, data);
        }
      } else {
        if ((data.breakpoint !== null && $(window).width() <= data.breakpoint) || (data.containerBreakpoint !== null && table.parent().width() <= data.containerBreakpoint)) {
          start(table, data);
        } else {
          end(table, data);
        }
      }
    };

    var start = function (table, data) {
      table.addClass('bt');

      if (!data.header) {
        table.addClass('bt--no-header');
      }

      if (data.tableWrap) {
        table.parent('.bt-wrapper').addClass('active');
      }
    };

    var end = function (table, data) {
      table.removeClass('bt bt--no-header');

      if (data.tableWrap) {
        table.parent('.bt-wrapper').removeClass('active');
      }
    };

    var destroy = function (table, data) {
      table.removeClass('bt bt--no-header');
      table.find('td').removeAttr('data-th');

      if (data.tableWrap) {
        table.unwrap();
      }

      if (data.contentWrap) {
        unwrap(table);
      }

      table.removeData('basictable');
    };

    var resize = function (table) {
      if (table.data('basictable')) {
        check(table, table.data('basictable'));
      }
    };

    // Get table.
    this.each(function () {
      var table = $(this);

      // If table has already executed.
      if (table.length === 0 || table.data('basictable')) {
        if (table.data('basictable')) {
          var data = table.data('basictable')
          // Destroy basic table.
          if (options === 'destroy') {
            destroy(table, data);
          } else if (options === 'restart') {
            destroy(table, data);
            table.data('basictable', data);
            setup(table, data);
            check(table, data);
          }
          // Start responsive mode.
          else if (options === 'start') {
            start(table, data);
          } else if (options === 'stop') {
            end(table, data);
          } else {
            check(table, data);
          }
        }
        return false;
      }

      // Extend Settings.
      var settings = $.extend({}, $.fn.basictable.defaults, options);

      var vars = {
        breakpoint: settings.breakpoint,
        containerBreakpoint: settings.containerBreakpoint,
        contentWrap: settings.contentWrap,
        forceResponsive: settings.forceResponsive,
        noResize: settings.noResize,
        tableWrap: settings.tableWrap,
        showEmptyCells: settings.showEmptyCells,
        header: settings.header
      };
      // Maintain the original functionality/defaults
      if (vars.breakpoint === null && vars.containerBreakpoint === null) {
        vars.breakpoint = 568;
      }

      // Initiate
      table.data('basictable', vars);

      setup(table, table.data('basictable'));

      if (!vars.noResize) {
        check(table, table.data('basictable'));

        $(window).bind('resize.basictable', function () {
          resize(table);
        });
      }
    });
  };

  $.fn.basictable.defaults = {
    breakpoint: null,
    containerBreakpoint: null,
    contentWrap: true,
    forceResponsive: true,
    noResize: false,
    tableWrap: false,
    showEmptyCells: false,
    header: true
  };
})(jQuery);
