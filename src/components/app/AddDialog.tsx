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
import { useState } from "react";

interface AddDialogProps {
	openDialog: boolean;
	setOpenDialog: (open: boolean) => void;
}

const AddDialog = ({ openDialog, setOpenDialog }: AddDialogProps) => {
	const [selectedImage, setSelectedImage] = useState<string>("");
	const [, setImageFile] = useState<File | null>(null);
	const [categorySearch, setCategorySearch] = useState<string>("");

	const categories = [
		"Hair Accessories",
		"Earring", 
		"Necklace",
		"Bracelet",
		"Ring",
		"Gifts",
		"Gift Box premium",
		"Gift Box Normal"
	];

	const filteredCategories = categories.filter(category =>
		category.toLowerCase().includes(categorySearch.toLowerCase())
	);

	const onOpenChange = (open: boolean) => {
		setOpenDialog(open);
		if (!open) {
			setSelectedImage("");
			setImageFile(null);
			setCategorySearch("");
		}
	};

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setImageFile(file);
			const reader = new FileReader();
			reader.onload = (e) => {
				const result = e.target?.result as string;
				setSelectedImage(result);
			};
			reader.readAsDataURL(file);
		}
	};

	const defaultValues: z.infer<typeof AddProductSchema> = {
		name: "",
		price: "",
		category: "",
		stock: "",
		image: "",
	};

	const form = useForm<z.infer<typeof AddProductSchema>>({
		defaultValues: defaultValues,
		mode: "onTouched",
		resolver: zodResolver(AddProductSchema),
	});

	// Submit the form data and set it in local storage
	const onSubmit = (values: z.infer<typeof AddProductSchema>) => {
		if (!selectedImage) {
			alert("Please select an image");
			return;
		}

		const payload = {
			uuid: uuidv4(),
			...values,
			image: selectedImage,
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
													<div className="px-3 py-2">
														<Input
															placeholder="Search categories..."
															value={categorySearch}
															onChange={(e) => setCategorySearch(e.target.value)}
															className="h-8"
															onClick={(e) => e.stopPropagation()}
															onKeyDown={(e) => e.stopPropagation()}
														/>
													</div>
													{filteredCategories.map((category) => (
														<SelectItem key={category} value={category}>
															{category}
														</SelectItem>
													))}
													{filteredCategories.length === 0 && (
														<div className="px-3 py-2 text-sm text-gray-500">
															No categories found
														</div>
													)}
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
							<FormField
								control={form.control}
								name="image"
								render={() => (
									<FormItem>
										<FormLabel className="text-default">Product Image<span className="text-destructive">*</span></FormLabel>
										<div className="flex flex-col gap-2">
											<Input
												type="file"
												accept="image/*"
												onChange={handleImageChange}
												className="cursor-pointer"
											/>
											{selectedImage && (
												<div className="mt-2">
													<img 
														src={selectedImage} 
														alt="Preview" 
														className="w-24 h-24 object-cover rounded-md border"
													/>
													<p className="text-sm text-gray-500 mt-1">Image Preview</p>
												</div>
											)}
										</div>
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
