import React, { useState } from "react";

function SkillForm() {
  const [skills, setSkills] = useState([{ name: "", proficiency: "" }]);

  const handleSkillChange = (index, event) => {
    const { name, value } = event.target;
    const updatedSkills = [...skills];
    updatedSkills[index][name] = value;
    setSkills(updatedSkills);
  };

  const addSkill = () => {
    setSkills([...skills, { name: "", proficiency: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted skills:", skills);
    // You can send `skills` to your backend here
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Enter Your Skills</h2>
      <form onSubmit={handleSubmit}>
        {skills.map((skill, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              name="name"
              value={skill.name}
              placeholder="Skill name"
              onChange={(e) => handleSkillChange(index, e)}
              className="mr-2 p-2 border rounded w-1/2"
              required
            />
            <input
              type="text"
              name="proficiency"
              value={skill.proficiency}
              placeholder="Proficiency (e.g. Beginner, Expert)"
              onChange={(e) => handleSkillChange(index, e)}
              className="p-2 border rounded w-1/2"
              required
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addSkill}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Skill
        </button>

        <button
          type="submit"
          className="ml-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default SkillForm;
