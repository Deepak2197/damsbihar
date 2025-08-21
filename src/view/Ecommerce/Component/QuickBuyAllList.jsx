import React from "react";
import "../../assets/css/ecommerce/responsive.css"
import "../../assets/css/ecommerce/style.css"

function QuickList(){
    
    
// useEffect(() => {
//     window.scrollTo({
//       top: 0,
//       behavior: "instant" 
//     });
//   }, []);


  return(
    <div className="QuickList">
        <div className="page-content position-relative">
            <div className="breadcrumb-row">
                <div className="container">
                    <ul className="list-inline">
                        <li><a href={'/'}>Home</a></li>
                        <li>Quick List</li>
                    </ul>
                </div>
            </div>
        </div>
        <section className="book-mod-page">
            <div className="container">
                <div className="search_br position-relative">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <div className="input-group position-relative">
                                <input type="text" className="form-control" placeholder="Search for Products" />
                                <button className="btn" type="button">
                                    <img src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/ecommerce/search-icon.svg" alt="" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tabbing_data_oth short-filter">
                    <div className="filter_data">
                        <div className="row">
                            <div className="col-5 col-md-3">
                                <a href="#" data-toggle="modal" data-target="#Sort-by">
                                    <div className="row equal_img">
                                        <div className="col-4 col-md-2">
                                            <img src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/ecommerce/arrow.svg" alt="" />
                                        </div>
                                        <div className="col-8 col-md-10">
                                            <h4>Sort by</h4>
                                            <p>Popularity</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-7 col-md-3">
                                <a href="#" data-toggle="modal" data-target="#filter-by">
                                    <div className="row equal_img">
                                        <div className="col-4 col-md-2">
                                            <img src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/ecommerce/filter.svg" alt="" />
                                        </div>
                                        <div className="col-8 col-md-10">
                                            <h4>Filter</h4>
                                            <p>No filter applied</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-12">
                            <h3>Showing “124” items for “DAMS Question Bank”</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3">
                            <div className="item position-relative">
                                <a href="#">
                                    <div className="back_bg">
                                        <img src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/ecommerce/q-bank.svg" alt="" />
                                    </div>
                                    <h3>DAMS Question Bank IV <span className="d-block"> Final Year MBBS</span></h3>
                                </a>
                                <p>By Sumer Sethi</p>
                                {/* <div className="edition">
                                    <a href="#">2023 Edition</a>
                                </div> */}
                                
                                <div className="price-img position-relative">
                                    <h4 className="price"><em className="fa fa-rupee"></em>1,099 <span>(25 % OFF)</span>
                                    </h4>
                                    <div className="row">
                                        <div className="col-6 col-md-6 col-xl-6">
                                            <del>
                                                <em className="fa fa-rupee"></em>1,500
                                            </del>
                                        </div>
                                        <div className="col-6 col-md-6 col-xl-6 text-right">
                                            <div className="rating">
                                                <em className="fa fa-star"></em>4.5
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3">
                            <div className="item position-relative">
                                <a href="#">
                                    <div className="back_bg">
                                        <img src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/ecommerce/q-bank.svg" alt="" />
                                    </div>
                                    <h3>DAMS Question Bank IV <span className="d-block"> Final Year MBBS</span></h3>
                                </a>
                                <p>By Sumer Sethi</p>
                                {/* <div className="edition hidden">
                                    <a href="#">2023 Edition</a>
                                </div> */}
                                
                                <div className="price-img position-relative">
                                    <h4 className="price"><em className="fa fa-rupee"></em>1,099 <span>(25 % OFF)</span>
                                    </h4>
                                    <div className="row">
                                        <div className="col-6 col-md-6 col-xl-6">
                                            <del>
                                                <em className="fa fa-rupee"></em>1,500
                                            </del>
                                        </div>
                                        <div className="col-6 col-md-6 col-xl-6 text-right">
                                            <div className="rating">
                                                <em className="fa fa-star"></em>4.5
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3">
                            <div className="item position-relative">
                                <a href="#">
                                    <div className="back_bg">
                                        <img src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/ecommerce/q-bank.svg" alt="" />
                                    </div>
                                    <h3>DAMS Question Bank IV <span className="d-block"> Final Year MBBS</span></h3>
                                </a>
                                <p>By Sumer Sethi</p>
                                {/* <div className="edition hidden">
                                    <a href="#">2023 Edition</a>
                                </div> */}
                                
                                <div className="price-img position-relative">
                                    <h4 className="price"><em className="fa fa-rupee"></em>1,099 <span>(25 % OFF)</span>
                                    </h4>
                                    <div className="row">
                                        <div className="col-6 col-md-6 col-xl-6">
                                            <del>
                                                <em className="fa fa-rupee"></em>1,500
                                            </del>
                                        </div>
                                        <div className="col-6 col-md-6 col-xl-6 text-right">
                                            <div className="rating">
                                                <em className="fa fa-star"></em>4.5
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3">
                            <div className="item position-relative">
                                <a href="#">
                                    <div className="back_bg">
                                        <img src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/ecommerce/q-bank.svg" alt=""/>
                                    </div>
                                    <h3>DAMS Question Bank IV <span className="d-block"> Final Year MBBS</span></h3>
                                </a>
                                <p>By Sumer Sethi</p>
                                {/* <div className="edition">
                                    <a href="#">2023 Edition</a>
                                </div> */}
                                
                                <div className="price-img position-relative">
                                    <h4 className="price"><em className="fa fa-rupee"></em>1,099 <span>(25 % OFF)</span>
                                    </h4>
                                    <div className="row">
                                        <div className="col-6 col-md-6 col-xl-6">
                                            <del>
                                                <em className="fa fa-rupee"></em>1,500
                                            </del>
                                        </div>
                                        <div className="col-6 col-md-6 col-xl-6 text-right">
                                            <div className="rating">
                                                <em className="fa fa-star"></em>4.5
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal" id="Sort-by">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <h2>Sort By</h2>
                                <div className="short-check">
                                    <div className="active_circle active">
                                        <div className="row m-0">
                                            <div className="col-8 col-sm-8 col-md-8 col-lg-9 col-xl-9">
                                                <h3>Latest</h3>
                                            </div>
                                            <div className="col-4 col-sm-4 col-md-4 col-lg-3 col-xl-3 text-right">
                                                <div className="round"></div>
                                                <div className="active-img">
                                                    <img src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/ecommerce/circle.svg" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="active_circle">
                                        <div className="row m-0">
                                            <div className="col-8 col-sm-8 col-md-8 col-lg-9 col-xl-9">
                                                <h3>Popularity</h3>
                                            </div>
                                            <div className="col-4 col-sm-4 col-md-4 col-lg-3 col-xl-3 text-right">
                                                <div className="round"></div>
                                                <div className="active-img">
                                                    <img src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/ecommerce/circle.svg" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="active_circle">
                                        <div className="row m-0">
                                            <div className="col-8 col-sm-8 col-md-8 col-lg-9 col-xl-9">
                                                <h3>Discount: High to Low</h3>
                                            </div>
                                            <div className="col-4 col-sm-4 col-md-4 col-lg-3 col-xl-3 text-right">
                                                <div className="round"></div>
                                                <div className="active-img">
                                                    <img src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/ecommerce/circle.svg" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="active_circle">
                                        <div className="row m-0">
                                            <div className="col-8 col-sm-8 col-md-8 col-lg-9 col-xl-9">
                                                <h3>Price: Low to High</h3>
                                            </div>
                                            <div className="col-4 col-sm-4 col-md-4 col-lg-3 col-xl-3 text-right">
                                                <div className="round"></div>
                                                <div className="active-img">
                                                    <img src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/ecommerce/circle.svg" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="active_circle">
                                        <div className="row m-0">
                                            <div className="col-8 col-sm-8 col-md-8 col-lg-9 col-xl-9">
                                                <h3>Price: High to Low</h3>
                                            </div>
                                            <div className="col-4 col-sm-4 col-md-4 col-lg-3 col-xl-3 text-right">
                                                <div className="round"></div>
                                                <div className="active-img">
                                                    <img src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/ecommerce/circle.svg" alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal filter-by" id="filter-by">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <form  action="#" method="post">
                                    <div className="row">
                                        <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                            <h2>Filters</h2>
                                        </div>
                                        <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-right">
                                            <button type="reset" className="reset-text" href="#">Reset Filters <span> <img src="https://d2enu63wt1sf3u.cloudfront.net/web_assets/images/ecommerce/reset.svg" alt="" /></span></button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                            <div className="filter-tabs">
                                                <div className="row m-0">
                                                    <div className="col-5 col-sm-3 col-md-3 col-lg-4 col-xl-4 p-0">
                                                        <ul className="nav nav-pills flex-column" id="myTab" role="tablist">
                                                            <li className="nav-item">
                                                                <a className="nav-link active" id="price-tab" data-toggle="tab" href="#price" role="tab" aria-controls="price" aria-selected="true">Price</a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a className="nav-link" id="category-tab" data-toggle="tab" href="#category" role="tab" aria-controls="category" aria-selected="false">Category</a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a className="nav-link" id="discount-data-tab" data-toggle="tab" href="#discount-data" role="tab" aria-controls="discount-data" aria-selected="false">Discount</a>
                                                            </li>
                                                            
                                                            <li className="nav-item">
                                                                <a className="nav-link" id="Preference-tab" data-toggle="tab" href="#Preference" role="tab" aria-controls="Preference" aria-selected="false">Preference</a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a className="nav-link" id="Subject-tab" data-toggle="tab" href="#Subject" role="tab" aria-controls="Subject" aria-selected="false">Subject</a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a className="nav-link" id="language-tab" data-toggle="tab" href="#language" role="tab" aria-controls="language" aria-selected="false">Language</a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a className="nav-link" id="study-material-tab" data-toggle="tab" href="#study-material" role="tab" aria-controls="study-material" aria-selected="false">Study Material</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="col-7 col-sm-9 col-md-9 col-lg-8 col-xl-8 p-0">
                                                        <div className="tab-content" id="myTabContent">
                                                            <div className="tab-pane fade show active" id="price" role="tabpanel">
                                                                <div className="row">
                                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                                        <div className="multiselect text-checkbox check-count">
                                                                            <span className="count-checked-checkboxes"></span> 
                                                                            <ul className="myUL">
                                                                                <li className="position-relative">
                                                                                    <label className="multiselect-on check-design">
                                                                                        <input type="checkbox" name="" />Rs. 1000 - Rs. 2000
                                                                                        <span className="checkmark"></span>
                                                                                    </label>
                                                                                </li>
                                                                                <li className="position-relative">
                                                                                    <label className="check-design">
                                                                                        <input type="checkbox" name="" />Rs. 2000 - Rs. 3000
                                                                                        <span className="checkmark"></span>
                                                                                    </label>
                                                                                </li>
                                                                                <li className="position-relative">
                                                                                    <label className="check-design">
                                                                                        <input type="checkbox" name="" />Rs. 3000 - Rs. 4000
                                                                                        <span className="checkmark"></span>
                                                                                    </label>
                                                                                </li>
                                                                                <li className="position-relative">
                                                                                    <label className="check-design">
                                                                                        <input type="checkbox" name="" />Rs. 4000 - Rs. 5000
                                                                                        <span className="checkmark"></span>
                                                                                    </label>
                                                                                </li>
                                                                            </ul>
                                                                        </div> 
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="tab-pane fade" id="category" role="tabpanel">
                                                                <div className="row">
                                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                                        <div className="multiselect text-checkbox check-count1">
                                                                            <span className="count-checked-checkboxes1"></span> 
                                                                            <ul className="myUL">
                                                                                <li className="position-relative">
                                                                                    <label className="multiselect-on check-design">
                                                                                        <input type="checkbox" name="" />Category 1
                                                                                        <span className="checkmark"></span>
                                                                                    </label>
                                                                                </li>
                                                                                <li className="position-relative">
                                                                                    <label className="check-design">
                                                                                        <input type="checkbox" name="" />Category 2
                                                                                        <span className="checkmark"></span>
                                                                                    </label>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        <div className="tab-pane fade" id="discount-data" role="tabpanel">
                                                                <div className="row">
                                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                                        <div className="multiselect text-checkbox">
                                                                            <ul className="myUL">
                                                                                <li className="position-relative">
                                                                                    <label className="multiselect-on check-design">
                                                                                        <input type="checkbox" name="" />Discount 1
                                                                                        <span className="checkmark"></span>
                                                                                    </label>
                                                                                </li>
                                                                                <li className="position-relative">
                                                                                    <label className="check-design">
                                                                                        <input type="checkbox" name="" />Discount 2
                                                                                        <span className="checkmark"></span>
                                                                                    </label>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="tab-pane fade" id="Preference" role="tabpanel">
                                                                <div className="row">
                                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                                        <div className="multiselect text-checkbox">
                                                                            <ul className="myUL">
                                                                                <li className="position-relative">
                                                                                    <label className="multiselect-on check-design">
                                                                                        <input type="checkbox" name="" /> Prefrence 1
                                                                                        <span className="checkmark"></span>
                                                                                    </label>
                                                                                </li>
                                                                                <li className="position-relative">
                                                                                    <label className="check-design">
                                                                                        <input type="checkbox" name="" />Prefrence 2
                                                                                        <span className="checkmark"></span>
                                                                                    </label>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="tab-pane fade" id="Subject" role="tabpanel">
                                                                <div className="row">
                                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                                        <div className="multiselect text-checkbox">
                                                                            <ul className="myUL">
                                                                                <li className="position-relative">
                                                                                    <label className="multiselect-on check-design">
                                                                                        <input type="checkbox" name="" />Medical
                                                                                        <span className="checkmark"></span>
                                                                                    </label>
                                                                                </li>
                                                                                <li className="position-relative">
                                                                                    <label className="check-design">
                                                                                        <input type="checkbox" name="" />Anatomy
                                                                                        <span className="checkmark"></span>
                                                                                    </label>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="tab-pane fade" id="language" role="tabpanel">
                                                                <div className="row">
                                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                                        <div className="multiselect text-checkbox">
                                                                            <ul className="myUL">
                                                                                <li className="position-relative">
                                                                                    <label className="multiselect-on check-design">
                                                                                        <input type="checkbox" name="" />Hindi 
                                                                                        <span className="checkmark"></span>
                                                                                    </label>
                                                                                </li>
                                                                                <li className="position-relative">
                                                                                    <label className="check-design">
                                                                                        <input type="checkbox" name="" />English
                                                                                        <span className="checkmark"></span>
                                                                                    </label>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="tab-pane fade" id="study-material" role="tabpanel">
                                                                <div className="row">
                                                                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                                        <div className="multiselect text-checkbox">
                                                                            <ul className="myUL">
                                                                                <li className="position-relative">
                                                                                    <label className="multiselect-on check-design">
                                                                                        <input type="checkbox" name="" />Study 1
                                                                                        <span className="checkmark"></span>
                                                                                    </label>
                                                                                </li>
                                                                                <li className="position-relative">
                                                                                    <label className="check-design">
                                                                                        <input type="checkbox" name="" />Study 2
                                                                                        <span className="checkmark"></span>
                                                                                    </label>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> 
                                    </div> 
                                </form>
                            </div>
                            <div className="modal-footer">
                                <div className="row m-0">
                                    <div className="col-md-12">
                                        <div className="btn-grp">
                                            <button type="button" className="btn cls_btn" data-dismiss="modal">Close</button>
                                            <button type="button" className="btn">APPLY 2 filters</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  );
}
export default QuickList