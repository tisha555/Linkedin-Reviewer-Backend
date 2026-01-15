import Package from "../models/Package.js";

export const getPackages = async (req, res) => {
  try {
    const packages = await Package.find({ isActive: true });
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPackage = async (req, res) => {
  try {
    const { name, price, description, features = [] } = req.body;

    if (!name || !price || !description) {
      return res.status(400).json({ message: "name, price, description are required" });
    }

    const pkg = await Package.create({
      name,
      price,
      description,
      features
    });

    res.status(201).json({ message: "Package created", package: pkg });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
