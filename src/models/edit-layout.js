import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Buttons } from "./menu";

export default function Edit(props) {
  const storeData = useSelector((state) => state);
  const params = useParams();
  const [tempData, setTempData] = useState([]);

  useEffect(() => {
    const arr2 = [];
    const obj = storeData[props.dispatch[1] ? "products" : "customers"].find(
      (data) => data.ID == params.id
    );
    let arr1 = storeData.purchases.filter(
      (purchase) =>
        purchase[props.dispatch[1] ? "ProductID" : "CustomerID"] == params.id
    );

    for (let i = 0; i < arr1.length; i++) {
      const tempObj = storeData[
        props.dispatch[1] ? "customers" : "products"
      ].find(
        (data) =>
          data.ID == arr1[i][props.dispatch[1] ? "CustomerID" : "ProductID"]
      );
      arr2.push(tempObj);
    }

    arr1 = [];

    let tempArr = arr2.map((data) => data.ID);
    tempArr = tempArr.filter((data, index) => tempArr.indexOf(data) == index);

    for (let i = 0; i < tempArr.length; i++) {
      arr1.push(arr2.find((data) => data.ID == tempArr[i]));
    }

    setTempData(arr1);
    props.setData(
      props.dispatch[1]
        ? {
            ID: obj.ID,
            Name: obj.Name,
            Price: obj.Price,
            Quantity: obj.Quantity,
          }
        : {
            ID: obj.ID,
            Fname: obj.Fname,
            Lname: obj.Lname,
            City: obj.City,
          }
    );
  }, []);

  return (
    <>
      <h2>Edit {props.headline}:</h2>
      <div className="grid mainPage">
        <div className="flex" style={{ alignItems: "start" }}>
          {props.dispatch[1] ? (
            <>
              <Input
                text="Product Name"
                value={props.data.Name}
                onChange={(e) =>
                  props.setData({ ...props.data, Name: e.target.value })
                }
              />
              <Input
                text="Product Price"
                min="1"
                type="number"
                value={props.data.Price}
                onChange={(e) =>
                  props.setData({
                    ...props.data,
                    Price: parseInt(e.target.value),
                  })
                }
              />
              <Input
                text="Product Quantity"
                min="1"
                type="number"
                value={props.data.Quantity}
                onChange={(e) =>
                  props.setData({
                    ...props.data,
                    Quantity: parseInt(e.target.value),
                  })
                }
              />
            </>
          ) : (
            <>
              <Input
                text="Customer First Name"
                value={props.data.Fname}
                onChange={(e) =>
                  props.setData({ ...props.data, Fname: e.target.value })
                }
              />
              <Input
                text="Customer Last Name"
                value={props.data.Lname}
                onChange={(e) =>
                  props.setData({ ...props.data, Lname: e.target.value })
                }
              />
              <Input
                text="Customer City"
                value={props.data.City}
                onChange={(e) =>
                  props.setData({ ...props.data, City: e.target.value })
                }
              />
            </>
          )}

          <Buttons
            comp={false}
            link={props.link}
            dispatch={props.dispatch}
            data={props.data}
          />
        </div>

        <div>
          {tempData.length > 0 ? (
            <>
              <b>
                {props.dispatch[1]
                  ? "Customers that purchased this product"
                  : "Products that this customer purchased"}
                :
              </b>
              <ul>
                {tempData.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link to={`${props.secondLink}${item.ID}`}>
                        {props.dispatch[1]
                          ? `${item.Fname} ${item.Lname}`
                          : item.Name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <b>
              {props.dispatch[1]
                ? "There isn't any customer that purchased this"
                : "This customer didn't purchased any"}{" "}
              product!!
            </b>
          )}
        </div>
      </div>
    </>
  );
}

function Input(props) {
  return (
    <div>
      <b>{props.text}: </b>
      <input
        value={props.value}
        onChange={props.onChange}
        type={props.type || "text"}
        min={props.min}
      />
    </div>
  );
}
