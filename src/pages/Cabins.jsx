import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Column from "../ui/Column";
import Button from "../ui/Button";
import { useState } from "react";
import CreateEditCabinForm from "../features/cabins/CreateEditCabinForm";

function Cabins() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>

      <Column>
        <CabinTable />
        <Button
          variation={showForm ? "secondary" : "primary"}
          onClick={() => setShowForm((show) => !show)}
        >
          {!showForm ? "Add a new cabin" : "Fold form"}
        </Button>

        {showForm && <CreateEditCabinForm setShowForm={setShowForm} />}
      </Column>
    </>
  );
}

export default Cabins;
