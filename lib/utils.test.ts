import { getMaxReturnDate, dateToIsoDateString } from "./utils";

describe("get max return date", () => {
  test("three in a row, no interruption", () => {
    const pickupDate = new Date("2022-12-01");
    const maxReturnDate = getMaxReturnDate(pickupDate, 3, []);
    const maxReturnDateString = dateToIsoDateString(maxReturnDate);
    expect(maxReturnDateString).toEqual("2022-12-03");
  });
  test("last potential day booked", () => {
    const pickupDate = new Date("2022-12-01");
    const bookedDates = ["2022-12-03"];
    const maxReturnDate = getMaxReturnDate(pickupDate, 3, bookedDates);
    const maxReturnDateString = dateToIsoDateString(maxReturnDate);
    expect(maxReturnDateString).toEqual("2022-12-02");
  });
  test("mid day booked", () => {
    const pickupDate = new Date("2022-12-01");
    const bookedDates = ["2022-12-02"];
    const maxReturnDate = getMaxReturnDate(pickupDate, 3, bookedDates);
    const maxReturnDateString = dateToIsoDateString(maxReturnDate);
    expect(maxReturnDateString).toEqual("2022-12-03");
  });
  test("mid day booked greater range", () => {
    const pickupDate = new Date("2022-12-01");
    const bookedDates = ["2022-12-05"];
    const maxReturnDate = getMaxReturnDate(pickupDate, 8, bookedDates);
    const maxReturnDateString = dateToIsoDateString(maxReturnDate);
    expect(maxReturnDateString).toEqual("2022-12-08");
  });

  test("weekend in between", () => {
    const pickupDate = new Date("2023-08-25");
    const bookedDates = ["2023-08-26", "2023-08-27"];
    const maxReturnDate = getMaxReturnDate(pickupDate, 4, bookedDates);
    const maxReturnDateString = dateToIsoDateString(maxReturnDate);
    expect(maxReturnDateString).toEqual("2023-08-28");
  });
});
