(function(window, $){

    var Local = function() {

        var ls = localStorage;

        this.initField = function (field) {

            if (!ls[field]) {
                this.clearField(field);
            }

        };

        this.addItem = function(item, field) {

            var updatedList = this.getField(field);
                if (updatedList.length == 0) {
                    updatedList.push(item);
                    $('.highscore__info').html(item.highScore*100);
                }

                else if (

                    updatedList[0].highScore < item.highScore
                ) {
                        updatedList[0].highScore = item.highScore;
                        $('.highscore__info').html(item.highScore*100);
                }

            ls[field] = JSON.stringify(updatedList);
        };

        this.getField = function(field) {
            return JSON.parse(ls[field]);
        };

        this.clearField = function(field) {
            ls[field] = '[]';
        };

    };

    window.ls = new Local();


})(window, jQuery);