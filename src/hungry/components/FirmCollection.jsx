import React, { useState, useEffect } from "react";
import { API_URL } from "../api";
import { Link } from "react-router-dom";

const FirmCollection = () => {
  const [firmData, setFirmData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('All')
  const [activeCategory, setActiveCategory] = useState ('all');

  const firmDataHandler = async () => {
    try {
      const responce = await fetch(`${API_URL}/vendor/all-vendors`);
      const newFirmData = await responce.json();
      setFirmData(newFirmData);
    } catch (error) {
      alert("firm data not fetched");
    }
  };

  useEffect(() => {
    firmDataHandler();
  }, []);

  const filterHandler = (region, category)=>{
    setSelectedRegion(region)
    setActiveCategory(category)

  }

  return (
    <>
      <h3>Restaurents with online food delivery in hyderabad</h3>
      <div className="filterButton">
        <button onClick={()=>filterHandler("All", 'all')} className={activeCategory === 'all' ? 'activeButton': ''}>All</button>
        <button onClick={()=>filterHandler("South-Indian", 'south-indian')} className={activeCategory === 'south-indian' ? 'activeButton': ''}>South-Indian</button>
        <button onClick={()=>filterHandler("North-Indian", 'north-indian')} className={activeCategory === 'north-indian' ? 'activeButton': ''}>NorthIndian</button>
        <button onClick={()=>filterHandler("Chinese", 'chinese')} className={activeCategory === 'chinese' ? 'activeButton': ''}>Chinese</button>
        <button onClick={()=>filterHandler("Bakery", 'bakery')} className={activeCategory === 'bakery' ? 'activeButton': ''}>Bakery</button>
      </div>
      <section className="firmSection">
        {firmData.vendors &&
          firmData.vendors.map((apple) => {
            return apple.firm.map((item)=>{
              if(selectedRegion === "All" || 
                item.region.includes(selectedRegion.toLocaleLowerCase())
              ){
                  return (
                    <Link to={`/products/${item._id}/${item.firmName}`} className="link">
                      <div className="firmGroupBox">
                        <div className="firmGroup">
                          <img src={`${API_URL}/uploads/${item.image}`} />
                          <div className="firmOffer">{item.offer} Off</div>
                        </div>
                        <div className="firmDetails">
                          <strong>{item.firmName}</strong>
                          <div className="firmArea">
                            {item.region.join(", ")}
                          </div>
                          <div className="firmArea">{item.area}</div>
                        </div>
                      </div>
                    </Link>
                  );
              }
            })
            return null;
          })}
      </section>
    </>
  );
};

export default FirmCollection;