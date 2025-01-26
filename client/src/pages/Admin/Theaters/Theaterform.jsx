import { Button, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { SetLoading } from "../../../redux/loadersSlice";
import { AddTheater, GetTheaterById, UpdateTheater } from "../../../api/theaters";

function TheaterForm() {
  const [theater, setTheater] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const getTheater = async (id) => {
    try {
      dispatch(SetLoading(true));
      const response = await GetTheaterById(id);
      setTheater(response.data);
      dispatch(SetLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    if (params?.id) {
      getTheater(params.id);
    }
  }, []);

  const onFinish = async (values) => {
    try {
      dispatch(SetLoading(true));
      let response;
      if (params?.id) {
        response = await UpdateTheater(params.id, values);
      } else {
        response = await AddTheater(values);
      }
      message.success(response.message);
      dispatch(SetLoading(false));
      navigate("/admin/Theaters");
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  return (
    (theater || !params.id) && (
      <div>
        <h1 className="text-gray-600 text-xl font-semibold">
          {params?.id ? "Edit Theater" : "Add Theater"}
        </h1>
        <Form
          layout="vertical"
          className="flex flex-col gap-5"
          onFinish={onFinish}
          initialValues={theater}
        >
          <Form.Item
            label="Theater Name"
            name="name"
            rules={[{ required: true, message: "Please enter theater name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: "Please enter location" }]}
          >
            <Input />
          </Form.Item>

          <div className="flex justify-end gap-5">
            <Button
              onClick={() => {
                navigate("/admin/Theaters");
              }}
            >
              Cancel
            </Button>
            <Button htmlType="submit" type="primary">
              Save
            </Button>
          </div>
        </Form>
      </div>
    )
  );
}

export default TheaterForm;
