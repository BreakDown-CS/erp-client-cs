export default function LoginPage() {
    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">

            <div
                className="
          w-full
          max-w-6xl
          min-h-[700px]
          rounded-3xl
          overflow-hidden
          bg-white
          grid
          grid-cols-1
          lg:grid-cols-2
          shadow-2xl
        "
            >

                {/* LEFT SIDE */}
                <div
                    className="
            flex
            flex-col
            justify-center
            px-8
            py-12
            sm:px-16
            bg-white
          "
                >

                    {/* LOGO */}
                    <div className="mb-10">
                        <h1
                            className="
                text-2xl
                font-black
                tracking-widest
                text-blue-950
              "
                        >
                            ERP SYSTEM
                        </h1>
                    </div>

                    {/* TITLE */}
                    <div className="mb-10">
                        <h2
                            className="
                text-5xl
                font-black
                text-blue-950
                mb-4
              "
                        >
                            Welcome Back
                        </h2>

                        <p className="text-gray-500 text-lg">
                            Sign in to continue your journey.
                        </p>
                    </div>

                    {/* FORM */}
                    <div className="space-y-6">

                        {/* EMAIL */}
                        <div className="space-y-2">

                            <label
                                className="
                  text-sm
                  font-semibold
                  text-blue-950
                "
                            >
                                Email
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="
                  w-full
                  h-14
                  rounded-xl
                  border
                  border-gray-300
                  px-4
                  outline-none
                  focus:border-blue-700
                  focus:ring-4
                  focus:ring-blue-100
                  transition
                "
                            />

                        </div>

                        {/* PASSWORD */}
                        <div className="space-y-2">

                            <label
                                className="
                  text-sm
                  font-semibold
                  text-blue-950
                "
                            >
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="
                  w-full
                  h-14
                  rounded-xl
                  border
                  border-gray-300
                  px-4
                  outline-none
                  focus:border-blue-700
                  focus:ring-4
                  focus:ring-blue-100
                  transition
                "
                            />

                        </div>

                        {/* OPTIONS */}
                        <div
                            className="
                flex
                items-center
                justify-between
                text-sm
              "
                        >

                            <label className="flex items-center gap-2 text-gray-600">

                                <input type="checkbox" />

                                Remember me

                            </label>

                            <button
                                className="
                  text-blue-700
                  hover:text-blue-900
                  font-medium
                "
                            >
                                Forgot password?
                            </button>

                        </div>

                        {/* LOGIN BUTTON */}
                        <button
                            className="
                w-full
                h-14
                rounded-xl
                bg-blue-900
                hover:bg-blue-950
                text-white
                font-bold
                text-lg
                transition
              "
                        >
                            Sign In
                        </button>

                        {/* REGISTER */}
                        <div className="text-center text-sm text-gray-500">

                            Don&apos;t have an account?{" "}

                            <span
                                className="
                  text-blue-700
                  font-semibold
                  cursor-pointer
                "
                            >
                                Sign up
                            </span>

                        </div>

                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div
                    className="
            hidden
            lg:flex
            relative
            items-center
            justify-center
            overflow-hidden
            bg-gradient-to-br
            from-blue-950
            via-blue-900
            to-blue-700
          "
                >

                    {/* BACKGROUND CIRCLE */}
                    <div
                        className="
              absolute
              w-[500px]
              h-[500px]
              rounded-full
              bg-blue-400/10
              blur-3xl
            "
                    />

                    {/* CONTENT */}
                    <div
                        className="
              relative
              z-10
              text-white
              px-16
            "
                    >

                        <p
                            className="
                uppercase
                tracking-[0.4em]
                text-sm
                mb-6
                text-blue-200
              "
                        >
                            ERP PLATFORM
                        </p>

                        <h1
                            className="
                text-6xl
                font-black
                leading-tight
                mb-6
              "
                        >
                            Login
                            <br />
                            Page
                        </h1>

                        <p
                            className="
                text-2xl
                text-blue-100
                leading-relaxed
              "
                        >
                            Start your journey
                            <br />
                            now with us
                        </p>

                    </div>

                </div>

            </div>

        </div>
    )
}