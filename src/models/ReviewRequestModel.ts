class ReviewRequestModel {
  rating: number;
  doctorId: number;
  reviewDescription?: string;

  constructor(rating: number, doctorId: number, reviewDescription: string) {
    this.rating = rating;
    this.doctorId = doctorId;
    this.reviewDescription = reviewDescription;
  }
}

export default ReviewRequestModel;
