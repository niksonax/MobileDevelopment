const Direction = {longitude: 'longitude', latitude: 'latitude'};

class CoordinateMK {
  constructor(direction, degrees = 0, minutes = 0, seconds = 0) {
    this.#validate(direction, degrees, minutes, seconds);
    this.degrees = degrees;
    this.minutes = minutes;
    this.seconds = seconds;
    this.direction = direction;
  }

  toDmsFormat() {
    return `${this.degrees}°${this.minutes}′${
      this.seconds
    }″ ${this.#getDirectionLetter()}`;
  }

  toDdFormat() {
    return `${
      this.degrees + this.minutes / 60 + this.seconds / 3600
    }° ${this.#getDirectionLetter()}`;
  }

  avg(object) {
    if (object.className === CoordinateMK.className) {
      if (object.direction === this.direction) {
        return this.#avg(this, object);
      } else {
        return null;
      }
    }
  }

  avgOfTwoObjs(object1, object2) {
    if (object1.className === object2.className) {
      if (object1.direction === object2.direction) {
        return this.#avg(object1, object2);
      } else {
        return null;
      }
    }
  }

  #avg(object1, object2) {
    return new CoordinateMK(
      object1.direction,
      (object1.degrees + object2.degrees) / 2,
      (object1.minutes + object2.minutes) / 2,
      (object1.seconds + object2.seconds) / 2,
    );
  }

  #getDirectionLetter() {
    if (this.direction === Direction.longitude) {
      if (this.degrees < 0) {
        return 'W';
      } else {
        return 'E';
      }
    } else {
      if (this.degrees < 0) {
        return 'S';
      } else {
        return 'N';
      }
    }
  }

  #validate(direction, degrees, minutes, seconds) {
    if (direction === Direction.longitude) {
      if (degrees < -180 || degrees > 180) {
        throw 'The degree of longitude should be in the range from -180 to 180!';
      }
    }
    if (direction === Direction.latitude) {
      if (degrees < -90 || degrees > 90) {
        throw 'The degree of latitude should be in the range from -180 to 180!';
      }
    }

    if (minutes < 0 || minutes > 59) {
      throw 'The minutes should be in the range from 0 to 59';
    }
    if (seconds < 0 || seconds > 59) {
      throw 'The seconds should be in the range from 0 to 59';
    }
  }
}

// Test objects and methods of class CoordinateMK
const coordObj1 = new CoordinateMK(Direction.latitude);
const coordObj2 = new CoordinateMK(Direction.longitude, 180, 50, 50);
const coordObj3 = new CoordinateMK(Direction.longitude, 75, 32, 44);

console.log(coordObj1.toDdFormat());
console.log(coordObj1.toDmsFormat());

console.log(coordObj2.toDdFormat());
console.log(coordObj2.toDmsFormat());

console.log(coordObj1.avgOfTwoObjs(coordObj2, coordObj3));
