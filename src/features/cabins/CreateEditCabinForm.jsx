import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";

import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useEditCabin } from "./useEditCabin";

const MSG_FIELD_REQUIRED = "This field is required.";

function CreateEditCabinForm({ cabin = {}, setShowForm }) {
  const isEditSession = cabin.id;
  const { register, handleSubmit, reset, formState, getValues } = useForm({
    defaultValues: cabin,
  });
  const { errors } = formState;

  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();
  const isWorking = isCreating || isEditing;

  const onSuccess = {
    onSuccess: () => {
      setShowForm((show) => !show);
      reset();
    },
  };

  function onCreate(cabinFormData) {
    createCabin({ ...cabinFormData, image: cabinFormData.image[0] }, onSuccess);
  }
  function onEdit(cabinFormData) {
    if (typeof cabinFormData.image === "string") {
      delete cabinFormData.image;
    } else {
      cabinFormData.image = cabinFormData.image[0];
    }
    editCabin({ id: cabin.id, updateObj: cabinFormData }, onSuccess);
  }

  return (
    <Form
      onSubmit={!isEditSession ? handleSubmit(onCreate) : handleSubmit(onEdit)}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: MSG_FIELD_REQUIRED,
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Maximum guests" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: MSG_FIELD_REQUIRED,
            min: { value: 1, message: "Atleast 1 guest should be accomodated" },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: MSG_FIELD_REQUIRED,
            min: { value: 1, message: "Can't give out for free, yo." },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          {...register("discount", {
            required: MSG_FIELD_REQUIRED,
            validate: (value) =>
              +value <= +getValues().regularPrice ||
              "Discount can't be more than regular price.",
          })}
          defaultValue={0}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: MSG_FIELD_REQUIRED })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Cabin Image" error={errors?.image?.message}>
        <FileInput
          id="image"
          type="file"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : MSG_FIELD_REQUIRED,
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          onClick={() => setShowForm((show) => !show)}
        >
          Cancel
        </Button>
        <Button variation="secondary" type="reset">
          Reset
        </Button>

        <Button disabled={isWorking}>
          {!isEditSession ? "Create new cabin" : "Edit Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateEditCabinForm;
