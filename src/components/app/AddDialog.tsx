import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { AddProductSchema } from "@/schemas/AddProduct";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Save } from "lucide-react";

interface AddDialogProps {
	openDialog: boolean;
	setOpenDialog: (open: boolean) => void;
}
const AddDialog = ({ openDialog, setOpenDialog }: AddDialogProps) => {
	const onOpenChange = (open: boolean) => {
		setOpenDialog(open);
	};

	const defaultValues: z.infer<typeof AddProductSchema> = {
		name: "",
		price: "",
		category: "",
		stock: "",
	};

	const form = useForm<z.infer<typeof AddProductSchema>>({
		defaultValues: defaultValues,
		mode: "onTouched",
		resolver: zodResolver(AddProductSchema),
	});

	// Submit the form data and set it in local storage
	const onSubmit = (values: z.infer<typeof AddProductSchema>) => {
		const payload = {
			uuid: uuidv4(),
			...values,
		};
		const products = localStorage.getItem("products");
		let updatedProducts = [];
		if (products) {
			updatedProducts = JSON.parse(products);
		}
		updatedProducts.push(payload);
		localStorage.setItem("products", JSON.stringify(updatedProducts));
		onOpenChange(false);
	};

	return (
		<Dialog open={openDialog} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-2xl p-6">
				<Form {...form}>
					<form
						className="flex w-full flex-col items-center justify-center gap-3 p-6"
						onSubmit={form.handleSubmit((values) => onSubmit(values))}
					>
						<div className="flex w-full flex-col gap-2">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<Input
										type="text"
										placeholder="Enter Product Name"
										{...field}
									/>
								)}
							/>
							<FormField
								control={form.control}
								name="price"
								render={({ field }) => (
									<Input
										type="number"
										placeholder="Enter Product Price"
										{...field}
									/>
								)}
							/>
							<FormField
								control={form.control}
								name="category"
								render={({ field }) => (
									<Input
										type="text"
										placeholder="Enter Product Category"
										{...field}
									/>
								)}
							/>
							<FormField
								control={form.control}
								name="stock"
								render={({ field }) => (
									<Input
										type="number"
										placeholder="Enter Product Stock"
										{...field}
									/>
								)}
							/>
						</div>
						<div className="flex w-full justify-end">
							<Button type="submit" variant="secondary">
								<Save />
								Submit
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default AddDialog;
