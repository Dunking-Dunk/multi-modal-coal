import moment from "moment";

export class CalcDistance {
  constructor(userCoords) {
    this.userCoords = userCoords;
  }

  nearByStops(stops) {
    if (stops && this.userCoords) {
      const nearBy = stops.map((stop) => {
        const stopCoord = stop.location.coordinate;
        const distance = this.haversineformula(
          stopCoord[1],
          this.userCoords.latitude,
          stopCoord[0],
          this.userCoords.longitude
        );

        if (distance < 2) {
          return stop;
        }
      });
      return nearBy.filter((stop) => stop != null);
    }
  }

  nearByBuses(buses) {
    if (buses && this.userCoords) {
      const nearBy = buses.map((bus) => {
        const busCoord = bus.coords[0];
        const distance = this.haversineformula(
          busCoord.latitude,
          this.userCoords.latitude,
          busCoord.longitude,
          this.userCoords.longitude
        );

        if (distance < 2) {
          return bus;
        }
      });
      return nearBy.filter((stop) => stop != null);
    }
  }

  TimeElapsedBetweenStops(stops, totalDistance, totalTime) {
    let startTime = moment().format();
    stops[0].elapsedTime = moment(startTime).format("LT");
    if (stops && totalTime && totalDistance) {
      const kmToM = totalDistance * 1000;
      const speed = kmToM / totalTime;
      for (let i = 0; i < stops.length - 1; i++) {
        const stop1 = stops[i].coords;
        const stop2 = stops[i + 1].coords;
        const distance = this.haversineformula(
          stop1.latitude,
          stop2.latitude,
          stop1.longitude,
          stop2.longitude
        );
        const kmToM = distance * 1000;
        const elapsedTime = moment(startTime).add(
          (kmToM / speed).toFixed(0),
          "m"
        );
        stops[i + 1].elapsedTime = moment(elapsedTime).format("LT");
        stops[i + 1].distance = kmToM;
        startTime = elapsedTime;
      }
      return stops;
    }
  }

  haversineformula(lat1, lat2, lon1, lon2) {
    lon1 = (lon1 * Math.PI) / 180;
    lon2 = (lon2 * Math.PI) / 180;
    lat1 = (lat1 * Math.PI) / 180;
    lat2 = (lat2 * Math.PI) / 180;

    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a =
      Math.pow(Math.sin(dlat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));

    let r = 6371;
    return c * r;
  }
}
