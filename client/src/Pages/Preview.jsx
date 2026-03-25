const Preview = ({ data, template, accent }) => {
  const accentColor = {
    blue: "text-blue-600 border-blue-600",
    green: "text-green-500 border-green-500",
    purple: "text-purple-500 border-purple-500",
  };

  const templates = {
    classic: (
      <>
        <h1 className={`text-2xl text-center font-semibold ${accentColor[accent]}`}>
          {data.fullName || "Your Name"}
        </h1>

        <div className={`border-b my-3 ${accentColor[accent]}`}></div>

        <p className="text-center">{data.profession}</p>
      </>
    ),

    modern: (
      <div className="bg-gray-900 text-white p-4 rounded">
        <h1 className={`text-3xl ${accentColor[accent]}`}>
          {data.fullName}
        </h1>
        <p>{data.profession}</p>
      </div>
    ),

    minimal: (
      <h1 className="text-xl">{data.fullName}</h1>
    ),
  };

  return (
    <div className="bg-white p-8 rounded shadow-sm">

      {templates[template]}

      <div className="mt-4 text-sm space-y-1">
        <p>{data.email}</p>
        <p>{data.phone}</p>
        <p>{data.location}</p>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">Experience</h3>
        <p>{data.experience}</p>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">Education</h3>
        <p>{data.education}</p>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">Skills</h3>
        <p>{data.skills}</p>
      </div>

    </div>
  );
};

export default Preview;