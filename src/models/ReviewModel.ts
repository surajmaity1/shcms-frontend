class ReviewModel {
  id: number;
  userEmail: string;
  date: string;
  rating: number;
  doctorId: number;
  reviewDescription: string;

  constructor(
    id: number,
    userEmail: string,
    date: string,
    rating: number,
    doctorId: number,
    reviewDescription: string
  ) {
    this.id = id;
    this.userEmail = userEmail;
    this.date = date;
    this.rating = rating;
    this.doctorId = doctorId;
    this.reviewDescription = reviewDescription;
  }
}

export default ReviewModel;
