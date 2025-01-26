import { Button, Table, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetLoading } from "../../../redux/loadersSlice";
import { GetAllTheaters, DeleteTheater } from "../../../api/theaters";

function Theaters() {
  const [Theaters, setTheaters] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch all Theaters
  const getTheaters = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetAllTheaters();
      setTheaters(response.data);
      dispatch(SetLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  React.useEffect(() => {
    getTheaters();
  }, []);

  // Delete a theater
  const deleteTheater = async (id) => {
    try {
      dispatch(SetLoading(true));
      const response = await DeleteTheater(id);
      message.success(response.message);
      getTheaters();
      dispatch(SetLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  // Table columns
  const columns = [
    {
      title: "Theater Name",
      dataIndex: "name",
    },
    {
      title: "Location",
      dataIndex: "location",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-5">
            <i
              className="ri-delete-bin-line text-red-500 cursor-pointer"
              onClick={() => {
                deleteTheater(record._id);
              }}
            ></i>
            <i
              className="ri-pencil-line text-blue-500 cursor-pointer"
              onClick={() => {
                navigate(`/admin/Theaters/edit/${record._id}`);
              }}
            ></i>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button
          type="primary"
          onClick={() => {
            navigate("/admin/Theaters/add");
          }}
        >
          Add Theater
        </Button>
      </div>

      <Table dataSource={Theaters} columns={columns} rowKey="_id" />
    </div>
  );
}

export default Theaters;
