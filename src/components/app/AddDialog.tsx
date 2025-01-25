import { z } from "zod";
import { Save } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AddProductSchema } from "@/schemas/AddProduct";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from "@/components/ui/select";

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
									<FormItem>
										<FormLabel className="text-default">Product Name<span className="text-destructive">*</span></FormLabel>
										<Input
											type="text"
											placeholder="Enter Product Name"
											{...field}
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="price"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-default">Product Price<span className="text-destructive">*</span></FormLabel>
										<Input
											type="number"
											placeholder="Enter Product Price"
											{...field}
										/>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="category"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-default">Product Category<span className="text-destructive">*</span></FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<SelectTrigger>
												<SelectValue placeholder="Select a Category" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectItem value="Grocery">Grocery</SelectItem>
													<SelectItem value="Electronics">Electronics</SelectItem>
													<SelectItem value="Shoes">Shoes</SelectItem>
													<SelectItem value="Accessories">Accessories</SelectItem>
													<SelectItem value="Books">Books</SelectItem>
													<SelectItem value="Others">Others</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="stock"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-default">Product Stock<span className="text-destructive">*</span></FormLabel>
										<Input
											type="number"
											placeholder="Enter Product Stock"
											{...field}
										/>
										<FormMessage />
									</FormItem>
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
