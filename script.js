let main = {
  variables: {
    turn: 'w',
    selectedpiece: '',
    highlighted: [],
    pieces: {
      w_king: { position: '5_1', img: '&#9812;', captured: false, moved: false, type: 'w_king' },
      w_queen: { position: '4_1', img: '&#9813;', captured: false, moved: false, type: 'w_queen' },
      w_bishop1: { position: '3_1', img: '&#9815;', captured: false, moved: false, type: 'w_bishop' },
      w_bishop2: { position: '6_1', img: '&#9815;', captured: false, moved: false, type: 'w_bishop' },
      w_knight1: { position: '2_1', img: '&#9816;', captured: false, moved: false, type: 'w_knight' },
      w_knight2: { position: '7_1', img: '&#9816;', captured: false, moved: false, type: 'w_knight' },
      w_rook1: { position: '1_1', img: '&#9814;', captured: false, moved: false, type: 'w_rook' },
      w_rook2: { position: '8_1', img: '&#9814;', captured: false, moved: false, type: 'w_rook' },
      w_pawn1: { position: '1_2', img: '&#9817;', captured: false, type: 'w_pawn', moved: false },
      w_pawn2: { position: '2_2', img: '&#9817;', captured: false, type: 'w_pawn', moved: false },
      w_pawn3: { position: '3_2', img: '&#9817;', captured: false, type: 'w_pawn', moved: false },
      w_pawn4: { position: '4_2', img: '&#9817;', captured: false, type: 'w_pawn', moved: false },
      w_pawn5: { position: '5_2', img: '&#9817;', captured: false, type: 'w_pawn', moved: false },
      w_pawn6: { position: '6_2', img: '&#9817;', captured: false, type: 'w_pawn', moved: false },
      w_pawn7: { position: '7_2', img: '&#9817;', captured: false, type: 'w_pawn', moved: false },
      w_pawn8: { position: '8_2', img: '&#9817;', captured: false, type: 'w_pawn', moved: false },
      b_king: { position: '5_8', img: '&#9818;', captured: false, moved: false, type: 'b_king' },
      b_queen: { position: '4_8', img: '&#9819;', captured: false, moved: false, type: 'b_queen' },
      b_bishop1: { position: '3_8', img: '&#9821;', captured: false, moved: false, type: 'b_bishop' },
      b_bishop2: { position: '6_8', img: '&#9821;', captured: false, moved: false, type: 'b_bishop' },
      b_knight1: { position: '2_8', img: '&#9822;', captured: false, moved: false, type: 'b_knight' },
      b_knight2: { position: '7_8', img: '&#9822;', captured: false, moved: false, type: 'b_knight' },
      b_rook1: { position: '1_8', img: '&#9820;', captured: false, moved: false, type: 'b_rook' },
      b_rook2: { position: '8_8', img: '&#9820;', captured: false, moved: false, type: 'b_rook' },
      b_pawn1: { position: '1_7', img: '&#9823;', captured: false, type: 'b_pawn', moved: false },
      b_pawn2: { position: '2_7', img: '&#9823;', captured: false, type: 'b_pawn', moved: false },
      b_pawn3: { position: '3_7', img: '&#9823;', captured: false, type: 'b_pawn', moved: false },
      b_pawn4: { position: '4_7', img: '&#9823;', captured: false, type: 'b_pawn', moved: false },
      b_pawn5: { position: '5_7', img: '&#9823;', captured: false, type: 'b_pawn', moved: false },
      b_pawn6: { position: '6_7', img: '&#9823;', captured: false, type: 'b_pawn', moved: false },
      b_pawn7: { position: '7_7', img: '&#9823;', captured: false, type: 'b_pawn', moved: false },
      b_pawn8: { position: '8_7', img: '&#9823;', captured: false, type: 'b_pawn', moved: false }
    }
  },

  methods: {
    gamesetup: function() {
      $('.gamecell').attr('chess', 'null');
      for (let gamepiece in main.variables.pieces) {
        let position = main.variables.pieces[gamepiece].position;
        $('#' + position).html(main.variables.pieces[gamepiece].img);
        $('#' + position).attr('chess', gamepiece);
      }
    },

    moveoptions: function(selectedpiece) {
      let position = { x: '', y: '' };
      position.x = main.variables.pieces[selectedpiece].position.split('_')[0];
      position.y = main.variables.pieces[selectedpiece].position.split('_')[1];

      var options = [];
      var coordinates = [];
      var startpoint = main.variables.pieces[selectedpiece].position;

      if (main.variables.highlighted.length != 0) {
        main.methods.togglehighlight(main.variables.highlighted);
      }

      switch (main.variables.pieces[selectedpiece].type) {
        case 'w_king':
        case 'b_king':
          coordinates = main.methods.getKingMoves(position);
          break;
        case 'w_queen':
        case 'b_queen':
          coordinates = main.methods.getQueenMoves(position);
          break;
        case 'w_bishop':
        case 'b_bishop':
          coordinates = main.methods.getBishopMoves(position);
          break;
        case 'w_knight':
        case 'b_knight':
          coordinates = main.methods.getKnightMoves(position);
          break;
        case 'w_rook':
        case 'b_rook':
          coordinates = main.methods.getRookMoves(position);
          break;
        case 'w_pawn':
        case 'b_pawn':
          coordinates = main.methods.getPawnMoves(position, selectedpiece);
          break;
      }

      options = main.methods.options(startpoint, coordinates, main.variables.pieces[selectedpiece].type).slice(0);
      main.variables.highlighted = options.slice(0);
      main.methods.togglehighlight(options);
    },

    options: function(startpoint, coordinates, piecetype) {
      coordinates = coordinates.filter(val => {
        let pos = { x: 0, y: 0 };
        pos.x = parseInt(val.split('_')[0]);
        pos.y = parseInt(val.split('_')[1]);

        return !(pos.x < 1) && !(pos.x > 8) && !(pos.y < 1) && !(pos.y > 8);
      });

      switch (piecetype) {
        case 'w_king':
        case 'b_king':
        case 'w_knight':
        case 'b_knight':
          coordinates = coordinates.filter(val => {
            return $('#' + val).attr('chess') == 'null' || $('#' + val).attr('chess').slice(0, 1) != main.variables.turn;
          });
          break;
        case 'w_pawn':
        case 'b_pawn':
          coordinates = main.methods.filterPawnMoves(startpoint, coordinates, piecetype);
          break;
        default:
          coordinates = main.methods.filterLineOfSightMoves(coordinates);
      }

      return coordinates;
    },

    getKingMoves: function(position) {
      return [
        { x: 1, y: 1 }, { x: 1, y: 0 }, { x: 1, y: -1 },
        { x: 0, y: -1 }, { x: -1, y: -1 }, { x: -1, y: 0 },
        { x: -1, y: 1 }, { x: 0, y: 1 }
      ].map(val => {
        return (parseInt(position.x) + parseInt(val.x)) + '_' + (parseInt(position.y) + parseInt(val.y));
      });
    },

    getQueenMoves: function(position) {
      return main.methods.getRookMoves(position).concat(main.methods.getBishopMoves(position));
    },

    getRookMoves: function(position) {
      var c1 = main.methods.lineMoves(position, [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 7, y: 0 }]);
      var c2 = main.methods.lineMoves(position, [{ x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }, { x: 0, y: 4 }, { x: 0, y: 5 }, { x: 0, y: 6 }, { x: 0, y: 7 }]);
      var c3 = main.methods.lineMoves(position, [{ x: -1, y: 0 }, { x: -2, y: 0 }, { x: -3, y: 0 }, { x: -4, y: 0 }, { x: -5, y: 0 }, { x: -6, y: 0 }, { x: -7, y: 0 }]);
      var c4 = main.methods.lineMoves(position, [{ x: 0, y: -1 }, { x: 0, y: -2 }, { x: 0, y: -3 }, { x: 0, y: -4 }, { x: 0, y: -5 }, { x: 0, y: -6 }, { x: 0, y: -7 }]);

      return c1.concat(c2).concat(c3).concat(c4);
    },

    getBishopMoves: function(position) {
      var c1 = main.methods.lineMoves(position, [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 4 }, { x: 5, y: 5 }, { x: 6, y: 6 }, { x: 7, y: 7 }]);
      var c2 = main.methods.lineMoves(position, [{ x: 1, y: -1 }, { x: 2, y: -2 }, { x: 3, y: -3 }, { x: 4, y: -4 }, { x: 5, y: -5 }, { x: 6, y: -6 }, { x: 7, y: -7 }]);
      var c3 = main.methods.lineMoves(position, [{ x: -1, y: 1 }, { x: -2, y: 2 }, { x: -3, y: 3 }, { x: -4, y: 4 }, { x: -5, y: 5 }, { x: -6, y: 6 }, { x: -7, y: 7 }]);
      var c4 = main.methods.lineMoves(position, [{ x: -1, y: -1 }, { x: -2, y: -2 }, { x: -3, y: -3 }, { x: -4, y: -4 }, { x: -5, y: -5 }, { x: -6, y: -6 }, { x: -7, y: -7 }]);

      return c1.concat(c2).concat(c3).concat(c4);
    },

    getKnightMoves: function(position) {
      return [
        { x: -1, y: 2 }, { x: 1, y: 2 }, { x: 1, y: -2 }, { x: -1, y: -2 },
        { x: 2, y: 1 }, { x: 2, y: -1 }, { x: -2, y: -1 }, { x: -2, y: 1 }
      ].map(val => {
        return (parseInt(position.x) + parseInt(val.x)) + '_' + (parseInt(position.y) + parseInt(val.y));
      });
    },

    getPawnMoves: function(position, selectedpiece) {
      var coordinates;
      if (main.variables.pieces[selectedpiece].type.startsWith('w')) {
        coordinates = [{ x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 1 }, { x: -1, y: 1 }];
      } else {
        coordinates = [{ x: 0, y: -1 }, { x: 0, y: -2 }, { x: 1, y: -1 }, { x: -1, y: -1 }];
      }
      return coordinates.map(val => {
        return (parseInt(position.x) + parseInt(val.x)) + '_' + (parseInt(position.y) + parseInt(val.y));
      });
    },

    filterPawnMoves: function(startpoint, coordinates, piecetype) {
      return coordinates.filter(val => {
        let sp = { x: 0, y: 0 };
        let coordinate = val.split('_');

        sp.x = startpoint.split('_')[0];
        sp.y = startpoint.split('_')[1];

        if (coordinate[0] < sp.x || coordinate[0] > sp.x) {
          return $('#' + val).attr('chess') != 'null' && $('#' + val).attr('chess').slice(0, 1) != main.variables.turn;
        } else {
          if (piecetype == 'w_pawn' && coordinate[1] == (parseInt(sp.y) + 2) && $('#' + sp.x + '_' + (parseInt(sp.y) + 1)).attr('chess') != 'null') {
          } else if (piecetype == 'b_pawn' && coordinate[1] == (parseInt(sp.y) - 2) && $('#' + sp.x + '_' + (parseInt(sp.y) - 1)).attr('chess') != 'null') {
          } else {
            return $('#' + val).attr('chess') == 'null';
          }
        }
      });
    },

    filterLineOfSightMoves: function(coordinates) {
      let flag = false;
      return coordinates.filter(val => {
        if (!flag) {
          if ($('#' + val).attr('chess') == 'null') {
            return val;
          } else if ($('#' + val).attr('chess').slice(0, 1) != main.variables.turn) {
            flag = true;
            return val;
          } else {
            flag = true;
          }
        }
      });
    },

    lineMoves: function(position, deltas) {
      let flag = false;
      return deltas.map(val => {
        return (parseInt(position.x) + parseInt(val.x)) + '_' + (parseInt(position.y) + parseInt(val.y));
      }).filter(val => {
        let pos = { x: 0, y: 0 };
        pos.x = parseInt(val.split('_')[0]);
        pos.y = parseInt(val.split('_')[1]);

        return !(pos.x < 1) && !(pos.x > 8) && !(pos.y < 1) && !(pos.y > 8);
      }).filter(val => {
        if (!flag) {
          if ($('#' + val).attr('chess') == 'null') {
            return val;
          } else if ($('#' + val).attr('chess').slice(0, 1) != main.variables.turn) {
            flag = true;
            return val;
          } else {
            flag = true;
          }
        }
      });
    },

    capture: function(target) {
      let selectedpiece = {
        name: $('#' + main.variables.selectedpiece).attr('chess'),
        id: main.variables.selectedpiece
      };

      $('#' + target.id).html(main.variables.pieces[selectedpiece.name].img);
      $('#' + target.id).attr('chess', selectedpiece.name);
      $('#' + selectedpiece.id).html('');
      $('#' + selectedpiece.id).attr('chess', 'null');
      main.variables.pieces[selectedpiece.name].position = target.id;
      main.variables.pieces[selectedpiece.name].moved = true;
      main.variables.pieces[target.name].captured = true;
    },

    move: function(target) {
      let selectedpiece = $('#' + main.variables.selectedpiece).attr('chess');
      $('#' + target.id).html(main.variables.pieces[selectedpiece].img);
      $('#' + target.id).attr('chess', selectedpiece);
      $('#' + main.variables.selectedpiece).html('');
      $('#' + main.variables.selectedpiece).attr('chess', 'null');
      main.variables.pieces[selectedpiece].position = target.id;
      main.variables.pieces[selectedpiece].moved = true;
    },

    endturn: function() {
      if (main.variables.turn == 'w') {
        main.variables.turn = 'b';
        main.methods.togglehighlight(main.variables.highlighted);
        main.variables.highlighted.length = 0;
        main.variables.selectedpiece = '';
        $('#turn').html("It's Blacks Turn").addClass('turnhighlight');
        window.setTimeout(function() {
          $('#turn').removeClass('turnhighlight');
        }, 1500);
      } else {
        main.variables.turn = 'w';
        main.methods.togglehighlight(main.variables.highlighted);
        main.variables.highlighted.length = 0;
        main.variables.selectedpiece = '';
        $('#turn').html("It's Whites Turn").addClass('turnhighlight');
        window.setTimeout(function() {
          $('#turn').removeClass('turnhighlight');
        }, 1500);
      }
    },

    togglehighlight: function(options) {
      options.forEach(function(element) {
        $('#' + element).toggleClass("green shake-little neongreen_txt");
      });
    },
  }
};

$(document).ready(function() {
  main.methods.gamesetup();

  $('.gamecell').click(function(e) {
    var selectedpiece = {
      name: '',
      id: main.variables.selectedpiece
    };

    if (main.variables.selectedpiece == '') {
      selectedpiece.name = $('#' + e.target.id).attr('chess');
    } else {
      selectedpiece.name = $('#' + main.variables.selectedpiece).attr('chess');
    }

    var target = {
      name: $(this).attr('chess'),
      id: e.target.id
    };

    if (main.variables.selectedpiece == '' && target.name.slice(0, 1) == main.variables.turn) {
      main.variables.selectedpiece = e.target.id;
      main.methods.moveoptions($(this).attr('chess'));
    } else if (main.variables.selectedpiece != '' && target.name == 'null') {
      if (main.variables.highlighted.includes(target.id)) {
        main.methods.move(target);
        main.methods.endturn();
      }
    } else if (main.variables.selectedpiece != '' && target.name.slice(0, 1) != main.variables.turn) {
      if (main.variables.highlighted.includes(target.id)) {
        main.methods.capture(target);
        main.methods.endturn();
      }
    }
  });
});
