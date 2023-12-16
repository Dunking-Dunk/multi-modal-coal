export const getDistanceAndTime = (a) => {
    let totalDist = 0;
    let totalTime = 0;

    a.forEach((stop) => {
        totalDist += stop.distance,
            totalTime += stop.duration
    })
    let totalDistance = `${(totalDist / 1000).toFixed(2)} Km `
    const hours = (totalTime / (60 * 60));
    const rhours = Math.floor(hours);

    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes)

    let totalTimeTaken = `${rhours} hours ${rminutes} minutes`

    return {
        totalDistance, totalTimeTaken, totalTime, totalDist
    }
}