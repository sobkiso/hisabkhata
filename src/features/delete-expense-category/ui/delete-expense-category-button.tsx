import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import {
  ExpenseCategoryID,
  useExpenseCategoriesStore,
} from "@entities/category";
import { useExpensesStore } from "@entities/transaction";

import { Button } from "@shared/ui/buttons";
import { TrashIcon } from "@shared/ui/icons";
import { Modal } from "@shared/ui/modals";

interface DeleteExpenseCategoryButtonProps {
  id: ExpenseCategoryID;
  beforeDelete?(): void;
  className?: string;
}

export const DeleteExpenseCategoryButton = ({
  id,
  beforeDelete,
  className,
}: DeleteExpenseCategoryButtonProps) => {
  const navigate = useNavigate();
  const { deleteExpenseCategory } = useExpenseCategoriesStore((state) => ({
    deleteExpenseCategory: state.deleteExpenseCategory,
  }));
  const { deleteExpensesByCategories } = useExpensesStore((state) => ({
    deleteExpensesByCategories: state.deleteExpensesByCategories,
  }));
  const [confirmationIsOpen, setConfirmationIsOpen] = useState(false);

  const onDelete = async () => {
    beforeDelete && beforeDelete();
    const categoryIds = await deleteExpenseCategory(id);
    await deleteExpensesByCategories(categoryIds);
    navigate(-1);
  };

  const closeConfirmation = () => setConfirmationIsOpen(false);
  const openConfirmation = () => setConfirmationIsOpen(true);

  return (
    <>
      <button onClick={openConfirmation}>
        <TrashIcon
          size="sm"
          className={twMerge(
            "text-overlay1 active:text-overlay2 transition-colors",
            className,
          )}
        />
      </button>
      <Modal
        title="Are you sure?"
        description="If you delete this category ALL related sub-categories and transactions will be also deleted. Make sure you have a backup."
        isOpen={confirmationIsOpen}
        onClose={closeConfirmation}
        actions={
          <div className="flex gap-3">
            <Button size="sm" variant="outlinedRed" onClick={onDelete}>
              Delete
            </Button>
            <Button size="sm" onClick={closeConfirmation}>
              Cancel
            </Button>
          </div>
        }
      />
    </>
  );
};
