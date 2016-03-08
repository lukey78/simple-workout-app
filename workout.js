/**
 *
 *
 * @author Jens Hassler
 * @since  01/2016
 */

workouts = new Array();
timerId = null;
currentExercise = null;
currentExerciseNr = -1;
currentTimer = 0;

$(function() {
    $('.startbutton').click(function() {
       startWorkout(workouts[0]);
    });
});

function startWorkout(workout) {
    console.log("starting workout");

    $('.startbutton').hide();

    createDomElementsForWorkout(workout);

    if (timerId) {
        window.clearInterval(timerId);
    }

    nextExercise(workout);

    $('.progress').show();

    timerId = window.setInterval(function() {
        workoutIteration(currentExercise);
        currentTimer--;

        if (currentTimer === 0)  {
            nextExercise(workout);
        }
    }, 1000);
}

function nextExercise(workout) {
    currentExerciseNr++;
    if (currentExerciseNr == workout.exercises.length) {
        finishWorkout();
    }
    currentExercise = workout.exercises[currentExerciseNr];
    currentTimer = currentExercise.duration;

    $('.exercise').removeClass('current-exercise');
    $('[data-nr=' + currentExerciseNr + ']').addClass('current-exercise');

    console.log("starting next exercise");
    console.log(currentExercise);
}

function workoutIteration(exercise) {
    var remainingTime = secondsAsTime(currentTimer);
    $('.timer').html(remainingTime);
    var progressbar = $('.progress-bar');
    progressbar.attr('aria-valuenow', currentTimer);
    progressbar.attr('aria-valuemax', exercise.duration);
    progressbar.css('width', currentTimer*100/exercise.duration + '%');
    progressbar.html(remainingTime);
}


function str_pad_left(string,pad,length) {
    return (new Array(length+1).join(pad)+string).slice(-length);
}

// convert seconds to minute:seconds format
function secondsAsTime(givenSeconds) {
    var minutes = Math.floor(givenSeconds / 60);
    var seconds = givenSeconds - (minutes * 60);
    var finalTime = minutes.toString() + ':' + str_pad_left(seconds,'0',2);
    return finalTime;
}

function finishWorkout() {
    if (timerId) {
        window.clearInterval(timerId);
    }
    $('.startbutton').show();
    $('.progress').hide();
    $('.exercise').removeClass('current-exercise');

    console.log("workout finished");
}

function createDomElementsForWorkout(workout) {
    var n = 0;
    var t=0;
    $('.current_workout').empty();
    workout.exercises.forEach(function(exercise) {
        $('.current_workout').append('<div class="exercise" data-nr="' + n + '" data-duration="' + exercise.duration + '">' + exercise.exercise + ' (' + secondsAsTime(exercise.duration) + ')' + '</div>' );
        var times = 1;
        if (exercise.restartEvery){
            times = Math.round(exercise.duration/exercise.restartEvery);
        }
        for (var j=0;j<times;j++){
            var x = exercise.restartEvery || 0;
            setTimeout(function(){
                if (x){
                    //using an ugly workaround to assert that the audio can be restarted again, even if it is slightly longer, by adapting the playback rate
                    exercise.audio.playbackRate = (exercise.audio.duration+0.1)/x;
                }
                exercise.audio.play();
            },(t+1+j*x)*1000);
        }
        t+=exercise.duration;
        n++;
    });
}