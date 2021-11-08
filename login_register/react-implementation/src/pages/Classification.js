import React, { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Product from "components/Product";
import Layout from "Layout";
import { useParams,useLocation } from 'react-router-dom';


const Classification = (props)=> {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState();
    const [products, setProducts] = useState([]);
    const [showButton, setShowButton] = useState(false);
    const [page, setPage] = useState(0);
    let { id } = useParams()
    console.log(useParams())
    const location = useLocation();
    const classify = props.location.state.classify;
    

   
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // for smoothly scrolling
        });
    };

    const loadMore = () => {
        setPage(page + 1);
    };

    const loadProducts = async () => {

        setIsLoading(true);
        try {
            const response = await axios.post('http://140.117.71.141:3001/api/classifyProducts',{classify,page});
            console.log(response)
            setProducts((products) => [...products, ...response.data]);
            setErrorMsg('');
        } catch (error) {
            setErrorMsg('Error while loading data. Try again later.')
        } finally {
            setIsLoading(false)
        }

    };

    useEffect(() => {
        loadProducts();
    }, [page])




    return (
        <Layout>
            <div>

                {isLoading && <p className="loading">Loading...</p>}
                {errorMsg && <p className="errorMsg">{errorMsg}</p>}

                <div className="products">
                    <TransitionGroup component={null}>
                        {products.map(p => {

                            return (
                                <CSSTransition
                                    classNames="product-fade"
                                    timeout={300}
                                    key={p.pId}
                                >
                                    <div className="" key={p.pId}>
                                        <Product
                                            product={p}
                                        />
                                    </div>

                                </CSSTransition>
                            );
                        })}
                    </TransitionGroup>

                    {showButton && (
                        <button onClick={() => scrollToTop()} className="back-to-top">
                            <i className="fas fa-chevron-up" />
                        </button>
                    )}
                </div>
                <button onClick={() => loadMore()} className="btn-grad">
                    {isLoading ? 'Loading...' : 'Load More'}
                </button>
            </div>
        </Layout>

    )
};


export default Classification;