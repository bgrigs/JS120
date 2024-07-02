// Create an object that represents a Cessna 152 aircraft.
// The aircraft should include information that shows its fuel
// capacity of 24.5 gallons and a cruising speed of 111 knots.
// The aircraft should be able to take off and land.

// Identify the state and behavior items in this object.

let cessna152 = {
  fuelCapacityGallons: 24.5,
  cruisingSpeedKnots: 111,

  takeOff() {
    console.log('Take off!');
  },

  land() {
    console.log('Landing!');
  }
};

cessna152.takeOff();
cessna152.land();