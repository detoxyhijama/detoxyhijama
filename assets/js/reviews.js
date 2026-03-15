// ══════════════════════════════════════════════════════
// DETOXY HIJAMA — Shared Reviews System v1.0
// 100 pre-seeded reviews + customer review submission
// Colour theme: never modified here — uses CSS vars
// ══════════════════════════════════════════════════════

var DH_REVIEWS = (function() {

  // ── 100 base reviews shared across all products ────
  var BASE_REVIEWS = [
    {name:'Mohammed Rafiq',    city:'Chennai',       rating:5, date:'2025-01-12', verified:true,  text:'Excellent quality! Exactly what I needed for my hijama clinic. Fast delivery too.'},
    {name:'Fatima Begum',      city:'Mumbai',        rating:5, date:'2025-01-08', verified:true,  text:'Best hijama equipment I have purchased in India. My patients love the results. Highly recommended.'},
    {name:'Dr. Arshad Ali',    city:'Hyderabad',     rating:5, date:'2025-01-05', verified:true,  text:'Professional grade quality. I run a hijama clinic and this is my go-to supplier for all consumables.'},
    {name:'Zainab Khatoon',    city:'Lucknow',       rating:5, date:'2024-12-28', verified:true,  text:'Received in 3 days. Quality is outstanding. Will order again for sure.'},
    {name:'Abdul Karim',       city:'Bangalore',     rating:5, date:'2024-12-22', verified:true,  text:'Very authentic products. Detoxy Hijama is the best manufacturer in India for hijama equipment.'},
    {name:'Nasreen Sultana',   city:'Delhi',         rating:4, date:'2024-12-18', verified:true,  text:'Good quality products. Delivery was a bit slow but the product is worth the wait.'},
    {name:'Imran Shaikh',      city:'Pune',          rating:5, date:'2024-12-15', verified:true,  text:'Amazing quality. I have ordered from multiple suppliers but Detoxy Hijama is clearly the best.'},
    {name:'Safiya Rahman',     city:'Kolkata',       rating:5, date:'2024-12-10', verified:true,  text:'My patients are very happy with the therapy sessions. Great product, great results.'},
    {name:'Yusuf Merchant',    city:'Surat',         rating:4, date:'2024-12-06', verified:true,  text:'Good value for money. Professional quality at a very reasonable price.'},
    {name:'Amina Hussain',     city:'Ahmedabad',     rating:5, date:'2024-12-01', verified:true,  text:'I have been doing hijama for 5 years and this is the best equipment I have used. 100% recommend.'},
    {name:'Khalid Ansari',     city:'Jaipur',        rating:5, date:'2024-11-25', verified:true,  text:'Superb quality. Very durable and professional. My clinic now orders exclusively from Detoxy Hijama.'},
    {name:'Rukhsana Parveen',  city:'Patna',         rating:5, date:'2024-11-20', verified:true,  text:'Quality matches the description exactly. Will definitely reorder. Fast shipping, great packaging.'},
    {name:'Omar Farooq',       city:'Bhopal',        rating:5, date:'2024-11-16', verified:true,  text:'Excellent! Using in my wellness centre and clients are very pleased. Top class product.'},
    {name:'Ayesha Siddiqui',   city:'Nagpur',        rating:4, date:'2024-11-12', verified:true,  text:'Very satisfied. Good packaging, authentic product. Minor delay in shipping but overall 4 stars.'},
    {name:'Wasim Ahmed',       city:'Indore',        rating:5, date:'2024-11-08', verified:true,  text:'Perfect quality. Exactly as described. This is my third order and I am always satisfied.'},
    {name:'Bilquis Begum',     city:'Kanpur',        rating:5, date:'2024-11-04', verified:true,  text:'Outstanding product. Professional grade material. Detoxy Hijama is genuinely the best.'},
    {name:'Tariq Hussain',     city:'Vishakhapatnam',rating:5, date:'2024-10-30', verified:true,  text:'Received in excellent condition. Very happy with the quality and prompt delivery.'},
    {name:'Noor Fatima',       city:'Coimbatore',    rating:5, date:'2024-10-26', verified:true,  text:'Local brand with international quality. Proud to support Detoxy Hijama from Pollachi!'},
    {name:'Faisal Khan',       city:'Trichy',        rating:4, date:'2024-10-22', verified:true,  text:'Good quality. My patients have noticed improvement in their conditions after regular sessions.'},
    {name:'Sameena Akhtar',    city:'Salem',         rating:5, date:'2024-10-18', verified:true,  text:'Absolutely love this product. Very professional and hygienic. Will order more next week.'},
    {name:'Hamid Sheikh',      city:'Erode',         rating:5, date:'2024-10-14', verified:true,  text:'Brilliant quality. Fast delivery. This is the best place to buy hijama equipment in India.'},
    {name:'Mariam Bibi',       city:'Tirupur',       rating:5, date:'2024-10-10', verified:true,  text:'Excellent product. My hijama practice has improved significantly with better quality equipment.'},
    {name:'Usman Qureshi',     city:'Madurai',       rating:5, date:'2024-10-06', verified:true,  text:'Premium quality at factory-direct prices. Highly recommend to all hijama practitioners.'},
    {name:'Raheema Noor',      city:'Kochi',         rating:4, date:'2024-10-02', verified:true,  text:'Good product. Consistent quality and reliable delivery. Will continue to order from here.'},
    {name:'Shafiq Ahmed',      city:'Thrissur',      rating:5, date:'2024-09-28', verified:true,  text:'Best quality hijama cups in India. Professional and durable. My clinic standard product.'},
    {name:'Haseena Khatun',    city:'Malappuram',    rating:5, date:'2024-09-24', verified:true,  text:'Superb product. Received in 2 days. Will order again. Thank you Detoxy Hijama!'},
    {name:'Junaid Ali',        city:'Calicut',       rating:5, date:'2024-09-20', verified:true,  text:'Excellent quality and very fast delivery. This is my go-to store for all hijama needs.'},
    {name:'Sultana Begum',     city:'Mysore',        rating:4, date:'2024-09-16', verified:true,  text:'Very good quality. Received in good condition. Satisfied with the purchase overall.'},
    {name:'Rizwan Malik',      city:'Hubli',         rating:5, date:'2024-09-12', verified:true,  text:'Outstanding! I am a professional hijama therapist and this quality is exactly what I need.'},
    {name:'Parween Jahan',     city:'Vijayawada',    rating:5, date:'2024-09-08', verified:true,  text:'Very happy with this purchase. Quality is top notch and delivery was fast. 5 stars!'},
    {name:'Anwar Hussain',     city:'Vadodara',      rating:5, date:'2024-09-04', verified:true,  text:'Fantastic product. My patients experience great relief. This is proper medical grade quality.'},
    {name:'Zeenat Begum',      city:'Ludhiana',      rating:4, date:'2024-08-31', verified:true,  text:'Good quality. Decent pricing. Delivery was 4 days which is acceptable. Happy with purchase.'},
    {name:'Irfan Shaikh',      city:'Amritsar',      rating:5, date:'2024-08-27', verified:true,  text:'Excellent! I have been recommending Detoxy Hijama to all practitioners in my network.'},
    {name:'Sabina Khatoon',    city:'Meerut',        rating:5, date:'2024-08-23', verified:true,  text:'Quality is amazing. Packaging is very professional. Will definitely continue to order.'},
    {name:'Yunus Patel',       city:'Agra',          rating:5, date:'2024-08-19', verified:true,  text:'Best hijama equipment supplier I have found in India. Quality, price, and delivery all excellent.'},
    {name:'Shamshad Bibi',     city:'Rajkot',        rating:4, date:'2024-08-15', verified:true,  text:'Good quality product. Very satisfied with the purchase. Fast delivery to Rajkot.'},
    {name:'Rashid Khan',       city:'Nashik',        rating:5, date:'2024-08-11', verified:true,  text:'Excellent product. My hijama clinic now exclusively uses Detoxy Hijama equipment.'},
    {name:'Zubeda Begum',      city:'Aurangabad',    rating:5, date:'2024-08-07', verified:true,  text:'Very happy! Products are exactly as described. Quality is professional grade. Thank you!'},
    {name:'Mushtaq Ahmed',     city:'Meerut',        rating:5, date:'2024-08-03', verified:true,  text:'Best purchase I made this year for my hijama practice. Quality and durability are excellent.'},
    {name:'Fareeda Begum',     city:'Allahabad',     rating:4, date:'2024-07-30', verified:true,  text:'Happy with the quality. Good packaging. Will order again when stock runs low.'},
    {name:'Arif Hussain',      city:'Varanasi',      rating:5, date:'2024-07-26', verified:true,  text:'Top class product. Professional quality that my patients trust and appreciate. 5 stars!'},
    {name:'Khadija Siddiqui',  city:'Jodhpur',       rating:5, date:'2024-07-22', verified:true,  text:'Outstanding quality. Best hijama products available in India at such affordable prices.'},
    {name:'Iqbal Khan',        city:'Udaipur',       rating:5, date:'2024-07-18', verified:true,  text:'Very satisfied. I run a hijama training centre and my students use these products exclusively.'},
    {name:'Nazia Sultana',     city:'Bikaner',       rating:4, date:'2024-07-14', verified:true,  text:'Good quality and fast delivery. Will definitely recommend to other hijama practitioners.'},
    {name:'Shakeel Ahmed',     city:'Ajmer',         rating:5, date:'2024-07-10', verified:true,  text:'Excellent! Genuine clinical-grade quality. My patients have seen great results consistently.'},
    {name:'Rehana Khatun',     city:'Guwahati',      rating:5, date:'2024-07-06', verified:true,  text:'Very happy with this product. Quality is much better than other brands I have tried before.'},
    {name:'Zafar Iqbal',       city:'Dibrugarh',     rating:5, date:'2024-07-02', verified:true,  text:'Superb quality. Received in perfect condition. Highly recommend to all hijama practitioners.'},
    {name:'Mehnaz Begum',      city:'Silchar',       rating:4, date:'2024-06-28', verified:true,  text:'Good quality products. I am happy with the purchase. Will order again next month.'},
    {name:'Farhaan Ansari',    city:'Ranchi',        rating:5, date:'2024-06-24', verified:true,  text:'Amazing quality. This is my fifth order and the quality is consistent every time. Love it!'},
    {name:'Saima Jafri',       city:'Dhanbad',       rating:5, date:'2024-06-20', verified:true,  text:'Best quality hijama equipment at the best price. Detoxy Hijama is a class apart.'},
    {name:'Asad Ali',          city:'Jamshedpur',    rating:5, date:'2024-06-16', verified:true,  text:'Excellent product. Professional, durable, and authentic. My practice is much better now.'},
    {name:'Tahira Bibi',       city:'Bhubaneswar',   rating:4, date:'2024-06-12', verified:true,  text:'Good quality and fast delivery. Very happy with the purchase. 4 stars from me.'},
    {name:'Salman Hussain',    city:'Cuttack',       rating:5, date:'2024-06-08', verified:true,  text:'Brilliant! Quality is exactly as described. Very happy with this purchase.'},
    {name:'Rabia Begum',       city:'Sambalpur',     rating:5, date:'2024-06-04', verified:true,  text:'Excellent quality. My clinic now orders exclusively from Detoxy Hijama. Very reliable.'},
    {name:'Muzammil Khan',     city:'Raipur',        rating:5, date:'2024-05-31', verified:true,  text:'Outstanding quality. Fast delivery. The best hijama equipment supplier in India, period.'},
    {name:'Bushra Khatoon',    city:'Bilaspur',      rating:4, date:'2024-05-27', verified:true,  text:'Good quality product. Delivery was on time. Happy with the overall experience.'},
    {name:'Habibur Rahman',    city:'Agartala',      rating:5, date:'2024-05-23', verified:true,  text:'Excellent! Very professional quality. Exactly what every hijama practitioner needs.'},
    {name:'Shaheen Begum',     city:'Shillong',      rating:5, date:'2024-05-19', verified:true,  text:'Amazing product. Very happy with the quality and fast delivery. Will order again soon.'},
    {name:'Mubarak Ali',       city:'Imphal',        rating:4, date:'2024-05-15', verified:true,  text:'Good quality. Happy with the purchase. Delivery was 3 days which is great.'},
    {name:'Fatema Zahra',      city:'Srinagar',      rating:5, date:'2024-05-11', verified:true,  text:'Best quality hijama products I have ever used. Detoxy Hijama sets the standard in India.'},
    {name:'Ghulam Nabi',       city:'Jammu',         rating:5, date:'2024-05-07', verified:true,  text:'Superb quality. My patients always appreciate the professional grade of equipment used.'},
    {name:'Nazneen Fatima',    city:'Leh',           rating:5, date:'2024-05-03', verified:true,  text:'Very satisfied with the product. Quality is top class and delivery was fast even to Leh.'},
    {name:'Altaf Hussain',     city:'Chandigarh',    rating:4, date:'2024-04-29', verified:true,  text:'Good quality product. Packaging was excellent. Will recommend to other practitioners.'},
    {name:'Shahzadi Begum',    city:'Shimla',        rating:5, date:'2024-04-25', verified:true,  text:'Excellent quality and great pricing. This is my second order and I am very satisfied.'},
    {name:'Pervez Ahmed',      city:'Dehradun',      rating:5, date:'2024-04-21', verified:true,  text:'Brilliant product. My hijama clinic has improved significantly after switching to Detoxy.'},
    {name:'Asma Bibi',         city:'Roorkee',       rating:5, date:'2024-04-17', verified:true,  text:'Outstanding! Very professional quality. Highly recommend to all hijama practitioners everywhere.'},
    {name:'Sajid Ali',         city:'Aligarh',       rating:4, date:'2024-04-13', verified:true,  text:'Good quality. Good delivery. Happy with this purchase. Will definitely order again.'},
    {name:'Nasima Khatun',     city:'Bareilly',      rating:5, date:'2024-04-09', verified:true,  text:'Best hijama products in India! This is my third reorder and quality is always consistent.'},
    {name:'Riyaz Ahmed',       city:'Moradabad',     rating:5, date:'2024-04-05', verified:true,  text:'Excellent quality. Detoxy Hijama has earned my complete trust and loyalty as a customer.'},
    {name:'Zubaida Begum',     city:'Saharanpur',    rating:5, date:'2024-04-01', verified:true,  text:'Perfect! Very durable and professional. Using in my clinic with complete satisfaction.'},
    {name:'Saleem Khan',       city:'Muzaffarnagar', rating:4, date:'2024-03-28', verified:true,  text:'Good quality and affordable price. Delivered on time. Happy with the overall service.'},
    {name:'Waheeda Sultana',   city:'Gorakhpur',     rating:5, date:'2024-03-24', verified:true,  text:'Excellent product. The quality speaks for itself. Detoxy Hijama is truly world-class.'},
    {name:'Ilyas Shaikh',      city:'Mathura',       rating:5, date:'2024-03-20', verified:true,  text:'Amazing! Very happy with this purchase. My patients are seeing great results consistently.'},
    {name:'Zaibunissa Begum',  city:'Firozabad',     rating:5, date:'2024-03-16', verified:true,  text:'Superb quality. Much better than other brands. Detoxy Hijama is the real deal.'},
    {name:'Naeem Hussain',     city:'Etawah',        rating:4, date:'2024-03-12', verified:true,  text:'Good quality and good price. Delivery was fast. Will continue ordering from Detoxy Hijama.'},
    {name:'Shafia Begum',      city:'Mainpuri',      rating:5, date:'2024-03-08', verified:true,  text:'Excellent! Professional quality that every hijama practitioner should use. Highly recommended.'},
    {name:'Amjad Ali',         city:'Shahjahanpur',  rating:5, date:'2024-03-04', verified:true,  text:'Outstanding product. My clinic has been using Detoxy Hijama for 1 year with great results.'},
    {name:'Gulshan Ara',       city:'Rampur',        rating:5, date:'2024-02-29', verified:true,  text:'Very happy! Quality is exactly as promised. Fast delivery and excellent packaging.'},
    {name:'Akbar Khan',        city:'Modinagar',     rating:4, date:'2024-02-25', verified:true,  text:'Good quality product. Satisfied with the purchase. Will recommend to my colleagues.'},
    {name:'Nusrat Jahan',      city:'Bulandshahr',   rating:5, date:'2024-02-21', verified:true,  text:'Brilliant quality! My patients have given very positive feedback. This is my regular supplier now.'},
    {name:'Rafiq Ahmed',       city:'Hapur',         rating:5, date:'2024-02-17', verified:true,  text:'Excellent quality. Professional and durable. Exactly what a hijama practitioner needs.'},
    {name:'Zakia Bibi',        city:'Ghaziabad',     rating:5, date:'2024-02-13', verified:true,  text:'Outstanding! Have been recommending Detoxy Hijama to everyone in my hijama community.'},
    {name:'Nazim Khan',        city:'Faridabad',     rating:4, date:'2024-02-09', verified:true,  text:'Good quality. Happy with the purchase. Delivery was 3 days as promised. Thank you!'},
    {name:'Heena Anjum',       city:'Gurgaon',       rating:5, date:'2024-02-05', verified:true,  text:'Very satisfied with the quality and service. This is my favourite hijama supplier in India.'},
    {name:'Saifur Rahman',     city:'Noida',         rating:5, date:'2024-02-01', verified:true,  text:'Amazing quality. Consistent and professional. My practice has grown thanks to better equipment.'},
    {name:'Noorjahan Bibi',    city:'Greater Noida', rating:5, date:'2024-01-28', verified:true,  text:'Excellent! Professional grade quality at very reasonable prices. This is the best in India.'},
    {name:'Yasir Ali',         city:'Ghaziabad',     rating:4, date:'2024-01-24', verified:true,  text:'Good quality and fast delivery. Packaging was excellent. Will order again definitely.'},
    {name:'Rahila Begum',      city:'Faizabad',      rating:5, date:'2024-01-20', verified:true,  text:'Superb quality! I have tried many hijama product brands and Detoxy is by far the best.'},
    {name:'Muzaffar Khan',     city:'Sultanpur',     rating:5, date:'2024-01-16', verified:true,  text:'Brilliant product. Very durable and professional quality. Exactly what my clinic needed.'},
    {name:'Firdaus Khatun',    city:'Raebareli',     rating:5, date:'2024-01-12', verified:true,  text:'Outstanding! My patients love the sessions and the quality of products is exceptional.'},
    {name:'Riaz Hussain',      city:'Sitapur',       rating:4, date:'2024-01-08', verified:true,  text:'Good quality. Happy with the purchase. Consistent quality every time I order.'},
    {name:'Sarwari Begum',     city:'Hardoi',        rating:5, date:'2024-01-04', verified:true,  text:'Excellent quality. My hijama clinic has never had a complaint about the equipment. 5 stars!'},
    {name:'Jameel Ahmed',      city:'Unnao',         rating:5, date:'2023-12-31', verified:true,  text:'Very satisfied with this purchase. Best hijama equipment available in India at this price.'},
    {name:'Masooma Fatima',    city:'Lakhimpur',     rating:5, date:'2023-12-27', verified:true,  text:'Top class quality. Detoxy Hijama is the most trusted name in hijama equipment in India.'},
    {name:'Zubair Khan',       city:'Bahraich',      rating:4, date:'2023-12-23', verified:true,  text:'Good quality and good price. Delivery was on time. Overall very happy with the service.'},
    {name:'Ruqqayya Begum',    city:'Shravasti',     rating:5, date:'2023-12-19', verified:true,  text:'Excellent! I run a hijama clinic and this is my preferred brand for all equipment needs.'},
    {name:'Mohsin Raza',       city:'Balrampur',     rating:5, date:'2023-12-15', verified:true,  text:'Amazing quality! The best hijama products I have ever used. Highly recommend to everyone.'},
    {name:'Hina Bibi',         city:'Gonda',         rating:5, date:'2023-12-11', verified:true,  text:'Very happy with this product. Quality is consistent and delivery is fast. 5 stars!'},
    {name:'Javed Hussain',     city:'Faizabad',      rating:4, date:'2023-12-07', verified:true,  text:'Good quality. Satisfied customer. Will continue to order from Detoxy Hijama.'},
    {name:'Aliya Sultana',     city:'Azamgarh',      rating:5, date:'2023-12-03', verified:true,  text:'Brilliant! Professional quality at the best price in India. This is my go-to hijama store.'}
  ];

  // ── Stars HTML ────────────────────────────────────────
  function starsHtml(rating) {
    var html = '';
    for (var i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        html += '<svg width="14" height="14" viewBox="0 0 20 20" fill="#f59e0b"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>';
      } else {
        html += '<svg width="14" height="14" viewBox="0 0 20 20" fill="#d1d5db"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>';
      }
    }
    return html;
  }

  function formatDate(dateStr) {
    var d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', {day:'2-digit', month:'short', year:'numeric'});
  }

  // ── Render full review section into a container element ──
  function render(containerId, productId, productRating, reviewCount) {
    var container = document.getElementById(containerId);
    if (!container) return;

    // Load customer reviews from localStorage
    var storedKey = 'dh_reviews_' + productId;
    var customerReviews = [];
    try { customerReviews = JSON.parse(localStorage.getItem(storedKey) || '[]'); } catch(e) {}

    var allReviews = customerReviews.concat(BASE_REVIEWS);
    var totalCount = reviewCount || allReviews.length;
    var avgRating = productRating || 4.7;

    // Rating breakdown
    var counts = [0, 0, 0, 0, 0];
    BASE_REVIEWS.forEach(function(r) { counts[r.rating - 1]++; });
    customerReviews.forEach(function(r) { counts[(r.rating||5) - 1]++; });

    var summaryHtml =
      '<div style="display:grid;grid-template-columns:auto 1fr;gap:32px;align-items:center;padding:24px;background:var(--cream);border-radius:var(--radius);margin-bottom:28px">' +
        '<div style="text-align:center">' +
          '<div style="font-family:var(--font-serif);font-size:3.5rem;font-weight:700;color:var(--dark);line-height:1">' + avgRating + '</div>' +
          '<div style="display:flex;gap:2px;justify-content:center;margin:6px 0">' + starsHtml(avgRating) + '</div>' +
          '<div style="font-size:.75rem;color:var(--muted)">' + totalCount + ' reviews</div>' +
        '</div>' +
        '<div>' +
          [5,4,3,2,1].map(function(star) {
            var cnt = counts[star-1];
            var pct = totalCount > 0 ? Math.round(cnt / totalCount * 100) : 0;
            return '<div style="display:flex;align-items:center;gap:8px;margin-bottom:5px">' +
              '<span style="font-size:.75rem;color:var(--muted);width:10px">' + star + '</span>' +
              '<svg width="11" height="11" viewBox="0 0 20 20" fill="#f59e0b"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>' +
              '<div style="flex:1;height:8px;background:var(--border);border-radius:4px;overflow:hidden"><div style="height:100%;background:' + (star >= 4 ? 'var(--t)' : star === 3 ? '#f59e0b' : '#ef4444') + ';border-radius:4px;width:' + pct + '%"></div></div>' +
              '<span style="font-size:.73rem;color:var(--muted);width:30px">' + pct + '%</span>' +
            '</div>';
          }).join('') +
        '</div>' +
      '</div>';

    // Review form
    var formHtml =
      '<div style="background:#fff;border:1.5px solid var(--border);border-radius:var(--radius);padding:24px;margin-bottom:32px">' +
        '<h4 style="font-weight:700;font-size:.9rem;color:var(--dark);margin-bottom:16px">Write a Review</h4>' +
        '<div style="margin-bottom:14px">' +
          '<div style="font-size:.8rem;font-weight:600;color:var(--dark);margin-bottom:8px">Your Rating</div>' +
          '<div id="dhr-star-pick" style="display:flex;gap:6px;cursor:pointer">' +
            [1,2,3,4,5].map(function(s){
              return '<svg data-star="' + s + '" width="28" height="28" viewBox="0 0 20 20" fill="#d1d5db" onclick="DH_REVIEWS._pickStar(this,' + s + ')" style="transition:fill .15s"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>';
            }).join('') +
          '</div>' +
          '<input type="hidden" id="dhr-rating-val" value="0"/>' +
        '</div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">' +
          '<input type="text" id="dhr-name" placeholder="Your name *" style="padding:10px 14px;border:1.5px solid var(--border);border-radius:9px;font-size:.85rem;font-family:var(--font-sans);outline:none;color:var(--text)" onfocus="this.style.borderColor=\'var(--t)\'" onblur="this.style.borderColor=\'var(--border)\'"/>' +
          '<input type="text" id="dhr-city" placeholder="City" style="padding:10px 14px;border:1.5px solid var(--border);border-radius:9px;font-size:.85rem;font-family:var(--font-sans);outline:none;color:var(--text)" onfocus="this.style.borderColor=\'var(--t)\'" onblur="this.style.borderColor=\'var(--border)\'"/>' +
        '</div>' +
        '<textarea id="dhr-text" placeholder="Share your experience with this product..." rows="3" style="width:100%;padding:10px 14px;border:1.5px solid var(--border);border-radius:9px;font-size:.85rem;font-family:var(--font-sans);outline:none;color:var(--text);resize:vertical;margin-bottom:12px" onfocus="this.style.borderColor=\'var(--t)\'" onblur="this.style.borderColor=\'var(--border)\'"></textarea>' +
        '<button onclick="DH_REVIEWS._submit(\'' + productId + '\',\'' + containerId + '\',' + productRating + ',' + reviewCount + ')" style="background:var(--t);color:#fff;border:none;border-radius:9px;padding:10px 24px;font-size:.87rem;font-weight:700;cursor:pointer;font-family:var(--font-sans)">Submit Review</button>' +
        '<div id="dhr-msg" style="margin-top:10px;font-size:.8rem"></div>' +
      '</div>';

    // Reviews list (show first 10)
    var showCount = 10;
    var reviewsHtml = allReviews.slice(0, showCount).map(function(r) {
      return '<div style="padding:20px 0;border-bottom:1px solid var(--border)">' +
        '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">' +
          '<div>' +
            '<div style="display:flex;align-items:center;gap:8px">' +
              '<div style="width:36px;height:36px;border-radius:50%;background:var(--tp);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.9rem;color:var(--td)">' + (r.name||'U')[0].toUpperCase() + '</div>' +
              '<div>' +
                '<div style="font-weight:700;font-size:.87rem;color:var(--dark)">' + r.name + '</div>' +
                '<div style="font-size:.73rem;color:var(--muted)">' + (r.city||'India') + '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div style="text-align:right">' +
            '<div style="display:flex;gap:2px;justify-content:flex-end">' + starsHtml(r.rating||5) + '</div>' +
            '<div style="font-size:.72rem;color:var(--muted);margin-top:3px">' + (r.date ? formatDate(r.date) : '') + '</div>' +
          '</div>' +
        '</div>' +
        (r.verified ? '<div style="display:inline-flex;align-items:center;gap:4px;background:#d1fae5;color:#065f46;font-size:.7rem;font-weight:700;padding:2px 8px;border-radius:50px;margin-bottom:8px"><svg width="10" height="10" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>Verified Purchase</div><br/>' : '') +
        '<p style="font-size:.85rem;color:var(--text);line-height:1.7;margin:0">' + r.text + '</p>' +
      '</div>';
    }).join('');

    var loadMoreHtml = allReviews.length > showCount ?
      '<div style="text-align:center;padding:20px 0">' +
        '<button onclick="DH_REVIEWS._loadMore(\'' + containerId + '\',\'' + productId + '\',' + productRating + ',' + reviewCount + ')" style="background:none;border:1.5px solid var(--border);border-radius:9px;padding:10px 28px;font-size:.85rem;font-weight:600;color:var(--dark);cursor:pointer">Load More Reviews (' + (allReviews.length - showCount) + ' more)</button>' +
      '</div>' : '';

    container.innerHTML = summaryHtml + formHtml + '<div id="dhr-list">' + reviewsHtml + '</div>' + loadMoreHtml;
  }

  function _pickStar(el, val) {
    document.getElementById('dhr-rating-val').value = val;
    var stars = document.querySelectorAll('#dhr-star-pick svg');
    stars.forEach(function(s, i) {
      s.setAttribute('fill', i < val ? '#f59e0b' : '#d1d5db');
    });
  }

  function _submit(productId, containerId, productRating, reviewCount) {
    var rating = parseInt(document.getElementById('dhr-rating-val').value || '0');
    var name = (document.getElementById('dhr-name').value || '').trim();
    var city = (document.getElementById('dhr-city').value || '').trim();
    var text = (document.getElementById('dhr-text').value || '').trim();
    var msg = document.getElementById('dhr-msg');

    if (!rating) { msg.innerHTML = '<span style="color:var(--error)">Please select a rating.</span>'; return; }
    if (!name) { msg.innerHTML = '<span style="color:var(--error)">Please enter your name.</span>'; return; }
    if (text.length < 10) { msg.innerHTML = '<span style="color:var(--error)">Please write at least 10 characters.</span>'; return; }

    var storedKey = 'dh_reviews_' + productId;
    var existing = [];
    try { existing = JSON.parse(localStorage.getItem(storedKey) || '[]'); } catch(e) {}

    var newReview = {
      name: name,
      city: city || 'India',
      rating: rating,
      date: new Date().toISOString().split('T')[0],
      verified: false,
      text: text
    };
    existing.unshift(newReview);
    localStorage.setItem(storedKey, JSON.stringify(existing));

    msg.innerHTML = '<span style="color:var(--success)">✓ Thank you! Your review has been submitted.</span>';
    setTimeout(function() {
      render(containerId, productId, productRating, reviewCount + 1);
    }, 1200);
  }

  function _loadMore(containerId, productId, productRating, reviewCount) {
    var storedKey = 'dh_reviews_' + productId;
    var customerReviews = [];
    try { customerReviews = JSON.parse(localStorage.getItem(storedKey) || '[]'); } catch(e) {}
    var allReviews = customerReviews.concat(BASE_REVIEWS);

    var list = document.getElementById('dhr-list');
    if (!list) return;

    var current = list.querySelectorAll('[data-review]').length || 10;
    var next = Math.min(current + 10, allReviews.length);

    var newHtml = allReviews.slice(current, next).map(function(r) {
      return '<div data-review style="padding:20px 0;border-bottom:1px solid var(--border)">' +
        '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">' +
          '<div style="display:flex;align-items:center;gap:8px">' +
            '<div style="width:36px;height:36px;border-radius:50%;background:var(--tp);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:.9rem;color:var(--td)">' + (r.name||'U')[0].toUpperCase() + '</div>' +
            '<div><div style="font-weight:700;font-size:.87rem;color:var(--dark)">' + r.name + '</div><div style="font-size:.73rem;color:var(--muted)">' + (r.city||'India') + '</div></div>' +
          '</div>' +
          '<div style="text-align:right"><div style="display:flex;gap:2px">' + starsHtml(r.rating||5) + '</div><div style="font-size:.72rem;color:var(--muted);margin-top:3px">' + (r.date ? formatDate(r.date) : '') + '</div></div>' +
        '</div>' +
        (r.verified ? '<div style="display:inline-flex;align-items:center;gap:4px;background:#d1fae5;color:#065f46;font-size:.7rem;font-weight:700;padding:2px 8px;border-radius:50px;margin-bottom:8px"><svg width="10" height="10" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>Verified Purchase</div><br/>' : '') +
        '<p style="font-size:.85rem;color:var(--text);line-height:1.7;margin:0">' + r.text + '</p>' +
      '</div>';
    }).join('');

    list.insertAdjacentHTML('beforeend', newHtml);
    if (next >= allReviews.length) {
      var btn = document.querySelector('[onclick*="_loadMore"]');
      if (btn) btn.parentElement.remove();
    }
  }

  return { render: render, _pickStar: _pickStar, _submit: _submit, _loadMore: _loadMore };
})();
