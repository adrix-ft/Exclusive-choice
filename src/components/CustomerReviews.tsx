import React, { useState } from 'react';
import { REVIEWS } from '../data/storeData';
import { ChevronLeft, ChevronRight, Star, CheckCircle, MessageSquarePlus } from 'lucide-react';
import { useSwipeScroll } from '../hooks/useSwipeScroll';

export const CustomerReviews: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [writeReviewOpen, setWriteReviewOpen] = useState(false);
  const [userReviews, setUserReviews] = useState(REVIEWS);
  const [newAuthor, setNewAuthor] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newProduct, setNewProduct] = useState('Rolex Day-Date 36');
  const [submitted, setSubmitted] = useState(false);

  // Hook for buttery-smooth mobile hand/touch swiping
  const {
    containerRef: mobileScrollRef,
    activeIndex: mobileActiveIndex,
    scrollPrev: scrollMobilePrev,
    scrollNext: scrollMobileNext,
    scrollToIndex: scrollMobileToIndex,
    swipeProps: mobileSwipeProps,
  } = useSwipeScroll({
    itemWidth: 280, // 260px card + 20px gap
    totalItems: userReviews.length,
    snapOnRelease: true,
  });

  // Desktop carousel items
  const itemsPerPage = 4;
  const maxIndex = Math.max(0, userReviews.length - 1);

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRev = {
      id: `custom-${Date.now()}`,
      author: newAuthor,
      productName: newProduct,
      rating: 5,
      date: 'Today',
      content: newComment,
      verified: true,
      image: 'https://review-images.judgeme.com/expensive-choice/1792071697__img_3497__original.jpeg?quality=80&width=480',
    };

    setUserReviews([newRev, ...userReviews]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setWriteReviewOpen(false);
      setNewAuthor('');
      setNewComment('');
    }, 1500);
  };

  // Get current active desktop 4 reviews
  const desktopReviews = userReviews
    .slice(startIndex, startIndex + itemsPerPage)
    .concat(
      startIndex + itemsPerPage > userReviews.length
        ? userReviews.slice(0, startIndex + itemsPerPage - userReviews.length)
        : []
    )
    .slice(0, 4);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-neutral-50/70 border-t border-neutral-100 select-none">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-14">
        
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight font-serif-luxury">
            Customers are saying
          </h2>
          
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="flex text-emerald-600">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-semibold text-neutral-800">5.00</span>
            <span className="text-xs text-neutral-400">•</span>
            <span className="text-xs text-neutral-500">({userReviews.length + 31} Verified Reviews)</span>
          </div>

          <div className="mt-3 flex items-center justify-center gap-4">
            <button
              onClick={() => setWriteReviewOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs text-neutral-600 hover:text-black underline underline-offset-4 cursor-pointer"
            >
              <MessageSquarePlus size={13} />
              <span>Write a customer review</span>
            </button>
          </div>

          {/* Mobile Hand Swipe Indicator & Dot Navigation */}
          <div className="flex md:hidden items-center justify-center gap-3 mt-3">
            <button
              onClick={scrollMobilePrev}
              className="p-1.5 rounded-full bg-white border border-neutral-200 text-neutral-700 shadow-2xs hover:bg-neutral-50 transition-colors cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Interactive Swipe Dots */}
            <div className="flex items-center gap-1.5 px-2">
              {userReviews.slice(0, 8).map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollMobileToIndex(i)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    mobileActiveIndex === i
                      ? 'w-5 h-1.5 bg-black'
                      : 'w-1.5 h-1.5 bg-neutral-300 hover:bg-neutral-400'
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={scrollMobileNext}
              className="p-1.5 rounded-full bg-white border border-neutral-200 text-neutral-700 shadow-2xs hover:bg-neutral-50 transition-colors cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full">
          {/* Desktop Left Arrow */}
          <button
            onClick={handlePrev}
            className="hidden md:flex absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-neutral-200 text-neutral-700 hover:text-black hover:bg-neutral-50 items-center justify-center shadow-md cursor-pointer transition-all"
            aria-label="Previous reviews"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Mobile View: Horizontal Smooth Hand Swipe (-mx-4 px-4 for edge-to-edge feel) */}
          <div
            {...mobileSwipeProps}
            ref={mobileScrollRef}
            className="touch-swipe-container flex md:hidden overflow-x-auto gap-3.5 pb-3 pt-1 no-scrollbar -mx-4 px-4 w-full"
          >
            {userReviews.map((rev) => (
              <div
                key={rev.id}
                className="w-[260px] sm:w-[280px] shrink-0 bg-white rounded-xl border border-neutral-200/90 p-3.5 shadow-2xs flex flex-col justify-between select-none"
              >
                <div>
                  {/* Customer Photo */}
                  {rev.image && (
                    <div className="w-full aspect-square rounded-lg overflow-hidden bg-neutral-100 mb-3 border border-neutral-100 pointer-events-none">
                      <img
                        src={rev.image}
                        alt={`Review by ${rev.author}`}
                        className="w-full h-full object-cover object-center pointer-events-none"
                        loading="lazy"
                        draggable={false}
                      />
                    </div>
                  )}

                  {/* Review Text */}
                  <p className="text-xs text-neutral-700 leading-relaxed font-normal mb-3 min-h-[38px] line-clamp-3">
                    "{rev.content}"
                  </p>
                </div>

                <div>
                  {/* Stars */}
                  <div className="flex text-emerald-600 mb-1.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>

                  {/* Author Name with Verified Check */}
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-neutral-900 truncate">
                      {rev.author}
                    </span>
                    {rev.verified && (
                      <CheckCircle size={12} className="text-emerald-500 fill-emerald-100 shrink-0" />
                    )}
                  </div>

                  {/* Product Tag */}
                  <p className="text-[10px] text-neutral-400 truncate mt-0.5">
                    {rev.productName}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View: 4-Column Grid with Carousel Cycling */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-2">
            {desktopReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-xl border border-neutral-200/90 p-4 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Customer Photo */}
                  {rev.image && (
                    <div className="w-full aspect-square rounded-lg overflow-hidden bg-neutral-100 mb-3 border border-neutral-100">
                      <img
                        src={rev.image}
                        alt={`Review by ${rev.author}`}
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                        draggable={false}
                      />
                    </div>
                  )}

                  {/* Review Text */}
                  <p className="text-xs sm:text-[13px] text-neutral-700 leading-relaxed font-normal mb-3 min-h-[40px]">
                    "{rev.content}"
                  </p>
                </div>

                <div>
                  {/* Stars */}
                  <div className="flex text-emerald-600 mb-1.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={13} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>

                  {/* Author Name with Verified Check */}
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-neutral-900 truncate">
                      {rev.author}
                    </span>
                    {rev.verified && (
                      <CheckCircle size={12} className="text-emerald-500 fill-emerald-100 shrink-0" />
                    )}
                  </div>

                  {/* Product Tag */}
                  <p className="text-[10px] text-neutral-400 truncate mt-0.5">
                    {rev.productName}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Right Arrow */}
          <button
            onClick={handleNext}
            className="hidden md:flex absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-neutral-200 text-neutral-700 hover:text-black hover:bg-neutral-50 items-center justify-center shadow-md cursor-pointer transition-all"
            aria-label="Next reviews"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Mobile Swipe Helper Note */}
        <div className="flex md:hidden items-center justify-center gap-1.5 mt-3 text-[11px] text-neutral-400">
          <span>Swipe with hand to read verified customer reviews</span>
        </div>

      </div>

      {/* Review Submission Modal */}
      {writeReviewOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-neutral-100">
            <h3 className="text-lg font-bold text-neutral-900">Write a Review</h3>
            <p className="text-xs text-neutral-500 mt-1">Share your experience with Expensive Choice</p>

            {submitted ? (
              <div className="py-8 text-center text-emerald-600 font-semibold text-sm">
                Thank you! Your verified review has been submitted.
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="mt-4 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-700">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full mt-1 px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700">Product Purchased</label>
                  <select
                    value={newProduct}
                    onChange={(e) => setNewProduct(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                  >
                    <option value="Rolex Day-Date 36">Rolex Day-Date 36</option>
                    <option value="Tissot T-Classic Chronograph">Tissot T-Classic Chronograph</option>
                    <option value="Seiko Swift Movement">Seiko Swift Movement</option>
                    <option value="Rayban Aviator Sunglasses">Rayban Aviator Sunglasses</option>
                    <option value="Gucci Luxury Shades">Gucci Luxury Shades</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700">Your Feedback</label>
                  <textarea
                    required
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Product quality, delivery speed, packaging..."
                    className="w-full mt-1 px-3 py-2 border border-neutral-300 rounded-lg text-xs"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setWriteReviewOpen(false)}
                    className="flex-1 py-2 text-xs border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 text-xs bg-black text-white font-semibold rounded-lg hover:bg-neutral-800"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
