export type MerchandiseItem = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  sizes?: string[];
  featured?: boolean;
};

export const merchandiseData: MerchandiseItem[] = [
  {
    id: "merch-1",
    slug: "prime-hoodie",
    name: "PRIME UB 2027 Hoodie",
    category: "Apparel",
    price: 250000,
    image: "/PRIME_logo.png",
    description:
      "Premium heavyweight hoodie dengan bordir PRIME UB 2027. Bahan fleece cotton 360gsm, nyaman dan hangat untuk aktivitas kampus.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    featured: true,
  },
  {
    id: "merch-2",
    slug: "prime-tshirt",
    name: "PRIME Essential Tee",
    category: "Apparel",
    price: 120000,
    image: "/PRIME_logo.png",
    description:
      "Kaos premium 30s combed cotton dengan desain minimalis PRIME. Nyaman untuk sehari-hari.",
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "merch-3",
    slug: "prime-totebag",
    name: "PRIME UB Tote Bag",
    category: "Accessories",
    price: 75000,
    image: "/PRIME_logo.png",
    description:
      "Tote bag kanvas premium dengan print PRIME UB. Kapasitas besar, cocok untuk bawa buku dan laptop.",
  },
  {
    id: "merch-4",
    slug: "prime-cap",
    name: "PRIME Snapback Cap",
    category: "Accessories",
    price: 95000,
    image: "/PRIME_logo.png",
    description:
      "Topi snapback dengan bordir PRIME di bagian depan. Adjustable strap, one size fits all.",
  },
];

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
