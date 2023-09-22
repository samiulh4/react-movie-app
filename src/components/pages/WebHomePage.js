import React from 'react';
import WebNav from "../partials/WebNav";
import WebFooter from "../partials/WebFooter";
import { Link } from 'react-router-dom';



const WebHomePage = () => {
    return <>
        <WebNav/>
        <div className="py-5 bg-light border-bottom mb-4"  style={{
            backgroundImage: 'url("https://playerxtreme.com/wp-content/uploads/2018/01/feature.jpg")',
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            height: "100%",
            width:"100%",
            backgroundRepeat: "no-repeat",
        }}>
            <div className="container">
                <div className="text-center my-5">
                    <h1 className="fw-bold text-light">Welcome to Home!</h1>
                    <p className="lead mb-0 text-light">A Bootstrap 5 starter layout for your next blog homepage</p>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row">

                <div className="col-lg-8">
                    <div className="row">

                        <div className="col-lg-6">
                            <div className="card mb-4">
                                <Link to='/'><img className="card-img-top"
                                                  src="https://dummyimage.com/700x350/dee2e6/6c757d.jpg" alt="..."/></Link>
                                <div className="card-body">
                                    <div className="small text-muted">January 1, 2023</div>
                                    <h2 className="card-title h4">Post Title</h2>
                                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Reiciendis aliquid atque, nulla.</p>
                                    <Link className="btn btn-primary" to="/">Read more →</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card mb-4">
                                <Link to='/'><img className="card-img-top"
                                                  src="https://dummyimage.com/700x350/dee2e6/6c757d.jpg" alt="..."/></Link>
                                <div className="card-body">
                                    <div className="small text-muted">January 1, 2023</div>
                                    <h2 className="card-title h4">Post Title</h2>
                                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Reiciendis aliquid atque, nulla.</p>
                                    <Link className="btn btn-primary" to="/">Read more →</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card mb-4">
                                <Link to='/'><img className="card-img-top"
                                                  src="https://dummyimage.com/700x350/dee2e6/6c757d.jpg" alt="..."/></Link>
                                <div className="card-body">
                                    <div className="small text-muted">January 1, 2023</div>
                                    <h2 className="card-title h4">Post Title</h2>
                                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Reiciendis aliquid atque, nulla.</p>
                                    <Link className="btn btn-primary" to="/">Read more →</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card mb-4">
                                <Link to='/'><img className="card-img-top"
                                                  src="https://dummyimage.com/700x350/dee2e6/6c757d.jpg" alt="..."/></Link>
                                <div className="card-body">
                                    <div className="small text-muted">January 1, 2023</div>
                                    <h2 className="card-title h4">Post Title</h2>
                                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Reiciendis aliquid atque, nulla.</p>
                                    <Link className="btn btn-primary" to="/">Read more →</Link>
                                </div>
                            </div>
                        </div>

                    </div>

                    <nav aria-label="Pagination">
                        <hr className="my-0" />
                        <ul className="pagination justify-content-center my-4">
                            <li className="page-item disabled"><Link className="page-link" to="/" tabIndex="-1" aria-disabled="true">Newer</Link></li>
                            <li className="page-item active" aria-current="page"><Link className="page-link" to="/">1</Link></li>
                            <li className="page-item"><Link className="page-link" to="/">2</Link></li>
                            <li className="page-item"><Link className="page-link" to="/">3</Link></li>
                            <li className="page-item disabled"><Link className="page-link" to="/">...</Link></li>
                            <li className="page-item"><Link className="page-link" to="/">15</Link></li>
                            <li className="page-item"><Link className="page-link" to="/">Older</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className="col-lg-4">

                    <div className="card mb-4">
                        <div className="card-header">Search</div>
                        <div className="card-body">
                            <div className="input-group">
                                <input className="form-control" type="text" placeholder="Enter search term..." aria-label="Enter search term..." aria-describedby="button-search" />
                                <button className="btn btn-primary" id="button-search" type="button">Go!</button>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-4">
                        <div className="card-header">Categories</div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-6">
                                    <ul className="list-unstyled mb-0">
                                        <li><Link to='/'>Web Design</Link></li>
                                        <li><Link to='/'>HTML</Link></li>
                                        <li><Link to='/'>Freebies</Link></li>
                                    </ul>
                                </div>
                                <div className="col-sm-6">
                                    <ul className="list-unstyled mb-0">
                                        <li><Link to='/'>JavaScript</Link></li>
                                        <li><Link to='/'>CSS</Link></li>
                                        <li><Link to='/'>Tutorials</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <WebFooter/>
    </>
};
export default WebHomePage;