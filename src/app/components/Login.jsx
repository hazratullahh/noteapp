"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { BsEye, BsEyeSlash } from "react-icons/bs";

import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { loginSchema } from "@/schema/auth";
import "react-toastify/dist/ReactToastify.css";

export const parseCallbackUrl = (url) => {
	const res = url.replace(/%3A/g, ":").replace(/%2F/g, "/");
	return res;
};

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);

	const router = useRouter();

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
		reset,
	} = useForm({
		mode: "onChange",
		resolver: yupResolver(loginSchema),
	});

	const onSubmitHandler = async (data) => {
		const res = await signIn("credentials", {
			...data,
			redirect: false,
		});

		if (res?.error) {
			console.log("err", res?.err);
			toast.error(res?.error);
			return;
		}

		if (res?.ok) {
			router.push(`/dashboard`);
			reset();
		}
	};

	const showpasswordIcon = (
		<span onClick={() => setShowPassword(!showPassword)}>
			{showPassword ? (
				<BsEye size={20} className="cursor-pointer" />
			) : (
				<BsEyeSlash size={20} className="cursor-pointer" />
			)}
		</span>
	);

	return (
		<div className="h-[80vh] flex items-center justify-center">
			<div className="flex flex-col justify-center items-center w-[90%] mx-3 md:w-2/5 xl:w-[28%] m-auto">
				<h2 className="my-5 font-semibold text-3xl">Login</h2>

				<form
					className="w-full border shadow-xl rounded-lg p-10 "
					onSubmit={handleSubmit(onSubmitHandler)}
				>
					<div className="mb-6">
						<label
							htmlFor="email"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Enter Email...
						</label>
						<input
							type="email"
							id="email"
							placeholder="Email"
							className={`${errors?.email?.message ? "border-red-400" : ""
								}bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500`}
							{...register("email", { required: true })}
						/>
						<span className="text-red-500 text-xs">
							{errors?.email?.message}
						</span>
					</div>
					<div className="mb-6">
						<label
							htmlFor="password"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Enter Password
						</label>
						<div className="relative">
							<input
								label="Password"
								placeholder="Password"
								type={showPassword ? "text" : "password"}
								{...register("password", { required: true })}
								size="lg"
								className={`${errors?.password?.message ? "border-red-400" : ""
									} bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 `}
							/>
							<i className={`absolute right-4 top-3`}>{showpasswordIcon}</i>
						</div>

						<span className="text-red-500 text-xs">
							{errors?.password?.message}
						</span>
					</div>

					<div className="relative">
						<button
							variant="filled"
							disabled={isSubmitting}
							type="submit"
							className="w-full text-white bg-gray-900 hover:bg-gray-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700"
						>
							{isSubmitting ? "Authorizing..." : "Submit"}
						</button>
					</div>
				</form>

				<Link
					href="/"
					className="text-slate-400 my-3 hover:border-b  hover:border-gray-600 hover:text-gray-500"
				>
					Back To Home
				</Link>
			</div>
		</div>
	);
};

export default Login;
