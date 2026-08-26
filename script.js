const exerciseLibrary = {
  "Bodyweight only": {
    beginner: [
      ["Bodyweight squat", "Legs"], ["Incline push-up", "Chest"], ["Glute bridge", "Legs"],
      ["Prone back extension", "Back"], ["Dead bug", "Core"], ["Reverse lunge", "Legs"],
      ["Knee push-up", "Chest"], ["Bird dog", "Core"], ["Mountain climber", "Fitness"],
      ["Jumping jack", "Fitness"], ["Plank", "Core"], ["Calf raise", "Legs"]
    ],
    intermediate: [
      ["Jump squat", "Legs"], ["Push-up", "Chest"], ["Single-leg glute bridge", "Legs"],
      ["Pike push-up", "Shoulders"], ["Superman hold", "Back"], ["Walking lunge", "Legs"],
      ["Diamond push-up", "Arms"], ["Bicycle crunch", "Core"], ["High knees", "Fitness"],
      ["Burpee", "Fitness"], ["Side plank", "Core"], ["Bear crawl", "Core"]
    ],
    advanced: [
      ["Pistol squat to chair", "Legs"], ["Decline push-up", "Chest"], ["Bulgarian split squat", "Legs"],
      ["Handstand hold", "Shoulders"], ["Back widow", "Back"], ["Jumping lunge", "Legs"],
      ["Close-grip push-up", "Arms"], ["V-up", "Core"], ["Burpee", "Fitness"],
      ["Mountain climber sprint", "Fitness"], ["Plank shoulder tap", "Core"], ["Tuck jump", "Legs"]
    ]
  },
  "Dumbbells": {
    beginner: [
      ["Goblet squat", "Legs"], ["Dumbbell floor press", "Chest"], ["One-arm dumbbell row", "Back"],
      ["Dumbbell Romanian deadlift", "Legs"], ["Seated shoulder press", "Shoulders"], ["Dumbbell curl", "Arms"],
      ["Glute bridge", "Legs"], ["Dead bug", "Core"], ["Farmer carry", "Core"],
      ["Reverse lunge", "Legs"], ["Lateral raise", "Shoulders"], ["Jumping jack", "Fitness"]
    ],
    intermediate: [
      ["Dumbbell front squat", "Legs"], ["Dumbbell bench press", "Chest"], ["Bent-over dumbbell row", "Back"],
      ["Dumbbell Romanian deadlift", "Legs"], ["Arnold press", "Shoulders"], ["Hammer curl", "Arms"],
      ["Dumbbell step-up", "Legs"], ["Weighted Russian twist", "Core"], ["Dumbbell thruster", "Fitness"],
      ["Bulgarian split squat", "Legs"], ["Dumbbell pullover", "Back"], ["Renegade row", "Core"]
    ],
    advanced: [
      ["Double dumbbell squat", "Legs"], ["Alternating bench press", "Chest"], ["Renegade row", "Back"],
      ["Single-leg Romanian deadlift", "Legs"], ["Push press", "Shoulders"], ["Zottman curl", "Arms"],
      ["Weighted Bulgarian split squat", "Legs"], ["Dumbbell windmill", "Core"], ["Devil press", "Fitness"],
      ["Dumbbell clean", "Fitness"], ["Dumbbell pullover", "Back"], ["Weighted sit-up", "Core"]
    ]
  },
  "Full gym": {
    beginner: [
      ["Leg press", "Legs"], ["Machine chest press", "Chest"], ["Lat pulldown", "Back"],
      ["Seated leg curl", "Legs"], ["Machine shoulder press", "Shoulders"], ["Cable row", "Back"],
      ["Cable curl", "Arms"], ["Plank", "Core"], ["Treadmill walk", "Fitness"],
      ["Leg extension", "Legs"], ["Triceps pressdown", "Arms"], ["Calf raise", "Legs"]
    ],
    intermediate: [
      ["Back squat", "Legs"], ["Barbell bench press", "Chest"], ["Lat pulldown", "Back"],
      ["Romanian deadlift", "Legs"], ["Seated cable row", "Back"], ["Dumbbell shoulder press", "Shoulders"],
      ["Cable curl", "Arms"], ["Cable crunch", "Core"], ["Rower intervals", "Fitness"],
      ["Walking lunge", "Legs"], ["Triceps pressdown", "Arms"], ["Face pull", "Shoulders"]
    ],
    advanced: [
      ["Front squat", "Legs"], ["Incline barbell bench press", "Chest"], ["Weighted pull-up", "Back"],
      ["Barbell Romanian deadlift", "Legs"], ["Pendlay row", "Back"], ["Standing overhead press", "Shoulders"],
      ["EZ-bar curl", "Arms"], ["Hanging leg raise", "Core"], ["Assault bike intervals", "Fitness"],
      ["Barbell hip thrust", "Legs"], ["Weighted dip", "Chest"], ["Cable woodchop", "Core"]
    ]
  }
};

const settings = {
  "General fitness": { reps: "10–12", rest: "60 seconds", focus: ["Fitness", "Core", "Legs", "Chest", "Back", "Shoulders", "Arms"] },
  "Build strength": { reps: "5–8", rest: "2 minutes", focus: ["Legs", "Chest", "Back", "Shoulders", "Core", "Arms", "Fitness"] },
  "Build muscle": { reps: "8–12", rest: "90 seconds", focus: ["Chest", "Back", "Legs", "Shoulders", "Arms", "Core", "Fitness"] },
  "Improve endurance": { reps: "12–15", rest: "30–45 seconds", focus: ["Fitness", "Legs", "Core", "Chest", "Back", "Shoulders", "Arms"] }
};

const form = document.querySelector("#plan-form");

function numberFrom(text) {
  return Number(text.match(/\d+/)[0]);
}

function chooseExercises(pool, focus, count, offset) {
  const ordered = [...pool].sort((a, b) => focus.indexOf(a[1]) - focus.indexOf(b[1]));
  const rotated = [...ordered.slice(offset), ...ordered.slice(0, offset)];
  return rotated.slice(0, count);
}

function groupFor(muscle) {
  if (["Chest", "Back", "Shoulders", "Arms"].includes(muscle)) return "upper";
  if (muscle === "Legs") return "lower";
  if (muscle === "Core") return "core";
  return "cardio";
}

function createPlan(event) {
  event.preventDefault();

  const goal = document.querySelector("#goal").value;
  const levelLabel = document.querySelector("#level").value;
  const equipment = document.querySelector("#equipment").value;
  const days = numberFrom(document.querySelector("#days").value);
  const minutes = numberFrom(document.querySelector("#time").value);
  const level = levelLabel.toLowerCase();
  const sets = level === "beginner" ? 2 : level === "intermediate" ? 3 : 4;
  const exercisesPerDay = minutes === 30 ? 4 : minutes === 45 ? 5 : 6;
  const planSettings = settings[goal];
  const pool = exerciseLibrary[equipment][level];
  const dayNames = days === 2 ? ["Full Body A", "Full Body B"] : days === 3 ? ["Full Body A", "Upper & Core", "Full Body B"] : ["Upper Body", "Lower Body", "Upper Body", "Lower & Core"];
  const workouts = [];

  for (let day = 0; day < days; day += 1) {
    const chosen = chooseExercises(pool, planSettings.focus, exercisesPerDay, day * exercisesPerDay);
    workouts.push(chosen);
  }

  const flatExercises = workouts.flat();
  const totalExercises = flatExercises.length;
  const effort = level === "beginner" ? "Easy" : level === "intermediate" ? "Moderate" : "Hard";
  const equipmentName = equipment === "Bodyweight only" ? "bodyweight" : equipment.toLowerCase();

  document.querySelector("#plan-title").textContent = `Your ${days}-day ${equipmentName} workout`;
  document.querySelector("#plan-description").textContent = `${goal} plan for a ${level} trainee. Allow recovery between sessions and rest for ${planSettings.rest} between sets.`;
  document.querySelector("#overview-title").textContent = `A ${level} plan for ${goal.toLowerCase()}`;
  document.querySelector("#summary-grid").innerHTML = `
    <div><b>${days}</b><span>days each week</span></div>
    <div><b>${minutes}</b><span>minutes per session</span></div>
    <div><b>${totalExercises}</b><span>exercises in total</span></div>
    <div><b>${effort}</b><span>${level} level</span></div>`;

  document.querySelector("#workout-grid").innerHTML = workouts.map((workout, day) => `
    <article class="workout-card">
      <header><span>Day ${day + 1}</span><h3>${dayNames[day]}</h3></header>
      <ol>${workout.map(([name, muscle]) => {
        const target = muscle === "Fitness" ? `${sets} × ${minutes === 30 ? 30 : 40} sec` : `${sets} × ${planSettings.reps}`;
        return `<li><div><strong>${name}</strong><small>${muscle}</small></div><b>${target}</b></li>`;
      }).join("")}</ol>
    </article>`).join("");

  updateCharts(flatExercises, sets, days);

  const feedback = {
    "General fitness": "This routine covers the main muscle groups and includes conditioning. Keep the pace controlled and aim to complete every session.",
    "Build strength": "Use a challenging variation or weight while keeping good technique. When every set feels comfortable, increase the difficulty slightly.",
    "Build muscle": "Finish each set with only a few good repetitions left. Add a small amount of weight or extra repetitions as you improve.",
    "Improve endurance": "Keep rest periods short but never rush your technique. Try to complete a little more work in the same time each week."
  };
  document.querySelector("#feedback-title").textContent = `${goal} focus`;
  document.querySelector("#feedback-text").textContent = feedback[goal];
  document.querySelector("#generator-status").textContent = "Your new plan has been generated below.";
  document.querySelector("#plan").scrollIntoView({ behavior: "smooth" });
}

function updateCharts(exercises, sets, days) {
  const muscleOrder = ["Legs", "Chest", "Back", "Shoulders", "Arms", "Core", "Fitness"];
  const muscleCounts = Object.fromEntries(muscleOrder.map(muscle => [muscle, 0]));
  const groupCounts = { upper: 0, lower: 0, core: 0, cardio: 0 };

  exercises.forEach(([, muscle]) => {
    muscleCounts[muscle] += 1;
    groupCounts[groupFor(muscle)] += 1;
  });

  const maximum = Math.max(...Object.values(muscleCounts), 1);
  document.querySelector("#muscle-bars").innerHTML = muscleOrder.map(muscle => `
    <div><span>${muscle}</span><i style="--size:${Math.round((muscleCounts[muscle] / maximum) * 100)}%"></i><b>${muscleCounts[muscle]}</b></div>`).join("");

  const total = exercises.length;
  const groups = ["upper", "lower", "core", "cardio"];
  const shares = groups.map(group => Math.round((groupCounts[group] / total) * 100));
  document.querySelector("#balance-caption").textContent = `Share of the ${total} exercises`;
  document.querySelector("#balance-chart").innerHTML = groups.map((group, index) => `
    <span class="${group}" style="--size:${shares[index]}%">${shares[index]}%</span>`).join("");
  document.querySelector("#balance-chart").setAttribute("aria-label", groups.map((group, index) => `${group} ${shares[index]}%`).join(", "));

  const workingSets = Math.round((total / days) * sets);
  document.querySelector("#workload-columns").innerHTML = Array.from({ length: days }, (_, day) => `
    <div><b>${workingSets}</b><i style="--height:100%"></i><span>Day ${day + 1}</span></div>`).join("");
}

form.addEventListener("submit", createPlan);
