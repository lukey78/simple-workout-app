/**
 *
 *
 * @author Jens Hassler
 * @since  01/2016
 */

var audio = {
    nasa: "NASA_countdown_10sec.mp3",
    pumper: "pumper-1-8.mp3",
    elevator: "elevator_20sec.mp3"
};

for (var path in audio){
    if (audio.hasOwnProperty(path)){
        audio[path] = new Audio('sound/'+audio[path]);
    }
}

workouts.push(
    {
        name: "Leistungstest",
        description: "Web Solutions  Leistungstest",
        exercises: [
            {
                exercise: "GET READY!",
                duration: 10,
                audio: audio.nasa
            },
            {
                exercise: "Pushups",
                duration: 120,
                audio: audio.pumper,
                restartEvery: 30
            },
            {
                exercise: "Pause",
                duration: 20,
                audio: audio.elevator
            },
            {
                exercise: "Pullups",
                duration: 60,
                audio: audio.pumper,
                restartEvery: 30
            },
            {
                exercise: "Pause",
                duration: 20,
                audio: audio.elevator
            },
            {
                exercise: "Dips",
                duration: 60,
                audio: audio.pumper,
                restartEvery: 30
            },
            {
                exercise: "Pause",
                duration: 20,
                audio: audio.elevator
            },
            {
                exercise: "Burpees",
                duration: 120,
                audio: audio.pumper,
                restartEvery: 30
            }
        ]
    }
);